"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Layout from "@/components/layouts/layout";
import PageHeader from "@/components/headers/page-header";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import ModalComponent from "@/components/ui/model";
import MyInput from "@/components/input/my-input";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import Buttons from "@/components/ui/Button";
import { constants } from "@/helpers/constants";
import { FetchData_GET, FetchData_POST } from "@/helpers/dal";
import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function UpdateRoleSection({ roleID }) {
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [isLoading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");

  const [formState, setFormState] = useState({
    roleID: roleID,
    title: "",
    description: "",
    isPII: false,
    portal: "",
  });

  const fetchRoleDetails = async () => {
    setLoading(true);
    try {
      const response = await FetchData_GET(
        `${constants.roleDeatilsApi}?roleID=${roleID}`,
        accessToken,
        user
      );

      if (!response) throw new Error("No role data returned.");

      setFormState({
        roleID: response.roleID,
        title: response.title,
        description: response.description || "",
        isPII: response.isPII || false,
        portal: response.portal || "",
      });
    } catch (err) {
      console.log("Error fetching role details:", err);
      setFormState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roleID) fetchRoleDetails();
  }, [roleID]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formState,
      modifiedBy: user?.email || "",
      modifiedAt: new Date().toISOString(),
    };

    try {
      const response = await FetchData_POST(
        constants.roleUpdateApi,
        payload,
        accessToken,
        user
      );
      if (response) {
        setModalHeader("Update Successful");
        setModalMessage("Role updated successfully.");
        setModalOpen(true);
      } else {
        setModalHeader("Error ");
        setModalMessage(response.error[0]);
        setModalOpen(true);
      }
    } catch (error) {
      console.log("Error updating role:", error);
      setModalHeader("Update Failed");
      setModalMessage("Something went wrong. Please try again.");
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    router.push(routes_list.role_list);
  };

  return (
    <Layout>
      <PageHeader title="Edit Role" />

      {isLoading ? (
        <SpinnerLoader showLoadingText text="Loading role details..." />
      ) : formState ? (
        <CardUI>
          <form
            className="isomorphic-form flex flex-grow flex-col @container"
            onSubmit={handleSubmit}
          >
            <HorizontalFormBlockWrapper mdGridCols="2" smGridCols="1" isModalView={false}>
              <MyInput
                inputID="txtTitle"
                inputLabel="Title"
                inputType="text"
                inputValue={formState.title}
                inputSetValue={(val) => handleChange("title", val)}
                inputIsDisabled={false}
                inputIsRequired={true}
                showMaxLength={false}
              />

              <MyInput
                inputID="txtDescription"
                inputLabel="Description"
                inputType="text"
                inputValue={formState.description}
                inputSetValue={(val) => handleChange("description", val)}
                inputIsDisabled={false}
                inputIsRequired={true}
                showMaxLength={false}
              />

              {/* <MyInput
                inputID="txtPortal"
                inputLabel="Portal"
                inputType="text"
                inputValue={formState.portal}
                inputSetValue={(val) => handleChange("portal", val)}
                inputIsDisabled={false}
                inputIsRequired={true}
                showMaxLength={false}
              /> */}
            </HorizontalFormBlockWrapper>

            <div className="flex justify-end mt-3">
              <Buttons type="submit" label="Update" className="min-w-[130px]" />
            </div>
          </form>
        </CardUI>
      ) : (
        <div className="text-center text-red-500 mt-8 font-medium">
          Failed to load role data.
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
