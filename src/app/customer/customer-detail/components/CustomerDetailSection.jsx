"use client";

import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/layouts/layout";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import { constants } from "@/helpers/constants";
import { FetchData_GET, FetchData_POST, FetchData_PUT } from "@/helpers/dal";
import ProfileLeftCard from "./detail-left-card";
import ProfileRightCard from "./detail-right-card";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TelerikTable from "@/components/tables/telerik-table";
import { getISOFormatDatetime } from "@/helpers/utilities";
import ModalComponent from "@/components/ui/model";
import { useRouter } from "next/navigation";
import routes_list from "@/router/routes-list";

function CustomerDetailSection({ customerID }) {
  const [data, setData] = useState({});
  const [addresses, setAddresses] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("Notice");
  const router = useRouter();
  const closeModal = () => {
    setModalOpen(false);
    setModalMessage("");
  };

  useEffect(() => {
    if (!customerID) return;

    setLoading(true);
    FetchData_GET(
      `${constants.CustomerDetails}?customerID=${customerID}`,
      accessToken,
      user
    )
      .then((result) => {
        setData(result);
        console.log(result);
        setAddresses(result.addresses);
      })
      .catch((err) => {
        console.log("Error loading employee data:", err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [customerID]);

  const handleUpdate = async (updatedData) => {
    const payload = {
      customerID: updatedData.customerID,
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      email: updatedData.email,
      customerType: updatedData.customerType,
      phone: String(updatedData.phone),
      gender: updatedData.gender,
      dateOfBirth: updatedData.dateOfBirth,
      isActive: updatedData.isActive ?? true,
      modifiedBy: user?.email,
      modifiedAt: new Date().toISOString(),
    };

    try {
      const response = await FetchData_POST(
        constants.UpdateCustomer,
        payload,
        accessToken,
        user
      );
      console.log(response);
      if (response === true) {
        setData((prev) => ({ ...prev, customer: payload }));
        setModalHeader("Success");
        setModalMessage("Profile updated successfully!");
        setModalOpen(true);
        router.push(routes_list.customer_list);
      } else {
        const errorMsg = response?.error?.join(", ") || "Unknown error.";
        setModalHeader("Failed to Update");
        setModalMessage(errorMsg);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Update error:", error);
      setModalHeader("Error");
      setModalMessage("Something went wrong during update.");
      setModalOpen(true);
    }
  };

  return (
    <Layout>
      <PageHeader title="Customer Profile" />

      {isLoading ? (
        <SpinnerLoader showLoadingText text="Loading employee details..." />
      ) : data ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <ProfileLeftCard data={data} />
            </div>
            <div className="col-lg-8 col-md-7">
              <ProfileRightCard data={data} onUpdate={handleUpdate} />
            </div>
          </div>
          <div>
            {data?.addresses.length > 0 && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Customer Addresses</h5>
                    </div>
                    <div className="card-body">
                      <TelerikTable
                        data={addresses}
                        fields={[
                          {
                            fieldTitle: "ID",
                            fieldName: "id",
                            format: "{0:NUMBER}",
                            isHidden: false,
                          },
                          {
                            fieldTitle: "Type",
                            fieldName: "addressType",
                            format: "",
                            isHidden: false,
                          },
                          {
                            fieldTitle: "Address",
                            fieldName: "addressLine",
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
                          {
                            fieldTitle: "Is Active",
                            fieldName: "isActive",
                            format: "",
                            isHidden: false,
                          },
                        ]}
                        showIDField={true}
                        allowFiltering={true}
                        allowSorting={true}
                        allowGrouping={true}
                        showToolbar={true}
                        showExportAsPDF={true}
                        showExportAsExcel={true}
                        excelFileName={`Address_List_${getISOFormatDatetime()}`}
                        pdfFileName={`Address_List_${getISOFormatDatetime()}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 mt-8 font-medium">
          Failed to load Customer data.
        </div>
      )}
      <ModalComponent
        open={modalOpen}
        onClose={closeModal}
        header={modalHeader}
        isButton={false}
      >
        <p>{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}

export default CustomerDetailSection;
