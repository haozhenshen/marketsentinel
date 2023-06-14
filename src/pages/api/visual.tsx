import { Stock, News } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") {
        throw new Error("Invalid request");
      }

      /**
       * Search posts
       */
      const stock: object| null = await prisma.stock.findFirst({
        where: {
              ticker: {
                equals: query,
                mode:'insensitive',
              },
              
        },
        select: {
          relatednews: true,
        },
      });
      
      // /**
      //  * Save search
      //  */
      // await (prisma as any).searchQuery.create({
      //   data: {
      //     query,
      //   },
      // });
   

      res.status(200).json({stock});
    } catch (error: any) {
      console.log(error);
      res.status(500).end();
    }
  }
}