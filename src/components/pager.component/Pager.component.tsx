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

    return <Button onClick={handleNextPage}>Next Page</Button>;
};

export default Pager;
