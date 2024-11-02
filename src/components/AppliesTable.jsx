import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const AppliesTable = () => {
  const dispatch = useDispatch();
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log(allAppliedJobs);
  useEffect(() => {
    const fetchAllApliedJobs = async () => {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAllAppliedJobs(res.data.applications));
      }
    };
    fetchAllApliedJobs();
  }, []);
  return (
    <div>
      <Table>
        <TableCaption className="font-bold text-sm">
          A list of your recent Applied Job.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="text-center">Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center capitalize">
                {job.job.title}
              </TableCell>
              <TableCell>{job.job.companyId.name}</TableCell>
              <TableCell className="text-center  bg-gray-800 uppercase text-white rounded-full ">
                {job.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliesTable;
