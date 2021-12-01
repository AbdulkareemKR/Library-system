import "./App.css";
import InformationCard from "./component/InformationCard";
import Registration from "./component/Registration";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/info" element={<InformationCard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
