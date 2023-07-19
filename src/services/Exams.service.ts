import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  baseURL: string = 'https://localhost:7022/api/exam/all';
  baseDelete:string='https://localhost:7022/api/exam/delete';


  constructor(private http: HttpClient) {}

  getAllExams() {
    return this.http.get(this.baseURL);
  }

  getExamById(examId: any) {
    return this.http.get(`${this.baseURL}?examId=${examId}`);
  }

  addExam(exam: any) {
    return this.http.post(this.baseURL,exam);
  }

  deleteExam(examId: any) {
    return this.http.delete(`${this.baseDelete}?examId=${examId}`);
  }

  editExam(examId: any, exam: any) {
    return this.http.put(`${this.baseURL}/?examId=${examId}`, exam);
  }

}
