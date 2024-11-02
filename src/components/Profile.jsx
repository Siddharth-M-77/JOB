import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { ArrowLeft, Mail, Pen, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliesTable from "./AppliesTable";
import UpdateProfileDailog from "./UpdateProfileDailog";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [open, setOpen] = useState(false);
  // const isHaveResume = true;
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);
  console.log(user);
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Button
        onClick={goBack}
        className="mt-6 ml-6 bg-white shadow-xl text-black flex gap-2 hover:text-white"
      >
        <ArrowLeft /> Go Back
      </Button>
      <div className="max-w-4xl mx-auto bg-white min-h-[100vh] flex  flex-col justify-start rounded-lg my-5 p-8">
        <div className="bg-white shadow-lg p-6">
          <div className="flex  gap-8 justify-between p-6">
            <div className="flex gap-2 items-center">
              <div className="logo  w-16 h-16 object-cover rounded-full overflow-hidden">
                <img
                  src={user?.profile?.profilePhoto}
                  className="w-full h-full "
                  alt=""
                />
              </div>

              <div className="">
                <h1 className="font-extrabold text-xl">{user?.fullName}</h1>
                <p className="w-[40vw] opacity-65 text-sm">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <Button>
              <Pen onClick={() => setOpen(true)} />
            </Button>
          </div>
          <div className="p-6 my-5 ">
            <div className="flex gap-2 items-center justify-start mb-2">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex gap-2 items-center justify-start">
              <Phone />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>
          <div>
            <h1 className="px-6">Skills</h1>

            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge className="my-2 mr-2" key={index}>
                  <div className="flex p-2 flex-wrap">{item}</div>
                </Badge>
              ))
            ) : (
              <span className="px-6">No skills available</span>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center px-6">
            <Label className="text-xl font-semibold">Resume</Label>
            {user ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Resume
              </a>
            ) : (
              "No Resume😔"
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="border-b-2 mt-5 border-bg-gray-300 font-extrabold font-serif text-2xl py-4">
            Applied Jobs
          </h1>
          <AppliesTable />
        </div>
        <UpdateProfileDailog open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Profile;
