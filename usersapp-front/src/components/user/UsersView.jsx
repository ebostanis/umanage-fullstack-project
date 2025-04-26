import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TablePagination } from '@mui/material';
import { DeleteIcon, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const api = axios.create({baseURL: process.env.REACT_APP_API_URL});

/*
 * Component for viewing the list of users
 */
const UsersView = () => {

    // State variables
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch users from the backend
    const loadUsers = useCallback(async () =>{
        try{
            const response = await api.get(`/api/users`, {
                params: {
                    page: page,
                    size: rowsPerPage,
                    search: searchTerm.trim()
                }
            });
            setUsers(response.data.content);
            setTotalUsers(response.data.totalElements);
        } catch (err){
            console.error("Failed to load users:", err)
        }
    }, [page, rowsPerPage, searchTerm]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers])

    // Handle deletion of user
    const handleDelete = async(id) => {
        try {
            await api.delete(`/api/users/${id}`);
            loadUsers();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

  return (
    <section>
        <div style={{ margin: '20px 200px' }}>
            <input
                type="text"
                className="form-control"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
                }}
                style={{ maxWidth: '300px', display: 'inline-block', marginRight: '10px' }}/>
            <Button variant="contained" onClick={loadUsers}>
                Search
            </Button>
        </div>
        <table className="table table-bordered table-hover shadow" 
                style={{ 
                placeSelf: 'center', 
                width: '80%', 
                marginTop: '10px'}}>
            <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th colSpan={"2"}>Actions</th>
                </tr>
            </thead>

            <tbody className="text-center">
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <th scope='row'>
                            {page * rowsPerPage + index + 1}
                        </th>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td className="mx-2">  
                            <Button component={Link} to={`/users/${user.id}`} sx={{color: "dimgrey"}}> 
                                <SearchIcon/> 
                            </Button>
                        </td>
                        <td className="mx-2">
                            <Button 
                                onClick={() => {
                                    setSelectedUserId(user.id);
                                    setOpenDialog(true)
                                }} 
                                sx={{color: "red"}}> 
                                    <DeleteIcon/> 
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <TablePagination
            component="div"
            count={totalUsers}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
            ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
                "margin-top": "1em",
                "margin-bottom": "1em"
            }
            }}
        />
        <Link
            to={"/"}
            type="submit"
            className="btn btn-outline-danger btn-lg"
            style={{marginLeft: '100px'}}>
                Back
        </Link>
        
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this user? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Cancel
                </Button>
                <Button 
                    onClick={async () => {
                    await handleDelete(selectedUserId);
                    setOpenDialog(false);
                    }} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </section>
  )
}

export default UsersView