import React, { Fragment } from "react";
import { Popover, PopoverButton, PopoverPanel, Transition, } from "@headlessui/react";
import { getInitials } from "../utils";

const UserInfo = ({ user }) => {
  return (
    <div className="px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            {/* Button to open the popover */}
            <PopoverButton className="group inline-flex items-center outline-none">
              <span className="bg-blue-600 text-white p-2 rounded-full">
                {getInitials(user?.name)}
              </span>
            </PopoverButton>

            {/* Popover Panel */}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-20 mt-3 w-64 max-w-sm -translate-x-1/2 left-1/2 transform px-4 sm:px-0">
                <div className="rounded-lg shadow-lg bg-white p-4">
                  <div className="flex items-center gap-4">
                    {/* User Initials */}
                    <div className="w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl">
                      <span>{getInitials(user?.name)}</span>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col gap-y-1">
                      <p className="text-black text-xl font-bold">{user?.name}</p>
                      <p className="text-gray-500 text-base">{user?.title}</p>
                      <p className="text-blue-500 text-base">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default UserInfo;
