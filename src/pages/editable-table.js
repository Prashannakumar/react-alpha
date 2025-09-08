import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    Toolbar,
    ToolbarButton,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import Checkbox from '@mui/material/Checkbox';
import RowDialog from './RowDialog';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => randomArrayItem(roles);

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

function EditToolbar({ selectedRowId, handleAddOpen, handleEditOpen, handleDeleteClick }) {
    return (
        <Toolbar>
            <Tooltip title="Add record">
                <ToolbarButton onClick={handleAddOpen}>
                    <AddIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>
            <Tooltip title="Edit">
                <span>
                    <ToolbarButton
                        onClick={selectedRowId ? handleEditOpen : undefined}
                        disabled={!selectedRowId}
                    >
                        <EditIcon fontSize="small" />
                    </ToolbarButton>
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span>
                    <ToolbarButton
                        onClick={selectedRowId ? handleDeleteClick(selectedRowId) : undefined}
                        disabled={!selectedRowId}
                    >
                        <DeleteIcon fontSize="small" />
                    </ToolbarButton>
                </span>
            </Tooltip>
        </Toolbar>
    );
}

export default function EditableTable() {
    const [rows, setRows] = React.useState(initialRows);
    const [selectedRowId, setSelectedRowId] = React.useState(null);

    // Dialog state
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogMode, setDialogMode] = React.useState('add'); // 'add' or 'edit'
    const [dialogInitialData, setDialogInitialData] = React.useState(null);

    // Open Add Dialog
    const handleAddOpen = () => {
        setDialogMode('add');
        setDialogInitialData({ name: '', age: '', joinDate: '', role: '' });
        setDialogOpen(true);
    };

    // Open Edit Dialog
    const handleEditOpen = () => {
        const row = rows.find((r) => r.id === selectedRowId);
        setDialogMode('edit');
        setDialogInitialData({
            name: row.name,
            age: row.age,
            joinDate: row.joinDate,
            role: row.role,
        });
        setDialogOpen(true);
    };

    // Dialog submit handler
    const handleDialogSubmit = (formData) => {
        if (dialogMode === 'add') {
            setRows((oldRows) => [
                ...oldRows,
                {
                    id: randomId(),
                    ...formData,
                },
            ]);
        } else if (dialogMode === 'edit' && selectedRowId) {
            setRows((oldRows) =>
                oldRows.map((row) =>
                    row.id === selectedRowId ? { ...row, ...formData } : row
                )
            );
        }
        setDialogOpen(false);
    };

    // Dialog close handler
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        setSelectedRowId(null);
    };

    const columns = [
        {
            field: 'select',
            headerName: '',
            width: 50,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Checkbox
                    checked={params.id === selectedRowId}
                    onChange={() =>
                        setSelectedRowId(params.id === selectedRowId ? null : params.id)
                    }
                    style={{ cursor: 'pointer' }}
                />
            ),
        },
        { field: 'name', headerName: 'Name', width: 180 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'joinDate',
            headerName: 'Join date',
            type: 'date',
            width: 180,
        },
        {
            field: 'role',
            headerName: 'Department',
            width: 220,
            type: 'singleSelect',
            valueOptions: roles,
        },
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
                slots={{
                    toolbar: (toolbarProps) => (
                        <EditToolbar
                            {...toolbarProps}
                            selectedRowId={selectedRowId}
                            handleAddOpen={handleAddOpen}
                            handleEditOpen={handleEditOpen}
                            handleDeleteClick={handleDeleteClick}
                        />
                    ),
                }}
                showToolbar
                onRowClick={(params) => setSelectedRowId(params.id)}
                getRowClassName={(params) =>
                    params.id === selectedRowId ? 'Mui-selected' : ''
                }
            />
            <RowDialog
                open={dialogOpen}
                mode={dialogMode}
                initialData={dialogInitialData}
                onClose={handleDialogClose}
                onSubmit={handleDialogSubmit}
            />
        </Box>
    );
}
