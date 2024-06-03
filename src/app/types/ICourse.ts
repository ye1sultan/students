export interface Course {
  id: number;
  subject__id: number;
  subject__code: string;
  subject__title: string;
  subject__credits: string;
  subject__description: string;
  subject__university__name: string;
  subject__faculty__name: string;
  semester__id: number;
  semester__year: number;
  semester__term: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}
