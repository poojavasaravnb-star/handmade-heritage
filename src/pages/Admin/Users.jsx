import { useEffect, useState } from "react";
import "./user.css";

const API_URL = "https://6981e61cc9a606f5d44864fa.mockapi.io/login";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="users-page">
      <br />

      <div className="users-container">
        <h2 className="users-title">Users Menagement Module</h2>

        {users.length === 0 ? (
          <p className="no-users">No users found</p>
        ) : (
          <div className="users-card">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
