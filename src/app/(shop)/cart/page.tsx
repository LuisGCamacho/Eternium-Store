import { Title } from "@/src/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function() {

  //redirect("/empty")

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        
        {/* Title */}
        <Title title="Carrito"/>

        {/* Grid cart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          <div className="flex flex-col mt-5">

            {/* Subtitles */}
            <span className="tex-xl">Agregar más items</span>

            {/* Button*/}
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

          {/* Items */}
          <ProductsInCart />

          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-[300px]">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">

              {/* Number of products */}
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>

              {/* Subtotal*/}
              <span>Subtotal</span>
              <span className="text-right">$100</span>
              
              {/* Taxes */}
              <span>Impuestos (15%)</span>
              <span className="text-right">$100</span>

              {/* Total */}
              <span className="text-2xl mt-5">Total:</span>
              <span className="mt-5 text-2xl text-right">$100</span>

            </div>

            {/* Checkout button*/}
            <div className="mt-5 mb-2 w-full">
              <Link className="flex btn-primary justify-center" href="/checkout/address">
                Checkout
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}