// import {
//   Card,
//   list,
//   List,
//   ListItem,
//   ListItemPrefix,
//   Menu,
//   MenuHandler,
//   MenuItem,
//   MenuList,
// } from "@material-tailwind/react";
// import {
//   ChevronUpIcon,
//   FolderIcon,
//   ChartBarIcon,
//   PencilSquareIcon,
//   QueueListIcon,
//   PlusCircleIcon,
//   DocumentArrowUpIcon,
//   ListBulletIcon,
//   ArchiveBoxArrowDownIcon,
//   CheckBadgeIcon,
//   CalendarDateRangeIcon,
// } from "@heroicons/react/24/solid";
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { keepPreviousData } from "@tanstack/react-query";
// import { memo } from "react";
// import React from "react";
// import axios from "axios";
// import { IMAGE_PUBLIC_URL } from "@/URL";
// import { useAuth } from "@/AuthProvider";

// const Sidebar = memo(() => {
//   const [approvalsList, setApprovalsList] = useState([]);
//   const [openProject, setOpenProject] = useState(false);
//   const [openReports, setOpenReports] = useState(false);
//   const [openTask, setOpenTask] = useState(false);
//   const [approvalsCount, setApprovalsCount] = useState(approvalsList.length);
//   const [inboxCount, setInboxCount] = useState();

//   // need to enter re-render variable

//   // console.log("rerendered");
//   const { data } = useAuth();
//   // console.log(data)

