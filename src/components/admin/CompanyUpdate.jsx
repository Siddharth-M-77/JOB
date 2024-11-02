import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Locate,
  LocateFixedIcon,
  LocateIcon,
  Pen,
  Phone,
} from "lucide-react";
import UpdateCompanyDailog from "./UpdateCompanyDailog";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompanyUpdate = () => {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  console.log(id);

  useEffect(() => {
    const getdata = async (id) => {
      try {
        const response = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setCompany(response.data.company);
        } else {
          console.error("Failed to fetch company data");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };
    getdata(id);
  }, [id]); // Fetch company data when the component mounts or id changes

  const goBack = () => {
    navigate(-1);
  };

  if (!company) {
    return <p>Loading...</p>; // Optional: Show loading state while fetching
  }

  return (
    <>
      <Button
        onClick={goBack}
        className="mt-6 ml-6 bg-white shadow-xl text-black flex gap-2 hover:text-white"
      >
        <ArrowLeft /> Go Back
      </Button>
      <div className="max-w-4xl mx-auto bg-white h-[60vh] flex flex-col justify-start rounded-lg my-5 p-8">
        <div className="bg-white shadow-lg p-6">
          <div className="flex gap-8 justify-between p-6">
            <div className="flex gap-6 items-center">
              <div className="logo w-16 h-16 object-cover rounded-full overflow-hidden">
                <img
                  src={company.logo}
                  className="w-full h-full"
                  alt={company.name}
                />
              </div>

              <div>
                <h1 className="font-extrabold text-2xl">{company.name}</h1>
                <p className="w-[40vw] font-semibold opacity-65 text-sm">
                  {company.description}
                </p>
              </div>
            </div>
            <Button onClick={() => setOpen(true)}>
              <Pen />
            </Button>
          </div>
          <div className="p-6 my-5">
            <div className="flex gap-2 items-center justify-start mb-2">
              <LocateIcon />
              <span>{company.location}</span>
            </div>
            <div className="flex gap-2 items-center justify-start">
              <Locate />
              <span> {company.website}</span>
            </div>
          </div>
        </div>

        <UpdateCompanyDailog open={open} setOpen={setOpen} id={id} />
      </div>
    </>
  );
};

export default CompanyUpdate;
