import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const handleLoginValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setUser({ ...user, email: value });
    } else if (name === "pw") {
      setUser({ ...user, password: value });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault(); //새로고침 막음
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
      } else {
        data = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const handleSocial = async (e) => {
    const { name } = e.target;
    const auth = getAuth();
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleLoginValue}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="pw"
          value={user.password}
          onChange={handleLoginValue}
          placeholder="Password"
          required
        />
        <input type="submit" value={newAccount ? "create Account" : "login"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "login" : "create Account"}
      </span>
      <div>
        <button name="google" onClick={handleSocial}>
          Continue with Google
        </button>
        <button name="github" onClick={handleSocial}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
