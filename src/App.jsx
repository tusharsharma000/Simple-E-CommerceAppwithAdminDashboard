import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { CartProvider } from './components/CartContext';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import PrivateLayout from './components/PrivateLayout';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <CartProvider>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      
      {/* These routes will show the navbar */}
      <Route element={<PrivateLayout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
      </BrowserRouter>
      </CartProvider>

    </>
  )
}

export default App
