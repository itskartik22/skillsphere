import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App w-screen">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
