import React from 'react'
import { Redirect } from 'react-router-dom'
import HomeRoutes from './views/Home/HomeRoutes'
import sessionRoutes from './views/sessions/SessionRoutes'
import ConstantList from './appConfig'
import StaffRoutes from './views/AddStaff/StaffRoutes'
import LeadershipApprovalRoutes from './views/LeadershipApproval/LeadershipApprovalRoutes'
import LeadershipeApprovedRoutes from './views/LeadershipApproved/LeadershipApprovedRoutes'
import ManagerStaffRoutes from './views/ManagerStaff/ManagerStaffRoutes'

const redirectRoute = [
    {
        path: ConstantList.ROOT_PATH,
        exact: true,
        component: () => <Redirect to={ConstantList.ROOT_PATH + 'home/Home'} />, //Luôn trỏ về HomePage được khai báo trong appConfig
    },
]

const errorRoute = [
    // {
    //     component: () => <Redirect to={ConstantList.ROOT_PATH + 'session/404'} />,
    // },
]
const routes = [
    ...sessionRoutes,
    ...redirectRoute,
    ...StaffRoutes,
    ...LeadershipApprovalRoutes,
    ...HomeRoutes,
    ...errorRoute,
    ...LeadershipeApprovedRoutes,
    ...ManagerStaffRoutes,
]

export default routes
