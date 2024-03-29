import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Icon, Grid, Button, IconButton, DialogActions } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { today, TYPE_NAME } from 'app/component/validateFroms'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { updateStaffAction } from 'app/redux/actions/StaffAction'
import { updateSalary } from 'app/redux/actions/SalaryIncreaseActions'

const RefuseDialog = (props) => {
    const { t, handleCloseDialogRefuse, dataItemStaff, isSubmitSalaty } = props
    const [refuse, setRefuse] = useState(dataItemStaff || {})
    const dispatch = useDispatch()
    const onChange = (e) => {
        setRefuse({
            ...refuse,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {
        if (isSubmitSalaty) {
            dispatch(
                updateSalary({
                    ...refuse,
                    rejectionDate: refuse?.rejectionDate,
                    reasonForRefusal: refuse?.reasonForRejection,
                    salaryIncreaseStatus: 5,
                }),
            )
        } else {
            dispatch(
                updateStaffAction({
                    ...refuse,
                    reasonForRejection: refuse?.reasonForRejection,
                    rejectionDate: refuse?.rejectionDate,
                    submitProfileStatus: '5',
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
                            <h3>Từ chối yêu cầu</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleCloseDialogRefuse}>
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
                                    Ngày từ chối
                                </span>
                            }
                            inputProps={{
                                min: today,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="rejectionDate"
                            type="date"
                            size="small"
                            value={refuse?.rejectionDate ? moment(refuse?.rejectionDate).format('YYYY-MM-DD') : ''}
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                        />
                        <TextValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Nội dung từ chối
                                </span>
                            }
                            name="reasonForRejection"
                            type="text"
                            size="small"
                            value={refuse?.reasonForRejection || ''}
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_NAME}`]}
                            errorMessages={[
                                t('staff.noti.error_required'),
                                t('staff.noti.error_space'),
                                t('staff.noti.error_format'),
                            ]}
                        />
                        <DialogActions className="justify-center">
                            <Button variant="contained" color="primary" type="submit">
                                Duyệt
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleCloseDialogRefuse}>
                                Hủy
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RefuseDialog
