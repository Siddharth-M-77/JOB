import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicatsTable"; // Corrected import
import axios from "axios";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import Loading from "../Loading";

const Applicants = () => {
  const { applicants } = useSelector((store) => store.application);
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      console.log("Fetching applicants for ID:", id); // Log ID
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          console.log("API Response:", response.data); // Log full response
          dispatch(setAllApplicants(response.data.job)); // Ensure correct dispatch
        } else {
          <Loading />;
        }
      } catch (error) {
        console.error("Error fetching applicants:", error.message);
        // Log detailed error if available
        if (error.response) {
          console.error("Error Response Data:", error.response.data);
          console.error("Error Response Status:", error.response.status);
        }
      }
    };

    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="h-screen max-w-9xl mx-auto gap-5 flex justify-start flex-col p-10 ">
      <h1 className='text-2xl text-center font-extrabold capitalize font-["Roboto"]'>
        All Applicants ({applicants?.applications?.length || 0})
      </h1>
      <div className="w-full">
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
