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

export default function PromotionListSection() {
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
          `${constants.ListOfPromotion}`,
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
      <PageHeader title="List of Promotions" />
      <CardUI>
        {isLoading ? (
          <SpinnerLoader showLoadingText={true} />
        ) : (
          <TelerikTable
            data={data}
            fields={[
              {
                fieldTitle: "Promotion ID",
                fieldName: "promotionID",
                format: "{0:NUMBER}",
                isHidden: true,
              },
              {
                fieldTitle: "Code",
                fieldName: "promotionCode",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Type",
                fieldName: "promotionType",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Value",
                fieldName: "value",
                format: "{0:c}",
                isHidden: false,
              },
              {
                fieldTitle: "Calculated By",
                fieldName: "calculatedBy",
                format: "",
                isHidden: false,
              },
              {
                fieldTitle: "Start Date",
                fieldName: "startDate",
                format: "{0:dd-MM-yyyy}",
                isHidden: false,
              },
              {
                fieldTitle: "End Date",
                fieldName: "endDate",
                format: "{0:dd-MM-yyyy}",
                isHidden: false,
              },
            ]}
            actionsList={[
              {
                fieldTitle: "View Promotion",
                fieldName: "view_promotion",
                fieldURL: routes_list.promotion_detail,
                fieldProperty: "promotionID",
              },
              {
                fieldTitle: "Delete",
                fieldName: "delete_promotion",
                fieldProperty: "promotionID",
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
            excelFileName={`Promotion_List_${getISOFormatDatetime()}`}
            pdfFileName={`Promotion_List_${getISOFormatDatetime()}`}
          />
        )}
      </CardUI>
    </Layout>
  );
}
