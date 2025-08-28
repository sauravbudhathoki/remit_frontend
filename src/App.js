import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RemitForm from "./components/RemitForm";
import UpdateRemit from "./components/UpdateRemit";
import GetAllRemit from "./components/GetAllRemit";
import ViewRemit from "./components/ViewRemit";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from "react";

function App() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">RemitApp</Link>
          <div className="d-flex align-items-center">
            <div className="text-light me-3">
              {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
            </div>
            <Link className="btn btn-outline-light" to="/all">Remittances</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<GetAllRemit />} />
          <Route path="/all" element={<GetAllRemit />} />
          <Route path="/create" element={<RemitForm />} />
          <Route path="/update-remit/:id" element={<UpdateRemit />} />
          <Route path="/view-remit" element={<ViewRemit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
