import React from "react";
import { useQuery } from "react-query";

const useUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
    },
  });
  return [users, refetch];
};

export default useUsers;
