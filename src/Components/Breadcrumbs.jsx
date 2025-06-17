import { NavLink, useLocation } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

function Breadcrumbs() {
  const breadCrumbLabels = {
    projects: "Projects",
    createproject: "Create Project",
    dashboard: "Dashboard",
    importproject: "Import Project",
    projectlist: "Project List",
    tasks: "Tasks",
    tasktemplate: "Task Template",
    tasklist: "Task List",
    reports: "Reports",
    individualproject: "Individual Project",
    profile: "Profile",
    generateprr: "Generate PRR",
    changepassword: "Change Password",
    approvals: "Approvals",
    timelog: "Time Log",
    teamtimelog: "Team Time Log",
    addtask: "Add Task",
    showprr:"View PRR",
    inbox:"Inbox",
    drafts:"Drafts",
    draftdata: "Draft Data"
  };

  //pending link action of breadcrumbs
  const location = useLocation();
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <>
          <BreadcrumbSeparator>
            <ArrowRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            {/* <NavLink> */}
            <div>
              <BreadcrumbLink>
                {breadCrumbLabels.hasOwnProperty(`${crumb}`)
                  ? breadCrumbLabels[crumb]
                  : crumb}
              </BreadcrumbLink>
            </div>
            {/* </NavLink> */}
          </BreadcrumbItem>
        </>
      );
    });
  return (
    <Breadcrumb>
      <BreadcrumbList>{crumbs}</BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
