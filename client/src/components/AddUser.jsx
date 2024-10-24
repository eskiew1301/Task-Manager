import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "./Textbox";
import Button from "./Button";
import Loader from "./Loader";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const dispatch = useDispatch();
  const submitHandler = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success(result?.message);

        if (userData?._id === user.id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        const result = await addNewUser({
          ...data,
          password: data.email,
        }).unwrap();

        toast.success("New user added successfully.");
      }
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Full Name"
              type="text"
              name="name"
              label="Full Name"
              className="w-full rounded"
              register={register("name", { required: "Name is required" })}
              error={errors.name ? errors.name.message : ""}
            />

            <Textbox
              placeholder="Title"
              type="title"
              name="title"
              label="Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="Email Address"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded"
              register={register("email", {
                required: "Email address is required",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder="Role"
              type="role"
              name="role"
              label="Role"
              className="w-full rounded"
              register={register("role", { required: "User role is required" })}
              error={errors.role ? errors.role.message : ""}
            />

            {isLoading || isUpdating ? (
              <div className="py-5">
                <Loader />
              </div>
            ) : (
              <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto rounded-none"
                />
                <Button
                  label="Cancel"
                  type="button"
                  className="bg-white-600 px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                  onClick={() => setOpen(false)}
                />
              </div>
            )}
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
