import { GENDER, SUBMIT_MANAGER_STATUS, SUBMIT_PROFILE_STATUS, TEMA } from 'app/constants/StaffConstant'
import CustomTable from 'app/froms/CustomTable'
import {
    staffItemSelector,
    StaffListSelector,
    totalElementsSelector,
    updatePageSelector,
} from 'app/redux/selector/StaffSelector'
import { IconButton, Grid } from '@material-ui/core'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Notifications as NotificationsIcon,
} from '@material-ui/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchByPageAction, setItemPage } from 'app/redux/actions/StaffAction'
import { toast } from 'react-toastify'
import { renderAddress } from 'app/component/validateFroms'
import RegisterStaffDialog from 'app/views/RegisterStaff/RegisterStaffDialog'
import { getByEmployee } from 'app/redux/actions/CertificateActions'
import { getByEmployeeFamily } from 'app/redux/actions/FamilyActions'
import FormEndStaff from 'app/views/CustomForms/FormEndStaff'
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})
const PendingApproval = (props) => {
    const { keyword, t } = props
    const dataListStaff = useSelector(StaffListSelector)
    const totalElements = useSelector(totalElementsSelector)
    const dataItem = useSelector(staffItemSelector)
    const renderPage = useSelector(updatePageSelector)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [shouldOpenDialogView, setShouldOpenDialogView] = useState(false)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [dataStaffPending, setDataStaffPending] = useState({})
    const dispatch = useDispatch()

    const updatePage = () => {
        const objectPage = {
            keyword: keyword,
            pageIndex: page + 1,
            pageSize: pageSize,
            listStatus: SUBMIT_MANAGER_STATUS.join(','),
        }
        dispatch(searchByPageAction(objectPage))
    }
    useEffect(() => {
        updatePage()
    }, [keyword, pageSize, page])
    useEffect(() => {
        if (renderPage) {
            updatePage()
            setShowEditDialog(false)
        }
    }, [renderPage])
    const handleOpenDialogView = (item) => {
        dispatch(getByEmployee({ employeeId: item?.id }))
        dispatch(getByEmployeeFamily({ employeeId: item?.id }))
        dispatch(setItemPage(item))
        setShouldOpenDialogView(true)
    }
    const handleUpdate = (item) => {
        setShowEditDialog(true)
        setDataStaffPending(item)
        dispatch(setItemPage(item))
    }
    const Action = (props) => {
        const item = props.item
        return (
            <div>
                <IconButton size="small" onClick={() => handleUpdate(item)}>
                    <EditIcon fontSize="small" color="primary" />
                </IconButton>
                <IconButton size="small" onClick={() => handleOpenDialogView(item)}>
                    <VisibilityIcon fontSize="small" color="secondary" />
                </IconButton>
            </div>
        )
    }
    let columns = [
        {
            title: 'Thao tác',
            field: 'custum',
            align: 'center',
            maxWidth: '100px',
            minWidth: '100px',
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
            maxWidth: '130px',
            minWidth: '130px',
        },
        {
            title: 'Tên nhân viên',
            field: 'name',
            align: 'center',
            maxWidth: '130px',
            minWidth: '130px',
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
            maxWidth: '100px',
            minWidth: '100px',
            render: (rowData) => {
                const nameGender = GENDER.find((item) => item.id === rowData?.gender)
                return nameGender ? nameGender?.name : ''
            },
        },
        {
            title: 'Nhóm',
            field: 'team',
            align: 'center',
            maxWidth: '130px',
            minWidth: '130px',
            render: (rowData) => {
                const nameTeam = TEMA.find((item) => item.id === rowData?.team)
                return nameTeam ? nameTeam?.name : ''
            },
        },
        {
            title: 'Điện thoại',
            field: 'phone',
            align: 'center',
            maxWidth: '110px',
            minWidth: '110px',
        },
        {
            title: 'Địa chỉ',
            field: 'address',
            align: 'center',
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
            <Grid>
                {showEditDialog && (
                    <FormEndStaff
                        t={t}
                        open={showEditDialog}
                        handleCloseDialog={() => setShowEditDialog(false)}
                        isOpenPending={true}
                    />
                )}
                {shouldOpenDialogView && (
                    <RegisterStaffDialog
                        open={shouldOpenDialogView}
                        handleCloseRegister={() => setShouldOpenDialogView(false)}
                        t={t}
                        isOpenAction={true}
                        dataItemStaff={dataItem}
                    />
                )}
            </Grid>
            <CustomTable
                columns={columns}
                data={dataListStaff}
                totalElements={totalElements}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default PendingApproval
