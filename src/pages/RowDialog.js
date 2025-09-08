import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const roles = ['Market', 'Finance', 'Development'];

export default function RowDialog({ open, mode, initialData, onClose, onSubmit }) {
    const [form, setForm] = React.useState(
        initialData || { name: '', age: '', joinDate: '', role: '' }
    );

    React.useEffect(() => {
        setForm(initialData || { name: '', age: '', joinDate: '', role: '' });
    }, [initialData, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(form);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{mode === 'add' ? 'Add Row' : 'Edit Row'}</DialogTitle>
            <DialogContent sx={{ minWidth: 350 }}>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    fullWidth
                    value={form.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Age"
                    name="age"
                    type="number"
                    fullWidth
                    value={form.age}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Join Date"
                    name="joinDate"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={form.joinDate}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Role"
                    name="role"
                    select
                    fullWidth
                    value={form.role}
                    onChange={handleChange}
                >
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {mode === 'add' ? 'Add' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}