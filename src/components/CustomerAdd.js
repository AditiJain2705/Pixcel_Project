import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomerForm from './CustomerForm'

const CustomerAdd = () => {
  return (
    <Box height={'100vh'} width={'100%'}>
        <Box padding={'1rem 0rem'}>
        <Typography variant='h5'>
            Customer Add Form
        </Typography>
      
        </Box>
       <CustomerForm/>

    </Box>
  )
}

export default CustomerAdd