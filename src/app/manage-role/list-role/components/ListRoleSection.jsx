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
import Buttons from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function ListRoleSection() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!user?.adminID || !accessToken) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await FetchData_GET(
          `${constants.roleListApi}?portal=ADMIN`,
          accessToken,
          user
        );
        if (result) setData(result);
      } catch (error) {
        console.log("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, accessToken]);

  return (
    <Layout>
      <PageHeader title="Role List" />
      <CardUI>
        <div className="flex justify-end space-x-4">
          <Buttons
            label="Add New Role"
            className="min-w-[130px]"
            onClick={() => {
              router.push(routes_list.role_create); // Ensure this route is defined
            }}
          />
        </div>

        {isLoading ? (
          <SpinnerLoader showLoadingText={true} />
        ) : (
          <TelerikTable
            data={data}
            fields={[
              {
                fieldTitle: "Title",
                fieldName: "title",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Description",
                fieldName: "description",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "PII",
                fieldName: "isPII",
                format: "DATA",
                isHidden: false,
              },
            ]}
            actionsList={[
              {
                fieldTitle: "View Role",
                fieldName: "view_Role",
                fieldURL: routes_list.role_detail,
                fieldProperty: "roleID",
              },
              {
                fieldTitle: "Delete",
                fieldName: "delete_role",
                fieldProperty: "roleID",
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
            excelFileName={`Role_List_${getISOFormatDatetime()}`}
            pdfFileName={`Role_List_${getISOFormatDatetime()}`}
          />
        )}
      </CardUI>
    </Layout>
  );
}
