"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { Button, Text } from "rizzui";
import AuthWrapper from "@/components/wrappers/auth-wrapper";
import HorizontalFormBlockWrapper from "@/components/wrappers/horizontal-form-block-wrapper";
import MyInput from "@/components/input/my-input";
import MyPassword from "@/components/input/my-password";
import { useMedia } from "@/hooks/use-media";
import { constants } from "@/helpers/constants";
import { AuthClient, LoginClient } from "@/helpers/auth";
import { cn } from "@/helpers/utilities";
import Link from "next/link";
import routes_list from "@/router/routes-list";
import { useDispatch, useSelector } from "react-redux";
import { saveExpiry, saveToken } from "@/store/reducers/AuthSlicers";
import Buttons from "@/components/ui/Button";

export default function LoginSection() {
  const isMedium = useMedia("(max-width: 1200px)", false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const expiry = useSelector((state) => state.auth.expiry);

  const dispatch = useDispatch();

  // ✅ Redirect to dashboard if user and token are set
  useEffect(() => {
    if (accessToken && user && user.id) {
      router.push(routes_list.dashboard);
    }
  }, [user, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const authResult = await AuthClient(email.trim());

      if (!authResult?.accessKey) {
        throw new Error("Access token not retrieved. Please try again.");
      }

      dispatch(saveToken(authResult.accessKey));
      dispatch(saveExpiry(authResult.expiry));

      const tokenToUse = authResult.accessKey;

      const loginResult = await LoginClient(
        dispatch,
        constants.LoginAPI,
        JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          requestAt: new Date().toISOString(),
        }),
        tokenToUse,
        email
      );
      if (!loginResult) {
        throw new Error("Invalid credentials.");
      } else {
        router.push(routes_list.dashboard);
      }
    } catch (err) {
      console.log("Login error:", err);

      if (err.message.includes("Network")) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <SEOComponent seo_title="Login" /> */}
      <AuthWrapper
        title={<>Welcome To Admin Portal</>}
        description="Log in to your account and start your adventure."
        isSignIn={false}
        isSocialLoginActive={false}
        background={"/imgs/01.webp"}
      >
        <form
          onSubmit={handleSubmit}
          className="px-5 mt-2 isomorphic-form flex flex-grow flex-col @container"
        >
          <div className="flex-grow">
            <div
              className={cn(
                "grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200",
                "@2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11"
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
                    disabled={isLoading}
                    inputIsRequired={true}
                    inputClass="form-control paddingInlineStyle50 rounded mt-1"
                  />
                </div>

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
                    className="feather feather-key fea icon-sm icons"
                  >
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>

                  <MyPassword
                    inputID="txtPassword"
                    inputLabel="* Password"
                    inputIsRequired={true}
                    inputPlaceholder="Enter Password"
                    inputValue={password}
                    disabled={isLoading}
                    inputSetValue={setPassword}
                    inputClass="form-control paddingInlineStyle50 rounded mt-1"
                  />
                </div>

                <div className="text-right mb-2 mt-2 px-4">
                  <Link
                    href={routes_list.forgot_password}
                    className="no-underline h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-primary hover:no-underline"
                  >
                    Forget your password?
                  </Link>
                </div>

                <div className="flex items-center">
                  {/* <Button
                    className="w-full btn btn-grad red-btn"
                    type="submit"
                    isLoading={isLoading}
                    id="btnSubmit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button> */}
                  <Buttons
                    type="submit"
                    label={isLoading ? "Logging in..." : "Login"}
                    className="w-100 btn btn-grad red-btn"
                  />
                </div>

                <div>
                  <p className="text-center fcs-font-size leading-loose text-red-500 lg:text-base">
                    {error}
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
