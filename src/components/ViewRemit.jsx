import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const idTypes = ["Passport", "National ID", "Driver License"];
const currencies = ["USD", "EUR", "GBP", "NPR"];

const ViewRemit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const remit = location.state?.remit;

  // Ref to the part of the page we want to convert to pdf
  const pdfRef = useRef();

  if (!remit) {
    return (
      <div className="container-fluid mt-4">
        <p className="text-danger">No remittance data to display.</p>
        <button className="btn btn-secondary" onClick={() => navigate("/all")}>
          Back
        </button>
      </div>
    );
  }
  const downloadPDF = async () => {
    const element = pdfRef.current;

    //capture the html element as a canvas
    const canvas = await html2canvas(element);

    //convert canvas to image
    const imgData = canvas.toDataURL("image/png");

    //create pdf
    const pdf = new jsPDF("l", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Remittance_${remit.globalRemitControlNo}.pdf`);
  };

  return (
    <div className="container-fluid mt-3 " style={{ maxWidth: "1500px" }}>
      <div className="card shadow-sm p-4" ref={pdfRef}>
        <h4 className="mb-3 text-center">Remittance Details</h4>

        {/* Sender Details */}
        <h5 className="mb-4 mt-4">Sender Details</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Global Remit No:</strong> {remit.globalRemitControlNo}
          </div>
          <div className="col-md-4">
            <strong>Sender Name:</strong> {remit.senderName}
          </div>
          <div className="col-md-4">
            <strong>Sender Mobile:</strong> {remit.senderMobile}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Sender Telephone:</strong> {remit.senderTelephone}
          </div>
          <div className="col-md-4">
            <strong>Sender Address:</strong> {remit.address}
          </div>
          <div className="col-md-4">
            <strong>Sender ID Type:</strong> {remit.sendersIdType}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Sender ID Number:</strong> {remit.senderIdNo}
          </div>
        </div>

        {/* Beneficiary Details */}
        <h5 className="mb-4 mt-4">Beneficiary Details</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Beneficiary Name:</strong> {remit.beneficiaryName}
          </div>
          <div className="col-md-4">
            <strong>Beneficiary Mobile:</strong> {remit.beneficiaryMobile}
          </div>
          <div className="col-md-4">
            <strong>Beneficiary Telephone:</strong> {remit.beneficiaryTelephone}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Beneficiary Address:</strong> {remit.beneficiaryAddress}
          </div>
          <div className="col-md-4">
            <strong>Beneficiary ID Type:</strong> {remit.idType}
          </div>
          <div className="col-md-4">
            <strong>Beneficiary ID Number:</strong> {remit.beneficiaryIdNo}
          </div>
        </div>

        {/* Transaction & Amount */}
        <h5 className="mb-4 mt-4">Transaction & Amount Details</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Purpose of Fund:</strong> {remit.purposeOfFund}
          </div>
          <div className="col-md-4">
            <strong>Source:</strong> {remit.source}
          </div>
          <div className="col-md-4">
            <strong>Source Agent:</strong> {remit.sourceAgent}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Agent Location:</strong> {remit.agentLocation}
          </div>
          <div className="col-md-4">
            <strong>Agent Description:</strong> {remit.agentDescription}
          </div>
          <div className="col-md-4">
            <strong>Agent Address:</strong> {remit.agentAddress}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Local Amount:</strong> {remit.localAmount}
          </div>
          <div className="col-md-4">
            <strong>Currency:</strong> {remit.currency}
          </div>
          <div className="col-md-4">
            <strong>Amount in Words:</strong> {remit.amountInWords}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <strong>Reference No:</strong> {remit.referenceNo}
          </div>
          <div className="col-md-4">
            <strong>Remarks:</strong> {remit.remarks}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-1">
        <button
          className="btn btn-lg  border border-dark "
          onClick={downloadPDF}
          title="Download as PDF"
        >
          <i
            className="bi bi-printer"
            style={{ color: "green", fontSize: "1.2rem" }}
          ></i>
        </button>

        <button
          className="btn btn-secondary border border-dark "
          onClick={() => navigate("/all")}
          title="Go to Remittances"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewRemit;
