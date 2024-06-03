export interface FetchedSlot {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  subject_semester_id: number;
  subject_semester__subject__title: string;
  subject_semester__subject__description: string;
  subject_semester__subject__credits: number;
}

export interface ScheduleSlot {
  time: string;
  Monday?: { name: string; description: string };
  Tuesday?: { name: string; description: string };
  Wednesday?: { name: string; description: string };
  Thursday?: { name: string; description: string };
  Friday?: { name: string; description: string };
}
