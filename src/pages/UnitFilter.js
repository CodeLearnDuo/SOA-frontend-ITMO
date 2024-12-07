import React, { useState, useEffect } from 'react';
import { filterByUnit } from '../services/ebayService';
import { getUnitsOfMeasure } from '../services/productService';
import { useError } from '../contexts/ErrorContext'; // Импортируем контекст ошибок
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
  const { addError } = useError(); // Подключаем глобальную функцию для отображения ошибок

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await getUnitsOfMeasure();
      setUnits(response.data);
    } catch (err) {
      // Обрабатываем ошибку через глобальный контекст
      if (err.response) {
        const { status, data } = err.response;
        let message = 'An error occurred.';
        switch (status) {
          case 400:
            message = data.message || 'Invalid request parameters.';
            break;
          case 500:
            message = data.message || 'Internal server error.';
            break;
          default:
            message = data.message || 'Failed to fetch units of measure.';
        }
        addError(message);
      } else {
        addError('Network error. Failed to connect to the server.');
      }
    }
  };

  const handleFilter = async () => {
    try {
      const response = await filterByUnit(selectedUnit);
      setProducts(response.data);
    } catch (err) {
      // Обрабатываем ошибку через глобальный контекст
      if (err.response) {
        const { status, data } = err.response;
        let message = 'An error occurred.';
        switch (status) {
          case 400:
            message = data.message || 'Invalid unit of measure.';
            break;
          case 404:
            message = data.message || 'No products found for the selected unit.';
            break;
          case 500:
            message = data.message || 'Internal server error.';
            break;
          default:
            message = data.message || 'Failed to filter products.';
        }
        addError(message);
      } else {
        addError('Network error. Failed to connect to the server.');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Filter Products by Unit of Measure
      </Typography>
      <Select
        value={selectedUnit}
        onChange={(e) => setSelectedUnit(e.target.value)}
        displayEmpty
        style={{ marginBottom: 20, minWidth: 200 }}
      >
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
