// //testing
const PORT = "3000";
const BASE_TEST_URL = `http://localhost:${PORT}`; ///updateprojectdata

export const IMAGE_PUBLIC_URL = `${BASE_TEST_URL}/image`;
export const AUTH_URL = `${BASE_TEST_URL}/user/authenticate`;
export const ADD_PROJECT_URL = `${BASE_TEST_URL}/addproject`;
// export const ADD_PROJECT_URL = `http://192.168.22.108/addproject`;

export const TASK_URL = `${BASE_TEST_URL}/gettaskslist/`; // /minor; /major;
export const testUrl = `${BASE_TEST_URL}/samplepost`;
export const PROJECT_LIST_URL = `${BASE_TEST_URL}/projectlist`;
export const GET_PROJECT_DATA_URL = `${BASE_TEST_URL}/getprojectdata`;
// export const GET_PROJECT_DATA_URL = `http://192.168.22.92:3000/getprojectdata`;

export const UPDATE_PROJECT_DATA_URL = `${BASE_TEST_URL}/updateprojectdata`;
export const FILTER_DASHBOARD_DATA_URL = `${BASE_TEST_URL}/search`;
export const FILTER_TASKS_DASHBOARD_DATA_URL = `${BASE_TEST_URL}/searchtask`; //`http://192.168.22.117:3000/searchtask`//
export const ALL_TASKS_URL = `${BASE_TEST_URL}/alltasks`;
export const USER_LIST_URL = `${BASE_TEST_URL}/gettinguser`;
export const USER_LOGOUT_URL = `${BASE_TEST_URL}/user/logout`;
export const CHANGE_PASSWORD_URL = `${BASE_TEST_URL}/user/changePassword`;

export const GET_APPROVALS_LIST = `${BASE_TEST_URL}/approvalWindow`;
// export const GET_APPROVALS_LIST = `http://192.168.22.123:3000/approvalWindow`;

export const SEND_APPROVAL_REQUEST_URL = `${BASE_TEST_URL}/approval`;
// export const SEND_APPROVAL_REQUEST_URL=`http://192.168.22.123:3000/approval`

export const GET_MANAGER_REPORT = `${BASE_TEST_URL}/getmanagerreport`;
export const GET_RESPONSIBILITIES_LIST = `${BASE_TEST_URL}/getresponsibilitieslist`;
export const GET_PMO_NAME = `${BASE_TEST_URL}/getpmo`;

export const GET_APPROVAL_HISTORY = `${BASE_TEST_URL}/approvalhistory`; //:project_id`

export const GET_USER_TIMELOG = `${BASE_TEST_URL}/usertimelog`;
// export const GET_USER_TIMELOG=`http://192.168.22.92/usertimelog`

export const GET_TEAM_TIMELOG = `${BASE_TEST_URL}/teamtimelog`;
export const GET_TEAMLIST = `${BASE_TEST_URL}/teamlist`; //:user_id
export const POST_TIMELOG = `${BASE_TEST_URL}/addtimelog`;

export const GET_USER_PROJECT_LIST = `${BASE_TEST_URL}/getuserprojectlist`;

export const GET_TEAM_HIERARCHY = `${BASE_TEST_URL}/teamhierarchy`; //:userid

export const GET_REQUESTED_FROM = `${BASE_TEST_URL}/getrequestedfrom`;

export const ADD_PRR_URL = `${BASE_TEST_URL}/addprr`;
export const SEND_PRR_APPROVAL = `${BASE_TEST_URL}/prr_approval`;

export const GET_PRR_DATA = `${BASE_TEST_URL}/getprrdata`; //:id

export const GET_PRR_HISTORY = `${BASE_TEST_URL}/prrapprovalhistory`; //:id

export const ADD_DRAFT = `${BASE_TEST_URL}/adddraft`; //kmc
export const GET_DRAFT_LIST = `${BASE_TEST_URL}/getdrafts`; //
export const GET_DRAFT_DATA = `${BASE_TEST_URL}/getdraftdata`; //:draft_id

export const ADD_TO_INBOX = `${BASE_TEST_URL}/addtoinbox`; //gets automatically added to draft then gets added to inbox.

export const ADD_TASK_TO_DRAFT = `${BASE_TEST_URL}/addtasktodraft`;

export const DELETE_TASK_SUBTASK = `${BASE_TEST_URL}/deletetask`;

export const GET_ALL_INBOX = `${BASE_TEST_URL}/allinboxdata`;

