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
    FormControlLabel,
    FormGroup,
    IconButton,
    makeStyles,
    Slide,
    Switch,
    Theme,
    Typography,
} from '@material-ui/core';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { TransitionProps } from '@material-ui/core/transitions';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// MTF
import { mtfTheme } from '../../themes';
import { FilterProps } from '../../models/props';
import { FilterState } from '../../models/states';
import { Material, Tool } from '../../models/api-models';
import MaterialsSelector from '../materials-selector.component/MaterialsSelector.component';
import ToolsSelector from '../tools-selector.component/ToolsSelector.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filterButton: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        filterIcon: {
            [theme.breakpoints.up('md')]: {
                marginRight: theme.spacing(1),
            },
        },
        filterButtonMobile: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        filterButtonDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'inline',
            },
        },
        filterDialogTitle: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        filterContent: {
            overflowY: 'auto',
        },
        filterRow: {
            marginBottom: theme.spacing(3),
        },
        centerRow: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            flexWrap: 'wrap',
        },
        datePicker: {
            width: '100%',
            textAlign: 'center',
        },
        datePickerLabel: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        filterActions: {
            display: 'flex',
            alignItems: 'bottom',
        },
    })
);

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
    const classes = useStyles(mtfTheme);

    const [filterState, setFilterState] = useState<FilterState>(
        props.filterState
    );

    const [filterOpen, setFilterOpen] = useState<boolean>(false);

    const handleApply = () => {
        props.onApply(filterState);

        setFilterOpen(false);
    };

    const handleDateChange = (key: string) => (date: any) => {
        setFilterState({
            ...filterState,
            [key]: date == null ? null : date._d,
        });
    };

    const handleFilterClose = () => {
        setFilterOpen(false);
        setFilterState(props.filterState);
    };

    const handleMaterialSelect = (materials: Material[]) => {
        setFilterState({
            ...filterState,
            filterMaterials: materials.map(material => material.id),
        });
    };
    const handleToolSelect = (tools: Tool[]) => {
        setFilterState({
            ...filterState,
            filterTools: tools.map(tool => tool.id),
        });
    };

    const handleSwitchChange = (key: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFilterState({
            ...filterState,
            [key]: event.target.checked,
        });
    };

    const handleToggleFilter = (event: React.FormEvent) => {
        event.preventDefault();

        setFilterOpen(true);
    };

    return (
        <>
            <Button
                type='submit'
                color='secondary'
                className={classes.filterButton}
                onClick={handleToggleFilter}>
                <FilterListSharpIcon
                    fontSize='large'
                    className={classes.filterButtonMobile}
                />
                <FilterListSharpIcon
                    className={`${classes.filterButtonDesktop} ${classes.filterIcon}`}
                />
                <span className={classes.filterButtonDesktop}>Filter</span>
            </Button>
            <Dialog
                fullScreen
                open={filterOpen}
                onClose={handleFilterClose}
                scroll='paper'
                TransitionComponent={Transition}
                transitionDuration={500}>
                <DialogTitle
                    disableTypography
                    className={classes.filterDialogTitle}>
                    <Typography variant='h4'>Filter Plans</Typography>
                    <IconButton onClick={handleFilterClose}>
                        <CloseSharpIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <FormGroup>
                            <div className={classes.filterRow}>
                                <ToolsSelector
                                    label='Select Tools'
                                    loading={false}
                                    tools={props.tools}
                                    onSelect={handleToolSelect}
                                />
                            </div>
                            <div className={classes.filterRow}>
                                <MaterialsSelector
                                    label='Select Materials'
                                    loading={false}
                                    materials={props.materials}
                                    onSelect={handleMaterialSelect}
                                />
                            </div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={
                                            filterState.filterFavoritedByUser
                                        }
                                        onChange={handleSwitchChange(
                                            'filterFavoritedByUser'
                                        )}
                                        value={
                                            filterState.filterFavoritedByUser
                                        }
                                        color='secondary'
                                    />
                                }
                                label='Is Favorited By You'
                                className={`${classes.filterRow}`}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={
                                            filterState.filterCreatedByUser
                                        }
                                        onChange={handleSwitchChange(
                                            'filterCreatedByUser'
                                        )}
                                        value={filterState.filterCreatedByUser}
                                        color='secondary'
                                    />
                                }
                                label='Was Created By You'
                                className={`${classes.filterRow}`}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={
                                            filterState.filterDownloadedByUser
                                        }
                                        onChange={handleSwitchChange(
                                            'filterDownloadedByUser'
                                        )}
                                        value={
                                            filterState.filterDownloadedByUser
                                        }
                                        color='secondary'
                                    />
                                }
                                label='Was Downloaded By You'
                                className={`${classes.filterRow}`}
                            />
                            <div className={classes.centerRow}>
                                <div
                                    className={`${classes.datePicker} ${classes.datePickerLabel}`}>
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
                                    value={filterState.filterCreatedRangeStart}
                                    onChange={handleDateChange(
                                        'filterCreatedRangeStart'
                                    )}
                                    className={classes.datePicker}
                                />
                            </div>
                        </FormGroup>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions className={classes.filterActions}>
                    <Button
                        color='secondary'
                        variant='contained'
                        fullWidth
                        onClick={handleApply}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Filter;
