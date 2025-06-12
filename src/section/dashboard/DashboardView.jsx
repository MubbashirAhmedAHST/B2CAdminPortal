"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Layout from "@/components/layouts/layout";
import PageHeader from "@/components/headers/page-header";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import DashboardTabs from "@/section/dashboard/dashboard-tabs";
import MonthlyGraphicalReport from "@/section/dashboard/monthly-graphical-report";
import HistoryReport from "@/section/dashboard/history-report";

import Icon from "@mdi/react";
import {
  mdiAccountBadge,
  mdiAccountCash,
  mdiAccountCog,
  mdiPackageVariant,
  mdiPackageVariantClosedCheck,
  mdiPackageVariantClosedMinus,
} from "@mdi/js";

import { FetchData_GET } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import CardUI from "@/components/cards/card-ui";

function DashboardView() {
  const details = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Stats
  const [stakeholdersStats, setStakeholdersStats] = useState([]);
  const [todayShipmentsStats, setTodayShipmentsStats] = useState([]);
  const [recentShipments, setRecentShipments] = useState([]);
  const [historicShipmentsStats1, setHistoricShipmentsStats1] = useState([]);
  const [historicShipmentsStats2, setHistoricShipmentsStats2] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await FetchData_GET(
          `${constants.AdminDashboardAPI}?adminID=${details?.adminID}`,
          accessToken,
          details
        );

        if (!result) {
          throw new Error("Failed to load dashboard data.");
        }

        // Set stakeholder stats
        setStakeholdersStats([
          {
            title: "Employees",
            value: [{ count: result.adminCount, label: "Total" }],
            icon: <Icon path={mdiAccountCog} size={1} />,
          },
          {
            title: "Vendors",
            value: [{ count: result.vendorCount, label: "Total" }],
            icon: <Icon path={mdiAccountBadge} size={1} />,
          },
          {
            title: "Customers",
            value: [{ count: result.customerCount, label: "Total" }],
            icon: <Icon path={mdiAccountCash} size={1} />,
          },
        ]);

        // Today's shipments summary
        setTodayShipmentsStats([
          {
            title: "Total Shipments",
            value: result.totalShipments,
            icon: (
              <Icon
                path={mdiPackageVariant}
                size={1}
                className="fcs-yellow-color"
              />
            ),
          },
          {
            title: "Delivered Shipments",
            value: result.completedShipments,
            icon: (
              <Icon
                path={mdiPackageVariantClosedCheck}
                size={1}
                className="fcs-blue-color"
              />
            ),
          },
          {
            title: "Cancelled Shipments",
            value: result.cancelledShipments,
            icon: (
              <Icon
                path={mdiPackageVariantClosedMinus}
                size={1}
                className="fcs-red-color"
              />
            ),
          },
        ]);

        setRecentShipments(result.recentShipments_withIn30days || []);
      } catch (err) {
        console.log("Dashboard fetch error:", err);
        setError(
          "An error occurred while loading the dashboard. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [details, accessToken]);

  return (
    <Layout>
      <PageHeader title="Admin Dashboard" />
      {isLoading ? (
        <CardUI>
          <div className="flex justify-center items-center h-screen">
            <SpinnerLoader showLoadingText text="Loading dashboard data..." />
          </div>
        </CardUI>
      ) : error ? (
        <CardUI>
          <div className="flex justify-center items-center h-[60vh] text-red-500 text-lg font-semibold">
            {error}
          </div>
        </CardUI>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-4">
            <CardUI>
              <MonthlyGraphicalReport stakeholdersStats={stakeholdersStats} />
            </CardUI>
            <CardUI>
              <HistoryReport
                todayShipmentsStats={todayShipmentsStats}
                historicShipmentsStats1={historicShipmentsStats1}
                historicShipmentsStats2={historicShipmentsStats2}
              />
            </CardUI>
          </div>

          <CardUI>
            <DashboardTabs recentShipments={recentShipments} />
          </CardUI>
        </>
      )}
    </Layout>
  );
}

export default DashboardView;
