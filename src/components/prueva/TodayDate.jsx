import { useEffect, useState } from 'react';

const TodayDate = () => {
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const todayDate = new Date();
    const day = todayDate.getDate();
    const year = todayDate.getFullYear();

    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const monthName = months[todayDate.getMonth()];
    setDateString(`${day} ${monthName} ${year}`);
  }, []);

  return (
    <>Cancún, Quintana Roo {dateString}</>
  );
};

export default TodayDate;

