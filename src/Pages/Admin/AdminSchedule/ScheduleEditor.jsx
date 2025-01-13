import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer/Footer";
import { toast } from 'react-hot-toast';
import "./admin-schedule.css";

const ScheduleEditor = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/schedule', {
          headers: {
            'Authorization': token
          }
        });
        setScheduleData(response.data);
      } catch (error) {
        console.error('Ошибка при получении расписания:', error);
        toast.error('Ошибка при получении расписания');
      }
    };

    fetchSchedule();
  }, []);

  const handleChange = (index, field, value) => {
    const newSchedule = [...scheduleData];
    newSchedule[index][field] = value;
    setScheduleData(newSchedule);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/schedule', { schedule: scheduleData }, {
        headers: {
          'Authorization': token
        }
      });
      toast.success('Расписание обновлено');
    } catch (error) {
      console.error('Ошибка при обновлении расписания:', error);
      toast.error('Ошибка при обновлении расписания');
    }
  };

  return (
    <>
      <Header
        title='Редактирование расписания'
        showBlock={true}
        innerTitle="Редактирование расписания"
        homeRoute="/admin-dashboard"
        linkText="Редактирование расписания"
        showGradient={true} />
      <main className="schedule-editor-content">
        <table>
          <tbody>
            <tr>
              <th>Время</th>
              <th>ПН</th>
              <th>ВТ</th>
              <th>СР</th>
              <th>ЧТ</th>
              <th>ПТ</th>
              <th>СБ</th>
            </tr>
            {scheduleData.map((row, index) => (
              <tr key={index}>
                <td><input value={row.time} onChange={(e) => handleChange(index, 'time', e.target.value)} /></td>
                <td><input value={row.pn} onChange={(e) => handleChange(index, 'pn', e.target.value)} /></td>
                <td><input value={row.vt} onChange={(e) => handleChange(index, 'vt', e.target.value)} /></td>
                <td><input value={row.sr} onChange={(e) => handleChange(index, 'sr', e.target.value)} /></td>
                <td><input value={row.ct} onChange={(e) => handleChange(index, 'ct', e.target.value)} /></td>
                <td><input value={row.pt} onChange={(e) => handleChange(index, 'pt', e.target.value)} /></td>
                <td><input value={row.sb} onChange={(e) => handleChange(index, 'sb', e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSave}>Сохранить</button>
      </main>
      <Footer />
    </>
  );
};

export default ScheduleEditor;
