import { all } from "redux-saga/effects"
import StaffSaga from "./StaffSaga"
import CertificateSaga from "./CertificateSaga"
import FamilySaga from "./FamilySaga"
import ExprienceSaga from "./ExprienceSaga"
import SalaryIncreaseSaga from "./SalaryIncreaseSaga"
import ProposalSaga from "./ProposalSaga"
import ProcessSaga from "./ProcessSaga"

export function* rootSaga() {
    yield all([
        StaffSaga(),
        CertificateSaga(),
        FamilySaga(),
        ExprienceSaga(),
        SalaryIncreaseSaga(),
        ProposalSaga(),
        ProcessSaga()
    ])
}