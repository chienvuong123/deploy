import React, { useEffect, useState } from 'react'
import '../../../../styles/views/_cv.scss'
import { IconButton, Icon, Fab, Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import ExperienceDialog from './ExperienceDialog'
import { ConfirmationDialog } from 'egret'
import moment from 'moment'
import { GENDER } from 'app/constants/StaffConstant'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExperience, getByEmployeeIdExperience } from 'app/redux/actions/ExperienceActions'
import { dataExprienceSelector, updatePageExprienceSelector } from 'app/redux/selector/ExprienceSelector'

const TabCV = (props) => {
    const { t, dataItemStaff, setDataStaff, dataStaff, isOpenAction } = props
    const dataListExprience = useSelector(dataExprienceSelector)
    const renderPageExprience = useSelector(updatePageExprienceSelector)
    const [shouldOpenDialogExperience, setShouldOpenDialogExperience] = useState(false)
    const [shouldConfirmationDialog, setShouldConfirmationDialog] = useState(false)
    const [isEditSkill, setIsEditSkill] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [isactivitie, setIsActivitie] = useState(false)
    const [exprience, setExperience] = useState({})
    const dispatch = useDispatch()

    const updatePage = () => {
        dispatch(getByEmployeeIdExperience(dataItemStaff))
    }
    useEffect(() => {
        updatePage()
    }, [dataItemStaff])
    useEffect(() => {
        if (renderPageExprience) {
            updatePage()
        }
    }, [renderPageExprience])
    const handleDialogExperienceClose = () => {
        setShouldOpenDialogExperience(false)
    }
    const handleShouldDialogExperience = () => {
        setShouldOpenDialogExperience(true)
    }
    const handleOpenConfirmation = (item) => {
        setExperience(item)
        setShouldConfirmationDialog(true)
    }
    const handleConfirmationClose = () => {
        setShouldConfirmationDialog(false)
    }
    const handleOpenEditExperience = (item) => {
        setExperience(item)
        setShouldOpenDialogExperience(true)
    }
    const handleEditExperience = (item) => {
        setIsEditSkill(true)
        setHidden(false)
    }
    const handleEditActivitie = () => {
        setIsActivitie(true)
        setHidden(false)
    }
    const handleDeleteExperience = () => {
        dispatch(deleteExperience(exprience?.id))
        setShouldConfirmationDialog(false)
    }
    const handleSubmitSkill = () => {
        setDataStaff({
            ...dataStaff,
            skill: dataStaff?.skill,
        })
        setIsEditSkill(false)
        setHidden(true)
    }
    const handleSubmitActivity = () => {
        setDataStaff({
            ...dataStaff,
            activity: dataStaff?.activity,
        })
        setIsActivitie(false)
        setHidden(true)
    }
    const handleChange = (event) => {
        setDataStaff({
            ...dataStaff,
            [event.target.name]: event.target.value,
        })
    }
    return (
        <div className="cv">
            <div className="left-content">
                <div className="cv-profile">
                    <div className="profile-avatar">
                        <img alt="avatar" src={dataItemStaff?.image || '/assets/images/avatar.jpg'} />
                    </div>
                    <p className="profile-email">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                        </svg>
                        <span>{dataItemStaff?.email}</span>
                    </p>
                    <p className="profile-phone">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            />
                        </svg>
                        <span>{dataItemStaff?.phone}</span>
                    </p>
                </div>
                <div className="cv-skills">
                    <h4 className="skills-tittle">
                        kỹ năng
                        {!isOpenAction && (
                            <IconButton size="small" onClick={handleEditExperience}>
                                <Icon fontSize="small" color="primary">
                                    edit
                                </Icon>
                            </IconButton>
                        )}
                    </h4>
                    <div>
                        {isEditSkill && (
                            <>
                                <ValidatorForm onSubmit={handleSubmitSkill}>
                                    <TextValidator
                                        multiline
                                        fullWidth
                                        className="mt-16 "
                                        name="skill"
                                        value={dataStaff?.skill || ''}
                                        onChange={handleChange}
                                        validators={['maxStringLength:1000']}
                                        errorMessages={[`${t('giới hạn')}(1000 kí tự)`]}
                                    />
                                    <Button
                                        className="mt-12 mr-12"
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        {t('general.save')}
                                    </Button>
                                    <Button
                                        className="mt-12 color-error"
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setIsEditSkill(false)}
                                    >
                                        {t('general.cancel')}
                                    </Button>
                                </ValidatorForm>
                            </>
                        )}
                    </div>
                    {hidden && <div>{dataStaff?.skill}</div>}
                    <ul className="skill-list"></ul>
                </div>
                <div className="cv-skill-rating">
                    <h4 className="skill-rating-tittle">Ngoại ngữ</h4>
                    <div className="skill-rating-content">
                        <div className="skill-rating-content-item">
                            <span>Tiếng anh</span>
                            <div className="rating-wrapper">
                                <div className="cv-rating"></div>
                                <div className="cv-rating"></div>
                                <div className="cv-rating"></div>
                            </div>
                        </div>
                        <div className="skill-rating-content-item">
                            <span>Tiếng trung</span>
                            <div className="rating-wrapper">
                                <div className="cv-rating"></div>
                                <div className="cv-rating"></div>
                                <div className="cv-rating rating-disabled"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cv-skill-rating">
                    <h4 className="skill-rating-tittle">Tin học</h4>
                    <div className="skill-rating-content">
                        <div className="skill-rating-content-item">
                            <span>Word</span>
                            <div className="rating-wrapper">
                                <div className="cv-rating"></div>
                                <div className="cv-rating"></div>
                                <div className="cv-rating"></div>
                            </div>
                        </div>
                        <div className="skill-rating-content-item">
                            <span>Excel</span>
                            <div className="rating-wrapper">
                                <div className="cv-rating"></div>
                                <div className="cv-rating"></div>
                                <div className="cv-rating rating-disabled"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cv-activity">
                    <h4 className="activity-tittle">
                        Hoạt động
                        {!isOpenAction && (
                            <IconButton size="small" onClick={handleEditActivitie}>
                                <Icon fontSize="small" color="primary">
                                    edit
                                </Icon>
                            </IconButton>
                        )}
                    </h4>
                    <div>
                        {isactivitie && (
                            <>
                                <ValidatorForm onSubmit={handleSubmitActivity}>
                                    <TextValidator
                                        multiline
                                        fullWidth
                                        className="mt-16 "
                                        name="activity"
                                        value={dataStaff?.activity || ''}
                                        onChange={handleChange}
                                        validators={['maxStringLength:1000']}
                                        errorMessages={[`${t('staff.notify.invalidStringContent')}(1000 kí tự)`]}
                                    />
                                    <Button className="mt-12 mr-12" variant="contained" color="primary" type="submit">
                                        {t('general.save')}
                                    </Button>
                                    <Button className="mt-12" color="secondary" variant="contained" type="submit">
                                        {t('general.cancel')}
                                    </Button>
                                </ValidatorForm>
                            </>
                        )}
                    </div>
                    <div className="activity-content">
                        <div className="activity-formData">
                            {hidden && <ul className="activity-list">{dataStaff?.activity}</ul>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-content">
                <div className="cv-tittle border-left">
                    <h1 className="tittle-name">{dataItemStaff?.name}</h1>
                    <h4 className="job-tittle">{dataItemStaff?.tema}</h4>
                </div>
                <div className="cv-details">
                    <div className="details-gender">
                        <img alt="icon" src="/assets/images/gender.png" />
                        <span>{GENDER.find((item) => item.id === dataItemStaff?.gender)?.name}</span>
                    </div>
                    <div className="details-birthday">
                        <img alt="icon" src="/assets/images/cake.png" />
                        <span>{moment(dataItemStaff?.dateOfBirth).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className="details-address">
                        <img alt="icon" src="/assets/images/location.png" />
                        <span>{dataItemStaff?.address}</span>
                    </div>
                </div>
                <div className="cv-goals border-left">
                    <h3 className="goals-tittle">Mục tiêu nghề nghiệp</h3>
                    <div className="goals-layer">
                        <span className="goals-quotes_left">&#699;&#699;</span>
                        <p className="goals-content">
                            Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về thị trường để trở thành một
                            nhân viên bán hàng chuyên nghiệp, mang đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty
                            tăng số lượng khách hàng và mở rộng tập khách hàng.
                            <span className="goals-quotes_right">&#700;&#700;</span>
                        </p>
                    </div>
                </div>
                <div className="cv-experiences border-left">
                    <h3 className="experiences-heading">
                        kinh nghiệm làm việc
                        {!isOpenAction && (
                            <Fab
                                color="primary"
                                aria-label="Add"
                                className="icon-button-md"
                                onClick={handleShouldDialogExperience}
                            >
                                <Icon>add</Icon>
                            </Fab>
                        )}
                    </h3>
                    {dataListExprience?.map((item) => {
                        return (
                            <div className="cv-experience" key={item.id}>
                                <h4 className="experience-tittle">
                                    <div>
                                        <span className="experience-process">
                                            {`${moment(item?.startDate).format('YYYY-MM-DD')} - ${moment(
                                                item?.endDate,
                                            ).format('YYYY-MM-DD')}`}
                                        </span>
                                        <span className="experience-dot">&#x2022;</span>
                                        <span className="experience-company">{item?.companyName}</span>
                                    </div>
                                    {!isOpenAction && (
                                        <div className="experience-tittle-button">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => handleOpenEditExperience(item)}
                                            >
                                                <Icon fontSize="small">edit</Icon>
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                onClick={() => handleOpenConfirmation(item)}
                                            >
                                                <Icon fontSize="small">delete</Icon>
                                            </IconButton>
                                        </div>
                                    )}
                                </h4>
                                <h5 className="experience-job">{item?.companyAddress}</h5>
                                <div className="experience-list">
                                    <span className="experience-detail">
                                        <span className="detail-dot">&#x2022;</span>
                                        <span className="detail-content">{item?.jobDescription}</span>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="cv-certificates border-left">
                    <h3 className="certificates-tittle">Chứng chỉ</h3>
                    <div className="certificates-list">
                        <span className="certificates-detail">
                            <span className="detail-dot">&#x2022;</span>
                            <span className="detail-content">Tiếng hàn</span>
                        </span>
                    </div>
                </div>
                <div>
                    {shouldOpenDialogExperience && (
                        <ExperienceDialog
                            open={shouldOpenDialogExperience}
                            t={t}
                            handleDialogExperienceClose={handleDialogExperienceClose}
                            data={exprience}
                            dataItemStaff={dataItemStaff}
                        />
                    )}
                    {shouldConfirmationDialog && (
                        <ConfirmationDialog
                            title={t('general.confirm')}
                            t={t}
                            open={shouldConfirmationDialog}
                            onConfirmDialogClose={handleConfirmationClose}
                            onYesClick={handleDeleteExperience}
                            text={t('general.deleteConfirm')}
                            Yes={t('general.Yes')}
                            No={t('general.cancel')}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TabCV
