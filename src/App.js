import React from "react";

// CSS
import logo from "./images/logo.jpeg";
import styles from "./App.module.css";

// Axios
import axios from "axios";

function App() {
  const [address, setAddress] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [canRequest, setCanRequest] = React.useState(true);

  const onClick = async () => {
    setLoading(true);

    await axios
      .post("http://20.123.154.231:5000/api/sendToken", {
        address: address,
      })
      .then((resp) => {
        console.log(resp.data);
        setLoading(false);
        setError(false);
        if (resp.data === "False") {
          setCanRequest(false);
        } else {
          setCanRequest(true);
        }
      })
      .catch((resp) => {
        setLoading(false);
        setError(true);
      });
  };
  return (
    <div className={styles.App}>
      <div className={styles.Card}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: "100%",
            margin: "auto",
            background: "red",
          }}
        />
      </div>
      <div className={styles.Card2}>
        <p className={styles.Header}>Anatolian Testnet Faucet</p>
        <p className={styles.Subheader}>
          Drops are limited to 1 request per hour.
        </p>
        <input
          type={"text"}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          className={styles.Input}
          placeholder="Address"
        />
        <div className={styles.Button} onClick={onClick}>
          <span className={styles.ButtonText}>
            {loading ? "Loading" : "Request 10 AVAX"}
          </span>
        </div>
        {error === true ? (
          <div className={styles.ErrorDiv}>
            <span className={styles.ErrorText}>An error occured!</span>
          </div>
        ) : canRequest === false ? (
          <div className={styles.ErrorDiv}>
            <span className={styles.ErrorText}>
              You made too many requests, please try again in an hour.
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
