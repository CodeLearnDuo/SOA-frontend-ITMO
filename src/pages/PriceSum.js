import React, { useState, useEffect } from 'react';
import { getPriceSum } from '../services/productService';
import { increasePrices } from '../services/ebayService';
import { useError } from '../contexts/ErrorContext'; // Импортируем контекст ошибок
import {
  Container,
  Typography,
  Button,
  TextField,
} from '@mui/material';

function PriceSum() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [increasePercent, setIncreasePercent] = useState('');
  const { addError } = useError(); // Подключаем глобальный контекст ошибок

  useEffect(() => {
    fetchPriceSum();
  }, []);

  const fetchPriceSum = async () => {
    try {
      const response = await getPriceSum();
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      // Обработка ошибок при получении общей суммы цен
      if (error.response?.status === 500) {
        addError('Ошибка на сервере при получении общей суммы цен.');
      } else {
        addError('Ошибка при получении общей суммы цен. Попробуйте позже.');
      }
      console.error(error);
    }
  };

  const handleIncrease = async () => {
    try {
      await increasePrices(increasePercent);
      fetchPriceSum(); // Обновить сумму после изменения цен
    } catch (error) {
      // Обработка ошибок при увеличении цен
      if (error.response?.status === 400) {
        addError('Указано некорректное значение процента увеличения.');
      } else if (error.response?.status === 500) {
        addError('Ошибка на сервере при увеличении цен.');
      } else {
        addError('Ошибка при увеличении цен. Попробуйте позже.');
      }
      console.error(error);
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
