import { PageTitle } from "@/app/components/page-title";

export const AcademPlan = () => {
  return (
    <div className="w-full">
      <PageTitle title="Академиялық жоспар" />
      <div className="bg-white p-6 rounded-[15px] shadow mt-8">
        <h3 className="text-lg font-semibold mb-2">
          Осенний академический период 2023-2024 учебного года
        </h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <thead>
            <tr>
              <th className="border border-primary/40 p-2">Название</th>
              <th className="border border-primary/40 p-2 w-80">Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">Начало семестра</td>
              <td className="border border-primary/40 p-2 w-80">4 сентября</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">Конец семестра</td>
              <td className="border border-primary/40 p-2 w-80">19 декабря</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">
                Дата выставления средней оценки за учебный период
              </td>
              <td className="border border-primary/40 p-2 w-80">18 декабря</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">Всего недель</td>
              <td className="border border-primary/40 p-2 w-80">16</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">Регистрация</h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">Регистрация</td>
              <td className="border border-primary/40 p-2 w-80">
                3-23 сентября
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">Рубежные контроли</h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">
                Рубежный контроль 1
              </td>
              <td className="border border-primary/40 p-2 w-80">
                23-28 октября
              </td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">
                Рубежный контроль 2
              </td>
              <td className="border border-primary/40 p-2 w-80">
                11-16 декабря
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">Сессия</h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">
                Экзаменационная сессия осеннего семестра
              </td>
              <td className="border border-primary/40 p-2 w-80">
                20 декабря - 6 января
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">Праздники и выходные дни</h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">День Республики</td>
              <td className="border border-primary/40 p-2 w-80">25 октября</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">
                День Независимости
              </td>
              <td className="border border-primary/40 p-2 w-80">16 декабря</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">Новый год</td>
              <td className="border border-primary/40 p-2 w-80">1-2 января</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">Рождество</td>
              <td className="border border-primary/40 p-2 w-80">7 января</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">
          Весенний академический период
        </h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">Начало семестра</td>
              <td className="border border-primary/40 p-2 w-80">29 января</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">Конец семестра</td>
              <td className="border border-primary/40 p-2 w-80">20 мая</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">
                Дата выставления средней оценки за учебный период
              </td>
              <td className="border border-primary/40 p-2 w-80">15 мая</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">Всего недель</td>
              <td className="border border-primary/40 p-2 w-80">17</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">Практика</h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">
                Производственная / преддипломная практика
              </td>
              <td className="border border-primary/40 p-2 w-80">
                12 февраля - 4 мая
              </td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">
                Начало периода выставления итоговой оценки
              </td>
              <td className="border border-primary/40 p-2 w-80">6 мая</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">
                Конец периода выставления итоговой оценки
              </td>
              <td className="border border-primary/40 p-2 w-80">11 мая</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">Праздники и выходные дни</h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">
                Международный женский день
              </td>
              <td className="border border-primary/40 p-2 w-80">8 марта</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">Наурыз Мейрамы</td>
              <td className="border border-primary/40 p-2 w-80">21-23 марта</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">
                День защитника Отечества
              </td>
              <td className="border border-primary/40 p-2 w-80">7 мая</td>
            </tr>
            <tr>
              <td className="border border-primary/40 p-2">День Победы</td>
              <td className="border border-primary/40 p-2 w-80">9 мая</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">Итоговая аттестация</h3>
        <table className="w-full border-collapse border border-primary/40 mb-4">
          <tbody>
            <tr>
              <td className="border border-primary/40 p-2">
                Итоговая аттестация
              </td>
              <td className="border border-primary/40 p-2 w-80">
                10 июня - 22 июня
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
