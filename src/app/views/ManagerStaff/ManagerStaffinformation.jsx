import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import moment from 'moment'
import { GENDER } from 'app/constants/StaffConstant'

const ManagerStaffinformation = (props) => {
    const { item } = props
    return (
        <div>
            <Grid container spacing={2} lg={12} md={12}>
                <Grid item lg={4} md={4}>
                    <div className="">
                        <img
                            className="avatar"
                            alt="avatar"
                            src={item?.image || '/assets/images/avatar.jpg'}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </Grid>
                <Grid container spacing={2} lg={8} md={8}>
                    <Grid item lg={4} md={4}>
                        <TextField
                            className="w-100"
                            label={<span>Họ tên</span>}
                            size="small"
                            value={item?.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextField
                            className="w-100"
                            label={<span>Mã nhân viên</span>}
                            size="small"
                            value={item?.code}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextField
                            className="w-100"
                            label={<span>Ngày sinh</span>}
                            size="small"
                            value={item?.dateOfBirth ? moment(item?.dateOfBirth).format('YYYY-MM-DD') : ''}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextField
                            className="w-100"
                            label={<span>Giới tính</span>}
                            size="small"
                            value={GENDER.find((gender) => gender.id === item?.gender)?.name || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextField
                            className="w-100"
                            label={<span>Số điện thoại</span>}
                            size="small"
                            value={item?.phone || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextField
                            className="w-100"
                            label={<span>Email</span>}
                            size="small"
                            value={item?.email || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ManagerStaffinformation
