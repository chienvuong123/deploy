import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grid,
    Button,
    Icon,
    IconButton,
    MenuItem,
} from '@material-ui/core'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import { LEADERSHIP, LEADER_POSITION } from 'app/constants/StaffConstant'
import moment from 'moment'
import { today } from 'app/component/validateFroms'
import { useDispatch } from 'react-redux'
import { updateStaffAction } from '../../redux/actions/StaffAction'
const LeadershiPprogram = (props) => {
    const { handleDialogLeadershipClose, t, dataItemStaff } = props
    const [submitLeader, setSubmitLeader] = useState(dataItemStaff || {})
    console.log(submitLeader)
    const dispatch = useDispatch()
    const onChange = (e) => {
        const { name, value } = e.target
        if (name === 'leaderId') {
            const selectedLeader = LEADERSHIP.find((item) => item.id === value)
            console.log(selectedLeader)
            setSubmitLeader({
                ...submitLeader,
                [name]: value,
                leaderName: LEADERSHIP.find((item) => item.id === value)?.leaderName,
                leaderPosition: selectedLeader ? selectedLeader.leaderPosition : '',
            })
        } else {
            setSubmitLeader({
                ...submitLeader,
                [name]: value,
            })
        }
    }
    const handleSubmitLeadership = () => {
        dispatch(
            updateStaffAction({
                ...submitLeader,
                submitProfileStatus: '2',
            }),
        )
        handleDialogLeadershipClose()
    }
    return (
        <div className="m-sm-24">
            <Dialog open={true} fullWidth={true} maxWidth={'md'}>
                <DialogTitle>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <h3>Thêm nhân viên</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleDialogLeadershipClose}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <ValidatorForm onSubmit={handleSubmitLeadership}>
                        <Grid container spacing={2} lg={12} md={12}>
                            <Grid item lg={4} md={4}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span>
                                            <span className="text-red">*</span>
                                            Ngày trình
                                        </span>
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: today,
                                    }}
                                    type="date"
                                    name="submitDay"
                                    value={
                                        submitLeader?.submitDay || moment(submitLeader?.submitDay).format('YYYY-MM-DD')
                                    }
                                    onChange={(e) => onChange(e)}
                                    validators={['required']}
                                    errorMessages={[t('staff.noti.error_required')]}
                                    size="small"
                                />
                            </Grid>
                            <Grid item lg={4} md={4}>
                                <SelectValidator
                                    className="w-100"
                                    label={
                                        <span>
                                            <span className="text-red">*</span>
                                            Tên lãnh đạo
                                        </span>
                                    }
                                    type="text"
                                    name="leaderId"
                                    value={submitLeader.leaderId || ''}
                                    onChange={onChange}
                                    validators={['required']}
                                    errorMessages={[t('staff.noti.error_required')]}
                                    size="small"
                                >
                                    {LEADERSHIP.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.leaderName}
                                        </MenuItem>
                                    ))}
                                </SelectValidator>
                            </Grid>
                            <Grid item lg={4} md={4}>
                                <TextValidator
                                    className="w-100"
                                    label="Chức vụ"
                                    name="leaderPosition"
                                    value={
                                        submitLeader.leaderPosition
                                            ? LEADER_POSITION.find(
                                                  (position) => position.id === submitLeader.leaderPosition,
                                              )?.name
                                            : ''
                                    }
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    size="small"
                                />
                            </Grid>
                            <Grid item lg={12} md={12}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span>
                                            <span className="text-red">*</span>
                                            Nội dung
                                        </span>
                                    }
                                    type="text"
                                    name="submitContent"
                                    value={submitLeader?.submitContent || ''}
                                    onChange={(e) => onChange(e)}
                                    validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                                    errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <Grid className="justify-center mt-5">
                            <Button variant="contained" color="primary" type="submit">
                                Trình lãnh đạo
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleDialogLeadershipClose}>
                                Hủy
                            </Button>
                        </Grid>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LeadershiPprogram
