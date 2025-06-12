"use client"
import { Modal } from "@mui/material";
import Buttons from "./Button";
import { XIcon } from "lucide-react";

export default function ModalComponent({
  isButton,
  buttonlabel,
  buttonAction,
  open,
  onClose,
  header,
  disable,
  children,
  widthClass = "max-w-lg",
  showCloseButton = true,
  closeButtonLabel = "Close",
}) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className={`bg-white rounded-lg shadow-lg w-full ${widthClass} relative max-h-[90vh] flex flex-col`}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b px-6 py-3 sticky top-0 bg-white z-20">
            <p
              id="modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {header}
            </p>
            {showCloseButton && (
              <button
                className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                onClick={onClose}
              >
                <XIcon size={20} />
              </button>
            )}
          </div>

          {/* Scrollable Content */}
          <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 px-6 py-3 border-t sticky bottom-0 bg-white z-20">
            {isButton && (
              <Buttons
                onClick={buttonAction}
                disable={disable}
                label={buttonlabel}
                id="btnModalAction"
              />
            )}
            <Buttons
              onClick={onClose}
              label={closeButtonLabel}
              id="btnModalClose"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
