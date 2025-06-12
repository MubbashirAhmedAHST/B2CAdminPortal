"use client";

import Layout from "@/components/layouts/layout";
import PageHeader from "@/components/headers/page-header";
import TelerikTable from "@/components/tables/telerik-table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FetchData_GET } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import { getISOFormatDatetime } from "@/helpers/utilities";
import SpinnerLoader from "@/components/loaders/spinner-loader";

import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function VendorListSection() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (user == null || accessToken == null) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await FetchData_GET(
          `${constants.ListOfVendor}`,
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
      <PageHeader title="List of Venders" />
      <CardUI>
        {isLoading ? (
          <SpinnerLoader showLoadingText={true} />
        ) : (
          <TelerikTable
            data={data}
            fields={[
              {
                fieldTitle: "Vendor ID",
                fieldName: "vendorID",
                format: "{0:NUMBER}",
                isHidden: true,
              },
              {
                fieldTitle: "Name",
                fieldName: "name",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Email",
                fieldName: "email",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Phone",
                fieldName: "phone",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Address",
                fieldName: "address",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "City",
                fieldName: "city",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "State",
                fieldName: "state",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Postal Code",
                fieldName: "postalCode",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Country",
                fieldName: "country",
                format: "",
                isHidden: false,
              },
            ]}
            actionsList={[
              {
                fieldTitle: "View Vendor",
                fieldName: "view_vendor",
                fieldURL: routes_list.VendorDetail,
                fieldProperty: "vendorID",
              },
              {
                fieldTitle: "Delete",
                fieldName: "delete_vendor",
                fieldProperty: "vendorID",
                fieldURL: "",
              },
            ]}
            showIDField={true}
            allowFiltering={true}
            allowSorting={true}
            allowGrouping={true}
            showToolbar={true}
            showExportAsPDF={true}
            showExportAsExcel={true}
            excelFileName={`Vendors_${getISOFormatDatetime()}`}
            pdfFileName={`Vendors_${getISOFormatDatetime()}`}
          />
        )}
      </CardUI>
    </Layout>
  );
}
