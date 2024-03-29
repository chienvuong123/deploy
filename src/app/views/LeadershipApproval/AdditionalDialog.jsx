import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Icon, Grid, Button, IconButton, DialogActions } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { today } from 'app/component/validateFroms'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { updateStaffAction } from 'app/redux/actions/StaffAction'
import { updateSalary } from 'app/redux/actions/SalaryIncreaseActions'

const AdditionalDialog = (props) => {
    const { t, handleCloseDialogAdditional, dataItemStaff, isSubmitSalaty } = props
    const [additional, setAdditional] = useState(dataItemStaff || {})
    const dispatch = useDispatch()
    const onChange = (e) => {
        setAdditional({
            ...additional,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {
        if (isSubmitSalaty) {
            dispatch(
                updateSalary({
                    ...additional,
                    additionalRequest: additional?.additionalRequest,
                    salaryIncreaseStatus: 4,
                }),
            )
        } else {
            dispatch(
                updateStaffAction({
                    ...additional,
                    additionalRequest: additional?.additionalRequest,
                    submitProfileStatus: '4',
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
                            <h3>Yêu cầu bổ sung</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleCloseDialogAdditional}>
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
                                    Nội dung cần bổ sung
                                </span>
                            }
                            name="additionalRequest"
                            type="text"
                            size="small"
                            value={additional?.additionalRequest || ''}
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                        />
                        <DialogActions className="justify-center">
                            <Button variant="contained" color="primary" type="submit">
                                Duyệt
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleCloseDialogAdditional}>
                                Hủy
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AdditionalDialog
