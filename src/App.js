import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import Alert from "./components/Alert";
import { useEffect, useReducer } from "react";
import alertReducer from "./reducer/alertReducer";
import { AlertContext, AlertDispatchContext } from "./context/Context";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  const [alert, dispatchAlertHandler] = useReducer(alertReducer, {
    status: false,
    type: "",
    message: "",
  });

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
  });
  return (
    <AlertContext.Provider value={alert}>
      <AlertDispatchContext.Provider value={dispatchAlertHandler}>
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
      </AlertDispatchContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;
