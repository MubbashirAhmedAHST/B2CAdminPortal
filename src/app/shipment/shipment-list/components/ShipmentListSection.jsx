"use client";

import Layout from "@/components/layouts/layout";
import PageHeader from "@/components/headers/page-header";
import TelerikTable from "@/components/tables/telerik-table";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FetchData_GET } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import { getISOFormatDatetime } from "@/helpers/utilities";
import SpinnerLoader from "@/components/loaders/spinner-loader";

import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function ShipmentListSection() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!user?.adminID || !accessToken) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await FetchData_GET(
          `${constants.ListOfShipment}`,
          accessToken,
          user
        );
        if (result) setData(result);
      } catch (error) {
        console.log("Failed to fetch profile details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, accessToken]);
  return (
    <Layout>
      <PageHeader title="List of Shipments" />
      <CardUI>
        {isLoading ? (
          <SpinnerLoader showLoadingText={true} />
        ) : (
          <TelerikTable
            data={data}
            fields={[
              {
                fieldTitle: "Shipment Code",
                fieldName: "shipmentCode",
                format: "{0:LINK}",
                fieldLink: routes_list.shipment_detail + "/",
                isHidden: false,
              },
              {
                fieldTitle: "Shipment Date",
                fieldName: "shipmentDate",
                format: "{0:dd-MM-yyyy}",
                isHidden: false,
              },
              {
                fieldTitle: "From Name",
                fieldName: "shipFromName",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "From Address",
                fieldName: "shipFrom",
                format: "",
                isHidden: false,
              },

              {
                fieldTitle: "To Name",
                fieldName: "shipToName",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "To Address",
                fieldName: "shipTo",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Status",
                fieldName: "shipmentStatus",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Total Amount",
                fieldName: "totalAmount",
                format: "{0:c}",
                isHidden: false,
              },
              {
                fieldTitle: "No. of Packages",
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
              {
                fieldTitle: "Delete",
                fieldName: "delete_shipment",
                fieldProperty: "shipmentCode",
                fieldURL: "",
              },
              // {
              //   fieldTitle: "Download All Labels",
              //   fieldName: "downloadAll_label",
              //   fieldProperty: "shipmentCode",
              // },
              // {
              //   fieldTitle: "Cancel Shipment",
              //   fieldName: "cancel_Allshipment_item",
              //   fieldProperty: "shipmentCode",
              // },
            ]}
            showIDField={true}
            allowFiltering={true}
            allowSorting={true}
            allowGrouping={true}
            showToolbar={true}
            showExportAsPDF={true}
            showExportAsExcel={true}
            excelFileName={`Employee_List_${getISOFormatDatetime()}`}
            pdfFileName={`Employee_List_${getISOFormatDatetime()}`}
          />
        )}
      </CardUI>
    </Layout>
  );
}
