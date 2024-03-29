import React from 'react'
import { TablePagination } from '@material-ui/core';
import MaterialTable, { MTableToolbar } from 'material-table';
import { useTranslation } from 'react-i18next';

const CustomTable = (props) => {
    const { data, columns, totalElements, page, pageSize, setPageSize, setPage } = props
    const { t } = useTranslation();
    return (
        <div>
            <MaterialTable
                data={data}
                columns={columns}
                components={{
                    Toolbar: (props) => <MTableToolbar {...props} />,
                }}
                options={{
                    selection: false,
                    actionsColumnIndex: -1,
                    paging: false,
                    search: false,
                    rowStyle: (rowData) => ({
                        backgroundColor: rowData.tableData?.id % 2 === 1 ? "#EEE" : "#FFF",
                    }),
                    cellStyle: {
                        padding: "8px 12px",
                        border: "1px solid #e6e6e6",
                    },
                    maxBodyHeight: "550px",
                    minBodyHeight: "120px",
                    headerStyle: {
                        backgroundColor: "#7467ef",
                        color: "#fff",
                        border: "1px solid #e6e6e6",
                        textAlign: "center",
                    },
                    padding: "dense",
                    toolbar: false,
                    sorting: false,
                    draggable: false,
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`,
                    },
                }}
            />

            <TablePagination
                align="left"
                className="px-16 w-100"
                rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 50, 100]}
                component="div"
                labelRowsPerPage={t('general.rows_per_page')}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`
                }
                count={totalElements}
                rowsPerPage={pageSize}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={(event, newPage) => {
                    setPage(newPage)
                }}
                onChangeRowsPerPage={(event) => {
                    setPageSize(event?.target?.value)
                    setPage(0)
                }}
            />
        </div>
    )
}

export default CustomTable
