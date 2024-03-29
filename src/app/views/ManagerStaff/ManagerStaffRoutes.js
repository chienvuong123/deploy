import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';
const ManagerStaff = EgretLoadable({
    loader: () => import("./ManagerStaff")
});
const ViewComponent = withTranslation()(ManagerStaff);

const ManagerStaffRoutes = [
    {
        path: ConstantList.ROOT_PATH + "staff_manager/managerStaff",
        exact: true,
        component: ViewComponent
    }
];

export default ManagerStaffRoutes;
