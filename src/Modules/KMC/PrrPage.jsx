// import PrrForm from "@/Components/PrrForm";
// import { FILTER_DASHBOARD_DATA_URL, GET_PRR_DATA } from "@/URL";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function PrrPage({ showPrr = false }) {
//   const [prrDate, setPrrDate] = useState();
//   const [prrNumber, setPrrNumber] = useState("");
//   const [selectedDate, setSelectedDate] = useState();
//   const [prrDetails, setPrrDetails] = useState();
//   const [prrList, setPrrList] = useState([]);

//   const location = useLocation();
//   const { rowData } = location.state || {};

//   const [projectData, setProjectData] = useState([]);

//   useEffect(() => {
//     if (!prrDate) {
//       if (showPrr) {
//         getPrrData();
//       }
//       getProjectData();
//     }
//   }, [prrDate]);

//   const getPrrData = async () => {
//     try {
//       const prrDataResponse = await axios.get(`${GET_PRR_DATA}/${rowData.id}`);
//       // console.log(prrDataResponse.data);
//       const prrData = prrDataResponse.data;
//       setPrrDetails(prrData.prr_details);
//       setPrrList(() => [...prrData.prr_list]);
//       setPrrDate(prrData.prr_details.prr_date);
//       // if(prrDataResponse.status==="200"){

//       // }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getProjectData = async () => {
//     try {
//       const projectListResponse = await axios.get(FILTER_DASHBOARD_DATA_URL, {
//         params: {
//           project_template: "All Projects",
//         },
//       });
//       const list = projectListResponse.data.projectlist;
//       // console.log("list : ", list);
//       // console.log(typeof list.projectlist);
//       setProjectData(list);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // console.log(projectData)

//   return (
//     <div>
//       <div className="flex flex-row flex-wrap m-5">
//         <div className="grid grid-cols-2 w-[100%] m-2">
//           <div className="flex flex-wrap m-2">
//             <label htmlFor="prrDate" className="w-2/3">
//               PRR Date:
//             </label>
//             <input
//               name="prrDate"
//               className="rounded-xl w-4/5"
//               onChange={(e) => setSelectedDate(e.target.value)}
//               type="date"
//               required
//               value={prrDetails?.prr_date}
//             />
//           </div>
//           {showPrr ? (
//             <div className="flex flex-wrap m-2">
//               <label htmlFor="prrNum" className="w-2/3">
//                 PRR Number:
//               </label>
//               <input name="prrNum" className="rounded-xl w-4/5" value={prrDetails?.prr_number} />
//             </div>
//           ) : (
//             <></>
//           )}
//         </div>
//         <div>
//           <PrrForm
//             projectList={projectData}
//             selectedDate={showPrr ? prrDate : selectedDate}
//             showPrr={showPrr}
//             prrInfo={{
//               prr_details: prrDetails,
//               prr_list: prrList,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PrrPage;


import PrrForm from "@/Components/PrrForm";
import { FILTER_DASHBOARD_DATA_URL, GET_PRR_DATA } from "@/URL";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function PrrPage({ showPrr = false }) {
  const [prrDate, setPrrDate] = useState();
  const [prrNumber, setPrrNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [prrDetails, setPrrDetails] = useState();
  const [prrList, setPrrList] = useState([]);

  const location = useLocation();
  const { rowData } = location.state || {};

  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    if (!prrDate) {
      if (showPrr) {
        getPrrData();
      }
      getProjectData();
    }
  }, [prrDate]);

  const getPrrData = async () => {
    try {
      const prrDataResponse = await axios.get(`${GET_PRR_DATA}/${rowData.id}`);
      const prrData = prrDataResponse.data;
      setPrrDetails(prrData.prr_details);
      setPrrList(() => [...prrData.prr_list]);
      setPrrDate(prrData.prr_details.prr_date);
    } catch (err) {
      console.error(err);
    }
  };

  const getProjectData = async () => {
    try {
      const projectListResponse = await axios.get(FILTER_DASHBOARD_DATA_URL, {
        params: {
          project_template: "All Projects",
        },
      });
      const list = projectListResponse.data.projectlist;
      setProjectData(list);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {showPrr ? "PRR Details" : "Create New PRR"}
              </h1>
              <p className="text-gray-600 mt-1">
                {/* {showPrr ? "Review and manage your PRR information" : "Fill in the details to generate a new Project Review Report"} */}
              </p>
            </div>
          </div>

          {/* Date and Number Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="prrDate" className="block text-sm font-semibold text-gray-700">
                PRR Date
              </label>
              <div className="relative">
                <input
                  name="prrDate"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  type="date"
                  required
                  value={prrDetails?.prr_date}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {showPrr && (
              <div className="space-y-2">
                <label htmlFor="prrNum" className="block text-sm font-semibold text-gray-700">
                  PRR Number
                </label>
                <input 
                  name="prrNum" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={prrDetails?.prr_number} 
                  readOnly
                />
              </div>
            )}
          </div>
        </div>

        {/* PRR Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <PrrForm
            projectList={projectData}
            selectedDate={showPrr ? prrDate : selectedDate}
            showPrr={showPrr}
            prrInfo={{
              prr_details: prrDetails,
              prr_list: prrList,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PrrPage;