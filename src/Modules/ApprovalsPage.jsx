import React, { useState, useEffect } from "react";
import axios from "axios";
import ApprovalListItem from "@/Components/ApprovalListItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import ApprovalTabItem from "@/Components/ApprovalTabItem";
import { GET_APPROVALS_LIST } from "@/URL";
import { useAuth } from "@/AuthProvider";
import { TabList } from "@headlessui/react";

function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState("pending_approvals");
  const [approvalsList, setApprovalsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useAuth();
  // console.log(data.user_info);
  const user_ein = data.user_info.ein;

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
  }, []);
  const handleTabChange = (e) => {
    setActiveTab(e);
  };
  return (
    <div className="flex flex-col">
      <Tabs
        defaultValue="project_details"
        className=""
        onValueChange={handleTabChange}
        value={activeTab}
      >
        <div className="flex justify-between m-4 ">
          <TabsList className="bg-teal-theme bg-opacity-70 rounded-xl fixed">
            <TabsTrigger
              value="pending_approvals"
              className="text-black m-4 font-semibold rounded-xl"
            >
              Pending
            </TabsTrigger>
            

            {data.user_info.division === "Escorts Agri Machinery" && (
              <TabsTrigger
                value="all_prr"
                className="text-black m-4 font-semibold rounded-xl"
              >
                PRR
              </TabsTrigger>
            )}
            <TabsTrigger
              value="approved_approvals"
              className="text-black m-4 font-semibold rounded-xl"
            >
              Approved
            </TabsTrigger>
            <TabsTrigger
              value="all_approvals"
              className="text-black m-4 font-semibold rounded-xl"
            >
              All
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pending_approvals">
          {isLoading ? (
            <div></div>
          ) : (
            <ApprovalTabItem
              activeTab={activeTab}
              approvalsList={approvalsList}
              setApprovalsList={setApprovalsList}
            />
          )}
        </TabsContent>
        <TabsContent value="approved_approvals">
          <ApprovalTabItem
            activeTab={activeTab}
            approvalsList={approvalsList}
            setApprovalsList={setApprovalsList}
          />
        </TabsContent>
        <TabsContent value="all_prr">
          <ApprovalTabItem
            showPrr={true}
            activeTab={activeTab}
            approvalsList={approvalsList}
            setApprovalsList={setApprovalsList}
          />
        </TabsContent>
        <TabsContent value="all_approvals">
          <ApprovalTabItem
            activeTab={activeTab}
            approvalsList={approvalsList}
            setApprovalsList={setApprovalsList}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ApprovalsPage;
