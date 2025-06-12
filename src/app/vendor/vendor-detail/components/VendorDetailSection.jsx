"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Layout from "@/components/layouts/layout";
import PageHeader from "@/components/headers/page-header";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import { constants } from "@/helpers/constants";
import { FetchData_GET, FetchData_POST } from "@/helpers/dal";
import MyInput from "@/components/input/my-input";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import Buttons from "@/components/ui/Button";
import ModalComponent from "@/components/ui/model";
import MySelect from "@/components/input/my-select";
import routes_list from "@/router/routes-list";
import {
  PiUserMinusBold,
  PiTrashBold,
  PiUserPlusBold,
  PiBriefcaseBold,
  PiPackageBold,
} from "react-icons/pi";

export default function VendorUpdateSection({ vendorID }) {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [availableRateGroup, setAvailableRateGroup] = useState([]);
  const [data, setData] = useState([]);

  const getTimestamp = () => new Date().toISOString();

  const steps = ["Vendor Info", "Vendor Account", "Services & Products"];

  useEffect(() => {
    const loadVendorData = async () => {
      try {
        const res = await FetchData_GET(
          `${constants.VendorProfile}?vendorID=${vendorID}`,
          accessToken,
          user
        );

        setData({
          ...res.vendor, // flatten vendor fields into top level
          vendorAccounts: res.vendorAccounts || [],
          vendorServices: (res.vendorServices || []).map((s) => ({
            ...s,
            vendorProductTypes: Array.isArray(s.updateProductType)
              ? s.updateProductType
              : Array.isArray(s.vendorProductTypes)
                ? s.vendorProductTypes
                : [],
          })),
        });
      } catch (err) {
        setModalMessage("Error loading vendor data.");
        setIsModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRateGroups = async () => {
      const res = await FetchData_GET(
        `${constants.AvailableRateGroup}?portal=ADMIN`,
        accessToken,
        user
      );
      const mapped = Array.isArray(res)
        ? res.map((r) => ({ value: r.rateGroupID, title: r.groupName }))
        : [];
      setAvailableRateGroup(mapped);
    };

    if (vendorID) {
      loadVendorData();
      fetchRateGroups();
    }
  }, [vendorID]);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...data[section]];
    updated[index][field] = value;
    setData((prev) => ({ ...prev, [section]: updated }));
  };

  const handleNestedArrayChange = (section, i, childKey, j, field, value) => {
    const updated = [...data[section]];
    updated[i][childKey][j][field] = value;
    setData((prev) => ({ ...prev, [section]: updated }));
  };

  const addArrayItem = (section, template) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template }],
    }));
  };

  const removeArrayItemServices = async (section, vendorID, serviceID) => {
    // Case 1: No IDs (unsaved row), just remove from UI
    if (!vendorID || !serviceID) {
      setData((prev) => ({
        ...prev,
        [section]: prev[section].filter(
          (_, i) =>
            i !== prev[section].findIndex((svc) => svc.serviceID === serviceID)
        ),
      }));
      return;
    }

    // Case 2: API deletion
    try {
      const payload = {
        serviceID: serviceID,
        vendorID: vendorID,
        modifiedBy: user?.email || "system",
        modifiedAt: new Date().toISOString(),
      };

      const response = await FetchData_POST(
        constants.DeleteVendorService, // Make sure this is the correct endpoint
        payload,
        accessToken,
        user
      );

      if (response === true) {
        setModalMessage("Vendor service deleted successfully!");
        setIsModalOpen(true);
        setData((prev) => ({
          ...prev,
          [section]: prev[section].filter((svc) => svc.serviceID !== serviceID),
        }));
      } else {
        setModalMessage(
          response?.error?.[0] || "Failed to delete vendor service."
        );
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log("Delete Service Error:", error);
      setModalMessage(
        "Something went wrong while deleting the vendor service."
      );
      setIsModalOpen(true);
    }
  };

  //   vendorID,
  //   vendorAccountID
  // ) => {
  //   if (!vendorID || !vendorAccountID) {
  //     setData((prev) => ({
  //       ...prev,
  //       [section]: prev[section].filter(
  //         (acc) => acc.vendorAccountID !== vendorAccountID
  //       ),
  //     }));
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       vendorAccountID: vendorAccountID,
  //       vendorID: vendorID,
  //       modifiedBy: user?.email || "system",
  //       modifiedAt: new Date().toISOString(),
  //     };

  //     const response = await FetchData_POST(
  //       constants.DeleteVendorAccount,
  //       payload,
  //       accessToken,
  //       user
  //     );

  //     if (response === true) {
  //       setModalMessage("Vendor account Delete Successfully !");
  //       setIsModalOpen(true);
  //       setData((prev) => ({
  //         ...prev,
  //         [section]: prev[section].filter(
  //           (acc) => acc.vendorAccountID !== vendorAccountID
  //         ),
  //       }));
  //     } else {
  //       setModalMessage(
  //         response?.error?.[0] || "Failed to delete vendor account."
  //       );
  //       setIsModalOpen(true);
  //     }
  //   } catch (error) {
  //     console.log("Delete Account Error:", error);
  //     setModalMessage(
  //       "Something went wrong while deleting the vendor account."
  //     );
  //     setIsModalOpen(true);
  //   }
  // };
  const removeArrayItemAccounts = async (
    section,
    vendorID,
    vendorAccountID
  ) => {
    // Case 1: No IDs (unsaved/new row), just remove from UI
    if (!vendorID || !vendorAccountID) {
      setData((prev) => ({
        ...prev,
        [section]: prev[section].filter(
          (_, i) =>
            i !==
            prev[section].findIndex(
              (acc) => acc.vendorAccountID === vendorAccountID
            )
        ),
      }));
      return;
    }

    // Case 2: Perform deletion API call
    try {
      const payload = {
        vendorAccountID: vendorAccountID,
        vendorID: vendorID,
        modifiedBy: user?.email || "system",
        modifiedAt: new Date().toISOString(),
      };

      const response = await FetchData_POST(
        constants.DeleteVendorAccount,
        payload,
        accessToken,
        user
      );

      if (response === true) {
        setModalMessage("Vendor account deleted successfully!");
        setIsModalOpen(true);

        setData((prev) => ({
          ...prev,
          [section]: prev[section].filter(
            (acc) => acc.vendorAccountID !== vendorAccountID
          ),
        }));
      } else {
        setModalMessage(
          response?.error?.[0] || "Failed to delete vendor account."
        );
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log("Delete Account Error:", error);
      setModalMessage(
        "Something went wrong while deleting the vendor account."
      );
      setIsModalOpen(true);
    }
  };

  const removeProductType = async (
    serviceIndex,
    productIndex,
    vendorID,
    productID
  ) => {
    // Case 1: No IDs (unsaved product), remove from UI only
    if (!vendorID || !productID) {
      setData((prev) => {
        const updatedServices = [...prev.vendorServices];
        updatedServices[serviceIndex].vendorProductTypes = updatedServices[
          serviceIndex
        ].vendorProductTypes.filter((_, i) => i !== productIndex);
        return {
          ...prev,
          vendorServices: updatedServices,
        };
      });
      return;
    }

    // Case 2: API deletion
    try {
      const payload = {
        vendorProductTypeID: productID,
        vendorID: vendorID,
        modifiedBy: user?.email || "system",
        modifiedAt: new Date().toISOString(),
      };

      const response = await FetchData_POST(
        constants.DeleteVendorProductType, // Make sure this is the correct endpoint
        payload,
        accessToken,
        user
      );

      if (response === true) {
        setModalMessage("Vendor Product Type deleted successfully!");
        setIsModalOpen(true);

        setData((prev) => {
          const updatedServices = [...prev.vendorServices];
          updatedServices[serviceIndex].vendorProductTypes = updatedServices[
            serviceIndex
          ].vendorProductTypes.filter(
            (pt) => pt.vendorProductTypeID !== productID
          );
          return {
            ...prev,
            vendorServices: updatedServices,
          };
        });
      } else {
        setModalMessage(
          response?.error?.[0] || "Failed to delete product type."
        );
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log("Delete Product Type Error:", error);
      setModalMessage("Something went wrong while deleting the product type.");
      setIsModalOpen(true);
    }
  };

  const addNestedItem = (serviceIndex, template) => {
    const updated = [...data.vendorServices];
    updated[serviceIndex].vendorProductTypes.push({ ...template });
    setData((prev) => ({ ...prev, vendorServices: updated }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      vendorID: data?.vendorID,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      address: data?.address,
      postalCode: data?.postalCode,
      state: data?.state,
      city: data?.city,
      country: data?.country,
      isActive: true,
      modifiedBy: user?.email || "system",
      modifiedAt: getTimestamp(),
      accountUpdate: (data.vendorAccounts || []).map((acc) => ({
        ...acc,
        vendorID: data.vendorID,
        modifiedBy: user?.email || "system",
        modifiedAt: getTimestamp(),
        isActive: true,
      })),
      serviceUpdate: (data.vendorServices || []).map((svc) => ({
        ...svc,
        vendorID: data.vendorID,
        isActive: true,
        modifiedBy: user?.email || "system",
        modifiedAt: getTimestamp(),
        updateProductType: (svc.vendorProductTypes || []).map((prod) => ({
          ...prod,
          vendorID: data.vendorID,
          serviceID: svc.serviceID,
          modifiedBy: user?.email || "system",
          modifiedAt: getTimestamp(),
          isActive: true,
        })),
      })),
    };

    try {
      const res = await FetchData_POST(
        `${constants.UpdateVendor}`,
        payload,
        accessToken,
        user
      );
      if (res == true) {
        setModalMessage("Vendor Updated Successfully!");
        setIsModalOpen(true);
        router.push(routes_list.vendor_list);
      } else {
        setModalMessage(res?.error?.[0] || "Update failed.");
        setIsModalOpen(true);
      }
    } catch (err) {
      setModalMessage("Error updating vendor.");
      setIsModalOpen(true);
    }
  };

  return (
    <Layout>
      <PageHeader title="Update Vendor" />
      {isLoading ? (
        <SpinnerLoader text="Loading vendor data..." />
      ) : (
        <form
          onSubmit={handleUpdate}
          className="isomorphic-form flex flex-col gap-6 p-6 bg-white shadow-md rounded-2xl max-w-5xl mx-auto mt-6"
        >
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-6">
              {steps.map((label, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center justify-center relative">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                        ${
                          isCompleted
                            ? "bg-green-500 text-white border-green-500"
                            : isActive
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-500 border border-gray-300"
                        }`}
                      >
                        {isCompleted ? "✔" : index + 1}
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isCompleted
                          ? "text-green-600"
                          : isActive
                            ? "text-blue-600"
                            : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="w-10 h-0.5 bg-gray-300"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {currentStep === 0 && (
            <HorizontalFormBlockWrapper mdGridCols="2" smGridCols="1">
              <MyInput
                showMaxLength={false}
                inputID="name"
                inputLabel="Name"
                inputValue={data?.name}
                inputSetValue={(val) => handleChange("name", val)}
                inputIsRequired
              />
              <MyInput
                showMaxLength={false}
                inputID="email"
                inputLabel="Email"
                inputValue={data?.email}
                inputSetValue={(val) => handleChange("email", val)}
              />
              <MyInput
                showMaxLength={false}
                inputID="phone"
                inputLabel="Phone"
                inputValue={data?.phone}
                inputSetValue={(val) => handleChange("phone", val)}
              />
              <MyInput
                showMaxLength={false}
                inputID="address"
                inputLabel="Address"
                inputValue={data?.address}
                inputSetValue={(val) => handleChange("address", val)}
              />
              <MyInput
                showMaxLength={false}
                inputID="postalCode"
                inputLabel="Postal Code"
                inputValue={data?.postalCode}
                inputSetValue={(val) => handleChange("postalCode", val)}
              />
              <MyInput
                showMaxLength={false}
                inputID="state"
                inputLabel="State"
                inputValue={data?.state}
                inputSetValue={(val) => handleChange("state", val)}
              />
              <MyInput
                showMaxLength={false}
                inputID="city"
                inputLabel="City"
                inputValue={data?.city}
                inputSetValue={(val) => handleChange("city", val)}
              />
              <MyInput
                showMaxLength={false}
                inputID="country"
                inputLabel="Country"
                inputValue={data?.country}
                inputSetValue={(val) => handleChange("country", val)}
              />
            </HorizontalFormBlockWrapper>
          )}

          {currentStep === 1 && (
            <>
              <h3 className="text-lg font-semibold mt-6">Vendor Accounts</h3>

              {data?.vendorAccounts.map((account, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-xl mb-4 relative flex items-center gap-4 flex-wrap"
                >
                  <div className="flex flex-wrap gap-4 flex-1">
                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        showMaxLength={false}
                        inputID={`accountNumber-${index}`}
                        inputLabel="Account Number"
                        inputValue={account.accountNumber}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorAccounts",
                            index,
                            "accountNumber",
                            val
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        showMaxLength={false}
                        inputID={`apiBaseURL-${index}`}
                        inputLabel="API Base URL"
                        inputValue={account.apiBaseURL}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorAccounts",
                            index,
                            "apiBaseURL",
                            val
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        showMaxLength={false}
                        inputID={`clientID-${index}`}
                        inputLabel="Client ID"
                        inputValue={account.clientID}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorAccounts",
                            index,
                            "clientID",
                            val
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Remove Button with Icon */}
                  {data?.vendorAccounts.length > 1 && (
                    <Buttons
                      type="button"
                      onClick={() =>
                        removeArrayItemAccounts(
                          "vendorAccounts",
                          data.vendorID,
                          account.vendorAccountID
                        )
                      }
                      label={<PiTrashBold className="text-lg text-white" />}
                      className="bg-transparent shadow-none hover:bg-red-100 p-2 rounded-full"
                      title="Remove Account"
                    />
                  )}
                </div>
              ))}

              {/* Add Account Button */}
              <div className="text-right mt-4">
                <Buttons
                  label={
                    <span className="flex items-center gap-2">
                      <PiUserPlusBold className="text-lg" />
                      Add Account
                    </span>
                  }
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() =>
                    addArrayItem("vendorAccounts", {
                      accountNumber: "",
                      apiBaseURL: "",
                      clientID: "",
                      isActive: true,
                    })
                  }
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <h3 className="text-lg font-semibold mt-6">Vendor Services</h3>

              {data?.vendorServices?.map((service, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-xl mb-6 relative"
                >
                  <div className="flex justify-end">
                    {/* Remove Service Icon */}
                    {data.vendorServices.length > 1 && (
                      <Buttons
                        type="button"
                        onClick={() =>
                          removeArrayItemServices(
                            "vendorServices",
                            data.vendorID,

                            service.serviceID
                          )
                        }
                        label={
                          <span className="flex items-center gap-2">
                            <PiTrashBold className="text-lg" />
                            Remove Services
                          </span>
                        }
                        className="bg-transparent hover:bg-red-100 p-2 rounded-full"
                        title="Remove Service"
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 items-start">
                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        inputID={`serviceName-${index}`}
                        inputLabel="Service Name"
                        inputValue={service.name}
                        showMaxLength={false}
                        inputIsDisabled={false}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorServices",
                            index,
                            "name",
                            val
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        inputID={`defaultAccountNumber-${index}`}
                        inputLabel="Default Account #"
                        showMaxLength={false}
                        inputIsDisabled={false}
                        inputValue={service.defaultAccountNumber}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorServices",
                            index,
                            "defaultAccountNumber",
                            val
                          )
                        }
                      />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        inputID={`serviceCode-${index}`}
                        inputLabel="Service Code"
                        showMaxLength={false}
                        inputIsDisabled={false}
                        inputValue={service.serviceCode}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorServices",
                            index,
                            "serviceCode",
                            val
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        inputID={`serviceType-${index}`}
                        inputLabel="Service Type"
                        showMaxLength={false}
                        inputIsDisabled={false}
                        inputValue={service.serviceType}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorServices",
                            index,
                            "serviceType",
                            val
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        inputID={`serviceMedium-${index}`}
                        inputLabel="Service Medium"
                        showMaxLength={false}
                        inputIsDisabled={false}
                        inputValue={service.serviceMedium}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorServices",
                            index,
                            "serviceMedium",
                            val
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <MySelect
                        inputID={`rateGroupID-${index}`}
                        inputLabel="Available RateGroup"
                        inputValue={service.rateGroupID}
                        inputSetValue={(val) =>
                          handleArrayChange(
                            "vendorServices",
                            index,
                            "rateGroupID",
                            val
                          )
                        }
                        selectData={availableRateGroup}
                        selectDataType="Custom"
                      />
                    </div>
                  </div>

                  {/* Product Types */}
                  <h4 className="text-md font-semibold mt-4">Product Types</h4>
                  {service.vendorProductTypes?.map((product, productIndex) => (
                    <div
                      key={productIndex}
                      className="flex flex-wrap gap-4 mb-4 items-center"
                    >
                      <div className="flex-1 min-w-[200px]">
                        <MyInput
                          inputID={`productCode-${index}-${productIndex}`}
                          inputLabel="Product Code"
                          showMaxLength={false}
                          inputIsDisabled={false}
                          inputValue={product.productCode}
                          inputSetValue={(val) =>
                            handleNestedArrayChange(
                              "vendorServices",
                              index,
                              "vendorProductTypes",
                              productIndex,
                              "productCode",
                              val
                            )
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <MyInput
                          inputID={`productTitle-${index}-${productIndex}`}
                          inputLabel="Product Title"
                          showMaxLength={false}
                          inputIsDisabled={false}
                          inputValue={product.productTitle}
                          inputSetValue={(val) =>
                            handleNestedArrayChange(
                              "vendorServices",
                              index,
                              "vendorProductTypes",
                              productIndex,
                              "productTitle",
                              val
                            )
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <MyInput
                          inputID={`productType-${index}-${productIndex}`}
                          inputLabel="Product Type"
                          showMaxLength={false}
                          inputIsDisabled={false}
                          inputValue={product.productType}
                          inputSetValue={(val) =>
                            handleNestedArrayChange(
                              "vendorServices",
                              index,
                              "vendorProductTypes",
                              productIndex,
                              "productType",
                              val
                            )
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <MyInput
                          inputID={`amount-${index}-${productIndex}`}
                          inputLabel="Amount"
                          inputType="number"
                          showMaxLength={false}
                          inputIsDisabled={false}
                          inputValue={product.amount}
                          inputSetValue={(val) =>
                            handleNestedArrayChange(
                              "vendorServices",
                              index,
                              "vendorProductTypes",
                              productIndex,
                              "amount",
                              val
                            )
                          }
                        />
                      </div>
                      <div className="flex">
                        {/* Remove Product Type Icon */}
                        {service.vendorProductTypes.length > 1 && (
                          <Buttons
                            type="button"
                            onClick={() =>
                              removeProductType(
                                index,
                                productIndex,
                                data.vendorID,
                                product.vendorProductTypeID
                              )
                            }
                            label={<PiTrashBold className="text-lg" />}
                            className="bg-transparent hover:bg-red-100 p-2 rounded-full"
                            title="Remove Product Type"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Product Type Button */}
                  <div className="text-right mt-2">
                    <Buttons
                      type="button"
                      onClick={() =>
                        addNestedItem(index, {
                          productCode: "",
                          productTitle: "",
                          productType: "",
                          amount: "",
                          isActive: true,
                        })
                      }
                      label={
                        <span className="flex items-center gap-2">
                          <PiPackageBold className="text-lg" />
                          Add Product Type
                        </span>
                      }
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    />
                  </div>
                </div>
              ))}

              {/* Add Service Button */}
              <div className="text-right mt-4">
                <Buttons
                  type="button"
                  onClick={() =>
                    addArrayItem("vendorServices", {
                      name: "",
                      defaultAccountNumber: "",
                      serviceCode: "",
                      serviceType: "",
                      serviceMedium: "",
                      isActive: true,
                      vendorProductTypes: [
                        {
                          productCode: "",
                          productTitle: "",
                          productType: "",
                          amount: "",
                          isActive: true,
                        },
                      ],
                    })
                  }
                  label={
                    <span className="flex items-center gap-2">
                      <PiBriefcaseBold className="text-lg" />
                      Add Service
                    </span>
                  }
                  className="text-blue-600 hover:text-blue-800 font-medium"
                />
              </div>
            </>
          )}

          <div className="flex justify-between my-6">
            <Buttons
              type="button"
              label="Back"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => prev - 1)}
            />
            {currentStep < steps.length - 1 ? (
              <Buttons
                type="button"
                label="Next"
                onClick={() => setCurrentStep((prev) => prev + 1)}
              />
            ) : (
              <Buttons onClick={handleUpdate} label="Update Vendor" />
            )}
          </div>
        </form>
      )}

      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Vendor Update"
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}
