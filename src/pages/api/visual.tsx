import { Stock, News } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINHUB_API_KEY;
const hg_key = process.env.HUGGING_FACE_API_KEY;
const finnhubClient = new finnhub.DefaultApi()



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

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      let currentDate = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getDate()}`;
      let lastday =  `${yesterday.getFullYear()}-${yesterday.getMonth() + 1 < 10 ? '0' + (yesterday.getMonth() + 1) : yesterday.getMonth() + 1}-${yesterday.getDate()}`;

      const fetchCompanyNews = () =>
        new Promise<News[]>((resolve, reject) => {
          finnhubClient.companyNews(query.toUpperCase(), '2023-06-13', '2023-06-14', (error: any, data: News[], response: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
        });
      });
      

      const getData = async () => {
        try {
          const data: News[] = await fetchCompanyNews();
          const payload = data;
          const modifiedpayload = data.map(async(newsObj: { summary: string; }) => ({
            ...newsObj,
            score: await computeScore(newsObj.summary),
          }));
          // Perform further operations with the data
          const modifiedData = await Promise.all(modifiedpayload);
          res.status(200).json({news:modifiedData});
        } catch (error) {
          console.error(error);
        }
      };
      
    
        
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
      
      await getData();
    } catch (error: any) {
      console.log(error);
      res.status(500).end();
    }
  }
}

const computeScore = async (summary: string): Promise<number> => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis",
      {
        headers: { Authorization: "Bearer " + hg_key },
        method: "POST",
        body: JSON.stringify({ inputs: summary }),
      }
    );

    const result = await response.json();
  

    const maxScoreObj = result[0].reduce((maxObj: { score: number }, currentObj: { score: number }) => {
      if (currentObj.score > maxObj.score) {
        return currentObj;
      } else {
        return maxObj;
      }
    });

    const sentiment = maxScoreObj.label;
    const score = calculateSentimentScore(sentiment, result[0][0]['score'], result[0][2]['score']);

    return score
  } catch (error) {
    return (Math.random() * 2 - 1) / 2;
  }
};

  
function calculateSentimentScore(sentiment:string, positiveScore:number, negativeScore:number) {
  if (sentiment === 'positive') {
    return positiveScore;
  } else if (sentiment === 'neutral') {
    return 0.5 + ((Math.random() * 2 - 1) / 4);
  } else if (sentiment === 'negative') {
    return 1 - negativeScore;
  } else {
    return 0; // Handle unrecognized sentiment values
  }
}