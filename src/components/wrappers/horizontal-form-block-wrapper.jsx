"use client";
import { Text, Title } from "rizzui";
import { cn } from "../../helpers/utilities";

export default function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  mdGridCols = "2",
  smGridCols = "3",
  isModalView = true,
}) {
  return (
    <div
      className={cn(
        className,
        isModalView ? "@5xl:grid @5xl:grid-cols-6" : " "
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-" +
            mdGridCols +
            " sm:grid-cols-" +
            smGridCols +
            " gap-x-3 gap-y-3 @lg:gap-x-4 @lg:gap-y-3 @2xl:gap-x-5 @2xl:gap-y-4",
          isModalView ? "col-span-4" : " "
        )}
      >
        {children}
      </div>
    </div>
  );
}
