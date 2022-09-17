import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function BodyCard(props) {
    const {title, image, summary} = props;
  return (
    <Card sx={{ width: 300, height: 300 }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
        />
        <CardContent className='card-content'>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summary}
          </Typography>
        </CardContent>
    </Card>
  )
}
