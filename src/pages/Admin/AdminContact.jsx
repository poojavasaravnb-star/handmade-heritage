import React, { useEffect, useState } from "react";
import "./AdminContact.css";

const API_URL = "https://698823cf780e8375a6879f02.mockapi.io/contact";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);

  // ⭐ Fetch Messages
  const getMessages = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMessages(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  // ⭐ Delete Message
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    getMessages();
  };

  return (
    <div className="admin-contact">
      <h2>📩 Contact Messages</h2>

      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.id}</td>

                <td className="user-cell">
                  <div className="user-name">{msg.name}</div>
                </td>

                <td>{msg.email}</td>

                <td className="message-cell">
                  {msg.message}
                </td>

                <td className="date-cell">{msg.date}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContact;
