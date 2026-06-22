import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}
