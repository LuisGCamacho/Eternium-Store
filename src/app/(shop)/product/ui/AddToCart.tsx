"use client"

import { QuantitySelector, SizeSelector } from '@/src/components'
import { CartProduct, Product, Size } from '@/src/interfaces'
import { useCartStore } from '@/src/store'
import { useState } from 'react'

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart)

    const [size, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState(false)

    const addToCart = () => {
        setPosted(true)
        if ( !size ) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.title,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }
        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }
  
    return (
        <>
        {
            posted && !size && (
                <span
                    className='mt-2 text-red-500 fade-in'>
                        Debe seleccionar una talla*
                </span>
            )
        }

            {/* Sizes */}
            <SizeSelector
                selectedSize= { size }              
                availableSizes={ product.sizes }
                onSizeChanged={ setSize }
            />
                
            {/* Amount */}
            <QuantitySelector 
                quantity={ quantity }
                onQuantityChanged={ setQuantity }
            />

            {/* Button */}
            <button 
                onClick={addToCart}
                className="btn-primary my-5 cursor-pointer"> 
                    Agregar al carrito 
            </button>
        </>
    )
}
