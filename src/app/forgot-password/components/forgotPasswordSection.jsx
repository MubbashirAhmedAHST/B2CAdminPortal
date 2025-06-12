"use client";

import AuthWrapper from "@/components/wrappers/auth-wrapper";
// import { Button, Text } from "rizzui";
import { useMedia } from "@/hooks/use-media";
import routes_list from "@/router/routes-list";
import Link from "next/link";
import { useState } from "react";
import { constants } from "@/helpers/constants";
import { ForgotPasswordClient } from "@/helpers/auth";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import { cn } from "@/helpers/utilities";
import MyInput from "@/components/input/my-input";
import Buttons from "@/components/ui/Button";

export default function ForgotPasswordSection() {
  const isMedium = useMedia("(max-width: 1200px)", false);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");
    if (!email) {
      setLoading(false);
      setError("Please enter your email!");
      return;
    }
    const result = await ForgotPasswordClient(
      `${constants.ForgotPasswordAPI}`,
      email
    );
    console.log(result);
    if (typeof result === "object") {
      setLoading(false);
      setError(result.error[0]);
    } else {
      setLoading(false);
      setMsg(
        "An email with temporary password has been mailed to your email. Please "
      );
    }
  };

  return (
    <>
      <AuthWrapper
        title={<>Forgot password?</>}
        description={
          "Please enter your email address. You will receive an email with further instructions."
        }
        background={"/imgs/01.webp"}
      >
        <form
          onSubmit={handleSubmit}
          className="px-5 mt-4 isomorphic-form flex flex-grow flex-col @container"
        >
          <div className="flex-grow">
            <div
              className={cn(
                "grid grid-cols-1 ",
                "grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11"
              )}
            >
              <HorizontalFormBlockWrapper
                mdGridCols="1"
                smGridCols="1"
                isModalView={false}
              >
                <div className="form-icon relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user fea icon-sm icons mt-0.5"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>

                  <MyInput
                    inputID="txtEmail"
                    inputLabel="* Email"
                    inputType="email"
                    inputPlaceholder="Enter Email"
                    inputValue={email}
                    inputSetValue={setEmail}
                    inputMaxLength={500}
                    showMaxLength={false}
                    inputIsRequired={true}
                    inputClass="form-control paddingInlineStyle50 rounded mt-1"
                  />
                </div>
                <div className="flex items-center">
                  <Buttons
                    type="submit"
                    label="Submit"
                    className="w-100 btn btn-grad red-btn"
                  />
                  {/* <Button
                    className="w-full btn btn-grad red-btn"
                    type="submit"
                    isLoading={isLoading}
                    id="btnSubmit"
                  >
                    Submit
                  </Button> */}
                </div>
                <div className={error || msg ? "" : "hidden"}>
                  {error && (
                    <p className="text-red-400 fcs-font-size text-center mt-1">
                      {error}
                    </p>
                  )}

                  {msg && (
                    <p className="text-green-500 fcs-font-size text-lg text-center mt-1">
                      {msg}
                      <Link
                        href={routes_list.login}
                        className="font-semibold underline underline-offset-4"
                      >
                        Login
                      </Link>
                      {" to your account."}
                    </p>
                  )}
                </div>
                <div className="text-left px-3">
                  <p className="fcs-font-size leading-loose text-gray-500">
                    Don't want to reset password?{" "}
                    <Link
                      href={routes_list.login}
                      className="font-semibold transition-colors text-black hover:text-gray-1000"
                    >
                      Click here to Login
                    </Link>
                  </p>
                </div>
              </HorizontalFormBlockWrapper>
            </div>
          </div>
        </form>
      </AuthWrapper>
    </>
  );
}
