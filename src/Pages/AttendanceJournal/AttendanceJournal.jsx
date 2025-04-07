import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import "./attendance-journal.css";
import { useNotification } from '../../Components/NotificationContext';
import { FaUsers, FaCalendarAlt } from 'react-icons/fa';

const AttendanceJournal = () => {
  const { showNotification } = useNotification();
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [daysToDisplay, setDaysToDisplay] = useState([]);
  const [groups, setGroups] = useState([]);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
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
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    if (selectedGroup) {
      fetchAttendanceData();
    }
  }, [selectedGroup, fetchAttendanceData]);

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
              <th className="student-name-header">ФИО</th>
              {daysToDisplay.map((day) => (
                <th key={day} className="day-header">
                  <div className="day-number">{day}</div>
                  <div className="day-weekday">{getWeekday(selectedMonth, day)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={entry._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td className="serial-number">{index + 1}</td>
                <td className="student-name">
                  {entry.studentName}
                </td>
                {daysToDisplay.map((day) => (
                  <td key={day} className="attendance-cell">
                    {entry.attendance[day] ? '✔' : '✖'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
        homeRoute="/"
        linkText="Журнал посещаемости"
        showGradient={true}
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
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AttendanceJournal;