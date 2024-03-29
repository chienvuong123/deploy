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
    STATUS_ADDITIONAL,
    STATUS_EDIT_PROCESS,
    STATUS_REJECT,
    STATUS_REMOVE,
    STATUS_VIEW_PROCESS,
    TYPE_PROPOSAL,
} from 'app/constants/StaffConstant'
import { useDispatch, useSelector } from 'react-redux'
import { addProposal, deleteProposal, getByEmployeeIdProposal, updateProposal } from 'app/redux/actions/ProposalAction'
import { proposalItemSelector, proposalSelector, renderPageProposalSelector } from 'app/redux/selector/ProposalSelector'
import StatusStaffDialog from 'app/views/AddStaff/StatusStaffDialog'
import ManageSendLeader from '../ManageSendLeader'
import { ConfirmationDialog } from 'egret'
import FormProposal from 'app/views/CustomForms/FormProposal'

const TabProposal = (props) => {
    const { t, item } = props
    const data = useSelector(proposalSelector)
    const dataItem = useSelector(proposalItemSelector)
    const renderPage = useSelector(renderPageProposalSelector)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const [proposal, setProposal] = useState({})
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
        dispatch(getByEmployeeIdProposal(objectPage))
    }
    useEffect(() => {
        updatePage()
    }, [page, pageSize])
    useEffect(() => {
        if (renderPage) updatePage()
    }, [renderPage])
    const handleEditProposal = (item) => {
        setProposal(item)
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setProposal({
            ...proposal,
            [name]: value,
        })
    }
    const onClear = () => {
        setProposal()
    }
    const handleOpenDialogView = (item) => {
        setProposal(item)
        setShouldOpenDialogView(true)
    }
    const handleShowReject = (item) => {
        setProposal(item)
        setShouldOpenDialogReject(true)
    }
    const handleAdditional = (item) => {
        setProposal(item)
        setShouldOpenDialogAdditional(true)
    }
    const handleSubmit = () => {
        if (proposal?.id) {
            dispatch(updateProposal(proposal))
            handleOpenDialogView(proposal)
        } else {
            dispatch(
                addProposal({
                    proposal: proposal,
                    employeeId: item?.id,
                }),
            )
            setProposal()
        }
    }
    const handleDelete = (item) => {
        setId(item)
        setShouldConfirDialog(true)
    }
    const removeProposal = () => {
        dispatch(deleteProposal(id))
        setShouldConfirDialog(false)
    }

    const Action = (props) => {
        const item = props.item
        return (
            <div>
                {STATUS_EDIT_PROCESS.join(',').includes(item.proposalStatus) && (
                    <IconButton size="small" onClick={() => handleEditProposal(item)}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                )}
                {STATUS_REMOVE.join(',').includes(item.proposalStatus) && (
                    <IconButton size="small" onClick={() => handleDelete(item)}>
                        <DeleteIcon className="color-red" fontSize="small" />
                    </IconButton>
                )}
                {STATUS_VIEW_PROCESS.join(',').includes(item.proposalStatus) && (
                    <IconButton size="small">
                        <VisibilityIcon color="secondary" fontSize="small" onClick={() => handleOpenDialogView(item)} />
                    </IconButton>
                )}
                {STATUS_REJECT.join(',').includes(item.proposalStatus) && (
                    <IconButton size="small">
                        <NotificationsIcon color="secondary" fontSize="small" onClick={() => handleShowReject(item)} />
                    </IconButton>
                )}
                {STATUS_ADDITIONAL.join(',').includes(item.proposalStatus) && (
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
            title: 'Ngày đề xuất',
            field: 'proposalDate',
            align: 'center',
            render: (rowData) => moment(rowData?.dateOfBirth).format('YYYY-MM-DD'),
        },
        {
            title: 'Loại đề xuất',
            field: 'type',
            align: 'center',
            render: (rowData) => {
                const nameType = TYPE_PROPOSAL.find((item) => item.id === rowData.type)
                return nameType ? nameType.name : ''
            },
        },
        {
            title: 'Nội dung',
            field: 'content',
            align: 'center',
        },
        {
            title: 'Mô tả',
            field: 'detailedDescription',
            align: 'center',
        },
        {
            title: 'Ghi chú',
            field: 'note',
            align: 'center',
        },
        {
            title: 'Trạng thái',
            field: 'proposalStatus',
            align: 'center',
            render: (rowData) => getStatusNameById(rowData?.proposalStatus),
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
                                    Ngày dề xuất
                                </span>
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: today,
                            }}
                            type="date"
                            name="proposalDate"
                            value={proposal?.proposalDate ? moment(proposal?.proposalDate).format('YYYY-MM-DD') : ''}
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
                                    Loại đề xuất
                                </span>
                            }
                            type="text"
                            name="type"
                            value={proposal?.type || ''}
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                            errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                            size="small"
                        >
                            {TYPE_PROPOSAL?.map((item) => {
                                return (
                                    <MenuItem key={item?.id} value={item?.id}>
                                        {`${item?.name}`}
                                    </MenuItem>
                                )
                            })}
                        </SelectValidator>
                    </Grid>
                    <Grid item lg={2} md={2}>
                        <TextValidator
                            className="w-100"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Nội dung
                                </span>
                            }
                            name="content"
                            value={proposal?.content || ''}
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
                                    Mô tả
                                </span>
                            }
                            name="detailedDescription"
                            value={proposal?.detailedDescription || ''}
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
                            value={proposal?.note || ''}
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
                    onYesClick={removeProposal}
                    text={t('general.deleteConfirm')}
                    Yes={t('general.Yes')}
                    No={t('general.cancel')}
                />
            )}
            {shouldOpenDialogReject && (
                <StatusStaffDialog
                    open={shouldOpenDialogReject}
                    handleStatusClose={() => setShouldOpenDialogReject(false)}
                    note={proposal?.reasonForRefusal}
                    title={'Lý do từ chối'}
                />
            )}
            {shouldOpenDialogAdditional && (
                <StatusStaffDialog
                    open={shouldOpenDialogReject}
                    handleStatusClose={() => setShouldOpenDialogAdditional(false)}
                    note={proposal?.additionalRequest}
                    title={'Yêu cầu bổ sung'}
                />
            )}
            {shouldOpenSendLeader && (
                <ManageSendLeader
                    open={shouldConfirDialog}
                    handleCloseParentDialog={() => setShouldOpenSendLeader(false)}
                    t={t}
                    itemData={dataItem}
                    isProposal={true}
                />
            )}
            {shouldOpenDialogView && (
                <FormProposal
                    open={shouldOpenDialogView}
                    handleCloseDialog={() => setShouldOpenDialogView(false)}
                    t={t}
                    staff={item}
                    dataProposal={proposal}
                    dataItem={dataItem}
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

export default TabProposal
