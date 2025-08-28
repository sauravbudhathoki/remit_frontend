import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RemitForm from "./RemitForm";

const AllRemittances = () => {
  const [remittances, setRemittances] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [senderName, setSenderName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Navigate to UpdateRemitForm with selected remit
  // Navigate to UpdateRemitForm with selected remit
  const handleUpdateClick = (remit) => {
    navigate(`/update-remit/${remit.id}`, { state: { remit } });
  };

  // Fetch all remittances
  const fetchRemittances = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/remittance/fetch"
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setRemittances(data.data);
      } else {
        setError(data.message || "Failed to fetch remittances");
      }
    } catch {
      setError("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  // Search by sender name
  const searchBySenderName = async () => {
    if (!senderName) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/remittance/sender?senderName=${senderName}`
      );
      const data = await response.json();

      if (response.ok && data.success && data.data) {
        setSearchResult(data.data);
      } else {
        setError(data.message || "Remit not found");
        setSearchResult([]);
      }
    } catch {
      setError("Error connecting to backend");
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  

  // Delete a remit
  const handleDelete = async (remitId) => {
    if (!window.confirm("Are you sure you want to delete this remittance?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/remittance/delete?id=${remitId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Remittance deleted successfully!");
        fetchRemittances(); // Refresh after delete
      } else {
        alert("Failed to delete remittance.");
      }
    } catch {
      alert("Error connecting to backend");
    }
  };

  useEffect(() => {
    fetchRemittances();
  }, []);

  const displayData = searchResult ?? remittances;

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-sm p-3">
      <h4 className="mb-3">Remittances</h4>

      {/* Search */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Sender Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
        </div>
        <div className="col-md-2 text-start">
          <button className="btn btn-primary" onClick={searchBySenderName}>
            Search
          </button>
        </div>
        <div className="col-md-2 text end">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchResult(null);
              setSenderName("");
            }}
          >
            Reset
          </button>
        </div>
      </div>

  <div className="row mb-4 align-items-center">
  <div className="col-md-6">
    <h4>Remittance List</h4>
  </div>
  <div className="col-md-6 text-end">
    <button
      className="btn btn-success"
      onClick={() => navigate("/create")}
    >
      Add Remittance
    </button>
  </div>
</div>

  
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-sm mb-0">
            <thead className="table-light">
              <tr>
                <th>S.N</th>
                <th>Global Remit No</th>
                <th>Sender Name</th>
                <th>Reference No</th>
                <th>Beneficiary Name</th>
                <th>Local Amount</th>
                <th>Currency</th>
                <th>Purpose of Fund</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No records found
                  </td>
                </tr>
              ) : (
                displayData.map((remit,index) => (
                  <tr key={remit.id}>
                    <td>{index+1}</td>
                    <td style={{padding:"0.25rem 0.5rem"}}>{remit.globalRemitControlNo}</td>
                    <td style={{padding:"0.25rem 0.5rem"}}>{remit.senderName}</td>
                    <td style={{padding:"0.25rem 0.5rem"}}>{remit.referenceNo}</td>
                    <td style={{padding:"0.25rem 0.5rem"}}>{remit.beneficiaryName}</td>
                    <td style={{padding:"0.25rem 0.5rem"}}>{remit.localAmount}</td>
                    <td style={{padding:"0.25rem 0.5rem"}}>{remit.currency}</td>
                    <td style={{padding:"0.25rem 0.5rem"}}>{remit.purposeOfFund}</td>
                    <td className="d-flex gap-2">
                      <button
                      className="btn btn-sm"
                      onClick={()=>navigate("/view-remit",{state:{remit}})}
                      title="View"
                      >
                        <i className="bi bi-eye" style={{color:"blue"}}></i>  
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleUpdateClick(remit)}
                        title="Update"
                      >
                        <i className="bi bi-pencil-square fs-5 text-success"></i>
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleDelete(remit.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash fs-5 text-danger"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary mt-2" onClick={fetchRemittances}>
          Refresh
        </button>
      </div>
      </div>
    </div>
  );
};

export default AllRemittances;
