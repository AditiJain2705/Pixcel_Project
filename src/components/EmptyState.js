import { Box } from '@mui/material'
import React from 'react'

const EmptyState = () => {
  return (
    <Box
    height="80vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <img
      src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722297600&semt=ais_hybrid"
      alt="No Data Found"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  </Box>
  )
}

export default EmptyState