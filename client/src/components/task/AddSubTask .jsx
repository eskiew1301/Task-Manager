import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";

import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";



const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addSubTask] = useCreateSubTaskMutation()
  //console.log(object)
  const submitHandler = async(data) => {
    try {
      const res = await addSubTask({data, id}).unwrap()

      toast.success(res.message)

      setTimeout(() => {
        setOpen(false)
      }, 500);
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error.error)
    }
  };
 
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          ADD SUB-TASK
        </DialogTitle>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Sub-Task Title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <div className="mt-2 flex gap-4">
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", { required: "Date is required" })}
              error={errors.date ? errors.date.message : ""}
            />
            <Textbox
              placeholder="Tag"
              type="text"
              name="tag"
              label="Tag"
              className="w-full rounded"
              register={register("tag", { required: "tag is required" })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>
        </div>

        <div className="py-3 mt-4 flex sm:flex sm:flex-row-reverse gap-4">
         
            <Button
              label="Add Task"
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
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;
