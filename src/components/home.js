import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../utils/side-bar";
import Header from "../utils/header";
import Modal from "react-modal";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "", organization: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/user", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("An error occurred while fetching users.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (user) => {
        setCurrentUser(user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentUser(null);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/user/${currentUser._id}`, currentUser, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchUsers(); // Refresh the user list
            closeEditModal();
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred while updating the user.");
        }
    };

    const openDeleteModal = (user) => {
        setCurrentUser(user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCurrentUser(null);
    };

    const handleDeleteSubmit = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/user/${currentUser._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchUsers(); // Refresh the user list
            closeDeleteModal();
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    };

    const handleChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    const handleNewUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewUser({ name: "", email: "", role: "", organization: "" });
    };

    const handleAddSubmit = async () => {
        try {
            await axios.post("http://localhost:5000/api/user", newUser, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchUsers(); // Refresh the user list
            closeAddModal();
        } catch (error) {
            console.error("Error creating user:", error);
            alert("An error occurred while creating the user.");
        }
    };

    return (
        <div>
            <Sidebar />
            {loading ? (
                <div>Loading.....</div>
            ) : (
                <>
                    <Header />
                    <div style={{ marginLeft: "250px", padding: "20px" }}>
                        <div style={{ textAlign: 'end', marginBottom: '10px' }}>
                            <button className="addbutton" onClick={openAddModal}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    style={{ cursor: "pointer", marginRight: "10px" }}
                                />
                                Add
                            </button>
                        </div>
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>SI.No</th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Organisation</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.organization?.address || "NA"}</td>
                                            <td>
                                                {new Date(item.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                    style={{ cursor: "pointer", marginRight: "10px" }}
                                                    onClick={() => openEditModal(item)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{ cursor: "pointer", color: "red" }}
                                                    onClick={() => openDeleteModal(item)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: "center" }}>
                                            No data available!!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
                <h2>Edit User</h2>
                {currentUser && (
                    <>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={currentUser.name}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={currentUser.email}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Role:</label>
                        <input
                            type="text"
                            name="role"
                            value={currentUser.role}
                            onChange={handleChange}
                        />
                        <br />
                        <button onClick={handleEditSubmit}>Save</button>
                        <button onClick={closeEditModal}>Cancel</button>
                    </>
                )}
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal}>
                <h2>Confirm Deletion</h2>
                {currentUser && (
                    <>
                        <p>Are you sure you want to delete {currentUser.name}?</p>
                        <button onClick={handleDeleteSubmit}>Yes</button>
                        <button onClick={closeDeleteModal}>No</button>
                    </>
                )}
            </Modal>

            {/* Add User Modal */}
            <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
                <h2>Add New User</h2>
                <>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newUser.name}
                        onChange={handleNewUserChange}
                    />
                    <br />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleNewUserChange}
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleNewUserChange}
                    />
                    <br />
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={newUser.role}
                        onChange={handleNewUserChange}
                    />
                    <br />
                    <label>Organization:</label>
                    <input
                        type="text"
                        name="organization"
                        value={newUser.organization}
                        onChange={handleNewUserChange}
                    />
                    <br />
                    <button className="addbutton" style={{ marginRight: "10px" }} onClick={handleAddSubmit}>Add</button>
                    <button className="addbutton" onClick={closeAddModal}>Cancel</button>
                </>
            </Modal>
        </div>
    );
}
