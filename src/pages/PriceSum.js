// pages/PriceSum.js
import React, { useState, useEffect } from 'react';
import { getPriceSum } from '../services/productService';
import { increasePrices } from '../services/ebayService';
import {
  Container,
  Typography,
  Button,
  TextField,
} from '@mui/material';

function PriceSum() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [increasePercent, setIncreasePercent] = useState('');

  useEffect(() => {
    fetchPriceSum();
  }, []);

  const fetchPriceSum = async () => {
    const response = await getPriceSum();
    setTotalPrice(response.data.totalPrice);
  };

  const handleIncrease = async () => {
    try {
      await increasePrices(increasePercent);
      fetchPriceSum(); // Обновить сумму после изменения цен
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Total Price of All Products
      </Typography>
      <Typography variant="h5">{`$${totalPrice.toFixed(2)}`}</Typography>
      <TextField
        label="Increase Percent"
        value={increasePercent}
        onChange={(e) => setIncreasePercent(e.target.value)}
        type="number"
        style={{ marginTop: 20 }}
      />
      <Button variant="contained" color="primary" onClick={handleIncrease} style={{ marginLeft: 10, marginTop: 20 }}>
        Increase Prices
      </Button>
    </Container>
  );
}

export default PriceSum;
