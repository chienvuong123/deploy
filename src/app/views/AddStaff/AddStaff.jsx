import React, { useEffect, useState } from 'react'
import { Grid, Button, IconButton, Icon, TextField } from '@material-ui/core'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Notifications as NotificationsIcon,
} from '@material-ui/icons'
import CustomTable from 'app/froms/CustomTable'
import { Breadcrumb, ConfirmationDialog } from 'egret'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStaffAction, searchByPageAction, setItemPage } from 'app/redux/actions/StaffAction'
import {
    staffItemSelector,
    StaffListSelector,
    totalElementsSelector,
    updatePageSelector,
} from 'app/redux/selector/StaffSelector'
import moment from 'moment'
import { toast } from 'react-toastify'
import {
    GENDER,
    STATUS_ADD,
    STATUS_ADDITIONAL,
    STATUS_DETAIL,
    STATUS_LEADER,
    STATUS_REJECT,
    STATUS_REMOVE,
    STATUS_UPDATE,
    SUBMIT_PROFILE_STATUS,
    TEMA,
} from 'app/constants/StaffConstant'
import AddStaffDialog from './AddStaffDialog'
import StatusStaffDialog from './StatusStaffDialog'
import { renderAddress } from 'app/component/validateFroms'
import { getByEmployee } from 'app/redux/actions/CertificateActions'
import { getByEmployeeFamily } from 'app/redux/actions/FamilyActions'
import RegisterStaffDialog from '../RegisterStaff/RegisterStaffDialog'

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})
const Staff = (props) => {
    const { t } = props
    const dataStaff = useSelector(StaffListSelector)
    const dataItem = useSelector(staffItemSelector)
    const totalElements = useSelector(totalElementsSelector)
    const pageSelector = useSelector(updatePageSelector)
    const [pageSize, setPageSize] = useState(10)
    const [page, setPage] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [staff, setStaff] = useState({})
    const [showOpenDialogEdit, setShowOpenDialogEdit] = useState(false)
    const [shouldConfirDialog, setShouldConfirDialog] = useState(false)
    const [shouldOpenDialogReject, setShouldOpenDialogReject] = useState(false)
    const [shouldOpenDialogAdditional, setShouldOpenDialogAdditional] = useState(false)
    const [shouldOpenDialogInformation, setShouldOpenDialogInformation] = useState(false)
    const dispatch = useDispatch()

    const updatePage = () => {
        const objectPage = {
            keyword: keyword,
            pageIndex: page + 1,
            pageSize: pageSize,
            listStatus: STATUS_ADD.join(','),
        }
        dispatch(searchByPageAction(objectPage))
    }
    useEffect(() => {
        updatePage()
    }, [keyword, pageSize, page])

    useEffect(() => {
        if (pageSelector) updatePage()
    }, [pageSelector])

    const handleOpenDialogClose = () => {
        setShowOpenDialogEdit(false)
    }

    const handleOpenConfirClose = () => {
        setShouldConfirDialog(false)
    }
    const handleAddStaff = () => {
        setShowOpenDialogEdit(true)
        setStaff()
    }

    const handleEditStaff = (data) => {
        dispatch(setItemPage(data))
        setShowOpenDialogEdit(true)
    }
    const handleDelete = (item) => {
        setStaff(item)
        setShouldConfirDialog(true)
    }
    const deleteStaff = () => {
        dispatch(deleteStaffAction(staff?.id))
        setShouldConfirDialog(false)
        setStaff()
    }
    const handleShowReject = (item) => {
        setStaff(item)
        setShouldOpenDialogReject(true)
    }
    const handleAdditional = (item) => {
        setStaff(item)
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
                {STATUS_UPDATE.join(',').includes(item.submitProfileStatus) && (
                    <IconButton size="small" onClick={() => handleEditStaff(item)}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                )}

                {STATUS_REMOVE.join(',').includes(item.submitProfileStatus) && (
                    <IconButton size="small" onClick={() => handleDelete(item)}>
                        <DeleteIcon className="color-red" fontSize="small" />
                    </IconButton>
                )}

                {STATUS_DETAIL.join(',').includes(item.submitProfileStatus) && (
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
                <Breadcrumb routeSegments={[{ name: 'Quản lí nhân viên', path: 'staff_manager/AddStaff' }]} />
            </div>
            <Grid container justify="space-between" spacing={2} className="mb-2">
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button variant="contained" onClick={handleAddStaff} color="primary">
                        Thêm mới
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                    <TextField
                        placeholder="Nhập từ khóa tìm kiếm"
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-100"
                    />
                </Grid>
            </Grid>
            <Grid>
                <div>
                    {shouldConfirDialog && (
                        <ConfirmationDialog
                            title={t('general.confirm')}
                            t={t}
                            open={shouldConfirDialog}
                            onConfirmDialogClose={handleOpenConfirClose}
                            onYesClick={deleteStaff}
                            text={t('general.deleteConfirm')}
                            Yes={t('general.Yes')}
                            No={t('general.cancel')}
                        />
                    )}
                </div>
                <div>
                    {showOpenDialogEdit && (
                        <AddStaffDialog
                            open={showOpenDialogEdit}
                            handleOpenDialogClose={handleOpenDialogClose}
                            t={t}
                            data={staff}
                        />
                    )}
                </div>
                <div>
                    {shouldOpenDialogReject && (
                        <StatusStaffDialog
                            open={shouldOpenDialogReject}
                            handleStatusClose={() => setShouldOpenDialogReject(false)}
                            note={staff?.reasonForRejection}
                            title={'Lý do từ chối'}
                        />
                    )}
                    {shouldOpenDialogAdditional && (
                        <StatusStaffDialog
                            open={shouldOpenDialogReject}
                            handleStatusClose={() => setShouldOpenDialogAdditional(false)}
                            note={staff?.additionalRequest}
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
                </div>
            </Grid>
            <CustomTable
                data={dataStaff}
                totalElements={totalElements}
                page={page}
                pageSize={pageSize}
                columns={columns}
                setPage={setPage}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default Staff
