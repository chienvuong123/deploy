import CustomTable from 'app/froms/CustomTable'
import React, { useEffect, useState } from 'react'
import { Grid, Button, IconButton, MenuItem } from '@material-ui/core'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Notifications as NotificationsIcon,
} from '@material-ui/icons'
import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator'
import moment from 'moment'
import { getStatusNameById, today } from 'app/component/validateFroms'
import {
    STAFF_POSITION,
    STATUS_ADDITIONAL,
    STATUS_EDIT_PROCESS,
    STATUS_REJECT,
    STATUS_REMOVE,
    STATUS_VIEW_PROCESS,
} from 'app/constants/StaffConstant'
import { addProcess, deleteProcess, getByEmployeeIdProcess, updateProcess } from 'app/redux/actions/ProcessActions'
import { processItemSelector, processSelector, renderPageProcessSelector } from 'app/redux/selector/ProcessSelector'
import StatusStaffDialog from 'app/views/AddStaff/StatusStaffDialog'
import { ConfirmationDialog } from 'egret'
import ManageSendLeader from '../ManageSendLeader'
import { useDispatch, useSelector } from 'react-redux'
import FormSalary from 'app/views/CustomForms/FormSalary'
import FormProcess from 'app/views/CustomForms/FormProcess'

const TabPromotion = (props) => {
    const { t, item } = props
    const data = useSelector(processSelector)
    const dataItem = useSelector(processItemSelector)
    const renderPage = useSelector(renderPageProcessSelector)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const [process, setProcess] = useState({})
    const [id, setId] = useState()
    const [shouldConfirDialog, setShouldConfirDialog] = useState(false)
    const [shouldOpenDialogReject, setShouldOpenDialogReject] = useState(false)
    const [shouldOpenDialogAdditional, setShouldOpenDialogAdditional] = useState(false)
    const [shouldOpenSendLeader, setShouldOpenSendLeader] = useState(false)
    const [shouldOpenDialogView, setShouldOpenDialogView] = useState(false)
    const dispatch = useDispatch()
    const updatePage = () => {
        const objectPage = {
            pageIndex: page + 1,
            pageSize: pageSize,
            employeeId: item?.id,
        }
        dispatch(getByEmployeeIdProcess(objectPage))
    }
    useEffect(() => {
        updatePage()
    }, [page, pageSize])
    useEffect(() => {
        if (renderPage) updatePage()
    }, [renderPage])
    const handleEditProcess = (item) => {
        setProcess(item)
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setProcess({
            ...process,
            [name]: value,
        })
    }
    const onClear = () => {
        setProcess()
    }
    const handleOpenDialogView = (item) => {
        setProcess(item)
        setShouldOpenDialogView(true)
    }
    const handleShowReject = (item) => {
        setProcess(item)
        setShouldOpenDialogReject(true)
    }
    const handleAdditional = (item) => {
        setProcess(item)
        setShouldOpenDialogAdditional(true)
    }
    const handleSubmit = () => {
        if (process?.id) {
            dispatch(updateProcess(process))
            handleOpenDialogView(process)
        } else {
            dispatch(
                addProcess({
                    process: process,
                    employeeId: item?.id,
                }),
            )
            setProcess()
        }
    }
    const handleDelete = (item) => {
        setId(item)
        setShouldConfirDialog(true)
    }
    const removeProcess = () => {
        dispatch(deleteProcess(id))
        setShouldConfirDialog(false)
    }

    const Action = (props) => {
        const item = props.item
        return (
            <div>
                {STATUS_EDIT_PROCESS.join(',').includes(item.processStatus) && (
                    <IconButton size="small" onClick={() => handleEditProcess(item)}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                )}
                {STATUS_REMOVE.join(',').includes(item.processStatus) && (
                    <IconButton size="small" onClick={() => handleDelete(item)}>
                        <DeleteIcon className="color-red" fontSize="small" />
                    </IconButton>
                )}
                {STATUS_VIEW_PROCESS.join(',').includes(item.processStatus) && (
                    <IconButton size="small">
                        <VisibilityIcon color="secondary" fontSize="small" onClick={() => handleOpenDialogView(item)} />
                    </IconButton>
                )}
                {STATUS_REJECT.join(',').includes(item.processStatus) && (
                    <IconButton size="small">
                        <NotificationsIcon color="secondary" fontSize="small" onClick={() => handleShowReject(item)} />
                    </IconButton>
                )}
                {STATUS_ADDITIONAL.join(',').includes(item.processStatus) && (
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
            title: 'Ngày thăng chức',
            field: 'promotionDay',
            align: 'center',
            render: (rowData) => moment(rowData?.dateOfBirth).format('YYYY-MM-DD'),
        },
        {
            title: 'Chức vụ hiện tại',
            field: 'currentPosition',
            align: 'center',
            render: (rowData) => STAFF_POSITION.find((item) => item.id === rowData?.currentPosition)?.name,
        },
        {
            title: 'Chức vụ đề xuất',
            field: 'newPosition',
            align: 'center',
            render: (rowData) => STAFF_POSITION.find((item) => item.id === rowData?.newPosition)?.name,
        },
        {
            title: 'Ghi chú',
            field: 'note',
            align: 'center',
        },
        {
            title: 'Trạng thái',
            field: 'processStatus',
            align: 'center',
            render: (rowData) => getStatusNameById(rowData?.processStatus),
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
                                    Ngày thăng chức
                                </span>
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: today,
                            }}
                            type="date"
                            name="promotionDay"
                            value={process?.promotionDay ? moment(process?.promotionDay).format('YYYY-MM-DD') : ''}
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                            size="small"
                        />
                    </Grid>
                    <Grid item lg={2} md={2}>
                        <SelectValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Chức vụ hiện tại
                                </span>
                            }
                            inputProps={{
                                readOnly: true,
                            }}
                            type="text"
                            name="currentPosition"
                            value={process?.currentPosition ?? 1}
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                            errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                            size="small"
                        >
                            {STAFF_POSITION?.map((item) => {
                                return (
                                    <MenuItem key={item?.id} value={item?.id}>
                                        {`${item?.name}`}
                                    </MenuItem>
                                )
                            })}
                        </SelectValidator>
                    </Grid>
                    <Grid item lg={2} md={2}>
                        <SelectValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Chức vụ đề xuất
                                </span>
                            }
                            type="text"
                            name="newPosition"
                            value={process?.newPosition || ''}
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                            errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                            size="small"
                        >
                            {STAFF_POSITION?.map((item) => {
                                return (
                                    <MenuItem key={item?.id} value={item?.id}>
                                        {`${item?.name}`}
                                    </MenuItem>
                                )
                            })}
                        </SelectValidator>
                    </Grid>

                    <Grid item lg={4} md={4}>
                        <TextValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Ghi chú
                                </span>
                            }
                            name="note"
                            value={process?.note || ''}
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
                    onYesClick={removeProcess}
                    text={t('general.deleteConfirm')}
                    Yes={t('general.Yes')}
                    No={t('general.cancel')}
                />
            )}
            {shouldOpenDialogReject && (
                <StatusStaffDialog
                    open={shouldOpenDialogReject}
                    handleStatusClose={() => setShouldOpenDialogReject(false)}
                    note={process?.reasonForRefusal}
                    title={'Lý do từ chối'}
                />
            )}
            {shouldOpenDialogAdditional && (
                <StatusStaffDialog
                    open={shouldOpenDialogReject}
                    handleStatusClose={() => setShouldOpenDialogAdditional(false)}
                    note={process?.additionalRequest}
                    title={'Yêu cầu bổ sung'}
                />
            )}
            {shouldOpenDialogView && (
                <FormProcess
                    open={shouldOpenDialogView}
                    handleCloseDialog={() => setShouldOpenDialogView(false)}
                    processData={process}
                    staff={item}
                    dataItem={process}
                    t={t}
                />
            )}
            {shouldOpenSendLeader && (
                <ManageSendLeader
                    open={shouldConfirDialog}
                    handleCloseParentDialog={() => setShouldOpenSendLeader(false)}
                    t={t}
                    itemData={dataItem}
                    isProcess={true}
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

export default TabPromotion
