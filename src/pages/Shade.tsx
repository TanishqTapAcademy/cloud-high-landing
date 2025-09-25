import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Shade = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef<number>(0);
  const prevTRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
        preserveDrawingBuffer: false,
      }) as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        preserveDrawingBuffer: false,
      }) as WebGLRenderingContext | null);
    if (!gl) return;

    // Vertex shader (full-screen quad)
    const vertexSrc = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

    // Fragment shader with clouds and time-of-day transitions
    const fragmentSrc = `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform float uIntro; // 0 -> flat, 1 -> full mountains
uniform float uDayProgress; // 0 = morning, 0.5 = noon, 1 = evening
uniform float uScrollOffset; // For smooth cloud movement

#define speed 10. 
#define wave_thing
#define disable_sound_texture_sampling
#define audio_vibration_amplitude .125

float jTime;

// Cloud shader constants
const float cloudscale = 1.1;
const float cloudspeed = 0.03;
const float clouddark = 0.5;
const float cloudlight = 0.3;
const float cloudcover = 0.2;
const float cloudalpha = 8.0;
const float skytint = 0.5;
const mat2 m = mat2(1.6, 1.2, -1.2, 1.6);

#ifdef disable_sound_texture_sampling
#define textureMirror(a, b) vec4(0.)
#else
uniform sampler2D iChannel0;
vec4 textureMirror(sampler2D tex, vec2 c){
    vec2 cf = fract(c);
    return texture2D(tex, mix(cf, 1. - cf, mod(floor(c), 2.)));
}
#endif

float amp(vec2 p){
    return smoothstep(1.,8.,abs(p.x));   
}

float pow512(float a){
    a*=a;//^2
    a*=a;//^4
    a*=a;//^8
    a*=a;//^16
    a*=a;//^32
    a*=a;//^64
    a*=a;//^128
    a*=a;//^256
    return a*a;
}
float pow1d5(float a){
    return a*sqrt(a);
}
float hash21(vec2 co){
    return fract(sin(dot(co.xy,vec2(1.9898,7.233)))*45758.5433);
}

// Cloud noise functions
vec2 hash2(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float cloudnoise(in vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x+p.y)*K1);	
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h*h*h*h*vec3(dot(a,hash2(i+0.0)), dot(b,hash2(i+o)), dot(c,hash2(i+1.0)));
    return dot(n, vec3(70.0));	
}

float fbm(vec2 n) {
    float total = 0.0, amplitude = 0.1;
    for (int i = 0; i < 7; i++) {
        total += cloudnoise(n) * amplitude;
        n = m * n;
        amplitude *= 0.4;
    }
    return total;
}

// Generate clouds: returns vec4(color.rgb, alpha)
vec4 generateClouds(vec2 uv, float scrollOffset) {
    // Apply scroll offset for right-to-left movement
    uv.x += scrollOffset * 2.0; // Adjust speed multiplier as needed
    
    float time = iTime * cloudspeed;
    float q = fbm(uv * cloudscale * 0.5);
    
    // Ridged noise shape
    float r = 0.0;
    vec2 clouduv = uv * cloudscale;
    clouduv -= q - time;
    float weight = 0.8;
    for (int i=0; i<8; i++){
        r += abs(weight*cloudnoise(clouduv));
        clouduv = m*clouduv + time;
        weight *= 0.7;
    }
    
    // Noise shape
    float f = 0.0;
    clouduv = uv * cloudscale;
    clouduv -= q - time;
    weight = 0.7;
    for (int i=0; i<8; i++){
        f += weight*cloudnoise(clouduv);
        clouduv = m*clouduv + time;
        weight *= 0.6;
    }
    
    f *= r + f;
    
    // Noise colour
    float c = 0.0;
    time = iTime * cloudspeed * 2.0;
    clouduv = uv * cloudscale*2.0;
    clouduv -= q - time;
    weight = 0.4;
    for (int i=0; i<7; i++){
        c += weight*cloudnoise(clouduv);
        clouduv = m*clouduv + time;
        weight *= 0.6;
    }
    
    // Noise ridge colour
    float c1 = 0.0;
    time = iTime * cloudspeed * 3.0;
    clouduv = uv * cloudscale*3.0;
    clouduv -= q - time;
    weight = 0.4;
    for (int i=0; i<7; i++){
        c1 += abs(weight*cloudnoise(clouduv));
        clouduv = m*clouduv + time;
        weight *= 0.6;
    }
    
    c += c1;
    
    // Cloud color based on time of day
    vec3 cloudcolour;
    if(uDayProgress < 0.5) {
        // Morning to noon: white-pink to bright white clouds
        float t = smoothstep(0.0, 0.5, uDayProgress) * 2.0;
        cloudcolour = mix(vec3(1.1, 0.95, 0.9), vec3(1.2, 1.2, 1.1), t);
    } else {
        // Noon to evening: white to purple-tinted clouds
        float t = smoothstep(0.5, 1.0, uDayProgress) * 2.0 - 1.0;
        cloudcolour = mix(vec3(1.2, 1.2, 1.1), vec3(0.9, 0.7, 0.85), t);
    }
    
    cloudcolour *= clamp((clouddark + cloudlight*c), 0.0, 1.0);
    f = cloudcover + cloudalpha*f*r;
    
    return vec4(cloudcolour, clamp(f + c, 0.0, 1.0));
}

float hash(vec2 uv){
    float a = amp(uv);
    #ifdef wave_thing
    float w = a>0.?(1.-.4*pow512(.51+.49*sin((.02*(uv.y+.5*uv.x)-jTime)*2.))):0.;
    #else
    float w=1.;
    #endif
    return (a>0.?
        a*pow1d5(
        hash21(uv)
        )*w
        :0.)-(textureMirror(iChannel0,vec2((uv.x*29.+uv.y)*.03125,1.)).x)*audio_vibration_amplitude;
}

float edgeMin(float dx,vec2 da, vec2 db,vec2 uv){
    uv.x+=5.;
    vec3 c = fract((floor(vec3(uv,uv.x+uv.y)+0.5))*(vec3(0.,1.,2.)+0.61803398875));
    float a1 = textureMirror(iChannel0,vec2(c.y,0.)).x>.6?.15:1.;
    float a2 = textureMirror(iChannel0,vec2(c.x,0.)).x>.6?.15:1.;
    float a3 = textureMirror(iChannel0,vec2(c.z,0.)).x>.6?.15:1.;

    return min(min((1.-dx)*db.y*a3,da.x*a2),da.y*a1);
}

vec2 trinoise(vec2 uv){
    const float sq = sqrt(3./2.);
    uv.x *= sq;
    uv.y -= .5*uv.x;
    vec2 d = fract(uv);
    uv -= d;

    bool c = dot(d,vec2(1.))>1.;

    vec2 dd = 1.-d;
    vec2 da = c?dd:d,db = c?d:dd;
    
    float nn = hash(uv + (c ? 1. : 0.));
    float n2 = hash(uv+vec2(1.,0.));
    float n3 = hash(uv+vec2(0.,1.));

    float nmid = mix(n2,n3,d.y);
    float ns = mix(nn,c?n2:n3,da.y);
    float dx = da.x/db.y;
    return vec2(mix(ns,nmid,dx),edgeMin(dx,da, db,uv+d));
}

vec2 map(vec3 p){
    vec2 n = trinoise(p.xz);
    float intro = clamp(uIntro, 0., 1.);
    return vec2(p.y-2.*n.x*intro,n.y);
}

vec3 grad(vec3 p){
    const vec2 e = vec2(.005,0.);
    float a =map(p).x;
    return vec3(map(p+e.xyy).x-a
                ,map(p+e.yxy).x-a
                ,map(p+e.yyx).x-a)/e.x;
}

vec2 intersect(vec3 ro,vec3 rd){
    float d =0.,h=0.;
    for(int i = 0;i<500;i++){
        vec3 p = ro+d*rd;
        vec2 s = map(p);
        h = s.x;
        d+= h*.5;
        if(abs(h)<.003*d)
            return vec2(d,s.y);
        if(d>150.|| p.y>2.) break;
    }
    
    return vec2(-1.);
}

void addsun(vec3 rd,vec3 ld,inout vec3 col){
    float sun = smoothstep(.21,.2,distance(rd,ld));
    
    if(sun>0.){
        float yd = (rd.y-ld.y);
        float a =sin(3.1*exp(-(yd)*14.)); 
        sun*=smoothstep(-.8,0.,a);
        
        // Smooth sun color transition
        vec3 morningSun = vec3(1.,.95,.85);
        vec3 noonSun = vec3(1.,1.,.95);
        vec3 eveningSun = vec3(1.,.8,.4)*.75;
        
        vec3 sunColor;
        if(uDayProgress < 0.5) {
            float t = smoothstep(0.0, 0.5, uDayProgress) * 2.0;
            sunColor = mix(morningSun, noonSun, t);
        } else {
            float t = smoothstep(0.5, 1.0, uDayProgress) * 2.0 - 1.0;
            sunColor = mix(noonSun, eveningSun, t);
        }
        
        col = mix(col, sunColor, sun);
    }
}

float starnoise(vec3 rd){
    // Stars visibility based on time of day
    float starVisibility = uDayProgress > 0.8 ? smoothstep(0.8, 1.0, uDayProgress) : 
                           uDayProgress < 0.2 ? smoothstep(0.2, 0.0, uDayProgress) : 0.0;
    
    float c = 0.;
    vec3 p = normalize(rd)*300.;
    for (float i=0.;i<4.;i++)
    {
        vec3 q = fract(p)-.5;
        vec3 id = floor(p);
        float c2 = smoothstep(.5,0.,length(q));
        float threshold = mix(0.001, 0.06, starVisibility) - i*i*0.005;
        c2 *= step(hash21(id.xz/id.y), threshold);
        c += c2;
        p = p*.6+.5*p*mat3(3./5.,0.,4./5.,0.,1.,0.,-4./5.,0.,3./5.);
    }
    c*=c;
    float g = dot(sin(rd*10.512),cos(rd.yzx*10.512));
    c*=smoothstep(-3.14,-.9,g)*.5+.5*smoothstep(-.3,1.,g);
    return c*c*starVisibility;
}

vec3 gsky(vec3 rd,vec3 ld,bool mask, vec2 screenUV){
    float horizon = rd.y;
    
    // Define key colors for smooth morphing
    // Morning colors
    vec3 morningHorizon = vec3(0.9, 0.7, 0.6);
    vec3 morningMid = vec3(0.7, 0.8, 0.95);
    vec3 morningZenith = vec3(0.3, 0.6, 1.0);
    
    // Noon colors
    vec3 noonHorizon = vec3(1.0, 0.7, 0.4);
    vec3 noonMid = vec3(0.9, 0.8, 0.6);
    vec3 noonZenith = vec3(0.5, 0.7, 1.0);
    
    // Evening colors
    vec3 eveningHorizon = vec3(0.7, 0.2, 0.4);
    vec3 eveningMid = vec3(0.4, 0.1, 0.5);
    vec3 eveningZenith = vec3(0.4, 0.1, 0.7);
    
    // Smooth interpolation across entire day cycle
    vec3 horizonColor, midColor, zenithColor;
    
    if(uDayProgress < 0.5) {
        // Morning to Noon (0.0 - 0.5)
        float t = uDayProgress * 2.0; // Normalize to 0-1
        t = smoothstep(0.0, 1.0, t); // Smooth the transition
        horizonColor = mix(morningHorizon, noonHorizon, t);
        midColor = mix(morningMid, noonMid, t);
        zenithColor = mix(morningZenith, noonZenith, t);
    } else {
        // Noon to Evening (0.5 - 1.0)
        float t = (uDayProgress - 0.5) * 2.0; // Normalize to 0-1
        t = smoothstep(0.0, 1.0, t); // Smooth the transition
        horizonColor = mix(noonHorizon, eveningHorizon, t);
        midColor = mix(noonMid, eveningMid, t);
        zenithColor = mix(noonZenith, eveningZenith, t);
    }
    
    // Create sky gradient
    vec3 sky = mix(horizonColor, midColor, smoothstep(-0.1, 0.25, horizon));
    sky = mix(sky, zenithColor, smoothstep(0.25, 0.7, horizon));
    
    // Sun influence that changes smoothly
    float sunInfluence = max(0., dot(rd, ld));
    float sunIntensity = 1.0 - abs(uDayProgress - 0.5) * 1.5; // Strongest at noon
    sky += vec3(0.2, 0.2, 0.2) * pow(sunInfluence, 2.5) * sunIntensity;
    
    // Add haze effect that increases toward evening
    float haze = exp2(-5.*(abs(rd.y)-.2*dot(rd,ld))) * smoothstep(0.5, 1.0, uDayProgress);
    sky = mix(sky, vec3(.7,.1,.4), haze * 0.3);
    
    // Generate and apply clouds
    vec2 cloudUV = screenUV * vec2(iResolution.x/iResolution.y, 1.0);
    vec4 cloudData = generateClouds(cloudUV, uScrollOffset);
    vec3 cloudColor = cloudData.rgb;
    float cloudAlpha = cloudData.a;
    
    // Mix clouds with sky (only for upper part of sky)
    float cloudFade = smoothstep(-0.2, 0.5, rd.y); // Clouds fade near horizon
    cloudAlpha *= cloudFade * 0.7; // Reduce overall cloud opacity
    sky = mix(sky, clamp(skytint * sky + cloudColor, 0.0, 1.0), cloudAlpha);
    
    float st = mask ? starnoise(rd) : 0.;
    vec3 col = clamp(sky + st, 0., 1.);
    
    if(mask) addsun(rd, ld, col);
    return col;  
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    fragColor=vec4(0.);
    const float AA=1.,x=0.,y=0.;
    
    vec2 uv = (2.*(fragCoord+vec2(x,y))-iResolution.xy)/iResolution.y;
    vec2 screenUV = fragCoord / iResolution.xy; // For cloud calculation
    
    const float shutter_speed = .25;
    float dt = fract(hash21(float(AA)*(fragCoord+vec2(x,y)))+iTime)*shutter_speed;
    jTime = mod(iTime-dt*iTimeDelta,4000.);
    vec3 ro = vec3(0.,1.,(-20000.+jTime*speed));
    
    vec3 rd = normalize(vec3(uv,4./3.));
    
    vec2 i = intersect(ro,rd);
    float d = i.x;
    
    // Sun height changes with time of day
    float sunHeight = 0.08 + 0.25 * sin(uDayProgress * 3.14159);
    vec3 ld = normalize(vec3(0.2 * cos(uDayProgress * 3.14159), sunHeight, 1.));

    // Fog smoothly morphs through day
    vec3 morningFog = vec3(.06,.07,.09);
    vec3 noonFog = vec3(.08,.07,.05);
    vec3 eveningFog = vec3(.14,.1,.28);
    
    vec3 fogColor;
    if(uDayProgress < 0.5) {
        float t = smoothstep(0.0, 0.5, uDayProgress) * 2.0;
        fogColor = mix(morningFog, noonFog, t);
    } else {
        float t = smoothstep(0.5, 1.0, uDayProgress) * 2.0 - 1.0;
        fogColor = mix(noonFog, eveningFog, t);
    }
    
    vec3 fog = d>0.?exp2(-d*fogColor):vec3(0.);
    vec3 sky = gsky(rd,ld,d<0., screenUV);
    
    vec3 p = ro+d*rd;
    vec3 n = normalize(grad(p));
    
    // Terrain lighting smoothly transitions
    float diff = max(0.25, dot(n,ld)) + 0.15*n.y;
    
    vec3 morningTerrain = vec3(0.18, 0.2, 0.25);
    vec3 noonTerrain = vec3(0.25, 0.22, 0.18);
    vec3 eveningTerrain = vec3(0.1, 0.11, 0.18);
    
    vec3 terrainColor;
    if(uDayProgress < 0.5) {
        float t = smoothstep(0.0, 0.5, uDayProgress) * 2.0;
        terrainColor = mix(morningTerrain, noonTerrain, t);
    } else {
        float t = smoothstep(0.5, 1.0, uDayProgress) * 2.0 - 1.0;
        terrainColor = mix(noonTerrain, eveningTerrain, t);
    }
    vec3 col = terrainColor * diff;
    
    vec3 rfd = reflect(rd,n); 
    vec3 rfcol = gsky(rfd,ld,true, screenUV);
    
    col = mix(col,rfcol,.05+.95*pow(max(1.+dot(rd,n),0.),5.));
    
    // Edge accent smoothly morphs
    vec3 morningEdge = vec3(0.7, 0.5, 0.8);
    vec3 noonEdge = vec3(1.0, 0.6, 0.3);
    vec3 eveningEdge = vec3(0.8, 0.1, 0.92);
    
    vec3 edgeColor;
    if(uDayProgress < 0.5) {
        float t = smoothstep(0.0, 0.5, uDayProgress) * 2.0;
        edgeColor = mix(morningEdge, noonEdge, t);
    } else {
        float t = smoothstep(0.5, 1.0, uDayProgress) * 2.0 - 1.0;
        edgeColor = mix(noonEdge, eveningEdge, t);
    }
    col = mix(col, edgeColor, smoothstep(.05,.0,i.y) * 0.7);
    
    col = mix(sky,col,fog);
    
    // Gamma correction adjusted for time of day
    float gamma = mix(0.9, 1.0, uDayProgress);
    col = pow(col, vec3(gamma));
    
    // During intro, reveal terrain from bottom
    float progress = clamp(uIntro, 0.0, 1.0);
    float yN = fragCoord.y / iResolution.y;
    float softness = 0.12;
    float base = (progress >= 0.999) ? 1.0 : 1.0 - smoothstep(progress - softness, progress + softness, yN);
    float sunMask = smoothstep(0.997, 0.9996, dot(rd, ld));
    float preserve = mix(1.0, 1.0 - sunMask, 1.0 - progress);
    float blend = clamp(base * preserve, 0.0, 1.0);
    col = mix(sky, col, blend);
    
    if(d<0.) d=1e6;
    d=min(d,10.);
    fragColor += vec4(clamp(col,0.,1.),d<0.?0.:.1+exp2(-d));
}

void main() {
  vec4 fragColor;
  mainImage(fragColor, gl_FragCoord.xy);
  gl_FragColor = fragColor;
}
`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Failed to create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info =
          gl.getShaderInfoLog(shader) || "Unknown shader compile error";
        gl.deleteShader(shader);
        throw new Error(info);
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) return;

    const vsh = compileShader(gl.VERTEX_SHADER, vertexSrc);
    const fsh = compileShader(gl.FRAGMENT_SHADER, fragmentSrc);
    gl.attachShader(program, vsh);
    gl.attachShader(program, fsh);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info =
        gl.getProgramInfoLog(program) || "Unknown program link error";
      gl.deleteProgram(program);
      gl.deleteShader(vsh);
      gl.deleteShader(fsh);
      throw new Error(info);
    }

    gl.useProgram(program);

    // Fullscreen quad
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uDelta = gl.getUniformLocation(program, "iTimeDelta");
    const uIntro = gl.getUniformLocation(program, "uIntro");
    const uDayProgress = gl.getUniformLocation(program, "uDayProgress");
    const uScrollOffset = gl.getUniformLocation(program, "uScrollOffset");

    // Render scheduling: draw only on demand (scroll/resize/intro), not continuously
    const renderScheduledRef = { current: false };

    const draw = () => {
      const t = tRef.current;
      const deltaScroll = t - prevTRef.current;
      prevTRef.current = t;
      if (uTime) gl.uniform1f(uTime, t);
      if (uDelta) gl.uniform1f(uDelta, Math.max(0, deltaScroll));
      if (uDayProgress) gl.uniform1f(uDayProgress, scrollProgressRef.current);
      if (uScrollOffset) gl.uniform1f(uScrollOffset, scrollOffsetRef.current);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    function scheduleRender() {
      if (renderScheduledRef.current) return;
      renderScheduledRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        renderScheduledRef.current = false;
        draw();
      });
    }

    const setSize = () => {
      // Lower DPR to reduce GPU fragment workload (retina can be very heavy)
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, width, height);
      if (uResolution) gl.uniform3f(uResolution, width, height, 1.0);
      // Redraw once after resize
      scheduleRender();
    };

    setSize();
    window.addEventListener("resize", setSize);

    // Setup GSAP ScrollTrigger to control both time and day progress
    gsap.registerPlugin(ScrollTrigger);

    const maxDuration = 200.0; // seconds of shader time across full scroll
    const setScrollTime = (v: number) => {
      tRef.current = v;
    };
    const setDayProgress = (v: number) => {
      scrollProgressRef.current = v;
    };

    // Track scroll offset for clouds
    let scrollOffsetRef = { current: 0 };

    if (scrollWrapRef.current) {
      // Create a long scroll section
      const totalScroll = window.innerHeight * 8; // 8 viewport heights
      scrollWrapRef.current.style.height = `${totalScroll}px`;

      ScrollTrigger.create({
        trigger: scrollWrapRef.current,
        start: "top top",
        end: `bottom bottom`,
        scrub: false,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollTime(progress * maxDuration);
          setDayProgress(progress); // 0 at top (morning), 1 at bottom (evening)
          scrollOffsetRef.current = progress; // For cloud movement
          scheduleRender();
        },
      });
    }

    // Animate intro once on mount
    if (uIntro) gl.uniform1f(uIntro, 0);
    const introTween = gsap.to(
      {},
      {
        duration: 3,
        ease: "power2.out",
        onUpdate: () => {
          if (!uIntro) return;
          const p = introTween.progress();
          gl.uniform1f(uIntro, p);
          scheduleRender();
        },
        onComplete: () => {
          if (uIntro) gl.uniform1f(uIntro, 1);
          scheduleRender();
        },
      }
    );

    // Start with morning
    prevTRef.current = 0;
    scrollProgressRef.current = 0;

    gl.clearColor(0, 0, 0, 1);

    // Initial draw
    scheduleRender();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      introTween.kill();
      gl.useProgram(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          backgroundColor: "black",
        }}
      />
      <div ref={scrollWrapRef} />
    </div>
  );
};

export default Shade;
