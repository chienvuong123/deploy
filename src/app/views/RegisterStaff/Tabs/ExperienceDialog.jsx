import React, { useState } from 'react'
import { Dialog, Button, Grid, DialogActions, DialogTitle, DialogContent, IconButton, Icon } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { TYPE_ADDRESS, TYPE_NAME } from 'app/component/validateFroms'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addExperience, updateExperience } from 'app/redux/actions/ExperienceActions'
const ExperienceDialog = (props) => {
    const { t, handleDialogExperienceClose, data, dataItemStaff } = props
    const [experience, setExperience] = useState(data || {})
    const dispatch = useDispatch()
    const onChange = (e) => {
        setExperience({
            ...experience,
            [e.target.name]: e.target.value,
        })
    }
    const handldSubmitExperience = () => {
        if (experience?.id) {
            dispatch(updateExperience(experience))
            handleDialogExperienceClose()
        } else {
            const obj = {
                experience: experience,
                employeeId: dataItemStaff?.id,
            }
            dispatch(addExperience(obj))
            handleDialogExperienceClose()
        }
    }
    return (
        <div>
            <Dialog open={true} maxWidth={'md'} fullWidth={true}>
                <DialogTitle>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <h3>Kinh nghiệm làm việc</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleDialogExperienceClose}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <ValidatorForm onSubmit={handldSubmitExperience}>
                    <DialogContent>
                        <Grid container spacing={2} lg={12} md={12}>
                            <Grid item lg={6} md={6}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span className="font">
                                            <span className="text-red">*</span>
                                            Tên công ty
                                        </span>
                                    }
                                    type="text"
                                    value={experience?.companyName || ''}
                                    name="companyName"
                                    onChange={(e) => onChange(e)}
                                    validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_NAME}`]}
                                    errorMessages={[
                                        t('staff.noti.error_required'),
                                        t('staff.noti.error_space'),
                                        t('staff.noti.error_format'),
                                    ]}
                                    size="small"
                                />
                            </Grid>
                            <Grid item lg={6} md={6}>
                                <TextValidator
                                    className="w-100 mb-16"
                                    label={
                                        <span className="font">
                                            <span className="text-red">*</span>
                                            Địa chỉ
                                        </span>
                                    }
                                    type="text"
                                    value={experience?.companyAddress || ''}
                                    name="companyAddress"
                                    onChange={(e) => onChange(e)}
                                    validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_ADDRESS}`]}
                                    errorMessages={[
                                        t('staff.noti.error_required'),
                                        t('staff.noti.error_space'),
                                        t('staff.noti.error_format'),
                                    ]}
                                    size="small"
                                />
                            </Grid>
                            <Grid item lg={6} md={6}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span className="font">
                                            <span className="text-red">*</span>
                                            Ngày bắt đầu
                                        </span>
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="date"
                                    value={
                                        experience?.startDate ? moment(experience?.startDate).format('YYYY-MM-DD') : ''
                                    }
                                    name="startDate"
                                    onChange={(e) => onChange(e)}
                                    validators={['required']}
                                    errorMessages={[t('staff.noti.error_required')]}
                                    size="small"
                                />
                            </Grid>
                            <Grid item lg={6} md={6}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span className="font">
                                            <span className="text-red">*</span>
                                            Ngày kết thúc
                                        </span>
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="date"
                                    value={experience?.endDate ? moment(experience?.endDate).format('YYYY-MM-DD') : ''}
                                    name="endDate"
                                    onChange={(e) => onChange(e)}
                                    validators={['required']}
                                    errorMessages={[t('staff.noti.error_required')]}
                                    size="small"
                                />
                            </Grid>
                            <Grid item lg={6} md={6}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span className="font">
                                            <span className="text-red">*</span>
                                            Mô tả công việc
                                        </span>
                                    }
                                    type="text"
                                    value={experience?.jobDescription || ''}
                                    name="jobDescription"
                                    onChange={(e) => onChange(e)}
                                    validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                                    errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                                    size="small"
                                />
                            </Grid>
                            <Grid item lg={6} md={6}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span className="font">
                                            <span className="text-red">*</span>
                                            Lý do nghỉ việc
                                        </span>
                                    }
                                    type="text"
                                    value={experience?.leavingReason || ''}
                                    name="leavingReason"
                                    onChange={(e) => onChange(e)}
                                    validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                                    errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className="justify-center">
                        <Button color="primary" variant="contained" type="submit">
                            Lưu
                        </Button>
                        <Button color="secondary" variant="contained" onClick={handleDialogExperienceClose}>
                            Hủy
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}

export default ExperienceDialog
