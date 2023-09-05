import React from "react";
import useUsers from "../../../../hooks/useUsers";

const ManageUsers = () => {
  const [users, refetch] = useUsers();

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/role/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("User Role Updated To Admin");
          refetch();
        }
      });
  };
  const handleMakeUser = (user) => {
    fetch(`http://localhost:5000/users/role/user/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("Admin Role Updated To User");
          refetch();
        }
      });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>
                <span>{idx + 1}</span>
              </td>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-circle w-12 h-12">
                      <img src={user.image} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </div>
              </td>
              <td>
                <span>{user.email}</span>
              </td>
              <td>
                <span>{user.role}</span>
              </td>
              <th>
                <button
                  disabled={user.role === "user"}
                  onClick={() => handleMakeUser(user)}
                  className="btn btn-ghost btn-xs"
                >
                  Make User
                </button>
                <button
                  disabled={user.role === "admin"}
                  onClick={() => handleMakeAdmin(user)}
                  className="btn btn-ghost btn-xs"
                >
                  Make Admin
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
