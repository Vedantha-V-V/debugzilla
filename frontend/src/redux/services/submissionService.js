import api from '../../utils/axiosConfig';

const submitCode = async (submissionData) => {
  const response = await api.post('/submission', submissionData);
  return response.data;
};

const getSubmissions = async () => {
  const response = await api.get('/submission');
  return response.data;
};

const getSubmissionById = async (id) => {
  const response = await api.get(`/submission/${id}`);
  return response.data;
};

const deleteSubmission = async (id) => {
  const response = await api.delete(`/submission/${id}`);
  return response.data;
};

const submissionService = {
  submitCode,
  getSubmissions,
  getSubmissionById,
  deleteSubmission
};

export default submissionService;