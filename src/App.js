import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RemitForm from "./components/RemitForm";
import UpdateRemit from "./components/UpdateRemit";
import GetAllRemit from "./components/GetAllRemit";
import ViewRemit from "./components/ViewRemit";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from "react";
import logo from "./assets/logo.jpg";

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-light">
        <div className="container-fluid ">
          <Link className="navbar-brand text-dark ms-2" to="/">
          <img src={logo}
          alt="RemitX"
          style={{height:"40px"}}
          />
          </Link>
          <div className="d-flex align-items-center">
            <div className="text-dark me-3">
              {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
            </div>
            <Link className=" text-dark text-decoration-none border border-dark px-3 py-1 rounded " to="/all">Remittances</Link>
            <Link className=" text-dark text-decoration-none border border-dark px-3 py-1 rounded  ms-3 text-end" to="/" >Logout</Link>       
          </div>
          </div>
            </nav>

            <nav className="navbar navbar-expand-lg bg-success">          
            <div className="container ">
              <Link className="btn text-light" to="/dashboard">DashBoard</Link>
              <Link className="btn text-light " to="/kyc">KYC</Link>
              <Link className="btn text-light" to="/settings">Settings</Link>
               <Link className=" btn text-light" to="/profile">Commission</Link>
                <Link className="btn text-light " to="/reports">Support</Link>
                <Link className="btn text-light " to="/help">TT Invoice</Link>
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
