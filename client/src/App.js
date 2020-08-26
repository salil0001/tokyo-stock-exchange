import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import TradingStocks from "./Components/TradingStocks";
import ContextWrapper from './Components/Context.context';
import Users from './Components/Users';
import OrdersSheet from './Components/OrderSheet'
function App() {
  return (
    <ContextWrapper>
      <Navbar />
      <TradingStocks />
      <OrdersSheet />
      <Users  />
    </ContextWrapper>
  );
}

export default App;
