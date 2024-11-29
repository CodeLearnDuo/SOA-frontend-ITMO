// pages/Manufacturers.js
import React, { useState, useEffect } from 'react';
import { getManufacturers } from '../services/productService';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function Manufacturers() {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    const response = await getManufacturers();
    setManufacturers(response.data);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manufacturers
      </Typography>
      <List>
        {manufacturers.map((manufacturer) => (
          <ListItem key={manufacturer.id}>
            <ListItemText
              primary={manufacturer.name}
              secondary={`Employees: ${manufacturer.employeesCount || 'N/A'}, Type: ${manufacturer.type || 'N/A'}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Manufacturers;
