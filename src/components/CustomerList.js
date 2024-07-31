import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCustomer } from '../redux/actions/customerActions';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CustomerList = () => {
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customers.customers);
  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };
  const handleEdit=(e)=>{
    console.log(e);
  }

  return (
    <div style={{ padding: 2,width:"100%"}}>
    
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PAN</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(customer => (
              <TableRow key={customer.id}>
                <TableCell>{customer.pan}</TableCell>
                <TableCell>{customer.fullName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.mobile}</TableCell>
                <TableCell>
                  <Button 
                    component={Link}
                    onClick={()=>handleEdit(customer)}
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerList;
