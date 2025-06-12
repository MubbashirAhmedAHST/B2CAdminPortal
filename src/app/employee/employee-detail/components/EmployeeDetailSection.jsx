"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/layouts/layout";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import { constants } from "@/helpers/constants";
import { FetchData_GET, FetchData_POST } from "@/helpers/dal";
import ModalComponent from "@/components/ui/model";
import ProfileLeftCard from "./left-card";
import ProfileRightCard from "./right-card";
import { useRouter } from "next/navigation";
import routes_list from "@/router/routes-list";

export default function EmployeeDetailSection({ adminID }) {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const router = useRouter();
  const [formState, setFormState] = useState({
    adminID,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    designation: "",
    isActive: true,
  });

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const result = await FetchData_GET(
        `${constants.MyProfileAPI}?adminID=${adminID}`,
        accessToken,
        user
      );
      if (!result) throw new Error("No data received");

      setData(result);
      setFormState({
        adminID: result.adminID ?? adminID,
        firstName: result.firstName ?? "",
        lastName: result.lastName ?? "",
        email: result.email ?? "",
        phone: result.phone ?? "",
        role: result.role ?? "",
        designation: result.designation ?? "",
        isActive: result.isActive ?? true,
      });
    } catch (err) {
      console.log("Error loading employee data:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminID) fetchEmployeeData();
  }, [adminID]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    const payload = {
      ...formState,
      modifiedBy: user?.email || "system",
      modifiedAt: new Date().toISOString(),
    };

    try {
      const response = await FetchData_POST(
        constants.UpdateEmployee,
        payload,
        accessToken,
        user
      );
      if (response === true) {
        setModalHeader("Update Successful");
        setModalMessage("Employee profile updated successfully.");
        setModalOpen(true);
        router.push(routes_list.employee_list);
      } else {
        setModalHeader("Error");
        setModalMessage(response.error[0]);
        setModalOpen(true);
      }
    } catch (error) {
      console.log("Error updating employee:", error);
      setModalHeader("Update Failed");
      setModalMessage("Something went wrong. Please try again.");
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    fetchEmployeeData();
  };

  return (
    <Layout>
      <PageHeader title="Employee Profile" />

      {isLoading ? (
        <SpinnerLoader showLoadingText text="Loading employee details..." />
      ) : data ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <ProfileLeftCard data={data} />
            </div>
            <div className="col-lg-8 col-md-7">
              <div className="card p-4">
                <ProfileRightCard
                  data={formState}
                  onChange={handleChange}
                  onUpdate={handleUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 mt-8 font-medium">
          Failed to load employee data.
        </div>
      )}

      <ModalComponent
        open={modalOpen}
        onClose={handleModalClose}
        header={modalHeader}
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}
