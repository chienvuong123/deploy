import React, { useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    IconButton,
    Icon,
    Grid,
    Tabs,
    Tab,
} from '@material-ui/core'
import TabInformation from './Tabs/TabInformation'
import { toast } from 'react-toastify'
import TabCertificate from './Tabs/TabCertificate'
import TabCV from './Tabs/TabCV'
import { useDispatch } from 'react-redux'
import { updateStaffAction } from 'app/redux/actions/StaffAction'
import LeadershiPprogram from './LeadershiPprogram'

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})

const RegisterStaffDialog = (props) => {
    const { t, handleCloseRegister, dataItemStaff, isOpenRegister, isOpenAction } = props
    console.log()
    const [value, setValue] = useState('1')
    const [dataStaff, setDataStaff] = useState(dataItemStaff || {})
    const [shouldOpenDialogLeadership, setShouldOpenDialogLeadership] = useState(false)

    const dispatch = useDispatch()

    const handleDialogLeadershipClose = () => {
        setShouldOpenDialogLeadership(false)
        handleCloseRegister()
    }
    const handleOpenDialogLeadership = () => {
        setShouldOpenDialogLeadership(true)
    }
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
    const handleSubmit = () => {
        dispatch(updateStaffAction(dataStaff))
    }
    return (
        <div className="m-sm-24">
            <Dialog open={true} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle id="draggable-dialog-title">
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <h3>Hồ sơ nhân viên</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleCloseRegister}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent className="overflow">
                    <Grid container spacing={1} md={12} lg={12}>
                        <Grid item md={2} lg={2}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                indicatorColor="primary"
                                textColor="primary"
                                orientation="vertical"
                                variant="scrollable"
                            >
                                <Tab label="Hồ sơ" value="1" />
                                <Tab label="Sơ yếu lí lịch" value="2" />
                                <Tab label="Thông tin văn bằng" value="3" />
                            </Tabs>
                        </Grid>
                        <Grid item md={10} lg={10} className="bg-gray">
                            {value === '1' && (
                                <TabCV
                                    t={t}
                                    setDataStaff={setDataStaff}
                                    dataStaff={dataStaff}
                                    dataItemStaff={dataItemStaff}
                                    isOpenAction={isOpenAction}
                                />
                            )}
                            {value === '2' && <TabInformation t={t} />}
                            {value === '3' && <TabCertificate t={t} />}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className="justify-center">
                    {isOpenRegister && (
                        <Button variant="contained" color="primary" onClick={handleOpenDialogLeadership}>
                            Trình lãnh đạo
                        </Button>
                    )}
                    {isOpenRegister && (
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Lưu
                        </Button>
                    )}
                    <Button variant="contained" color="secondary" onClick={handleCloseRegister}>
                        Hủy
                    </Button>
                </DialogActions>
                <Grid>
                    {shouldOpenDialogLeadership && (
                        <LeadershiPprogram
                            open={shouldOpenDialogLeadership}
                            handleDialogLeadershipClose={handleDialogLeadershipClose}
                            t={t}
                            dataItemStaff={dataItemStaff}
                        />
                    )}
                </Grid>
            </Dialog>
        </div>
    )
}

export default RegisterStaffDialog
