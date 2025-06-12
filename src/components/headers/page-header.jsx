"use client";

import routes_list from "@/router/routes-list";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PageHeader({
  title,
  children,
  className,
  description,
}) {
  const details = useSelector((state) => state.auth.user);
  const router = useRouter();

  //const navigate = useNavigate();
  useEffect(() => {
    // const flag = ValidateClientKeyAndExpiry();
    // if (flag == false) window.location.pathname = "/login"; //navigate(routes_list.login);
    if (!details) {
      router.push(routes_list.login);
    }
  }, [details]);

  return (
    <>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-5 align-self-center">
            <h4 className="afterLogin-page-title mb-3">{title}</h4>
          </div>
        </div>
      </div>

      {/* <header className={cn("mb-0 @container lg:mb-3", className)}>
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row lg:items-top @lg:justify-between">
          <div>
            <Title
              as="h2"
              className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"
            >
              {title}
            </Title>
            <Text className="mt-1 text-sm text-gray-500">{description}</Text>
          </div>
          {children}
        </div>
      </header> */}
    </>
  );
}
