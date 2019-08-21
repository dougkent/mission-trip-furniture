// React
import React from 'react';

// MTF
import NavComponent from '../nav.component/Nav.component';

class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <NavComponent />
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default HomeComponent;