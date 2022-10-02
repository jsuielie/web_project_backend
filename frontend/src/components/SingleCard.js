import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import DeleteCard from './DeleteCard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function SingleCard(props) {
    const date = moment(props.cardData.createTime, "YYYY-MM-DDThh:mm:ss.SSSZ");
    return (
        <div style={{ padding: "20px", "boxSizing": "border-box", width: "100%" }}>
            <Card sx={{ maxWidth: "100%" }}>
                {props.cardData.imageUrl ?
                    <CardMedia
                        component="img"
                        height="100%"
                        image={props.cardData.imageUrl}
                        alt="green iguana"
                    /> : null}
                <CardHeader
        avatar={
          <Avatar aria-label="recipe">
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
                        ? <Stack direction="row" spacing={1}>
                            <Button variant="outlined" endIcon={<ModeEditIcon />}>
                                <Link to={"/edit-card-content"} state={{ props: props.cardData }} >Edit</Link>
                            </Button>
                            <DeleteCard cardId={props.cardData.cardId} boardId={props.cardData.boardId} deleteCardsByCardId={props.deleteCardsByCardId} />
                        </Stack>
                        : <Stack direction="row" spacing={1}>
                            <Button variant="outlined" disabled color="primary" endIcon={<ModeEditIcon />}>
                                Edit
                            </Button>
                            <Button variant="outlined" disabled color="primary" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                        </Stack>}

                </CardContent>
            </Card>
        </div >
    );

}
