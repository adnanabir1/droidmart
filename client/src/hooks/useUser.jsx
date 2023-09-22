import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "react-query";

const useUser = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: isUser = [], isLoading: isUserLoading } = useQuery({
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryKey: ["isUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/user/${user?.email}`);
      return res.data.user;
    },
  });

  return [isUser, isUserLoading];
};

export default useUser;
