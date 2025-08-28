import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const idTypes = ["Passport", "National ID", "Driver License"];
const currencies = ["USD", "EUR", "GBP", "NPR"];

const ViewRemit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const remit = location.state?.remit;

  if (!remit) {
    return (
      <div className="container mt-4">
        <p className="text-danger">No remittance data to display.</p>
        <button className="btn btn-secondary" onClick={() => navigate("/all")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      <div className="card shadow-sm p-4">
        <h4 className="mb-3 text-center">Remittance Details</h4>

        {/* Sender Details */}
        <h5 className="mb-4 mt-4">Sender Details</h5>
        <div className="row mb-3">
          <div className="col-md-4"><strong>Global Remit No:</strong> {remit.globalRemitControlNo}</div>
          <div className="col-md-4"><strong>Sender Name:</strong> {remit.senderName}</div>
          <div className="col-md-4"><strong>Sender Mobile:</strong> {remit.senderMobile}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4"><strong>Sender Telephone:</strong> {remit.senderTelephone}</div>
          <div className="col-md-4"><strong>Sender Address:</strong> {remit.address}</div>
          <div className="col-md-4"><strong>Sender ID Type:</strong> {remit.sendersIdType}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4"><strong>Sender ID Number:</strong> {remit.senderIdNo}</div>
        </div>

        {/* Beneficiary Details */}
        <h5 className="mb-4 mt-4">Beneficiary Details</h5>
        <div className="row mb-3">
          <div className="col-md-4"><strong>Beneficiary Name:</strong> {remit.beneficiaryName}</div>
          <div className="col-md-4"><strong>Beneficiary Mobile:</strong> {remit.beneficiaryMobile}</div>
          <div className="col-md-4"><strong>Beneficiary Telephone:</strong> {remit.beneficiaryTelephone}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4"><strong>Beneficiary Address:</strong> {remit.beneficiaryAddress}</div>
          <div className="col-md-4"><strong>Beneficiary ID Type:</strong> {remit.idType}</div>
          <div className="col-md-4"><strong>Beneficiary ID Number:</strong> {remit.beneficiaryIdNo}</div>
        </div>

        {/* Transaction & Amount */}
        <h5 className="mb-4 mt-4">Transaction & Amount Details</h5>
        <div className="row mb-3">
          <div className="col-md-4"><strong>Purpose of Fund:</strong> {remit.purposeOfFund}</div>
          <div className="col-md-4"><strong>Source:</strong> {remit.source}</div>
          <div className="col-md-4"><strong>Source Agent:</strong> {remit.sourceAgent}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4"><strong>Agent Location:</strong> {remit.agentLocation}</div>
          <div className="col-md-4"><strong>Agent Description:</strong> {remit.agentDescription}</div>
          <div className="col-md-4"><strong>Agent Address:</strong> {remit.agentAddress}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4"><strong>Local Amount:</strong> {remit.localAmount}</div>
          <div className="col-md-4"><strong>Currency:</strong> {remit.currency}</div>
          <div className="col-md-4"><strong>Amount in Words:</strong> {remit.amountInWords}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4"><strong>Reference No:</strong> {remit.referenceNo}</div>
          <div className="col-md-4"><strong>Remarks:</strong> {remit.remarks}</div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-secondary" onClick={() => navigate("/all")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRemit;
