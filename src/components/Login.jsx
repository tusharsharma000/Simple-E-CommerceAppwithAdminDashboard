import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role) navigate("/home");
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (userName === "admin" && password === "admin123") {
            localStorage.setItem("role", "admin");


            navigate('/home');
        } else {
            alert("Invalid Credentials");
            setUserName("");
            setPassword("");
        }
    }
  return (
    <div className='min-h-screen flex item-center justify-center bg-gray-100'>
        <form onSubmit={handleLogin} className='bg-white p-6 rounded-md w-80'>
            <h2 className='text-xl  font-bold mb-4'>
                Admin Login
            </h2>
            <div className='mb-4'>
                <label className='block text-sm mb-1'> Username</label>
                <input
                    type='text'
                    className='w-full border px-3 py-2 rounded'
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                />
            </div>
            <div className='mb-4'>
                <label className='block text-sm mb-1'> Password</label>
                <input
                    type='password'
                    className='w-full border px-3 py-2 rounded'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </div>
            <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>Login</button>
        </form>
    </div>
  )
}

export default Login;