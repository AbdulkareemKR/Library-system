import "./App.css";
import LibrarianHomePage from "./component/librarian/LibrarianHomePage";
import BookInfoPage from "./component/bookInfoPage/BookInfoPage";
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
          <Route path="/LibHome" element={<LibrarianHomePage />} />
          <Route path="/bookInfo" element={<BookInfoPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/" element={<Registration />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
