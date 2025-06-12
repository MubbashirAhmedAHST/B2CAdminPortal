"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/headers/page-header";
import Layout from "@/components/layouts/layout";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import MyInput from "@/components/input/my-input";
import MySelect from "@/components/input/my-select";
import Buttons from "@/components/ui/Button";
import ModalComponent from "@/components/ui/model";
import { FetchData_GET, FetchData_PUT } from "@/helpers/dal";
import { constants } from "@/helpers/constants";
import routes_list from "@/router/routes-list";
import CardUI from "@/components/cards/card-ui";

export default function CreateEmployeeSection() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    designation: "",
    isActive: true,
    createdBy: user?.email || "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await FetchData_GET(
          `${constants.availableRolesApi}?portal=ADMIN`,
          accessToken,
          user
        );
        console.log(response);

        if (response && Array.isArray(response)) {
          const mapped = response
            .filter((r) => !r.isDeleted)
            .map((role) => ({
              value: role.title,
              title: role.title, // Used for display in <option>
            }));
          setRoleOptions(mapped);

          setRoleOptions(mapped);
        }
      } catch (err) {
        console.log("Failed to fetch available roles:", err);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await FetchData_PUT(
        constants.AddNewEmployee, // should point to "/admin/employee/register"
        data,
        accessToken,
        user
      );

      console.log("API Response:", response);
      if (response == true) {
        setModalMessage("Employee created successfully!");
        setIsModalOpen(true);
        router.push(routes_list.employee_list); // adjust route accordingly
      } else {
        setModalMessage(response.error[0]);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      setModalMessage("Something went wrong. Please try again.");
      setIsModalOpen(true);
    }
  };

  return (
    <Layout>
      <PageHeader title="Create Employee" />

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
              inputID="firstName"
              inputLabel="First Name"
              inputValue={data.firstName}
              inputSetValue={(val) => handleChange("firstName", val)}
              inputType="text"
              inputIsRequired={true}
              showMaxLength={true}
              inputMaxLength={100}
              inputIsDisabled={false}
            />
            <MyInput
              inputID="lastName"
              inputLabel="Last Name"
              inputValue={data.lastName}
              inputSetValue={(val) => handleChange("lastName", val)}
              inputType="text"
              inputIsRequired={true}
              showMaxLength={true}
              inputMaxLength={100}
              inputIsDisabled={false}
            />
            <MyInput
              inputID="email"
              inputLabel="Email"
              inputValue={data.email}
              inputSetValue={(val) => handleChange("email", val)}
              inputType="email"
              inputIsRequired={true}
              showMaxLength={true}
              inputMaxLength={200}
              inputIsDisabled={false}
            />
            <MyInput
              inputID="phone"
              inputLabel="Phone"
              inputValue={data.phone}
              inputSetValue={(val) => handleChange("phone", val)}
              inputType="text"
              inputIsRequired={true}
              showMaxLength={true}
              inputMaxLength={20}
              inputIsDisabled={false}
            />

            <MySelect
              inputID="role"
              inputLabel="Role"
              inputValue={data.role}
              inputSetValue={(val) => handleChange("role", val)}
              selectData={roleOptions}
              selectDataType="Custom"
              inputIsRequired={true}
              inputIsDisabled={!roleOptions.length}
            />
            <MyInput
              inputID="designation"
              inputLabel="Designation"
              inputValue={data.designation}
              inputSetValue={(val) => handleChange("designation", val)}
              inputType="text"
              inputIsRequired={true}
              showMaxLength={true}
              inputMaxLength={100}
              inputIsDisabled={false}
            />
          </HorizontalFormBlockWrapper>

          <div className="flex justify-end mt-3">
            <Buttons
              type="submit"
              label="Create Employee"
              className="min-w-[150px]"
            />
          </div>
        </form>
      </CardUI>

      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Create Employee"
        isButton={false}
        showCloseButton={true}
      >
        <p className="text-gray-800">{modalMessage}</p>
      </ModalComponent>
    </Layout>
  );
}
