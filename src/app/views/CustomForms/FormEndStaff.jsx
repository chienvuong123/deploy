import React, { useEffect, useRef, useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Icon from '@material-ui/core/Icon'
import { Box, Dialog, DialogActions, Grid, Input, Button } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import '../../../styles/components/_form.scss'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { toast } from 'react-toastify'
import { STAFF_POSITION } from 'app/constants/StaffConstant'
import { staffItemSelector } from 'app/redux/selector/StaffSelector'
import ManagerEndStaff from '../ManagerStaff/ManagerEndStaff'
import RefuseDialog from '../LeadershipApproval/RefuseDialog'
import AdditionalDialog from '../LeadershipApproval/AdditionalDialog'
import ApprovalDialog from '../LeadershipApproval/ApprovalDialog'

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})

const FormEndStaff = (props) => {
    const { t, handleCloseDialog, isRegister, isOpenPending } = props
    const staff = useSelector(staffItemSelector)
    const form = useRef(null)
    const [formData, setFormData] = useState({})
    const [shouldOpenSendLeader, setShouldOpenSendLeader] = useState(false)
    const [shouldOpenDialogApproval, setShouldOpenDialogApproval] = useState(false)
    const [shouldOpenDialogAdditional, setShouldOpenDialogAdditional] = useState(false)
    const [shouldOpenDialogRefuse, setShouldOpenDialogRefuse] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [line, setLine] = useState([])
    useEffect(() => {
        setFormData({ ...staff, reasonForEnding: `Lý do xin nghỉ: ${staff?.reasonForEnding}` })
    }, [staff])
    const handleCloseParentDialog = () => {
        setShouldOpenSendLeader(false)
    }
    const handleChange = (event, field) => {
        event.persist()
        const { value, innerHTML } = event.target
        switch (field) {
            case 'reasonForEnding': {
                if (!value.startsWith('Lý do xin nghỉ: ')) {
                    setFormData({
                        ...formData,
                        reasonForEnding: 'Lý do xin nghỉ: ',
                    })
                } else {
                    setFormData({
                        ...formData,
                        reasonForEnding: value,
                    })
                }

                break
            }
            default: {
                setFormData({
                    ...formData,
                    [field]: value,
                })
                break
            }
        }
    }
    useEffect(() => {
        setLine(formData?.reasonForEnding?.split('\n'))
    }, [formData.reasonForEnding])

    const handleSubmitEndStaff = () => {
        if (isSubmit) {
            if (!formData?.endDay || !formData?.reasonForEnding) {
                toast.error('vui lòng điền đầy đủ thông tin trước khi trình')
                console.log('có chạy qua')
            } else setShouldOpenSendLeader(true)
        }
    }
    return (
        <Dialog open={true} fullWidth={true} maxWidth={'md'} PaperProps={{ style: { overflowY: 'hidden' } }}>
            <ValidatorForm onSubmit={handleSubmitEndStaff} ref={form}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>Đơn xin nghỉ việc</Grid>
                        <Grid item>
                            <IconButton onClick={handleCloseDialog}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <DialogContent dividers className="wrapper-a4 mh-70">
                    <Box className="A4">
                        <Box className="A4-content text-justify">
                            <Typography fontWeight="bold" className="flex-center">
                                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                            </Typography>
                            <Typography fontWeight="bold" className="flex-center heading-underline">
                                Độc lập - Tự do - Hạnh phúc
                            </Typography>
                            <Typography fontWeight="bold" className="flex-center mt-32">
                                ĐƠN XIN NGHỈ VIỆC
                            </Typography>
                            <Typography className="mt-32">
                                Kính gửi: Ban Giám đốc công ty <b>OCEANTECH</b>
                            </Typography>
                            <Typography className="pb-12">
                                Tên tôi là: <b>{formData?.name}</b>
                            </Typography>
                            <Typography>
                                Hiện tại đang là{' '}
                                {
                                    STAFF_POSITION?.find(
                                        (position) => position?.id === (formData?.currentPosition ?? 1),
                                    )?.name
                                }{' '}
                                tại công ty OCEANTECH<b></b>
                            </Typography>
                            <Typography className="pb-12">
                                Tôi làm đơn này, đề nghị Ban Gián đốc cho tôi xin nghỉ việc từ ngày{' '}
                                {
                                    moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                                        .format('DD/MM/YYYY')
                                        .split('/')[0]
                                }{' '}
                                tháng{' '}
                                {
                                    moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                                        .format('DD/MM/YYYY')
                                        .split('/')[1]
                                }{' '}
                                năm{' '}
                                {
                                    moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                                        .format('DD/MM/YYYY')
                                        .split('/')[2]
                                }
                                .
                                {isRegister && (
                                    <>
                                        <Input
                                            id="icon-button-date"
                                            className="mr-4 ml-4"
                                            style={{ width: '20px' }}
                                            type="date"
                                            inputProps={{
                                                min: moment().format('YYYY-MM-DD'),
                                                width: '20',
                                            }}
                                            name="endDay"
                                            value={formData?.endDay || ''}
                                            onChange={(e) => handleChange(e, 'endDay')}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <span style={{ color: 'red' }}> * </span>
                                    </>
                                )}
                                <br></br>
                                {!isRegister && `Nghỉ vì lý do : ${formData?.reasonForEnding}`}
                                {isRegister && (
                                    <div className="relative">
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: `0`,
                                                backgroundColor: 'white',
                                                zIndex: '1001',
                                                transform: 'translateY(-2px)',
                                            }}
                                        >
                                            Lý do xin nghỉ:
                                        </span>
                                        <Input
                                            className="no-padding custom-input"
                                            name="reasonForEnding"
                                            multiline
                                            value={formData?.reasonForEnding || ''}
                                            onChange={(e) => handleChange(e, 'reasonForEnding')}
                                            style={{
                                                fontFamily: 'Times New Roman',
                                                fontSize: '16px',
                                                display: 'block',
                                                position: 'relative',
                                                zIndex: '1000',
                                                width: '100%',
                                                outline: 'unset',
                                            }}
                                        ></Input>
                                        {line?.map((item, index) => (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: `${(1 / line.length) * 100 * index}%`,
                                                    right: '0',
                                                    left: '0',
                                                    width: '100%',
                                                    height: line ? `${(1 / line.length) * 100}%` : '100%',
                                                    borderBottom: '1px dashed',
                                                    transform: 'translateY(-2px)',
                                                }}
                                            ></span>
                                        ))}
                                    </div>
                                )}
                            </Typography>
                            <Typography className="pb-12">
                                Trong thời gian chờ đợi sự chấp thuận của Ban Giám đốc Công ty, tôi sẽ tiếp tục làm việc
                                nghiêm túc và tiến hành bàn giao công việc cũng như tài sản cho người quản lý trực tiếp
                                của tôi là ông/bà <b>{formData?.leaderName}</b>
                            </Typography>
                            <Typography>Tôi xin chân thành cảm ơn!</Typography>
                            <Grid container>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={6}>
                                    <Typography className="flex-center">
                                        Hà Nội, Ngày{' '}
                                        {
                                            moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                                                .format('DD/MM/YYYY')
                                                .split('/')[0]
                                        }{' '}
                                        tháng{' '}
                                        {
                                            moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                                                .format('DD/MM/YYYY')
                                                .split('/')[1]
                                        }{' '}
                                        năm{' '}
                                        {
                                            moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                                                .format('DD/MM/YYYY')
                                                .split('/')[2]
                                        }
                                    </Typography>
                                    <Typography fontWeight="bold" className="flex-center">
                                        Người làm đơn
                                    </Typography>
                                    <Typography fontStyle="italic" className="flex-center">
                                        (Ký, ghi rõ họ tên)
                                    </Typography>
                                    <div className="mt-32 flex-center">
                                        <span className="sign-text ">{formData?.name ? formData?.name : ''}</span>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
                <div>
                    {shouldOpenDialogApproval && (
                        <ApprovalDialog
                            t={t}
                            open={shouldOpenDialogApproval}
                            handleCloseDialogApproval={() => setShouldOpenDialogApproval(false)}
                            dataItemStaff={staff}
                            isSubmitStaff={true}
                        />
                    )}
                    {shouldOpenDialogAdditional && (
                        <AdditionalDialog
                            open={shouldOpenDialogAdditional}
                            t={t}
                            handleCloseDialogAdditional={() => setShouldOpenDialogAdditional(false)}
                            dataItemStaff={staff}
                        />
                    )}
                    {shouldOpenDialogRefuse && (
                        <RefuseDialog
                            t={t}
                            open={shouldOpenDialogRefuse}
                            handleCloseDialogRefuse={() => setShouldOpenDialogRefuse(false)}
                            dataItemStaff={staff}
                        />
                    )}
                    {shouldOpenSendLeader && (
                        <ManagerEndStaff
                            t={t}
                            open={shouldOpenSendLeader}
                            item={{
                                ...formData,
                                reasonForEnding: formData?.reasonForEnding?.replace('Vì lí do: ', ''),
                            }}
                            handleCloseDialog={() => {
                                setShouldOpenSendLeader(false)
                            }}
                            handleCloseParentDialog={handleCloseParentDialog}
                            dataItemStaff={staff}
                        />
                    )}
                </div>
                <DialogActions className="flex flex-center px-16">
                    {isOpenPending && (
                        <Button variant="contained" color="primary" onClick={() => setShouldOpenDialogApproval(true)}>
                            Duyệt
                        </Button>
                    )}
                    {isOpenPending && (
                        <Button variant="contained" color="primary" onClick={() => setShouldOpenDialogAdditional(true)}>
                            Yêu cầu bổ xung
                        </Button>
                    )}
                    {isOpenPending && (
                        <Button variant="contained" color="secondary" onClick={() => setShouldOpenDialogRefuse(true)}>
                            Từ chối
                        </Button>
                    )}
                    {isRegister && (
                        <Button variant="contained" color="primary" type="submit" onClick={() => setIsSubmit(true)}>
                            {t('general.save')}
                        </Button>
                    )}
                    <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
                        Hủy
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    )
}

export default FormEndStaff
