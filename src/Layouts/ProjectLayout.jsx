import AuthProvider from "@/AuthProvider";
import { Outlet } from "react-router-dom";

const ProjectLayout = () => {
  return (
    <>
      {/* <AuthProvider> */}
        <div className="">
          <Outlet />
        </div>
      {/* </AuthProvider> */}
    </>
  );
};

export default ProjectLayout;
