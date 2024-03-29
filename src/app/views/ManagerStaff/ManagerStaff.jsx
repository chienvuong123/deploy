import { renderAddress } from 'app/component/validateFroms'
import {
    GENDER,
    STATUS_ADDITIONAL,
    STATUS_MANAGER_STAFF,
    STATUS_NOTIFICATION_STAFF,
    STATUS_REJECT,
    STATUS_UPDATE_STAFF,
    STATUS_WIEW_MANAGER_STAFF,
    SUBMIT_PROFILE_STATUS,
    TEMA,
} from 'app/constants/StaffConstant'
import { IconButton, Grid, TextField } from '@material-ui/core'
import { Edit as EditIcon, Visibility as VisibilityIcon, Notifications as NotificationsIcon } from '@material-ui/icons'
import CustomTable from 'app/froms/CustomTable'
import { searchByPageAction, setItemPage } from 'app/redux/actions/StaffAction'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'egret'
import { staffItemSelector, StaffListSelector, totalElementsSelector } from 'app/redux/selector/StaffSelector'
import ManagerStaffDialog from './ManagerStaffDialog'
import StatusStaffDialog from '../AddStaff/StatusStaffDialog'
import { getByEmployee } from 'app/redux/actions/CertificateActions'
import { getByEmployeeFamily } from 'app/redux/actions/FamilyActions'
import RegisterStaffDialog from '../RegisterStaff/RegisterStaffDialog'

const ManagerStaff = (props) => {
    const { t } = props
    const dataStaff = useSelector(StaffListSelector)
    const totalElements = useSelector(totalElementsSelector)
    const dataItem = useSelector(staffItemSelector)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [keyword, setKeyword] = useState('')
    const [itemManager, setItemManager] = useState(dataItem || {})
    const [shouldOpenDialogManagerStaff, setShouldOpenDialogManagerStaff] = useState(false)
    const [shouldOpenDialogReject, setShouldOpenDialogReject] = useState(false)
    const [shouldOpenDialogAdditional, setShouldOpenDialogAdditional] = useState(false)
    const [shouldOpenDialogInformation, setShouldOpenDialogInformation] = useState(false)
    const dispatch = useDispatch()

    const updatePage = () => {
        const objectPage = {
            keyword: keyword,
            pageIndex: page + 1,
            pageSize: pageSize,
            listStatus: STATUS_MANAGER_STAFF.join(','),
        }
        dispatch(searchByPageAction(objectPage))
    }
    useEffect(() => {
        updatePage()
    }, [keyword, pageSize, page])
    const handleOpenDialogManagerStaff = (item) => {
        dispatch(setItemPage(item))
        setShouldOpenDialogManagerStaff(true)
    }
    const handleCloseDialogManagerStaff = () => {
        setShouldOpenDialogManagerStaff(false)
    }
    const handleShowReject = (item) => {
        setItemManager(item)
        setShouldOpenDialogReject(true)
    }
    const handleAdditional = (item) => {
        setItemManager(item)
        setShouldOpenDialogAdditional(true)
    }
    const handleOpenDialogInformation = (item) => {
        setShouldOpenDialogInformation(true)
        dispatch(getByEmployee({ employeeId: item?.id }))
        dispatch(getByEmployeeFamily({ employeeId: item?.id }))
        dispatch(setItemPage(item))
    }
    const Action = (props) => {
        const item = props.item
        return (
            <div>
                {STATUS_UPDATE_STAFF.join(',').includes(item.submitProfileStatus) && (
                    <IconButton size="small" onClick={() => handleOpenDialogManagerStaff(item)}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                )}
                {STATUS_WIEW_MANAGER_STAFF.join(',').includes(item.submitProfileStatus) && (
                    <IconButton size="small">
                        <VisibilityIcon
                            color="secondary"
                            fontSize="small"
                            onClick={() => handleOpenDialogInformation(item)}
                        />
                    </IconButton>
                )}
                {STATUS_ADDITIONAL.join(',').includes(item.submitProfileStatus) && (
                    <IconButton size="small">
                        <NotificationsIcon color="secondary" fontSize="small" onClick={() => handleAdditional(item)} />
                    </IconButton>
                )}
                {STATUS_REJECT.join(',').includes(item.submitProfileStatus) && (
                    <IconButton size="small">
                        <NotificationsIcon color="secondary" fontSize="small" onClick={() => handleShowReject(item)} />
                    </IconButton>
                )}
            </div>
        )
    }
    let columns = [
        {
            title: 'Thao tác',
            field: 'custum',
            align: 'center',
            maxWidth: '110px',
            minWidth: '110px',
            render: (rowData) => <Action item={rowData} />,
        },
        {
            title: 'STT',
            align: 'center',
            maxWidth: '60px',
            minWidth: '60px',
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
            maxWidth: '150px',
            minWidth: '150px',
        },
        {
            title: 'Ngày sinh',
            field: 'dateOfBirth',
            align: 'center',
            maxWidth: '100px',
            minWidth: '100px',
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
            maxWidth: '130px',
            minWidth: '130px',
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
        // {
        //     title: 'Địa chỉ',
        //     field: 'address',
        //     align: 'center',
        //     maxWidth: '150px',
        //     minWidth: '15px',
        //     render: (rowData) => renderAddress(rowData),
        // },
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
                        { name: t('Dashboard.manage'), path: 'staff_manager/managerStaff' },
                        { name: t('manage.employee'), path: 'staff_manager/managerStaff' },
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
                <Grid>
                    {shouldOpenDialogManagerStaff && (
                        <ManagerStaffDialog
                            open={shouldOpenDialogManagerStaff}
                            t={t}
                            handleCloseDialogManagerStaff={handleCloseDialogManagerStaff}
                            item={dataItem}
                        />
                    )}
                    {shouldOpenDialogReject && (
                        <StatusStaffDialog
                            open={shouldOpenDialogReject}
                            handleStatusClose={() => setShouldOpenDialogReject(false)}
                            note={itemManager?.reasonForRefuseEndProfile}
                            title={'Lý do từ chối'}
                        />
                    )}
                    {shouldOpenDialogAdditional && (
                        <StatusStaffDialog
                            open={shouldOpenDialogReject}
                            handleStatusClose={() => setShouldOpenDialogAdditional(false)}
                            note={itemManager?.additionalRequestTermination}
                            title={'Yêu cầu bổ sung'}
                        />
                    )}
                    {shouldOpenDialogInformation && (
                        <RegisterStaffDialog
                            open={shouldOpenDialogInformation}
                            handleCloseRegister={() => setShouldOpenDialogInformation(false)}
                            t={t}
                            isOpenAction={true}
                            dataItemStaff={dataItem}
                        />
                    )}
                </Grid>
                <Grid item lg={12} md={12}>
                    <CustomTable
                        columns={columns}
                        data={dataStaff}
                        totalElements={totalElements}
                        page={page}
                        setPage={setPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default ManagerStaff
