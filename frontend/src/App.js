// Packages
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Assets
import "./App.css";
import NavBar from "./components/navbar";
import Stations from "./components/stations";
import StationDetail from "./components/stationdetail";
import Trips from "./components/trips";

function App() {
  return (
    <div className="App">
      <div id="page-wrap"></div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Stations />} />
        <Route exact path="/station/:id" element={<StationDetail />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
    </div>
  );
}

export default App;
