const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({
  users: [],
  stocks: [],
}).write();

function fetchAllStocks() {
  return db.get("stocks").value();
}
function financialRoundNumber(x) {
  return Number.parseFloat(x).toFixed(2);
}

function createUser(name, password, email) {
  const id = Math.random();
  const displayPicture =
    "https://img.icons8.com/plasticine/100/000000/person-male.png";
  const wallet = 6500;
  db.get("users")
    .push({
      name,
      password,
      email,
      id,
      displayPicture,
      wallet,
      todayPrice,
      buyStocks: [],
      sellStocks: [],
      repository: [],
    })
    .write();
}
function userLogin({ email, password }) {
  const getUser = db.get("users").find({ email, password }).value();
  if (getUser) {
    db.get("users")
    .find({ email,password }).assign({  isOnline: true })
    .write();
    const sendData = {};
    sendData.name = getUser.name;
    sendData.email = getUser.email;
    sendData.id = getUser.id;
    sendData.displayPicture = getUser.displayPicture;
    sendData.wallet = getUser.wallet;
    sendData.isOnline = getUser.isOnline;
    sendData.buyStocks = getUser.buyStocks;
    sendData.sellStocks = getUser.sellStocks;
    sendData.repository = getUser.repository;
    return sendData;
  }
  return "";
}
function getAllStocksUsersdata() {
  const getAllUsers = db.get("users").value();
  const filterPasswordUsers = getAllUsers.map((user) => {
    const { name, email, id, displayPicture, isOnline } = user;
    return {
      name,
      email,
      id,
      displayPicture,
      isOnline,
    };
  });

  const getAllStocks = db.get("stocks").value();
  const filterAllStocks = getAllStocks.map((stock) => {
    const {
      id,
      name,
      currentPrice,
      weekHigh52,
      weekLow52,
      yearIPO,
      imageCDN,
      currency,
      symbol,
      todayPrice,
    } = stock;
    return {
      id,
      name,
      currentPrice,
      weekHigh52,
      weekLow52,
      yearIPO,
      imageCDN,
      currency,
      symbol,
      todayPrice,
    };
  });

  return {
    users: filterPasswordUsers,
    stocks: filterAllStocks,
  };
}
function week52LowHigh(newPrice, weekHigh52, weekLow52,stockId) {
  if (newPrice > weekHigh52) {
    db.get("stocks")
      .find({ id: stockId })
      .assign({ weekHigh52: parseFloat(newPrice) })
      .write();
  } else if (newPrice < weekLow52) {
    db.get("stocks")
      .find({ id: stockId })
      .assign({ weekLow52: parseFloat(newPrice) })
      .write();
  }
}

function buyStock(email, password, stockId, buyQuantity) {
  const checkLoginCredentials = userLogin({ email, password });
  if (checkLoginCredentials) {
    const findStock = db.get("stocks").find({ id: stockId }).value();
    const { totalQuantityAvailable, symbol, weekHigh52, weekLow52 } = findStock;

    const newQuantity =
      parseInt(totalQuantityAvailable) - parseInt(buyQuantity);
    if (newQuantity >= 0) {
      const { currentPrice } = findStock;
      const newPrice = financialRoundNumber(
        currentPrice * Math.pow(1.005, buyQuantity)
      );
      
      week52LowHigh(newPrice, weekHigh52, weekLow52,stockId);

      const { wallet, buyStocks, repository } = checkLoginCredentials;
      const newWalletAmount = financialRoundNumber(
        parseFloat(wallet) - parseFloat(buyQuantity) * currentPrice
      );
      if (newWalletAmount <= 0) {
        return {
          result: "Insufficient wallent amount.",
        };
      }
      //adding repository

      const totalStockQuantityAvailable = repository.filter(
        (repo) => repo.stockSymbol === symbol
      );
      const findIndexOfStock = repository.findIndex(
        (repo) => repo.stockSymbol === "FCB"
      );
       
      if (totalStockQuantityAvailable.length === 0) {
        repository.push({
          stockSymbol: symbol,
          buyQuantity: parseInt(buyQuantity),
          avgCostPrice: parseFloat(currentPrice).toFixed(2),
        });
      } else {
        const BuyQuantity = totalStockQuantityAvailable[0].buyQuantity;
        const { stockSymbol, avgCostPrice } = totalStockQuantityAvailable[0];

        const newAvgCostPrice =
          (parseFloat(avgCostPrice) * parseInt(BuyQuantity) +
            parseFloat(currentPrice) * parseInt(buyQuantity)) /
          (parseInt(BuyQuantity) + parseInt(buyQuantity));
        const newbuyQuantity = parseInt(BuyQuantity) + parseInt(buyQuantity);
        repository.splice(findIndexOfStock, 1, {
          stockSymbol,
          avgCostPrice: parseFloat(newAvgCostPrice).toFixed(2),
          buyQuantity: parseInt(newbuyQuantity),
        });
      }

      ////
      buyStocks.push({
        stockSymbol: symbol,
        buyQuantity: parseFloat(buyQuantity),
        costPrice: parseFloat(currentPrice),
      });

      /////

      db.get("stocks")
        .find({ id: stockId })
        .assign({
          totalQuantityAvailable: parseFloat(newQuantity),
          currentPrice: parseFloat(newPrice),
        })
        .write();
      db.get("users")
        .find({ email, password })
        .assign({ wallet: parseFloat(newWalletAmount), buyStocks })
        .write();
    } else {
      return {
        result: "Stock Quantity is not available",
      };
    }
  }
  return {
    result: "Invalid user",
  };
}

