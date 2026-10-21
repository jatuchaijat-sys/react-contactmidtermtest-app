import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://nest-js-basic-api.onrender.com/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      let items = [];
      const resData = response.data?.data;

      if (Array.isArray(resData)) {
        items = resData;
      } else if (resData && Array.isArray(resData.items)) {
        items = resData.items;
      } else if (resData && Array.isArray(resData.contacts)) {
        items = resData.contacts;
      } else if (resData && Array.isArray(resData.data)) {
        items = resData.data;
      } else if (Array.isArray(response.data)) {
        items = response.data;
      }

      setContacts(items);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setError("ไม่สามารถดึงข้อมูลได้");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://nest-js-basic-api.onrender.com/contacts/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchContacts();
    } catch (err) {
      alert("ไม่สามารถลบข้อมูลได้");
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading)
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        กำลังโหลดข้อมูล...
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
        {error}
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            backgroundColor: "white",
            padding: "15px 20px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ margin: 0 }}>Midterm Test</h2>
          <div>
            <span style={{ marginRight: "15px", color: "#666" }}>
              student10@mail.com
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 15px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => navigate("/contacts/create")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + สร้าง Contact
          </button>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead
              style={{
                backgroundColor: "#f3f4f6",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "15px",
                    color: "#4b5563",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "15px",
                    color: "#4b5563",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "15px",
                    color: "#4b5563",
                    fontWeight: "bold",
                  }}
                >
                  Phone
                </th>
                <th
                  style={{
                    padding: "15px",
                    color: "#4b5563",
                    fontWeight: "bold",
                  }}
                >
                  Company
                </th>
                <th
                  style={{
                    padding: "15px",
                    color: "#4b5563",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    ไม่มีข้อมูลผู้ติดต่อ
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact.id || contact._id}
                    style={{ borderBottom: "1px solid #e5e7eb" }}
                  >
                    <td style={{ padding: "15px" }}>
                      {contact.firstName
                        ? `${contact.firstName} ${contact.lastName || ""}`
                        : contact.name || "-"}
                    </td>
                    <td style={{ padding: "15px" }}>{contact.email || "-"}</td>
                    <td style={{ padding: "15px" }}>{contact.phone || "-"}</td>
                    <td style={{ padding: "15px" }}>
                      {contact.company || "-"}
                    </td>
                    <td style={{ padding: "15px", textAlign: "right" }}>
                      <button
                        onClick={() =>
                          navigate(
                            `/contacts/edit/${contact.id || contact._id}`,
                          )
                        }
                        style={{
                          marginRight: "10px",
                          padding: "5px 10px",
                          border: "1px solid #ddd",
                          backgroundColor: "white",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() =>
                          openDeleteModal(contact.id || contact._id)
                        }
                        style={{
                          padding: "5px 10px",
                          border: "1px solid #fca5a5",
                          backgroundColor: "#fee2e2",
                          color: "#ef4444",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="ยืนยันการลบผู้ติดต่อ"
        message="ข้อมูลนี้จะถูกลบออกจากระบบอย่างถาวรและไม่สามารถกู้คืนได้"
      />
    </div>
  );
}

export default ContactList;
