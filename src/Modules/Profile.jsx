import { Button } from "@/Components/ui/button";
// import mUserData from "../../MOCK_USERDATA.json";
import React, { useState, useMemo } from "react";
import { useAuth } from "@/AuthProvider";

const Profile = () => {
  //const [userData, setUserData] = useState({});
  const authData = useAuth();
  console.log(authData);
  const userData = authData.data.user_info;

  console.log(userData);
  return (
    <>
      <div className="flex flex-col">
        <div className="mr-24 p-4 place-self-start m-6 text-4xl border-double border-b-8 border-gray-600   font-mono ">
          Profile
        </div>
        <div className="flex flex-col gap-6 m-6 mt-12">
          <div className="flex flex-row">
            <label htmlFor="ein" className="ml-4 w-2/3 font-semibold basis-1/4">
              EIN:
            </label>
            <div
              name="ein"
              className="rounded-2xl w-4/5 border-2 border-slate-400 content-center text-center h-14 text-xl basis-3/4"
            >
              {userData.ein}
            </div>
          </div>
          <div className="flex flex-row">
            <label htmlFor="email" className="ml-4 w-2/3 font-semibold basis-1/4">
              Email:
            </label>
            <div
              name="email"
              className="rounded-2xl w-4/5 border-2 border-slate-400 content-center text-center h-14 text basis-3/4"
            >
              {userData.email}
            </div>
          </div>
          {/* <div className="flex flex-row">
            <label htmlFor="admin" className=" ml-4 w-2/3 font-semibold">
              Admin Rights:
            </label>
            <div
              name="admin"
              className="rounded-2xl w-4/5 border-2 border-slate-400 content-center text-center h-14 text-xl"
            >
              {userData.admin ? "Yes" : "No"}
            </div>
          </div> */}
          <div className="flex flex-row">
            <label htmlFor="first_name" className="ml-4 w-2/3 font-semibold basis-1/4">
               Name:
            </label>
            <div
              name="first_name"
              className="rounded-2xl w-4/5 border-2 border-slate-400 content-center text-center h-14 text-xl basis-3/4"
            >
              {userData.firstName}
            </div>
          </div>
          {/* <div className="flex flex-row">
            <label htmlFor="last_name" className="ml-4 w-2/3 font-semibold basis-1/4">
              Last Name:
            </label>
            <div
              name="last_name"
              className="rounded-2xl w-4/5 border-2 border-slate-400 content-center text-center h-14 text-xl basis-3/4"
            >
              {userData.lastName}
            </div> */}
          {/* </div> */}
          <div className="flex flex-row">
            <label htmlFor="division" className="ml-4 w-2/3 font-semibold basis-1/4">
              Division:
            </label>
            <div
              name="division"
              className="rounded-2xl w-4/5 border-2 border-slate-400 content-center text-center h-14 text-xl basis-3/4"
            >
              {userData.division}
            </div>
          </div>
          <div className="flex flex-row">
            <label htmlFor="department" className="ml-4 w-2/3 font-semibold basis-1/4">
              Department:
            </label>
            <div
              name="department"
              className="rounded-2xl w-4/5 border-2 border-slate-400 content-center text-center h-14 text-xl basis-3/4"
            >
              {userData.department}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