//   const sidebarMenuList = [
//     {
//       url: "/dashboard",
//       label: "Dashboard",
//       icon: <QueueListIcon className="h-7 w-7" />,
//       key: "dashboard",
//       show: true,
//     },
//     {
//       //url: "/projects",
//       label: "Projects",
//       icon: <FolderIcon className="h-7 w-7" />,
//       key: "projects",
//       show: true,
//       nestedListItems: [
//         {
//           url: "projects/createproject",
//           label: "Create Project",
//           icon: <PlusCircleIcon className="h-7 w-7" />,
//           key: "createProject",
//           show: true,
//         },
//         {
//           url: "projects/importproject",
//           label: "Import Project",
//           icon: <DocumentArrowUpIcon className="h-7 w-7" />,
//           key: "importProject",
//           show: true,
//         },
//         {
//           url: "projects/drafts",
//           label: "Drafts",
//           icon: <ArchiveBoxArrowDownIcon className="h-7 w-7" />,
//           key: "drafts",
//           show: true,
//         },
//         {
//           url: "projects/projectlist",
//           label: "Project List",
//           icon: <ListBulletIcon className="h-7 w-7" />,
//           key: "projectList",
//           show: true,
//         },
//       ],
//     },
//     {
//       url: "/tasks",
//       label: "Tasks",
//       icon: <PencilSquareIcon className="h-7 w-7" />,
//       key: "tasks",
//       show: true,
//       nestedListItems: [
//         {
//           url: "/addtask",
//           label: "Add Task",
//           icon: <PlusCircleIcon className="h-7 w-7" />,
//           key: "addTask",
//           show: true,
//         },
//         {
//           url: "/tasklist",
//           label: "Task List",
//           icon: <DocumentArrowUpIcon className="h-7 w-7" />,
//           key: "tasklist",
//           show: true,
//         },
//       ],
//     },
//     {
//       url: "/reports",
//       label: "Reports",
//       icon: <ChartBarIcon className="h-7 w-7" />,
//       key: "reports",
//       show: true,
//       nestedListItems: [
//         {
//           url: "/teamtimelog",
//           label: "Team Time Log",
//           icon: <PlusCircleIcon className="h-7 w-7" />,
//           key: "teamtimelog",
//           show: true,
//         },
//         {
//           url: "/reports",
//           label: "All Reports",
//           icon: <DocumentArrowUpIcon className="h-7 w-7" />,
//           key: "allreports",
//           show: true,
//         },
//       ],
//     },
//     {
//       url: "/approvals",
//       label: "Approvals",
//       icon: <CheckBadgeIcon className="h-7 w-7" />,
//       key: "approvals",
//       count: approvalsCount,
//       show: data.user_info.division === "Escorts Agri Machinery" ? true : false,
//     },
//     {
//       url: "/inbox",
//       label: "Inbox",
//       icon: <CheckBadgeIcon className="h-7 w-7" />,
//       key: "inbox",
//       count: inboxCount,
//       show: data.user_info.division === "Corporate" ? true : false,
//     },
//     {
//       url: "/timelog",
//       label: "Time Log",
//       icon: <CalendarDateRangeIcon className=" h-7 w-7" />,
//       key: "timelog",
//       show: true,
//     },
//   ];
//   return (
//     // <div className="h-[calc(100vh-2rem)] w-100 max-w-[20rem] p-2 shadow-xl shadow-blue-gray-900/5 w-56 border-2">
//     <div className="h-full fixed flex flex-col bg-teal-theme bg-opacity-50 w-[200px] z-10">
//       <div className=" p-5 w-44">
//         <img src={`${IMAGE_PUBLIC_URL}/newlogo`} />
//       </div>
//       <List key={sidebarMenuList.key} className="mt-4">
//         {sidebarMenuList.map((listItem, index) => {
//           // console.log(listItem.show)
//           if (listItem.nestedListItems) {
//             const isProjectMenu = listItem.key === "projects";
//             const isReportsMenu = listItem.key === "reports";
//             const isTasksMenu = listItem.key === "tasks";
//             return (
//               listItem.show && (
//                 <ListItem key={listItem.key} className="p-2">
//                   <ListItemPrefix className="">{listItem.icon}</ListItemPrefix>
//                   <div>
//                     <Menu
//                       placement="right-start"
//                       open={
//                         isProjectMenu
//                           ? openProject
//                           : isReportsMenu
//                           ? openReports
//                           : openTask
//                       }
//                       handler={
//                         isProjectMenu
//                           ? setOpenProject
//                           : isReportsMenu
//                           ? setOpenReports
//                           : setOpenTask
//                       }
//                       allowHover
//                       offset={15}
//                     >
//                       <MenuHandler className="flex items-center -ml-1">
//                         <MenuItem>
//                           <div className="font-bold text-xl">
//                             {listItem.label}
//                           </div>
//                           <ChevronUpIcon
//                             strokeWidth={2.5}
//                             className={`h-5 w-5 mt-1 ml-4 transition-transform ${
//                               (
//                                 isProjectMenu
//                                   ? openProject
//                                   : isReportsMenu
//                                   ? openReports
//                                   : openTask
//                               )
//                                 ? "rotate-90"
//                                 : ""
//                             }`}
//                           />
//                         </MenuItem>
//                       </MenuHandler>
//                       <MenuList className="bg-teal-theme p-2 z-20">
//                         {listItem.nestedListItems.map(
//                           ({ url, label, key }, index) => {
//                             return (
//                               <>
//                                 <ListItem key={key} className="p-1">
//                                   <ListItemPrefix>
//                                     {listItem.nestedListItems[index].icon}
//                                   </ListItemPrefix>
//                                   <nav className="p-2 font-semibold text-xl">
//                                     <NavLink to={url}>{label}</NavLink>
//                                   </nav>
//                                 </ListItem>
//                               </>
//                             );
//                           }
//                         )}
//                       </MenuList>
//                     </Menu>
//                   </div>
//                 </ListItem>
//               )
//             );
//           } else {
//             return (
//               listItem.show && (
//                 <ListItem key={listItem.key} className="p-2">
//                   <ListItemPrefix className="pr-2 ">
//                     {/* {listItem.key === "approvals" ? (
//                     <div className="font-bold text-3xl">{listItem.count}</div>
//                   ) : (
//                     <>{listItem.icon}</>
//                   )} */}
//                     {listItem.icon}
//                   </ListItemPrefix>
//                   <nav
//                     className={`${
//                       listItem.key === "approvals" ? "flex-col" : ""
//                     } font-bold text-xl`}
//                   >
//                     <NavLink to={listItem.url}>
//                       {listItem.label}
//                       {/* {listItem.key === "approvals" ? (
//                       <div className="text-center">({listItem.count})</div>
//                     ) : (
//                       <></>
//                     )} */}
//                     </NavLink>
//                   </nav>
//                 </ListItem>
//               )
//             );
//           }
//         })}
//       </List>
//     </div>
//   );
// });

// export default Sidebar;

// // import React from 'react'

// // function Sidebar() {
// //   return (
// //     <div>

// //     </div>
// //   )
// // }

// // export default Sidebar


