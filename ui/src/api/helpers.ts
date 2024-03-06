import axios from 'axios';

export const getRequest = async (url: string, profileId: string) => {
  try {
    const response = await axios.request({
      url,
      method: 'get',
      baseURL: process.env.REACT_APP_API_URL,
      headers: { 'profile_id': profileId }
    });
    return response;
  } catch (error) {
    return error;
  }
}

export const postRequest = async (url: string, body: any, profileId: string) => {
  try {
    const response = await axios.request({
      url,
      method: 'post',
      data: body,
      baseURL: process.env.REACT_APP_API_URL,
      headers: { 'profile_id': profileId }
    });
    return response;
  } catch (error) {
    return error;
  }
}
