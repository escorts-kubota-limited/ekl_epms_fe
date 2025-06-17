import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ProfileAvatar } from "../Components/ProfileAvatar";

const auditMenuItemsList = ["Home"];
const pmsMenuItemsList = ["Home", "Projects", "Reports"];
const MenuItems = () => {
  return (
    <div className="grid grid-cols-6 sm:p-5 sm:pl-10 sm:pt-8">
      {pmsMenuItemsList.map((item, index) => (
        <NavLink to={"/" + `${item.toLowerCase()}`} key={index}>
          {item}
        </NavLink>
      ))}
    </div>
  );
};
const Navbar = () => {
  return (
    <div className=" bg-teal-theme  grid grid-cols-12 h-16">
      <div className="col-span-1 p-5 w-48">
        {/* <img src="../../Assets/newlogo.png" /> */}
      </div>
      <nav className="col-span-9">{/* <MenuItems /> */}</nav>
      <div className="col-span-1"></div>
      <div className="col-span-1 order-12 relative inline-flex items-center justify-center">
        <ProfileAvatar />
      </div>
    </div>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { ProfileAvatar } from "../Components/ProfileAvatar";
// import {
//   MagnifyingGlassIcon,
//   BellIcon,
//   Cog6ToothIcon,
//   ChevronDownIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";

// const Navbar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const location = useLocation();

//   // Listen for sidebar state changes
//   useEffect(() => {
//     const handleSidebarToggle = (event) => {
//       setIsCollapsed(event.detail.isCollapsed);
//     };

//     window.addEventListener('sidebarToggle', handleSidebarToggle);

//     // Load initial state
//     const savedState = localStorage.getItem('sidebarCollapsed');
//     if (savedState) {
//       setIsCollapsed(JSON.parse(savedState));
//     }

//     return () => {
//       window.removeEventListener('sidebarToggle', handleSidebarToggle);
//     };
//   }, []);

//   // Get page title based on current route
//   const getPageTitle = () => {
//     const path = location.pathname;
//     if (path === '/dashboard') return 'Dashboard';
//     if (path.includes('/projects')) return 'Projects';
//     if (path.includes('/tasks')) return 'Tasks';
//     if (path.includes('/reports')) return 'Reports';
//     if (path.includes('/approvals')) return 'Approvals';
//     if (path.includes('/inbox')) return 'Inbox';
//     if (path.includes('/timelog')) return 'Time Log';
//     return 'Dashboard';
//   };

//   const handleMobileMenuToggle = () => {
//     // Trigger mobile sidebar toggle
//     window.dispatchEvent(new CustomEvent('mobileSidebarToggle', { 
//       detail: { isMobileOpen: true } 
//     }));
//   };

//   // Mock notifications data
//   const notifications = [
//     { id: 1, title: "New project assigned", time: "5 min ago", unread: true },
//     { id: 2, title: "Task deadline approaching", time: "1 hour ago", unread: true },
//     { id: 3, title: "Report generated", time: "2 hours ago", unread: false },
//   ];

//   const unreadCount = notifications.filter(n => n.unread).length;

//   return (
//     <nav className={`
//       fixed top-0 right-0 z-30 bg-white border-b border-gray-200 shadow-sm
//       transition-all duration-300 h-16
//       ${isCollapsed ? 'left-16' : 'left-64'} 
//       lg:${isCollapsed ? 'left-16' : 'left-64'}
//       left-0
//     `}>
//       <div className="flex items-center justify-between h-full px-6">
//         {/* Left Section - Mobile Menu + Page Title */}
//         <div className="flex items-center space-x-4">
//           {/* Mobile Menu Button */}
//           <button
//             onClick={handleMobileMenuToggle}
//             className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
//           >
//             <Bars3Icon className="h-6 w-6" />
//           </button>

//           {/* Page Title */}
//           <div className="flex items-center">
//             <h1 className="text-xl font-semibold text-gray-800">
//               {/* {getPageTitle()} */}
//             </h1>
//           </div>
//         </div>

//         {/* Center Section - Search (Hidden on mobile) */}
//         <div className="hidden md:flex flex-1 max-w-md mx-8">
//           {/* <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search projects, tasks..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
//             />
//           </div> */}
//         </div>

//         {/* Right Section - Actions & Profile */}
//         <div className="flex items-center space-x-4">
//           {/* Search Icon - Mobile only */}
//           <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
//             <MagnifyingGlassIcon className="h-5 w-5" />
//           </button>

//           {/* Notifications */}
//           {/* <div className="relative">
//             <button
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
//             >
//               <BellIcon className="h-5 w-5" />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
//                   {unreadCount}
//                 </span>
//               )}
//             </button> */}

//             {/* Notifications Dropdown */}
//             {/* {showNotifications && (
//               <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                 <div className="px-4 py-2 border-b border-gray-100">
//                   <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
//                 </div>
//                 <div className="max-h-64 overflow-y-auto">
//                   {notifications.map((notification) => (
//                     <div
//                       key={notification.id}
//                       className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${
//                         notification.unread ? 'border-teal-500 bg-teal-50/30' : 'border-transparent'
//                       }`}
//                     >
//                       <p className="text-sm text-gray-800 font-medium">{notification.title}</p>
//                       <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="px-4 py-2 border-t border-gray-100">
//                   <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
//                     View all notifications
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div> */}

//           {/* Settings */}
//           {/* <button className="hidden sm:flex p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
//             <Cog6ToothIcon className="h-5 w-5" />
//           </button> */}

//           {/* Profile Dropdown */}
//           <div className="relative">
//             {/* <button
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             > */}
//               <ProfileAvatar />
//               {/* <ChevronDownIcon className="hidden sm:block h-4 w-4 text-gray-500" /> */}
//             {/* </button> */}

//             {/* User Menu Dropdown */}
//             {/* {showUserMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                 <div className="px-4 py-2 border-b border-gray-100">
//                   <p className="text-sm font-semibold text-gray-800">John Doe</p>
//                   <p className="text-xs text-gray-500">john@company.com</p>
//                 </div>
//                 <NavLink
//                   to="/profile"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   Profile Settings
//                 </NavLink>
//                 <NavLink
//                   to="/preferences"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   Preferences
//                 </NavLink>
//                 <hr className="my-2" />
//                 <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
//                   Sign Out
//                 </button>
//               </div>
//             )} */}
//           </div>
//         </div>
//       </div>

//       {/* Click outside to close dropdowns */}
//       {(showNotifications || showUserMenu) && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => {
//             setShowNotifications(false);
//             setShowUserMenu(false);
//           }}
//         />
//       )}
//     </nav>
//   );
// };

// export default Navbar;
