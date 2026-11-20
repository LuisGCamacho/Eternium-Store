"use client"

import { generatePaginationNumbers } from "@/src/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  
    const pathname = usePathname();             // Gets the current page path 
    const searchParams = useSearchParams();     // Gets the search parameters from the URL

    const pageString = searchParams.get("page") ?? 1;
    const currentPage = isNaN( +pageString ) ? 1 : +pageString;

    // Redirects to the main route if the page number is invalid
    if(currentPage < 1 || isNaN( +pageString )) {
        redirect( pathname );
    }

    // Generates the page numbers to display in the pagination
    const allPages = generatePaginationNumbers(currentPage, totalPages)

    const createPageUrl = ( pageNumber: number | string ) => {
        const params = new URLSearchParams( searchParams )

        if( pageNumber === "..." ) {
            // Redirects to the main route if the page number is invalid
            return `${ pathname }?${ params.toString() }`
        }

        if ( +pageNumber <= 0 ) {
            // returns to the main route
            return `${ pathname }`
        }

        if ( +pageNumber > totalPages ) {
            // keeps the current URL
            return `${ pathname }?${ params.toString() }`
        }

        // // Returns the URL with the updated search parameters
        params.set("page", pageNumber.toString())
        return `${ pathname }?${ params.toString() }`

    }

    return (
    <div className="flex justify-center items-center text-center mb-32 mt-10">
        <nav aria-label="Page navigation">
            <ul className="flex list-none">
                <li className="rounded-3xl">
                    <Link
                        className="rounded-md page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200"
                        href="#"
                    >
                    <IoChevronBackOutline size={30} />
                    </Link>
                </li>

                {
                   allPages.map((page, index) => (
                    <li className="rounded-3xl" key={ page }>
                        <Link
                            className={
                            clsx("rounded-md page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200",
                                {
                                    "bg-blue-600 shadow-sm text-white hover:bg-blue-700 hover:text-white": page === currentPage
                                }
                        )
                    }
                            href={ createPageUrl( page ) }
                        >
                            { page }
                        </Link>
                    </li>
                   ))     
                }

                <li>
                    <Link
                        className="rounded-md page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200"
                        href="#"
                    >
                    <IoChevronForwardOutline size={30} />
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  );
};