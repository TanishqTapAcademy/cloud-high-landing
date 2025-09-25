import { useEffect, useRef } from 'react'

const PrismLight = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true }) as WebGLRenderingContext | null
    if (!gl) return

    // Vertex shader
    const vertexSrc = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

    // Fragment shader - Prism light refraction
    const fragmentSrc = `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;

// Ray marching constants
#define MAX_STEPS 100
#define MAX_DIST 100.0
#define SURF_DIST 0.001
#define REFRACTION_STEPS 8

// Rotation matrix
mat2 rot2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// 3D rotation matrix around Y axis
mat3 rotateY(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(
        c, 0, s,
        0, 1, 0,
        -s, 0, c
    );
}

// SDF for rectangular prism (pyramid-like with rectangular base)
float sdPrism(vec3 p, vec2 h) {
    vec3 q = abs(p);
    return max(q.z - h.y, max(q.x * 0.866 + p.y * 0.5, -p.y) - h.x * 0.5);
}

// SDF for a box
float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// Main scene SDF
float getDist(vec3 p) {
    // Rotate prism slightly for better view
    vec3 prismPos = p - vec3(0.0, 0.0, 0.0);
    prismPos = rotateY(iTime * 0.2) * prismPos;
    prismPos.xy *= rot2D(0.3);
    
    // Triangular prism
    float prism = sdPrism(prismPos, vec2(1.5, 2.0));
    
    return prism;
}

// Get surface normal
vec3 getNormal(vec3 p) {
    float d = getDist(p);
    vec2 e = vec2(0.001, 0.0);
    vec3 n = d - vec3(
        getDist(p - e.xyy),
        getDist(p - e.yxy),
        getDist(p - e.yyx)
    );
    return normalize(n);
}

// Ray marching function
float rayMarch(vec3 ro, vec3 rd) {
    float dO = 0.0;
    for(int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * dO;
        float dS = getDist(p);
        dO += dS;
        if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
    }
    return dO;
}

// Wavelength to RGB conversion (approximate)
vec3 wavelengthToRGB(float wavelength) {
    vec3 color = vec3(0.0);
    
    if(wavelength >= 380.0 && wavelength < 440.0) {
        float t = (wavelength - 380.0) / (440.0 - 380.0);
        color = vec3(1.0 - t, 0.0, 1.0);
    } else if(wavelength >= 440.0 && wavelength < 490.0) {
        float t = (wavelength - 440.0) / (490.0 - 440.0);
        color = vec3(0.0, t, 1.0);
    } else if(wavelength >= 490.0 && wavelength < 510.0) {
        float t = (wavelength - 490.0) / (510.0 - 490.0);
        color = vec3(0.0, 1.0, 1.0 - t);
    } else if(wavelength >= 510.0 && wavelength < 580.0) {
        float t = (wavelength - 510.0) / (580.0 - 510.0);
        color = vec3(t, 1.0, 0.0);
    } else if(wavelength >= 580.0 && wavelength < 645.0) {
        float t = (wavelength - 580.0) / (645.0 - 580.0);
        color = vec3(1.0, 1.0 - t, 0.0);
    } else if(wavelength >= 645.0 && wavelength <= 780.0) {
        color = vec3(1.0, 0.0, 0.0);
    }
    
    return color;
}

// Calculate refraction with dispersion
vec3 refractWithDispersion(vec3 rd, vec3 n, float ior, float dispersion, float spectrum) {
    float currentIOR = ior + dispersion * (spectrum - 0.5);
    return refract(rd, n, 1.0 / currentIOR);
}

// Render light beam
vec3 renderBeam(vec2 uv, vec3 ro, vec3 rd) {
    vec3 col = vec3(0.0);
    
    // Create incoming white light beam
    float beamTime = iTime * 0.3;
    vec3 beamOrigin = vec3(-8.0 + beamTime * 2.0, 0.0, 0.0);
    vec3 beamDir = normalize(vec3(1.0, 0.0, 0.0));
    
    // Check if we're rendering the incoming beam
    float beamRadius = 0.1;
    vec3 toBeam = cross(rd - beamOrigin, beamDir);
    float distToBeam = length(toBeam);
    
    // Incoming white light
    if(beamOrigin.x < -1.5 && distToBeam < beamRadius && dot(rd - beamOrigin, beamDir) > 0.0) {
        float beamIntensity = 1.0 - smoothstep(0.0, beamRadius, distToBeam);
        col += vec3(1.0) * beamIntensity * 2.0;
    }
    
    // Ray march to find prism intersection
    float d = rayMarch(ro, rd);
    
    if(d < MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = getNormal(p);
        
        // Check if ray hits the prism where the beam enters
        float beamHit = 1.0 - smoothstep(0.0, 0.5, length(p.yz));
        if(beamHit > 0.0 && p.x < 0.0) {
            // Refraction with dispersion
            for(int i = 0; i < REFRACTION_STEPS; i++) {
                float spectrum = float(i) / float(REFRACTION_STEPS - 1);
                float wavelength = mix(400.0, 700.0, spectrum);
                
                vec3 refractedRay = refractWithDispersion(rd, n, 1.5, 0.05, spectrum);
                
                if(length(refractedRay) > 0.0) {
                    // Trace through prism
                    vec3 internalPos = p + refractedRay * 0.01;
                    float internalDist = rayMarch(internalPos, refractedRay);
                    
                    if(internalDist < MAX_DIST) {
                        vec3 exitPoint = internalPos + refractedRay * internalDist;
                        vec3 exitNormal = -getNormal(exitPoint);
                        
                        // Exit refraction
                        vec3 exitRay = refractWithDispersion(refractedRay, exitNormal, 1.0/1.5, 0.05, spectrum);
                        
                        if(length(exitRay) > 0.0) {
                            // Color based on wavelength
                            vec3 spectrumColor = wavelengthToRGB(wavelength);
                            
                            // Add colored ray
                            float raySpread = 0.05 + spectrum * 0.1;
                            vec3 rayDir = normalize(exitRay + vec3(0.0, (spectrum - 0.5) * 0.3, 0.0));
                            
                            // Visualize exiting rays
                            vec3 toRay = cross(rd - exitPoint, rayDir);
                            float distToRay = length(toRay);
                            
                            if(distToRay < raySpread && dot(rd - exitPoint, rayDir) > 0.0) {
                                float rayIntensity = 1.0 - smoothstep(0.0, raySpread, distToRay);
                                col += spectrumColor * rayIntensity * beamHit * 0.8;
                            }
                        }
                    }
                }
            }
        }
        
        // Add prism glass effect
        float fresnel = pow(1.0 + dot(rd, n), 2.0);
        col += vec3(0.1, 0.1, 0.15) * fresnel * 0.3;
    }
    
    // Add slight glow around beams
    col += col * 0.5;
    
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    
    // Camera movement - slowly shifting angle
    float cameraTime = iTime * 0.2;
    vec3 ro = vec3(
        -5.0 + sin(cameraTime) * 2.0,
        2.0 + sin(cameraTime * 0.7) * 1.0,
        5.0 + cos(cameraTime) * 2.0
    );
    
    vec3 lookAt = vec3(0.0, 0.0, 0.0);
    vec3 forward = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
    vec3 up = cross(forward, right);
    
    vec3 rd = normalize(forward + uv.x * right + uv.y * up);
    
    // Render the scene
    vec3 col = renderBeam(uv, ro, rd);
    
    // Black background
    vec3 bg = vec3(0.0);
    
    // Add subtle gradient to background for depth
    bg += vec3(0.01, 0.01, 0.02) * (1.0 - length(uv));
    
    // Mix with background where no light
    col = mix(bg, col, smoothstep(0.0, 0.01, length(col)));
    
    // Tone mapping and gamma correction
    col = col / (1.0 + col);
    col = pow(col, vec3(0.4545));
    
    fragColor = vec4(col, 1.0);
}

void main() {
    vec4 fragColor;
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor;
}`

    const compileShader = (type: number, source: string): WebGLShader => {
      const shader = gl.createShader(type)
      if (!shader) throw new Error('Failed to create shader')
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader) || 'Unknown shader compile error'
        gl.deleteShader(shader)
        throw new Error(info)
      }
      return shader
    }

    const program = gl.createProgram()
    if (!program) return

    const vsh = compileShader(gl.VERTEX_SHADER, vertexSrc)
    const fsh = compileShader(gl.FRAGMENT_SHADER, fragmentSrc)
    gl.attachShader(program, vsh)
    gl.attachShader(program, fsh)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program) || 'Unknown program link error'
      gl.deleteProgram(program)
      gl.deleteShader(vsh)
      gl.deleteShader(fsh)
      throw new Error(info)
    }

    gl.useProgram(program)

    // Create fullscreen quad
    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ])
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'iResolution')
    const uTime = gl.getUniformLocation(program, 'iTime')

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.floor(window.innerWidth * dpr)
      const height = Math.floor(window.innerHeight * dpr)
      canvas.width = width
      canvas.height = height
      ;(canvas as HTMLCanvasElement).style.width = `${window.innerWidth}px`
      ;(canvas as HTMLCanvasElement).style.height = `${window.innerHeight}px`
      gl.viewport(0, 0, width, height)
      if (uResolution) gl.uniform3f(uResolution, width, height, 1.0)
    }

    setSize()
    window.addEventListener('resize', setSize)

    gl.clearColor(0, 0, 0, 1)

    const render = () => {
      const time = (Date.now() - startTimeRef.current) * 0.001
      if (uTime) gl.uniform1f(uTime, time)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', setSize)
      gl.useProgram(null)
      gl.bindBuffer(gl.ARRAY_BUFFER, null)
      gl.deleteProgram(program)
      gl.deleteShader(vsh)
      gl.deleteShader(fsh)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          display: 'block', 
          backgroundColor: 'black' 
        }} 
      />
    </div>
  )
}

export default PrismLight