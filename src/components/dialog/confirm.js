import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = ({ open, options, onCancel, onConfirm, onClose }) => {
    const {
        html,
        alert,
        title,
        description,
        confirmationText,
        cancellationText,
        dialogProps,
        confirmationButtonProps,
        cancellationButtonProps,
    } = options;

    return (
        <Dialog fullWidth {...dialogProps} open={open} onClose={onClose}>
            {title && (
                <DialogTitle>{title}</DialogTitle>
            )}
            {description && (
                <DialogContent>
                    {!html && (<DialogContentText>{description}</DialogContentText>)}
                    {!!html && (<>{description}</>)}
                </DialogContent>
            )}
            <DialogActions>
                {!!alert && (
                    <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
                        {confirmationText ?
                            <>{confirmationText}</>
                            :
                            <>閉じる</>}
                    </Button>)}
                {!alert && (
                    <>
                        <Button {...cancellationButtonProps} onClick={onCancel}>
                            {cancellationText}
                        </Button>
                        <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
                            {confirmationText}
                        </Button>
                    </>)}
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;