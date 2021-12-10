import "./App.css";
import Header from "./component/header/Header";
import BookPage from "./component/bookPage/BookPage";
import HomePage from "./component/homePage/HomePage";
import InformationCard from "./component/informationCard/InformationCard";
import Registration from "./component/registration/Registration";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/book" element={<BookPage />} />
          <Route path="/" element={<Registration />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/info" element={<InformationCard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
