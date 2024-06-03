import { Course } from "@/app/types/ICourse";
import * as XLSX from "xlsx";

export const exportToExcel = (selectedSubjects: Course[]) => {
  const headers = [
    "Subject ID",
    "Title",
    "Description",
    "Credits",
    "Day of Week",
    "Start Time",
    "End Time",
    "University",
    "Faculty",
  ];
  const data = selectedSubjects.map((subject) => [
    subject.subject__id,
    subject.subject__title,
    subject.subject__description,
    subject.subject__credits,
    subject.day_of_week,
    subject.start_time,
    subject.end_time,
    subject.subject__university__name,
    subject.subject__faculty__name,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Study Plan");

  XLSX.writeFile(workbook, "study_plan.xlsx");
};
