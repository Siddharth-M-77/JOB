import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setCompanies } from "@/redux/companySlice";


const UpdateCompanyDailog = ({ open, setOpen, id }) => {
  const [company, setCompany] = useState(null);
  const dispatch = useDispatch()
  


  useEffect(() => {
    const getdata = async (id) => {
      try {
        const response = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
            set(response.data.company);
        } else {
          console.error("Failed to fetch company data");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };
    getdata(id);
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open && company) {
      reset({
        name: company?.name || "",
        description: company.description || "",
        profilePhoto: company?.profilePhoto || "", // Ensure this is correct based on your response structure
      });
    }
  }, [open, company, reset]);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const updatedData = {
      ...data,
    };
    try {
      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("bio", updatedData.description);
      if (updatedData.profilePhoto[0]) {
        formData.append("file", updatedData.profilePhoto[0]);
      }

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      );
      if (res.data.message) {
        toast.success(res.data.message);
        dispatch(setCompanies(res.data.company))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setOpen(false); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col items-start justify-center space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full items-center justify-center">
            {/* Name Field */}
            <div className="flex items-center gap-4 w-full mb-2 px-6">
              <Label htmlFor="name" className="text-right font-bold w-24">
                Name:
              </Label>
              <Input
                id="name"
                className="w-full"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Bio Field */}
            <div className="flex items-center gap-4 w-full mb-2 px-6">
              <Label htmlFor="bio" className="text-right font-bold w-24">
                Description:
              </Label>
              <Input
                id="description"
                className="w-full"
                type="text"
                {...register("description", {
                  required: "Enter your bio here..",
                })}
                placeholder="Enter your Bio here..."
              />
              {errors.bio && (
                <p className="text-red-500">{errors.bio.message}</p>
              )}
            </div>

            {/* Profile Photo Field */}
            <div className="flex items-center gap-4 w-full mb-2 px-6">
              <Label
                htmlFor="profilePhoto"
                className="text-right font-bold w-24"
              >
                Profile Photo:
              </Label>
              <Input
                type="file"
                id="profilePhoto"
                className="w-full"
                {...register("profilePhoto")}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end w-full space-x-2 mt-4">
              <Button type="submit" className="bg-blue-500 text-white">
                Save
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-gray-300 text-black"
                  onClick={() => {
                    reset(); // Reset the form values to initial state
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCompanyDailog;
