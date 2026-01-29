export interface Lecturer {
  id: string;
  name: string;
  photoUrl: string;
  role: string;
}

export type TagColor = 'pink' | 'blue' | 'green' | 'gray' | 'purple' | 'primary';

export interface Tag {
  id: string;
  text: string;
  color: TagColor;
}

export interface Lesson {
  id: string;
  time: string;
  title: string;
  lecturers: Lecturer[];
  tags: Tag[];
  column: 'left' | 'right' | null;
  description?: string;
}

export interface Day {
  id: string;
  date: string;
  title: string; // e.g. "SUNDAY 25.01"
  layoutMode: 'list' | 'columns';
  lessons: Lesson[];
}

export interface Schedule {
  id: string;
  title: string;
  dateRange: string;
  days: Day[];
  theme: 'classic' | 'modern' | 'minimal';
}
