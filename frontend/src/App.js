import React from 'react';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import SetAvatar from './Pages/Avatar/setAvatar';


const App = () => {
  return (
    
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App
// import React, { useCallback } from 'react';
// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './Pages/Auth/Login';
// import Register from './Pages/Auth/Register';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './Pages/Home/Home';
// import SetAvatar from './Pages/Avatar/setAvatar';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles';

// const App = () => {
//   const particlesInit = useCallback(async (engine) => {
//     await loadFull(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container) => {}, []);

//   return (
//     <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
//       {/* Global particles background */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         loaded={particlesLoaded}
//         options={{
//           background: {
//             color: { value: '#0d0d0d' }, // dark background, can change this
//           },
//           fpsLimit: 60,
//           particles: {
//             number: { value: 150, density: { enable: true, area: 800 } },
//             color: { value: '#ffcc00' },
//             shape: { type: 'circle' },
//             opacity: { value: 0.5, random: true },
//             size: { value: 3, random: true },
//             move: { enable: true, speed: 1.5 },
//           },
//         }}
//         style={{
//           position: 'absolute',
//           zIndex: -1,
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//         }}
//       />

//       {/* Main content on top of particles */}
//       <div style={{ position: 'relative', zIndex: 1 }}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/setAvatar" element={<SetAvatar />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </div>
//   );
// };

// export default App;
