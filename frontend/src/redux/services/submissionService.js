import api from '../../utils/axiosConfig';

const submitCode = async (submissionData) => {
  try {
    const response = await api.post('/submission', submissionData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 413) {
      throw new Error("Your code submission is too large. Please reduce the size and try again.");
    } else if (error.response?.status === 429) {
      throw new Error("You've made too many submissions. Please wait before trying again.");
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to submit code. Please try again later.");
    }
  }
};

const getSubmissions = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/submission${queryParams ? `?${queryParams}` : ''}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch submissions. Please try again later.");
  }
};

const getUserSubmissions = async () => {
  try {
    const response = await api.get('/user/submissions');
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch your submissions. Please try again later.");
  }
};

const getSubmissionById = async (id) => {
  try {
    const response = await api.get(`/submission/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch submission. Please try again later.");
  }
};

const deleteSubmission = async (id) => {
  try {
    const response = await api.delete(`/submission/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete submission. Please try again later.");
  }
};

const submissionService = {
  submitCode,
  getSubmissions,
  getSubmissionById,
  deleteSubmission,
  getUserSubmissions
};

export default submissionService;