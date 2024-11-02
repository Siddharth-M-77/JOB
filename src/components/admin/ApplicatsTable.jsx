import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const shortListed = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store) => store.application);
  console.log(applicants.applications.applicant);

  // Function to handle status update
  const handleStatusUpdate = async (applicantId, status) => {
    try {
      const response = await axios.put(
        `${APPLICATION_API_END_POINT}/status/${applicantId}/update`, // Change to use applicantId
        { status }, // Send only the status in the body
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Error updating status: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <table className="w-full mx-auto">
      <TableCaption className="mb-4 text-center">
        A list of your recently applied users
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants && applicants.applications.length > 0 ? (
          applicants.applications.map((application, index) => {
            const applicant = application.applicant; // Accessing the applicant directly

            return (
              <TableRow key={applicant._id || index}>
                <TableCell>{applicant.fullName}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.phoneNumber}</TableCell>
                <TableCell>
                  <a
                    href={applicant.profile.profilePhoto} // Use a relevant link if applicable
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </TableCell>
                <TableCell>
                  {new Date(application.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      {shortListed.map((status, index) => (
                        <h2
                          onClick={() =>
                            handleStatusUpdate(application._id, status)
                          }
                          className="hover:text-blue-600"
                          key={index}
                        >
                          {status}
                        </h2>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No applicants found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </table>
  );
};

export default ApplicantsTable;
