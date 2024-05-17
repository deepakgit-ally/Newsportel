// App.js
import React from 'react';
import Login from './components/Login';
import NewsForm from './components/NewsForm';

import HomePage from './components/HomePage';
import Signup from './components/Singup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {




  return (
     <BrowserRouter>
     <Routes>
      <Route path='/' exact element={<HomePage/>}/>
      <Route path='Singup' element={<Signup/>}/>
      <Route path='Login' element={<Login/>}/>
      <Route path='add-news' element={<NewsForm/>}/>
     </Routes>
     </BrowserRouter>
  );
}

export default App;

