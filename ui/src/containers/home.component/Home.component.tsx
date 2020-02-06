// React
import React from 'react';

// Material UI
import { Typography } from '@material-ui/core';

//MTF
import { AppProps } from '../../models/props';
import { AppState } from '../../models/states';

class HomeComponent extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: AppProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }
    render() {
        return <Typography variant='h2'>Mission Trip Furniture</Typography>;
    }
}

export default HomeComponent;
