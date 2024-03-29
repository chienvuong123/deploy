import React, { useEffect, useRef, useState } from 'react'
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
import Information from './Information'
import Certificate from './Certificate'
import Family from './Family'
import { toast } from 'react-toastify'
import { staffItemSelector } from 'app/redux/selector/StaffSelector'
import { useDispatch, useSelector } from 'react-redux'
import { setItemPage, setStaffImage } from 'app/redux/actions/StaffAction'
import RegisterStaffDialog from '../RegisterStaff/RegisterStaffDialog'
import { getByEmployee } from 'app/redux/actions/CertificateActions'
import { getByEmployeeFamily } from 'app/redux/actions/FamilyActions'

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})

const AddStaffDialog = (props) => {
    const { handleOpenDialogClose, t } = props
    const [value, setValue] = useState('1')
    const staff = useSelector(staffItemSelector)
    const [showRegisterButton, setShowRegisterButton] = useState(false)
    const [shouldOpenDialogRegister, setShouldOpenDialogRegister] = useState(false)
    const formRef = useRef(null)
    const dispatch = useDispatch()

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
    const handleShouldRegisterDialog = () => {
        setShouldOpenDialogRegister(true)
    }
    const handleCloseRegister = () => {
        setShouldOpenDialogRegister(false)
        handleOpenDialogClose()
    }
    useEffect(() => {
        if (staff?.id) {
            dispatch(getByEmployee({ employeeId: staff?.id }))
            dispatch(getByEmployeeFamily({ employeeId: staff?.id }))
        }
    }, [])
    const handleSubmit = () => {
        if (value === '1') {
            formRef.current.submit()
        } else {
            handleOpenDialogClose()
        }
    }
    useEffect(() => {
        dispatch(setStaffImage(staff?.image))
        if (Object.keys(staff).length === 0) {
            setShowRegisterButton(false)
        } else {
            setShowRegisterButton(true)
            dispatch(setItemPage(staff))
        }
    }, [staff])

    return (
        <div className="m-sm-24">
            <Dialog open={true} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle id="draggable-dialog-title">
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <h3>Thêm nhân viên</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleOpenDialogClose}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Thông tin nhân viên" value="1" />
                        <Tab label="Thông tin văn bằng" value="2" />
                        <Tab label="Quan hệ gia đình" value="3" />
                    </Tabs>
                </DialogTitle>
                <DialogContent className="overflow">
                    {value === '1' && <Information formRef={formRef} t={t} />}
                    {value === '2' && <Certificate t={t} staffItem={staff} />}
                    {value === '3' && <Family t={t} staffItem={staff} />}
                </DialogContent>
                <DialogActions className="justify-center">
                    {showRegisterButton && (
                        <Button variant="contained" color="primary" onClick={() => handleShouldRegisterDialog()}>
                            Đăng ký
                        </Button>
                    )}
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Lưu
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleOpenDialogClose}>
                        Hủy
                    </Button>
                </DialogActions>
                <Grid>
                    <div>
                        {shouldOpenDialogRegister && (
                            <RegisterStaffDialog
                                handleCloseRegister={handleCloseRegister}
                                open={shouldOpenDialogRegister}
                                t={t}
                                dataItemStaff={staff}
                                isOpenRegister={true}
                            />
                        )}
                    </div>
                </Grid>
            </Dialog>
        </div>
    )
}

export default AddStaffDialog
