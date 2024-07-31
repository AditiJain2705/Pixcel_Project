import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer, verifyPAN, updateCustomer } from '../redux/actions/customerActions';
import axios from 'axios';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid, InputAdornment } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = ({ open, onClose, existingCustomer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // use route parameters for editing

  const [pan, setPan] = useState(existingCustomer ? existingCustomer.pan : '');
  const [fullName, setFullName] = useState(existingCustomer ? existingCustomer.fullName : '');
  const [email, setEmail] = useState(existingCustomer ? existingCustomer.email : '');
  const [mobile, setMobile] = useState(existingCustomer ? existingCustomer.mobile : '');
  const [addresses, setAddresses] = useState(existingCustomer ? existingCustomer.addresses : [{ addressLine1: '', addressLine2: '', postcode: '', city: '', state: '' }]);
  const [postcode, setPostcode] = useState('');
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    if (postcode) {
      axios.post('https://lab.pixel6.co/api/get-postcode-details.php', { postcode })
        .then(response => {
          if (response.data.status === 'Success') {
            setCities(response.data.city);
            setStates(response.data.state);
          }
        })
        .catch(error => {
          console.error('Error fetching postcode details:', error);
        });
    }
  }, [postcode]);

  const handlePANBlur = async () => {
    const name = await dispatch(verifyPAN(pan));
    setFullName(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerData = { pan, fullName, email, mobile, addresses };
    if (id) {
      // If id is present, update existing customer
      dispatch(updateCustomer({ ...customerData, id }));
    } else {
      // Otherwise, add new customer
      dispatch(addCustomer(customerData));
    }
    onClose(); // Close the dialog
    navigate('/customers');
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = addresses.slice();
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ height: '60vh', width: '100%' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="PAN"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
            onBlur={handlePANBlur}
            maxLength="10"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            maxLength="140"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            maxLength="255"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
      label="Mobile Number"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
      InputProps={{
        startAdornment: <InputAdornment position="start">+91</InputAdornment>, 
      }}
      required
      fullWidth
      inputProps={{
        maxLength: 10,
      }}
    />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>City</InputLabel>
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              label="City"
            >
              <MenuItem value="">Select City</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>State</InputLabel>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              label="State"
            >
              <MenuItem value="">Select State</MenuItem>
              {states.map((state) => (
                <MenuItem key={state.id} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Address fields */}
        {addresses.map((address, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address Line 1"
                value={address.addressLine1}
                onChange={(e) => handleAddressChange(index, 'addressLine1', e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address Line 2"
                value={address.addressLine2}
                onChange={(e) => handleAddressChange(index, 'addressLine2', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Postcode"
                value={address.postcode}
                onChange={(e) => handleAddressChange(index, 'postcode', e.target.value)}
                maxLength="6"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                value={address.city}
                onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                value={address.state}
                onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                required
                fullWidth
              />
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CustomerForm;
