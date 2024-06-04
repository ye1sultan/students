import { SimilarSubject } from "@/types/ISimilarSubject";
import { formatTime } from "@/utils/formatTime";
import { translateDayToKazakh } from "@/utils/translateDaysToKazakh";

export const SubjectRow = ({
  course,
  index,
  handleSelectCourse,
}: {
  course: SimilarSubject;
  index: number;
  handleSelectCourse: (course: SimilarSubject) => void;
}) => {
  return (
    <tr
      className={`relative border-b border-gray-200 ${
        course.isSelected ? "bg-blue-100" : ""
      }`}
    >
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{course.title}</td>
      <td className="p-2">{course.credits}</td>
      <td className="p-2">{course.faculty}</td>
      <td className="p-2">
        {translateDayToKazakh(course.day_of_week)},{" "}
        {formatTime(course.start_time)}
      </td>
      <td className="p-2">{course.similarity}%</td>
      <td className="p-2">
        <button
          onClick={() => handleSelectCourse(course)}
          className={`text-2xl font-light text-neutral-50 rounded h-8 w-8 ${
            course.isSelected ? "bg-red-500" : "bg-primary"
          } flex justify-center items-center`}
        >
          {course.isSelected ? "-" : "+"}
        </button>
      </td>
    </tr>
  );
};
