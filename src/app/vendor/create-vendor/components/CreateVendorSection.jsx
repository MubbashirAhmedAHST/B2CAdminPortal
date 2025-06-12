"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Layout from "@/components/layouts/layout";
import PageHeader from "@/components/headers/page-header";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import MyInput from "@/components/input/my-input";
import Buttons from "@/components/ui/Button";
import ModalComponent from "@/components/ui/model";
import { FetchData_GET, FetchData_PUT } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import routes_list from "@/router/routes-list";
import {
  PiUserMinusBold,
  PiUserPlusBold,
  PiBriefcaseBold,
  PiTrashBold,
  PiPackageBold,
} from "react-icons/pi";
import MySelect from "@/components/input/my-select";

export default function CreateVendorSection() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const steps = ["Vendor Info", "Vendor Account", "Services & Products"];
  const getTimestamp = () => new Date().toISOString();
  const defaultUser = user?.email || "";

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    state: "",
    city: "",
    country: "",
    isActive: true,
    createdBy: defaultUser,
    createdAt: getTimestamp(),

    vendorAccounts: [
      {
        accountNumber: "",
        apiBaseURL: "",
        clientID: "",
        clientSecret: "",
        isActive: true,
      },
    ],

    vendorServices: [
      {
        name: "",
        defaultAccountNumber: "",
        serviceCode: "",
        serviceType: "",
        rateGroupID: "",
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
      },
    ],
  });

  const [availableRateGroup, setAvailableRateGroup] = useState([]);

  const validateStep0 = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.phone.trim()) newErrors.phone = "Phone is required";
    if (!data.address.trim()) newErrors.address = "Address is required";
    if (!data.postalCode.trim())
      newErrors.postalCode = "Postal Code is required";
    if (!data.state.trim()) newErrors.state = "State is required";
    if (!data.city.trim()) newErrors.city = "City is required";
    if (!data.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep1 = () => {
    const newErrors = {};

    data.vendorAccounts.forEach((account, index) => {
      if (!account.accountNumber.trim())
        newErrors[`vendorAccounts.${index}.accountNumber`] =
          "Account Number is required";
      if (!account.apiBaseURL.trim())
        newErrors[`vendorAccounts.${index}.apiBaseURL`] =
          "API Base URL is required";
      if (!account.clientID.trim())
        newErrors[`vendorAccounts.${index}.clientID`] = "Client ID is required";
      if (!account.clientSecret?.trim())
        newErrors[`vendorAccounts.${index}.clientSecret`] =
          "Client Secret is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep2 = () => {
    const newErrors = {};

    data.vendorServices.forEach((service, index) => {
      if (!service.name.trim())
        newErrors[`vendorServices.${index}.name`] = "Service Name is required";
      if (!service.defaultAccountNumber.trim())
        newErrors[`vendorServices.${index}.defaultAccountNumber`] =
          "Default Account # is required";
      if (!service.serviceCode.trim())
        newErrors[`vendorServices.${index}.serviceCode`] =
          "Service Code is required";
      if (!service.serviceType.trim())
        newErrors[`vendorServices.${index}.serviceType`] =
          "Service Type is required";
      if (!service.serviceMedium.trim())
        newErrors[`vendorServices.${index}.serviceMedium`] =
          "Service Medium is required";
      if (!service.rateGroupID)
        newErrors[`vendorServices.${index}.rateGroupID`] =
          "Rate Group is required";

      service.vendorProductTypes.forEach((product, pIndex) => {
        if (!product.productCode.trim())
          newErrors[
            `vendorServices.${index}.vendorProductTypes.${pIndex}.productCode`
          ] = "Product Code is required";
        if (!product.productTitle.trim())
          newErrors[
            `vendorServices.${index}.vendorProductTypes.${pIndex}.productTitle`
          ] = "Product Title is required";
        if (!product.productType.trim())
          newErrors[
            `vendorServices.${index}.vendorProductTypes.${pIndex}.productType`
          ] = "Product Type is required";
        if (
          product.amount === "" ||
          product.amount === null ||
          isNaN(product.amount)
        )
          newErrors[
            `vendorServices.${index}.vendorProductTypes.${pIndex}.amount`
          ] = "Amount is required";
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchRateGorup = async () => {
      try {
        const response = await FetchData_GET(
          `${constants.AvailableRateGroup}?portal=ADMIN`,
          accessToken,
          user
        );

        if (Array.isArray(response)) {
          const mapped = response.map((rategorup) => ({
            value: rategorup.rateGroupID,
            title: rategorup.groupName,
          }));
          setAvailableRateGroup(mapped);
        } else {
          console.log("Unexpected rategorups response:", response);
        }
      } catch (error) {
        console.log("Error fetching rategorups:", error);
      }
    };

    fetchRateGorup();
  }, [accessToken, user]);

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

  const removeArrayItem = (section, index) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addNestedItem = (serviceIndex, template) => {
    const updated = [...data.vendorServices];
    updated[serviceIndex].vendorProductTypes.push({ ...template });
    setData((prev) => ({ ...prev, vendorServices: updated }));
  };

  const removeNestedItem = (serviceIndex, productIndex) => {
    const updated = [...data.vendorServices];
    updated[serviceIndex].vendorProductTypes = updated[
      serviceIndex
    ].vendorProductTypes.filter((_, i) => i !== productIndex);
    setData((prev) => ({ ...prev, vendorServices: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const isValid = validateStep2();
    // if (!isValid) return;

    try {
      const response = await FetchData_PUT(
        constants.CreateVender,
        data,
        accessToken,
        user
      );
      console.log(response);
      if (response === true) {
        setModalMessage("Vendor created successfully!");
        setIsModalOpen(true);
        // Optionally redirect after success:
        // router.push(routes_list.VENDOR_LIST);
      } else {
        setModalMessage(response?.error?.[0] || "Error creating vendor.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      setModalMessage("Something went wrong while creating vendor.");
      setIsModalOpen(true);
    }
  };

  return (
    <Layout>
      <PageHeader title="Create Vendor" />
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

      <form
        onSubmit={handleSubmit}
        className="isomorphic-form flex flex-col gap-6 p-6 bg-white shadow-md rounded-2xl max-w-5xl mx-auto mt-6"
      >
        {currentStep === 0 && (
          <HorizontalFormBlockWrapper mdGridCols="2" smGridCols="1">
            <MyInput
              showMaxLength={false}
              inputID="name"
              inputIsRequired={true}
              inputLabel="Name"
              inputValue={data.name}
              inputErrorMsg={errors.name}
              inputSetValue={(val) => handleChange("name", val)}
            />
            <MyInput
              showMaxLength={false}
              inputID="email"
              inputIsRequired={true}
              inputLabel="Email"
              inputValue={data.email}
              inputErrorMsg={errors.email}
              inputSetValue={(val) => handleChange("email", val)}
            />
            <MyInput
              showMaxLength={false}
              inputID="phone"
              inputIsRequired={true}
              inputLabel="Phone"
              inputValue={data.phone}
              inputErrorMsg={errors.phone}
              inputSetValue={(val) => handleChange("phone", val)}
            />
            <MyInput
              showMaxLength={false}
              inputID="address"
              inputIsRequired={true}
              inputLabel="Address"
              inputValue={data.address}
              inputErrorMsg={errors.address}
              inputSetValue={(val) => handleChange("address", val)}
            />
            <MyInput
              showMaxLength={false}
              inputID="postalCode"
              inputLabel="Postal Code"
              inputIsRequired={true}
              inputValue={data.postalCode}
              inputErrorMsg={errors.postalCode}
              inputSetValue={(val) => handleChange("postalCode", val)}
            />
            <MyInput
              showMaxLength={false}
              inputID="state"
              inputIsRequired={true}
              inputLabel="State"
              inputErrorMsg={errors.state}
              inputValue={data.state}
              inputSetValue={(val) => handleChange("state", val)}
            />
            <MyInput
              showMaxLength={false}
              inputID="city"
              inputLabel="City"
              inputIsRequired={true}
              inputValue={data.city}
              inputErrorMsg={errors.city}
              inputSetValue={(val) => handleChange("city", val)}
            />
            <MyInput
              showMaxLength={false}
              inputID="country"
              inputIsRequired={true}
              inputLabel="Country"
              inputValue={data.country}
              inputErrorMsg={errors.country}
              inputSetValue={(val) => handleChange("country", val)}
            />
          </HorizontalFormBlockWrapper>
        )}

        {currentStep === 1 && (
          <>
            <h3 className="text-lg font-semibold mt-6">Vendor Accounts</h3>

            {data.vendorAccounts.map((account, index) => (
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
                      inputErrorMsg={
                        errors[`vendorAccounts.${index}.accountNumber`]
                      }
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
                      inputErrorMsg={
                        errors[`vendorAccounts.${index}.apiBaseURL`]
                      }
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
                      inputErrorMsg={errors[`vendorAccounts.${index}.clientID`]}
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
                  <div className="flex-1 min-w-[200px]">
                    <MyInput
                      showMaxLength={false}
                      inputID={`clientSecret-${index}`}
                      inputLabel="Client Secret"
                      inputValue={account.clientSecret}
                      inputErrorMsg={
                        errors[`vendorAccounts.${index}.clientSecret`]
                      }
                      inputSetValue={(val) =>
                        handleArrayChange(
                          "vendorAccounts",
                          index,
                          "clientSecret",
                          val
                        )
                      }
                    />
                  </div>
                </div>

                {/* Remove Button with Icon */}
                {data.vendorAccounts.length > 1 && (
                  <Buttons
                    type="button"
                    onClick={() => removeArrayItem("vendorAccounts", index)}
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

            {data.vendorServices.map((service, index) => (
              <div key={index} className="border p-4 rounded-xl mb-6 relative">
                <div className="flex justify-end">
                  {data.vendorServices.length > 1 && (
                    <Buttons
                      type="button"
                      onClick={() => removeArrayItem("vendorServices", index)}
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
                      inputErrorMsg={errors[`vendorServices.${index}.name`]}
                      inputSetValue={(val) =>
                        handleArrayChange("vendorServices", index, "name", val)
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
                      inputErrorMsg={
                        errors[`vendorServices.${index}.defaultAccountNumber`]
                      }
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
                      inputErrorMsg={
                        errors[`vendorServices.${index}.serviceCode`]
                      }
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
                      inputErrorMsg={
                        errors[`vendorServices.${index}.serviceType`]
                      }
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
                      inputErrorMsg={
                        errors[`vendorServices.${index}.serviceMedium`]
                      }
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
                      inputErrorMsG={
                        errors[`vendorServices.${index}.rateGroupID`]
                      }
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
                  {/* Remove Service Icon */}
                </div>

                {/* Product Types */}
                <h4 className="text-md font-semibold my-4">Product Types</h4>
                {service.vendorProductTypes.map((product, productIndex) => (
                  <div
                    key={productIndex}
                    className="border p-4 rounded-xl mb-6 flex flex-wrap gap-2 mb-4 items-start"
                  >
                    <div className="flex-1 min-w-[200px]">
                      <MyInput
                        inputID={`productCode-${index}-${productIndex}`}
                        inputLabel="Product Code"
                        showMaxLength={false}
                        inputIsDisabled={false}
                        inputValue={product.productCode}
                        inputErrorMsg={
                          errors[
                            `vendorServices.${index}.vendorProductTypes.${productIndex}.productCode`
                          ]
                        }
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
                        inputErrorMsg={
                          errors[
                            `vendorServices.${index}.vendorProductTypes.${productIndex}.productTitle`
                          ]
                        }
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
                        inputErrorMsg={
                          errors[
                            `vendorServices.${index}.vendorProductTypes.${productIndex}.productType`
                          ]
                        }
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
                        inputErrorMsg={
                          errors[
                            `vendorServices.${index}.vendorProductTypes.${productIndex}.amount`
                          ]
                        }
                        inputSetValue={(val) =>
                          handleNestedArrayChange(
                            "vendorServices",
                            index,
                            "vendorProductTypes",
                            productIndex,
                            "amount",
                            parseFloat(val) || 0
                          )
                        }
                      />
                    </div>

                    {/* Remove Product Type Icon */}
                    {service.vendorProductTypes.length > 1 && (
                      <Buttons
                        type="button"
                        onClick={() => removeNestedItem(index, productIndex)}
                        label={<PiTrashBold className="text-lg" />}
                        className="bg-transparent hover:bg-red-100 p-2 rounded-full"
                        title="Remove Product Type"
                      />
                    )}
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
              onClick={() => {
                let valid = false;
                if (currentStep === 0) valid = validateStep0();
                else if (currentStep === 1) valid = validateStep1();

                if (valid) {
                  setErrors({});
                  setCurrentStep((prev) => prev + 1);
                }
              }}
            />
          ) : (
            <Buttons onClick={handleSubmit} label="Create Vendor" />
          )}
        </div>
      </form>

      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Vendor Creation"
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}
