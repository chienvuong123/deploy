import React, { useEffect, useState } from 'react'
import { Grid, Button, IconButton, MenuItem } from '@material-ui/core'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import CustomTable from 'app/froms/CustomTable'
import moment from 'moment'
import { FAMILY, GENDER } from 'app/constants/StaffConstant'
import { today, TYPE_ADDRESS, TYPE_EMAIL, TYPE_NAME } from 'app/component/validateFroms'
import { useDispatch, useSelector } from 'react-redux'
import { addFamily, deleteFamilyAction, getByEmployeeFamily, updateFamilyAction } from 'app/redux/actions/FamilyActions'
import { dataFamilySelector, renderPageFamilySelector } from 'app/redux/selector/FamilySelector'
import { ConfirmationDialog } from 'egret'
const Family = (props) => {
    const { t, staffItem } = props
    const renderPage = useSelector(renderPageFamilySelector)
    const dataFamily = useSelector(dataFamilySelector)
    const [family, setFamily] = useState({})
    const [data, setData] = useState({})
    const [shouldConfirmationDialog, setShouldConfirmationDialog] = useState(false)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const dispatch = useDispatch()

    const updatePage = () => {
        const object = {
            page: page,
            pageSize: pageSize,
            employeeId: staffItem?.id,
        }
        dispatch(getByEmployeeFamily(object))
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
        setFamily({
            ...family,
            [e.target.name]: e.target.value,
        })
    }
    const handleOpenConfirmationClose = () => {
        setShouldConfirmationDialog(false)
    }
    const handleEdit = (item) => {
        setFamily(item)
    }
    const handleDelete = (item) => {
        setData(item)
        setShouldConfirmationDialog(true)
    }
    const deleteFamil = () => {
        dispatch(deleteFamilyAction(data?.id))
        setShouldConfirmationDialog(false)
    }
    const handleSubmitFamily = () => {
        if (family?.id) {
            dispatch(updateFamilyAction(family))
            setFamily()
        } else {
            const obj = {
                family: family,
                employeeId: staffItem?.id,
            }
            dispatch(addFamily(obj))
            setFamily()
        }
    }
    useEffect(() => {
        if (family?.citizenIdentificationNumber) {
            ValidatorForm.addValidationRule('isValidCitizenIdentificationNumber', (value) => {
                return value.length === 9 || value.length === 12
            })
        }

        return () => {
            ValidatorForm.removeValidationRule('isValidCitizenIdentificationNumber')
        }
    }, [family?.citizenIdentificationNumber])

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
            maxWidth: '100px',
            minWidth: '100px',
            render: (rowData) => <Action item={rowData} />,
        },
        {
            title: 'STT',
            align: 'center',
            maxWidth: '90px',
            minWidth: '90px',
            render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
        },
        {
            title: 'Tên người thân',
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
            maxWidth: '100px',
            minWidth: '100px',
            render: (rowData) => {
                const nameGerder = GENDER.find((item) => item.id === rowData.gender)
                return nameGerder ? nameGerder.name : ''
            },
        },
        {
            title: 'Quan hệ',
            field: 'relationShip',
            align: 'center',
            maxWidth: '110px',
            minWidth: '110px',
            render: (rowData) => {
                const nameRelationShip = FAMILY.find((item) => item.id === rowData.relationShip)
                return nameRelationShip ? nameRelationShip.name : ''
            },
        },
        {
            title: 'Số điện thoại',
            field: 'phoneNumber',
            align: 'center',
        },
        {
            title: 'Địa chỉ',
            field: 'address',
            align: 'center',
            maxWidth: '180px',
            minWidth: '180px',
        },
    ]
    return (
        <div>
            <ValidatorForm onSubmit={handleSubmitFamily}>
                <Grid container spacing={2} lg={12} md={12}>
                    <Grid item lg={4} md={4}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Tên người thân
                                </span>
                            }
                            type="text"
                            size="small"
                            value={family?.name || ''}
                            name="name"
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
                        <SelectValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Giới tính
                                </span>
                            }
                            type="text"
                            size="small"
                            value={family?.gender || 0}
                            name="gender"
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                        >
                            {GENDER.map((item) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {`${item.name}`}
                                    </MenuItem>
                                )
                            })}
                        </SelectValidator>
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Ngày sinh
                                </span>
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            type="date"
                            size="small"
                            value={family?.dateOfBirth ? moment(family?.dateOfBirth).format('YYYY-MM-DD') : ''}
                            name="dateOfBirth"
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <SelectValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Quan hệ
                                </span>
                            }
                            type="text"
                            size="small"
                            value={family?.relationShip || 0}
                            name="relationShip"
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={[t('staff.noti.error_required')]}
                        >
                            {FAMILY.map((item) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {`${item.name}`}
                                    </MenuItem>
                                )
                            })}
                        </SelectValidator>
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Số CCCD/CMTND
                                </span>
                            }
                            type="number"
                            size="small"
                            value={family?.citizenIdentificationNumber || ''}
                            name="citizenIdentificationNumber"
                            onChange={(e) => onChange(e)}
                            validators={['required', 'isValidCitizenIdentificationNumber']}
                            errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_CCCD')]}
                        />
                    </Grid>
                    <Grid item lg={4} md={4}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Số điện thoại
                                </span>
                            }
                            type="number"
                            size="small"
                            value={family?.phoneNumber || ''}
                            name="phoneNumber"
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+', 'matchRegexp:^[0-9]{10}$']}
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
                                    Email
                                </span>
                            }
                            type="text"
                            size="small"
                            value={family?.email || ''}
                            name="email"
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_EMAIL}`]}
                            errorMessages={[
                                t('staff.noti.error_required'),
                                t('staff.noti.error_space'),
                                t('staff.noti.error_format'),
                            ]}
                        />
                    </Grid>
                    <Grid item lg={6} md={6}>
                        <TextValidator
                            className="w-100 mb-4"
                            label={
                                <span>
                                    <span className="text-red">*</span>
                                    Địa chỉ
                                </span>
                            }
                            type="text"
                            size="small"
                            value={family?.address || ''}
                            name="address"
                            onChange={(e) => onChange(e)}
                            validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_ADDRESS}`]}
                            errorMessages={[
                                t('staff.noti.error_required'),
                                t('staff.noti.error_space'),
                                t('staff.noti.error_format'),
                            ]}
                        />
                    </Grid>
                    <Grid container spacing={1} lg={2} md={2}>
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
                            onYesClick={deleteFamil}
                            text={t('general.deleteConfirm')}
                            Yes={t('general.Yes')}
                            No={t('general.cancel')}
                        />
                    )}
                </div>
            </Grid>
            <CustomTable
                columns={columns}
                data={dataFamily}
                totalElements={dataFamily?.length}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default Family
