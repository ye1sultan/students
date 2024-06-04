import { Course } from "@/types/ICourse";
import * as XLSX from "xlsx";
import { getUser } from "../api/api";

export const exportToExcel = async (selectedSubjects: Course[]) => {
  const user = await getUser();

  const userInfo = [user?.first_name, user?.last_name];
  const semesterInfo = ["Күз", 2024];

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

  const tableRow = selectedSubjects.map((subject) => [
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

  const worksheetData = [userInfo, semesterInfo, headers, ...tableRow];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Study Plan");

  XLSX.writeFile(workbook, "study_plan.xlsx");
};
