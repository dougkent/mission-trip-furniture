// React
import React from 'react';

// Material UI
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { BaseProps } from '../../models/props';
import { BaseState } from '../../models/states';
import { mtfTheme } from '../../themes';

const styles = (theme: Theme) =>
    createStyles({
        contactContainer: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            [theme.breakpoints.up('md')]: {
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
    });

export interface ContactProps extends BaseProps, WithStyles<typeof styles> {}

class Contact extends React.Component<ContactProps, BaseState> {
    constructor(props: ContactProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidMount = () => {
        ReactGA.ga('send', 'pageview', window.location.pathname);
    };

    componentDidUpdate = (prevProps: ContactProps) => {
        if (this.props.userId !== prevProps.userId) {
            this.setState({
                userId: this.props.userId,
            });
        }
    };
    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.contactContainer}>
                <script src='https://static.airtable.com/js/embed/embed_snippet_v1.js'></script>
                <iframe
                    title='contact-iframe'
                    className='airtable-embed airtable-dynamic-height'
                    src='https://airtable.com/embed/shrMvoalTs2LZXypE?backgroundColor=green'
                    width='100%'
                    height='1052px'
                    style={{
                        background: 'transparent',
                        border: '1px solid #ccc',
                    }}></iframe>
            </div>
        );
    };
}

export default withStyles(styles(mtfTheme))(Contact);
