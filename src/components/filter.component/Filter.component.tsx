// React
import React, { useState } from 'react';

// Material UI
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    IconButton,
    makeStyles,
    Slide,
    Theme,
    Typography,
} from '@material-ui/core';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { TransitionProps } from '@material-ui/core/transitions';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// MTF
import { FilterProps } from '../../models/props';
import { FilterState } from '../../models/states';
import { mtfTheme } from '../../themes';
import { MaterialsSelector, ToolsSelector } from '../.';
import { Material, Tool } from '../../models/api-models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mobileDisplay: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        desktopDisplay: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'inherit',
            },
        },
        filterButton: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        filterButtonText: {
            marginLeft: theme.spacing(1),
        },
        filterDialogTitle: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        filterContent: {
            overflowY: 'auto',
        },
        dialogRow: {
            [theme.breakpoints.up('sm')]: {
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        dialogFilterItemRow: {
            marginBottom: theme.spacing(3),
        },
        dialogFilterDateRow: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            flexWrap: 'wrap',
            [theme.breakpoints.up('sm')]: {
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        dialogDatePicker: {
            width: '100%',
            textAlign: 'center',
        },
        dialogDatePickerLabel: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        dialogfilterActions: {
            display: 'flex',
            alignItems: 'bottom',
        },
        filterBar: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
        },
        filterBarItem: {
            marginRight: theme.spacing(2),
            minWidth: theme.spacing(10),
            marginBottom: theme.spacing(2),
        },
        filterBarItemFixedWidth: {
            width: theme.spacing(30),
        },
        filterBarToggle: {
            display: 'flex',
            alignItems: 'center',
        },
        filterBarItemText: {
            display: 'inline-block',
            width: theme.spacing(12),
        },
        applyButton: {
            marginLeft: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
    })
);

const SlideUpTransition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
    const classes = useStyles(mtfTheme);

    const [filterState, setFilterState] = useState<FilterState>(
        props.filterState
    );

    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const [filterBarOpen, setFilterBarOpen] = useState<boolean>(false);

    const handleApply = () => {
        props.onApply(filterState);

        setFilterDialogOpen(false);
        setFilterBarOpen(false);
    };

    const handleDateChange = (key: string) => (date: any) => {
        setFilterState({
            ...filterState,
            [key]: date == null ? null : date._d,
        });
    };

    const handleFilterDialogClose = () => {
        setFilterDialogOpen(false);
        setFilterState(props.filterState);
    };

    const handleMaterialSelect = (materials: Material[]) => {
        setFilterState({
            ...filterState,
            filterMaterials: materials,
        });
    };

    const handleToolSelect = (tools: Tool[]) => {
        setFilterState({
            ...filterState,
            filterTools: tools,
        });
    };

    const handleOpenFilterDialog = (event: React.FormEvent) => {
        event.preventDefault();

        setFilterDialogOpen(true);
    };

    const isChanged = (): boolean => {
        return (
            JSON.stringify(props.filterState) !== JSON.stringify(filterState)
        );
    };

    const toggleFilterBarOpen = () => {
        setFilterBarOpen(!filterBarOpen);
    };

    const renderMobileFilterDialog = () => {
        return (
            <Dialog
                className={classes.mobileDisplay}
                fullScreen
                open={filterDialogOpen}
                onClose={handleFilterDialogClose}
                scroll='paper'
                TransitionComponent={SlideUpTransition}
                transitionDuration={500}>
                <DialogTitle
                    disableTypography
                    className={classes.filterDialogTitle}>
                    <Typography variant='h4'>Filter Plans</Typography>
                    <IconButton onClick={handleFilterDialogClose}>
                        <CloseSharpIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <FormGroup>
                            <div
                                className={`${classes.dialogRow} ${classes.dialogFilterItemRow}`}>
                                <ToolsSelector
                                    label='Select Tools'
                                    loading={false}
                                    tools={props.tools}
                                    onSelect={handleToolSelect}
                                    selectedTools={filterState.filterTools}
                                />
                            </div>
                            <div
                                className={`${classes.dialogRow} ${classes.dialogFilterItemRow}`}>
                                <MaterialsSelector
                                    label='Select Materials'
                                    loading={false}
                                    materials={props.materials}
                                    onSelect={handleMaterialSelect}
                                    selectedMaterials={
                                        filterState.filterMaterials
                                    }
                                />
                            </div>
                            <div className={`${classes.dialogFilterDateRow}`}>
                                <div
                                    className={`${classes.dialogDatePicker} ${classes.dialogDatePickerLabel}`}>
                                    <Typography>Plan Created After:</Typography>
                                    <Button
                                        onClick={handleDateChange(
                                            'filterCreatedRangeStart'
                                        )}>
                                        Clear
                                    </Button>
                                </div>
                                <DatePicker
                                    autoOk
                                    variant='static'
                                    disableFuture
                                    disableToolbar
                                    clearable
                                    openTo='date'
                                    value={filterState.filterCreatedAfter}
                                    onChange={handleDateChange(
                                        'filterCreatedRangeStart'
                                    )}
                                    className={classes.dialogDatePicker}
                                />
                            </div>
                        </FormGroup>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions
                    className={`${classes.dialogFilterDateRow} ${classes.dialogfilterActions}`}>
                    <Button
                        color='secondary'
                        variant='contained'
                        fullWidth
                        onClick={handleApply}
                        disabled={!isChanged()}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderFilterBar = () => {
        return (
            <div className={`${classes.desktopDisplay} ${classes.filterBar}`}>
                <div
                    className={`${classes.filterBarItem} ${classes.filterBarItemFixedWidth}`}>
                    <ToolsSelector
                        label='Select Tools'
                        loading={false}
                        tools={props.tools}
                        onSelect={handleToolSelect}
                        selectedTools={filterState.filterTools}
                    />
                </div>
                <div
                    className={`${classes.filterBarItem} ${classes.filterBarItemFixedWidth}`}>
                    <MaterialsSelector
                        label='Select Materials'
                        loading={false}
                        materials={props.materials}
                        onSelect={handleMaterialSelect}
                        selectedMaterials={filterState.filterMaterials}
                    />
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            autoOk
                            disableFuture
                            disableToolbar
                            clearable
                            openTo='date'
                            label='Plan Created After'
                            value={filterState.filterCreatedAfter}
                            onChange={handleDateChange(
                                'filterCreatedRangeStart'
                            )}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <Button
                        color='secondary'
                        variant='contained'
                        className={`${classes.desktopDisplay} ${classes.applyButton}`}
                        onClick={handleApply}
                        disabled={!isChanged()}>
                        Apply
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <>
            <Button
                type='submit'
                color='secondary'
                className={`${classes.mobileDisplay} ${classes.filterButton}`}
                onClick={handleOpenFilterDialog}>
                <FilterListSharpIcon
                    fontSize='large'
                    className={classes.mobileDisplay}
                />
            </Button>
            <Button
                type='submit'
                color='secondary'
                className={`${classes.desktopDisplay} ${classes.filterButton}`}
                onClick={toggleFilterBarOpen}>
                <FilterListSharpIcon />
                <span className={classes.filterButtonText}>Filter</span>
            </Button>
            {renderMobileFilterDialog()}
            {filterBarOpen && renderFilterBar()}
        </>
    );
};

export default Filter;
