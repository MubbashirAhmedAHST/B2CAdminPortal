"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layouts/layout";
import PageHeader from "@/components/headers/page-header";
import { FetchData_GET } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import { getISOFormatDatetime } from "@/helpers/utilities";
// import { Text } from "rizzui";
import ShipmentDetails from "./shipment-details";
import ShipFromDetails from "./ship-from-details";
import ShipToDetails from "./ship-to-details";

import SpinnerLoader from "@/components/loaders/spinner-loader";
import { useSelector } from "react-redux";
import TelerikTable from "@/components/tables/telerik-table";
import CardUI from "@/components/cards/card-ui";

export default function ShipmentDetailSection({ shipmentCode }) {
  const [code, setCode] = useState("");
  const [shipment, setShipment] = useState({});
  const [shipmentItems, setShipmentItems] = useState([]);
  const [shipmentSteps, setShipmentSteps] = useState([]);
  const [extraCharges, setExtraCharges] = useState([]);
  const [pnl, setPnl] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [isDataLoading, setDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    FetchData_GET(
      `${constants.ShipmentDetail}?shipmentCode=${shipmentCode}`,
      accessToken,
      user
    ).then((result) => {
      setShipment(result.shipment);
      setShipmentItems(result.shipmentItems);
      setShipmentSteps(result.shipmentItemSteps);
      setExtraCharges(result.extraCharges);
      setDataLoading(false);
    });
  }, [shipmentCode, user, accessToken]);

  if (isDataLoading) {
    return (
      <Layout>
        <PageHeader title="Shipment Details" />
        <SpinnerLoader showLoadingText={true} />
      </Layout>
    );
  }

  if (hasError) {
    return (
      <Layout>
        <PageHeader title="Shipment Details" />
        <p className="text-red-600 p-6">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Shipment Details" />

      <ShipmentDetails
        code={shipmentCode}
        shipment={shipment}
        unsuccessfull={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
        <ShipFromDetails data={shipment} />
        <ShipToDetails data={shipment} />
      </div>

      <CardUI>
        <h4 className="text-lg font-semibold mb-3">Shipment Items</h4>
        <TelerikTable
          data={shipmentItems}
          fields={[
            {
              fieldTitle: "Tracking Number",
              fieldName: "trackingNumber",
              isHidden: false,
            },
            {
              fieldTitle: "Product Type",
              fieldName: "productType",
              isHidden: false,
            },
            {
              fieldTitle: "Declared Weight (LBS)",
              fieldName: "declaredWeight",
              format: "{0:N2}",
              isHidden: false,
            },
            {
              fieldTitle: "Declared Value ($)",
              fieldName: "declaredValue",
              format: "{0:c}",
              isHidden: false,
            },
            {
              fieldTitle: "Length (INCH)",
              fieldName: "declaredLength",
              format: "{0:NUMBER}",
              isHidden: false,
            },
            {
              fieldTitle: "Width (INCH)",
              fieldName: "declaredWidth",
              format: "{0:NUMBER}",
              isHidden: false,
            },
            {
              fieldTitle: "Height (INCH)",
              fieldName: "declaredHeight",
              format: "{0:NUMBER}",
              isHidden: false,
            },
            {
              fieldTitle: "Package Ref #1",
              fieldName: "packageRef1",
              isHidden: false,
            },
            {
              fieldTitle: "Package Ref #2",
              fieldName: "packageRef2",
              isHidden: false,
            },
            {
              fieldTitle: "Package Ref #3",
              fieldName: "packageRef3",
              isHidden: false,
            },
            {
              fieldTitle: "Label Status",
              fieldName: "isLabelCancelled",
              isHidden: true,
            },
            { fieldTitle: "Status", fieldName: "status", isHidden: false },
          ]}
          actionsList={[
            {
              fieldTitle: "Download Label",
              fieldName: "download_label",
              fieldProperty: "shipmentItemID", // or shipmentItemID if needed
            },
            {
              fieldTitle: "Cancel Shipment Item",
              fieldName: "cancel_shipment_item",
              fieldProperty: "shipmentItemID", // or appropriate key
            },
          ]}
          allowFiltering={false}
          allowSorting={false}
          allowGrouping={false}
          showToolbar={false}
          showExportAsPDF={false}
          showExportAsExcel={false}
          excelFileName={`Shipment_Items_${getISOFormatDatetime()}`}
          pdfFileName={`Shipment_Items_${getISOFormatDatetime()}`}
        />
      </CardUI>

      <CardUI>
        <h4 className="text-lg font-semibold mb-3">Extra Charges</h4>
        <TelerikTable
          data={extraCharges}
          fields={[
            { fieldTitle: "Charges", fieldName: "title", isHidden: false },
            {
              fieldTitle: "Amount ($)",
              fieldName: "amount",
              format: "{0:c}",
              isHidden: false,
            },
          ]}
          allowFiltering={false}
          allowSorting={false}
          allowGrouping={false}
          showToolbar={false}
          showExportAsPDF={true}
          showExportAsExcel={true}
          excelFileName={`Extra_Charges_${getISOFormatDatetime()}`}
          pdfFileName={`Extra_Charges_${getISOFormatDatetime()}`}
        />
      </CardUI>

      <CardUI>
        <h4 className="text-lg font-semibold mb-3">Shipment Steps</h4>
        <TelerikTable
          data={shipmentSteps}
          fields={[
            {
              fieldTitle: "Shipment Item Step ID",
              fieldName: "shipmentItemStepID",
              format: "{0:NUMBER}",
              isHidden: true,
            },
            {
              fieldTitle: "Tracking Number",
              fieldName: "trackingNumber",
              isHidden: false,
            },
            {
              fieldTitle: "Date Updated",
              fieldName: "stepAt",
              format: "{0:dd-MM-yyyy}",
              isHidden: false,
            },
            { fieldTitle: "Status", fieldName: "stepCode", isHidden: false },
            {
              fieldTitle: "Vendor Status",
              fieldName: "vendorStatus",
              isHidden: false,
            },
          ]}
          allowFiltering={false}
          allowSorting={false}
          allowGrouping={false}
          showToolbar={false}
          showExportAsPDF={false}
          showExportAsExcel={false}
          excelFileName={`Shipment_Steps_${getISOFormatDatetime()}`}
          pdfFileName={`Shipment_Steps_${getISOFormatDatetime()}`}
        />
      </CardUI>
    </Layout>
  );
}
