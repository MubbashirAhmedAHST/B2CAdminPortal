"use client";

import { Title } from "rizzui";
import MyInput from "@/components/input/my-input";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import { cn } from "@/helpers/utilities";
// import MySelect from "@/components/input/my-select"; // Uncomment if you want to use select field
// import { statuses } from "@/helpers/data"; // Uncomment when using statuses data

export default function ProfileRightCard({ data }) {
  return (
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="previous-month"
        role="tabpanel"
        aria-labelledby="pills-setting-tab"
      >
        <form className="isomorphic-form flex flex-grow flex-col @container">
          <div className="flex-grow pb-3">
            <div className="my-2">
              <Title as="h5" className="font-light my-2">
                Vendor Details
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
                  inputID="txtName"
                  inputLabel="*Name"
                  inputType="text"
                  inputValue={data.name || ""}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />

                <MyInput
                  inputID="txtEmail"
                  inputLabel="* Email"
                  inputType="email"
                  inputValue={data.email || ""}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />
                <MyInput
                  inputID="txtphone"
                  inputLabel="*Phone"
                  inputType="number"
                  inputValue={data.phone || ""}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />
                <MyInput
                  inputID="textAddress"
                  inputLabel="*Address"
                  inputType="text"
                  inputValue={data.address || ""}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />
                <MyInput
                  inputID="txtCity"
                  inputLabel="*City"
                  inputType="text"
                  inputValue={data.city || ""}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />
                <MyInput
                  inputID="txtState"
                  inputLabel="*State"
                  inputType="text"
                  inputValue={data.state || ""}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />
                <MyInput
                  inputID="txtPostalCode"
                  inputLabel="*PostalCode"
                  inputType="text"
                  inputValue={data.postalCode || ""}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />

                <MyInput
                  inputID="txtvendorCountry"
                  inputLabel="*Country"
                  inputType="text"
                  inputValue={data.country || ""}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                />
                {/* <MyInput
                  inputID="txtisActive"
                  inputLabel="*Status"
                  inputType="text"
                  inputValue={data.isActive ? "Active" : "Inactive"}
                  inputSetValue={undefined}
                  showMaxLength={false}
                  inputIsRequired={true}
                  inputIsDisabled={true}
                /> */}
              </HorizontalFormBlockWrapper>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
