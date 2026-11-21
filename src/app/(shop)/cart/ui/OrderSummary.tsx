"use client"

import { useCartStore } from "@/src/store";
import { currencyFormat } from "@/src/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const OrderSummary = () => {

  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore(
      useShallow(state => state.getSummaryInformation())
  );

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <p>Loading...</p>

  return (
    <>
        <div className="grid grid-cols-2">

            {/* Number of products */}
            <span>No. Productos</span>
            <span className="text-right">{ itemsInCart === 1 ? "1 artículo": `${itemsInCart} artículos`}</span>

            {/* Subtotal*/}
            <span>Subtotal</span>
            <span className="text-right">{currencyFormat (subTotal)}</span>
              
            {/* Taxes */}
            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(tax)}</span>

            {/* Total */}
            <span className="text-2xl mt-5">Total:</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>

        </div>
    </>
  )
}
