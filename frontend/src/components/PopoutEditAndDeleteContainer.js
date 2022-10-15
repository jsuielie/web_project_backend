import React from 'react';
import Dialog from '@mui/material/Dialog';
import PopoutEdit from './PopoutEdit';
import PopoutDelete from './PopoutDelete';

function PopoutEditAndDeleteContainer(props) {
    return (
        <Dialog
            open={props.open}
            fullWidth={true}
            maxWidth="xs"
            onClose={() => {
                props.handleCloseDialog();
            }}
        >
            {
                props.editOrDeleteToggle === "edit"
                    ? <PopoutEdit
                        handleCloseDialog={props.handleCloseDialog}
                        focusedCardId={props.focusedCardId}
                        cardsData={props.cardsData}
                        refetch={props.afterEditOrDelete}
                    />
                    : <PopoutDelete
                        handleCloseDialog={props.handleCloseDialog}
                        focusedCardId={props.focusedCardId}
                        refetch={props.afterEditOrDelete}
                    />
            }
        </Dialog>
    );

}

export default PopoutEditAndDeleteContainer;