"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/layouts/layout";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import MyInput from "@/components/input/my-input";
import Buttons from "@/components/ui/Button";
import ModalComponent from "@/components/ui/model";
import { FetchData_POST, FetchData_PUT } from "@/helpers/dal"; // Alias for your request handler
import { constants } from "@/helpers/constants"; // Make sure to define constants.CreatePromotion
import MySelect from "@/components/input/my-select";
import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function CreatePromotionSection() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [data, setData] = useState({
    promotionCode: "",
    promotionType: "",
    description: "",
    imageURL: "",
    value: "",
    calculatedBy: "",
    startDate: "",
    endDate: "",
    isActive: true,
    isDeleted: false,
    createdBy: user?.email || "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await FetchData_PUT(
        constants.CreatePromotion, // should point to "/admin/promotion/create"
        data,
        accessToken,
        user
      );

      console.log("API Response:", response);
      setModalMessage("Promotion created successfully!");
      setIsModalOpen(true);
      router.push(routes_list.promotion_list);
    } catch (error) {
      console.log("Error submitting form:", error);
      setModalMessage("Something went wrong. Please try again.");
      setIsModalOpen(true);
    }
  };

  return (
    <Layout>
      <PageHeader title="Create Promotion" />

      <CardUI>
        <form
          onSubmit={handleSubmit}
          className="isomorphic-form flex flex-grow flex-col @container"
        >
          <HorizontalFormBlockWrapper
            mdGridCols="2"
            smGridCols="1"
            isModalView={false}
          >
            <MyInput
              inputID="promotionCode"
              inputLabel="Promotion Code"
              inputValue={data.promotionCode}
              inputSetValue={(val) => handleChange("promotionCode", val)}
              inputType="text"
              inputIsDisabled={false}
              inputIsRequired={true}
              showMaxLength={true}
              inputMaxLength={100}
            />
            <MyInput
              inputID="promotionType"
              inputLabel="Promotion Type"
              inputValue={data.promotionType}
              inputSetValue={(val) => handleChange("promotionType", val)}
              showMaxLength={true}
              inputMaxLength={50}
            />
            <MyInput
              inputID="description"
              inputLabel="Description"
              inputValue={data.description}
              inputSetValue={(val) => handleChange("description", val)}
              showMaxLength={true}
              inputMaxLength={500}
            />
            <MyInput
              inputID="imageURL"
              inputLabel="Image URL"
              inputValue={data.imageURL}
              inputSetValue={(val) => handleChange("imageURL", val)}
              showMaxLength={true}
              inputMaxLength={500}
            />
            <MyInput
              inputID="value"
              inputLabel="Value"
              inputType="number"
              inputValue={data.value}
              inputSetValue={(val) =>
                handleChange("value", parseFloat(val) || 0)
              }
              showMaxLength={false}
            />
            <MySelect
              inputID="calculatedBy"
              inputLabel="Calculated By"
              inputSetValue={(val) => handleChange("calculatedBy", val)}
              selectData={[
                { title: "FLAT", value: "FLAT" },
                { title: "PERCENTAGE", value: "PERCENTAGE" },
              ]}
              inputValue={data.calculatedBy}
              selectDataType="" // no transformation needed
              selectStateType="text"
            />

            <MyInput
              inputID="startDate"
              inputLabel="Start Date"
              inputType="date"
              inputValue={data.startDate.slice(0, 16)}
              inputSetValue={(val) => handleChange("startDate", val)}
              showMaxLength={false}
            />
            <MyInput
              inputID="endDate"
              inputLabel="End Date"
              inputType="date"
              inputValue={data.endDate.slice(0, 16)}
              inputSetValue={(val) => handleChange("endDate", val)}
              showMaxLength={false}
            />
          </HorizontalFormBlockWrapper>

          <div className="flex justify-end mt-3">
            <Buttons
              type="submit"
              label="Create Promotion"
              className="min-w-[150px]"
            />
          </div>
        </form>
      </CardUI>

      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Promotion Creation"
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}
