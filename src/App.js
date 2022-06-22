import './App.css';
import Navbar from './components/Navbar';
import LoggedInNavbar from './components/LoggedInNavbar';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
import Home from './pages/Home';
import Error from './pages/Error';
import ViewEntry from './pages/ViewEntry';
import NewEntry from './pages/NewEntry';
import Search from './pages/Search';
import ModifyEntry from './pages/ModifyEntry';
import Account from './pages/Account';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './context/app-context';
import { CookiesProvider } from 'react-cookie';
import { useState } from 'react';


function App() {

  const[toggleNav, setToggleNav] = useState(false);

  function doNavToggle(route){

    if(route =='/login' || route == '/register' || route == '/about')
      setToggleNav(false);
    else if(route == '/home' || route == '/newentry' || route == '/search' || route == '/account'|| route == '/viewentry' || route == '/modifyentry')
      setToggleNav(true);
    else
      setToggleNav(false);
  
    console.log(route);
  }
  

  return (
    <Router>
      <CookiesProvider>
        <AppContextProvider>
          <div class="main-container">
            {toggleNav ? <LoggedInNavbar/> : <Navbar />}
            <Routes>
              <Route path="/" element={<Login toggleNav={doNavToggle}/>} />
              <Route path="/about" element={<About toggleNav={doNavToggle}/>} />
              <Route path="/register" element={<Register toggleNav={doNavToggle} />} />
              <Route path="/home" element={<Home toggleNav={doNavToggle} />} />
              <Route path="/newentry" element={<NewEntry toggleNav={doNavToggle}/>} />
              <Route path="/viewentry" element={<ViewEntry toggleNav={doNavToggle}/>} />
              <Route path="/search" element={<Search toggleNav={doNavToggle}/>} />
              <Route path="/account" element={<Account toggleNav={doNavToggle}/>} />
              <Route path="/modifyentry" element={<ModifyEntry toggleNav={doNavToggle}/>} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </AppContextProvider>
      </CookiesProvider>
    </Router>

  );
}

export default App;



// import './App.css';
// import Navbar from './components/Navbar';
// import Login from './pages/Login';
// import About from './pages/About';
// import Register from './pages/Register';
// import Home from './pages/Home';
// import Error from './pages/Error';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AppContextProvider } from './context/app-context';
// import { CookiesProvider } from 'react-cookie';

// function App() {
//   return (
//     <Router>
//       <CookiesProvider>
//         <AppContextProvider>
//           <div class="main-container">
//             <Navbar />
//             <Routes>
//               <Route path="/" element={<Login />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="*" element={<Error />} />
//             </Routes>
//           </div>
//         </AppContextProvider>
//       </CookiesProvider>
//     </Router>

//   );
// }

// export default App;