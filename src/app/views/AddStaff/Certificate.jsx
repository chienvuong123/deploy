import CustomTable from 'app/froms/CustomTable'
import React, { useState, useEffect } from 'react'
import { Grid, Button, IconButton } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import moment from 'moment'
import { today, TYPE_NAME } from 'app/component/validateFroms'
import { useDispatch, useSelector } from 'react-redux'
import {
    addCertificate,
    deleteCertificateAction,
    getByEmployee,
    updateCertificateAction,
} from 'app/redux/actions/CertificateActions'
import { dataCertificateSelector, renderPageSelector } from 'app/redux/selector/CertificateSelector'
import { ConfirmationDialog } from 'egret'
const Certificate = (props) => {
    const { t, staffItem } = props
    const dataByEmployee = useSelector(dataCertificateSelector)
    const renderPage = useSelector(renderPageSelector)
    const [certificate, setCertificate] = useState({})
    const [data, setData] = useState({})
    const [shouldConfirmationDialog, setShouldConfirmationDialog] = useState()
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const dispatch = useDispatch()
    const updatePage = () => {
        const objectPage = {
            page: page,
            pageSize: pageSize,
            employeeId: staffItem?.id,
        }
        dispatch(getByEmployee(objectPage))
    }

    useEffect(() => {
        updatePage()
    }, [page, pageSize])
    useEffect(() => {
        if (renderPage) {
            updatePage()
        }
    }, [renderPage])
    const onChange = (e) => {
        setCertificate({
            ...certificate,
            [e.target.name]: e.target.value,
        })
    }
    const handleOpenConfirmationClose = () => {
        setShouldConfirmationDialog(false)
    }
    const handleEdit = (item) => {
        setCertificate(item)
    }
    const handleSubmitCertificate = () => {
        if (certificate?.id) {
            dispatch(updateCertificateAction(certificate))
            setCertificate()
        } else {
            const obj = {
                certificate: certificate,
                employeeId: staffItem?.id,
            }
            dispatch(addCertificate(obj))
            setCertificate()
        }
    }

    const handleDelete = (item) => {
        setData(item)
        setShouldConfirmationDialog(true)
    }
    const deleteCertificate = () => {
        dispatch(deleteCertificateAction(data?.id))
        setShouldConfirmationDialog(false)
    }
    const Action = (props) => {
        const item = props.item
        return (
            <div>
                <IconButton size="small" onClick={() => handleEdit(item)}>
                    <EditIcon color="primary" fontSize="small"></EditIcon>
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(item)}>
                    <DeleteIcon className="color-red" fontSize="small"></DeleteIcon>
                </IconButton>
            </div>
        )
    }
    let columns = [
        {
            title: 'Thao tác',
            field: 'custom',
            align: 'center',
            maxWidth: '120px',
            minWidth: '120px',
            render: (rowData) => <Action item={rowData} />,
        },
        {
            title: 'STT',
            align: 'center',
            maxWidth: '100px',
            minWidth: '100px',
            render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
        },
        {
            title: 'Tên chứng chỉ',
            field: 'certificateName',
            align: 'center',
            maxWidth: '140px',
            minWidth: '140px',
        },
        {
            title: 'Ngày cấp',
            field: 'issueDate',
            align: 'center',
            maxWidth: '120px',
            minWidth: '120px',
            render: (rowData) => moment(rowData.dateOfBirth).format('YYYY-MM-DD'),
        },
        {
            title: 'Lĩnh vực',
            field: 'field',
            align: 'center',
            maxWidth: '120px',
            minWidth: '120px',
        },
        {
            title: 'Nội dung',
            field: 'content',
            align: 'center',
        },
    ]

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmitCertificate}>
                <Grid container spacing={2} lg={12} md={12}>
                    <Grid item lg={4} md={4}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Tên chứng chỉ
                                </span>
                            }
                            type="text"
                            size="small"
                            value={certificate?.certificateName || ''}
                            name="certificateName"
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_NAME}`]}
                            errorMessages={[
                                t('staff.noti.error_required'),
                                t('staff.noti.error_space'),
                                t('staff.noti.error_format'),
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Ngày cấp
                                </span>
                            }
                            inputProps={{
                                max: today,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            type="date"
                            size="small"
                            value={certificate?.issueDate ? moment(certificate?.issueDate).format('YYYY-MM-DD') : ''}
                            name="issueDate"
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Lĩnh vực
                                </span>
                            }
                            type="text"
                            size="small"
                            value={certificate?.field || ''}
                            name="field"
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_NAME}`]}
                            errorMessages={[
                                t('staff.noti.error_required'),
                                t('staff.noti.error_space'),
                                t('staff.noti.error_format'),
                            ]}
                        />
                    </Grid>
                    <Grid item lg={8} md={8}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Nội dung
                                </span>
                            }
                            type="text"
                            size="small"
                            value={certificate?.content || ''}
                            name="content"
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+']}
                            errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_space')]}
                        />
                    </Grid>
                    <Grid container spacing={1} lg={4} md={4}>
                        <Grid item>
                            <Button variant="contained" color="primary" type="submit">
                                Thêm
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary">
                                Hủy
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </ValidatorForm>
            <Grid>
                <div>
                    {shouldConfirmationDialog && (
                        <ConfirmationDialog
                            title={t('general.confirm')}
                            t={t}
                            open={shouldConfirmationDialog}
                            onConfirmDialogClose={handleOpenConfirmationClose}
                            onYesClick={deleteCertificate}
                            text={t('general.deleteConfirm')}
                            Yes={t('general.Yes')}
                            No={t('general.cancel')}
                        />
                    )}
                </div>
            </Grid>
            <CustomTable
                columns={columns}
                totalElements={dataByEmployee?.length}
                data={dataByEmployee}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default Certificate
