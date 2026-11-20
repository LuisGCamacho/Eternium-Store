"use client"

import Image from 'next/image';
import { useCartStore } from "@/src/store"
import { QuantitySelector } from '@/src/components';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore ( state => state.cart  )

    useEffect(() => {
        setLoaded(true)
    }, [])

    if( !loaded ) return <p>Loading...</p>

  return (
    <>
        {
            productsInCart.map(product => (
              
              /* Image */
              <div key={`${product.slug}-${product.size}`} className="flex m-5">
                  <Image
                    src={`/products/${ product.image }`}
                    width={ 100 }
                    height={ 100 }
                    style={{
                      width: "130px",
                      height:"130px"
                    }}
                    alt={ product.title }
                    className="mr-5 rounded"
                  />

                  <div>

                    {/* Name */}
                    <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>  
                       {product.size} - { product.title }
                    </Link>

                    {/* Price */}
                    <p>${ product.price }</p>

                    {/* Quantity */}
                    <QuantitySelector quantity={3} onQuantityChanged={value => console.log(value)}/>

                    {/* Button*/}
                    <button className="underline m-3 cursor-pointer">Remover</button>

                  </div>
              </div>
            ))
        }
    </>
  )
}
