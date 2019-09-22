// React
import React from 'react';

// MTF
import { AppProps } from '../../models/props';

class PlansListComponent extends React.Component<AppProps, AppProps> {
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
        return <h1>Plans</h1>;
    }
}

export default PlansListComponent;
