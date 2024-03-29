import CustomTable from 'app/froms/CustomTable'
import React, { useEffect, useState } from 'react'
import { Grid, Button, IconButton } from '@material-ui/core'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Notifications as NotificationsIcon,
} from '@material-ui/icons'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import moment from 'moment'
import { getStatusNameById, today } from 'app/component/validateFroms'
import { useDispatch, useSelector } from 'react-redux'
import { addSalary, deleteSalary, getByEmployeeId, updateSalary } from 'app/redux/actions/SalaryIncreaseActions'
import {
    dataSalaryItemSelector,
    dataSalarySelector,
    renderPageSalarySelector,
} from 'app/redux/selector/SalaryIncreaseSelector'
import {
    STATUS_ADDITIONAL,
    STATUS_EDIT_PROCESS,
    STATUS_REJECT,
    STATUS_REMOVE,
    STATUS_VIEW_PROCESS,
} from 'app/constants/StaffConstant'
import { ConfirmationDialog } from 'egret'
import StatusStaffDialog from 'app/views/AddStaff/StatusStaffDialog'
import FormSalary from 'app/views/CustomForms/FormSalary'
const TabSalaryIncrease = (props) => {
    const { t, item } = props
    const data = useSelector(dataSalarySelector)
    const renderPage = useSelector(renderPageSalarySelector)
    console.log(renderPage)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const [salaryIncrease, setSalaryIncrease] = useState({})
    console.log(salaryIncrease)
    const [id, setId] = useState()
    const [shouldConfirDialog, setShouldConfirDialog] = useState(false)
    const [shouldOpenDialogReject, setShouldOpenDialogReject] = useState(false)
    const [shouldOpenDialogAdditional, setShouldOpenDialogAdditional] = useState(false)
    const [shouldOpenDialogView, setShouldOpenDialogView] = useState(false)
    const dispatch = useDispatch()
    const updatePage = () => {
        const objectPage = {
            pageIndex: page + 1,
            pageSize: pageSize,
            employeeId: item?.id,
        }
        dispatch(getByEmployeeId(objectPage))
    }
    useEffect(() => {
        updatePage()
    }, [page, pageSize])
    useEffect(() => {
        if (renderPage) updatePage()
    }, [renderPage])
    const handleEditSalary = (item) => {
        setSalaryIncrease(item)
    }
    const onChange = (e) => {
        const { name, value } = e.target
        setSalaryIncrease({
            ...salaryIncrease,
            [name]: value,
        })
    }
    const onClear = () => {
        setSalaryIncrease()
    }
    const handleShowReject = (item) => {
        setSalaryIncrease(item)
        setShouldOpenDialogReject(true)
    }
    const handleAdditional = (item) => {
        setSalaryIncrease(item)
        setShouldOpenDialogAdditional(true)
    }
    const handleOpenDialogView = (item) => {
        setSalaryIncrease(item)
        setShouldOpenDialogView(true)
    }
    const handleSubmit = () => {
        if (salaryIncrease?.id) {
            dispatch(updateSalary(salaryIncrease))
            handleOpenDialogView(salaryIncrease)
        } else {
            dispatch(
                addSalary({
                    salaryIncrease: salaryIncrease,
                    employeeId: item?.id,
                }),
            )
            setSalaryIncrease()
        }
    }
    const handleDelete = (item) => {
        setId(item)
        setShouldConfirDialog(true)
    }
    const removeSalary = () => {
        dispatch(deleteSalary(id))
        setShouldConfirDialog(false)
    }
    const Action = (props) => {
        const item = props.item
        return (
            <div>
                {STATUS_EDIT_PROCESS.join(',').includes(item.salaryIncreaseStatus) && (
                    <IconButton size="small" onClick={() => handleEditSalary(item)}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                )}
                {STATUS_REMOVE.join(',').includes(item.salaryIncreaseStatus) && (
                    <IconButton size="small" onClick={() => handleDelete(item)}>
                        <DeleteIcon className="color-red" fontSize="small" />
                    </IconButton>
                )}
                {STATUS_VIEW_PROCESS.join(',').includes(item.salaryIncreaseStatus) && (
                    <IconButton size="small">
                        <VisibilityIcon color="secondary" fontSize="small" onClick={() => handleOpenDialogView(item)} />
                    </IconButton>
                )}
                {STATUS_REJECT.join(',').includes(item.salaryIncreaseStatus) && (
                    <IconButton size="small">
                        <NotificationsIcon color="secondary" fontSize="small" onClick={() => handleShowReject(item)} />
                    </IconButton>
                )}
                {STATUS_ADDITIONAL.join(',').includes(item.salaryIncreaseStatus) && (
                    <IconButton size="small">
                        <NotificationsIcon color="secondary" fontSize="small" onClick={() => handleAdditional(item)} />
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
            title: 'Ngày tăng lương',
            field: 'startDate',
            align: 'center',
            maxWidth: '130px',
            minWidth: '130px',
            render: (rowData) => moment(rowData?.startDate).format('YYYY-MM-DD'),
        },
        {
            title: 'Mức lương cũ',
            field: 'oldSalary',
            align: 'center',
            maxWidth: '110px',
            minWidth: '110px',
            render: (rowData) => `${rowData?.oldSalary.toLocaleString()} VNĐ`,
        },
        {
            title: 'Mức lương mới',
            field: 'newSalary',
            align: 'center',
            maxWidth: '110px',
            minWidth: '110px',
            render: (rowData) => `${rowData?.newSalary.toLocaleString()} VNĐ`,
        },
        {
            title: 'Lý do',
            field: 'reason',
            align: 'center',
            maxWidth: '240px',
            minWidth: '240px',
        },
        {
            title: 'Trạng thái',
            field: 'salaryIncreaseStatus',
            align: 'center',
            maxWidth: '150px',
            minWidth: '150px',
            render: (rowData) => getStatusNameById(rowData?.salaryIncreaseStatus),
        },
    ]
    return (
        <div className="s-sm-24 mt-4">
            <ValidatorForm onSubmit={handleSubmit}>
                <Grid container spacing={2} lg={12} md={12}>
                    <Grid item lg={2} md={2}>
                        <TextValidator
                            className="w-100 mb-2"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Ngày tăng lương
                                </span>
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: today,
                            }}
                            type="date"
                            name="startDate"
                            value={
                                salaryIncrease?.startDate ? moment(salaryIncrease?.startDate).format('YYYY-MM-DD') : ''
                            }
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                            size="small"
                        />
                    </Grid>
                    <Grid item lg={2} md={2}>
                        <TextValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Mức lương cũ
                                </span>
                            }
                            type="number"
                            name="oldSalary"
                            value={salaryIncrease?.oldSalary || ''}
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                            errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                            size="small"
                        />
                    </Grid>
                    <Grid item lg={2} md={2}>
                        <TextValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Mức lương mong muốn
                                </span>
                            }
                            name="newSalary"
                            type="number"
                            value={salaryIncrease?.newSalary || ''}
                            onChange={(e) => onChange(e)}
                            validators={[
                                'required',
                                'matchRegexp:^(?!\\s*$).+',
                                `minNumber:${salaryIncrease?.oldSalary}`,
                            ]}
                            errorMessages={[
                                t('staff.noti.error_required'),
                                t('staff.noti.error_space'),
                                'Lương mới phải lớn hơn lương cũ',
                            ]}
                            size="small"
                        />
                    </Grid>
                    <Grid item lg={2} md={2}>
                        <TextValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Lý do
                                </span>
                            }
                            name="reason"
                            value={salaryIncrease?.reason || ''}
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                            errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                            size="small"
                        />
                    </Grid>
                    <Grid item lg={2} md={2}>
                        <TextValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Ghi chú
                                </span>
                            }
                            name="note"
                            value={salaryIncrease?.note || ''}
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                            errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                            size="small"
                        />
                    </Grid>
                    <Grid item lg={2} md={2} spacing={2}>
                        <Button variant="contained" color="primary" type="submit">
                            Lưu
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClear}>
                            Hủy
                        </Button>
                    </Grid>
                </Grid>
            </ValidatorForm>
            {shouldConfirDialog && (
                <ConfirmationDialog
                    title={t('general.confirm')}
                    t={t}
                    open={shouldConfirDialog}
                    onConfirmDialogClose={() => setShouldConfirDialog(false)}
                    onYesClick={removeSalary}
                    text={t('general.deleteConfirm')}
                    Yes={t('general.Yes')}
                    No={t('general.cancel')}
                />
            )}
            {shouldOpenDialogReject && (
                <StatusStaffDialog
                    open={shouldOpenDialogReject}
                    handleStatusClose={() => setShouldOpenDialogReject(false)}
                    note={salaryIncrease?.reasonForRefusal}
                    title={'Lý do từ chối'}
                />
            )}
            {shouldOpenDialogAdditional && (
                <StatusStaffDialog
                    open={shouldOpenDialogReject}
                    handleStatusClose={() => setShouldOpenDialogAdditional(false)}
                    note={salaryIncrease?.additionalRequest}
                    title={'Yêu cầu bổ sung'}
                />
            )}

            {shouldOpenDialogView && (
                <FormSalary
                    open={shouldOpenDialogView}
                    handleCloseDialog={() => setShouldOpenDialogView(false)}
                    dataSalaryIncrease={salaryIncrease}
                    staff={item}
                    dataItem={salaryIncrease}
                    t={t}
                />
            )}
            <div className="mt-6">
                <CustomTable
                    columns={columns}
                    data={data}
                    totalElements={data?.length || 0}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    )
}

export default TabSalaryIncrease
