import ConstantList from "./appConfig";
import { authRoles } from "./auth/authRoles";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    isVisible: true,
    role: authRoles.guest,
    path: ConstantList.ROOT_PATH + "home/Home",
    icon: "home",
  }
  ,
  {
    name: "Dashboard.manage",
    isVisible: true,
    icon: "person",
    role: authRoles.user,
    children: [
      {
        name: "manage.add_eployee",
        role: authRoles.user,
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/staff",
      },
      {
        name: "manage.employee",
        role: authRoles.user,
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/managerStaff",
      },
    ]
  },
  {
    name: "Dashboard.leader",
    isVisible: true,
    icon: "receipt",
    role: authRoles.manage,
    children: [
      {
        name: "leader.approval",
        role: authRoles.manage,
        isVisible: true,
        path: ConstantList.ROOT_PATH + "leader/LeadershipApproval",
      },
      {
        name: "leader.approved",
        role: authRoles.manage,
        isVisible: true,
        path: ConstantList.ROOT_PATH + "leader/leadershipApproved",
      },
    ]
  },

];
