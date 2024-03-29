import React, { useEffect, useState } from 'react'
import { Grid, Button, IconButton, MenuItem } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import { useDispatch, useSelector } from 'react-redux'
import { addStaffAction, setStaffImage, updateStaffAction } from 'app/redux/actions/StaffAction'
import { toast } from 'react-toastify'
import { GENDER, TEMA } from 'app/constants/StaffConstant'
import { fileSelector, imageSelector, staffItemSelector } from 'app/redux/selector/StaffSelector'
import { today, TYPE_ADDRESS, TYPE_EMAIL, TYPE_NAME } from 'app/component/validateFroms'
import moment from 'moment'

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})

const Information = (props) => {
    const { formRef, t } = props
    const dataStaff = useSelector(staffItemSelector)
    const [staffInformation, setStaffInformation] = useState(dataStaff)
    const imagePage = useSelector(imageSelector)
    const file = useSelector(fileSelector)
    const dispatch = useDispatch()
    const isValidFileSize = (file) => {
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                return false
            }
        }
        return true
    }
    const isImage = (file) => {
        if (file) {
            const imageTypes = ['image/jpeg', 'image/png', 'image/gif']
            if (imageTypes.indexOf(file.type) === -1) {
                return false
            }
        }
        return true
    }
    const onChange = (e) => {
        switch (e.target.name) {
            case 'image':
                const file = e.target.files[0]
                if (!isImage(file)) {
                    toast.error(t('staff.noti.isNotImage'))
                } else if (!isValidFileSize(file)) {
                    toast.error(t('staff.noti.inValidFileSize'))
                } else {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        dispatch(setStaffImage(reader.result, file))
                    }
                    if (file) {
                        reader.readAsDataURL(file)
                    }
                }
                break

            default:
                setStaffInformation({
                    ...staffInformation,
                    [e.target.name]: e.target.value,
                })
        }
    }
    const handleSubmitStaff = () => {
        const lodash = require('lodash')
        if (lodash.isEqual(staffInformation, props?.item) && props?.item?.image === imagePage) {
            console.log('đã thay đổi')
        } else {
            if (staffInformation.id) {
                dispatch(updateStaffAction(staffInformation, file))
            } else {
                dispatch(addStaffAction(staffInformation, file))
            }
        }
    }
    useEffect(() => {
        ValidatorForm.addValidationRule('isValidCitizenIdentificationNumber', (value) => {
            return value.length === 9 || value.length === 12
        })
        ValidatorForm.addValidationRule('isValidBirthday', (value) => {
            const birthDate = new Date(value)
            const currentDate = new Date()
            const age = currentDate.getFullYear() - birthDate.getFullYear()

            return age >= 18
        })
        return () => {
            ValidatorForm.removeValidationRule('isValidCitizenIdentificationNumber')
            ValidatorForm.removeValidationRule('isValidBirthday')
        }
    }, [])
    return (
        <div>
            <ValidatorForm ref={formRef} onSubmit={handleSubmitStaff}>
                <Grid container spacing={2} justify="space-between">
                    <Grid container className="cols" justify="center" md={4} lg={4}>
                        <label htmlFor="image-upload-input">
                            <img
                                src={
                                    imagePage ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
                                }
                                alt="anh dai dien"
                                className="image"
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            name="image"
                            style={{ display: 'none' }}
                            onChange={(e) => onChange(e)}
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton component="span">
                                <PhotoCamera color="secondary" />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid container spacing={2} md={8} lg={8}>
                        <Grid item md={4} lg={4}>
                            <TextValidator
                                className="w-100 mb-4"
                                label={
                                    <span>
                                        <span className="text-red">*</span>
                                        Mã nhân viên
                                    </span>
                                }
                                type="text"
                                size="small"
                                value={staffInformation?.code || ''}
                                name="code"
                                onChange={(e) => onChange(e)}
                                validators={[
                                    'required',
                                    'matchRegexp:^(?!\\s*$).+',
                                    'matchRegexp:^NV[A-Za-z0-9]{5,10}$',
                                ]}
                                errorMessages={[
                                    t('staff.noti.error_required'),
                                    t('staff.noti.error_space'),
                                    `${t('staff.noti.error_format') + ' (VD: NV...)'}`,
                                ]}
                            />
                        </Grid>
                        <Grid item md={4} lg={4}>
                            <TextValidator
                                className="w-100 mb-4"
                                label={
                                    <span>
                                        <span className="text-red">*</span>
                                        Tên nhân viên
                                    </span>
                                }
                                type="text"
                                size="small"
                                value={staffInformation?.name || ''}
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
                                value={staffInformation?.gender || 0}
                                name="gender"
                                onChange={(e) => onChange(e)}
                                validators={['required']}
                                errorMessages={[t('staff.noti.error_required')]}
                            >
                                {GENDER?.map((item) => {
                                    return (
                                        <MenuItem key={item?.id} value={item?.id}>
                                            {`${item?.name}`}
                                        </MenuItem>
                                    )
                                })}
                            </SelectValidator>
                        </Grid>
                        <Grid item lg={4} md={4}>
                            <SelectValidator
                                className="w-100 mb-4"
                                label={
                                    <span>
                                        <span className="text-red">*</span>
                                        Nhóm
                                    </span>
                                }
                                type="text"
                                size="small"
                                value={staffInformation?.team || 0}
                                name="team"
                                onChange={(e) => onChange(e)}
                                validators={['required']}
                                errorMessages={[t('staff.noti.error_required')]}
                            >
                                {TEMA?.map((item) => {
                                    return (
                                        <MenuItem key={item?.id} value={item?.id}>
                                            {`${item?.name}`}
                                        </MenuItem>
                                    )
                                })}
                            </SelectValidator>
                        </Grid>
                        <Grid item md={4} lg={4}>
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
                                value={staffInformation?.email || ''}
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
                        <Grid item md={4} lg={4}>
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
                                value={staffInformation?.phone || ''}
                                name="phone"
                                onChange={(e) => onChange(e)}
                                validators={['required', 'matchRegexp:^(?!\\s*$).+', 'matchRegexp:^[0-9]{10}$']}
                                errorMessages={[
                                    t('staff.noti.error_required'),
                                    t('staff.noti.error_space'),
                                    t('staff.noti.error_format'),
                                ]}
                            />
                        </Grid>
                        <Grid item md={4} lg={4}>
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
                                value={
                                    staffInformation?.dateOfBirth
                                        ? moment(staffInformation?.dateOfBirth).format('YYYY-MM-DD')
                                        : ''
                                }
                                name="dateOfBirth"
                                onChange={(e) => onChange(e)}
                                validators={['required', 'isValidBirthday']}
                                errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_age')]}
                            />
                        </Grid>
                        <Grid item md={4} lg={4}>
                            <TextValidator
                                className="w-100 mb-4"
                                label={
                                    <span>
                                        <span className="text-red">*</span>
                                        CCCD/CMTND
                                    </span>
                                }
                                type="number"
                                size="small"
                                value={staffInformation?.citizenIdentificationNumber || ''}
                                name="citizenIdentificationNumber"
                                onChange={(e) => onChange(e)}
                                validators={['required', 'isValidCitizenIdentificationNumber']}
                                errorMessages={[t('staff.noti.error_required'), t('staff.noti.error_CCCD')]}
                            />
                        </Grid>
                        <Grid item md={4} lg={4}>
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
                                value={
                                    staffInformation?.dateOfIssuanceCard
                                        ? moment(staffInformation?.dateOfIssuanceCard).format('YYYY-MM-DD')
                                        : ''
                                }
                                name="dateOfIssuanceCard"
                                onChange={(e) => onChange(e)}
                                validators={['required']}
                                errorMessages={[t('staff.noti.error_required')]}
                            />
                        </Grid>
                        <Grid item md={4} lg={4}>
                            <TextValidator
                                className="w-100 mb-4"
                                label={
                                    <span>
                                        <span className="text-red">*</span>
                                        Nơi cấp
                                    </span>
                                }
                                type="text"
                                size="small"
                                value={staffInformation?.placeOfIssueCard || ''}
                                name="placeOfIssueCard"
                                onChange={(e) => onChange(e)}
                                validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_ADDRESS}`]}
                                errorMessages={[
                                    t('staff.noti.error_required'),
                                    t('staff.noti.error_space'),
                                    t('staff.noti.error_format'),
                                ]}
                            />
                        </Grid>
                        <Grid item md={4} lg={4}>
                            <TextValidator
                                className="w-100 mb-4"
                                label={
                                    <span>
                                        <span className="text-red">*</span>
                                        Dân tộc
                                    </span>
                                }
                                type="text"
                                size="small"
                                value={staffInformation?.ethnic || ''}
                                name="ethnic"
                                onChange={(e) => onChange(e)}
                                validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_NAME}`]}
                                errorMessages={[
                                    t('staff.noti.error_required'),
                                    t('staff.noti.error_space'),
                                    t('staff.noti.error_format'),
                                ]}
                            />
                        </Grid>
                        <Grid item md={4} lg={4}>
                            <TextValidator
                                className="w-100 mb-4"
                                label={
                                    <span>
                                        <span className="text-red">*</span>
                                        Tôn giáo
                                    </span>
                                }
                                type="text"
                                size="small"
                                value={staffInformation?.religion || ''}
                                name="religion"
                                onChange={(e) => onChange(e)}
                                validators={['required', 'matchRegexp:^(?!\\s*$).+', `matchRegexp:${TYPE_NAME}`]}
                                errorMessages={[
                                    t('staff.noti.error_required'),
                                    t('staff.noti.error_space'),
                                    t('staff.noti.error_format'),
                                ]}
                            />
                        </Grid>
                        <Grid item md={8} lg={8}>
                            <TextValidator
                                className="w-100"
                                label={
                                    <span>
                                        <span className="text-red">*</span>
                                        Địa chỉ
                                    </span>
                                }
                                type="text"
                                size="small"
                                value={staffInformation?.address || ''}
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
                    </Grid>
                </Grid>
            </ValidatorForm>
        </div>
    )
}

export default Information
