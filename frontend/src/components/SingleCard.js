import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
/*
class SingleCard extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.cardData.Msgs}
                    {this.props.cardData.CreateTime}
                    {this.props.cardData.SenderFirstName}
                    {this.props.cardData.SenderLastName}
                    {this.props.cardData.ImageURL}
                </div>
            </div>
        )
    }
}

export default SingleCard;
*/

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
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.cardData.displayName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {date.format("YYYY/MM/DD")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.cardData.message}
                    </Typography>
                        {props.authenticate && props.cardData.editable ? <div>edit this card</div> : null}
                </CardContent>
            </Card>
        </div>

        /*
                <Card sx={{width: "100%"}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.cardData.ImageURL}
                        alt="green iguana"
                    />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {props.cardData.SenderFirstName}
                                {props.cardData.SenderLastName}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {props.cardData.CreateTime}
                            </Typography>
                            <Typography variant="body2">
                                {props.cardData.Msgs}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                        </CardContent>
                </Card> */
    );

}

/*
<Card>
            <CardMedia
                component="img"
                height="140"
                image={props.cardData.ImageURL}
                alt="green iguana"
            />
            <CardActionArea>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.cardData.SenderFirstName}
                        {props.cardData.SenderLastName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.cardData.CreateTime}
                    </Typography>
                    <Typography variant="body2">
                        {props.cardData.Msgs}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
*/
