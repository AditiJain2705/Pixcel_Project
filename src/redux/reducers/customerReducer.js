// Initial state for the customer reducer
const initialState = {
  customers: [],  
  loading: false, 
  error: null,    
};

function customerReducer(state = initialState, action) {
  switch (action.type) {
    // Handle the 'ADD_CUSTOMER' action
    case 'ADD_CUSTOMER':
      return {
        ...state, // Preserve existing state
        customers: [...state.customers, action.payload], // Add new customer to the list
      };

    // Handle the 'DELETE_CUSTOMER' action
    case 'DELETE_CUSTOMER':
      return {
        ...state, // Preserve existing state
        customers: state.customers.filter(customer => customer.id !== action.payload), // Remove customer with the given id
      };

    // Handle the 'UPDATE_CUSTOMER' action
    case 'UPDATE_CUSTOMER':
      return {
        ...state, // Preserve existing state
        customers: state.customers.map(customer =>
          customer.id === action.payload.id ? action.payload : customer // Update customer details if id matches
        ),
      };

    // Return the current state if no action type matches
    default:
      return state;
  }
}

export default customerReducer; 
