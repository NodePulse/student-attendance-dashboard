"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const AddNewStudent = ({ refreshData }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitHandler = (data) => {
    setLoading(true);
    GlobalApi.CreateNewStudents(data)?.then((res) => {
      console.log(res);
      if (res.data) {
        reset();
        refreshData();
        setOpen(false);
        toast.success("Student Created Successfully");
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllGradesList();
  }, []);

  const getAllGradesList = () => {
    GlobalApi.GetAllGrades()?.then((res) => setGrades(res.data.result));
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={handleSubmit(submitHandler)}>
            <div className="pt-3">
              <label htmlFor="">Full Name</label>
              <Input
                placeholder="Ex. John Doe"
                {...register("name", { required: true })}
              />
            </div>
            <div className="pt-3 flex flex-col">
              <label htmlFor="">Select Grade</label>
              <select
                name=""
                id=""
                className="p-3 border rounded-lg"
                {...register("grade", { required: true })}
              >
                {grades?.map((grade) => (
                  <option key={grade.id} value={grade.grade}>
                    {grade.grade}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-3">
              <label htmlFor="">Contact Number</label>
              <Input
                type="number"
                placeholder="Ex. 123456789"
                {...register("contact")}
              />
            </div>
            <div className="pt-3">
              <label htmlFor="">Address</label>
              <Input
                placeholder="Ex. 123 Main Street"
                {...register("address")}
              />
            </div>
            <div className="flex gap-3 items-center justify-end mt-5">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
