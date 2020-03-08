// React
import React, { useState } from 'react';

// Material UI
import {
    Button,
    createStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    FormGroup,
    IconButton,
    makeStyles,
    Switch,
    Theme,
    Typography,
    DialogActions,
} from '@material-ui/core';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
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
        filterDialog: {
            width: '85vw',
            height: '85vh',
        },
        filterDialogTitle: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        filterRow: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        filterActions: {
            display: 'flex',
            alignItems: 'bottom',
        },
    })
);

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
    const classes = useStyles(mtfTheme);

    const [filterState, setFilterState] = useState<FilterState>({
        filterOpen: false,
        filterMaterials: [],
        filterTools: [],
        filterFavoritedByUser: false,
        filterDownloadedByUser: false,
        filterCreatedByUser: false,
        filterCreatedRangeStart: null,
        filterCreatedRangeEnd: null,
    });

    const handleApply = () => {
        console.log(filterState);
    };

    const handleDateChange = (key: string) => (date: any) => {
        setFilterState({
            ...filterState,
            [key]: date,
        });
    };

    const handleFilterClose = () => {
        setFilterState({
            ...filterState,
            filterOpen: false,
        });
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

        setFilterState({
            ...filterState,
            filterOpen: true,
        });
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
            <Dialog open={filterState.filterOpen} onClose={handleFilterClose}>
                <div className={classes.filterDialog}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DialogTitle
                            disableTypography
                            className={classes.filterDialogTitle}>
                            <Typography variant='h4'>Filter Plans</Typography>
                            <IconButton onClick={handleFilterClose}>
                                <CloseSharpIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
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
                                    className={classes.filterRow}
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
                                            value={
                                                filterState.filterCreatedByUser
                                            }
                                            color='secondary'
                                        />
                                    }
                                    label='Was Created By You'
                                    className={classes.filterRow}
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
                                    className={classes.filterRow}
                                />
                                <div className={classes.filterRow}>
                                    <DatePicker
                                        autoOk
                                        variant='static'
                                        disableFuture
                                        disableToolbar
                                        openTo='date'
                                        value={
                                            filterState.filterCreatedRangeStart
                                        }
                                        onChange={handleDateChange(
                                            'filterCreatedRangeStart'
                                        )}
                                    />
                                </div>
                                <div className={classes.filterRow}>
                                    <DatePicker
                                        autoOk
                                        variant='static'
                                        disableFuture
                                        disableToolbar
                                        openTo='date'
                                        value={
                                            filterState.filterCreatedRangeEnd
                                        }
                                        onChange={handleDateChange(
                                            'filterCreatedRangeEnd'
                                        )}
                                    />
                                </div>
                            </FormGroup>
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
                    </MuiPickersUtilsProvider>
                </div>
            </Dialog>
        </>
    );
};

export default Filter;
