import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function Navbar() {
    const navigate = useNavigate();
    const {cart} = useCart();
    const totalItems  = cart.reduce((sum, item) => sum + item.quantity, 0);
    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        navigate("/");
    }
  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
        <Link to = "/home">Home</Link>
        <Link to = "/cart">Cart ({totalItems})</Link>
        <Link to = "/dashboard">Admin DashBoard</Link>
        <p onClick={handleLogout} className='cursor-hover'>Log Out</p>
    </nav>
  )
}

export default Navbar