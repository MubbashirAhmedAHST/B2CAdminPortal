"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Layout from "@/components/layouts/layout";
import PageHeader from "@/components/headers/page-header";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import ProfileLeftCard from "@/app/employee/employee-detail/components/left-card";
import ProfileRightCard from "@/app/employee/employee-detail/components/right-card";

import { FetchData_GET } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import { useDispatch, useSelector } from "react-redux";

export default function MyProfileSection() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const params = useSearchParams();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken && user) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await FetchData_GET(
            `${constants.MyProfileAPI}?adminID=${user.adminID}`,
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
    } else {
      console.log("Token or user not found");
    }
  }, [accessToken, user]);

  return (
    <Layout>
      <PageHeader title="My Profile" />

      {isLoading ? (
        <SpinnerLoader showLoadingText={true} />
      ) : (
        <div className="container-fluid">
          <div className="row">
            {/* Left Profile Card */}
            <div className="col-lg-4 col-xlg-3 col-md-5">
              <ProfileLeftCard data={data} />
              {/* <ChangePasswordForm /> can go here */}
            </div>

            {/* Right Profile Card */}
            <div className="col-lg-8 col-xlg-9 col-md-7">
              <div className="card ml-0">
                <div className="card-body">
                  <ProfileRightCard data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
