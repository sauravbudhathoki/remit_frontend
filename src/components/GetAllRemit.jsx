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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(10);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const startIndex = currentPage * size;

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
        `http://localhost:8080/api/v1/remittance/fetch?page=${currentPage}&size=${size}`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setRemittances(data.data.content);
        setTotalPages(data.data.totalPages);
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
      let url = `http://localhost:8080/api/v1/remittance/sender?senderName=${encodeURIComponent(
        senderName
      )}`;
      if (beneficiaryName) {
        url += `&beneficiaryName=${encodeURIComponent(beneficiaryName)}`;
      }

      console.log("Searching with URL:", url); // 👈 Debugging

      const response = await fetch(url);
      // try {
      //   const response = await fetch(
      //     `http://localhost:8080/api/v1/remittance/sender?senderName=${senderName}`
      //   );
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
  }, [currentPage, size]);

  const displayData = searchResult ?? remittances;

  return (
    <div className="container" style={{ width: "100%" }}>
      <div className="card shadow-sm p-3">
        <h4 className="mb-3">Remittances</h4>

        {/* Search */}
        <div className="row align-items-end">
          <div className="col-md-4">
            <label className="form-label  mb-1"> Sender Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Sender Name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label  mb-1" >Beneficiary Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Beneficiary Name"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
            />
          </div>
          
            <div className="col-md-2 text-start mt-1">
                <button className="btn btn-primary me-2" 
                onClick={searchBySenderName}>
                Search
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchResult(null);
                  setSenderName("");
                  setBeneficiaryName("");
                }}
              >
                Reset
              </button>
            </div>
          

          {/* <div className="col-md-2 text-start mt-2">
          <button className="btn btn-primary" onClick={searchBySenderName}>
            Search
          </button>
        </div>
        <div className="col-md-2 ">
          <button
            className="btn btn-secondary mt-2"
            onClick={() => {
              setSearchResult(null);
              setSenderName("");
              setBeneficiaryName("");
            }}
          >
            Reset
          </button>
        </div> */}
        </div>

        <div className="row mb-4 justify-content-field">
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
                  displayData.map((remit, index) => (
                    <tr key={remit.id}>
                      <td>{startIndex + index + 1}</td>
                      <td style={{ padding: "0.25rem 0.5rem" }}>
                        {remit.globalRemitControlNo}
                      </td>
                      <td style={{ padding: "0.25rem 0.5rem" }}>
                        {remit.senderName}
                      </td>
                      <td style={{ padding: "0.25rem 0.5rem" }}>
                        {remit.referenceNo}
                      </td>
                      <td style={{ padding: "0.25rem 0.5rem" }}>
                        {remit.beneficiaryName}
                      </td>
                      <td style={{ padding: "0.25rem 0.5rem" }}>
                        {remit.localAmount}
                      </td>
                      <td style={{ padding: "0.25rem 0.5rem" }}>
                        {remit.currency}
                      </td>
                      <td style={{ padding: "0.25rem 0.5rem" }}>
                        {remit.purposeOfFund}
                      </td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-lg"
                          onClick={() =>
                            navigate("/view-remit", { state: { remit } })
                          }
                          title="View"
                        >
                          <i
                            className="bi bi-eye"
                            style={{ color: "blue" }}
                          ></i>
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
            {!searchResult && totalPages > 1 && (
              <nav>
                <ul className="pagination justify-content-left mt-3">
                  <li
                    className={`page-item ${
                      currentPage === 0 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages - 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
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
