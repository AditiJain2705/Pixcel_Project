import React from 'react'
import CustomerList from './CustomerList'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CustomerAdd from './CustomerAdd';
import { useSelector } from 'react-redux';
import EmptyState from './EmptyState';

const CustomerMaster = () => {
    const customers = useSelector(state => state.customers.customers);

  return (
    <Box display={'flex'} overflow={'hidden'}>
      <Box width={'25%'} padding={'0rem 1rem'} bgcolor={'#f5f5f5'}>
        <CustomerAdd/>
      </Box>
    <Box width={'70%'}  padding={'1rem'} >
    <Typography variant="h5">
        Customer List
      </Typography>
      {/* if customers[] have length then only list render else empty state will render*/}
{
  customers.length ? <CustomerList/> : <EmptyState/>
}
      

    </Box>
    
   
    </Box>
  )
}

export default CustomerMaster