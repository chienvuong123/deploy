import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Icon, IconButton, Grid } from '@material-ui/core'
const StatusStaffDialog = (props) => {
    const { handleStatusClose, title, note } = props
    return (
        <div className="m-ms-24">
            <Dialog open={true} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle spacing={2} id="draggable-dialog-title">
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <h3>{title}</h3>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleStatusClose}>
                                <Icon color="secondary">close</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers>{note}</DialogContent>
                <DialogActions className="justify-center">
                    <Button onClick={handleStatusClose} variant="contained" color="secondary">
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StatusStaffDialog