import {
  Card,
  list,
  List,
  ListItem,
  ListItemPrefix,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  ChartBarIcon,
  PencilSquareIcon,
  QueueListIcon,
  PlusCircleIcon,
  DocumentArrowUpIcon,
  ListBulletIcon,
  ArchiveBoxArrowDownIcon,
  CheckBadgeIcon,
  CalendarDateRangeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { keepPreviousData } from "@tanstack/react-query";
import { memo } from "react";
import React from "react";
import axios from "axios";
import { IMAGE_PUBLIC_URL } from "@/URL";
import { useAuth } from "@/AuthProvider";
import { Send } from "lucide-react";

const Sidebar = memo(() => {
  const [approvalsList, setApprovalsList] = useState([]);
  const [openProject, setOpenProject] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [approvalsCount, setApprovalsCount] = useState(approvalsList.length);
  const [inboxCount, setInboxCount] = useState();

  const { data } = useAuth();
  const location = useLocation();

  // Load saved collapse state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      const collapsed = JSON.parse(savedState);
      setIsCollapsed(collapsed);
      // Emit initial state
      window.dispatchEvent(new CustomEvent('sidebarToggle', { 
        detail: { isCollapsed: collapsed } 
      }));
    }
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
      window.dispatchEvent(new CustomEvent('mobileSidebarToggle', { 
        detail: { isMobileOpen: false } 
      }));
    }
  }, [location.pathname]);

  const sidebarMenuList = [
    {
      url: "/dashboard",
      label: "Dashboard",
      icon: <QueueListIcon className="h-5 w-5" />,
      key: "dashboard",
      show: true,
    },
    {
      label: "Projects",
      icon: <FolderIcon className="h-5 w-5" />,
      key: "projects",
      show: true,
      nestedListItems: [
        {
          url: "projects/createproject",
          label: "Create Project",
          icon: <PlusCircleIcon className="h-4 w-4" />,
          key: "createProject",
          show: true,
        },
        {
          url: "projects/importproject",
          label: "Import Project",
          icon: <DocumentArrowUpIcon className="h-4 w-4" />,
          key: "importProject",
          show: true,
        },
        {
          url: "projects/drafts",
          label: "Drafts",
          icon: <ArchiveBoxArrowDownIcon className="h-4 w-4" />,
          key: "drafts",
          show: true,
        },
        {
          url: "projects/projectlist",
          label: "Project List",
          icon: <ListBulletIcon className="h-4 w-4" />,
          key: "projectList",
          show: true,
        },
      ],
    },
    {
      url: "/tasks",
      label: "Tasks",
      icon: <PencilSquareIcon className="h-5 w-5" />,
      key: "tasks",
      show: true,
      nestedListItems: [
        {
          url: "/addtask",
          label: "Add Task",
          icon: <PlusCircleIcon className="h-4 w-4" />,
          key: "addTask",
          show: true,
        },
        {
          url: "/tasklist",
          label: "Task List",
          icon: <DocumentArrowUpIcon className="h-4 w-4" />,
          key: "tasklist",
          show: true,
        },
      ],
    },
    {
      url: "/reports",
      label: "Reports",
      icon: <ChartBarIcon className="h-5 w-5" />,
      key: "reports",
      show: true,
      nestedListItems: [
        {
          url: "/teamtimelog",
          label: "Team Time Log",
          icon: <PlusCircleIcon className="h-4 w-4" />,
          key: "teamtimelog",
          show: true,
        },
        {
          url: "/reports",
          label: "All Reports",
          icon: <DocumentArrowUpIcon className="h-4 w-4" />,
          key: "allreports",
          show: true,
        },
      ],
    },
    {
      url: "/approvals",
      label: "Approvals",
      icon: <CheckBadgeIcon className="h-5 w-5" />,
      key: "approvals",
      count: approvalsCount,
      show: data.user_info.division === "Escorts Agri Machinery" ? true : false,
    },
    {
      url: "/inbox",
      label: "Inbox",
      icon: <CheckBadgeIcon className="h-5 w-5" />,
      key: "inbox",
      count: inboxCount,
      show: data.user_info.division === "Corporate" ? true : false,
    },
    {
      url: "/timelog",
      label: "Time Log",
      icon: <CalendarDateRangeIcon className="h-5 w-5" />,
      key: "timelog",
      show: true,
    },
    // {
    //   url:"/connect",
    //   label:"Connect",
    //   icon:<Send className="h-5 w-5"/>,
    //   key:"connect",
    //   show:true
    // }
  ];

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    
    // Save to localStorage
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsedState));
    
    // Emit event for BaseLayout to listen
    window.dispatchEvent(new CustomEvent('sidebarToggle', { 
      detail: { isCollapsed: newCollapsedState } 
    }));
    
    // Close all menus when collapsing
    if (!newCollapsedState) {
      setOpenProject(false);
      setOpenReports(false);
      setOpenTask(false);
    }
  };

  const toggleMobile = () => {
    const newMobileState = !isMobileOpen;
    setIsMobileOpen(newMobileState);
    
    // Emit event for BaseLayout to listen
    window.dispatchEvent(new CustomEvent('mobileSidebarToggle', { 
      detail: { isMobileOpen: newMobileState } 
    }));
  };

  // Check if current path is active
  const isActive = (url) => {
    return location.pathname === url;
  };

  // Check if any nested item is active
  const isNestedActive = (nestedItems) => {
    return nestedItems?.some(item => location.pathname === item.url);
  };

  const renderMenuItem = (listItem, isNested = false) => {
    const hasCount = listItem.count !== undefined && listItem.count > 0;
    const itemIsActive = isActive(listItem.url) || isNestedActive(listItem.nestedListItems);
    
    return (
      <div
        className={`
          group relative flex items-center rounded-lg transition-all duration-200 mb-1
          ${itemIsActive 
            ? 'bg-teal-600 text-white shadow-md' 
            : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
          }
          ${isNested ? 'ml-4 py-2 px-3' : 'py-3 px-4'}
          ${isCollapsed && !isNested ? 'justify-center px-2' : ''}
        `}
      >
        <div className={`flex items-center ${isCollapsed && !isNested ? 'justify-center' : ''}`}>
          <div className={`flex-shrink-0 ${itemIsActive ? 'text-white' : 'text-gray-500'}`}>
            {listItem.icon}
          </div>
          
          {(!isCollapsed || isNested) && (
            <>
              <span className={`ml-3 font-medium text-sm ${isNested ? 'text-xs' : ''}`}>
                {listItem.label}
              </span>
              
              {hasCount && (
                <span className={`
                  ml-auto px-2 py-1 text-xs rounded-full font-semibold
                  ${itemIsActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-teal-100 text-teal-800'
                  }
                `}>
                  {listItem.count}
                </span>
              )}
            </>
          )}
        </div>

        {/* Tooltip for collapsed state */}
        {/* {isCollapsed && !isNested && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {listItem.label}
            {hasCount && ` (${listItem.count})`}
          </div>
        )} */}
      </div>
    );
  };

  const renderNestedMenu = (listItem) => {
    const isProjectMenu = listItem.key === "projects";
    const isReportsMenu = listItem.key === "reports";
    const isTasksMenu = listItem.key === "tasks";
    const isOpen = isProjectMenu ? openProject : isReportsMenu ? openReports : openTask;
    const setOpen = isProjectMenu ? setOpenProject : isReportsMenu ? setOpenReports : setOpenTask;
    const itemIsActive = isNestedActive(listItem.nestedListItems);

    if (isCollapsed) {
      // Hover menu for collapsed state
      return (
        <Menu placement="right-start" allowHover offset={15}>
          <MenuHandler>
            <div className="cursor-pointer">
              {renderMenuItem(listItem)}
            </div>
          </MenuHandler>
          <MenuList className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 min-w-[200px]">
            {listItem.nestedListItems.map((nestedItem) => (
              nestedItem.show && (
                <NavLink key={nestedItem.key} to={nestedItem.url}>
                  <MenuItem className="flex items-center p-3 rounded-lg hover:bg-teal-50">
                    <div className="text-gray-500 mr-3">
                      {nestedItem.icon}
                    </div>
                    <span className="font-medium text-sm">{nestedItem.label}</span>
                  </MenuItem>
                </NavLink>
              )
            ))}
          </MenuList>
        </Menu>
      );
    }

    // Expanded accordion menu
    return (
      <div className="mb-1">
        <div
          onClick={() => setOpen(!isOpen)}
          className={`
            cursor-pointer flex items-center justify-between rounded-lg transition-all duration-200 py-3 px-4
            ${itemIsActive 
              ? 'bg-teal-600 text-white shadow-md' 
              : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
            }
          `}
        >
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${itemIsActive ? 'text-white' : 'text-gray-500'}`}>
              {listItem.icon}
            </div>
            <span className="ml-3 font-medium text-sm">{listItem.label}</span>
          </div>
          <ChevronRightIcon 
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
          />
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="py-1">
            {listItem.nestedListItems.map((nestedItem) => (
              nestedItem.show && (
                <NavLink key={nestedItem.key} to={nestedItem.url}>
                  {renderMenuItem(nestedItem, true)}
                </NavLink>
              )
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => toggleMobile()}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-52'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b border-gray-200 ${isCollapsed ? 'px-2' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center">
              <img 
                src={`${IMAGE_PUBLIC_URL}/newlogo`} 
                alt="Logo" 
                className="h-8 w-auto"
              />
            </div>
          )}
          
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRightIcon className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarMenuList.map((listItem) => {
            if (!listItem.show) return null;

            if (listItem.nestedListItems) {
              return (
                <div key={listItem.key}>
                  {renderNestedMenu(listItem)}
                </div>
              );
            } else {
              return (
                <NavLink key={listItem.key} to={listItem.url}>
                  {renderMenuItem(listItem)}
                </NavLink>
              );
            }
          })}
        </nav>

        {/* Collapse indicator for mobile */}
        {!isCollapsed && (
          <div className="lg:hidden p-4 border-t border-gray-200">
            <button
              onClick={() => toggleMobile()}
              className="w-full text-left text-sm text-gray-500 hover:text-gray-700"
            >
              Close Menu
            </button>
          </div>
        )}
      </div>
    </>
  );
});

export default Sidebar;
