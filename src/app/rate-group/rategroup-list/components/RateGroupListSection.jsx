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
import Buttons from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import CardUI from "@/components/cards/card-ui";

export default function RateGroupListSection() {
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
          `${constants.ListOfRateGroup}`,
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
      <PageHeader title="List of Rate Groups" />
      <CardUI>
        <div className="flex justify-end space-x-4 m-3">
          <Buttons
            label="Add New RateGroup"
            className="min-w-[130px]"
            onClick={() => {
              router.push(routes_list.rategroup_create);
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
                fieldTitle: "Rate Group ID",
                fieldName: "rateGroupID",
                format: "{0:NUMBER}",
                isHidden: true,
              },
              {
                fieldTitle: "Group Name",
                fieldName: "groupName",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Percentage",
                fieldName: "percentage",
                format: "{0:%}",
                isHidden: false,
              },
            ]}
            actionsList={[
              {
                fieldTitle: "View Rate Group",
                fieldName: "view_Rate Group",
                fieldURL: routes_list.rategroup_detail,
                fieldProperty: "rateGroupID",
              },
              {
                fieldTitle: "Delete",
                fieldName: "delete_rategroup",
                fieldProperty: "rateGroupID",
                fieldURL: "",
              },
            ]} // You can add actions here if needed
            showIDField={true}
            allowFiltering={true}
            allowSorting={true}
            allowGrouping={true}
            showToolbar={true}
            showExportAsPDF={true}
            showExportAsExcel={true}
            excelFileName={`RateGroup_List_${getISOFormatDatetime()}`}
            pdfFileName={`RateGroup_List_${getISOFormatDatetime()}`}
          />
        )}
      </CardUI>
    </Layout>
  );
}
