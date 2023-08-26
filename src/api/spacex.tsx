import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getAllLaunches = async (): Promise<Launch[]> => {
  const res = await axios.get<Launch[]>('https://api.spacexdata.com/v4/launches');
  return res.data;
};
