import React, { useState, useEffect, useContext } from "react";
import "./Users.scss";
import { MyContext } from "./Context.context";
export default function Users() {
  const [frameLength, getFrameLength] = useState(0);
  const getUsers = useContext(MyContext);
  useEffect(() => {
    getFrameLength(getUsers.state.users.length);
  }, [getUsers]);
  return (
    <MyContext.Consumer>
      {(context) => {
        const { users } = context.state;
        return (
          <div className="user-wrapper-outer">
            <div
              className="user-wrapper"
              style={{ width: `${frameLength*11}em` }}
            >
              {users.map((user) => {
                return (
                  <div className="user-wrap" key={user.id}>
                    <img src={user.displayPicture} height="60px" width="60px" />
                    <div>{user.name}</div>
                    Active{" "}
                    {user.isOnline ? (
                      <img
                        height="20px"
                        width="20px"
                        src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png"
                      />
                    ) : (
                      <img
                        height="20px"
                        width="20px"
                        src="https://img.icons8.com/office/16/000000/sleeping.png"
                      />
                    )}
                    <div>Gain: 44 USD Profit:40%</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
}
