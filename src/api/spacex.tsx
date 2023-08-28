import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getAllLaunches = async (): Promise<Launch[]> => {
  const res = await axios.get<Launch[]>('https://api.spacexdata.com/v4/launches');
  return res.data;
};

export const getLaunchById = async (id: string): Promise<Launch> => {
  const res = await axios.get<Launch>(`https://api.spacexdata.com/v4/launches/${id}`);
  return res.data;
};
