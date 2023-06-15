import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useTasks = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxios();

  const { refetch, data: tasks = [] } = useQuery({
    queryKey: ["tasks", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure(`/tasks?email=${user?.email}`);
        return res.data;
      }
      return [];
    },
  });

  return [tasks, refetch];
};

export default useTasks;
