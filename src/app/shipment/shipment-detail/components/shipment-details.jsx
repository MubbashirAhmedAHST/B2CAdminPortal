"use client";

import { toTitleCase } from "@/helpers/utilities";
import { constants } from "@/helpers/constants";
import {
  PiDownloadSimpleBold,
  PiTrashBold,
} from "react-icons/pi";
import { FetchData_POST } from "@/helpers/dal";
import { useSelector } from "react-redux";
import ModalComponent from "@/components/ui/model";
import { useState } from "react";
import CardUI from "@/components/cards/card-ui";

export default function ShipmentDetails({ code, shipment, unsuccessfull }) {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [shipmentToCancel, setShipmentToCancel] = useState(null);
  const [cancelSuccessMessage, setCancelSuccessMessage] = useState("");

  const openOptions = () => {
    const element = document.getElementById("optionBtnmenu");

    if (!element) return;

    if (element.classList.contains("show")) {
      element.classList.remove("show");
    } else {
      element.classList.add("show");

      // Auto-close after 5 seconds
      setTimeout(() => {
        element.classList.remove("show");
      }, 5000);
    }
  };

  const downloadAllLabels = (code) => {
    const requestBody = {
      selectedShipmentCodes: [code],
    };

    FetchData_POST(
      constants.DownloadAllShipment,
      requestBody,
      accessToken,
      user
    )
      .then((data) => {
        if (!data || !data.fileContents) {
          console.log(data);
          throw new Error("Invalid file data received");
        }

        // Decode base64 file content
        const byteCharacters = atob(data.fileContents);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i += 512) {
          const slice = byteCharacters.slice(i, i + 512);
          const byteNumbers = new Array(slice.length);
          for (let j = 0; j < slice.length; j++) {
            byteNumbers[j] = slice.charCodeAt(j);
          }
          byteArrays.push(new Uint8Array(byteNumbers));
        }

        // Create Blob and trigger download
        const blob = new Blob(byteArrays, {
          type: data.contentType || "application/octet-stream",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          data.fileDownloadName || `Shipment_Labels_${code}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log("Download failed:", error);
        alert("Failed to download labels. Please try again.");
      });
  };

  // Open modal
  const openCancelModal = (code) => {
    setShipmentToCancel(code);
    setCancelModalOpen(true);
  };
  const closeOptions = () => {
    const element = document.getElementById("optionBtnmenu");
    if (element && element.classList.contains("show")) {
      element.classList.remove("show");
    }
  };

  const confirmCancelShipment = () => {
    const code = shipmentToCancel;
    const requestBody = {
      shipmentCode: code,
      modifiedBy: user?.email || "system",
      modifiedAt: new Date().toISOString(),
    };

    FetchData_POST(constants.CancelShipment, requestBody, accessToken, user)
      .then((data) => {
        if (!data || data.error) {
          console.log("Cancel failed:", data);
          throw new Error(data?.error?.[0] || "Failed to cancel shipment");
        } else {
          window.location.reload();
          setCancelSuccessMessage("Shipment cancelled successfully.");
        }
      })
      .catch((error) => {
        console.log("Cancel shipment failed:", error);
        alert("Failed to cancel shipment. Please try again.");
      });
  };

  return (
    <>
      <CardUI>
        <div className="row mb-3">
          <div className="col-md-10">
            <h4>
              <b className="text-danger text-uppercase">
                {unsuccessfull ? "Incomplete Shipment: " : "Shipment: "}
              </b>
              <span>{code}</span>
            </h4>
          </div>
          <div className="col-md-2">
            <div className="relative float-right">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle"
                  onClick={openOptions}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Shipment Actions
                </button>

                <div
                  id="optionBtnmenu"
                  className="dropdown-menu z-10 mt-1 border border-gray-200 rounded-md shadow-lg bg-white dark:bg-gray-800"
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    width: "220px",
                  }}
                >
                  <div
                    className="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      downloadAllLabels(code);
                      closeOptions();
                    }}
                  >
                    <div className="flex">
                      <PiDownloadSimpleBold className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-300" />
                      <span className="whitespace-nowrap">
                        Download All Labels
                      </span>
                    </div>
                  </div>

                  {shipment.shipmentStatus !== "CANCELLED" && (
                    <div
                      className="dropdown-item flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        openCancelModal(code);
                        closeOptions();
                      }}
                    >
                      <div className="flex">
                        <PiTrashBold className="mr-2 h-5 w-5 text-gray-500" />
                        <span className="whitespace-nowrap">
                          Cancel Shipment
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Status:</strong>{" "}
            <span
              className={`label ${shipment.shipmentStatus.toUpperCase()}Style`}
            >
              {toTitleCase(shipment.shipmentStatus)}
            </span>
          </div>
          <div>
            <strong>Payment Method:</strong>{" "}
            {shipment.paymentMethod?.replaceAll("_", " ") || "-"}
          </div>
          <div>
            <strong>Promo Code:</strong>{" "}
            {shipment.appliedPromotionCode || "Not Applied"}
          </div>
          <div>
            <strong>Type:</strong> {toTitleCase(shipment.shipmentType)}
          </div>
          <div>
            <strong>Medium:</strong> {toTitleCase(shipment.shipmentMedium)}
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {new Date(shipment.shipmentDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Residential:</strong>{" "}
            {shipment.isResidential ? "Yes" : "No"}
          </div>
          <div>
            <strong>Import Control:</strong>{" "}
            {shipment.isImportControl ? "Yes" : "No"}
          </div>
          <div>
            <strong>Invoice Generated:</strong>{" "}
            {shipment.isInvoiceProduced ? "Yes" : "No"}
          </div>
        </div>
      </CardUI>

      <ModalComponent
        open={isCancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          setCancelSuccessMessage("");
        }}
        header="Cancel Shipment"
        isButton={!cancelSuccessMessage}
        buttonlabel="Yes, Cancel"
        buttonAction={confirmCancelShipment}
        closeButtonLabel={cancelSuccessMessage ? "Close" : "No, Keep It"}
      >
        {cancelSuccessMessage ? (
          <p className="text-green-600 text-sm">{cancelSuccessMessage}</p>
        ) : (
          <p className="text-gray-700 text-sm">
            Are you sure you want to <strong>cancel this shipment</strong>?
            <br />
            This action cannot be undone.
          </p>
        )}
      </ModalComponent>
    </>
  );
}
