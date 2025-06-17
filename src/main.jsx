import { createRoot } from "react-dom/client";
import App from "./App";
import "../src/index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  NavLink,
  Route,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "./Layouts/BaseLayout";
import Login from "./Modules/KMC/Login";
import Projects from "./Modules/KMC/AllProjectsList";
import CreateProject from "./Components/CreateProject";
import Profile from "./Modules/Profile";
import Dashboard from "./Modules/KMC/Dashboard";
import ProjectLayout from "./Layouts/ProjectLayout";
import IndividualProjectDetails from "./Modules/KMC/IndividualProjectDetails";
import PrrPage from "./Modules/KMC/PrrPage";
import AuthProvider from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Reports from "./Modules/KMC/Reports";
import AllProjectsList from "./Modules/KMC/AllProjectsList";
import ChangePassword from "./Components/ChangePassword";
import ApprovalsPage from "./Modules/ApprovalsPage";
import TimeLogPage from "./TimeLogPage";
import TeamLeadViewOfLog from "./TeamLeadViewOfLog";
import TaskList from "./Modules/KMC/TaskList";
import AddTask from "./Modules/IT/AddTask";
import InboxPage from "./Modules/InboxPage";
import DraftsPage from "./Modules/DraftsPage";
import Connect from "./Modules/IT/Connect";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BaseLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectLayout />}>
            <Route path="" element={<></>} />
            <Route
              path="createproject"
              element={
                <CreateProject
                  key="new-project"
                  forDraft={false}
                  forEdit={false}
                />
              }
            />
            <Route
              path="createproject/:project_id"
              element={
                <CreateProject
                  key="edit-project"
                  forEdit={true}
                  forCreation={false}
                />
              }
            />

            <Route path="importproject" element={<></>} />
            <Route path="projectlist" element={<AllProjectsList />} />
            <Route
              path="individualproject/:project_id"
              element={<IndividualProjectDetails />}
            />
            <Route path="drafts" element={<DraftsPage />}></Route>
            <Route
              path="draftdata/:draft_id"
              element={<CreateProject key="edit-draft" forDraft={true} />}
            ></Route>
          </Route>
          {/* <Route path="reports" element={<></>} /> */}
          <Route path="profile" element={<Profile />} />
          <Route path="tasklist" element={<TaskList />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="generateprr" element={<PrrPage />} />
          <Route path="showprr/:id" element={<PrrPage showPrr={true} />} />
          <Route path="reports" element={<Reports />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="timelog" element={<TimeLogPage />}></Route>
          <Route path="teamtimelog" element={<TeamLeadViewOfLog />}></Route>
          <Route path="addtask" element={<AddTask />}></Route>
          <Route path="inbox" element={<InboxPage />}></Route>
          {/* <Route path="connect" element={<Connect />}></Route> */}
        </Route>
        {/* </Route> */}
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
  // <RouterProvider router={router} />
);
