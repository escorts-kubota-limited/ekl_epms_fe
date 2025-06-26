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
import ImportProjects from "./pages/ImportPlan/ImportProjects";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <ProtectedRoute> */}

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
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <Dashboard />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoute>
                <ProjectLayout />{" "}
              </ProtectedRoute>
            }
          >
            <Route path="" element={<></>} />
            <Route
              path="createproject"
              element={
                <ProtectedRoute>
                  <CreateProject
                    key="new-project"
                    forDraft={false}
                    forEdit={false}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="createproject/:project_id"
              element={
                <ProtectedRoute>
                  <CreateProject
                    key="edit-project"
                    forEdit={true}
                    forCreation={false}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="importproject"
              element={
                <ProtectedRoute>
                  <ImportProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="projectlist"
              element={
                <ProtectedRoute>
                  <AllProjectsList />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="individualproject/:project_id"
              element={
                <ProtectedRoute>
                  <IndividualProjectDetails />
                </ProtectedRoute>
              }
            />
            <Route path="drafts" element={
              <ProtectedRoute>
                  <DraftsPage />
                </ProtectedRoute>
              }></Route>
            <Route
              path="draftdata/:draft_id"
              element={ 
                <ProtectedRoute>
                  <CreateProject key="edit-draft" forDraft={true} />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
          {/* <Route path="reports" element={<></>} /> */}
          <Route path="profile" element={   <ProtectedRoute>
                 <Profile />
                </ProtectedRoute>
                } />
          <Route path="tasklist" element={
            <ProtectedRoute>
              <TaskList />

            </ProtectedRoute>
            
            } />
          <Route path="approvals" element={
            <ProtectedRoute>

              <ApprovalsPage />
            </ProtectedRoute>
            } />
          <Route path="generateprr" element={
            <ProtectedRoute>

              <PrrPage />
            </ProtectedRoute>
            } />
          <Route path="showprr/:id" element={
                        <ProtectedRoute>

            <PrrPage showPrr={true} />
                        </ProtectedRoute>

            } />
          <Route path="reports" element={
            <ProtectedRoute>

              <Reports />
            </ProtectedRoute>
          }
             />
          <Route path="changepassword" element={ 
            <ProtectedRoute>
              <ChangePassword />

            </ProtectedRoute>
            } />
          <Route path="timelog" element={
            <ProtectedRoute>

              <TimeLogPage />
            </ProtectedRoute>
            }></Route>
          <Route path="teamtimelog" element={
            <ProtectedRoute>

              <TeamLeadViewOfLog />
            </ProtectedRoute>
            }></Route>
          <Route path="addtask" element={
            <ProtectedRoute>

              <AddTask />
            </ProtectedRoute>
            }></Route>
          <Route path="inbox" element={
            <ProtectedRoute>

              <InboxPage />
            </ProtectedRoute>
            }></Route>
          {/* <Route path="connect" element={<Connect />}></Route> */}
        </Route>
        {/* </Route> */}
      </Route>
      {/* </ProtectedRoute> */}
       
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <>
    <App />
    <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  </AuthProvider>
  // <RouterProvider router={router} />
);
