"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/layouts/layout";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import MyInput from "@/components/input/my-input";
import MySelect from "@/components/input/my-select"; // Assuming path
import Buttons from "@/components/ui/Button";
import ModalComponent from "@/components/ui/model";
import { FetchData_PUT, FetchData_GET } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import routes_list from "@/router/routes-list";
import { useRouter } from "next/navigation";
import CardUI from "@/components/cards/card-ui";

export default function CreateRoleSection() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);

  const [data, setData] = useState({
    title: "",
    description: "",
    isPII: false,
    portal: "ADMIN", // Default portal
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
      const response = await FetchData_PUT(
        constants.roleCreateApi,
        data,
        accessToken,
        user
      );

      if (response == true) {
        router.push(routes_list.role_list);
        setModalMessage("Role created successfully!");
        setIsModalOpen(true);
      } else {
        setModalMessage(response.error?.[0] || "Unknown error.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      setModalMessage("Something went wrong. Please try again.");
      setIsModalOpen(true);
    }
  };
  console.log(roleOptions);
  return (
    <Layout>
      <PageHeader title="Add New Role" />

      <CardUI>
        <form
          className="isomorphic-form flex flex-grow flex-col @container"
          onSubmit={handleSubmit}
        >
          <HorizontalFormBlockWrapper mdGridCols="2" smGridCols="1" isModalView={false}>
            {/* PORTAL FIELD */}
            {/* <MyInput
              inputID="txtPortal"
              inputLabel="Portal"
              inputType="text"
              inputValue={data.portal}
              inputSetValue={(val) => handleChange("portal", val)}
              inputIsDisabled={false}
              inputIsRequired={true}
              showMaxLength={false}
            /> */}
            <MyInput
              inputID="txtTitle"
              inputLabel="Role Title"
              inputValue={data.title}
              inputType="text"
              inputSetValue={(val) => handleChange("title", val)}
              inputIsDisabled={false}
              inputIsRequired={true}
              showMaxLength={false}
            />

            <MyInput
              inputID="txtDescription"
              inputLabel="Description"
              inputType="text"
              inputValue={data.description}
              inputSetValue={(val) => handleChange("description", val)}
              inputIsDisabled={false}
              inputIsRequired={false}
              showMaxLength={false}
            />
          </HorizontalFormBlockWrapper>

          <div className="flex justify-end mt-3">
            <Buttons
              type="submit"
              label="Add New Role"
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
