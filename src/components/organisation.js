import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css';
import Sidebar from "../utils/side-bar";
import Header from "../utils/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

export default function Organisation() {
    const [org, setOrg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Modal
    const [currentOrg, setCurrentOrg] = useState(null);
    const [newOrg, setNewOrg] = useState({ name: "", address: "" }); // State for new organization

    useEffect(() => {
        fetchOrganisations();
    }, []);

    const fetchOrganisations = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/organisation", {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            setOrg(response.data);
        } catch (error) {
            console.error('Error fetching organisations:', error);
            alert("An error occurred while fetching organisations.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (org) => {
        setCurrentOrg(org);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentOrg(null);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/organisation/${currentOrg._id}`, currentOrg, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            fetchOrganisations(); // Refresh the organization list
            closeEditModal();
        } catch (error) {
            console.error("Error updating organisation:", error);
            alert("An error occurred while updating the organisation.");
        }
    };

    const openDeleteModal = (org) => {
        setCurrentOrg(org);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCurrentOrg(null);
    };

    const handleDeleteSubmit = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/organisation/${currentOrg._id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            fetchOrganisations(); // Refresh the organization list
            closeDeleteModal();
        } catch (error) {
            console.error("Error deleting organisation:", error);
            alert("An error occurred while deleting the organisation.");
        }
    };

    const handleChange = (e) => {
        setCurrentOrg({ ...currentOrg, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewOrg({ name: "", address: "" }); // Reset newOrg state
    };

    const handleAddSubmit = async () => {
        try {
            await axios.post("http://localhost:5000/api/organisation", newOrg, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            fetchOrganisations(); // Refresh the organization list
            closeAddModal();
        } catch (error) {
            console.error("Error adding organisation:", error);
            alert("An error occurred while adding the organisation.");
        }
    };

    const handleNewOrgChange = (e) => {
        setNewOrg({ ...newOrg, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Sidebar />
            {loading ? (<div>Loading.....</div>) : (
                <>
                    <Header />
                    <div style={{ marginLeft: '250px', padding: '20px' }}>
                        <div style={{ textAlign: 'end', marginBottom: '10px' }}>
                            <button className="addbutton" onClick={openAddModal}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    style={{ cursor: "pointer", marginRight: "10px" }}
                                />
                                Add</button>
                        </div>
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>SI.No</th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Organisation</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {org.length > 0 ? (
                                    org.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}</td>
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
                                        <td colSpan="6" style={{ textAlign: 'center' }}>
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
                <h2>Edit Organisation</h2>
                {currentOrg && (
                    <>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={currentOrg.name}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={currentOrg.address}
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
                {currentOrg && (
                    <>
                        <p>Are you sure you want to delete {currentOrg.name}?</p>
                        <button onClick={handleDeleteSubmit}>Yes</button>
                        <button onClick={closeDeleteModal}>No</button>
                    </>
                )}
            </Modal>

            {/* Add Modal */}
            <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
                <h2>Add Organisation</h2>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={newOrg.name}
                    onChange={handleNewOrgChange}
                />
                <br />
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={newOrg.address}
                    onChange={handleNewOrgChange}
                />
                <br />
                <button className="addbutton" style={{ marginRight: "10px" }} onClick={handleAddSubmit}>Add</button>
                <button className="addbutton" onClick={closeAddModal}>Cancel</button>
            </Modal>
        </div>
    );
}
