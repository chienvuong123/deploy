import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Leadership = EgretLoadable({
    loader: () => import("./LeadershipApproved")
});
const ViewComponent = withTranslation()(Leadership);

const LeadershipeApprovedRoutes = [
    {
        path: ConstantList.ROOT_PATH + "leader/leadershipApproved",
        exact: true,
        component: ViewComponent
    }
];

export default LeadershipeApprovedRoutes;
