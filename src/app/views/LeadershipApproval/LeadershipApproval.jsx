import React, { useState } from 'react'
import { Breadcrumb } from 'egret'
import { Grid, Tab, Tabs, TextField } from '@material-ui/core'
import PendingApproval from './Pending/PendingApproval'
import PendingPromoted from './Pending/PendingPromoted'
import PendingSalaryIncrease from './Pending/PendingSalaryIncrease'
import { toast } from 'react-toastify'
import PendingAdvisory from './Pending/PendingAdvisory'
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})

const LeadershipApproval = (props) => {
    const { t } = props
    const [value, setValue] = useState('1')
    const [keyword, setKeyword] = useState('')
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
    return (
        <div className="m-sm-24">
            <div className="mb-sm-24">
                <Breadcrumb
                    routeSegments={[
                        { name: t('Dashboard.leader'), path: 'leader/LeadershipApproval' },
                        { name: t('leader.approval'), path: 'leader/LeadershipApproval' },
                        {},
                    ]}
                />
            </div>
            <Grid container lg={12} md={12}>
                <Grid item lg={12} md={12}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Chờ duyệt" value="1" />
                        <Tab label="Chờ duyệt tăng lương" value="2" />
                        <Tab label="Chờ duyệt thăng chức" value="3" />
                        <Tab label="Chờ duyệt tham mưu" value="4" />
                    </Tabs>
                </Grid>
                <Grid lg={12} md={12} className="justify-end ">
                    <Grid item xs={6} sm={6} md={4} lg={4} className="mr-2">
                        <TextField
                            placeholder="Nhập từ khóa tìm kiếm"
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-100 "
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid>
                {value === '1' && <PendingApproval keyword={keyword} t={t} />}
                {value === '2' && <PendingSalaryIncrease keyword={keyword} t={t} />}
                {value === '3' && <PendingPromoted keyword={keyword} t={t} />}
                {value === '4' && <PendingAdvisory keyword={keyword} t={t} />}
            </Grid>
        </div>
    )
}

export default LeadershipApproval
