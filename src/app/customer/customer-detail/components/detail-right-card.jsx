"use client";

import { useEffect, useState } from "react";
import MyInput from "@/components/input/my-input";
import MySelect from "@/components/input/my-select";
import Buttons from "@/components/ui/Button";

function ProfileRightCard({ data, onUpdate }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data?.customer) {
      setFormData(data.customer);
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof onUpdate === "function") {
      onUpdate(formData);
    }
  };

  return (
    <div className="card m-3 ml-0 mb-0">
      <div className="card-body">
        <form
          className="isomorphic-form flex flex-grow flex-col @container"
          onSubmit={handleSubmit}
        >
          <h5 className="font-light">Personal Details</h5>
          <hr className="my-2" />
          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <MyInput
                inputID="txtFirstName"
                inputLabel="First Name"
                inputType="text"
                inputValue={formData.firstName || ""}
                inputSetValue={(val) => handleChange("firstName", val)}
                showMaxLength={false}
                inputMaxLength={200}
                inputIsRequired={true}
                inputIsDisabled={false}
              />
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <MyInput
                inputID="txtLastName"
                inputLabel="Last Name"
                inputType="text"
                inputValue={formData.lastName || ""}
                inputSetValue={(val) => handleChange("lastName", val)}
                showMaxLength={false}
                inputMaxLength={200}
                inputIsRequired={true}
                inputIsDisabled={false}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <MyInput
                inputID="txtEmail"
                inputLabel="Email"
                inputValue={formData.email || ""}
                inputSetValue={(val) => handleChange("email", val)}
                inputType="email"
                showMaxLength={false}
                inputMaxLength={200}
                inputIsRequired={true}
                inputIsDisabled={false}
              />
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <MyInput
                inputID="txtPhone"
                inputLabel="Phone"
                inputType="text"
                inputValue={formData.phone || ""}
                inputSetValue={(val) => handleChange("phone", val)}
                showMaxLength={false} 
                inputMaxLength={20}
                inputIsRequired={true}
                inputIsDisabled={false}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <MyInput
                inputID="txtDateOfBirth"
                inputLabel="Date Of Birth"
                inputType="date"
                inputValue={
                  formData.dateOfBirth
                    ? new Date(formData.dateOfBirth).toISOString().split("T")[0]
                    : ""
                }
                inputSetValue={(val) => handleChange("dateOfBirth", val)}
                showMaxLength={false}
                inputMaxLength={200}
                inputIsRequired={true}
                inputIsDisabled={false}
              />
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <MyInput
                inputID="txtcustomertype"
                inputLabel="Customer Type"
                inputType="text"
                inputValue={formData.customerType || ""}
                inputSetValue={(val) => handleChange("customerType", val)}
                showMaxLength={false}
                inputMaxLength={200}
                inputIsRequired={true}
                inputIsDisabled={false}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <MyInput
                inputID="txtreferralCode"
                inputLabel="Referral Code"
                inputType="text"
                inputValue={formData.referralCode || ""}
                inputSetValue={(val) => handleChange("referralCode", val)}
                showMaxLength={false}
                inputMaxLength={200}
                inputIsRequired={true}
                inputIsDisabled={false}
              />
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <MySelect
                inputID="txtgender"
                inputLabel="Gender"
                inputValue={formData.gender || ""}
                inputSetValue={(val) => handleChange("gender", val)}
                selectData={[
                  { value: "Male", title: "Male" },
                  { value: "Female", title: "Female" },
                ]}
                inputIsRequired
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Buttons
              type="submit"
              label="Update"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileRightCard;