function sellStock(email, password, stockId, sellQuantity) {
  const checkLoginCredentials = userLogin({ email, password });
  if (checkLoginCredentials) {
    const findStock = db.get("stocks").find({ id: stockId }).value();
    const { totalQuantityAvailable, symbol } = findStock;
    const newQuantity = parseInt(totalQuantityAvailable) + parseInt(sellQuantity);
   
    if (newQuantity >= 0) {
      const { currentPrice, weekHigh52, weekLow52 } = findStock;
      const newPrice = financialRoundNumber(
        currentPrice * Math.pow(0.995, sellQuantity)
      );

      week52LowHigh(newPrice, weekHigh52, weekLow52,stockId);

      const { wallet, sellStocks, repository } = checkLoginCredentials;

      const totalStockQuantityAvailable = repository.filter(
        (repo) => repo.stockSymbol === symbol
      );
      const findIndexOfStock = repository.findIndex(
        (repo) => repo.stockSymbol === "FCB"
      );

      const { buyQuantity } = totalStockQuantityAvailable[0];
      const { stockSymbol, avgCostPrice } = totalStockQuantityAvailable[0];
      const newBuyQuantity = parseInt(buyQuantity) - parseInt(sellQuantity);

      if(newBuyQuantity===0)
      {
        repository.splice(findIndexOfStock, 1)
      }
      else{
        repository.splice(findIndexOfStock, 1, {
          stockSymbol,
          avgCostPrice: parseFloat(avgCostPrice),
          buyQuantity: parseInt(newBuyQuantity),
        });
      }
      

      const newWalletAmount = financialRoundNumber(
        parseFloat(wallet) + parseFloat(sellQuantity) * parseFloat(currentPrice)
      );
     
     

      sellStocks.push({
        symbol: stockSymbol,
        quantity: parseInt(sellQuantity),
        avgCostPrice: parseFloat(avgCostPrice),
        avgSellingPrice: parseFloat(currentPrice),
      });

      db.get("stocks")
      .find({ id: stockId })
      .assign({
        totalQuantityAvailable: parseFloat(newQuantity),
        currentPrice: parseFloat(newPrice),
      })
      db.get("users")
      .find({ email, password })
      .assign({ wallet: parseFloat(newWalletAmount), sellStocks,repository})
      .write();

    } else {
      return {
        result: "Stock Quantity is not available",
      };
    }
  }
  return "";
}
function findAveragePriceAndQuantity(buyStocks, symbol) {
  const getStocks = buyStocks.filter((stock) => stock.stockSymbol === symbol);
  const getCostPrices = getStocks.map((costPrice) => costPrice.costPrice);
  const getAverageStockPrice = getCostPrices.reduce((a, b) => a + b, 0);
  const averagePrice = getAverageStockPrice / getStocks.length;
  const getBuyQuantities = getStocks.map(
    (buyQuantity) => buyQuantity.buyQuantity
  );
  const totalQuantity = getBuyQuantities.reduce((a, b) => a + b, 0);

  return {
    averagePrice,
    totalQuantity,
  };
}
function makeUserOffline(email,password){
  db.get("users")
  .find({ email,password }).assign({  isOnline: false })
  .write();
}
module.exports = {
  fetchAllStocks,
  createUser,
  userLogin,
  getAllStocksUsersdata,
  buyStock,
  sellStock,
  makeUserOffline
};
