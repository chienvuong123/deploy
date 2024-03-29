import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import StaffReducer from "./StaffReducer";
import CertificateReducer from "./CertificateReducer";
import FamilyReducer from "./FamilyReducer";
import ExperienceReducer from "./ExprienceReducer";
import SalaryIncreaseReducer from "./SalaryIncreaseReducer";
import ProposalReducer from "./ProposalReducer";
import ProcessReducer from "./ProcessReducer";




const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  staff: StaffReducer,
  certificate: CertificateReducer,
  family: FamilyReducer,
  exprience: ExperienceReducer,
  salary: SalaryIncreaseReducer,
  proposal: ProposalReducer,
  process: ProcessReducer

});

export default RootReducer;
