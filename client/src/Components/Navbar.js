import React, { useState } from "react";
import Logo from "./Logo.svg";
import "./Navbar.scss";
import SignUp from "./SignSignUp/SignUp";
import SignIn from "./SignSignUp/SignIn";
import { MyContext } from "./Context.context";
export default function Navbar() {
  const [isLoginHidden, setIsLoginHidden] = useState(false);

  const handleSignIn = () => {
    setIsLoginHidden(!isLoginHidden);
  };
  return (
    <MyContext.Consumer>
      {(context) => {
        const {
          name,
          password,
          email,
          openSignUpModal,
          wallet,
        } = context.state;

        return (
          <>
          <nav className="nav-wrapper-outer" >
            <nav className="nav-wrapper">
              <div style={{ display: "flex" }}>
                <img src={Logo} alt="stock trading-logo" />

                {email && name && password ? (
                  <div className="nav-attribute" onClick={() => context.setUser()}>
                    Log out
                  </div>
                ) : (
                  <div className="nav-attribute" onClick={() => handleSignIn()}>
                    Log In
                  </div>
                )}

                {name ? (
                  <div className="nav-attribute">
                    <a>Hi {name}</a>
                  </div>
                ) : (
                  <div
                    className="nav-attribute"
                    onClick={() => context.handleOpenSignUpModal()}
                  >
                    {" "}
                    Sign Up
                  </div>
                )}
              </div>
              {wallet ? (
                <div className="wallet-balance">
                  <img
                    src="https://img.icons8.com/cotton/64/000000/coin-wallet--v1.png"
                    className="wallet-image"
                  />
                  ${wallet}
                </div>
              ) : (
                ""
              )}
            </nav>
            {isLoginHidden ? (
              <SignIn handleSignIn={() => handleSignIn()} />
            ) : (
              ""
            )}

            {openSignUpModal ? (
              <SignUp handleSignUp={() => context.handleOpenSignUpModal()} />
            ) : (
              ""
            )}
               </nav>
          </>
        );
      }}
   
    </MyContext.Consumer>
  );
}
