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
import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function RateGroupDetailSection({ rateGroupID }) {
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");

  const [formState, setFormState] = useState({
    rateGroupID: rateGroupID,
    groupName: "",
    percentage: 0,
  });

  const fetchRateGroupData = async () => {
    setLoading(true);
    try {
      const result = await FetchData_GET(
        `${constants.RateGroupDetail}?rateGroupID=${rateGroupID}`,
        accessToken,
        user
      );
      if (!result) throw new Error("No data received");

      setData(result);
      setFormState({
        rateGroupID: result.rateGroupID,
        groupName: result.groupName,
        percentage: result.percentage,
      });
    } catch (err) {
      console.log("Error loading rate group data:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rateGroupID) fetchRateGroupData();
  }, [rateGroupID]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    const payload = {
      ...formState,
      modifiedBy: user?.email || "",
      modifiedAt: new Date().toISOString(),
    };

    try {
      const response = await FetchData_POST(
        constants.UpdateRateGroup,
        payload,
        accessToken,
        user
      );

      setModalHeader("Update Successful");
      setModalMessage("Rate Group updated successfully.");
      setModalOpen(true);
    } catch (error) {
      console.log("Error updating rate group:", error);
      setModalHeader("Update Failed");
      setModalMessage("Something went wrong. Please try again.");
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    router.push(routes_list.rategroup_list);
  };

  return (
    <Layout>
      <PageHeader title="Edit Rate Group" />

      {isLoading ? (
        <SpinnerLoader showLoadingText text="Loading rate group details..." />
      ) : data ? (
        <CardUI>
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
                      inputID="groupName"
                      inputLabel="Group Name"
                      inputType="text"
                      inputValue={formState.groupName}
                      inputSetValue={(val) => handleChange("groupName", val)}
                      inputIsDisabled={false}
                      showMaxLength={true}
                      inputMaxLength={200}
                      inputIsRequired={true}
                    />

                    <MyInput
                      inputID="percentage"
                      inputLabel="Percentage"
                      inputType="number"
                      inputValue={formState.percentage}
                      showMaxLength={false}
                      inputSetValue={(val) =>
                        handleChange("percentage", parseFloat(val))
                      }
                      inputIsDisabled={false}
                      inputIsRequired={true}
                    />
                  </HorizontalFormBlockWrapper>

                  <div className="flex justify-end space-x-4 ">
                    <Buttons
                      type="submit"
                      label="Update"
                      className="min-w-[130px]"
                    />
                    <Buttons
                      onClick={() => {
                        router.push(routes_list.rategroup_list);
                      }}
                      label="Cancel"
                    />
                  </div>
                </form>
              </CardUI>
      ) : (
        <div className="text-center text-red-500 mt-8 font-medium">
          Failed to load rate group data.
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
