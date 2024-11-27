import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams, useNavigate } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const JobDescription = () => {
  const { user } = useSelector((store) => store.user);
  const { singleJob } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { jobId } = params;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        toast.error("Failed to fetch job details");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  const daysAgo = (mongooseTime) => {
    const createdAt = new Date(mongooseTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const goBack = () => {
    navigate(-1);
  };

  const ApplyBtn = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res.data.message);

        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...singleJob.applications, { applicant: user._id }],
          })
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const isAlreadyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  );

  if (!singleJob) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg">
      <div className="max-w-5xl mx-auto flex h-[71.5vh] items-center flex-col justify-start pt-5">
        <div className="w-full">
          <Button
            onClick={goBack}
            className="mb-4 bg-white shadow-xl text-black flex gap-2 hover:text-white"
          >
            <ArrowLeft /> Go Back
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4 items-start justify-center">
              <h1 className="text-3xl font-extrabold text-orange-400">
                {singleJob?.title || "Loading..."}
              </h1>
              <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                  {singleJob?.positions || "N/A"} Position
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                  {singleJob?.jobType || "N/A"}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                  {singleJob?.salary || "N/A"}
                </Badge>
              </div>
            </div>
            <Button
              onClick={ApplyBtn}
              disabled={isAlreadyApplied}
              className={`${
                isAlreadyApplied
                  ? "bg-gray-800 cursor-not-allowed"
                  : "bg-indigo-700"
              }`}
            >
              {isAlreadyApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
          <h2 className="mt-8 font-bold text-xl font-[Poppins] border-opacity-20 pb-4 border-b-2 border-black">
            Job Descriptions:
          </h2>
          <div className="job-details">
            <p className="text-sm mb-2 font-semibold mt-2">
              Role: {singleJob?.title || "N/A"}
            </p>
            <p className="text-sm mb-2 font-semibold mt-2">
              Location: {singleJob?.location || "N/A"}
            </p>
            <p className="text-sm mb-2 font-semibold mt-2">
              Descriptions: {singleJob?.description || "N/A"}
            </p>
            <p className="text-sm mb-2 font-semibold mt-2">
              Experience: {singleJob?.experience || "N/A"}
            </p>
            <p className="text-sm mb-2 font-semibold mt-2">
              Salary: {singleJob?.salary || "N/A"}
            </p>
            <p className="text-sm mb-2 font-semibold mt-2">
              Total Applicants: {singleJob?.applications?.length || 0}
            </p>
            <p className="text-sm mb-2 font-semibold mt-2">
              Posted Date:{" "}
              {singleJob?.createdAt
                ? daysAgo(singleJob?.createdAt) === 0
                  ? "Today"
                  : `${daysAgo(singleJob?.createdAt)} days ago`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
