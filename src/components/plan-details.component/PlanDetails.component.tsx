// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    createStyles,
    makeStyles,
    Theme,
    CircularProgress,
    Button,
} from '@material-ui/core';

// MTF
import { PlanDetailsProps } from '../../models/props';
import { PlanDetailsState } from '../../models/states';
import { mtfTheme } from '../../themes';
import { DescriptionViewer, RequiredItemsViewer } from '../.';
import { RequiredItem, EditPlan } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        editButtonRow: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: theme.spacing(1),
        },
        editTextField: {
            marginBottom: theme.spacing(1),
        },
        editButton: {
            marginRight: theme.spacing(1),
        },
    })
);

const PlanDetails: React.FC<PlanDetailsProps> = (props: PlanDetailsProps) => {
    const classes = useStyles(mtfTheme);

    const [state, setState] = useState<PlanDetailsState>({
        editing: props.editing,
        saving: false,
        description: props.description,
        newDescription: props.description,
        allMaterials: props.allMaterials,
        requiredMaterials: props.requiredMaterials,
        newRequiredMaterials: props.requiredMaterials,
        allTools: props.allTools,
        requiredTools: props.requiredTools,
        newRequiredTools: props.requiredTools,
    });

    useEffect(() => {
        setState((s) => ({
            ...s,
            editing: props.editing,
            allMaterials: props.allMaterials,
            requiredMaterials: props.requiredMaterials,
            newRequiredMaterials: props.requiredMaterials,
            allTools: props.allTools,
            requiredTools: props.requiredTools,
            newRequiredTools: props.requiredTools,
        }));
    }, [
        props.editing,
        props.allMaterials,
        props.requiredMaterials,
        props.allTools,
        props.requiredTools,
    ]);

    const handleCancel = () => {
        setState((s) => ({
            ...s,
            newDescription: s.description,
        }));

        props.onCancel();
    };

    const handleDescriptionChange = (newDescription: string) => {
        setState((s) => ({
            ...s,
            newDescription: newDescription,
        }));
    };

    const handleRequiredMaterialsChange = (selectedItems: RequiredItem[]) => {
        setState((s) => ({
            ...s,
            newRequiredMaterials: selectedItems,
        }));
    };

    const handleRequiredToolsChange = (selectedItems: RequiredItem[]) => {
        setState((s) => ({
            ...s,
            newRequiredTools: selectedItems,
        }));
    };

    const handleSave = () => {
        setState((s) => ({
            ...s,
            description: s.newDescription,
            requiredMaterials: s.newRequiredMaterials,
            requiredTools: s.newRequiredTools,
        }));

        const editPlan: EditPlan = {
            newDescription: state.newDescription,
            newRequiredMaterialIds: state.newRequiredMaterials.map((m) => m.id),
            newRequiredToolIds: state.newRequiredTools.map((t) => t.id),
        };

        props.onSave(editPlan);
    };

    return (
        <>
            <RequiredItemsViewer
                label='Materials'
                selectorLabel='Select Materials Required for this Plan'
                requiredItems={state.allMaterials}
                selectedItems={state.newRequiredMaterials}
                editing={state.editing}
                onChange={handleRequiredMaterialsChange}
            />
            <RequiredItemsViewer
                label='Tools'
                selectorLabel='Select Tools Required for this Plan'
                requiredItems={state.allTools}
                selectedItems={state.newRequiredTools}
                editing={state.editing}
                onChange={handleRequiredToolsChange}
            />
            <DescriptionViewer
                description={state.newDescription}
                editing={state.editing}
                onChange={handleDescriptionChange}
            />
            {state.editing && (
                <div className={classes.editButtonRow}>
                    {state.saving && (
                        <CircularProgress
                            size='24px'
                            className={classes.editButton}
                        />
                    )}
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={handleSave}
                        className={classes.editButton}
                        disabled={state.saving}>
                        Save
                    </Button>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={handleCancel}
                        className={classes.editButton}
                        disabled={state.saving}>
                        Cancel
                    </Button>
                </div>
            )}
        </>
    );
};

export default PlanDetails;
