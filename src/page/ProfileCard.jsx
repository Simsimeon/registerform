import React, { useRef } from "react";
import { useProfile } from "../context/ProfileProvider";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ProfileCard = () => {
  const printRef = useRef();
  const { name, email, completeValidEmail, error, setError } = useProfile();
  const downloadPdfTicket = async () => {
    // THIS WILL GET THE DOM ELEMENT
    const element = printRef.current;
    if (!element) throw new Error("Element not found");
    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    const imageProperties = doc.getImageProperties(data);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight =
      (imageProperties.height * pdfWidth) / imageProperties.width;

    doc.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    doc.save("ticket.pdf");
  };
  return (
    <div className="wrapper profile-card">
      <div ref={printRef}>
        <h2>Name:{name}</h2>
        <h2>email:{email}</h2>
        <button className="btn" onClick={downloadPdfTicket}>
          Download your Ticket
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
