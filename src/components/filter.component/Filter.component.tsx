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
    Hidden,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Typography,
} from '@material-ui/core';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// MTF
import { FilterProps } from '../../models/props';
import { FilterState } from '../../models/states';
import { mtfTheme } from '../../themes';
import { RequiredItemsSelector } from '../.';
import {
    Material,
    Tool,
    SearchablePlanSortableFieldsEnum,
    SearchableSortDirectionEnum,
} from '../../models/api-models';

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
        dialogSortButton: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: theme.spacing(1),
            textTransform: 'none',
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
        dialogClearButton: {
            marginTop: theme.spacing(1),
            marginLeft: '0px !important',
        },
        filterBar: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            paddingTop: theme.spacing(3),
        },
        filterBarItem: {
            marginRight: theme.spacing(2),
            minWidth: theme.spacing(10),
            marginBottom: theme.spacing(2),
        },
        filterBarItemFixedWidth: {
            width: theme.spacing(30),
            [theme.breakpoints.up('lg')]: {
                width: 'auto',
                minWidth: theme.spacing(30),
                maxWidth: theme.spacing(60),
            },
        },
        filterBarDatePicker: {
            width: theme.spacing(20),
        },
        filterBarToggle: {
            display: 'flex',
            alignItems: 'center',
        },
        filterBarItemText: {
            display: 'inline-block',
            width: theme.spacing(12),
        },
        filterBarSortButton: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: theme.spacing(1),
            textTransform: 'none',
            width: theme.spacing(20),
            [theme.breakpoints.up('lg')]: {
                width: 'auto',
            },
        },
        applyButton: {
            marginLeft: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        sortMenu: {
            '& .MuiMenu-paper': {
                width: theme.spacing(50),
            },
        },
    })
);

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
    const classes = useStyles(mtfTheme);

    const [filterState, setFilterState] = useState<FilterState>(
        props.filterState
    );

    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const [filterBarOpen, setFilterBarOpen] = useState<boolean>(false);
    const [sortMenuAnchor, setSortMenuAnchor] = useState<HTMLElement>(null);

    const getSortDisplayText = (
        sortProperty: SearchablePlanSortableFieldsEnum,
        sortDirection: SearchableSortDirectionEnum
    ): string => {
        switch (sortProperty) {
            case SearchablePlanSortableFieldsEnum.name:
                if (sortDirection === SearchableSortDirectionEnum.asc) {
                    return 'Name A to Z';
                } else {
                    return 'Name Z to A';
                }
            case SearchablePlanSortableFieldsEnum.created:
                if (sortDirection === SearchableSortDirectionEnum.asc) {
                    return 'Oldest To Newest';
                } else {
                    return 'Newest To Oldest';
                }
            case SearchablePlanSortableFieldsEnum.favoritedCount:
                if (sortDirection === SearchableSortDirectionEnum.asc) {
                    return 'Least Favorited';
                } else {
                    return 'Most Favorited';
                }
            case SearchablePlanSortableFieldsEnum.downloadedCount:
                if (sortDirection === SearchableSortDirectionEnum.asc) {
                    return 'Least Downloaded';
                } else {
                    return 'Most Downloaded';
                }
            default:
                return '';
        }
    };

    const handleApply = () => {
        props.onApply(filterState);

        setFilterDialogOpen(false);
    };

    const handleDateChange = (key: string) => (date: any) => {
        setFilterState({
            ...filterState,
            [key]: date == null ? null : date._d,
        });
    };

    const handleClear = () => {
        const emptyFilterState: FilterState = {
            filterMaterials: [],
            filterTools: [],
            filterCreatedAfter: null,
            sortProperty: SearchablePlanSortableFieldsEnum.created,
            sortDirection: SearchableSortDirectionEnum.desc,
        };

        setFilterState(emptyFilterState);

        props.onClear(emptyFilterState);

        setFilterDialogOpen(false);
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

    const handleSortSelect = (
        property: SearchablePlanSortableFieldsEnum,
        direction: SearchableSortDirectionEnum
    ) => () => {
        setFilterState({
            ...filterState,
            sortProperty: property,
            sortDirection: direction,
        });

        handleSortMenuClose();
    };

    const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        const el = event.currentTarget;

        setSortMenuAnchor(el);
    };

    const handleSortMenuClose = () => {
        setSortMenuAnchor(null);
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
                scroll='paper'>
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
                                <Button
                                    className={classes.dialogSortButton}
                                    onClick={handleSortMenuOpen}
                                    fullWidth
                                    size='large'
                                    variant='outlined'
                                    color='secondary'>
                                    <span>
                                        Sort by:&nbsp;
                                        {getSortDisplayText(
                                            filterState.sortProperty,
                                            filterState.sortDirection
                                        )}
                                    </span>
                                    <ArrowDropDownSharpIcon />
                                </Button>
                            </div>
                            <div
                                className={`${classes.dialogRow} ${classes.dialogFilterItemRow}`}>
                                <RequiredItemsSelector
                                    label='Select Tools'
                                    loading={false}
                                    requiredItems={props.tools}
                                    onSelect={handleToolSelect}
                                    selectedItems={filterState.filterTools}
                                    numSelectedItemsToRender={2}
                                />
                            </div>
                            <div
                                className={`${classes.dialogRow} ${classes.dialogFilterItemRow}`}>
                                <RequiredItemsSelector
                                    label='Select Materials'
                                    loading={false}
                                    requiredItems={props.materials}
                                    onSelect={handleMaterialSelect}
                                    selectedItems={filterState.filterMaterials}
                                    numSelectedItemsToRender={2}
                                />
                            </div>
                            <div className={`${classes.dialogFilterDateRow}`}>
                                <div
                                    className={`${classes.dialogDatePicker} ${classes.dialogDatePickerLabel}`}>
                                    <Typography>
                                        Plan Uploaded After:
                                    </Typography>
                                    <Button
                                        onClick={handleDateChange(
                                            'filterCreatedAfter'
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
                                        'filterCreatedAfter'
                                    )}
                                    className={classes.dialogDatePicker}
                                />
                            </div>
                        </FormGroup>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions className={`${classes.dialogFilterDateRow}`}>
                    <Button
                        color='secondary'
                        variant='contained'
                        fullWidth
                        onClick={handleApply}
                        disabled={!isChanged()}>
                        Apply
                    </Button>
                    <Button
                        className={classes.dialogClearButton}
                        variant='outlined'
                        fullWidth
                        onClick={handleClear}>
                        Clear
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
                    <RequiredItemsSelector
                        label='Select Tools'
                        loading={false}
                        requiredItems={props.tools}
                        onSelect={handleToolSelect}
                        selectedItems={filterState.filterTools}
                        numSelectedItemsToRender={2}
                    />
                </div>
                <div
                    className={`${classes.filterBarItem} ${classes.filterBarItemFixedWidth}`}>
                    <RequiredItemsSelector
                        label='Select Materials'
                        loading={false}
                        requiredItems={props.materials}
                        onSelect={handleMaterialSelect}
                        selectedItems={filterState.filterMaterials}
                        numSelectedItemsToRender={2}
                    />
                </div>
                <div
                    className={`${classes.filterBarItem} ${classes.filterBarDatePicker}`}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            autoOk
                            disableFuture
                            disableToolbar
                            clearable
                            openTo='date'
                            label='Plan Uploaded After'
                            value={filterState.filterCreatedAfter}
                            onChange={handleDateChange('filterCreatedAfter')}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <Button
                        className={classes.filterBarSortButton}
                        onClick={handleSortMenuOpen}
                        variant='outlined'
                        color='secondary'>
                        <Typography noWrap>
                            Sort by:&nbsp;
                            {getSortDisplayText(
                                filterState.sortProperty,
                                filterState.sortDirection
                            )}
                        </Typography>
                        <ArrowDropDownSharpIcon />
                    </Button>
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

    const renderSortMenu = () => {
        return (
            <Menu
                className={classes.sortMenu}
                anchorEl={sortMenuAnchor}
                open={!!sortMenuAnchor}
                onClose={handleSortMenuClose}>
                {renderMenuItem(
                    SearchablePlanSortableFieldsEnum.name,
                    SearchableSortDirectionEnum.asc
                )}
                {renderMenuItem(
                    SearchablePlanSortableFieldsEnum.name,
                    SearchableSortDirectionEnum.desc
                )}
                {renderMenuItem(
                    SearchablePlanSortableFieldsEnum.created,
                    SearchableSortDirectionEnum.asc
                )}
                {renderMenuItem(
                    SearchablePlanSortableFieldsEnum.created,
                    SearchableSortDirectionEnum.desc
                )}
                {renderMenuItem(
                    SearchablePlanSortableFieldsEnum.favoritedCount,
                    SearchableSortDirectionEnum.desc
                )}
                {renderMenuItem(
                    SearchablePlanSortableFieldsEnum.favoritedCount,
                    SearchableSortDirectionEnum.asc
                )}
                {renderMenuItem(
                    SearchablePlanSortableFieldsEnum.downloadedCount,
                    SearchableSortDirectionEnum.desc
                )}
                {renderMenuItem(
                    SearchablePlanSortableFieldsEnum.downloadedCount,
                    SearchableSortDirectionEnum.asc
                )}
            </Menu>
        );
    };

    const renderMenuItem = (
        property: SearchablePlanSortableFieldsEnum,
        direction: SearchableSortDirectionEnum
    ) => {
        return (
            <MenuItem onClick={handleSortSelect(property, direction)}>
                {getSortDisplayText(property, direction)}
            </MenuItem>
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
            <Button
                className={`${classes.desktopDisplay} ${classes.filterButton}`}
                onClick={handleClear}>
                Clear
            </Button>
            <Hidden mdUp>{renderMobileFilterDialog()}</Hidden>
            <Hidden smDown>{filterBarOpen && renderFilterBar()}</Hidden>
            {renderSortMenu()}
        </>
    );
};

export default Filter;
