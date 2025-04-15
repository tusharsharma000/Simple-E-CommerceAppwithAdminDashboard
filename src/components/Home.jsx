import React from 'react'
import { Link } from 'react-router-dom'
import { products } from './cartData'

function Home() {
  return (
    <div className='p-4 grid gap-4'>
    {products.map((p) => (
        <Link to= {`/product/${p.id}`}
        key={p.id}
        className='p-4 border rounded shadow hover:bg-gray-10'>
            <h2 className='text-xl  font-semibold '>{p.name}</h2>
            <p>{p.price}</p>
        </Link>
    ))}
        
    </div>
  )
}

export default Home