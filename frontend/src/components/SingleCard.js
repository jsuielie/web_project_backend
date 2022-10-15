import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import EditDeleteBntGroup from './EditDeleteBntGroup';

export default function SingleCard(props) {
    const date = moment(props.cardData.createTime, "YYYY-MM-DDThh:mm:ss.SSSZ");
    return (
        <div style={{ padding: "20px", "boxSizing": "border-box", width: "100%" }}>
            <Card sx={{ maxWidth: "90%" }}>
                {props.cardData.imageUrl ?
                    <CardMedia
                        component="img"
                        height="40%"
                        image={props.cardData.imageUrl}
                        alt="card image"
                    /> : null}
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe"
                            src={props.cardData.userImageUrl}>
                            R
                        </Avatar>
                    }
                    title={props.cardData.displayName}
                    subheader={date.format("YYYY/MM/DD")}
                    
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.cardData.message}
                    </Typography>
                </CardContent>
                <CardContent>
                    {props.authenticate && props.cardData.editable
                        ? <EditDeleteBntGroup
                            handleOpenDialog={props.handleOpenDialog}
                            setEditOrDeleteToggle={props.setEditOrDeleteToggle}
                            setFocusedCardId={props.setFocusedCardId}
                            cardId={props.cardData.cardId}
                        />
                        : null}
                </CardContent>
            </Card>
        </div >

    );

}
