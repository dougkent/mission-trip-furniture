// React
import React from 'react';

// AWS
import { S3Image } from 'aws-amplify-react';

// Material UI
import {
    makeStyles,
    Theme,
    createStyles,
    Typography,
    Card,
    CardActions,
    CardContent,
    Grid,
} from '@material-ui/core';

// MTF
import { PlanCardProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        image: {
            width: '100%',
            height: 100,
            [theme.breakpoints.up('sm')]: {
                width: 200,
                height: 200,
            },
            '& img': {
                width: '100%',
                height: 100,
                objectFit: 'cover',
                [theme.breakpoints.up('sm')]: {
                    width: 200,
                    height: 200,
                },
            },
        },
        cardContentContainer: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
            },
        },
        cardContent: {
            maxWidth: 260,
            paddingTop: 0,
        },
        cardTitle: {
            display: 'flex',
            maxWidth: 175,
            alignItems: 'center',
        },
        cardActions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
    })
);

const PlanCard: React.FC<PlanCardProps> = (props: PlanCardProps) => {
    const classes = useStyles(mtfTheme);

    return (
        <Grid item>
            <Card className={classes.card}>
                <div className={classes.image}>
                    <S3Image
                        level='protected'
                        imgKey={props.plan.imageS3Info.key}
                    />
                </div>
                <div className={classes.cardContentContainer}>
                    <CardActions className={classes.cardActions}>
                        <div className={classes.cardTitle}>
                            <Typography variant='h5' noWrap>
                                {props.plan.name}
                            </Typography>
                        </div>
                    </CardActions>
                    <CardContent className={classes.cardContent}>
                        <Typography variant='body1' noWrap>
                            {props.plan.description}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
};

export default PlanCard;
