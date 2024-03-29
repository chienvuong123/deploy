import React, { useState } from 'react'
import CustomTable from 'app/froms/CustomTable'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { IconButton, Grid } from '@material-ui/core'
import { Edit as EditIcon, Visibility as VisibilityIcon } from '@material-ui/icons'
import { toast } from 'react-toastify'
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
})
const PendingPromoted = () => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const dispatch = useDispatch()

    const handleUpdate = () => {}
    const handleVisiblty = () => {}
    const Action = (props) => {
        const item = props.item
        return (
            <div>
                <IconButton size="small" onClick={() => handleUpdate(item)}>
                    <EditIcon fontSize="small" color="primary" />
                </IconButton>
                <IconButton size="small" onClick={() => handleVisiblty(item)}>
                    <VisibilityIcon fontSize="small" color="secondary" />
                </IconButton>
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
            render: (rowData) => moment(rowData.dateOfBirth).format('YYYY-MM-DD'),
        },
        {
            title: 'Chức vụ hiện tại',
            field: 'currentPosition',
            align: 'center',
            maxWidth: '100px',
            minWidth: '100px',
        },
        {
            title: 'Chức vụ đề xuất',
            field: 'newPosition',
            align: 'center',
            maxWidth: '130px',
            minWidth: '130px',
        },
        {
            title: 'Ghi chú',
            field: 'note',
            align: 'center',
        },
    ]
    return (
        <div className="m-sm-24">
            <CustomTable
                columns={columns}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default PendingPromoted
