// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ApprovalListItem from "@/Components/ApprovalListItem";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
// import ApprovalTabItem from "@/Components/ApprovalTabItem";
// import { GET_APPROVALS_LIST } from "@/URL";
// import { useAuth } from "@/AuthProvider";
// import { TabList } from "@headlessui/react";

// function ApprovalsPage() {
//   const [activeTab, setActiveTab] = useState("pending_approvals");
//   const [approvalsList, setApprovalsList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { data } = useAuth();
//   // console.log(data.user_info);
//   const user_ein = data.user_info.ein;

//   useEffect(() => {
//     const getApprovalsList = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${GET_APPROVALS_LIST}/${user_ein}`);
//         const list = response.data;
//         setApprovalsList(list);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getApprovalsList();
//   }, []);
//   const handleTabChange = (e) => {
//     setActiveTab(e);
//   };
//   return (
//     <div className="flex flex-col">
//       <Tabs
//         defaultValue="project_details"
//         className=""
//         onValueChange={handleTabChange}
//         value={activeTab}
//       >
//         <div className="flex justify-between m-4 ">
//           <TabsList className="bg-teal-theme bg-opacity-70 rounded-xl fixed">
//             <TabsTrigger
//               value="pending_approvals"
//               className="text-black m-4 font-semibold rounded-xl"
//             >
//               Pending
//             </TabsTrigger>
            

//             {data.user_info.division === "Escorts Agri Machinery" && (
//               <TabsTrigger
//                 value="all_prr"
//                 className="text-black m-4 font-semibold rounded-xl"
//               >
//                 PRR
//               </TabsTrigger>
//             )}
//             <TabsTrigger
//               value="approved_approvals"
//               className="text-black m-4 font-semibold rounded-xl"
//             >
//               Approved
//             </TabsTrigger>
//             <TabsTrigger
//               value="all_approvals"
//               className="text-black m-4 font-semibold rounded-xl"
//             >
//               All
//             </TabsTrigger>
//           </TabsList>
//         </div>
//         <TabsContent value="pending_approvals">
//           {isLoading ? (
//             <div></div>
//           ) : (
//             <ApprovalTabItem
//               activeTab={activeTab}
//               approvalsList={approvalsList}
//               setApprovalsList={setApprovalsList}
//             />
//           )}
//         </TabsContent>
//         <TabsContent value="approved_approvals">
//           <ApprovalTabItem
//             activeTab={activeTab}
//             approvalsList={approvalsList}
//             setApprovalsList={setApprovalsList}
//           />
//         </TabsContent>
//         <TabsContent value="all_prr">
//           <ApprovalTabItem
//             showPrr={true}
//             activeTab={activeTab}
//             approvalsList={approvalsList}
//             setApprovalsList={setApprovalsList}
//           />
//         </TabsContent>
//         <TabsContent value="all_approvals">
//           <ApprovalTabItem
//             activeTab={activeTab}
//             approvalsList={approvalsList}
//             setApprovalsList={setApprovalsList}
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default ApprovalsPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import ApprovalListItem from "@/Components/ApprovalListItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import ApprovalTabItem from "@/Components/ApprovalTabItem";
import { GET_APPROVALS_LIST } from "@/URL";
import { useAuth } from "@/AuthProvider";
import { Badge } from "@/Components/ui/badge";
import { Loader2 } from "lucide-react";

function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState("pending_approvals");
  const [approvalsList, setApprovalsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useAuth();
  const user_ein = data.user_info.ein;

  // Calculate counts for badges
  const pendingCount = approvalsList.filter(a => a.approval_status === "pending" && !a.is_prr).length;
  const approvedCount = approvalsList.filter(a => a.approval_status === "approved").length;
  const prrCount = approvalsList.filter(a => a.is_prr && a.approval_status === "pending").length;

  useEffect(() => {
    const getApprovalsList = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${GET_APPROVALS_LIST}/${user_ein}`);
        const list = response.data;
        setApprovalsList(list);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getApprovalsList();
  }, [user_ein]);

  const handleTabChange = (e) => {
    setActiveTab(e);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading approvals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Approvals Dashboard</h1>
          {/* <p className="text-gray-600">Manage and track your approval requests</p> */}
        </div>

        <Tabs
          defaultValue="pending_approvals"
          onValueChange={handleTabChange}
          value={activeTab}
          className="w-full"
        >
          {/* Modern Tab Navigation */}
          <div className="mb-6">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-white/50 backdrop-blur-sm p-2 rounded-xl border shadow-sm h-auto">
              <TabsTrigger
                value="pending_approvals"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50"
              >
                <span>Pending</span>
                {pendingCount > 0 && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                    {pendingCount}
                  </Badge>
                )}
              </TabsTrigger>

              {data.user_info.division === "Escorts Agri Machinery" && (
                <TabsTrigger
                  value="all_prr"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50"
                >
                  <span>PRR</span>
                  {prrCount > 0 && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                      {prrCount}
                    </Badge>
                  )}
                </TabsTrigger>
              )}

              <TabsTrigger
                value="approved_approvals"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50"
              >
                <span>Approved</span>
                {approvedCount > 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                    {approvedCount}
                  </Badge>
                )}
              </TabsTrigger>

              <TabsTrigger
                value="all_approvals"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50"
              >
                <span>All</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                  {approvalsList.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <TabsContent value="pending_approvals" className="m-0">
              <ApprovalTabItem
                activeTab={activeTab}
                approvalsList={approvalsList}
                setApprovalsList={setApprovalsList}
              />
            </TabsContent>

            <TabsContent value="approved_approvals" className="m-0">
              <ApprovalTabItem
                activeTab={activeTab}
                approvalsList={approvalsList}
                setApprovalsList={setApprovalsList}
              />
            </TabsContent>

            <TabsContent value="all_prr" className="m-0">
              <ApprovalTabItem
                showPrr={true}
                activeTab={activeTab}
                approvalsList={approvalsList}
                setApprovalsList={setApprovalsList}
              />
            </TabsContent>

            <TabsContent value="all_approvals" className="m-0">
              <ApprovalTabItem
                activeTab={activeTab}
                approvalsList={approvalsList}
                setApprovalsList={setApprovalsList}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default ApprovalsPage;