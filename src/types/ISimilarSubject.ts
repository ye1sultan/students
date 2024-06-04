export interface SimilarSubject {
  title: string;
  description: string;
  university: string;
  faculty: string;
  term: string;
  semester_id: number;
  subject_semester_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  credits: number;
  similarity: number;
  isSelected: boolean;
}
