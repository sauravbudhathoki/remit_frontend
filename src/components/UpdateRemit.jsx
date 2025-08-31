import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

const idTypes = ["Passport", "National ID", "Driver License","CitizenShip"];
const currencies = ["USD", "EUR", "GBP", "NPR", "INR"];

const UpdateRemitForm = () => {
  const location = useLocation();
  const params = useParams();
  const [formData, setFormData] = useState(location.state?.remit || {});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch remit if state is not passed (e.g., page refresh)
  useEffect(() => {
    if (!location.state?.remit && params.id) {
      fetchRemitById(params.id);
    }
  }, [params.id]);

  const fetchRemitById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/remittance/${id}`);
      const data = await response.json();
      if (response.ok && data.success) {
        setFormData(data.data);
      } else {
        setError(data.message || "Remittance not found");
      }
    } catch {
      setError("Error connecting to backend");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/remittance/update?id=${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok && data.success) {
        setMessage("Remittance updated successfully!");
        navigate("/all");
      } else {
        setError(data.message || "Failed to update remittance");
      }
    } catch {
      setError("Error connecting to backend");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      <div className="card shadow-sm p-4">
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleUpdate}>
          {/* Sender Details */}
          <h5 className="mb-3 mt-4">Sender Details</h5>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Global Remit No</label>
              <input
                type="text"
                className="form-control"
                name="globalRemitControlNo"
                value={formData.globalRemitControlNo || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Sender Name</label>
              <input
                type="text"
                className="form-control"
                name="senderName"
                value={formData.senderName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Sender Mobile</label>
              <input
                type="text"
                className="form-control"
                name="senderMobile"
                value={formData.senderMobile || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Sender Telephone</label>
              <input type="text" className="form-control" name="senderTelephone" value={formData.senderTelephone || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Sender Address</label>
              <input type="text" className="form-control" name="address" value={formData.address || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Sender ID Type</label>
              <select className="form-select" name="sendersIdType" value={formData.sendersIdType || ""} onChange={handleChange}>
                <option value="">Select ID Type</option>
                {idTypes.map(id => <option key={id} value={id}>{id}</option>)}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Sender ID Number</label>
              <input type="text" className="form-control" name="senderIdNo" value={formData.senderIdNo || ""} onChange={handleChange} />
            </div>
          </div>

          {/* Beneficiary Details */}
          <h5 className="mb-3 mt-4">Beneficiary Details</h5>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Beneficiary Name</label>
              <input type="text" className="form-control" name="beneficiaryName" value={formData.beneficiaryName || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Beneficiary Mobile</label>
              <input type="text" className="form-control" name="beneficiaryMobile" value={formData.beneficiaryMobile || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Beneficiary Telephone</label>
              <input type="text" className="form-control" name="beneficiaryTelephone" value={formData.beneficiaryTelephone || ""} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Beneficiary Address</label>
              <input type="text" className="form-control" name="beneficiaryAddress" value={formData.beneficiaryAddress || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Beneficiary ID Type</label>
              <select className="form-select" name="idType" value={formData.idType || ""} onChange={handleChange}>
                <option value="">Select ID Type</option>
                {idTypes.map(id => <option key={id} value={id}>{id}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Beneficiary ID Number</label>
              <input type="text" className="form-control" name="beneficiaryIdNo" value={formData.beneficiaryIdNo || ""} onChange={handleChange} />
            </div>
          </div>

          {/* Transaction & Amount */}
          <h5 className="mb-3 mt-4">Transaction & Amount Details</h5>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Purpose of Fund</label>
              <input type="text" className="form-control" name="purposeOfFund" value={formData.purposeOfFund || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Source</label>
              <input type="text" className="form-control" name="source" value={formData.source || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Source Agent</label>
              <input type="text" className="form-control" name="sourceAgent" value={formData.sourceAgent || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Agent Location</label>
              <input type="text" className="form-control" name="agentLocation" value={formData.agentLocation || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Agent Description</label>
              <input type="text" className="form-control" name="agentDescription" value={formData.agentDescription || ""} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Agent Address</label>
              <input type="text" className="form-control" name="agentAddress" value={formData.agentAddress || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Local Amount</label>
              <input type="number" className="form-control" name="localAmount" value={formData.localAmount || ""} onChange={handleChange} min="0" step="0.01" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Currency</label>
              <select className="form-select" name="currency" value={formData.currency || ""} onChange={handleChange}>
                <option value="">Select Currency</option>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Amount in Words</label>
              <input type="text" className="form-control" name="amountInWords" value={formData.amountInWords || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Reference No</label>
              <input type="text" className="form-control" name="referenceNo" value={formData.referenceNo || ""} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Remarks</label>
              <input type="text" className="form-control" name="remarks" value={formData.remarks || ""} onChange={handleChange} />
            </div>
          </div>

          
          <div className="d-flex justify-content-end gap-2 mt-3">
          
          <button type="submit" className="btn btn-success">
              Update
            </button>

          <button
            className="btn btn-secondary border border-dark "
            onClick={() => navigate("/all")}
            title="Go to Remittances"
          >
            Back
          </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRemitForm;
