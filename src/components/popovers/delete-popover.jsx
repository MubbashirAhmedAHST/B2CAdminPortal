"use client";
import { Title, Text, ActionIcon, Button, Popover, Input } from "rizzui";
import { PiTrashFill } from "react-icons/pi";
import { useState } from "react";

export default function DeletePopover({
  id,
  title,
  description,
  onDelete,
  loading,
  titleName = "Delete",
  showInput = false,
  inputLabel = "",
  className = "cursor-pointer hover:!border-gray-900 hover:text-gray-700 pl-2 pr-2",
}) {
  const [isNotOk, setIsNotOk] = useState(true);
  const checkKeyword = (value) => {
    if (value == "CONFIRM") {
      setIsNotOk(false);
    } else {
      setIsNotOk(true);
    }
  };

  return (
    <Popover
      placement="left"
      className="z-50"
      content={({ setOpen }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Title
            as="h6"
            className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
          >
            <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
          </Title>
          <Text className="mb-2 leading-relaxed text-gray-500">
            {description}
          </Text>
          {showInput == true ? (
            <Input
              type="text"
              label={inputLabel}
              labelClassName="font-bold"
              className="mb-2"
              onChange={(e) => checkKeyword(e.target.value)}
            />
          ) : (
            <></>
          )}
          <div className="flex items-center justify-end">
            <Button
              size="sm"
              className="me-1.5 h-7"
              onClick={onDelete}
              isLoading={loading}
              disabled={showInput == true ? isNotOk : false}
            >
              Yes
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      )}
    >
      <ActionIcon
      id={id}
        size="md"
        variant="outline"
        aria-label={titleName + " Item"}
        className={className}
        title={titleName}
      >
        {/* <TrashIcon className="h-4 w-4" /> */} {titleName}
      </ActionIcon>
    </Popover>
  );
}
