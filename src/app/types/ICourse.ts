export interface Course {
  id: number;
  day_of_week: string;
  end_time: string;
  semester__term: string;
  semester__year: number;
  start_time: string;
  subject__code: string;
  subject__credits: number;
  subject__faculty__name: string;
  subject__description: string;
  subject__id: number;
  subject__title: string;
  subject__university__name: string;
}
