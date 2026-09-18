import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUsers,
  FaPhone,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaPlus,
  FaEdit,
  FaTrash,
  FaRupeeSign,
  FaBuilding,
} from "react-icons/fa";
import apiRequest from "../apiRequest";
import { toast } from "react-toastify";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  .title-group h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--primary-dark);
  }

  .title-group p {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #4A1E5D 0%, #682B83 100%);
  color: #FFFFFF;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 14px var(--primary-glow);

  &:hover {
    box-shadow: 0 6px 18px var(--primary-glow);
  }
`;

const TabsNav = styled.div`
  display: flex;
  gap: 0.5rem;
  background: #FFFFFF;
  padding: 0.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  width: fit-content;

  button {
    padding: 0.6rem 1.4rem;
    border-radius: var(--radius-md);
    border: none;
    background: transparent;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &.active {
      background: var(--primary-color);
      color: #FFFFFF;
      box-shadow: 0 2px 8px var(--primary-glow);
    }
  }
`;

const HallsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const HallCard = styled(motion.div)`
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: rgba(197, 160, 89, 0.4);
  }

  .hall-header {
    background: linear-gradient(135deg, rgba(74, 30, 93, 0.08) 0%, rgba(104, 43, 131, 0.04) 100%);
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-light);

    .badge {
      display: inline-block;
      background: var(--primary-color);
      color: #FFFFFF;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--primary-dark);
      margin: 0 0 0.35rem 0;
    }

    .capacity {
      font-size: 0.82rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
  }

  .hall-body {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;

    p.about {
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.45;
      margin-bottom: 1rem;
    }

    .amenities-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-bottom: 1.25rem;

      .chip {
        font-size: 0.72rem;
        background: var(--bg-subtle);
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        color: var(--text-secondary);
        border: 1px solid var(--border-light);
      }
    }

    .price-action-row {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-light);
      padding-top: 1rem;

      .price {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--primary-color);
        display: flex;
        align-items: center;

        small {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-left: 0.2rem;
        }
      }

      .actions {
        display: flex;
        gap: 0.4rem;

        button {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid var(--border-light);
          background: var(--bg-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover.edit {
            background: rgba(74, 30, 93, 0.1);
            color: var(--primary-color);
          }

          &:hover.delete {
            background: #FEF2F2;
            color: #EF4444;
            border-color: #FECACA;
          }
        }
      }
    }
  }
`;

const TableCard = styled.div`
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  overflow: hidden;

  .table-responsive {
    overflow-x: auto;
    width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    min-width: 900px;

    th {
      background: var(--bg-subtle);
      padding: 1rem 1.25rem;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-light);
    }

    td {
      padding: 1rem 1.25rem;
      font-size: 0.85rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-light);
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: rgba(74, 30, 93, 0.02);
    }
  }
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;

  ${(props) => {
    switch (props.$status?.toLowerCase()) {
      case "confirmed":
        return `background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;`;
      case "cancelled":
        return `background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;`;
      case "pending":
      default:
        return `background: #FFFBEB; color: #92400E; border: 1px solid #FDE68A;`;
    }
  }}
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 10, 25, 0.65);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ModalContainer = styled(motion.div)`
  background: #FFFFFF;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: ${(props) => props.$maxWidth || "550px"};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);

  .modal-header {
    padding: 1.25rem 1.75rem;
    border-bottom: 1px solid var(--border-light);
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--primary-dark);
    }

    button {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.2rem;
      cursor: pointer;
    }
  }

  .modal-body {
    padding: 1.5rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;

      label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      input, select, textarea {
        padding: 0.6rem 0.85rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border-light);
        font-size: 0.85rem;
        outline: none;

        &:focus {
          border-color: var(--primary-color);
        }
      }
    }
  }

  .modal-footer {
    padding: 1.25rem 1.75rem;
    border-top: 1px solid var(--border-light);
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;

    button {
      padding: 0.65rem 1.25rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-secondary {
      background: var(--bg-subtle);
      border: 1px solid var(--border-light);
      color: var(--text-secondary);
    }

    .btn-primary {
      background: var(--primary-color);
      color: #FFFFFF;
      border: none;
    }
  }
`;

