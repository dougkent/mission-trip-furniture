// React
import React from 'react';

// Material UI
import {
    createStyles,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';

// MTF
import { AppProps } from '../../models/props';
import { AppState } from '../../models/states';
import { mtfTheme } from '../../themes';

const styles = (theme: Theme) =>
    createStyles({
        notFoundContainer: {
            marginTop: theme.spacing(4),
        },
    });

export interface NotFoundProps extends AppProps, WithStyles<typeof styles> {}

class NotFound extends React.Component<NotFoundProps, AppState> {
    constructor(props: NotFoundProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: NotFoundProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.notFoundContainer}>
                <Typography variant='h2'>Page Not Found.</Typography>
            </div>
        );
    }
}

export default withStyles(styles(mtfTheme))(NotFound);
