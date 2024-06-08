import { courseall } from "./courseall";

export interface Subject {
    id_subject: number;
    subject_name: string;
  }
  
  export interface TeacherSubject {
    id_teacher_subject: number;
    subject: Subject;
    course: courseall;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    lastName: string;
    isActive: boolean;
    password: string;
     phone:number;
    subjects: TeacherSubject[];
    courses: courseall[];
  }


 