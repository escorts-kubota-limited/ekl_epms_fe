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
      // console.log(prrDataResponse.data);
      const prrData = prrDataResponse.data;
      setPrrDetails(prrData.prr_details);
      setPrrList(() => [...prrData.prr_list]);
      setPrrDate(prrData.prr_details.prr_date);
      // if(prrDataResponse.status==="200"){

      // }
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
      // console.log("list : ", list);
      // console.log(typeof list.projectlist);
      setProjectData(list);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(projectData)

  return (
    <div>
      <div className="flex flex-row flex-wrap m-5">
        <div className="grid grid-cols-2 w-[100%] m-2">
          <div className="flex flex-wrap m-2">
            <label htmlFor="prrDate" className="w-2/3">
              PRR Date:
            </label>
            <input
              name="prrDate"
              className="rounded-xl w-4/5"
              onChange={(e) => setSelectedDate(e.target.value)}
              type="date"
              required
              value={prrDetails?.prr_date}
            />
          </div>
          {showPrr ? (
            <div className="flex flex-wrap m-2">
              <label htmlFor="prrNum" className="w-2/3">
                PRR Number:
              </label>
              <input name="prrNum" className="rounded-xl w-4/5" value={prrDetails?.prr_number} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
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
