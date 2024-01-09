import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
