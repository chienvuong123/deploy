import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import '../../../../styles/views/_certificate.scss'
import { useSelector } from 'react-redux'
import { dataCertificateSelector } from 'app/redux/selector/CertificateSelector'
import moment from 'moment'
const TabCertificate = (props) => {
    const { t } = props
    const dataCertificate = useSelector(dataCertificateSelector)
    return (
        <div className="certificate-wrapper">
            <h2 className="certificate-heading">Văn bằng</h2>
            <div className="certificate-detail-table">
                <TableContainer>
                    <Table border="1">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="6%" className="table-head">
                                    STT
                                </TableCell>
                                <TableCell align="center" width="20%" className="table-head">
                                    Tên văn bằng
                                </TableCell>
                                <TableCell align="center" width="12%" className="table-head">
                                    Ngày cấp
                                </TableCell>
                                <TableCell align="center" width="12%" className="table-head">
                                    Tên văn bằng
                                </TableCell>
                                <TableCell align="center" width="14%" className="table-head">
                                    Nội dung
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataCertificate.length > 0 ? (
                                dataCertificate.map((item, index) => (
                                    <TableRow key={item?.id}>
                                        <TableCell align="center" className="table-cell">
                                            <span>{index + 1}</span>
                                        </TableCell>
                                        <TableCell align="left" className="table-cell">
                                            <span>{item?.certificateName}</span>
                                        </TableCell>
                                        <TableCell align="center" className="table-cell">
                                            <span>{moment(item?.issueDate).format('YYYY-MM-DD')}</span>
                                        </TableCell>
                                        <TableCell align="left" className="table-cell">
                                            <span>{item?.field}</span>
                                        </TableCell>
                                        <TableCell align="left" className="table-cell">
                                            <span>{item?.content}</span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell className="table-cell"></TableCell>
                                    <TableCell className="table-cell"></TableCell>
                                    <TableCell className="table-cell"></TableCell>
                                    <TableCell className="table-cell"></TableCell>
                                    <TableCell className="table-cell"></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default TabCertificate
