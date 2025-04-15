import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () =>useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved): []
    });
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    const addToCart = (products) => {
        setCart((prevCart) => {
            const existingItems = prevCart.find((item) => item.id === products.id);
            if (existingItems) {
                return prevCart.map((item) =>
                item.id  === products.id ? {...item, quantity: item.quantity + 1}: item);
            } else {
                return [...prevCart, {...products, quantity: 1}];
            }
        })
    }
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }
    const incrementQuantity = (id) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    
    const decrementQuantity = (id) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                        : item
                )
        );
    };
    
    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, decrementQuantity, incrementQuantity}}>
            {children}
        </CartContext.Provider>
    );
}