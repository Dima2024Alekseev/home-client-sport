import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { toast, Toaster } from 'react-hot-toast';

const Form = ({ showFields, formTitle, title_button, onSubmit, recaptchaSiteKey }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    age: '',
    direction: '',
    login: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (showFields.phone) {
      setFormData((prevData) => ({
        ...prevData,
        phone: '+7',
      }));
    }
  }, [showFields.phone]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Проверка на ввод цифр для полей "Имя" и "Фамилия"
    if (id === 'name' || id === 'lastname') {
      if (!/^[а-яА-ЯёЁa-zA-Z]*$/.test(value)) {
        return;
      }
      // Проверка на ввод более 30 символов для полей "Имя" и "Фамилия"
      if (value.length > 30) {
        return;
      }
    }

    // Проверка на ввод более двух цифр для поля "Возраст"
    if (id === 'age' && value.length > 2) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Удаляем ошибки при изменении значения поля
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (showFields.age && (isNaN(formData.age) || formData.age < 3 || formData.age > 60)) {
      toast.error('Возраст должен быть числом от 3 до 60');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSubmit) {
        await onSubmit(formData, resetForm);
      } else {
        console.error('Функция onSubmit не передана');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      lastname: '',
      phone: '+7',
      age: '',
      direction: '',
      login: '',
      password: '',
    });
  };

  return (
    <div className="content-registration">
      <Toaster position="bottom-right" />
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">{formTitle}</h1>
        {showFields.name && (
          <label>
            <input
              id="name"
              type="text"
              placeholder=""
              required
              value={formData.name}
              onChange={handleChange}
              aria-label="Имя"
              aria-describedby="name-description"
            />
            <span>Имя</span>
          </label>
        )}
        {showFields.lastname && (
          <label>
            <input
              id="lastname"
              type="text"
              placeholder=""
              required
              value={formData.lastname}
              onChange={handleChange}
              aria-label="Фамилия"
              aria-describedby="lastname-description"
            />
            <span>Фамилия</span>
          </label>
        )}
        {showFields.phone && (
          <label id="indentation">
            <InputMask
              mask="+7 999 999-99-99"
              value={formData.phone}
              onChange={(e) => handleChange({ target: { id: 'phone', value: e.target.value } })}
              onFocus={(e) => {
                if (e.target.value === '') {
                  setFormData((prevData) => ({
                    ...prevData,
                    phone: '+7',
                  }));
                }
              }}
            >
              {(inputProps) => <input {...inputProps} id="phone" type="tel" placeholder="+7" required aria-label="Телефон" aria-describedby="phone-description" />}
            </InputMask>
            <span>Телефон</span>
            {errors.phone && <p className="error">{errors.phone}</p>}
          </label>
        )}
        {showFields.age && (
          <label id="indentation">
            <input
              id="age"
              type="number"
              placeholder=""
              required
              value={formData.age}
              onChange={handleChange}
              aria-label="Возраст"
              aria-describedby="age-description"
            />
            <span>Возраст</span>
            {errors.age && <p className="error">{errors.age}</p>}
          </label>
        )}
        {showFields.direction && (
          <label id="indentation">
            <select
              id="direction"
              required
              value={formData.direction}
              onChange={handleChange}
              aria-label="Направление"
              aria-describedby="direction-description"
            >
              <option value="" disabled>Выберите направление</option>
              <option value="Мма">Мма</option>
              <option value="Грэпплинг">Грэпплинг</option>
              <option value="Бокс">Бокс</option>
              <option value="Кикбоксинг">Кикбоксинг</option>
              <option value="Рукопашный бой">Рукопашный бой</option>
              <option value="Каратэ">Каратэ</option>
              <option value="Женская самооборона">Женская самооборона</option>
            </select>
          </label>
        )}
        {showFields.login && (
          <label>
            <input
              id="login"
              type="text"
              placeholder=""
              required
              value={formData.login}
              onChange={handleChange}
              aria-label="Логин"
              aria-describedby="login-description"
            />
            <span>Логин</span>
          </label>
        )}
        {showFields.password && (
          <label>
            <input
              id="password"
              type="password"
              placeholder=""
              required
              value={formData.password}
              onChange={handleChange}
              aria-label="Пароль"
              aria-describedby="password-description"
            />
            <span>Пароль</span>
          </label>
        )}
        {recaptchaSiteKey && (
          <div className="recaptcha-container">
            <div className="g-recaptcha" data-sitekey={recaptchaSiteKey}></div>
          </div>
        )}
        <button type="submit" className="submit">{title_button}</button>
      </form>
    </div>
  );
};

export default Form;
