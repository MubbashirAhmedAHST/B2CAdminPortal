"use client";

import { Title } from "rizzui";
import MyInput from "@/components/input/my-input";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import { cn } from "@/helpers/utilities";
import Buttons from "@/components/ui/Button";
import routes_list from "@/router/routes-list";
import { useRouter } from "next/navigation";

export default function ProfileRightCard({ data, onChange, onUpdate }) {
  const router = useRouter();
  return (
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="previous-month"
        role="tabpanel"
        aria-labelledby="pills-setting-tab"
      >
        <form
          className="isomorphic-form flex flex-grow flex-col @container"
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate();
          }}
        >
          <div className="flex-grow pb-3">
            <div className="my-2">
              <Title as="h5" className="font-light my-2">
                Personal Details
              </Title>
              <hr />
            </div>

            <div
              className={cn(
                "grid grid-cols-1",
                "gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12",
                "[&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11"
              )}
            >
              <HorizontalFormBlockWrapper
                mdGridCols="2"
                smGridCols="2"
                isModalView={false}
              >
                <MyInput
                  inputID="txtFirstName"
                  inputLabel="First Name"
                  inputType="text"
                  inputValue={data.firstName || ""}
                  inputSetValue={(val) => onChange("firstName", val)}
                  showMaxLength={true}
                  inputMaxLength={100}
                  inputIsRequired={true}
                  inputIsDisabled={false}
                />
                <MyInput
                  inputID="txtLastName"
                  inputLabel="Last Name"
                  inputType="text"
                  inputValue={data.lastName || ""}
                  inputSetValue={(val) => onChange("lastName", val)}
                  showMaxLength={true}
                  inputMaxLength={100}
                  inputIsRequired={true}
                  inputIsDisabled={false}
                />
                <MyInput
                  inputID="txtEmail"
                  inputLabel="Email"
                  inputType="email"
                  inputValue={data.email || ""}
                  inputSetValue={(val) => onChange("email", val)}
                  showMaxLength={true}
                  inputMaxLength={200}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />
                <MyInput
                  inputID="txtPhone"
                  inputLabel="Phone"
                  inputType="text"
                  inputValue={data.phone || ""}
                  inputSetValue={(val) => onChange("phone", val)}
                  showMaxLength={true}
                  inputMaxLength={20}
                  inputIsRequired={true}
                  inputIsDisabled={false}
                />
                <MyInput
                  inputID="txtDesignation"
                  inputLabel="Designation"
                  inputType="text"
                  inputValue={data.designation || ""}
                  inputSetValue={(val) => onChange("designation", val)}
                  showMaxLength={true}
                  inputMaxLength={100}
                  inputIsRequired={true}
                  inputIsDisabled={false}
                />
                <MyInput
                  inputID="txtRole"
                  inputLabel="Role"
                  inputType="text"
                  inputValue={data.role || ""}
                  inputSetValue={(val) => onChange("role", val)}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={false}
                />
              </HorizontalFormBlockWrapper>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <Buttons
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
                label="Update Employee"
              />
              <Buttons
                onClick={() => {
                  router.push(routes_list.employee_list);
                }}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
