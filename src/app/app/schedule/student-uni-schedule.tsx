import { ScheduleSlot } from "@/types/ISchedule";
import { formatTime } from "@/utils/formatTime";
import { renderSlotContent } from "./util/renderSlotDescription";

export const StudentUniSchedule = ({
  schedule,
}: {
  schedule: ScheduleSlot[];
}) => {
  return (
    <div className="overflow-hidden w-full rounded-[15px] border border-gray-200">
      <table className="min-w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-primary bg-gradient-to-tr from-primary to-gradient text-neutral-50 h-[60px]">
            <th className="w-20 p-2 font-bold border border-grey-500 text-left">
              Уақыты
            </th>
            <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
              Дүйсембі
            </th>
            <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
              Сейсенбі
            </th>
            <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
              Сәрсенбі
            </th>
            <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
              Бейсенбі
            </th>
            <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
              Жұма
            </th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot, index) => (
            <tr
              key={index}
              className="bg-gray-100 border border-grey-500 h-[60px]"
            >
              <td className="p-4 border border-grey-500 text-left bg-primary bg-gradient-to-tr from-primary to-gradient text-neutral-50">
                {formatTime(slot.time)}
              </td>
              <td className="w-1/5 p-4 border border-grey-500 text-center">
                {renderSlotContent(slot?.Monday)}
              </td>
              <td className="w-1/5 p-4 border border-grey-500 text-center">
                {renderSlotContent(slot?.Tuesday)}
              </td>
              <td className="w-1/5 p-4 border border-grey-500 text-center">
                {renderSlotContent(slot?.Wednesday)}
              </td>
              <td className="w-1/5 p-4 border border-grey-500 text-center">
                {renderSlotContent(slot?.Thursday)}
              </td>
              <td className="w-1/5 p-4 border border-grey-500 text-center">
                {renderSlotContent(slot?.Friday)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
