// React
import React from 'react';

// Material UI
import { Button } from '@material-ui/core';

// MTF
import { PagerProps } from '../../models/props';

const Pager: React.FC<PagerProps> = (props: PagerProps) => {
    const handleNextPage = () => {
        props.onNextPage();
    };

    return (
        <div>
            <Button onClick={handleNextPage}>Next Page</Button>
        </div>
    );
};

export default Pager;
