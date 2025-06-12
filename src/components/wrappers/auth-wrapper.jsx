"use client";

import { Text, Title } from "rizzui";
import Image from "next/image"; // ✅ Use Next.js optimized Image component if needed
import Link from "next/link"; // ✅ Use Next.js Link component

export default function AuthWrapper({
  title,
  description,
  background = "/imgs/01.webp",
  children,
}) {
  return (
    <>
      <div className="row min-h-screen">
        {/* Left Side - Form and Branding */}
        <div className="col-12 col-lg-5 mt-1 flex flex-col justify-center p-4">
          <div className="my-5 text-center">
            {/* Use Next.js Image component if needed */}
            <Image
              src="/images/header-logo.png"
              alt="Logo"
              width={150}
              height={100}
              className="mx-auto w-1/3"
              priority
            />
          </div>

          <Title as="h4" className="card-title text-center">
            {title}
          </Title>
          <Text className="text-center">{description}</Text>

          {children}
        </div>

        {/* Right Side - Background Image */}
        <div
          className="col-12 col-lg-7"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </div>
    </>
  );
}
