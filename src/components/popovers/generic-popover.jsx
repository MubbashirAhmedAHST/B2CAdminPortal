"use client";
import { Title, Text, ActionIcon, Button, Popover, Input } from "rizzui";
import { PiCheckCircleFill } from "react-icons/pi";
import { useState } from "react";

export default function GenericPopover({
  id,
  title,
  description,
  onClickFunction,
  loading,
  titleName = "OK",
  showInput = false,
  inputLabel = `Type "CONFIRM"`,
  className = "cursor-pointer hover:!border-gray-900 hover:text-gray-700 pl-2 pr-2",
  icon = <PiCheckCircleFill className="me-1 h-[17px] w-[17px]" />,
  btnVariant = "solid",
}) {
  const [isNotOk, setIsNotOk] = useState(true);
  const [open, setOpen] = useState(false);
  const [valueYESBtn, setValueYESBtn] = useState("");
  const checkKeyword = (value) => {
    setValueYESBtn(value);
    if (value == "CONFIRM") {
      setIsNotOk(false);
    } else {
      setIsNotOk(true);
    }
  };
  const performClick = (e) => {
    onClickFunction(e);
    setValueYESBtn("");
    setIsNotOk(true);
    setOpen(false);
  };

  return (
    <Popover
      placement="left"
      className="z-50"
      isOpen={open}
      setIsOpen={setOpen}
      content={({ open }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Title
            as="h6"
            className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
          >
            {icon} {title}
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
              value={valueYESBtn}
              onChange={(e) => checkKeyword(e.target.value)}
            />
          ) : (
            <></>
          )}
          <div className="flex items-center justify-end">
            <Button
              id="btnYes"
              size="sm"
              className="me-1.5 h-7"
              onClick={performClick}
              isLoading={loading}
              disabled={showInput == true ? isNotOk : false}
            >
              Yes
            </Button>
            <Button
              id="btnNo"
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
        variant={btnVariant}
        aria-label={titleName + " Item"}
        className={className + " w-auto font-semibold px-4 py-2 text-sm h-10"}
        title={titleName}
      >
        {icon} {titleName}
      </ActionIcon>
    </Popover>
  );
}
