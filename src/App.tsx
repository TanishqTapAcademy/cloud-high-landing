import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import Shade from './pages/Shade'
// import Prism from './pages/Prism'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/shade" element={<Shade />} />
          <Route path="/prism" element={<Prism />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
