import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components";
import "./index.css";

function App() {
  return (
    <div className="App overflow-x-hidden">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
