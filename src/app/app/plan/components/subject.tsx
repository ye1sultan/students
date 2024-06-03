import { Course } from "@/app/types/ICourse";

const maxCredits = 120;

export const Subject = ({
  subject,
  isSelected,
  onSelect,
}: {
  subject: Course;
  isSelected: boolean;
  onSelect: (subject: Course, isSelected: boolean) => void;
}) => {
  return (
    <div
      className={`w-full p-4 border rounded flex flex-col justify-center items-start gap-4 ${
        isSelected ? "bg-blue-100" : "bg-white"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-x-4">
          <h3 className="text-lg font-semibold">{subject.subject__title}</h3>
          <span className="text-neutral-500 text-sm">
            {subject.day_of_week} - {subject.start_time}
          </span>
        </div>
        <p className="text-neutral-500 text-sm">
          Кредит саны: {subject.subject__credits}
        </p>
      </div>
      <p className="text-gray-600 line-clamp-3">
        {subject.subject__description}
      </p>
      <button
        className={`self-end mt-2 px-4 py-2 rounded ${
          isSelected
            ? "bg-red-500 hover:bg-red-700"
            : "bg-primary hover:bg-[#41787e]"
        } text-white`}
        onClick={() => onSelect(subject, !isSelected)}
      >
        {isSelected ? "Алып тастау" : "Қосу"}
      </button>
    </div>
  );
};
