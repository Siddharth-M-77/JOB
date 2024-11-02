import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Backpack, BackpackIcon, Bookmark, Eye, StepBackIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import useGetAllAdminJobs from "@/hooks/usegetAllAdminJobs";
import { useNavigate } from "react-router-dom";

const AllAdminJob = () => {
  useGetAllAdminJobs(); // Fetch all admin jobs when the component mounts
  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((store) => store.job);
  

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleClick = (id) => {
    navigate(`/admin/job/description/${id}`);
  };
  const handleJobClick = () => {
    navigate(`/admin/JobPost`);
  };
  const goBack=()=>{
    navigate(-1)
  }

  return (
    <>
    <div className="flex items-center justify-between  mt-4 p-5">
      
    <button onClick={()=>goBack()} className="text-sm font-['Roboto'] flex items-center justify-center ml-6 font-bold px-5 py-2 hover:bg-gray-600 hover:-translate-y-1 transition-all bg-[#7209B7] text-white  rounded-lg "> <StepBackIcon/>  Go Back</button>
    <button onClick={()=>handleJobClick()} className="mr-12 text-sm font-['Roboto'] font-bold px-5 py-2 hover:bg-gray-600 hover:-translate-y-1 transition-all bg-[#7209B7] text-white  rounded-lg ">Post Job👋</button>
    </div>
    
    <div className="container mx-auto max-w-screen-xl  grid grid-cols-1 gap-20 md:gap-20 lg:gap-10 flex-wrap md:grid-cols-2 lg:grid-cols-3 overflow-hidden ">
    {allAdminJobs.length > 0 ? (
      allAdminJobs.map((job) => (
        <div
          key={job._id}
          className="p-5 rounded-md shadow-xl min-h-72 w-full md:w-96 mt-10 hover:scale-105 transition-all  flex flex-col gap-3 bg-white border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {daysAgoFunction(job.createdAt) === 0
                ? "Today"
                : `${daysAgoFunction(job.createdAt)} days ago`}
            </p>
            <Button variant="outline" className="rounded-full" size="icon">
              <Bookmark />
            </Button>
          </div>
  
          <div className="flex items-center gap-2 my-2">
            <Button className="p-6" variant="outline" size="icon">
              <Avatar>
                <AvatarImage src={job.companyId.logo} alt={job.title} />
              </Avatar>
            </Button>
            <div>
              <h1 className="font-medium text-lg">{job.title}</h1>
              <p className="text-sm text-gray-500">{job.companyId.name}</p>
            </div>
          </div>
  
          <div>
            <h1 className="font-bold text-lg my-2">{job.title}</h1>
            <p className="text-sm text-gray-600">
              Description: {job.description}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {job.position}  Position
            </Badge>
  
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              <a
                href={
                  job.companyId.website.startsWith("http")
                    ? job.companyId.website
                    : `https://${job.companyId.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {job.companyId.website}
              </a>
            </Badge>
          </div>
          <div className="flex items-center justify-between gap-4 mt-4">
            <Button variant="outline" onClick={() => handleClick(job._id)}>
              Details
            </Button>
            <Button onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="bg-blue-600 hover:bg-blue-700"><Eye/> View Applicants </Button>
          </div>
        </div>
      ))
    ) : (
      <div className="p-5 text-center col-span-full">
        <h1 className="text-lg font-bold">No Jobs Posted Yet!</h1>
        <p className="text-gray-500">
          Please check back later for available job listings.
        </p>
      </div>
    )}
  </div></>
  
  );
};

export default AllAdminJob;
