import { getPaginatedProductsWithImages } from "@/src/actions";
import { ProductGrid } from "./product-grid/ProductGrid";
import { redirect } from "next/navigation";
import { Pagination } from "@/src/components";
interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

// Async component to fetch products
export async function Products({ searchParams }: Props) {
  
  const { page } = await searchParams;  // Get search parameters from the URL
  const pageNumber = page ? parseInt(page) : 1; // Convert page from string to number

  // Get products from the database
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page: pageNumber
  });

  if ( products.length === 0 ) {
    redirect("/");
  }

  return (
    <>
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages }/>
    </>
  );
}