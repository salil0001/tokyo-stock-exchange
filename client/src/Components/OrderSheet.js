import React, { Component } from "react";
import "./OrderSheet.scss";
import { MyContext } from "./Context.context";
export default class OrderSheet extends Component {
  render() {
    return (
      <MyContext.Consumer>
        {(context) => {
          const { buyStocks, sellStocks, repository } = context.state;
          return (
            <div className="Order-sheet-wrapper" hidden={buyStocks==="" && sellStocks ==="" && repository===""}>
              <div className="table-wrapper">
                <b>Trading History</b>
                <div className="trading-history-body">
                  <div className="available-stocks-wrapper">
                    Buy History
                    <div className="company-heading">
                      <div>Symbol</div>
                      <div>Qty</div>
                      <div>Cost Price</div>
                    </div>
                    {buyStocks && buyStocks.map((stock,index) => {
                      return (
                        <div className="company-body" key={index}>
                          <div>{stock.stockSymbol}</div>
                          <div>{stock.buyQuantity}</div>
                          <div>{stock.costPrice}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="available-stocks-wrapper">
                    Sell History
                    <div className="company-heading">
                      <div>symbol</div>
                      <div>quantity</div>
                      <div>avgCostPrice</div>
                      <div>avgSellingPrice</div>
                    </div>
                    {sellStocks && sellStocks.map((stock,index) => {
                      return (
                        <div className="company-body" key={index}>
                          <div>{stock.symbol}</div>
                          <div>{stock.quantity}</div>
                          <div>{stock.avgCostPrice}</div>
                          <div>{stock.avgSellingPrice}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="available-stocks-wrapper">
                    Repository
                    <div className="company-heading">
                      <div>stockSymbol</div>
                      <div>avgCostPrice</div>
                      <div>buyQuantity</div>
                    </div>
                    {repository && repository.map((repo,index) => {
                      return (
                        <div className="company-body" key={index}>
                          <div>{repo.stockSymbol}</div>
                          <div>{repo.avgCostPrice}</div>
                          <div>{repo.buyQuantity}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}
