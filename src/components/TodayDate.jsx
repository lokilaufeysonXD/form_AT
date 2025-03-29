

const TodayDate = () => {
    
  const todayDate = new Date();
  const day = todayDate.getDate();
  const year = todayDate.getFullYear();

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const monthName = months[todayDate.getMonth()];
  console.log(monthName);

  return (
    <p>fecha dia:{day} mes:{monthName} año:{year}</p>
  );
};

export default TodayDate;