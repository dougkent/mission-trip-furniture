// React
import React from 'react';

// MTF
import { AppProps } from '../../models/props';

class PlanViewComponent extends React.Component<AppProps, AppProps> {
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
        return <h1>Plan Name to View Goes Here</h1>;
    }
}

export default PlanViewComponent;
