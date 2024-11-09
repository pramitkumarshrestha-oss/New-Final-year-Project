import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductUpload from './pages/ProductUpload';
import React, {createContext, useState, useEffect } from 'react';
import ProductView from './pages/ProductView';
import ProductList from './pages/ProductList';

// export const MyContext = createContext();

function App() {
//   const [themeMode, setThemeMode] = useState(true);

//   useEffect(()=>{
//     if(themeMode===true){
//     document.body.classList.remove('dark');
//     document.body.classList.add('light');
//     localStorage.setItem('themeMode','light');
//     }
//     else{
//       document.body.classList.remove('light');
//       document.body.classList.add('dark');
//       localStorage.setItem('themeMode','dark');
//     }
//   },[themeMode]);

//   const values = {
//     themeMode,
//     setThemeMode
   
  return (

   <BrowserRouter>
   <Header/>
   <div className='main d-flex'>
    <div className='sidebarWrapper'>
      <Sidebar/>
    </div>
    <div className='content'>
    <Routes>
      <Route path="/" exact={true} element={<Dashboard/>}/>
      <Route path="/dashboard" exact={true} element={<Dashboard/>}/>
      <Route path="/product/view" exact={true} element={<ProductView/>}/>
      <Route path="/product/upload" exact={true} element={<ProductUpload/>}/>
      <Route path="/product/list" exact={true} element={<ProductList/>}/>

    </Routes>
    </div>
   </div>
   
   </BrowserRouter>

  );
}

export default App;
