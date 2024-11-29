// pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { getProductById, deleteProduct } from '../services/productService';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      navigate('/');
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography>Price: {product.price || 'N/A'}</Typography>
          <Typography>Unit: {product.unitOfMeasure}</Typography>
          <Typography>Manufacturer: {product.manufacturer.name}</Typography>
          {/* Дополнительные поля */}
        </CardContent>
      </Card>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to={`/products/${id}/edit`}>
            Edit
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
