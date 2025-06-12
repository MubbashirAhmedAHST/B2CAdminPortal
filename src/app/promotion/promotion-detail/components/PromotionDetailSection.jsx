"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/layouts/layout";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import { constants } from "@/helpers/constants";
import { FetchData_GET, FetchData_POST } from "@/helpers/dal";
import MyInput from "@/components/input/my-input";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import Buttons from "@/components/ui/Button";
import ModalComponent from "@/components/ui/model";
import MySelect from "@/components/input/my-select";
import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function PromotionDetailSection({ promotionID }) {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [isLoading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");

  const [formState, setFormState] = useState({
    promotionID,
    promotionCode: "",
    promotionType: "",
    description: "",
    imageURL: "",
    value: 0,
    calculatedBy: "FLAT",
    startDate: "",
    endDate: "",
    isActive: true,
    isDeleted: false,
  });

  const fetchPromotionData = async () => {
    setLoading(true);
    try {
      const result = await FetchData_GET(
        `${constants.PromotionDetials}?promotionID=${promotionID}`,
        accessToken,
        user
      );
      if (!result) throw new Error("No data received");

      setFormState({
        promotionID: result.promotionID ?? promotionID,
        promotionCode: result.promotionCode ?? "",
        promotionType: result.promotionType ?? "",
        description: result.description ?? "",
        imageURL: result.imageURL ?? "",
        value: result.value ?? 0,
        calculatedBy: result.calculatedBy ?? "FLAT",
        startDate: result.startDate?.slice(0, 16) ?? "",
        endDate: result.endDate?.slice(0, 16) ?? "",
        isActive: true,
        isDeleted: false,
      });
    } catch (err) {
      console.log("Error loading promotion data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (promotionID) fetchPromotionData();
  }, [promotionID]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    const payload = {
      ...formState,
      startDate: new Date(formState.startDate).toISOString(),
      endDate: new Date(formState.endDate).toISOString(),
      modifiedBy: user?.email || "system",
      modifiedAt: new Date().toISOString(),
    };

    try {
      const response = await FetchData_POST(
        constants.UpdatePromotion,
        payload,
        accessToken,
        user
      );
      if (response) {
        router.push(routes_list.promotion_list); // redirect to list page
      }
    } catch (error) {
      console.log("Error updating promotion:", error);
      setModalHeader("Update Failed");
      setModalMessage("Something went wrong. Please try again.");
      setModalOpen(true);
    }
  };

  return (
    <Layout>
      <PageHeader title="Edit Promotion" />

      {isLoading ? (
        <SpinnerLoader showLoadingText text="Loading promotion details..." />
      ) : (
        <CardUI>
          {formState.imageURL && (
            <div className="flex justify-center mb-4">
              <img
                src={formState.imageURL}
                alt="Promotion Banner"
                className="rounded-lg border border-gray-300 max-h-[200px] object-contain"
              />
            </div>
          )}
          <form
            className="isomorphic-form flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <HorizontalFormBlockWrapper
              mdGridCols="2"
              smGridCols="1"
              isModalView={false}
            >
              <MyInput
                inputID="promotionCode"
                inputLabel="Promotion Code"
                inputValue={formState.promotionCode}
                inputSetValue={(val) => handleChange("promotionCode", val)}
                inputType="text"
                inputIsDisabled={false}
                showMaxLength={true}
                inputMaxLength={100}
                inputIsRequired={true}
              />
              <MyInput
                inputID="promotionType"
                inputLabel="Promotion Type"
                inputValue={formState.promotionType}
                inputSetValue={(val) => handleChange("promotionType", val)}
                inputType="text"
                inputIsDisabled={false}
                showMaxLength={true}
                inputMaxLength={50}
                inputIsRequired={true}
              />
              <MyInput
                inputID="description"
                inputLabel="Description"
                inputValue={formState.description}
                inputSetValue={(val) => handleChange("description", val)}
                inputType="text"
                inputIsDisabled={false}
                showMaxLength={true}
                inputMaxLength={500}
                inputIsRequired={true}
              />
              <MyInput
                inputID="imageURL"
                inputLabel="Image URL"
                inputValue={formState.imageURL}
                inputSetValue={(val) => handleChange("imageURL", val)}
                inputType="text"
                inputIsDisabled={false}
                showMaxLength={true}
                inputMaxLength={500}
                inputIsRequired={true}
              />
              <MyInput
                inputID="value"
                inputLabel="Value"
                inputType="number"
                inputValue={formState.value}
                inputSetValue={(val) =>
                  handleChange("value", parseFloat(val) || 0)
                }
                inputIsDisabled={false}
                showMaxLength={false}
                inputIsRequired={true}
              />
              <MySelect
                inputID="calculatedBy"
                inputLabel="Calculated By"
                inputSetValue={(val) => handleChange("calculatedBy", val)}
                inputType="text"
                inputIsDisabled={false}
                showMaxLength={false}
                inputIsRequired={true}
                selectData={[
                  { title: "FLAT", value: "FLAT" },
                  { title: "PERCENTAGE", value: "PERCENTAGE" },
                ]}
                inputValue={formState.calculatedBy}
                selectDataType=""
                selectStateType="text"
              />
              <MyInput
                inputID="startDate"
                inputLabel="Start Date"
                inputType="datetime-local"
                inputValue={formState.startDate}
                inputSetValue={(val) => handleChange("startDate", val)}
                inputIsDisabled={false}
                showMaxLength={false}
                inputIsRequired={true}
              />
              <MyInput
                inputID="endDate"
                inputLabel="End Date"
                inputType="datetime-local"
                inputValue={formState.endDate}
                inputSetValue={(val) => handleChange("endDate", val)}
                inputIsDisabled={false}
                showMaxLength={false}
                inputIsRequired={true}
              />
            </HorizontalFormBlockWrapper>

            <div className="flex justify-end space-x-4 mt-4">
              <Buttons
                type="submit"
                label="Update Promotion"
                className="min-w-[130px]"
              />{" "}
              <Buttons
                onClick={() => {
                  router.push(routes_list.promotion_list);
                }}
                label="Cancel"
              />
            </div>
          </form>
        </CardUI>
      )}

      <ModalComponent
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        header={modalHeader}
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}
