import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  sourceAgent: "",
  globalRemitControlNo: "",
  senderName: "",
  address: "",
  senderMobile: "",
  senderTelephone: "",
  sendersIdType: "",
  senderIdNo: "",
  source: "",
  purposeOfFund: "",
  beneficiaryName: "",
  beneficiaryAddress: "",
  beneficiaryTelephone: "",
  beneficiaryMobile: "",
  idType: "",
  beneficiaryIdNo: "",
  agentLocation: "",
  agentDescription: "",
  agentAddress: "",
  currency: "",
  localAmount: "",
  amountInWords: "",
  referenceNo: "",
  remarks: ""
};

const idTypes = ["Passport", "National ID", "Driver License","CitizenShip"];
const currencies = ["USD", "EUR", "GBP", "NPR", "INR"];

const RemitForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

  

    try {
      const response = await fetch("http://localhost:8080/api/v1/remittance/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, localAmount: parseFloat(formData.localAmount) })
      });

      const data = await response.json();

      if (response.ok && data.success !== false) {
        setMessage("Remittance created successfully!");
        setFormData(initialFormData);
      } else {
        setError(data.message || "Failed to create remittance");
      }
    } catch (err) {
      setError("Error connecting to backend");
    }
  };

  // --- Return JSX ---
  return (
    <div className="container-responsive mt-4">
      <div className=" col-12 col-md-6card shadow-sm p-4">
        <h5 className="text-center">REMITTANCE FORM</h5>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Sender Details */}
          <h5 className="mb-3">Sender Details</h5>
          <div className="row mb-3 align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Name</label>
              <input type="text" className="form-control" name="senderName" value={formData.senderName} onChange={handleChange} required/>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Mobile</label>
              <input type="text" className="form-control" name="senderMobile" value={formData.senderMobile} onChange={handleChange} required/>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Telephone</label>
              <input type="text" className="form-control" name="senderTelephone" value={formData.senderTelephone} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Address</label>
              <textarea className="form-control" rows="2" name="address" value={formData.address} onChange={handleChange} required></textarea>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Global Remit No</label>
              <input type="text" className="form-control" name="globalRemitControlNo" value={formData.globalRemitControlNo} onChange={handleChange} required />
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>ID Type</label>
              <select className="form-select" name="sendersIdType" value={formData.sendersIdType} onChange={handleChange} required>
                <option value="">Select ID Type</option>
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver License">Driver License</option>
                <option value="CitizenShip">CitizenShip</option>
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>ID Number</label>
              <input type="text" className="form-control" name="senderIdNo" value={formData.senderIdNo} onChange={handleChange} required />
            </div>
          </div>

          {/* Beneficiary Details */}
          <h5 className="mb-3 mt-4">Beneficiary Details</h5>
          <div className="row mb-3 align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Name</label>
              <input type="text" className="form-control" name="beneficiaryName" value={formData.beneficiaryName} onChange={handleChange} required />
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Mobile</label>
              <input type="text" className="form-control" name="beneficiaryMobile" value={formData.beneficiaryMobile} onChange={handleChange}  required/>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Telephone</label>
              <input type="text" className="form-control" name="beneficiaryTelephone" value={formData.beneficiaryTelephone} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Address</label>
              <textarea className="form-control" rows="2" name="beneficiaryAddress" value={formData.beneficiaryAddress} onChange={handleChange} required></textarea>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>ID Type</label>
              <select className="form-select" name="idType" value={formData.idType} onChange={handleChange} required>
                <option value="">Select ID Type</option>
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver License">Driver License</option>
                <option value="CitizenShip">CitizenShip</option>
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>ID Number</label>
              <input type="text" className="form-control" name="beneficiaryIdNo" value={formData.beneficiaryIdNo} onChange={handleChange} required/>
            </div>
          </div>

          {/* Transaction & Amount Details */}
          <h5 className="mb-3 mt-4">Transaction & Amount Details</h5>
          <div className="row mb-3 align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Source</label>
              <input type="text" className="form-control" name="source" value={formData.source} onChange={handleChange} required/>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Purpose of Fund</label>
              <input type="text" className="form-control" name="purposeOfFund" value={formData.purposeOfFund} onChange={handleChange} required/>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Source Agent</label>
              <input type="text" className="form-control" name="sourceAgent" value={formData.sourceAgent} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Agent Address</label>
              <input type="text" className="form-control" name="agentAddress" value={formData.agentAddress} onChange={handleChange} required/>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Agent Location</label>
              <input type="text" className="form-control" name="agentLocation" value={formData.agentLocation} onChange={handleChange} required/>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Agent Description</label>
              <input type="text" className="form-control" name="agentDescription" value={formData.agentDescription} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Local Amount</label>
              <input type="number" className="form-control" name="localAmount" value={formData.localAmount} onChange={handleChange} min="0" step="0.01" required/>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Currency</label>
              <select className="form-select" name="currency" value={formData.currency} onChange={handleChange}>
                <option value="">Select Currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="NPR">NPR</option>
                <option value="INR">INR</option>
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Amount in Words</label>
              <input type="text" className="form-control" name="amountInWords" value={formData.amountInWords} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Reference No</label>
              <input type="text" className="form-control" name="referenceNo" value={formData.referenceNo} onChange={handleChange} required />
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <label className="form-label me-2 mb-0" style={{ minWidth: '110px' }}>Remarks</label>
              <textarea className="form-control" rows="3" name="remarks" value={formData.remarks} onChange={handleChange} ></textarea>
            </div>
          </div>

          <div className="d-flex justify-content-between gap-2">
            <button
            className="btn btn-secondary border border-dark "
            onClick={() => navigate("/all")}
            title="Go to Remittances"
          >
            Back
          </button>
          <div>
            <button type="button" className="btn btn-outline-secondary me-2" onClick={() => setFormData(initialFormData)}>Reset</button>
            <button type="submit" className="btn btn-dark">Submit</button>
           </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RemitForm;
