import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes, Router } from "react-router-dom";
import List from "./components/List";
import Update from "./components/Update";
import Create from "./components/Create";

export default function App() {
  return (
    // <Router>
      <div className="container text-center">
        <h1 className="text-decoration-underline">Book-Manager</h1>
        <nav className="navbar justify-content-around border border-2 rounded-pill">
          <Link to="/" className="text-decoration-none border border-2 rounded p-2 bg-primary text-light fw-bold color-primary"> Book List </Link>
          <Link to="/create" className="active text-decoration-none border-2 rounded p-2 bg-primary text-light fw-bold"> Add Book </Link>
        </nav><hr />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    // </Router>
  );
}
