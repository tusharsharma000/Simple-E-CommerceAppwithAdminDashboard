import React from 'react'
import { useParams } from 'react-router-dom';
import { products } from './cartData';
import { useCart } from './CartContext';

function ProductDetails() {
    const {id} = useParams();
    const product = products.find((p) => p.id === Number(id));
    const {addToCart} = useCart();
  return (
    <div className='p-4'>
    <h2 className='text-2xl'>{product.name}</h2>
    <p className='text-lg font-semibold'> ${product.price}</p>
    <button className='mt-4 px-4 py-4 bg-blue-600' onClick={() => addToCart(product)}>
        Add to Cart
    </button>
    </div>
  )
}

export default ProductDetails;