// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import Breadcrumbs from "../Components/Breadcrumbs";
// // AuthProvider from "@/AuthProvider";

// const BaseLayout = () => {
//   return (
//     <>
//       {/* <AuthProvider> */}
//       <div className="h-screen grid grid-cols-[200px_auto]">
//         <div className="col-start-1 col-end-2 row-start-1 row-end-3 h-full">
//           <Sidebar />
//         </div>
//         <div className="flex flex-col row-span-[64]">
//           <div className="fixed top-0 z-10">
//             <Navbar />
//           </div>
//           <div className="mt-16 fixed z-10 top-0 w-full bg-white">
//             <Breadcrumbs />
//           </div>
//           <div className="mt-20 ">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//       {/* </AuthProvider> */}
//     </>
//   );
// };

// export default BaseLayout;


import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Breadcrumbs from "../Components/Breadcrumbs";

const BaseLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Listen for sidebar state changes
  // You can implement this through custom events, context, or props
  useEffect(() => {
    const handleSidebarToggle = (event) => {
      setIsCollapsed(event.detail.isCollapsed);
    };

    const handleMobileToggle = (event) => {
      setIsMobileOpen(event.detail.isMobileOpen);
    };

    // Listen for custom events from sidebar
    window.addEventListener('sidebarToggle', handleSidebarToggle);
    window.addEventListener('mobileSidebarToggle', handleMobileToggle);

    // Optional: Load saved state
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsCollapsed(JSON.parse(savedState));
    }

    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle);
      window.removeEventListener('mobileSidebarToggle', handleMobileToggle);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Mobile Overlay - handled by sidebar but we can add backdrop here if needed */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`
        transition-all duration-300 min-h-screen flex flex-col
        ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'} 
        ml-0
      `}>
        {/* Fixed Navbar */}
        <div className="fixed top-0 right-0 left-0 z-20 bg-white border-b border-gray-200 shadow-sm"
             style={{ 
               left: isCollapsed ? '64px' : '208px',
               transition: 'left 0.3s ease'
             }}>
          <div className="lg:hidden" style={{ left: 0 }}>
            {/* Mobile navbar spans full width */}
          </div>
          <Navbar />
        </div>

        {/* Fixed Breadcrumbs */}
        <div className="fixed top-16 right-0 left-0 z-10 bg-white border-b border-gray-100"
             style={{ 
               left: isCollapsed ? '64px' : '208px',
               transition: 'left 0.3s ease'
             }}>
          <div className="lg:hidden" style={{ left: 0 }}>
            {/* Mobile breadcrumbs span full width */}
          </div>
          <Breadcrumbs />
        </div>

        {/* Main Content */}
        <main className="flex-1 pt-20 p-4 overflow-auto ml" style={{
          marginLeft: isCollapsed?"":"-48px",
          transition: ' left 0.3s ease'
        }}>
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;