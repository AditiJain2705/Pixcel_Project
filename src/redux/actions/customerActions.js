import axios from 'axios';

export const addCustomer = customer => dispatch => {
  // Here you might want to do some async operations like API calls
  dispatch({
    type: 'ADD_CUSTOMER',
    payload: customer,
  });
};

export const deleteCustomer = id => dispatch => {
  dispatch({
    type: 'DELETE_CUSTOMER',
    payload: id,
  });
};

export const updateCustomer = customer => dispatch => {
  dispatch({
    type: 'UPDATE_CUSTOMER',
    payload: customer,
  });
};

export const verifyPAN = panNumber => async dispatch => {
  try {
    const response = await axios.post('https://lab.pixel6.co/api/verify-pan.php', {
      panNumber,
    });
    if (response.data.isValid) {
      // Prefill the Full Name field
      return response.data.fullName;
    }
  } catch (error) {
    console.error('Error verifying PAN:', error);
  }
};

export const getPostcodeDetails = postcode => async dispatch => {
  try {
    const response = await axios.post('https://lab.pixel6.co/api/get-postcode-details.php', {
      postcode,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting postcode details:', error);
  }
}