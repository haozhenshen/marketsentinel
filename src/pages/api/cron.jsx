const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "chvrnnpr01qp0736ij20chvrnnpr01qp0736ij2g";
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.marketNews("general", {}, (error, data, response) => {
  console.log(data)
});