import { SimilarSubject as FilteredCourses } from "@/types/ISimilarSubject";
import { SubjectRow } from "./subject-row";

export const SimilarSubject = ({
  filteredCourses,
  filters,
  handleSelectCourse,
}: {
  filteredCourses: FilteredCourses[];
  filters: {
    university_name: string;
    term: string;
    year: number;
    faculty_name: string;
  };
  handleSelectCourse: (course: FilteredCourses) => Promise<void>;
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">{filters.university_name}</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-primary bg-gradient-to-tr from-primary to-gradient text-white">
          <tr>
            <th className="p-2 text-left">№</th>
            <th className="p-2 text-left">Аты</th>
            <th className="p-2 text-left">Кредит</th>
            <th className="p-2 text-left">Факультет</th>
            <th className="p-2 text-left">Уақыты</th>
            <th className="p-2 text-left">Ұқсастық</th>
            <th className="p-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length < 1 ? (
            <tr>
              <td colSpan={7} className="p-2">
                Курс табылған жоқ
              </td>
            </tr>
          ) : (
            filteredCourses.map((course, index) => (
              <SubjectRow
                key={index}
                course={course}
                index={index}
                handleSelectCourse={handleSelectCourse}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
