export const translateDayToKazakh = (day: string): string => {
  const daysInKazakh: { [key: string]: string } = {
    Monday: "Дүйсенбі",
    Tuesday: "Сейсенбі",
    Wednesday: "Сәрсенбі",
    Thursday: "Бейсенбі",
    Friday: "Жұма",
    Saturday: "Сенбі",
    Sunday: "Жексенбі",
  };
  return daysInKazakh[day] || day;
};
