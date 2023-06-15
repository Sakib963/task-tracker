import axios from "axios";

const useAxios = () => {
  const axiosSecure = axios.create({
    baseURL: "https://task-tracker-server-gray.vercel.app",
  });

  return [axiosSecure];
};

export default useAxios;
