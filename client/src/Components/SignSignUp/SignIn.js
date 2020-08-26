import React,{useState,useEffect} from "react";
import Modal from "../Modal/Modal";
import { MyContext } from "../Context.context";
export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  useEffect(()=>{

  },[])
  return (
    <MyContext.Consumer>
      {(context) => {
        const userLogin = async (event) => {
          event.preventDefault();
          const createUser = await fetch("http://localhost:4000/api/signIn", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email }),
          });
          const userResult = await createUser.json();
            if(userResult.user==="invalid user")
            {
                    window.alert("Invalid User")
            }
            else{
                const {email}=userResult
                const {name}=userResult
                const {wallet}=userResult
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("password", password);
                sessionStorage.setItem("name", name);
                context.setUser(name, password, email,wallet)
                context.MakeSocketConnection()
                props.handleSignIn();
            }
          }
        return (
          <Modal>
            <div style={{ textAlign: "right" }}>
          
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjM0OC4zMzNweCIgaGVpZ2h0PSIzNDguMzM0cHgiIHZpZXdCb3g9IjAgMCAzNDguMzMzIDM0OC4zMzQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM0OC4zMzMgMzQ4LjMzNDsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTMzNi41NTksNjguNjExTDIzMS4wMTYsMTc0LjE2NWwxMDUuNTQzLDEwNS41NDljMTUuNjk5LDE1LjcwNSwxNS42OTksNDEuMTQ1LDAsNTYuODUNCgkJYy03Ljg0NCw3Ljg0NC0xOC4xMjgsMTEuNzY5LTI4LjQwNywxMS43NjljLTEwLjI5NiwwLTIwLjU4MS0zLjkxOS0yOC40MTktMTEuNzY5TDE3NC4xNjcsMjMxLjAwM0w2OC42MDksMzM2LjU2Mw0KCQljLTcuODQzLDcuODQ0LTE4LjEyOCwxMS43NjktMjguNDE2LDExLjc2OWMtMTAuMjg1LDAtMjAuNTYzLTMuOTE5LTI4LjQxMy0xMS43NjljLTE1LjY5OS0xNS42OTgtMTUuNjk5LTQxLjEzOSwwLTU2Ljg1DQoJCWwxMDUuNTQtMTA1LjU0OUwxMS43NzQsNjguNjExYy0xNS42OTktMTUuNjk5LTE1LjY5OS00MS4xNDUsMC01Ni44NDRjMTUuNjk2LTE1LjY4Nyw0MS4xMjctMTUuNjg3LDU2LjgyOSwwbDEwNS41NjMsMTA1LjU1NA0KCQlMMjc5LjcyMSwxMS43NjdjMTUuNzA1LTE1LjY4Nyw0MS4xMzktMTUuNjg3LDU2LjgzMiwwQzM1Mi4yNTgsMjcuNDY2LDM1Mi4yNTgsNTIuOTEyLDMzNi41NTksNjguNjExeiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
                className="close-button"
                width="18px"
                onClick={() => props.handleSignIn()}
              />
            </div>

            <form onSubmit={userLogin}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  required
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={onChangePassword}
                  value={password}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </form>
          </Modal>
        );
      }}
    </MyContext.Consumer>
  );
}
