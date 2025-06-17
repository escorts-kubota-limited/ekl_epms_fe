import React from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { PowerIcon, UserCircleIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthProvider";
import { User } from "lucide-react";

export function ProfileAvatar() {
  const { logOut } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const closeMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();
  const onChangePassword = () => {
    navigate("/changepassword")
  };
  const onProfileClick = () => {
    navigate("/profile");
  };

  const onLogOut = () => {
    logOut();
    navigate("/login");
  };

  const profileMenuItems = [
    {
      label: "Change Password",
      key: "change_password",
      icon: <KeyIcon className="h-7 w-7" />,
      onClick: onChangePassword,
      className: "flex p-2 text-xl items-center gap-2 rounded ",
    },
    {
      label: "My Profile",
      key: "my_profile",
      icon: <UserCircleIcon className="h-7 w-7" />,
      onClick: onProfileClick,
      className: "flex p-2 text-xl items-center gap-2 rounded",
    },
    {
      label: "Log Out",
      key: "log_out",
      icon: <PowerIcon className="h-7 w-7 text-red-600" />,
      onClick: onLogOut,
      className:
        "flex p-2 text-xl items-center gap-2 rounded text-red-600 hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10",
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
            <span className="font-bold text-2xl text-gray-600 dark:text-gray-300">
              <User/>
            </span>
          </div>
        </Button>
      </MenuHandler>
      <MenuList className="p-2 bg-teal-theme mt-6 rounded-lg">
        {profileMenuItems.map((item) => {
          return (
            <MenuItem
              key={item.key}
              onClick={item.onClick}
              className={item.className}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          );
        })}
        {/* <MenuItem
          key="my_profile"
          onClick={onProfileClick}
          className="flex items-center gap-2 rounded"
        >
          <UserCircleIcon className="h-4 w-4" />
          <Typography className="font-normal m-2">My Profile</Typography>
        </MenuItem>
        <MenuItem
          key="sign_out"
          onClick={onLogOut}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          <PowerIcon className="h-4 w-4 text-red-500" />
          <Typography className="font-normal m-2" color="red">
            Log Out
          </Typography>
        </MenuItem> */}
      </MenuList>
    </Menu>
  );
}
