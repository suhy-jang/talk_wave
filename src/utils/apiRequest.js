import axiosInstance from './axiosInstance';

const apiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axiosInstance[method](endpoint, data);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    throw new Error('Something went wrong');
  } catch (error) {
    throw error.response.data.errors;
  }
};

export default apiRequest;
