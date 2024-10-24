import React from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";



export default function ConfirmationDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type='delete',
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };
  const getActionLabel = () => {
    switch (type) {
      case "delete":
        return "Delete";
      case "deleteAll":
        return "Delete All";
      case "restore":
        return "Restore";
      case "restoreAll":
        return "Restore All";
      default:
        return "Confirm";
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
          <DialogTitle as="h3" className="">
            <p
              className={clsx(
                "p-3 rounded-full",
                type === "delete" || type === "deleteAll"
                  ? "text-yellow-600 bg-yellow-100"
                  : "text-red-600 bg-red-100"
              )}
            >
              <FaQuestion size={60} />
            </p>
          </DialogTitle>
          <p className="text-center text-gray-500">
            {msg ?? "Are you sure you want to delete the selected record?"}
          </p>
          <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
            <Button
              type="button"
              className={clsx(
                "px-8 text-sm font-semibold text-white sm:w-auto",
                type === "restore" || type === "restoreAll"
                  ? "bg-yellow-600"
                  : "bg-red-600 hover:bg-red-500"
              )}
              onClick={onClick}
              label={getActionLabel()}
            />
            <Button
              type="button"
              className="px-8 text-sm font-semibold bg-white sm:w-auto text-gray-900 border"
              onClick={() => closeDialog()}
              label="Cancel"
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
export function UserActions({ open, setOpen, onClick = () => {}, msg }) {
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
          <DialogTitle as="h3" className="">
            <p
              className={clsx(
                "p-3 rounded-full", "text-red-600 bg-red-200"
              )}
            >
              <FaQuestion size={60} />
            </p>
          </DialogTitle>
          <p className="text-center text-gray-500">
            {msg ?? "Are you sure you want to activate or deactivate this account?"}
          </p>
          <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
            <Button
              type="button"
              className={clsx(
                "px-8 text-sm font-semibold text-white sm:w-auto","bg-red-600 hover:bg-red-500"
              )}
              onClick={onClick}
              label={"Yes"}
            />
            <Button
              type="button"
              className="px-8 text-sm font-semibold bg-white sm:w-auto text-gray-900 border"
              onClick={() => closeDialog()}
              label="No"
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
