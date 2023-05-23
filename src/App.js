import { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { auth } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <AppRouter isLogin={isLogin} /> : "Initializing..."}</>;
}

export default App;
