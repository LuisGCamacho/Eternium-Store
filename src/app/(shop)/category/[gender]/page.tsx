
import { Suspense } from "react";
import { Pagination, ProductGrid, Title } from "@/src/components";
import { getPaginatedProductsWithImages } from "@/src/actions";
import { Gender } from "@prisma/client";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
  params: Promise<{ gender: string }>;
}

export default function CategoryPage({ params, searchParams }: Props) {
  return (

    // // Awaiting a response of CategoryContent
    <Suspense fallback={<div>Cargando productos...</div>}>
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>

  );
}

async function CategoryContent({ params, searchParams }: Props) {
  const { gender } = await params;

    const { page } = await searchParams;  // Get search parameters from the URL
    const pageNumber = page ? parseInt(page) : 1; // Convert page from string to number
  
    // Get products from the database
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
      page: pageNumber,
      gender: gender as Gender,
    });
  


  // Diccionary for the title
  const labels: Record <string, string> = {
    "men": "Hombres",
    "women": "Mujeres",
    "kid": "Niños",
    "unisex": "Todos",
  }


  return (
    <>
      {/* Title */}
      <Title
        title={`Articulos para ${ labels[gender] }`}
        subtitle={`Los mejores articulos para ${ labels[gender] }`}
        className="mb-1"
      />

      {/* Products */}
      <ProductGrid products={products} />

      {/* TotalPages */ }
      <Pagination totalPages={totalPages}/>

    </>
  );
}