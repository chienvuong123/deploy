import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Grid,
    Button,
    Icon,
    IconButton,
    Tab,
    Tabs,
} from '@material-ui/core'
import ManagerStaffinformation from './ManagerStaffinformation'
import TabSalaryIncrease from './Tabs/TabSalaryIncrease'
import TabProposal from './Tabs/TabProposal'
import TabPromotion from './Tabs/TabPromotion'
import FormEndStaff from '../CustomForms/FormEndStaff'
import RegisterStaffDialog from '../RegisterStaff/RegisterStaffDialog'
import { useDispatch } from 'react-redux'
import { getByEmployee } from 'app/redux/actions/CertificateActions'
import { getByEmployeeFamily } from 'app/redux/actions/FamilyActions'
import { setItemPage } from 'app/redux/actions/StaffAction'
const ManagerStaffDialog = (props) => {
    const { t, handleCloseDialogManagerStaff, item } = props
    const [value, setValue] = useState('1')
    const [shouldOpenDialogEndStaff, setShouldOpenDialogEndStaff] = useState(false)
    const [shouldOpenDialogInformation, setShouldOpenDialogInformation] = useState(false)
    const dispatch = useDispatch()

    const handleOpenDialog = () => {
        setShouldOpenDialogEndStaff(true)
    }
    const handleCloseDialog = () => {
        setShouldOpenDialogEndStaff(false)
    }
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
    const handleOpenDialogInformation = () => {
        setShouldOpenDialogInformation(true)
        dispatch(getByEmployee({ employeeId: item?.id }))
        dispatch(getByEmployeeFamily({ employeeId: item?.id }))
        dispatch(setItemPage(item))
    }
    return (
        <div>
            <Dialog open={true} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle id="draggable-dialog-title">
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <h3>Cập nhập nhân viên</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleCloseDialogManagerStaff}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container lg={12} md={12}>
                        <Grid item lg={12} md={12}>
                            <ManagerStaffinformation item={item} />
                        </Grid>
                    </Grid>
                    <Grid container lg={12} md={12} className="mt-8">
                        <Grid item lg={5} md={5}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label="Tăng lương" value="1" />
                                <Tab label="Đề xuất" value="2" />
                                <Tab label="Thăng chức" value="3" />
                            </Tabs>
                        </Grid>
                        <Grid item lg={12} md={12}>
                            {value === '1' && <TabSalaryIncrease t={t} item={item} />}
                            {value === '2' && <TabProposal t={t} item={item} />}
                            {value === '3' && <TabPromotion t={t} item={item} />}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className="justify-center">
                    <Button variant="contained" color="primary" onClick={handleOpenDialogInformation}>
                        Xem hồ sơ
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        Kết thúc
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCloseDialogManagerStaff}>
                        Hủy
                    </Button>
                </DialogActions>
                <Grid item>
                    {shouldOpenDialogEndStaff && (
                        <FormEndStaff
                            t={t}
                            handleCloseDialog={handleCloseDialog}
                            open={shouldOpenDialogEndStaff}
                            isRegister={true}
                        />
                    )}
                    {shouldOpenDialogInformation && (
                        <RegisterStaffDialog
                            open={shouldOpenDialogInformation}
                            handleCloseRegister={() => setShouldOpenDialogInformation(false)}
                            t={t}
                            isOpenAction={true}
                            dataItemStaff={item}
                        />
                    )}
                </Grid>
            </Dialog>
        </div>
    )
}

export default ManagerStaffDialog
