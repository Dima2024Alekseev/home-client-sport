import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import Header from "../Components/Header";
import Footer from "../Components/Footer/Footer";
import "../styles/attendance-journal.css";
import { useNotification } from '../Components/NotificationContext';

const AttendanceJournal = () => {
  const { showNotification } = useNotification();
  const [attendanceData, setAttendanceData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newEntry, setNewEntry] = useState({ studentName: '', month: new Date().getMonth() + 1, attendance: {}, days: [] });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Текущий месяц по умолчанию
  const [selectedGroup, setSelectedGroup] = useState(''); // Текущая группа по умолчанию
  const [daysToDisplay, setDaysToDisplay] = useState([]); // Начальные числа месяца
  const [newDay, setNewDay] = useState('');
  const [groups, setGroups] = useState([]); // Список групп
  const [newGroup, setNewGroup] = useState(''); // Новая группа
  const [editingGroup, setEditingGroup] = useState(null); // Редактируемая группа

  const fetchAttendanceData = useCallback(async () => {
    try {
      const response = await axios.get('/api/attendance', {
        params: { month: selectedMonth, group: selectedGroup }
      });
      const data = response.data;
      const days = data.flatMap(entry => entry.days);
      setDaysToDisplay([...new Set(days)].sort((a, b) => a - b)); // Удаление дубликатов и сортировка
      setAttendanceData(data.sort((a, b) => a.studentName.localeCompare(b.studentName))); // Сортировка по алфавиту
      console.log('Загруженные данные:', data);
    } catch (error) {
      console.error('Ошибка при получении данных посещаемости:', error);
      showNotification('Ошибка при получении данных посещаемости', 'error');
    }
  }, [selectedMonth, selectedGroup, showNotification]);

  const fetchGroups = useCallback(async () => {
    try {
      const response = await axios.get('/api/groups');
      setGroups(response.data);
      if (response.data.length > 0) {
        setSelectedGroup(response.data[0]._id); // Устанавливаем первую группу по умолчанию
      }
    } catch (error) {
      console.error('Ошибка при получении групп:', error);
      showNotification('Ошибка при получении групп', 'error');
    }
  }, [showNotification]);

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(decodedToken.role === 'admin');
      }
    };

    checkAdmin();
    fetchGroups(); // Сначала загружаем группы
  }, [fetchGroups]);

  useEffect(() => {
    if (selectedGroup) {
      fetchAttendanceData(); // Загружаем данные посещаемости после установки группы
    }
  }, [selectedGroup, fetchAttendanceData]);

  const handleChange = (index, field, value) => {
    const newAttendanceData = [...attendanceData];
    if (field.includes('attendance.')) {
      const day = field.split('.')[1];
      newAttendanceData[index].attendance[day] = value;
    } else {
      newAttendanceData[index][field] = value;
    }
    setAttendanceData(newAttendanceData.sort((a, b) => a.studentName.localeCompare(b.studentName))); // Сортировка по алфавиту
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedEntries = attendanceData.map(entry => ({
        ...entry,
        month: selectedMonth,
        days: daysToDisplay // Добавьте дни к каждой записи
      }));
      await axios.put('/api/attendance', { attendance: updatedEntries }, {
        headers: {
          'Authorization': token
        }
      });
      showNotification('Журнал посещаемости обновлен', 'success');
    } catch (error) {
      console.error('Ваша сессия истекла', error);
      showNotification('Ваша сессия истекла', 'error');
    }
  };

  const handleAddEntry = async () => {
    try {
      const token = localStorage.getItem('token');
      const newEntryWithMonth = {
        ...newEntry,
        month: parseInt(newEntry.month, 10),
        days: daysToDisplay // Добавьте дни к новой записи
      };
      console.log('Новая запись:', newEntryWithMonth);
      const response = await axios.post('/api/attendance', newEntryWithMonth, {
        headers: {
          'Authorization': token
        },
        params: { group: selectedGroup } // Передаем группу в query параметрах
      });
      console.log('Ответ сервера:', response.data);
      setNewEntry({ studentName: '', month: new Date().getMonth() + 1, attendance: {}, days: [] });
      showNotification('Запись добавлена', 'success');
      // Обновление данных после добавления новой записи
      fetchAttendanceData();
    } catch (error) {
      console.error('Ошибка при добавлении записи:', error);
      showNotification('Ошибка при добавлении записи: ' + error.message, 'error');
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/attendance/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      setAttendanceData(attendanceData.filter(entry => entry._id !== id));
      showNotification('Запись удалена', 'success');
    } catch (error) {
      console.error('Ошибка при удалении записи:', error);
      showNotification('Ошибка при удалении записи', 'error');
    }
  };

  const handleAddDay = () => {
    const day = parseInt(newDay, 10);
    if (day && day >= 1 && day <= 31 && !daysToDisplay.includes(day)) {
      setDaysToDisplay([...daysToDisplay, day].sort((a, b) => a - b));
      setNewDay('');
      console.log('Добавлен новый день:', day);
    } else {
      showNotification('Пожалуйста, введите число от 1 до 31.', 'error');
    }
  };

  const handleRemoveDay = (day) => {
    setDaysToDisplay(daysToDisplay.filter(d => d !== day).sort((a, b) => a - b));
    console.log('Удален день:', day);
  };

  const handleCopyAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/attendance/copy', { month: selectedMonth }, {
        headers: {
          'Authorization': token
        }
      });
      showNotification('Данные посещаемости скопированы на следующий месяц', 'success');
    } catch (error) {
      console.error('Ошибка при копировании данных посещаемости:', error);
      showNotification('Ошибка при копировании данных посещаемости', 'error');
    }
  };

  const handleAddGroup = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/groups', { name: newGroup }, {
        headers: {
          'Authorization': token
        }
      });
      setNewGroup('');
      fetchGroups();
      showNotification('Группа добавлена', 'success');
    } catch (error) {
      console.error('Ошибка при добавлении группы:', error);
      showNotification('Ошибка при добавлении группы', 'error');
    }
  };

  const handleUpdateGroup = async (id, name) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/groups/${id}`, { name }, {
        headers: {
          'Authorization': token
        }
      });
      fetchGroups();
      showNotification('Группа обновлена', 'success');
      setEditingGroup(null); // Сброс состояния редактирования
    } catch (error) {
      console.error('Ошибка при обновлении группы:', error);
      showNotification('Ошибка при обновлении группы', 'error');
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/groups/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      fetchGroups();
      showNotification('Группа удалена', 'success');
    } catch (error) {
      console.error('Ошибка при удалении группы:', error);
      showNotification('Ошибка при удалении группы', 'error');
    }
  };

  const renderAttendanceTable = () => {
    return (
      <article className="table-container">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th className='text-left sticky-column'>ФИО</th>
              {daysToDisplay.map((day) => (
                <th key={day} className='element-center'>
                  {day}
                </th>
              ))}
              {isAdmin && <th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={entry._id}>
                <td className='element-center'>{index + 1}</td>
                <td className='text-left sticky-column'>
                  {isAdmin ? (
                    <input
                      value={entry.studentName}
                      onChange={(e) => handleChange(index, 'studentName', e.target.value)}
                    />
                  ) : (
                    entry.studentName
                  )}
                </td>
                {daysToDisplay.map((day) => (
                  <td key={day} className='element-center'>
                    {isAdmin ? (
                      <input
                        type="checkbox"
                        checked={entry.attendance[day] || false}
                        onChange={(e) => handleChange(index, `attendance.${day}`, e.target.checked)}
                      />
                    ) : (
                      entry.attendance[day] ? '✔' : ''
                    )}
                  </td>
                ))}
                {isAdmin && (
                  <td className='element-center'>
                    <button onClick={() => handleDeleteEntry(entry._id)}>Удалить</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    );
  };

  const getMonthName = (month) => {
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return months[month - 1];
  };

  const getMonthNameGenitive = (month) => {
    const monthsGenitive = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return monthsGenitive[month - 1];
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <>
      <Helmet>
        <title>Журнал посещаемости - Академия боевых единоборств "Хулиган"</title>
        <meta name="description" content="Журнал посещаемости студентов Академии боевых единоборств 'Хулиган'." />
        <meta name="keywords" content="Журнал посещаемости, Академия боевых единоборств, Хулиган, студенты, посещаемость" />
        <link rel="canonical" href="https://hooliganmma.ru/attendance-journal" />
      </Helmet>
      <Header
        showBlock={true}
        homeRoute="/"
        innerTitle="Журнал посещаемости"
        linkText="Журнал посещаемости"
        showGradient={true}
        onLogout={handleLogout}
      />
      <main className="attendance-journal-content">
        <section className="attendance-journal-section">
          <h1>Журнал посещаемости</h1>
          <div className='month-and-group'>
            <div className='group'>
              <label>Выберите группу: </label>
              <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                {groups.map(group => (
                  <option key={group._id} value={group._id}>{group.name}</option>
                ))}
              </select>
            </div>
            <div className='month'>
              <label>Выберите месяц: </label>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="1">Январь</option>
                <option value="2">Февраль</option>
                <option value="3">Март</option>
                <option value="4">Апрель</option>
                <option value="5">Май</option>
                <option value="6">Июнь</option>
                <option value="7">Июль</option>
                <option value="8">Август</option>
                <option value="9">Сентябрь</option>
                <option value="10">Октябрь</option>
                <option value="11">Ноябрь</option>
                <option value="12">Декабрь</option>
              </select>
            </div>
          </div>
          <h1 className="current-month">{getMonthName(selectedMonth)}</h1>
          {renderAttendanceTable()}
          {isAdmin && (
            <div className="attendance-journal-add-entry">
              <h3>Добавить запись</h3>
              <div className='create-an-entry'>
                <div>
                  <input
                    type="text"
                    placeholder="ФИО"
                    value={newEntry.studentName}
                    onChange={(e) => setNewEntry({ ...newEntry, studentName: e.target.value })}
                  />
                </div>
                <div className='create-student-group-month'>
                  <div>
                    <select value={newEntry.month} onChange={(e) => setNewEntry({ ...newEntry, month: e.target.value })}>
                      <option value="1">Январь</option>
                      <option value="2">Февраль</option>
                      <option value="3">Март</option>
                      <option value="4">Апрель</option>
                      <option value="5">Май</option>
                      <option value="6">Июнь</option>
                      <option value="7">Июль</option>
                      <option value="8">Август</option>
                      <option value="9">Сентябрь</option>
                      <option value="10">Октябрь</option>
                      <option value="11">Ноябрь</option>
                      <option value="12">Декабрь</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button className='create' onClick={handleAddEntry}>Добавить</button>
                </div>
              </div>
              <div>
                <h3>Добавить дни</h3>
                <div className='create-a-day'>
                  <input
                    type="number"
                    placeholder="Добавить число"
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    min="1"
                    max="31"
                  />
                  <div>
                    <button className='create-days' onClick={handleAddDay}>Добавить</button>
                  </div>
                </div>
                <ul className="days-list">
                  {daysToDisplay.map((day) => (
                    <li key={day}>
                      {day} {getMonthNameGenitive(selectedMonth)} <button onClick={() => handleRemoveDay(day)}>Удалить</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {isAdmin && (
            <div className="attendance-journal-manage-groups">
              <h3>Управление группами</h3>
              <div className='create-a-group'>
                <input
                  type="text"
                  placeholder="Новая группа"
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                />
                <div>
                  <button onClick={handleAddGroup}>Добавить группу</button>
                </div>
              </div>
              <ul className="groups-list">
                {groups.map(group => (
                  <li key={group._id}>
                    {editingGroup === group._id ? (
                      <input
                        type="text"
                        value={group.name}
                        onChange={(e) => setGroups(groups.map(g => g._id === group._id ? { ...g, name: e.target.value } : g))}
                      />
                    ) : (
                      group.name
                    )}
                    {editingGroup === group._id ? (
                      <button onClick={() => handleUpdateGroup(group._id, group.name)}>Сохранить</button>
                    ) : (
                      <button onClick={() => setEditingGroup(group._id)}>Редактировать</button>
                    )}
                    <button onClick={() => handleDeleteGroup(group._id)}>Удалить</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isAdmin && (
            <div className="attendance-journal-save-all">
              <button onClick={handleSave}>Сохранить все изменения</button>
              <button onClick={handleCopyAttendance}>Копировать данные на следующий месяц</button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AttendanceJournal;