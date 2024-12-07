import React, { useState, useEffect } from 'react';
import { getProductById, deleteProduct } from '../services/productService';
import { useError } from '../contexts/ErrorContext'; // Импортируем контекст ошибок
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

  // Подключаем контекст ошибок
  const { addError } = useError();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (error) {
      // Обработка ошибок при загрузке продукта
      if (error.response?.status === 404) {
        addError('Продукт не найден!');
      } else {
        addError('Ошибка при загрузке данных продукта. Попробуйте позже.');
      }
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      navigate('/');
    } catch (error) {
      // Обработка ошибок при удалении продукта
      if (error.response?.status === 403) {
        addError('У вас нет прав для удаления этого продукта.');
      } else if (error.response?.status === 404) {
        addError('Продукт не найден для удаления.');
      } else {
        addError('Ошибка при удалении продукта. Попробуйте позже.');
      }
      console.error(error);
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
