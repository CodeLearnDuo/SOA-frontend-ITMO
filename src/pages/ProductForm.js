import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, getProductById, getUnitsOfMeasure, getOrganizationTypes } from '../services/productService';
import { useError } from '../contexts/ErrorContext'; // Импортируем контекст ошибок
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  // Стартовые значения для формы
  const [initialValues, setInitialValues] = useState({
    name: '',
    coordinates: { x: '', y: '' },
    price: '',
    partNumber: '',
    unitOfMeasure: '',
    manufacturer: { name: '', employeesCount: '', type: '' },
  });

  // Массивы для выпадающих списков
  const [units, setUnits] = useState([]);
  const [orgTypes, setOrgTypes] = useState([]);

  // Подключаем глобальный контекст ошибок
  const { addError } = useError();

  // Загружаем enum-значения для unitOfMeasure и organizationType при монтировании компонента
  useEffect(() => {
    fetchEnums();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  // Получаем данные для enum'ов
  const fetchEnums = async () => {
    try {
      const unitsResponse = await getUnitsOfMeasure();
      setUnits(unitsResponse.data);

      const orgTypesResponse = await getOrganizationTypes();
      setOrgTypes(orgTypesResponse.data);
    } catch (error) {
      // Проверка кода ошибки и добавление соответствующего сообщения
      if (error.response) {
        // Сервер вернул ошибку (например, 404, 500 и т.д.)
        if (error.response.status === 404) {
          addError('Не удалось найти данные для выпадающих списков');
        } else if (error.response.status === 500) {
          addError('Внутренняя ошибка сервера при загрузке данных');
        } else {
          addError(`Ошибка: ${error.response.status} - ${error.response.data.message || 'Неизвестная ошибка'}`);
        }
      } else if (error.request) {
        // Ошибка, когда запрос был сделан, но ответа не получено
        addError('Сетевая ошибка. Пожалуйста, проверьте подключение');
      } else {
        // Ошибка при настройке запроса
        addError('Ошибка при подготовке запроса');
      }
      console.error("Ошибка при получении данных для выпадающих списков", error);
    }
  };

  // Получаем данные продукта, если находимся в режиме редактирования
  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);

      // Убедимся, что значение organization type установлено корректно
      const typeExists = orgTypes.includes(response.data.manufacturer.type);
      
      setInitialValues(response.data);
    } catch (error) {
      // Проверка кода ошибки и добавление соответствующего сообщения
      if (error.response) {
        // Сервер вернул ошибку (например, 404, 500 и т.д.)
        if (error.response.status === 404) {
          addError('Продукт не найден');
        } else if (error.response.status === 500) {
          addError('Внутренняя ошибка сервера при загрузке продукта');
        } else {
          addError(`Ошибка: ${error.response.status} - ${error.response.data.message || 'Неизвестная ошибка'}`);
        }
      } else if (error.request) {
        // Ошибка, когда запрос был сделан, но ответа не получено
        addError('Сетевая ошибка. Пожалуйста, проверьте подключение');
      } else {
        // Ошибка при настройке запроса
        addError('Ошибка при подготовке запроса');
      }
      console.error("Ошибка при получении данных продукта", error);
    }
  };


  // Схема валидации для полей формы
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    coordinates: Yup.object().shape({
      x: Yup.number().required('Required'),
      y: Yup.number().max(398, 'Must be less than or equal to 398').required('Required'),
    }),
    price: Yup.number().positive('Must be greater than 0').required('Required'),
    partNumber: Yup.string(),
    unitOfMeasure: Yup.string().required('Required'),
    manufacturer: Yup.object().shape({
      name: Yup.string().required('Required'),
      employeesCount: Yup.number().positive('Must be greater than 0').required('Required'),
      type: Yup.string().required('Required'),
    }),
  });

  // Обработка отправки формы
  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await updateProduct(id, values);
      } else {
        await createProduct(values);
      }
      navigate('/');
    } catch (error) {
      addError('Ошибка при сохранении данных продукта');
      console.error("Ошибка при сохранении данных продукта", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <Grid container spacing={2}>
              {/* Название продукта */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Product Name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              {/* Координата X */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="coordinates.x"
                  label="X Coordinate"
                  type="number"
                  value={values.coordinates.x}
                  onChange={handleChange}
                  error={touched.coordinates?.x && Boolean(errors.coordinates?.x)}
                  helperText={touched.coordinates?.x && errors.coordinates?.x}
                />
              </Grid>

              {/* Координата Y */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="coordinates.y"
                  label="Y Coordinate"
                  type="number"
                  value={values.coordinates.y}
                  onChange={handleChange}
                  error={touched.coordinates?.y && Boolean(errors.coordinates?.y)}
                  helperText={touched.coordinates?.y && errors.coordinates?.y}
                />
              </Grid>

              {/* Цена */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Grid>

              {/* Номер детали */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="partNumber"
                  label="Part Number"
                  value={values.partNumber}
                  onChange={handleChange}
                  error={touched.partNumber && Boolean(errors.partNumber)}
                  helperText={touched.partNumber && errors.partNumber}
                />
              </Grid>

              {/* Единица измерения */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  name="unitOfMeasure"
                  label="Unit of Measure"
                  value={values.unitOfMeasure}
                  onChange={handleChange}
                  error={touched.unitOfMeasure && Boolean(errors.unitOfMeasure)}
                  helperText={touched.unitOfMeasure && errors.unitOfMeasure}
                >
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Название производителя */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="manufacturer.name"
                  label="Manufacturer Name"
                  value={values.manufacturer.name}
                  onChange={handleChange}
                  error={touched.manufacturer?.name && Boolean(errors.manufacturer?.name)}
                  helperText={touched.manufacturer?.name && errors.manufacturer?.name}
                />
              </Grid>

              {/* Количество сотрудников производителя */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="manufacturer.employeesCount"
                  label="Employees Count"
                  type="number"
                  value={values.manufacturer.employeesCount}
                  onChange={handleChange}
                  error={touched.manufacturer?.employeesCount && Boolean(errors.manufacturer?.employeesCount)}
                  helperText={touched.manufacturer?.employeesCount && errors.manufacturer?.employeesCount}
                />
              </Grid>

              {/* Тип организации */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  name="manufacturer.type"
                  label="Organization Type"
                  value={values.manufacturer.type}
                  onChange={handleChange}
                  error={touched.manufacturer?.type && Boolean(errors.manufacturer?.type)}
                  helperText={touched.manufacturer?.type && errors.manufacturer?.type}
                >
                  {orgTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Кнопка отправки */}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default ProductForm;