const ManageEvents = () => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  const [activeTab, setActiveTab] = useState("halls"); // 'halls' | 'bookings'
  const [halls, setHalls] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hall modal state
  const [isHallModalOpen, setIsHallModalOpen] = useState(false);
  const [isEditingHall, setIsEditingHall] = useState(false);
  const [hallForm, setHallForm] = useState({
    id: null,
    event_name: "",
    size: "250 Guests",
    price: "",
    amenities: "",
    about: "",
  });

  const fetchHalls = async () => {
    const res = await apiRequest(`${TravellersBaseUrl}events/`);
    if (res.success && Array.isArray(res.data)) {
      setHalls(res.data);
    }
  };

  const fetchEventBookings = async () => {
    const res = await apiRequest(`${TravellersBaseUrl}events/bookings/`);
    if (res.success && Array.isArray(res.data)) {
      setEventBookings(res.data);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchHalls(), fetchEventBookings()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenAddHall = () => {
    setIsEditingHall(false);
    setHallForm({
      id: null,
      event_name: "",
      size: "250 Guests",
      price: "",
      amenities: "AC, Sound System, Stage, Projector, Dining Hall",
      about: "",
    });
    setIsHallModalOpen(true);
  };

  const handleOpenEditHall = (hall) => {
    setIsEditingHall(true);
    setHallForm({
      id: hall.id,
      event_name: hall.event_name,
      size: hall.size || "200 Guests",
      price: hall.price || "",
      amenities: Array.isArray(hall.amenities) ? hall.amenities.join(", ") : hall.amenities || "",
      about: hall.about || "",
    });
    setIsHallModalOpen(true);
  };

  const handleSaveHall = async (e) => {
    e.preventDefault();
    const amenitiesArr = typeof hallForm.amenities === "string"
      ? hallForm.amenities.split(",").map((s) => s.trim()).filter(Boolean)
      : hallForm.amenities || [];

    const payload = {
      event_name: hallForm.event_name,
      size: hallForm.size,
      price: parseFloat(hallForm.price || 0),
      amenities: amenitiesArr,
      about: hallForm.about,
    };

    if (isEditingHall) {
      const res = await apiRequest(`${TravellersBaseUrl}events/${hallForm.id}/`, "PATCH", payload);
      if (res.success) {
        toast.success("Hall details updated successfully!");
        setIsHallModalOpen(false);
        fetchHalls();
      } else {
        toast.error(res.error || "Failed to update hall");
      }
    } else {
      const res = await apiRequest(`${TravellersBaseUrl}events/`, "POST", payload);
      if (res.success) {
        toast.success("Hall / Venue added successfully!");
        setIsHallModalOpen(false);
        fetchHalls();
      } else {
        toast.error(res.error || "Failed to create hall");
      }
    }
  };

  const handleDeleteHall = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    const res = await apiRequest(`${TravellersBaseUrl}events/${id}/`, "DELETE");
    if (res.success) {
      toast.success("Hall deleted successfully");
      fetchHalls();
    } else {
      toast.error(res.error || "Failed to delete hall");
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    const res = await apiRequest(`${TravellersBaseUrl}admin/event-booking/${bookingId}/`, "PATCH", {
      status: newStatus,
    });
    if (res.success) {
      toast.success(`Event booking #${bookingId} marked as ${newStatus}`);
      fetchEventBookings();
    } else {
      toast.error(res.error || "Failed to update status");
    }
  };

  return (
    <PageContainer className="animate-fade-in">
      <HeaderBar>
        <div className="title-group">
          <h2>Events & Banquet Venues</h2>
          <p>Manage resort event halls, banquet lawns, and guest reservation inquiries.</p>
        </div>

        {activeTab === "halls" && (
          <PrimaryButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenAddHall}
          >
            <FaPlus /> + Add New Hall / Venue
          </PrimaryButton>
        )}
      </HeaderBar>

      <TabsNav>
        <button
          className={activeTab === "halls" ? "active" : ""}
          onClick={() => setActiveTab("halls")}
        >
          <FaBuilding /> Venues & Halls ({halls.length})
        </button>
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          <FaCalendarAlt /> Event Reservations ({eventBookings.length})
        </button>
      </TabsNav>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <FaSpinner className="spin" size={28} color="var(--primary-color)" />
        </div>
      ) : activeTab === "halls" ? (
        halls.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3.5rem", background: "#FFFFFF", borderRadius: "16px", border: "1px solid var(--border-light)" }}>
            <FaBuilding size={40} color="var(--text-muted)" style={{ marginBottom: "0.75rem" }} />
            <p style={{ color: "var(--text-secondary)", fontWeight: "500" }}>No banquet halls or event venues added yet.</p>
          </div>
        ) : (
          <HallsGrid>
            {halls.map((hall) => {
              const amenities = Array.isArray(hall.amenities)
                ? hall.amenities
                : (hall.amenities || "").split(",");

              return (
                <HallCard key={hall.id}>
                  <div className="hall-header">
                    <span className="badge">Resort Venue</span>
                    <h3>{hall.event_name}</h3>
                    <div className="capacity">
                      <FaUsers size={12} /> Capacity: {hall.size || "200 Guests"}
                    </div>
                  </div>

                  <div className="hall-body">
                    <p className="about">
                      {hall.about || "Premium venue suitable for weddings, corporate meets, and celebrations."}
                    </p>

                    <div className="amenities-chips">
                      {amenities.map((am, i) => (
                        <span key={i} className="chip">
                          {typeof am === "string" ? am.trim() : am}
                        </span>
                      ))}
                    </div>

                    <div className="price-action-row">
                      <div className="price">
                        <FaRupeeSign size={16} />
                        {hall.price}
                        <small>/ event</small>
                      </div>

                      <div className="actions">
                        <button
                          className="edit"
                          onClick={() => handleOpenEditHall(hall)}
                          title="Edit Hall"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDeleteHall(hall.id, hall.event_name)}
                          title="Delete Hall"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </HallCard>
              );
            })}
          </HallsGrid>
        )
      ) : (
        /* Event Bookings Table */
        <TableCard>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest Details</th>
                  <th>Event Type</th>
                  <th>Event Date</th>
                  <th>Guests Count</th>
                  <th>Message / Notes</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventBookings.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "3.5rem", color: "var(--text-muted)" }}>
                      No event booking inquiries received yet.
                    </td>
                  </tr>
                ) : (
                  eventBookings.map((eb) => (
                    <tr key={eb.booking_id}>
                      <td>
                        <strong style={{ color: "var(--primary-dark)" }}>
                          #{eb.booking_id}
                        </strong>
                      </td>
                      <td>
                        <div>
                          <strong>{eb.name}</strong>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                            <FaPhone size={10} style={{ marginRight: "4px" }} />
                            {eb.phone}
                          </div>
                          {eb.email && (
                            <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                              {eb.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <strong style={{ color: "var(--primary-color)" }}>
                          {eb.event_type}
                        </strong>
                      </td>
                      <td>
                        <div style={{ fontSize: "0.82rem" }}>
                          {new Date(eb.event_date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: "600" }}>
                          <FaUsers size={12} color="var(--text-muted)" /> {eb.number_of_guests}
                        </div>
                      </td>
                      <td style={{ maxWidth: "220px" }}>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={eb.message}>
                          {eb.message || "—"}
                        </div>
                      </td>
                      <td>
                        <StatusPill $status={eb.status}>{eb.status}</StatusPill>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          {eb.status !== "confirmed" && (
                            <button
                              style={{
                                padding: "0.35rem 0.65rem",
                                borderRadius: "6px",
                                border: "1px solid #A7F3D0",
                                background: "#ECFDF5",
                                color: "#065F46",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                              onClick={() => handleUpdateBookingStatus(eb.booking_id, "confirmed")}
                              title="Confirm & Notify Guest"
                            >
                              <FaCheck /> Confirm
                            </button>
                          )}
                          {eb.status !== "cancelled" && (
                            <button
                              style={{
                                padding: "0.35rem 0.65rem",
                                borderRadius: "6px",
                                border: "1px solid #FECACA",
                                background: "#FEF2F2",
                                color: "#991B1B",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                              onClick={() => handleUpdateBookingStatus(eb.booking_id, "cancelled")}
                              title="Cancel Reservation"
                            >
                              <FaTimes /> Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TableCard>
      )}

      {/* Add / Edit Hall Modal (PORTAL) */}
      {isHallModalOpen &&
        ReactDOM.createPortal(
          <ModalOverlay onClick={() => setIsHallModalOpen(false)}>
            <ModalContainer
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{isEditingHall ? "Edit Hall / Venue" : "+ Add New Banquet Venue"}</h3>
                <button onClick={() => setIsHallModalOpen(false)}>✕</button>
              </div>

              <form onSubmit={handleSaveHall}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Hall / Venue Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grand Banquet Hall, Royal Lawn"
                      value={hallForm.event_name}
                      onChange={(e) => setHallForm({ ...hallForm, event_name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label>Guest Capacity *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 250 Guests"
                        value={hallForm.size}
                        onChange={(e) => setHallForm({ ...hallForm, size: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Rate per Event (₹) *</label>
                      <input
                        type="number"
                        required
                        placeholder="25000"
                        value={hallForm.price}
                        onChange={(e) => setHallForm({ ...hallForm, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Amenities (comma separated)</label>
                    <input
                      type="text"
                      placeholder="AC, Sound System, Stage, Projector, Dining Area"
                      value={hallForm.amenities}
                      onChange={(e) => setHallForm({ ...hallForm, amenities: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>About / Description</label>
                    <textarea
                      rows={3}
                      placeholder="Spacious luxury banquet hall with stage, chandeliers, and lawn access..."
                      value={hallForm.about}
                      onChange={(e) => setHallForm({ ...hallForm, about: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setIsHallModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {isEditingHall ? "Save Changes" : "Create Venue"}
                  </button>
                </div>
              </form>
            </ModalContainer>
          </ModalOverlay>,
          document.body
        )}
    </PageContainer>
  );
};

export default ManageEvents;
