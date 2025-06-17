import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useAuth } from "@/AuthProvider";
import { CHANGE_PASSWORD_URL } from "@/URL";

function ChangePassword() {
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmNewPass, setConfirmNewPass] = useState();
  const authData = useAuth();

  const handleCurrentPassChange = (e) => {
    setCurrentPass(e.target.value);
  };

  const handleNewPassChange = (e) => {
    setNewPass(e.target.value);
  };
  const handleConfirmNewPassChange = (e) => {
    setConfirmNewPass(e.target.value);
  };
  //   const handleCheck = () => {
  //     console.log(currentPass);
  //   };
  const handleChangePass = async () => {
    if (newPass === confirmNewPass) {
      try {
        const response = await axios.post(CHANGE_PASSWORD_URL, {
          email: authData.data.user_info.email,
          old_password: currentPass,
          new_password: newPass,
        });
        if (response.status === 400) {
          alert("Error in updating the password !");
        } else if (response.status === 403) {
          alert("Incorrect Password, Try Again !");
        } else if (response.status === 200) {
          alert("Password updated successfully !");
        }
      } catch (err) {
        console.error(err);
      }
    } else if (newPass.length < 8 || confirmNewPass.length < 8) {
      alert("Password should have atleast a length of 8 characters");
    } else {
      alert("Passwords Don't Match");
    }
  };

  return (
    <div className="flex flex-col gap-7 p-5">
      <div className="flex flex-wrap w-2/5">
        <label className="m-2 ">Current Password</label>
        <input
          className="rounded-full w-4/5"
          onChange={(e) => handleCurrentPassChange(e)}
          type="password"
        />
      </div>
      <div className="flex flex-wrap w-2/5">
        <label className="m-2">New Password</label>
        <input
          className="rounded-full w-4/5"
          onChange={handleNewPassChange}
          type="password"
        />
      </div>
      <div className="flex flex-wrap w-2/5">
        <label className="m-2">Confirm New Password</label>
        <input
          className="rounded-full w-4/5"
          onChange={handleConfirmNewPassChange}
          type="password"
        />
      </div>
      <Button
        className="bg-teal-theme w-1/5 mt-5 rounded-full text-white"
        onClick={handleChangePass}
      >
        Change Password
      </Button>
    </div>
  );
}

export default ChangePassword;
