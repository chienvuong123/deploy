import CustomTable from 'app/froms/CustomTable'
import moment from 'moment'
import { IconButton, Grid } from '@material-ui/core'
import { Edit as EditIcon, Visibility as VisibilityIcon } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { dataSalarySelector, renderPageSalarySelector } from 'app/redux/selector/SalaryIncreaseSelector'
import { getByCurrentLeaderSalaryAction } from 'app/redux/actions/SalaryIncreaseActions'
import RegisterStaffDialog from 'app/views/RegisterStaff/RegisterStaffDialog'
import { getByIdStaffAction } from 'app/redux/actions/StaffAction'
import { staffItemSelector } from 'app/redux/selector/StaffSelector'
import { getByEmployee } from 'app/redux/actions/CertificateActions'
import { getByEmployeeFamily } from 'app/redux/actions/FamilyActions'
import FormSalary from 'app/views/CustomForms/FormSalary'

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})
const PendingSalaryIncrease = (props) => {
    const { t } = props
    const salaryList = useSelector(dataSalarySelector)
    const renderPage = useSelector(renderPageSalarySelector)
    const dataItem = useSelector(staffItemSelector)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [salary, setSalary] = useState({})
    const [shouldOpenDialogView, setShouldOpenDialogView] = useState(false)
    const [shouldOpenDialog, setShouldOpenDialog] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getByCurrentLeaderSalaryAction())
    }, [])
    useEffect(() => {
        if (renderPage) {
            dispatch(getByCurrentLeaderSalaryAction())
            setShouldOpenDialog(false)
        }
    }, [renderPage])
    const handleUpdate = (item) => {
        dispatch(getByIdStaffAction(item?.employeeId))
        setSalary(item)
        setShouldOpenDialog(true)
    }
    const handleOpenDialogView = (item) => {
        dispatch(getByIdStaffAction(item?.employeeId))
        dispatch(getByEmployee({ employeeId: item?.employeeId }))
        dispatch(getByEmployeeFamily({ employeeId: item?.employeeId }))
        setShouldOpenDialogView(true)
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
            title: 'Ngày tăng lương',
            field: 'startDate',
            align: 'center',
            render: (rowData) => moment(rowData.dateOfBirth).format('YYYY-MM-DD'),
        },
        {
            title: 'Lương ban đầu',
            field: 'oldSalary',
            align: 'center',
            maxWidth: '100px',
            minWidth: '100px',
            render: (rowData) => `${rowData?.oldSalary.toLocaleString()} VNĐ`,
        },
        {
            title: 'Lương mong muốn',
            field: 'newSalary',
            align: 'center',
            maxWidth: '130px',
            minWidth: '130px',
            render: (rowData) => `${rowData?.newSalary.toLocaleString()} VNĐ`,
        },
        {
            title: 'Lý do',
            field: 'reason',
            align: 'center',
        },
    ]
    return (
        <div className="m-sm-24">
            <div>
                {shouldOpenDialogView && (
                    <RegisterStaffDialog
                        open={shouldOpenDialogView}
                        handleCloseRegister={() => setShouldOpenDialogView(false)}
                        t={t}
                        isOpenAction={true}
                        dataItemStaff={dataItem}
                    />
                )}
                {shouldOpenDialog && (
                    <FormSalary
                        open={shouldOpenDialog}
                        t={t}
                        handleCloseDialog={() => setShouldOpenDialog(false)}
                        staff={dataItem}
                        dataSalaryIncrease={salary}
                        isOpenAction={true}
                    />
                )}
            </div>
            <CustomTable
                columns={columns}
                data={salaryList}
                totalElements={salaryList?.length || 0}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default PendingSalaryIncrease
