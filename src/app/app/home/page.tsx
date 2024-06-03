/* eslint-disable @next/next/no-img-element */
"use client";

import { getUser } from "@/app/api/api";
import { Card } from "@/app/components/card";
import { PageTitle } from "@/app/components/page-title";
import useAuth from "@/app/hooks/useAuth";
import { User } from "@/app/types/IUser";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { HomePageButtons } from "./componenets/home-page-button";
import { UserInfo } from "./componenets/user-info";

export default function Home() {
  useAuth();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Қателік!",
          description: "Пайдаланушы деректерін алу мүмкін болмады",
          variant: "destructive",
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Басты бет" />
      <div className="w-full flex justify-center items-center gap-4">
        <Card>
          <h1 className="text-2xl">Қош Келдіңіз!</h1>
          <img
            src="https://picsum.photos/300/200"
            className="max-h-[150px]"
            alt=""
          />
        </Card>
        <Card>
          <div className="flex w-full items-center justify-around">
            <UserInfo user={user} />
          </div>
        </Card>
      </div>
      <HomePageButtons />
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">Кесте</h2>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">
            Осенний академический период 2023-2024 учебного года
          </h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Название</th>
                <th className="border border-gray-300 p-2 w-52">Дата</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Начало семестра</td>
                <td className="border border-gray-300 p-2 w-52">4 сентября</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Конец семестра</td>
                <td className="border border-gray-300 p-2 w-52">19 декабря</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Дата выставления средней оценки за учебный период
                </td>
                <td className="border border-gray-300 p-2 w-52">18 декабря</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Всего недель</td>
                <td className="border border-gray-300 p-2 w-52">16</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-2">Регистрация</h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Регистрация</td>
                <td className="border border-gray-300 p-2 w-52">
                  3-23 сентября
                </td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-2">Рубежные контроли</h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Рубежный контроль 1
                </td>
                <td className="border border-gray-300 p-2 w-52">
                  23-28 октября
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Рубежный контроль 2
                </td>
                <td className="border border-gray-300 p-2 w-52">
                  11-16 декабря
                </td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-2">Сессия</h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Экзаменационная сессия осеннего семестра
                </td>
                <td className="border border-gray-300 p-2 w-52">
                  20 декабря - 6 января
                </td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-2">
            Праздники и выходные дни
          </h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">День Республики</td>
                <td className="border border-gray-300 p-2 w-52">25 октября</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  День Независимости
                </td>
                <td className="border border-gray-300 p-2 w-52">16 декабря</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Новый год</td>
                <td className="border border-gray-300 p-2 w-52">1-2 января</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Рождество</td>
                <td className="border border-gray-300 p-2 w-52">7 января</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-2">
            Весенний академический период
          </h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Начало семестра</td>
                <td className="border border-gray-300 p-2 w-52">29 января</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Конец семестра</td>
                <td className="border border-gray-300 p-2 w-52">20 мая</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Дата выставления средней оценки за учебный период
                </td>
                <td className="border border-gray-300 p-2 w-52">15 мая</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Всего недель</td>
                <td className="border border-gray-300 p-2 w-52">17</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-2">Практика</h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Производственная / преддипломная практика
                </td>
                <td className="border border-gray-300 p-2 w-52">
                  12 февраля - 4 мая
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Начало периода выставления итоговой оценки
                </td>
                <td className="border border-gray-300 p-2 w-52">6 мая</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Конец периода выставления итоговой оценки
                </td>
                <td className="border border-gray-300 p-2 w-52">11 мая</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-2">
            Праздники и выходные дни
          </h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Международный женский день
                </td>
                <td className="border border-gray-300 p-2 w-52">8 марта</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Наурыз Мейрамы</td>
                <td className="border border-gray-300 p-2 w-52">21-23 марта</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  День защитника Отечества
                </td>
                <td className="border border-gray-300 p-2 w-52">7 мая</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">День Победы</td>
                <td className="border border-gray-300 p-2 w-52">9 мая</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-2">Итоговая аттестация</h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Итоговая аттестация
                </td>
                <td className="border border-gray-300 p-2 w-52">
                  10 июня - 22 июня
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
