"use server";

import prisma from "@/src/lib/prisma";
import { sleep } from "@/src/utils/sleep";

export const getStockBySlug = async( slug: string ) => {
    
    try {
        //await sleep(3);
        
        const stock = await prisma.product.findFirst({
            where: { slug },
            select: { inStock: true },
        })

        return stock?.inStock ?? 0;


    } catch ( error ) {
        console.error('Error al consultar stock:', error);
        return 0;
    }
}