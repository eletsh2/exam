import axios from "axios";

// get all exams
export const getAllExams = () => {
  return axios.get("/exams");
};

// get exam by id
export const getExamById = (id: string) => {
  return axios.get(`/exams/${id}`);
};

// create exam
export const createExam = (data: any) => {
  return axios.post("/exams", data);
};

// update exam
export const updateExam = (id: string, data: any) => {
  return axios.put(`/exams/${id}`, data);
};

// delete exam
export const deleteExam = (id: string) => {
  return axios.delete(`/exams/${id}`);
};
