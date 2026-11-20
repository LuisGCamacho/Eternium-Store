import { getProductBySlug } from "@/src/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/src/components";
import { titleFont } from "@/src/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCart } from "../ui/AddToCart";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
  // information
  const product = await getProductBySlug( slug )
  return {
    title:( product?.title ?? "Producto no encontrado"),
    description: product?.description ?? "",
  
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/&{ product?.images[1] }`],
    }
  }

}



export default function ProductPage({ params }: Props) {
  return (

    // // Awaiting a response of ProductContent
    <Suspense fallback={<div>Cargando productos...</div>}>
      <ProductContent params={params} />
    </Suspense>

  );
}

async function ProductContent({ params }: Props) {
  
  const { slug } = await params;

  // Get products
  const product = await getProductBySlug(slug);

  if ( !product ) {
    notFound()
  }
  
  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

      {/* Slideshows */}
      <div className="col-span-1 md:col-span-2 ">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow 
          title={ product.title } 
          images={ product.images }
          className="block md:hidden"
          />

        {/* Desktop Slideshow */}
        <ProductSlideshow 
          title={ product.title}  
          images={ product.images }
          className="hidden md:block"
        />

      </div>

      {/* Details */}
      <div className="col-span-1 px-5">

        {/* Stock */}
        <StockLabel slug={product.slug}/>

        {/* Name */}
        <h1 className={` ${ titleFont.className } font-bold text-xl`}>{product.title}</h1>

        {/* Price */}
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product}/>
        
        {/* Description */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{ product.description }</p>
      </div>


    </div>
  );
}