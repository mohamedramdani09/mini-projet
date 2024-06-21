import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "./../apiFunction/apiService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null); // لإدارة حالة الحذف الفردي

  useEffect(() => {
    
    getUsers();
    }, []);
    
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <>
      <div className="main-title">
        <h3>User managment</h3>
      </div>
      <div>
        <table className="table table-striped animated fadeInUp">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Adress</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.user_id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name_user}</td>
                <td>{user.adress_user}</td>
                <td>{user.email_user}</td>
                <td>{user.phonenumber_user}</td>
                <td>
                  <button
                    onClick={(event) => handleDelete(user.user_id, event)}
                    disabled={deletingUserId === user.user_id}
                    className="btn btn-danger px-3 me-3 animated fadeInUp"
                  >
                    {deletingUserId === user.user_id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
