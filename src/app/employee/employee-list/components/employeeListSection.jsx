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

export default function EmployeeListSection() {
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
          `${constants.ListOfEmployee}`,
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
      <PageHeader title="List of Employees" />
      <CardUI>
        {isLoading ? (
          <SpinnerLoader showLoadingText={true} />
        ) : (
          <TelerikTable
            data={data}
            fields={[
              {
                fieldTitle: "First Name",
                fieldName: "firstName",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Last Name",
                fieldName: "lastName",
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
                fieldTitle: "Designation",
                fieldName: "designation",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Role",
                fieldName: "role",
                format: "",
                isHidden: false,
              },
            ]}
            actionsList={[
              {
                fieldTitle: "View Employee",
                fieldName: "view_employee",
                fieldURL: routes_list.employee_detail,
                fieldProperty: "adminID",
              },
              {
                fieldTitle: "Delete",
                fieldName: "delete_employee",
                fieldProperty: "adminID",
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
            excelFileName={`Employee_List_${getISOFormatDatetime()}`}
            pdfFileName={`Employee_List_${getISOFormatDatetime()}`}
          />
        )}
      </CardUI>
    </Layout>
  );
}
