import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "../../utils/constant";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Using React Hook Form for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch the file input for changes
  const watchLogo = watch("logo");

  const registerNewCompany = async (data) => {
    try {
      // Create FormData to handle file uploads

      const formData = new FormData();
      formData.append("name", data.companyName);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("website", data.website);

      if (data.logo[0]) {
        formData.append("logo", data.logo[0]); // Get the file from input
      }

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        // Inside the registerNewCompany function
        const companyId = res?.data?.company?._id;
        navigate(`/admin/PostJob/${companyId}`, { state: { companyId } });
      }
    } catch (error) {
      console.error("Create company error", error);
      toast.error("Error creating company");
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto  ">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Register Your Company</h1>
          <p className="text-gray-500">
            Please fill in the details to register your company.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(registerNewCompany)}
          encType="multipart/form-data"
        >
          <div className="my-4">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              placeholder="JobHunt, Microsoft, etc."
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
            {errors.companyName && (
              <p className="text-red-500">{errors.companyName.message}</p>
            )}
          </div>

          <div className="my-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Brief company description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="my-4">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="Location of the company"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="my-4">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://companywebsite.com"
              {...register("website")}
            />
            {errors.website && (
              <p className="text-red-500">{errors.website.message}</p>
            )}
          </div>

          <div className="my-4">
            <Label htmlFor="logo">Company Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              {...register("logo")}
            />
            {/* Display logo preview if a file is selected */}
            {watchLogo && watchLogo[0] && (
              <img
                src={URL.createObjectURL(watchLogo[0])}
                alt="Logo Preview"
                className="my-4 h-32 w-32 object-cover"
              />
            )}
          </div>

          <div className="flex items-center gap-2 my-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreate;
