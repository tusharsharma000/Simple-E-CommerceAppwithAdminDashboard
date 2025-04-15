import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
const LOCAL_KEY = "admin_users"
function Dashboard() {
    const navigate  = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({name: "", email:"", role: ""});
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const storedUsers = localStorage.getItem(LOCAL_KEY);
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);
    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    }
    const handleEdit = (user) => {
        setForm({name: user.name, email: user.email, role: user.role});
        setEditingId(user.id);
        console.log(user);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            console.log(editingId);
            console.log(users);
            console.log(form);
            setUsers(users.map(u => u.id === editingId ? {...form, id: editingId} : u));
        } else {
            console.log(form);
            const newUser = {...form, id: Date.now(), role: form?.role ? form.role : "User"};
            setUsers([...users, newUser]);
        }
        setForm({name: "", email: "", role: "User"});
        setEditingId(null);

    }
    const filteredUser = users?.filter((user) => 
user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filteredUser);
    useEffect(() => {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
    }, [users]);
  return (
    <div className='p-6 max-w-3xl mx-auto'>
        <h1 className='tet-2xl font-bold mb-4'>
            Admin Dashboard
        </h1>
        <input
            type='text'
            placeholder='Search user by name or email'
            className='w-full border p-2 mb-4 rounded'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <form onSubmit={handleSubmit} className='bg-gray-100 mb-4 rounded'>
            <h2 className='font-semibold mb-2'>
            {editingId ? "EditUser" : "Add User"}
            </h2>
            <div className=' flex gap-2 mb-2'>
                <input
                    type='text'
                    placeholder='Name'
                    className='flex-1 border p-2rounded'
                    value={form.name}
                    onChange={(e) =>setForm({...form, name: e.target.value})}
                    required
                />
                 <input
                    type='text'
                    placeholder='email'
                    className='flex-1 border p-2rounded'
                    value={form.email}
                    onChange={(e) =>setForm({...form, email: e.target.value})}
                    required
                />
                 <select className=' border p-2 rounded'
                 value={form.role }
                 onChange={(e) => setForm({...form, role: e.target.value})}
                 >
                 <option value="User">User</option>
                 <option value="Admin">Admin</option>
                 </select>
            </div>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                {editingId ? "Update User" : "Add User"}
            </button>
        </form>
        <table className='w-full border'>
            <thead>
                <tr className='bg-gray-200'>
                <th className='p-2 border '> Name</th>
                <th className='p-2 border '> Email</th>
                <th className='p-2 border '> Role</th>
                <th className='p-2 border '> Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredUser && filteredUser?.length > 0 ? (
                    filteredUser.map(user => (
                        <tr key={user.id}>
                            <td className='p-2 border'> {user.name}</td>
                            <td className='p-2 border'> {user.email}</td>
                            <td className='p-2 border'> {user.role}</td>
                            <td>
                                <button onClick={() => handleEdit(user)} className='bg-yellow-400 text-white px-2 py-1 m-1 rounded'>Edit</button>
                                <button onClick={() => handleDelete(user.id)} className='bg-yellow-400 text-white px-2 py-1 m-1 rounded'>Delete</button>

                            </td>
                        </tr>
                    ))
                ):(
                    <tr>
                        <td colSpan="4" className='text-center p-4'> No user Found.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard;