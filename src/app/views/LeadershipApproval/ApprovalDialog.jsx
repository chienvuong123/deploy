import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Icon, Grid, Button, IconButton, DialogActions } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { today } from 'app/component/validateFroms'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { updateStaffAction } from 'app/redux/actions/StaffAction'
import { updateSalary } from 'app/redux/actions/SalaryIncreaseActions'
const ApprovalDialog = (props) => {
    const { t, handleCloseDialogApproval, dataItemStaff, isSubmitSalaty, isSubmitStaff } = props
    const [approval, setApproval] = useState(dataItemStaff || {})
    const dispatch = useDispatch()
    const onChange = (e) => {
        setApproval({
            ...approval,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {
        if (isSubmitSalaty) {
            dispatch(
                updateSalary({
                    ...approval,
                    acceptanceDate: approval?.appointmentDate,
                    salaryIncreaseStatus: 3,
                }),
            )
        }
        if (isSubmitStaff) {
            console.log('dã chạy')
            dispatch(
                updateStaffAction({
                    ...approval,
                    appointmentDate: approval?.appointmentDate,
                    submitProfileStatus: '3',
                }),
            )
        }
    }
    return (
        <div className="m-sm-24">
            <Dialog open={true} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <h3>Phê duyệt</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleCloseDialogApproval}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Ngày hẹn
                                </span>
                            }
                            inputProps={{
                                min: today,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="appointmentDate"
                            type="date"
                            size="small"
                            value={
                                approval?.appointmentDate ? moment(approval?.appointmentDate).format('YYYY-MM-DD') : ''
                            }
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                        />
                        <DialogActions className="justify-center">
                            <Button variant="contained" color="primary" type="submit">
                                Duyệt
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleCloseDialogApproval}>
                                Hủy
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ApprovalDialog
