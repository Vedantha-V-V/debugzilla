import api from '../../utils/axiosConfig';

const reviewCode = async (submissionId) => {
  const response = await api.post('/ai-review', { submissionId });
  return response.data;
};

const executeCode = async (codeData) => {
  const response = await api.post('/execute', codeData);
  return response.data;
};

const aiService = {
  reviewCode,
  executeCode
};

export default aiService;