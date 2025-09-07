import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    Toolbar,
    ToolbarButton,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows = [
    {
        id: randomId(),
        name: randomTraderName(),
        age: 25,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 36,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 19,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 28,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 23,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
];

function EditToolbar(props) {
    const {
        setRows,
        setRowModesModel,
        selectedRowId,
        rowModesModel,
        handleEditClick,
        handleDeleteClick,
        handleSaveClick,
        handleCancelClick,
    } = props;

    const handleAddClick = () => {
        const id = randomId();
        setRows((oldRows) => [
            ...oldRows,
            { id, name: '', age: '', role: '', isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    const isInEditMode = selectedRowId && rowModesModel[selectedRowId]?.mode === GridRowModes.Edit;

    return (
        <Toolbar>
            <Tooltip title="Add record">
                <ToolbarButton onClick={handleAddClick}>
                    <AddIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>
            <Tooltip title="Edit">
                <span>
                    <ToolbarButton
                        onClick={selectedRowId ? handleEditClick(selectedRowId) : undefined}
                        disabled={!selectedRowId || isInEditMode}
                    >
                        <EditIcon fontSize="small" />
                    </ToolbarButton>
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span>
                    <ToolbarButton
                        onClick={selectedRowId ? handleDeleteClick(selectedRowId) : undefined}
                        disabled={!selectedRowId || isInEditMode}
                    >
                        <DeleteIcon fontSize="small" />
                    </ToolbarButton>
                </span>
            </Tooltip>
            <Tooltip title="Save">
                <span>
                    <ToolbarButton
                        onClick={selectedRowId ? handleSaveClick(selectedRowId) : undefined}
                        disabled={!selectedRowId || !isInEditMode}
                    >
                        <SaveIcon fontSize="small" />
                    </ToolbarButton>
                </span>
            </Tooltip>
            <Tooltip title="Cancel">
                <span>
                    <ToolbarButton
                        onClick={selectedRowId ? handleCancelClick(selectedRowId) : undefined}
                        disabled={!selectedRowId || !isInEditMode}
                    >
                        <CancelIcon fontSize="small" />
                    </ToolbarButton>
                </span>
            </Tooltip>
        </Toolbar>
    );
}

export default function EditableTable() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [selectedRowId, setSelectedRowId] = React.useState(null);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        setSelectedRowId(null);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
            setSelectedRowId(null);
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'joinDate',
            headerName: 'Join date',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Department',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
        },
        // Removed actions column
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: (toolbarProps) => (
                        <EditToolbar
                            {...toolbarProps}
                            setRows={setRows}
                            setRowModesModel={setRowModesModel}
                            selectedRowId={selectedRowId}
                            rowModesModel={rowModesModel}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                            handleSaveClick={handleSaveClick}
                            handleCancelClick={handleCancelClick}
                        />
                    ),
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                showToolbar
                onRowClick={(params) => setSelectedRowId(params.id)}
                // Optional: highlight selected row
                getRowClassName={(params) =>
                    params.id === selectedRowId ? 'Mui-selected' : ''
                }
            />
        </Box>
    );
}
