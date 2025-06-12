"use client";

import { useState } from "react";

import TelerikTable from "@/components/tables/telerik-table";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import { getISOFormatDatetime } from "@/helpers/utilities";
import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function DashboardTabs({ recentShipments }) {
  const [isDataLoading, setDataLoading] = useState(false);
  const [shipmentsData, setShipmentsData] = useState(recentShipments);

  return (
    <>
      <ul className="nav nav-pills border-b pb-3">
        <li className="nav-link active">
          <a data-toggle="pill" href="#tab1">
            Recent Shipments
          </a>
        </li>
        {/* <li className="nav-link">
          <a data-toggle="pill" href="#tab3">
            List of Consolidated Shipments
          </a>
        </li> */}
      </ul>
      <div className="tab-content mt-3">
        <div id="tab1" className="tab-pane fade in active">
          {!isDataLoading ? (
            <TelerikTable
              data={shipmentsData}
              fields={[
                {
                  fieldTitle: "Shipment Code",
                  fieldName: "shipmentCode",
                  isHidden: false,
                  format: "{0:LINK}",
                  fieldLink: routes_list.shipment_detail + "?code=",
                },
                {
                  fieldTitle: "From Name",
                  fieldName: "shipFromName",
                  isHidden: false,
                },
                {
                  fieldTitle: "From Address",
                  fieldName: "shipFrom",
                  isHidden: false,
                },
                {
                  fieldTitle: "To Name",
                  fieldName: "shipToName",
                  isHidden: false,
                },
                {
                  fieldTitle: "To Address",
                  fieldName: "shipTo",
                  isHidden: false,
                },

                {
                  fieldTitle: "Date",
                  fieldName: "shipmentDate",
                  format: "{0:dd-MM-yyyy}",
                  isHidden: false,
                },
                {
                  fieldTitle: "Amount",
                  fieldName: "totalAmount",
                  format: "{0:c}",
                  isHidden: false,
                },
                {
                  fieldTitle: "Status",
                  fieldName: "shipmentStatus",
                  isHidden: false,
                },
                {
                  fieldTitle: "Packages",
                  fieldName: "noOfPackages",
                  format: "{0:NUMBER}",
                  isHidden: false,
                },
              ]}
              actionsList={[
                {
                  fieldTitle: "View Shipment",
                  fieldName: "view_shipment",
                  fieldURL: routes_list.shipment_detail,
                  fieldProperty: "shipmentCode",
                },
              ]}
              allowFiltering={true}
              allowSorting={true}
              allowGrouping={true}
              showToolbar={true}
              showExportAsPDF={true}
              showExportAsExcel={true}
              excelFileName={`Recent_Shipments_${getISOFormatDatetime()}`}
              pdfFileName={`Recent_Shipments_${getISOFormatDatetime()}`}
            />
          ) : (
            <SpinnerLoader showLoadingText />
          )}
        </div>
        {/* <div id="tab3" className="tab-pane fade">
          {!isDataLoading ? (
            <TelerikTable
              data={shipmentsData}
              fields={[
                { fieldTitle: "Airway Shipment Code", fieldName: "airwayShipmentCode", format: "{0:LINK}", fieldLink: routes_list.view_airway_shipment + "?code=" },
                { fieldTitle: "Customer Name", fieldName: "customerName" },
                { fieldTitle: "Master Airway Bill Number", fieldName: "masterAWBNo" },
                { fieldTitle: "Flight Number", fieldName: "flightNo" },
                { fieldTitle: "Airway Weight (KGS)", fieldName: "airwayWeight", format: "{0:KGS}" },
                { fieldTitle: "Origin", fieldName: "source" },
                { fieldTitle: "Destination", fieldName: "destination" },
                { fieldTitle: "Flight Departure Date", fieldName: "flightDepartureDate", format: "{0:dd-MM-yyyy}", filterType: "date" },
                { fieldTitle: "Document Generated?", fieldName: "isGenerated", filterType: "boolean" },
                { fieldTitle: "Document Sent?", fieldName: "isSent", filterType: "boolean" },
              ]}
              showIDField
              allowFiltering
              allowSorting
              allowGrouping
              showToolbar
              showExportAsPDF
              showExportAsExcel
              excelFileName="List of Consolidated Shipments"
              pdfFileName="List of Consolidated Shipments"
            />
          ) : (
            <SpinnerLoader showLoadingText />
          )}
        </div> */}
      </div>
    </>
  );
}
