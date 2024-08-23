import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import Alert from "./components/Alert";
import { useEffect, useReducer } from "react";
import alertReducer from "./reducer/alertReducer";
import { AlertContext, AlertDispatchContext } from "./context/Context";
import { AuthProvider } from "./hooks/useAuth";
import {
  ActiveMenuContext,
  ActiveMenuDispatchContext,
} from "./context/AdminMenuContext";
import adminMenuReducer from "./reducer/adminMenuReducer";

function App() {
  const [alert, dispatchAlertHandler] = useReducer(alertReducer, {
    status: false,
    type: "",
    message: "",
  });
  const [activeMenuOption, dispatchActiveMenuOption] = useReducer(
    adminMenuReducer,
    "home"
  );

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (alert.status) {
      setTimeout(
        () =>
          dispatchAlertHandler({
            type: "remove",
          }),
        2000
      );
    }
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  return (
    <AlertContext.Provider value={alert}>
      <AlertDispatchContext.Provider value={dispatchAlertHandler}>
        <ActiveMenuContext.Provider value={activeMenuOption}>
          <ActiveMenuDispatchContext.Provider value={dispatchActiveMenuOption}>
            <AuthProvider>
              <div className="App overflow-x-hidden">
                {alert.status ? (
                  <Alert
                    status={alert.status}
                    type={alert.type}
                    message={alert.message}
                  />
                ) : (
                  ""
                )}
                {/* <Navbar /> */}
                <AppRoutes />
              </div>
            </AuthProvider>
          </ActiveMenuDispatchContext.Provider>
        </ActiveMenuContext.Provider>
      </AlertDispatchContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;
