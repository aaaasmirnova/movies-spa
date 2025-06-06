import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesList } from "./components/MoviesList/MoviesList";
import { MovieDetailedInfo } from "./components/MoviesList/MovieDetailedInfo";

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<MoviesList />}></Route>
          <Route path="/movies/:id" element={<MovieDetailedInfo />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
