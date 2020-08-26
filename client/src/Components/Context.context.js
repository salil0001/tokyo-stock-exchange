import React from "react";
export const MyContext = React.createContext();

export default class ContextWrapper extends React.Component {
  state = {
    stocks: [],
    users: [],
    buyStocks: "",
    sellStocks: "",
    repository: "",
    name: "",
    email: "",
    password: "",
    wallet: 0,
    openSignUpModal: false,
  };
  handleOpenSignUpModal = () => {
    this.setState({
      openSignUpModal: !this.state.openSignUpModal,
    });
  };
  async componentDidMount() {
    const getStocks = await fetch("http://localhost:4000/allStocks", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const stocks = await getStocks.json();
    this.setState({
      stocks,
    });

    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    const createUser = await fetch("http://localhost:4000/api/signIn", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
    const userResult = await createUser.json();
    if (userResult.user === "invalid user") {
      window.alert("Invalid User");
    } else if (email) {
      const {
        email,
        name,
        wallet,
        buyStocks,
        sellStocks,
        repository,
      } = userResult;

      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem("name", name);

      this.setUser(
        name,
        password,
        email,
        wallet,
        buyStocks,
        sellStocks,
        repository
      );
      this.MakeSocketConnection();
    }

    window.addEventListener("unload", function logData() {
      if (!navigator.sendBeacon) return;

      const obj = JSON.stringify({ email: email, password: password });
      const url = "http://localhost:4000/api/makeOffine";

      navigator.sendBeacon(url, obj);
    });
  }

  setUser = async (
    name,
    password,
    email,
    wallet,
    buyStocks,
    sellStocks,
    repository
  ) => {
    if (name && password && email) {
      this.setState({
        name,
        password,
        email,
        wallet,
        buyStocks,
        sellStocks,
        repository,
      });
    } else {
      const email = sessionStorage.getItem("email");
      const password = sessionStorage.getItem("password");
      console.log("hello");
      fetch("http://localhost:4000/api/signOut", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      sessionStorage.removeItem("email");
      sessionStorage.removeItem("password");
      sessionStorage.removeItem("name");

      this.setState({
        name: "",
        password: "",
        email: "",
        wallet: 0,
        buyStocks: "",
        sellStocks: "",
        repository: "",
        users: [],
      });
    }
  };
  updateWallet = (wallet, buyStocks, sellStocks, repository) => {
    console.log(wallet, buyStocks, sellStocks, repository);
    this.setState({
      wallet,
      buyStocks,
      sellStocks,
      repository,
    });
  };

  MakeSocketConnection = () => {
    const connection = new WebSocket(
      "ws://localhost:4000/GetStocksUsersPersonalData"
    );
    connection.addEventListener("open", () => {
      console.log("connected");
    });
    connection.addEventListener("message", (e) => {
      const getParsedData = JSON.parse(e.data);
      const { users, stocks } = getParsedData;
      this.setState({
        users,
        stocks,
      });
    });
  };

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            setUser: this.setUser,
            handleOpenSignUpModal: this.handleOpenSignUpModal,
            MakeSocketConnection: this.MakeSocketConnection,
            updateWallet: this.updateWallet,
          }}
        >
          {this.props.children}
        </MyContext.Provider>
      </>
    );
  }
}
