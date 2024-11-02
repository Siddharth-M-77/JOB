import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, StepBackIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const PostJob = () => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(""); // Store selected company ID
  const navigate = useNavigate();
  const params = useParams();
  const { companyId } = params;

  // Initialize the form with react-hook-form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Fetch companies associated with the logged-in user when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true, // Ensure you're sending cookies (if required for authentication)
        });

        if (response.data.success) {
          setCompanies(response.data.companies); // Set companies in state
          console.log(response.data)
        } else {
          toast.error("Failed to load companies.");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Error loading companies.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Handle form submission
  const submitHandler = async (data) => {
    try {
      setLoading(true);

      const jobData = {
        ...data,
        companyId: selectedCompanyId || companyId, // Ensure companyId is included
      };

      const res = await axios.post(`${JOB_API_END_POINT}/post`, jobData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/job");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const goBack= ()=>{
    navigate(-1)
  }

  return (
    <div className="lg:overflow-hidden flex">
    <div className="w-[20%] ">
    <button onClick={()=>goBack()} className="mt-10 text-sm font-['Roboto'] flex items-center justify-center ml-6 font-bold px-5 py-2 hover:bg-gray-600 hover:-translate-y-1 transition-all bg-[#7209B7] text-white  rounded-lg "> <StepBackIcon/>  Go Back</button>
    </div>
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={handleSubmit(submitHandler)} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-2">
            {/* Title Input */}
            <div>
              <Label>Title</Label>
              <Input type="text" {...register("title", { required: "Title is required" })} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
              {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
            </div>
            
            {/* Description Input */}
            <div>
              <Label>Description</Label>
              <Input type="text" {...register("description", { required: "Description is required" })} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
              {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
            </div>
            
            {/* Requirements Input */}
            <div>
              <Label>Requirements</Label>
              <Input type="text" {...register("requirements", { required: "Requirements are required" })} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
              {errors.requirements && <p className="text-xs text-red-600">{errors.requirements.message}</p>}
            </div>
            
            {/* Salary Input */}
            <div>
              <Label>Salary</Label>
              <Input type="text" {...register("salary", { required: "Salary is required" })} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
              {errors.salary && <p className="text-xs text-red-600">{errors.salary.message}</p>}
            </div>

            {/* Location Input */}
            <div>
              <Label>Location</Label>
              <Input type="text" {...register("location", { required: "Location is required" })} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
              {errors.location && <p className="text-xs text-red-600">{errors.location.message}</p>}
            </div>

            {/* Job Type Input */}
            <div>
              <Label>Job Type</Label>
              <Input type="text" {...register("jobType", { required: "Job Type is required" })} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
              {errors.jobType && <p className="text-xs text-red-600">{errors.jobType.message}</p>}
            </div>

            {/* Experience Level Input */}
            <div>
              <Label>Experience Level</Label>
              <Input type="text" {...register("experience", { required: "Experience Level is required" })} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
              {errors.experience && <p className="text-xs text-red-600">{errors.experience.message}</p>}
            </div>

            {/* No of Positions Input */}
            <div>
              <Label>No of Positions</Label>
              <Input type="number" {...register("position", { required: "Number of Positions is required", min: { value: 1, message: "Must be at least 1" } })} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
              {errors.position && <p className="text-xs text-red-600">{errors.position.message}</p>}
            </div>

            {/* Select Company */}
            {companies.length > 0 && (
              <div>
                <Label>Select Company</Label>
                <Select onValueChange={(value) => {
                  const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
                  if (selectedCompany) {
                    setSelectedCompanyId(selectedCompany._id); // Set selected company ID
                    setValue("companyId", selectedCompany._id);
                  }
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company.name.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}

          {/* Error Message if no companies found */}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
