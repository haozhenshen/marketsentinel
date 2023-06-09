const { PrismaClient } = require('@prisma/client');
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "chvrnnpr01qp0736ij20chvrnnpr01qp0736ij2g"
const finnhubClient = new finnhub.DefaultApi()



const prisma = new PrismaClient()

async function main() {
//   const stock = await prisma.stock.create({
// 	data: {
// 		name: "Apple Inc.",
// 		ticker: "AAPL",
// 		price: 100,
// 	}
//   })
//   console.log(stock)

//   const deletenews = await prisma.news.deleteMany({
	
//   })
//   console.log(deletenews)


	finnhubClient.companyNews("AAPL", "2023-05-08", "2023-06-08", (error, data, response) => {
	
		data.forEach(async(item) => {
			const news = await prisma.news.create({
			data: {
				time: item.datetime * 1000,
				headline: item.headline,
				summary: item.summary,
				shortSummary: item.summary,
				sentiment: Math.random(),
				source: item.source,
				url: item.url,
				stock: {
					connect: { id: "clint3rw00000upc4d8dr5fio" }
				}		
				}
			})
			console.log(news)

		});
	});

}





main().catch((e) => {
	console.error(e.message)
}).finally(async () => {	
	await prisma.$disconnect()
})