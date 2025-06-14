"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/layouts/layout";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import MyPassword from "@/components/input/my-password";
import Buttons from "@/components/ui/Button";
import ModalComponent from "@/components/ui/model";
import CardUI from "@/components/cards/card-ui";

import { FetchData_POST } from "@/helpers/dal";
import { constants } from "@/helpers/constants";

export default function ChangePasswordSection() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();
console.log(user)
  const [data, setData] = useState({
    adminID: user?.adminID || 0,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    modifiedBy: user?.email || "",
    modifiedAt: new Date().toISOString(),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      setModalMessage("New password and confirm password do not match.");
      setIsModalOpen(true);
      return;
    }

    try {
      const payload = {
        adminID: user?.adminID, // ✅ Make sure user.adminId is available in Redux
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
        modifiedBy: user?.email,
        modifiedAt: new Date().toISOString(),
      };

      const result = await FetchData_POST(
        constants.ChangePasswordAPI, // Ensure this exists in your constants
        payload,
        accessToken,
        user
      );

      if (result === true) {
        setModalMessage("Password changed successfully.");
        setData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setModalMessage("Failed to change password. Please try again.");
      }
    } catch (error) {
      setModalMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <Layout>
      <PageHeader title="Change Password" />

      <CardUI>
        <form
          onSubmit={handleSubmit}
          className="isomorphic-form flex flex-col @container"
        >
          <HorizontalFormBlockWrapper
            mdGridCols="2"
            smGridCols="1"
            isModalView={false}
          >
            <MyPassword
              inputID="txtOldPassword"
              inputLabel="Old Password"
        inputPlaceholder="Old Password"
              inputValue={data.oldPassword}
              inputSetValue={(val) => handleChange("oldPassword", val)}
              inputIsRequired={true}
              inputClass="form-control paddingInlineStyle50 rounded mt-1"
            />
            <MyPassword
              inputID="txtNewPassword"
              inputLabel="New Password"
              inputPlaceholder="New Password"
              inputValue={data.newPassword}
              inputSetValue={(val) => handleChange("newPassword", val)}
              inputIsRequired={true}
              inputClass="form-control paddingInlineStyle50 rounded mt-1"
            />
            <MyPassword
              inputID="txtConfirmPassword"
              inputLabel="Confirm Password"
              inputPlaceholder="Confirm Password"
              inputValue={data.confirmPassword}
              inputSetValue={(val) => handleChange("confirmPassword", val)}
              inputIsRequired={true}
              inputClass="form-control paddingInlineStyle50 rounded mt-1"
            />
          </HorizontalFormBlockWrapper>

          <div className="flex justify-end mt-3">
            <Buttons
              type="submit"
              label="Change Password"
              className="min-w-[160px]"
            />
          </div>
        </form>
      </CardUI>

      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Change Password"
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}
