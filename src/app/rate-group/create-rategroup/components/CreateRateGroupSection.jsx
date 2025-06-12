"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/layouts/layout";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import MyInput from "@/components/input/my-input";
import Buttons from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FetchData_POST } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import ModalComponent from "@/components/ui/model";
import { useRouter } from "next/navigation";
import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function CreateRateGroupSection() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken); // fixed redundant selector
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const [data, setData] = useState({
    groupName: "",
    percentage: "",
    createdBy: user?.email || "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", data);

    try {
      const response = await FetchData_POST(
        constants.CreateRateGroup,
        data,
        accessToken,
        user
      );

      console.log("API Response:", response);
      router.push(routes_list.rategroup_list);
      setModalMessage("Rate Group created successfully!");
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error submitting form:", error);
      setModalMessage("Something went wrong. Please try again.");
      setIsModalOpen(true);
    }
  };

  return (
    <Layout>
      <PageHeader title="Add New Rate Group" />

      <CardUI>
        <form
          className="isomorphic-form flex flex-grow flex-col @container"
          onSubmit={handleSubmit}
        >
          <HorizontalFormBlockWrapper
            mdGridCols="2"
            smGridCols="1"
            isModalView={false}
          >
            <MyInput
              inputID="txtGroupName"
              inputLabel="Group Name"
              inputType="text"
              inputValue={data.groupName}
              inputSetValue={(val) => handleChange("groupName", val)}
              inputIsDisabled={false}
              inputIsRequired={true}
              showMaxLength={true}
              inputMaxLength={200}
            />
            <MyInput
              inputID="txtPercentage"
              inputLabel="Percentage"
              inputType="number"
              inputValue={data.percentage}
              inputSetValue={(val) => {
                const parsed = parseFloat(val);
                handleChange("percentage", isNaN(parsed) ? "" : parsed);
              }}
              inputIsDisabled={false}
              inputIsRequired={true}
              showMaxLength={false}
            />
          </HorizontalFormBlockWrapper>

          <div className="flex justify-end mt-3">
            <Buttons
              type="submit"
              label="Add New RateGroup"
              className="min-w-[120px]"
            />
          </div>
        </form>
      </CardUI>

      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Submission Status"
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}
