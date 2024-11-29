import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  TextField,
  Grid,
  Popover,
} from '@mui/material';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortFields, setSortFields] = useState("id"); // Поле для сортировки
  const [filters, setFilters] = useState(""); // Поле для фильтрации
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [page, size]);

  const fetchProducts = async () => {
    const sortArray = sortFields ? sortFields.split(',').map((field) => field.trim()) : ["id"];
    const filterArray = filters ? filters.split(',').map((filter) => filter.trim()) : [];

    const response = await getProducts({
      page,
      size,
      sort: sortArray,
      filter: filterArray.length > 0 ? filterArray : undefined,
    });

    setProducts(response.data.content);
  };

  const handleSortChange = (event) => {
    setSortFields(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilters(event.target.value);
  };

  const applySort = () => {
    fetchProducts();
  };

  const applyFilter = () => {
    fetchProducts();
  };

  const handleInfoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'sort-filter-info-popover' : undefined;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/products/new">
        Add New Product
      </Button>

      {/* Кнопка для отображения подсказки */}
      <Button
        variant="text"
        color="secondary"
        startIcon={<InfoIcon />}
        onClick={handleInfoClick}
        style={{ marginLeft: 10 }}
      >
        Info
      </Button>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleInfoClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography style={{ padding: 10, maxWidth: 300 }}>
          <strong>Sorting:</strong> Enter fields for sorting, e.g., `-price,name`. Available fields: 
          <em>id, name, creationDate, price, partNumber, unitOfMeasure, coordinates.x, coordinates.y, manufacturer.id, manufacturer.name, manufacturer.employeesCount, manufacturer.type</em>. Prefix with `-` for descending order.
          <br /><br />
          <strong>Filtering:</strong> Enter filters in the format `field[operator]=value`, e.g., `id[eq]=1,price[gt]=100`. Supported operators: 
          <em>eq (equal), ne (not equal), gt (greater than), lt (less than), gte (greater than or equal to), lte (less than or equal to)</em>.
        </Typography>
      </Popover>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {/* Поле ввода для сортировки */}
        <Grid item xs={8}>
          <TextField
            label="Sort Fields"
            placeholder="e.g., -price,name"
            value={sortFields}
            onChange={handleSortChange}
            fullWidth
            helperText="Enter fields for sorting, e.g., -price,name"
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="secondary" onClick={applySort} fullWidth>
            Apply Sort
          </Button>
        </Grid>

        {/* Поле ввода для фильтрации */}
        <Grid item xs={8}>
          <TextField
            label="Filters"
            placeholder="e.g., id[eq]=1,price[gt]=100"
            value={filters}
            onChange={handleFilterChange}
            fullWidth
            helperText="Enter filters, e.g., id[eq]=1,price[gt]=100"
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="secondary" onClick={applyFilter} fullWidth>
            Apply Filter
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Manufacturer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} component={Link} to={`/products/${product.id}`} style={{ cursor: 'pointer' }}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price || 'N/A'}</TableCell>
                <TableCell>{product.unitOfMeasure}</TableCell>
                <TableCell>{product.manufacturer.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ProductList;
