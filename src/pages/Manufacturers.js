import React, { useState, useEffect } from 'react';
import { getManufacturers } from '../services/productService';
import { useError } from '../contexts/ErrorContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function Manufacturers() {
  const [manufacturers, setManufacturers] = useState([]);
  const { addError } = useError(); // Подключаем глобальный контекст ошибок

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
      const response = await getManufacturers();
      setManufacturers(response.data);
    } catch (error) {
      // Универсальная обработка ошибок
      const status = error.response?.status;
      if (status === 400) {
        addError('Неправильный запрос. Проверьте параметры.');
      } else if (status === 401) {
        addError('Необходима авторизация для выполнения запроса.');
      } else if (status === 403) {
        addError('Доступ запрещен.');
      } else if (status === 404) {
        addError('Производители не найдены.');
      } else if (status === 500) {
        addError('Ошибка на сервере при получении списка производителей.');
      } else {
        addError('Произошла неизвестная ошибка. Попробуйте позже.');
      }
      console.error(error);
    }
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
