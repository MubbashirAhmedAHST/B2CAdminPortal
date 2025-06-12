"use client";

import { Title } from "rizzui";
import MyInput from "@/components/input/my-input";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import { cn } from "@/helpers/utilities";

export default function PromotionCard({ data }) {
  return (
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="promotion-details"
        role="tabpanel"
        aria-labelledby="pills-setting-tab"
      >
        <form className="isomorphic-form flex flex-grow flex-col @container">
          <div className="flex-grow">
            <div className="flex items-center gap-4 my-2">
              {data?.imageURL && (
                <img
                  src={data.imageURL}
                  alt="Promotion Banner"
                  className="rounded-lg border border-gray-300"
                  width={100}
                  height={100}
                />
              )}
             
            </div>
            <hr />

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
                  inputID="txtPromotionID"
                  inputLabel="Promotion ID"
                  inputType="text"
                  inputValue={data.promotionID?.toString() || ""}
                  inputSetValue={undefined}
                  inputIsDisabled={true}
                  inputIsRequired={false}
                  showMaxLength={false}
                />

                <MyInput
                  inputID="txtPromotionCode"
                  inputLabel="Promotion Code"
                  inputType="text"
                  inputValue={data.promotionCode || ""}
                  inputSetValue={undefined}
                  inputIsDisabled={true}
                  inputIsRequired={true}
                  showMaxLength={false}
                />

                <MyInput
                  inputID="txtPromotionType"
                  inputLabel="Promotion Type"
                  inputType="text"
                  inputValue={data.promotionType || ""}
                  inputSetValue={undefined}
                  inputIsDisabled={true}
                  inputIsRequired={true}
                  showMaxLength={false}
                />

                <MyInput
                  inputID="txtCalculatedBy"
                  inputLabel="Calculated By"
                  inputType="text"
                  inputValue={data.calculatedBy || ""}
                  inputSetValue={undefined}
                  inputIsDisabled={true}
                  inputIsRequired={false}
                  showMaxLength={false}
                />

                <MyInput
                  inputID="txtValue"
                  inputLabel="Discount Value"
                  inputType="number"
                  inputValue={data.value?.toString() || ""}
                  inputSetValue={undefined}
                  inputIsDisabled={true}
                  inputIsRequired={true}
                  showMaxLength={false}
                />

                <MyInput
                  inputID="txtStartDate"
                  inputLabel="Start Date"
                  inputType="text"
                  inputValue={data.startDate?.split("T")[0] || ""}
                  inputSetValue={undefined}
                  inputIsDisabled={true}
                  inputIsRequired={true}
                  showMaxLength={false}
                />

                <MyInput
                  inputID="txtEndDate"
                  inputLabel="End Date"
                  inputType="text"
                  inputValue={data.endDate?.split("T")[0] || ""}
                  inputSetValue={undefined}
                  inputIsDisabled={true}
                  inputIsRequired={true}
                  showMaxLength={false}
                />
              </HorizontalFormBlockWrapper>

              <div className="pt-5">
                <MyInput
                  inputID="txtDescription"
                  inputLabel="Description"
                  inputType="textarea"
                  inputValue={data.description || ""}
                  inputSetValue={undefined}
                  inputIsDisabled={true}
                  inputIsRequired={false}
                  showMaxLength={false}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
