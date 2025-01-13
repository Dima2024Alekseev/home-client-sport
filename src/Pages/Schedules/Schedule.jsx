import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import "./schedule.css";

const ScheduleControl = ({ selectedCategory, selectedDay, handleCategoryChange, handleDayChange }) => {
  return (
    <section className="schedule_controler">
      <div className="schedule-mounth">
        <p>Категория:</p>
        <select className="schedule" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="Выберите">Выберите</option>
          <option value="Дети соревновательная группа">Дети соревновательная группа</option>
          <option value="Дети средняя группа">Дети средняя группа</option>
          <option value="Дети младшая группа">Дети младшая группа</option>
          <option value="ММА взрослые">ММА взрослые</option>
          <option value="Женская группа">Женская группа</option>
        </select>
      </div>
      <div id="day" className="schedule-mounth">
        <p>День недели:</p>
        <select className="schedule" value={selectedDay} onChange={handleDayChange}>
          <option value="all">Все дни</option>
          <option value="pn">ПН</option>
          <option value="vt">ВТ</option>
          <option value="sr">СР</option>
          <option value="ct">ЧТ</option>
          <option value="pt">ПТ</option>
          <option value="sb">СБ</option>
        </select>
      </div>
    </section>
  );
};

const ScheduleTable = ({ scheduleData, selectedDay, selectedCategory }) => {
  const days = ["pn", "vt", "sr", "ct", "pt", "sb"];
  const dayLabels = {
    pn: "ПН",
    vt: "ВТ",
    sr: "СР",
    ct: "ЧТ",
    pt: "ПТ",
    sb: "СБ"
  };

  const isRowEmpty = (row) => {
    return days.every(day => !row[day] || (selectedCategory !== "Выберите" && !row[day].includes(selectedCategory)));
  };

  const filteredScheduleData = scheduleData.filter(row => !isRowEmpty(row));

  return (
    <table className="shedules">
      <tbody>
        <tr>
          <th></th>
          {selectedDay === "all" ? days.map(day => <th key={day}>{dayLabels[day]}</th>) : <th>{dayLabels[selectedDay]}</th>}
        </tr>
        {filteredScheduleData.map((row, index) => (
          <tr key={index}>
            <td><strong>{row.time}</strong></td>
            {selectedDay === "all" ? days.map(day => (
              <td key={day}>
                {selectedCategory === "Выберите" ? row[day] : (row[day] && row[day].includes(selectedCategory) ? row[day] : '')}
              </td>
            )) : (
              <td>
                {selectedCategory === "Выберите" ? row[selectedDay] : (row[selectedDay] && row[selectedDay].includes(selectedCategory) ? row[selectedDay] : '')}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Schedule = () => {
  const [selectedCategory, setSelectedCategory] = useState("Выберите");
  const [selectedDay, setSelectedDay] = useState("all");
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('/api/schedule');
        setScheduleData(response.data);
      } catch (error) {
        console.error('Ошибка при получении расписания:', error);
      }
    };

    fetchSchedule();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <>
      <Header
        showGradient={true}
        title='Расписание'
        showBlock={true}
        innerTitle='расписание тренировок'
        homeRoute="/"
        linkText='Расписание'
      />
      <main className="schedule-content">
        <ScheduleControl
          selectedCategory={selectedCategory}
          selectedDay={selectedDay}
          handleCategoryChange={handleCategoryChange}
          handleDayChange={handleDayChange}
        />
        <ScheduleTable scheduleData={scheduleData} selectedDay={selectedDay} selectedCategory={selectedCategory} />
      </main>
      <Footer />
    </>
  );
};

export default Schedule;
