import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSave, FiEdit2, FiClock } from 'react-icons/fi';
import { MdDeleteOutline, MdAdd } from 'react-icons/md';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer/Footer";
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import "./admin-schedule.css";

const ScheduleEditor = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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
        console.error('Ваша сессия истекла', error);
        toast.error('Ваша сессия истекла');
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
      setIsEditing(false);
    } catch (error) {
      console.error('Ваша сессия истекла', error);
      toast.error('Ваша сессия истекла');
    }
  };

  const addNewRow = () => {
    setScheduleData([...scheduleData, {
      time: '',
      pn: '',
      vt: '',
      sr: '',
      ct: '',
      pt: '',
      sb: ''
    }]);
  };

  const deleteRow = (index) => {
    const newSchedule = [...scheduleData];
    newSchedule.splice(index, 1);
    setScheduleData(newSchedule);
  };

  return (
    <>
      <Helmet>
        <title>Редактирование расписания</title>
        <meta name="description" content="Редактирование расписания" />
        <meta name="keywords" content="расписание, редактирование, администрирование" />
      </Helmet>
      <Header
        showBlock={true}
        innerTitle="Редактирование расписания"
        linkText="Редактирование расписания"
        showGradient={true} />
      <main className="schedule-editor-content">
        <div className="editor-header">
          <div className="action-buttons">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>
                  <FiSave size={18} /> Сохранить
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Отмена
                </button>
              </>
            ) : (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <FiEdit2 size={18} /> Редактировать
              </button>
            )}
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="sticky-column-time">
                  <div className="th-content">
                    <FiClock size={18} /> Время
                  </div>
                </th>
                <th>Понедельник</th>
                <th>Вторник</th>
                <th>Среда</th>
                <th>Четверг</th>
                <th>Пятница</th>
                <th>Суббота</th>
                {isEditing && <th>Действия</th>}
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, index) => (
                <tr key={index}>
                  <td className="sticky-column-time">
                    <input
                      value={row.time}
                      onChange={(e) => handleChange(index, 'time', e.target.value)}
                      disabled={!isEditing}
                    />
                  </td>
                  <td><input value={row.pn} onChange={(e) => handleChange(index, 'pn', e.target.value)} disabled={!isEditing} /></td>
                  <td><input value={row.vt} onChange={(e) => handleChange(index, 'vt', e.target.value)} disabled={!isEditing} /></td>
                  <td><input value={row.sr} onChange={(e) => handleChange(index, 'sr', e.target.value)} disabled={!isEditing} /></td>
                  <td><input value={row.ct} onChange={(e) => handleChange(index, 'ct', e.target.value)} disabled={!isEditing} /></td>
                  <td><input value={row.pt} onChange={(e) => handleChange(index, 'pt', e.target.value)} disabled={!isEditing} /></td>
                  <td><input value={row.sb} onChange={(e) => handleChange(index, 'sb', e.target.value)} disabled={!isEditing} /></td>
                  {isEditing && (
                    <td className="actions-cell">
                      <button className="delete-btn" onClick={() => deleteRow(index)}>
                        <MdDeleteOutline size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEditing && (
          <button className="add-row-btn" onClick={addNewRow}>
            <MdAdd size={20} /> Добавить строку
          </button>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ScheduleEditor;