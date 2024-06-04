export interface FetchedSlot {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  subject_semester_id: number;
  subject_semester__subject__title: string;
  subject_semester__subject__description: string;
  subject_semester__subject__credits: number;
  subject_semester__subject__university__name: string;
}

export interface ScheduleSlot {
  time: string;
  [key: string]:
    | { name: string; description: string; university: string }
    | string;
}
