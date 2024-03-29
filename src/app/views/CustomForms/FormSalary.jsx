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
import { LEADERSHIP } from 'app/constants/StaffConstant'
import ManageSendLeader from '../ManagerStaff/ManageSendLeader'
import ApprovalDialog from '../LeadershipApproval/ApprovalDialog'
import { useDispatch } from 'react-redux'
import AdditionalDialog from '../LeadershipApproval/AdditionalDialog'
import RefuseDialog from '../LeadershipApproval/RefuseDialog'

const FormSalary = (props) => {
    const { t, handleCloseDialog, staff, dataSalaryIncrease, dataItem, isOpenAction } = props
    const [shouldOpenSendLeader, setShouldOpenSendLeader] = useState(false)
    const [shouldOpenDialogAdditional, setShouldOpenDialogAdditional] = useState(false)
    const [shouldOpenDialogApproval, setShouldOpenDialogApproval] = useState(false)
    const [shouldOpenDialogRefuse, setShouldOpenDialogRefuse] = useState(false)

    return (
        <Dialog open={true} fullWidth maxWidth="md">
            <DialogTitle id="draggable-dialog-title">
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>Đề xuất tăng lương</Grid>
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
                                    <Typography className="text-overflow line-height-25" fontStyle="italic">
                                        Hà Nội, Ngày{' '}
                                        {
                                            moment(new Date(dataSalaryIncrease?.startDate))
                                                .format('DD/MM/YYYY')
                                                .split('/')[0]
                                        }{' '}
                                        tháng{' '}
                                        {
                                            moment(new Date(dataSalaryIncrease?.startDate))
                                                .format('DD/MM/YYYY')
                                                .split('/')[1]
                                        }{' '}
                                        năm{' '}
                                        {
                                            moment(new Date(dataSalaryIncrease?.startDate))
                                                .format('DD/MM/YYYY')
                                                .split('/')[2]
                                        }
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Typography className="flex-center mt-32" fontWeight="bold">
                            QUYẾT ĐỊNH
                        </Typography>
                        <Typography className="flex-center pb-12" fontStyle="italic">
                            V/v tăng lương cho người lao động
                        </Typography>
                        <Typography>- Căn cứ vào Điều lệ, nội quy, quy chế của Công ty OCEANTECH</Typography>
                        <Typography>
                            - Căn cứ vào hợp đồng số <b>{staff?.code}</b> được ký giữa Công ty OCEANTECH và Ông/Bà{' '}
                            <b>{staff?.name}</b> ngày{' '}
                            {moment(new Date(staff?.submitDay)).format('DD/MM/YYYY').split('/')[0]} tháng{' '}
                            {moment(new Date(staff?.submitDay)).format('DD/MM/YYYY').split('/')[1]} năm{' '}
                            {moment(new Date(staff?.submitDay)).format('DD/MM/YYYY').split('/')[2]}
                        </Typography>
                        <Typography className="pb-12">
                            - Căn cứ vào sự đóng góp thực tế của Ông/Bà: <b>{staff?.name}</b> đổi với sự phát triển của
                            Công ty OCEANTECH
                        </Typography>
                        <div className="flex-center">
                            <Typography className="text-overflow" fontWeight="bold">
                                GIÁM ĐỐC CÔNG TY OCEANTECH
                            </Typography>
                        </div>
                        <Typography className="flex-center line-height-25" fontWeight="bold">
                            QUYẾT ĐỊNH
                        </Typography>
                        <Typography>
                            <b>- Điều 1:</b> Tăng lương cho Ông/Bà: <b>{staff?.name}</b> đang làm việc tại công ty kể từ
                            ngày {moment(new Date(dataSalaryIncrease?.startDate)).format('DD/MM/YYYY').split('/')[0]}{' '}
                            tháng {moment(new Date(dataSalaryIncrease?.startDate)).format('DD/MM/YYYY').split('/')[1]}{' '}
                            năm {moment(new Date(dataSalaryIncrease?.startDate)).format('DD/MM/YYYY').split('/')[2]}, cụ
                            thể như sau:
                        </Typography>
                        <Typography>
                            Mức lương hiện tại: <b>{dataSalaryIncrease?.oldSalary?.toLocaleString('en-US')} VND</b>
                        </Typography>
                        <Typography>
                            Mức lương sau điều chỉnh:{' '}
                            <b>{dataSalaryIncrease?.newSalary?.toLocaleString('en-US')} VND</b>
                        </Typography>
                        <Typography>
                            <b>- Điều 2: </b>Các Ông/Bà Phòng nhân sự, Phòng tài chính kế toán và Ông/Bà:{' '}
                            <b>{LEADERSHIP?.find((item) => item?.id === dataSalaryIncrease?.leaderId)?.leaderName}</b>{' '}
                            căn cứ thi hành quyết định này.
                        </Typography>
                        <Box className="flex-between mt-32">
                            <Box className="px-32">
                                <Typography fontWeight="bold" fontStyle="italic">
                                    Nơi Nhận:
                                </Typography>
                                <Typography>Như điều 2</Typography>
                                <Typography>Lưu HS,VP</Typography>
                            </Box>
                            <Box className="px-32">
                                <Typography fontWeight="bold" className="flex-center">
                                    GIÁM ĐỐC
                                </Typography>
                                <Typography fontStyle="italic" className="flex-center">
                                    (Ký tên, đóng dấu)
                                </Typography>
                                {dataSalaryIncrease?.salaryIncreaseStatus === 3 && (
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
                        isSalary={true}
                        handleCloseDialog={handleCloseDialog}
                    />
                )}
                {shouldOpenDialogApproval && (
                    <ApprovalDialog
                        open={shouldOpenDialogApproval}
                        handleCloseDialogApproval={() => setShouldOpenDialogApproval(false)}
                        t={t}
                        dataItemStaff={dataSalaryIncrease}
                        isSubmitSalaty={true}
                    />
                )}
                {shouldOpenDialogAdditional && (
                    <AdditionalDialog
                        open={shouldOpenDialogApproval}
                        t={t}
                        isSubmitSalaty={true}
                        dataItemStaff={dataSalaryIncrease}
                        handleCloseDialogAdditional={() => setShouldOpenDialogAdditional(false)}
                    />
                )}
                {shouldOpenDialogRefuse && (
                    <RefuseDialog
                        open={shouldOpenDialogRefuse}
                        t={t}
                        isSubmitSalaty={true}
                        dataItemStaff={dataSalaryIncrease}
                        handleCloseDialogRefuse={() => setShouldOpenDialogRefuse(false)}
                    />
                )}
            </Grid>
            <DialogActions className="flex flex-center px-16">
                {isOpenAction && (
                    <Button variant="contained" color="primary" onClick={() => setShouldOpenDialogApproval(true)}>
                        Duyệt
                    </Button>
                )}
                {isOpenAction && (
                    <Button variant="contained" color="primary" onClick={() => setShouldOpenDialogAdditional(true)}>
                        Yêu cầu bổ xung
                    </Button>
                )}
                {isOpenAction && (
                    <Button variant="contained" color="secondary" onClick={() => setShouldOpenDialogRefuse(true)}>
                        Từ chối
                    </Button>
                )}
                {!isOpenAction && (
                    <Button variant="contained" color="primary" onClick={() => setShouldOpenSendLeader(true)}>
                        Trình lãnh đạo
                    </Button>
                )}
                <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormSalary
