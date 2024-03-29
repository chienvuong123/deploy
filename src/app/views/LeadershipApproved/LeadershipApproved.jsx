import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'egret'
import { Grid, Button, TextField, IconButton } from '@material-ui/core'
import { Visibility as VisibilityIcon, Notifications as NotificationsIcon } from '@material-ui/icons'
import CustomTable from 'app/froms/CustomTable'
import moment from 'moment'
import { GENDER, STATUS_APPROVED, SUBMIT_PROFILE_STATUS, TEMA } from 'app/constants/StaffConstant'
import { renderAddress } from 'app/component/validateFroms'
import { useDispatch, useSelector } from 'react-redux'
import { searchByPageAction, setItemPage } from 'app/redux/actions/StaffAction'
import { StaffListSelector, totalElementsSelector } from 'app/redux/selector/StaffSelector'
import RegisterStaffDialog from '../RegisterStaff/RegisterStaffDialog'
import { getByEmployee } from 'app/redux/actions/CertificateActions'
import { getByEmployeeFamily } from 'app/redux/actions/FamilyActions'

const LeadershipApproved = (props) => {
    const { t } = props
    const dataStaff = useSelector(StaffListSelector)
    const totalElements = useSelector(totalElementsSelector)
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [showOverview, setShowOverview] = useState(false)
    const [item, setItem] = useState({})
    const dispatch = useDispatch()
    const updatePage = () => {
        const objectPage = {
            keyword: keyword,
            pageIndex: page + 1,
            pageSize: pageSize,
            listStatus: STATUS_APPROVED.join(','),
        }
        dispatch(searchByPageAction(objectPage))
    }
    useEffect(() => {
        updatePage()
    }, [page, pageSize, keyword])
    const handleOpenDialogShowOverview = (item) => {
        setItem(item)
        dispatch(getByEmployee({ employeeId: item?.id }))
        dispatch(getByEmployeeFamily({ employeeId: item?.id }))
        dispatch(setItemPage(item))
        setShowOverview(true)
    }
    const handleCloseDialogShowOverview = () => {
        setShowOverview(false)
    }
    const Action = (props) => {
        const item = props.item
        return (
            <div>
                <IconButton size="small" onClick={() => handleOpenDialogShowOverview(item)}>
                    <VisibilityIcon color="secondary" fontSize="small" />
                </IconButton>
            </div>
        )
    }
    let columns = [
        {
            title: 'Thao tác',
            field: 'custum',
            align: 'center',
            maxWidth: '90px',
            minWidth: '90px',
            render: (rowData) => <Action item={rowData} />,
        },
        {
            title: 'STT',
            align: 'center',
            maxWidth: '50px',
            minWidth: '50px',
            render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
        },
        {
            title: 'Mã nhân viên',
            field: 'code',
            align: 'center',
            maxWidth: '120px',
            minWidth: '120px',
        },
        {
            title: 'Tên nhân viên',
            field: 'name',
            align: 'center',
        },
        {
            title: 'Ngày sinh',
            field: 'dateOfBirth',
            align: 'center',
            render: (rowData) => moment(rowData.dateOfBirth).format('YYYY-MM-DD'),
        },
        {
            title: 'Giới tính',
            field: 'gender',
            align: 'center',
            maxWidth: '90px',
            minWidth: '90px',
            render: (rowData) => {
                const nameGender = GENDER.find((item) => item.id === rowData.gender)
                return nameGender ? nameGender.name : ''
            },
        },
        {
            title: 'Nhóm',
            field: 'team',
            align: 'center',
            maxWidth: '150px',
            minWidth: '150px',
            render: (rowData) => {
                const nameTeam = TEMA.find((item) => item.id === rowData.team)
                return nameTeam ? nameTeam.name : ''
            },
        },
        {
            title: 'Điện thoại',
            field: 'phone',
            align: 'center',
            maxWidth: '100px',
            minWidth: '100px',
        },
        {
            title: 'Địa chỉ',
            field: 'address',
            align: 'center',
            maxWidth: '150px',
            minWidth: '15px',
            render: (rowData) => renderAddress(rowData),
        },
        {
            title: 'Trạng thái',
            field: 'submitProfileStatus',
            align: 'center',
            render: (rowData) => {
                const nameStatus = SUBMIT_PROFILE_STATUS.find((item) => item.id == rowData.submitProfileStatus)
                return nameStatus ? nameStatus.name : 'lỗi'
            },
        },
    ]
    return (
        <div className="m-sm-24">
            <div className="mb-sm-24">
                <Breadcrumb
                    routeSegments={[
                        { name: t('Dashboard.leader'), path: 'leader/LeadershipApproval' },
                        { name: t('leader.approved'), path: 'leader/LeadershipApproval' },
                        {},
                    ]}
                />
            </div>
            <Grid container spacing={2} lg={12} md={12}>
                <Grid item lg={12} md={12} className="justify-end ">
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <TextField
                            placeholder="Nhập từ khóa tìm kiếm"
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-100 "
                        />
                    </Grid>
                </Grid>
                {showOverview && (
                    <RegisterStaffDialog
                        handleCloseRegister={handleCloseDialogShowOverview}
                        open={showOverview}
                        dataItemStaff={item}
                        isOpenAction={true}
                    />
                )}
                <Grid item lg={12} md={12}>
                    <CustomTable
                        data={dataStaff}
                        totalElements={totalElements}
                        page={page}
                        setPage={setPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        columns={columns}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default LeadershipApproved
