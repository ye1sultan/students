"use client";

import {
  deleteSubjectFromSchedule,
  getSchedule,
  getSimilarSubjects,
  scheduleClass,
} from "@/app/api/api";
import { numberOfCoursesAtom } from "@/app/atoms/numberOfCourses";
import useAuth from "@/app/hooks/useAuth";
import { FetchedSlot, ScheduleSlot } from "@/app/types/ISchedule";
import { SimilarSubject } from "@/app/types/ISimilarSubject";
import { getNumberOfCredits } from "@/app/utils/getNumberOfCredits";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useAtom } from "jotai";
import { useState } from "react";
import { PageTitle } from "../../components/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Mobility() {
  useAuth();

  const [activeTab, setActiveTab] = useState("subject");
  const [filters, setFilters] = useState({
    university_name: "Turan",
    term: "Күз",
    year: 2024,
    faculty_name: "Engineering",
  });

  const [showUniversityHints, setShowUniversityHints] = useState(false);
  const [showFacultyHints, setShowFacultyHints] = useState(false);

  const [filteredCourses, setFilteredCourses] = useState<SimilarSubject[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<SimilarSubject | null>(
    null
  );

  const [schedule, setSchedule] = useState<FetchedSlot[]>([]);

  const [numberOfCourses, setNumberOfCourses] = useAtom(numberOfCoursesAtom);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!filters.university_name || !filters.faculty_name) {
      alert("Please fill in all filter fields before searching.");
      return;
    }

    try {
      const similarSubjects = await getSimilarSubjects(
        filters.university_name,
        filters.faculty_name,
        filters.year,
        filters.term
      );

      const fetchedSchedule: FetchedSlot[] = await getSchedule();
      setNumberOfCourses(fetchedSchedule.length);
      setSchedule(fetchedSchedule);

      similarSubjects.sort(
        (a: SimilarSubject, b: SimilarSubject) => b.similarity - a.similarity
      );

      const updatedCourses = similarSubjects.map((course: any) => {
        const isSelected =
          course.similarity === 100 ||
          fetchedSchedule.some(
            (slot) => slot.subject_semester_id === course.subject_semester_id
          );
        return { ...course, isSelected };
      });

      setFilteredCourses(updatedCourses);
      console.log(updatedCourses);
    } catch (error) {
      setFilteredCourses([]);
      console.error("Failed to fetch similar subjects:", error);
    }
  };

  const handleSelectCourse = async (course: SimilarSubject) => {
    // const fetchedSchedule: FetchedSlot[] = await getSchedule();
    // const isTuranCourseInSchedule = fetchedSchedule.some(
    //   (slot) => slot.university_name === "Turan"
    // );

    if (activeTab === "subject") {
      if (course.isSelected) {
        handleRemoveCourse(course);
      } else {
        // if (isTuranCourseInSchedule) {
        //   toast({
        //     title: "Қате",
        //     description:
        //       "Университет саны шектеулі",
        //     variant: "destructive",
        //   });
        //   return;
        // }

        // const existingCourse = filteredCourses.find((c) => c.isSelected);
        // if (existingCourse) {
        //   await handleRemoveCourse(existingCourse);
        // }
        handleAddCourse(course);
      }
    } else {
      if (course.isSelected) {
        handleRemoveCourse(course);
      } else {
        handleAddCourse(course);
      }
    }
  };

  const handleAddCourse = async (course: SimilarSubject) => {
    const credits = getNumberOfCredits();
    if (course.credits + (await credits) > 30) {
      toast({
        title: "Кредит саны",
        description: "Кредит саны шектеулі",
        variant: "destructive",
      });
    }

    if (course) {
      try {
        await scheduleClass(
          course.semester_id,
          course.subject_semester_id,
          course.day_of_week,
          course.start_time,
          course.end_time
        );

        const updatedSchedule = await getSchedule();
        setNumberOfCourses(updatedSchedule.length);

        toast({
          title: "Сәтті",
          description: "Пән күнтізбеге енгізілді!",
          variant: "default",
        });

        handleSearch();
      } catch (error) {
        console.error("Failed to add course:", error);
        toast({
          title: "Қате",
          description: "Пән күнтізбеге енгізілмеді",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveCourse = async (course: SimilarSubject) => {
    if (course) {
      try {
        await deleteSubjectFromSchedule(course.subject_semester_id);

        const updatedSchedule = await getSchedule();
        setNumberOfCourses(updatedSchedule.length);

        toast({
          title: "Сәтті",
          description: "Пән күнтізбеден жойылды!",
          variant: "default",
        });

        handleSearch();
      } catch (error) {
        console.error("Failed to remove course:", error);
        toast({
          title: "Қате",
          description: "Пән күнтізбеден жойылмады",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Академиялық Ұтқырлық" />
      <div className="bg-neutral-50 p-6 rounded shadow w-full max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="w-full text-lg" value="subject">
              Пән
            </TabsTrigger>
            <TabsTrigger className="w-full text-lg" value="semestr">
              Семестр
            </TabsTrigger>
          </TabsList>
          <TabsContent value="subject">
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
                      <div
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            university_name: "Turan",
                          }));
                          setShowUniversityHints(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        Turan
                      </div>
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
                      <div
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            faculty_name: "Engineering",
                          }));
                          setShowFacultyHints(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        Engineering
                      </div>
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
              <h2 className="text-2xl font-bold mb-4">
                {filters.university_name}
              </h2>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-2 text-left">№</th>
                    <th className="p-2 text-left">Аты</th>
                    <th className="p-2 text-left">Кредит саны</th>
                    <th className="p-2 text-left">Факультет</th>
                    <th className="p-2 text-center">Сипаттама</th>
                    <th className="p-2 text-center">Ұқсастық</th>
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
                      <tr
                        key={index}
                        className={`relative border-b border-gray-200 ${
                          course.isSelected ? "bg-blue-100" : ""
                        }`}
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{course.title}</td>
                        <td className="p-2 text-center">{course.credits}</td>
                        <td className="p-2">{course.faculty}</td>
                        <td className="p-2 max-w-[300px] line-clamp-4">
                          {course.description}
                        </td>
                        <td className="p-2 text-center">
                          {course.similarity}%
                        </td>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent className="w-full" value="semestr">
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
                      <div
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            university_name: "Turan",
                          }));
                          setShowUniversityHints(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        Turan
                      </div>
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
                      <div
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            faculty_name: "Engineering",
                          }));
                          setShowFacultyHints(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        Engineering
                      </div>
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
              <h2 className="text-2xl font-bold mb-4">
                {filters.university_name}
              </h2>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-2 text-left">№</th>
                    <th className="p-2 text-left">Аты</th>
                    <th className="p-2 text-left">Кредит саны</th>
                    <th className="p-2 text-left">Факультет</th>
                    <th className="p-2 text-center">Сипаттама</th>
                    <th className="p-2 text-center">Ұқсастық</th>
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
                      <tr
                        key={index}
                        className={`relative border-b border-gray-200 ${
                          course.isSelected ? "bg-blue-100" : ""
                        }`}
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{course.title}</td>
                        <td className="p-2 text-center">{course.credits}</td>
                        <td className="p-2">{course.faculty}</td>
                        <td className="p-2 max-w-[300px] line-clamp-4">
                          {course.description}
                        </td>
                        <td className="p-2 text-center">
                          {course.similarity}%
                        </td>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </main>
  );
}
