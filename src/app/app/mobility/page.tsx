"use client";

import {
  deleteSubjectFromSchedule,
  getSchedule,
  getSubjects,
  scheduleClass,
} from "@/app/api/api";
import { Course } from "@/app/types/ICourse";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title";

export default function Mobility() {
  const router = useRouter();

  if (!localStorage.getItem("accessToken")) {
    router.push("/login");
  }

  const [subjects, setSubjects] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [schedule, setSchedule] = useState([]);
  const [otherUniSubject, setOtherUniSubject] = useState<Course | null>(null);

  const [filters, setFilters] = useState({
    university_name: "",
    term: "Көктем",
    year: "2024",
    faculty_name: "",
  });

  const [showUniversityHints, setShowUniversityHints] = useState(false);
  const [showFacultyHints, setShowFacultyHints] = useState(false);

  useEffect(() => {
    const fetchSubjectsAndSchedule = async () => {
      try {
        const subjects = await getSubjects();
        setSubjects(subjects);

        const schedule = await getSchedule();
        setSchedule(schedule);

        const otherUniSubject = schedule.find(
          (s) =>
            s.subject_semester__subject__university__name !==
            localStorage.getItem("university")
        );

        setOtherUniSubject(otherUniSubject);

        console.log(schedule);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchSubjectsAndSchedule();
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log(filters);
    setFilteredCourses(
      subjects.filter(
        (course) =>
          course.subject__university__name
            .toLowerCase()
            .includes(filters.university_name.toLowerCase()) &&
          course.semester__term.includes(filters.term) &&
          course.semester__year.toString().includes(filters.year) &&
          course.subject__faculty__name
            .toLowerCase()
            .includes(filters.faculty_name.toLowerCase())
      )
    );
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(selectedCourse?.id === course.id ? null : course);
  };

  const handleAddCourse = async () => {
    if (selectedCourse) {
      try {
        const semester_id = 4;
        if (otherUniSubject) {
          await deleteSubjectFromSchedule(otherUniSubject.id);
          setOtherUniSubject(null);
        }

        const response = await scheduleClass(
          semester_id,
          selectedCourse.id,
          selectedCourse.day_of_week,
          selectedCourse.start_time,
          selectedCourse.end_time
        );

        const updatedSchedule = await getSchedule();
        setSchedule(updatedSchedule);

        const newOtherUniSubject = updatedSchedule.find(
          (s) =>
            s.subject_semester__subject__university__name !==
            localStorage.getItem("university")
        );

        setOtherUniSubject(newOtherUniSubject);

        console.log("Scheduled course:", response);
      } catch (error) {
        console.error("Failed to schedule course:", error);
      }
    }
  };

  const getHints = (input: string, field: keyof Course) => {
    const hints = Array.from(
      new Set(
        subjects
          .map((course: any) => course[field])
          .filter((value: any) =>
            value.toLowerCase().includes(input.toLowerCase())
          )
      )
    );
    return hints.slice(0, 5);
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Академиялық Ұтқырлық" />
      <div className="bg-white p-6 rounded shadow w-full max-w-5xl">
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <div className="flex justify-between items-center gap-4 w-full">
            <div className="relative w-full">
              <input
                type="text"
                name="university_name"
                placeholder="Университет атауы"
                value={filters.university_name}
                onChange={(e) => {
                  handleFilterChange(e);
                  setShowUniversityHints(true);
                }}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              {showUniversityHints && filters.university_name && (
                <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
                  {getHints(
                    filters.university_name,
                    "subject__university__name"
                  ).map((hint, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          university_name: hint as string,
                        }));
                        setShowUniversityHints(false);
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full">
              <input
                type="text"
                name="faculty_name"
                placeholder="Факультетті таңдаңыз"
                value={filters.faculty_name}
                onChange={(e) => {
                  handleFilterChange(e);
                  setShowFacultyHints(true);
                }}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              {showFacultyHints && filters.faculty_name && (
                <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
                  {getHints(filters.faculty_name, "subject__faculty__name").map(
                    (hint, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            faculty_name: hint as string,
                          }));
                          setShowFacultyHints(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {hint}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center gap-x-4 w-full">
            <select
              name="term"
              value={filters.term}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              <option>Көктем</option>
              <option>Күз</option>
            </select>

            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
        </div>

        <div className="w-full flex justify-end items-center">
          <button
            onClick={handleSearch}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Ұқсастарды Табу
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Ұқсас курстар</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-2 text-left">Код</th>
                <th className="p-2 text-left">Аты</th>
                <th className="p-2 text-left">Семестр</th>
                <th className="p-2 text-left">Кредит саны</th>
                <th className="p-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length < 1 ? (
                <tr>
                  <td colSpan={5} className="p-2">
                    Курс табылған жоқ
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className={`relative border-b border-gray-200 ${
                      selectedCourse && selectedCourse.id === course.id
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <td className="p-2">{course.subject__code}</td>
                    <td className="p-2">{course.subject__title}</td>
                    <td className="p-2">
                      {course.semester__term} {course.semester__year}
                    </td>
                    <td className="p-2">{course.subject__credits}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleSelectCourse(course)}
                        className={`text-2xl font-light text-neutral-50 rounded h-8 w-8 ${
                          selectedCourse && selectedCourse.id === course.id
                            ? "bg-red-500"
                            : "bg-primary"
                        } flex justify-center items-center`}
                      >
                        {selectedCourse && selectedCourse.id === course.id
                          ? "-"
                          : "+"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedCourse && (
          <div className="mt-6">
            <button
              onClick={handleAddCourse}
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Add Course
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
