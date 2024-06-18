import { Course } from "@/types/ICourse";
import { formatTime } from "@/utils/formatTime";
import { translateDayToKazakh } from "@/utils/translateDaysToKazakh";

export const Subject = ({
  subject,
  isSelected,
  onSelect,
  capacity,
}: {
  subject: Course;
  isSelected: boolean;
  onSelect: (subject: Course, isSelected: boolean) => void;
  capacity: any;
}) => {
  return (
    <div
      className={`w-full p-4 border rounded-[15px] flex flex-col justify-center items-start gap-4 ${
        isSelected ? "bg-blue-100" : "bg-white"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-x-4">
          <h3 className="text-lg font-semibold">
            {subject.subject__title}
          </h3>
          <span className="text-neutral-500">{capacity} орын қалды</span>
        </div>
        <p className="text-neutral-700">{subject.subject__credits} кредит</p>
      </div>
      <p className="text-gray-600 line-clamp-4 max-w-4xl">
        {subject.subject__description}
      </p>
      <div className="w-full flex justify-between items-center">
        <span className="text-neutral-700 text-sm bg-neutral-50 p-2 rounded-[10px] shadow">
          {translateDayToKazakh(subject.day_of_week)} -{" "}
          {formatTime(subject.start_time)}
        </span>
        <button
          className={`self-end mt-2 px-4 py-2 rounded-[8px] ${
            isSelected
              ? "bg-red-500 hover:bg-red-700"
              : "bg-primary hover:bg-[#41787e]"
          } text-white`}
          onClick={() => onSelect(subject, !isSelected)}
        >
          {isSelected ? "Алып тастау" : "Қосу"}
        </button>
      </div>
    </div>
  );
};
