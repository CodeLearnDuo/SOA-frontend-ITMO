// pages/UnitFilter.js
import React, { useState, useEffect } from 'react';
import { filterByUnit } from '../services/ebayService';
import { getUnitsOfMeasure } from '../services/productService';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from '@mui/material';

function UnitFilter() {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    const response = await getUnitsOfMeasure();
    setUnits(response.data);
  };

  const handleFilter = async () => {
    const response = await filterByUnit(selectedUnit);
    setProducts(response.data);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Filter Products by Unit of Measure
      </Typography>
      <Select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)} displayEmpty>
        <MenuItem value="" disabled>
          Select Unit
        </MenuItem>
        {units.map((unit) => (
          <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleFilter} style={{ marginLeft: 10 }}>
        Filter
      </Button>
      {products.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                {/* Добавьте остальные столбцы */}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  {/* Добавьте остальные данные */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default UnitFilter;
