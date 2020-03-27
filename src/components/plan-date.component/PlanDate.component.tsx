// React
import React from 'react';

// MTF
import { PlanDateProps } from '../../models/props';

const PlanDate: React.FC<PlanDateProps> = (props: PlanDateProps) => {
    const getDateString = (): string => {
        const msNow = Date.now();
        const msDate = props.date.getTime();

        const diff = msNow - msDate;

        if (diff < 60 * 1000) {
            return Math.round(diff / 1000) + 's ago';
        } else if (diff < 60 * 1000 * 2) {
            return Math.round(diff / (60 * 1000)) + ' min ago';
        } else if (diff < 60 * 1000 * 60) {
            return Math.round(diff / (60 * 1000)) + ' mins ago';
        } else if (diff < 60 * 1000 * 60 * 24) {
            return Math.round(diff / (60 * 1000 * 60)) + ' hrs ago';
        } else if (diff < 60 * 1000 * 60 * 24 * 2) {
            return Math.round(diff / (60 * 1000 * 60 * 24)) + ' day ago';
        } else if (diff < 60 * 1000 * 60 * 24 * 7) {
            return Math.round(diff / (60 * 1000 * 60 * 24)) + ' days ago';
        } else {
            return props.date.toLocaleDateString();
        }
    };

    return <>{getDateString()}</>;
};

export default PlanDate;
