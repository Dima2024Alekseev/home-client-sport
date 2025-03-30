import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import Header from "../Components/Header";
import Footer from "../Components/Footer/Footer";
import "../styles/attendance-journal.css";
import { useNotification } from '../Components/NotificationContext';
import { 
  FaSave, 
  FaCopy, 
  FaTrash, 
  FaEdit, 
  FaCheck, 
  FaPlus, 
  FaUserPlus,
  FaUsers,
  FaCalendarAlt,
  FaCalendarPlus,
  FaTimes
} from 'react-icons/fa';

const AttendanceJournal = () => {
  const { showNotification } = useNotification();
  const [attendanceData, setAttendanceData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newEntry, setNewEntry] = useState({ studentName: '', month: new Date().getMonth() + 1, attendance: {}, days: [] });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [daysToDisplay, setDaysToDisplay] = useState([]);
  const [newDay, setNewDay] = useState('');
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [editingGroup, setEditingGroup] = useState(null);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  
  const monthNamesGenitive = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const fetchAttendanceData = useCallback(async () => {
    try {
      const response = await axios.get('/api/attendance', {
        params: { month: selectedMonth, group: selectedGroup }
      });
      const data = response.data;
      const days = data.flatMap(entry => entry.days);
      setDaysToDisplay([...new Set(days)].sort((a, b) => a - b));
      setAttendanceData(data.sort((a, b) => a.studentName.localeCompare(b.studentName)));
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
        setSelectedGroup(response.data[0]._id);
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
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    if (selectedGroup) {
      fetchAttendanceData();
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
    setAttendanceData(newAttendanceData.sort((a, b) => a.studentName.localeCompare(b.studentName)));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedEntries = attendanceData.map(entry => ({
        ...entry,
        month: selectedMonth,
        days: daysToDisplay
      }));
      await axios.put('/api/attendance', { attendance: updatedEntries }, {
        headers: {
          'Authorization': token
        }
      });
      showNotification('Журнал посещаемости обновлен', 'success');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      showNotification('Ошибка при сохранении', 'error');
    }
  };

  const handleAddEntry = async () => {
    try {
      const token = localStorage.getItem('token');
      const newEntryWithMonth = {
        ...newEntry,
        month: parseInt(newEntry.month, 10),
        days: daysToDisplay
      };
      const response = await axios.post('/api/attendance', newEntryWithMonth, {
        headers: {
          'Authorization': token
        },
        params: { group: selectedGroup }
      });
      setNewEntry({ studentName: '', month: new Date().getMonth() + 1, attendance: {}, days: [] });
      showNotification('Запись добавлена', 'success');
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
    } else {
      showNotification('Пожалуйста, введите число от 1 до 31.', 'error');
    }
  };

  const handleRemoveDay = (day) => {
    setDaysToDisplay(daysToDisplay.filter(d => d !== day).sort((a, b) => a - b));
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
      setEditingGroup(null);
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

  const getWeekday = (month, day) => {
    const year = new Date().getFullYear();
    const date = new Date(year, month - 1, day);
    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return weekdays[date.getDay()];
  };

  const renderAttendanceTable = () => {
    return (
      <div className="table-responsive">
        <table className="attendance-table">
          <thead>
            <tr>
              <th className="serial-number">№</th>
              <th className="student-name">ФИО</th>
              {daysToDisplay.map((day) => (
                <th key={day} className="day-header">
                  <div className="day-number">{day}</div>
                  <div className="day-weekday">{getWeekday(selectedMonth, day)}</div>
                </th>
              ))}
              {isAdmin && <th className="actions">Действия</th>}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={entry._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td className="serial-number">{index + 1}</td>
                <td className="student-name">
                  {isAdmin ? (
                    <input
                      type="text"
                      value={entry.studentName}
                      onChange={(e) => handleChange(index, 'studentName', e.target.value)}
                      className="name-input"
                    />
                  ) : (
                    entry.studentName
                  )}
                </td>
                {daysToDisplay.map((day) => (
                  <td key={day} className="attendance-cell">
                    {isAdmin ? (
                      <label className="attendance-checkbox">
                        <input
                          type="checkbox"
                          checked={entry.attendance[day] || false}
                          onChange={(e) => handleChange(index, `attendance.${day}`, e.target.checked)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    ) : (
                      entry.attendance[day] ? '✔' : '✖'
                    )}
                  </td>
                ))}
                {isAdmin && (
                  <td className="actions">
                    <button 
                      onClick={() => handleDeleteEntry(entry._id)}
                      className="delete-button"
                    >
                      <FaTrash className="button-icon" /> Удалить
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
      </Helmet>
      <Header
        showBlock={true}
        innerTitle="Журнал посещаемости"
        homeRoute="/admin-dashboard"
        linkText="Журнал посещаемости"
        showGradient={true}
        onLogout={handleLogout}
      />
      <main className="attendance-journal-container">
        <section className="attendance-section">
          <div className="controls-row">
            <div className="control-group">
              <label className="control-label"><FaUsers className="control-icon" /> Группа:</label>
              <select 
                value={selectedGroup} 
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="control-select"
              >
                {groups.map(group => (
                  <option key={group._id} value={group._id}>{group.name}</option>
                ))}
              </select>
            </div>
            
            <div className="control-group">
              <label className="control-label"><FaCalendarAlt className="control-icon" /> Месяц:</label>
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="control-select"
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>
          </div>
          
          <h2 className="current-month-title">
            <FaCalendarAlt className="month-icon" /> {monthNames[selectedMonth - 1]} {new Date().getFullYear()}
          </h2>
          
          {renderAttendanceTable()}
          
          {isAdmin && (
            <>
              <div className="admin-section">
                <h3 className="admin-section-title"><FaUserPlus /> Добавить запись</h3>
                <div className="add-entry-form">
                  <input
                    type="text"
                    placeholder="ФИО студента"
                    value={newEntry.studentName}
                    onChange={(e) => setNewEntry({ ...newEntry, studentName: e.target.value })}
                    className="form-input"
                  />
                  <button 
                    onClick={handleAddEntry}
                    className="form-button primary"
                  >
                    <FaPlus className="button-icon" /> Добавить студента
                  </button>
                </div>
              </div>
              
              <div className="admin-section">
                <h3 className="admin-section-title"><FaCalendarPlus /> Управление днями</h3>
                <div className="days-controls">
                  <input
                    type="number"
                    placeholder="День месяца (1-31)"
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    min="1"
                    max="31"
                    className="form-input small"
                  />
                  <button 
                    onClick={handleAddDay}
                    className="form-button secondary"
                  >
                    <FaPlus className="button-icon" /> Добавить день
                  </button>
                </div>
                
                <div className="days-list">
                  {daysToDisplay.map((day) => (
                    <div key={day} className="day-tag">
                      <span>{day} {monthNamesGenitive[selectedMonth - 1]}</span>
                      <button 
                        onClick={() => handleRemoveDay(day)}
                        className="remove-day-button"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="admin-section">
                <h3 className="admin-section-title"><FaUsers /> Управление группами</h3>
                <div className="groups-controls">
                  <input
                    type="text"
                    placeholder="Название новой группы"
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    className="form-input"
                  />
                  <button 
                    onClick={handleAddGroup}
                    className="form-button primary"
                  >
                    <FaPlus className="button-icon" /> Добавить группу
                  </button>
                </div>
                
                <div className="groups-list">
                  {groups.map(group => (
                    <div key={group._id} className="group-item">
                      {editingGroup === group._id ? (
                        <>
                          <input
                            type="text"
                            value={group.name}
                            onChange={(e) => setGroups(groups.map(g => 
                              g._id === group._id ? { ...g, name: e.target.value } : g
                            ))}
                            className="form-input small"
                          />
                          <button 
                            onClick={() => handleUpdateGroup(group._id, group.name)}
                            className="form-button secondary"
                          >
                            <FaCheck className="button-icon" /> Сохранить
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="group-name">{group.name}</span>
                          <div className="group-actions">
                            <button 
                              onClick={() => setEditingGroup(group._id)}
                              className="form-button small"
                            >
                              <FaEdit className="button-icon" /> Редактировать
                            </button>
                            <button 
                              onClick={() => handleDeleteGroup(group._id)}
                              className="form-button small danger"
                            >
                              <FaTrash className="button-icon" /> Удалить
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="admin-actions">
                <button 
                  onClick={handleSave}
                  className="action-button save"
                >
                  <FaSave className="button-icon" /> Сохранить все изменения
                </button>
                <button 
                  onClick={handleCopyAttendance}
                  className="action-button copy"
                >
                  <FaCopy className="button-icon" /> Копировать на следующий месяц
                </button>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AttendanceJournal;