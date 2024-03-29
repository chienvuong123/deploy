import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Grid,
    Icon,
    IconButton,
    MenuItem,
    Button,
} from '@material-ui/core'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import { LEADER_POSITION, LEADERSHIP } from 'app/constants/StaffConstant'
import { updateStaffAction } from 'app/redux/actions/StaffAction'
import { useDispatch } from 'react-redux'
const ManagerEndStaff = (props) => {
    const { t, handleCloseParentDialog, dataItemStaff } = props
    const [formData, setFormData] = useState(dataItemStaff || {})
    const dispatch = useDispatch()
    const onChange = (e) => {
        const { name, value } = e.target
        if (name === 'leaderId') {
            const selectedLeader = LEADERSHIP.find((item) => item.id === value)
            setFormData({
                ...formData,
                [name]: value,
                leaderName: LEADERSHIP.find((item) => item.id === value)?.leaderName,
                leaderPosition: selectedLeader ? selectedLeader.leaderPosition : '',
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }
    const handleSubmit = () => {
        dispatch(
            updateStaffAction({
                ...formData,
                submitProfileStatus: '6',
            }),
        )
        handleCloseParentDialog()
    }
    return (
        <div>
            <Dialog open={true} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle id="draggable-dialog-title">
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <h3>Kết thúc nhân viên</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleCloseParentDialog}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <ValidatorForm onSubmit={handleSubmit}>
                    <DialogContent dividers spacing={2}>
                        <Grid container xs={12} sm={12} md={12} lg={12} spacing={2}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
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
                                    value={formData.leaderId || ''}
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
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextValidator
                                    className="w-100"
                                    label="Chức vụ"
                                    name="leaderPosition"
                                    value={
                                        formData.leaderPosition
                                            ? LEADER_POSITION.find(
                                                  (position) => position.id === formData.leaderPosition,
                                              )?.name
                                            : ''
                                    }
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className="justify-center">
                        <Button color="primary" variant="contained" type="submit">
                            Trình lãnh đạo
                        </Button>
                        <Button color="secondary" variant="contained">
                            Hủy
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}

export default ManagerEndStaff
