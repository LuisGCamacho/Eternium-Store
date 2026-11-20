"use client"

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
 
    // Change counter
    const onValuedChanged = ( value: number ) => {
        if ( quantity + value < 1 ) return

        onQuantityChanged ( quantity + value)
    }

    return (
        <div className="flex items-center mt-4">
            {/* Decrease button */}
            <button>
                <IoRemoveCircleOutline 
                    onClick={() => onValuedChanged(-1)} 
                    className="cursor-pointer" 
                    size={30}/>
            </button>

            {/* Counter */}
            <span className="w-20 mx-3 h-10 bg-gray-200 flex items-center justify-center rounded">
                { quantity }
            </span>

            {/* Increase button */}
            <button>
                <IoAddCircleOutline 
                    onClick={() => onValuedChanged(+1)} 
                    className="cursor-pointer" 
                    size={30}/>
            </button>
        </div>
    )
}
