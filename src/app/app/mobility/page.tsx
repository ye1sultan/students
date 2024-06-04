"use client";

import {
  deleteSubjectFromSchedule,
  getSchedule,
  getSimilarSubjects,
  scheduleClass,
} from "@/api/api";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { FetchedSlot } from "@/types/ISchedule";
import { SimilarSubject } from "@/types/ISimilarSubject";
import { getNumberOfCredits } from "@/utils/getNumberOfCredits";
import { useState } from "react";
import { PageTitle } from "../../components/page-title";
import { SimilarSubject as SimilarSubjectPart } from "./similar";

export default function Mobility() {
  useAuth();

  const [filters, setFilters] = useState({
    university_name: "Turan",
    term: "Күз",
    year: 2024,
    faculty_name: "Engineering",
  });

  const [showUniversityHints, setShowUniversityHints] = useState(false);
  const [showFacultyHints, setShowFacultyHints] = useState(false);

  const [filteredCourses, setFilteredCourses] = useState<SimilarSubject[]>([]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!filters.university_name || !filters.faculty_name) {
      alert("Іздеу алдында барлық орындарды толтырыныз!");
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
    } catch (error) {
      setFilteredCourses([]);
      console.error("Failed to fetch similar subjects:", error);
    }
  };

  const handleSelectCourse = async (course: SimilarSubject) => {
    if (course.isSelected) {
      handleRemoveCourse(course);
    } else {
      handleAddCourse(course);
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

        toast({
          title: "Сәтті!",
          description: "Пән күнтізбеге енгізілді!",
          variant: "default",
        });

        handleSearch();
      } catch (error) {
        console.error("Failed to add course:", error);
        toast({
          title: "Қателік!",
          description: "Пән күнтізбеге енгізілмеді, мүмкін ол уақыт бос емес?",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveCourse = async (course: SimilarSubject) => {
    if (course) {
      try {
        await deleteSubjectFromSchedule(course.subject_semester_id);
        toast({
          title: "Сәтті!",
          description: "Пән күнтізбеден жойылды!",
          variant: "default",
        });

        handleSearch();
      } catch (error) {
        console.error("Failed to remove course:", error);
        toast({
          title: "Қателік!",
          description: "Пән күнтізбеден жойылмады",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Академиялық Ұтқырлық" />
      <div className="bg-neutral-50 p-6 rounded-[15px] shadow w-full max-w-5xl">
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

        <SimilarSubjectPart
          filteredCourses={filteredCourses}
          filters={filters}
          handleSelectCourse={handleSelectCourse}
        />
      </div>
      <Toaster />
    </main>
  );
}
