import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import { CartProvider } from './CartContext';
import Navbar from './Navbar';
import ProductDetails from './ProductDetails';
import Cart from './Cart';

function RoleRouter() {
    const role  = localStorage.getItem("role");
    if (!role) {
        return <Navigate to="/" replace/>
    }
    if (role === "admin") {
        return (
            <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            </Routes>
        );
    } else {
        return (
            <CartProvider>
                <Navbar/>
                <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>

                </Routes>
            </CartProvider>
        )
    }
}

export default RoleRouter