export const POST_INBOX_ACTION = `${BASE_TEST_URL}/inboxaction`;

export const GET_INBOX_HISTORY = `${BASE_TEST_URL}/getinboxhistory`; ///:project_id`

export const GET_PROJECT_PRR = `${BASE_TEST_URL}/projectprrlist`//:project_code

// //Build URLS
// export const IMAGE_PUBLIC_URL = "http://epmsapi.escortskubota.com/image";
// export const BASE_URL = "http://epmsapi.escortskubota.com"; ///updateprojectdata
// export const PORT = "3000";
// export const AUTH_URL = "http://epmsapi.escortskubota.com/user/authenticate";
// export const ADD_PROJECT_URL = "http://epmsapi.escortskubota.com/addproject";
// // export const ADD_PROJECT_URL = "http://192.168.22.108/addproject";

// export const TASK_URL = "http://epmsapi.escortskubota.com/gettaskslist/"; // /minor; /major;
// export const testUrl = "http://epmsapi.escortskubota.com/samplepost";
// export const PROJECT_LIST_URL = "http://epmsapi.escortskubota.com/projectlist";
// export const GET_PROJECT_DATA_URL =
//   "http://epmsapi.escortskubota.com/getprojectdata";
// // export const GET_PROJECT_DATA_URL = "http://192.168.22.92:3000/getprojectdata";

// export const UPDATE_PROJECT_DATA_URL =
//   "http://epmsapi.escortskubota.com/updateprojectdata";
// export const FILTER_DASHBOARD_DATA_URL =
//   "http://epmsapi.escortskubota.com/search";
// export const FILTER_TASKS_DASHBOARD_DATA_URL =
//   "http://epmsapi.escortskubota.com/searchtask"; //"http://192.168.22.117:3000/searchtask"//
// export const ALL_TASKS_URL = "http://epmsapi.escortskubota.com/alltasks";
// export const USER_LIST_URL = "http://epmsapi.escortskubota.com/gettinguser";
// export const USER_LOGOUT_URL = "http://epmsapi.escortskubota.com/user/logout";
// export const CHANGE_PASSWORD_URL =
//   "http://epmsapi.escortskubota.com/user/changePassword";

// export const GET_APPROVALS_LIST =
//   "http://epmsapi.escortskubota.com/approvalWindow";
// // export const GET_APPROVALS_LIST = "http://192.168.22.123:3000/approvalWindow";

// export const SEND_APPROVAL_REQUEST_URL =
//   "http://epmsapi.escortskubota.com/approval";
// // export const SEND_APPROVAL_REQUEST_URL="http://192.168.22.123:3000/approval"

// export const GET_MANAGER_REPORT =
//   "http://epmsapi.escortskubota.com/getmanagerreport";
// export const GET_RESPONSIBILITIES_LIST =
//   "http://epmsapi.escortskubota.com/getresponsibilitieslist";
// export const GET_PMO_NAME = "http://epmsapi.escortskubota.com/getpmo";

// export const GET_APPROVAL_HISTORY =
//   "http://epmsapi.escortskubota.com/approvalhistory"; //:project_id"

// export const GET_USER_TIMELOG = "http://epmsapi.escortskubota.com/usertimelog";
// // export const GET_USER_TIMELOG="http://192.168.22.92/usertimelog"

// export const GET_TEAM_TIMELOG = "http://epmsapi.escortskubota.com/teamtimelog";
// export const GET_TEAMLIST = "http://epmsapi.escortskubota.com/teamlist"; //:user_id
// export const POST_TIMELOG = "http://epmsapi.escortskubota.com/addtimelog";

// export const GET_USER_PROJECT_LIST =
//   "http://epmsapi.escortskubota.com/getuserprojectlist";
// export const GET_TEAM_HIERARCHY =
//   "http://epmsapi.escortskubota.com/teamhierarchy"; //:userid

// export const GET_REQUESTED_FROM =
//   "http://epmsapi.escortskubota.com/getrequestedfrom";
// export const ADD_PRR_URL = "http://epmsapi.escortskubota.com/addprr";

// export const SEND_PRR_APPROVAL =
//   "http://epmsapi.escortskubota.com/prr_approval";
// export const GET_PRR_DATA = "http://epmsapi.escortskubota.com/getprrdata"; //:id
// export const GET_PRR_HISTORY="http://epmsapi.escortskubota.com/prrapprovalhistory"//:id
