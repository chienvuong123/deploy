import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Icon from '@material-ui/core/Icon'
import { Box, Dialog, DialogActions, Grid } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import Button from '@material-ui/core/Button'
import '../../../styles/components/_form.scss'
import moment from 'moment'
import ManageSendLeader from '../ManagerStaff/ManageSendLeader'
import { TYPE_PROPOSAL } from 'app/constants/StaffConstant'

const FormProposal = (props) => {
    const { t, handleCloseDialog, dataProposal, staff, dataItem } = props
    const [shouldOpenSendLeader, setShouldOpenSendLeader] = useState(false)
    return (
        <Dialog open={true} fullWidth maxWidth="md">
            <DialogTitle id="draggable-dialog-title">
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>Đề xuất tham mưu</Grid>
                    <Grid item>
                        <IconButton onClick={handleCloseDialog}>
                            <Icon color="secondary">close</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers className="wrapper-a4 mh-70">
                <Box className="A4">
                    <Box className="A4-content">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <div className="flex-center">
                                    <Typography fontWeight="bold" className="text-overflow">
                                        CÔNG TY OCEANTECH
                                    </Typography>
                                </div>
                                <Typography className="flex-center">
                                    <b> Số {staff?.id}/ QĐ - TL</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="flex-center">
                                    <Typography fontWeight="bold" className="text-overflow">
                                        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM{' '}
                                    </Typography>
                                </div>
                                <div className="flex-center">
                                    <Typography fontWeight="bold" className="text-overflow heading-underline">
                                        Độc lập - Tự do - Hạnh phúc
                                    </Typography>
                                </div>
                                <div className="flex-center">
                                    <Typography className="text-overflow line-height-25 mt-32" fontStyle="italic">
                                        Hà Nội, Ngày{' '}
                                        {
                                            moment(new Date(dataProposal?.proposalDate))
                                                .format('DD/MM/YYYY')
                                                .split('/')[0]
                                        }{' '}
                                        tháng{' '}
                                        {
                                            moment(new Date(dataProposal?.proposalDate))
                                                .format('DD/MM/YYYY')
                                                .split('/')[1]
                                        }{' '}
                                        năm{' '}
                                        {
                                            moment(new Date(dataProposal?.proposalDate))
                                                .format('DD/MM/YYYY')
                                                .split('/')[2]
                                        }
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <div className="flex-center">
                            <Typography className="text-overflow mt-32 mb-8" fontWeight="bold">
                                ĐƠN ĐỀ XUẤT
                            </Typography>
                        </div>
                        <Typography>
                            {' '}
                            <b>Kính gửi:</b> - Ban giám đốc Công ty OCEANTECH
                        </Typography>
                        <Typography>
                            Tôi tên là <b>{staff?.name}</b>, hiện đang làm nhân viên IT của Công ty OCEANTECH
                        </Typography>
                        <Typography className="pb-12">
                            Hôm nay tôi viết đơn này{' '}
                            <b>{TYPE_PROPOSAL.find((item) => item.id === dataProposal?.type)?.name}</b>
                        </Typography>
                        <Typography>
                            Trong quá trình làm việc tại Công ty OCEANTECH, tôi nhận thấy đề xuất của tôi giúp cải thiện
                        </Typography>
                        <Typography> - Giúp cải thiện được năng xuất làm việc, tinh thần thoải mái.</Typography>
                        <Typography> - Tạo một không gian lành mạnh, cạnh tranh cao trong công việc.</Typography>
                        <Typography>
                            Tôi viết đơn này mong ban lãnh đạo Công ty OCEANTECH, xem xét đề xuất của tôi
                        </Typography>
                        <Typography>Xin trân trọng cảm ơn!</Typography>
                        <Box className="flex-between mt-32">
                            <Box className="px-32">
                                <Typography fontWeight="bold" fontStyle="italic">
                                    Người làm đơn
                                </Typography>
                                <Typography fontStyle="italic" className="flex-center">
                                    (Ký rõ họ tên)
                                </Typography>
                                <Typography>{staff?.name}</Typography>
                            </Box>
                            <Box className="px-32">
                                <Typography fontWeight="bold" className="flex-center">
                                    GIÁM ĐỐC
                                </Typography>
                                <Typography fontStyle="italic" className="flex-center">
                                    (Ký tên, đóng dấu)
                                </Typography>
                                {dataProposal?.salaryIncreaseStatus === 3 && (
                                    <div className="mt-32 flex-center">
                                        <span className="sign-text ">{staff?.leaderName}</span>
                                    </div>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <Grid>
                {shouldOpenSendLeader && (
                    <ManageSendLeader
                        open={shouldOpenSendLeader}
                        handleCloseParentDialog={() => setShouldOpenSendLeader(false)}
                        t={t}
                        itemData={dataItem}
                        isProposal={true}
                        handleCloseDialog={handleCloseDialog}
                    />
                )}
            </Grid>
            <DialogActions className="flex flex-center px-16">
                <Button variant="contained" color="primary" onClick={() => setShouldOpenSendLeader(true)}>
                    Trình lãnh đạo
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormProposal
