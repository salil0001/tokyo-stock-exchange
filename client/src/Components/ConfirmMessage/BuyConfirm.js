import React from "react";
import "./Confirm.scss";
import Modal from "../Modal/Modal";
export default function BuyConfirm(props) {
  return (
    <Modal>
      <div className="buy-confirm-wrapper">
        <div className="modal-headers">
          <div style={{ fontSize: "20px" }}>
            <b>Confirmation</b>
          </div>
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjM0OC4zMzNweCIgaGVpZ2h0PSIzNDguMzM0cHgiIHZpZXdCb3g9IjAgMCAzNDguMzMzIDM0OC4zMzQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM0OC4zMzMgMzQ4LjMzNDsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTMzNi41NTksNjguNjExTDIzMS4wMTYsMTc0LjE2NWwxMDUuNTQzLDEwNS41NDljMTUuNjk5LDE1LjcwNSwxNS42OTksNDEuMTQ1LDAsNTYuODUNCgkJYy03Ljg0NCw3Ljg0NC0xOC4xMjgsMTEuNzY5LTI4LjQwNywxMS43NjljLTEwLjI5NiwwLTIwLjU4MS0zLjkxOS0yOC40MTktMTEuNzY5TDE3NC4xNjcsMjMxLjAwM0w2OC42MDksMzM2LjU2Mw0KCQljLTcuODQzLDcuODQ0LTE4LjEyOCwxMS43NjktMjguNDE2LDExLjc2OWMtMTAuMjg1LDAtMjAuNTYzLTMuOTE5LTI4LjQxMy0xMS43NjljLTE1LjY5OS0xNS42OTgtMTUuNjk5LTQxLjEzOSwwLTU2Ljg1DQoJCWwxMDUuNTQtMTA1LjU0OUwxMS43NzQsNjguNjExYy0xNS42OTktMTUuNjk5LTE1LjY5OS00MS4xNDUsMC01Ni44NDRjMTUuNjk2LTE1LjY4Nyw0MS4xMjctMTUuNjg3LDU2LjgyOSwwbDEwNS41NjMsMTA1LjU1NA0KCQlMMjc5LjcyMSwxMS43NjdjMTUuNzA1LTE1LjY4Nyw0MS4xMzktMTUuNjg3LDU2LjgzMiwwQzM1Mi4yNTgsMjcuNDY2LDM1Mi4yNTgsNTIuOTEyLDMzNi41NTksNjguNjExeiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
            className="close-button"
            width="18px"
            onClick={() => props.toggleBuyConfirmationDialog}
            alt="Close"
          />
        </div>
        <div className="stock-details">
          <div className="stock-text">
            <div>RIL</div>
            <div>Relliance Industries Ltd</div>
            <div>Current Price: 210 USD</div>
            <div>Price Change: 210 USD</div>
            <div>Price Change Percent: 21.0 %</div>
            <div>52 Week High: 400 USD</div>
            <div>52 Week Low: 400 USD</div>
            <div>IPO: 2019</div>
          </div>

          <div className="button-confirm-decline">
            <button className="confirm-color">Confirm &#x2705;</button>
            <button className="decline-color">Decline &#10006;</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
