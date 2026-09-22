import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaTools,
  FaBed,
  FaUser,
  FaSpinner,
  FaArrowLeft,
  FaArrowRight,
  FaBroom,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { toast } from "react-toastify";
import apiRequest from "../apiRequest";

const formatStayDateTime = (dtStr) => {
  if (!dtStr) return "—";
  try {
    const d = new Date(dtStr);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return "—";
  }
};

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

const TopControlCard = styled.div`
  background: #ffffff;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .date-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .date-picker-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    input[type="date"] {
      padding: 0.55rem 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-light);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary-dark);
      background: var(--bg-subtle);
      outline: none;
      cursor: pointer;

      &:focus {
        border-color: var(--accent-gold);
      }
    }

    .nav-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid var(--border-light);
      background: var(--bg-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background: var(--primary-color);
        color: #ffffff;
        border-color: var(--primary-color);
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.75rem;
  }
`;

const StatBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  border: 1.5px solid ${(props) => (props.$active ? props.$borderColor : "var(--border-light)")};
  background: ${(props) => (props.$active ? props.$bgActive : "var(--bg-subtle)")};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .stat-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${(props) => props.$color};
    }

    .label {
      font-size: 0.82rem;
      font-weight: 700;
      color: ${(props) => (props.$active ? props.$textColor : "var(--text-primary)")};
    }
  }

  .count {
    font-size: 1.1rem;
    font-weight: 800;
    color: ${(props) => props.$color};
    font-family: "Outfit", sans-serif;
  }
`;

const AvailabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
`;

const getStatusTheme = (status) => {
  switch (status) {
    case "vacant":
      return {
        name: "Vacant",
        border: "#10B981",
        bgBadge: "#ECFDF5",
        textBadge: "#065F46",
        color: "#10B981",
        lightBg: "#F0FDF4",
        icon: <FaCheckCircle color="#10B981" />,
      };
    case "booked":
      return {
        name: "Booked",
        border: "#3B82F6",
        bgBadge: "#EFF6FF",
        textBadge: "#1D4ED8",
        color: "#3B82F6",
        lightBg: "#F0F9FF",
        icon: <FaBed color="#3B82F6" />,
      };
    case "dirty":
      return {
        name: "Dirty",
        border: "#F59E0B",
        bgBadge: "#FFFBEB",
        textBadge: "#92400E",
        color: "#F59E0B",
        lightBg: "#FEFCE8",
        icon: <FaBroom color="#F59E0B" />,
      };
    case "occupied":
      return {
        name: "Occupied",
        border: "#EF4444",
        bgBadge: "#FEF2F2",
        textBadge: "#991B1B",
        color: "#EF4444",
        lightBg: "#FFF1F2",
        icon: <FaTimesCircle color="#EF4444" />,
      };
    case "maintenance":
    default:
      return {
        name: "Under Maintenance",
        border: "#1F2937",
        bgBadge: "#1F2937",
        textBadge: "#FFFFFF",
        color: "#111827",
        lightBg: "#F3F4F6",
        icon: <FaTools color={status === "maintenance" ? "#FFFFFF" : "#111827"} />,
      };
  }
};

const RoomStatusCard = styled(motion.div)`
  background: #ffffff;
  border-radius: var(--radius-lg);
  border: 1.5px solid ${(props) => props.$theme.border};
  padding: 1.4rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .room-badge {
      display: flex;
      flex-direction: column;

      .number {
        font-size: 1.35rem;
        font-weight: 800;
        color: var(--primary-dark);
        font-family: "Outfit", sans-serif;
      }

      .type {
        font-size: 0.8rem;
        color: var(--text-secondary);
        font-weight: 500;
      }
    }

    .pill {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      background: ${(props) => props.$theme.bgBadge};
      color: ${(props) => props.$theme.textBadge};
      border: 1px solid ${(props) => props.$theme.border};
    }
  }

  .guest-info-box {
    background: #fef2f2;
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: var(--radius-sm);
    padding: 0.85rem 1rem;

    .guest-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: #991b1b;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .guest-details {
      font-size: 0.76rem;
      color: #7f1d1d;
      margin-top: 0.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
  }

  .dirty-info-box {
    background: #fffbeb;
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: var(--radius-sm);
    padding: 0.85rem 1rem;
    color: #92400e;

    .title {
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 0.3rem;
    }

    p {
      font-size: 0.76rem;
      margin: 0;
    }
  }

  .free-info-box {
    background: #f0fdf4;
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: var(--radius-sm);
    padding: 0.85rem 1rem;
    font-size: 0.82rem;
    color: #065f46;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  }

  .maintenance-info-box {
    background: #f3f4f6;
    border: 1px solid rgba(31, 41, 55, 0.25);
    border-radius: var(--radius-sm);
    padding: 0.85rem 1rem;
    font-size: 0.82rem;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  }

  .action-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-light);

    .quick-btn {
      flex: 1;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      border: none;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: all 0.2s ease;

      &.clean-btn {
        background: #10b981;
        color: #ffffff;
        &:hover {
          background: #059669;
        }
      }

      &.active-btn {
        background: #1f2937;
        color: #ffffff;
        &:hover {
          background: #111827;
        }
      }
    }

    .status-dropdown {
      position: relative;
    }
  }
`;

const StatusSelect = styled.select`
  padding: 0.45rem 0.65rem;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--bg-subtle);
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const RoomAvailability = () => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [updatingRoom, setUpdatingRoom] = useState(null);

  const fetchAvailability = async (date) => {
    setLoading(true);
    const res = await apiRequest(`${TravellersBaseUrl}admin/room-availability/?date=${date}`);
    const roomsArray = Array.isArray(res?.data) ? res.data : (Array.isArray(res?.data?.rooms) ? res.data.rooms : null);
    if (res.success && roomsArray) {
      setAvailability(roomsArray);
    } else {
      // Fallback
      const roomRes = await apiRequest(`${TravellersBaseUrl}rooms/`);
      if (roomRes.success && Array.isArray(roomRes.data)) {
        const formatted = roomRes.data.map((r) => ({
          room_number: r.room_number,
          room_type: r.room_type,
          status: r.is_active === false || r.status === "maintenance" ? "maintenance" : "vacant",
          status_label: r.is_active === false || r.status === "maintenance" ? "Under Maintenance" : "Vacant",
          color: r.is_active === false || r.status === "maintenance" ? "black" : "green",
          is_occupied: false,
          booking_details: null,
        }));
        setAvailability(formatted);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAvailability(selectedDate);
  }, [selectedDate]);

  const changeDateByDays = (days) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split("T")[0]);
  };

  const handleUpdateStatus = async (roomNumber, newStatus) => {
    setUpdatingRoom(roomNumber);
    // Optimistic UI update
    setAvailability((prev) =>
      prev.map((r) => {
        if (r.room_number === roomNumber) {
          const theme = getStatusTheme(newStatus);
          return {
            ...r,
            status: newStatus,
            status_label: theme.name,
            color:
              newStatus === "maintenance"
                ? "black"
                : newStatus === "occupied"
                ? "red"
                : newStatus === "dirty"
                ? "yellow"
                : "green",
            is_occupied: newStatus === "occupied",
            is_active: newStatus !== "maintenance",
          };
        }
        return r;
      })
    );

    const res = await apiRequest(
      `${TravellersBaseUrl}admin/room-availability/update-status/`,
      "POST",
      {
        room_number: roomNumber,
        status: newStatus,
      }
    );

    if (res.success) {
      toast.success(`Room ${roomNumber} updated to ${newStatus.toUpperCase()}`);
    } else {
      toast.error(res.error || "Failed to update room status");
      // Re-fetch to sync actual state
      fetchAvailability(selectedDate);
    }
    setUpdatingRoom(null);
  };

  // Counts
  const totalRooms = availability.length;
  const vacantCount = availability.filter((r) => r.status === "vacant").length;
  const bookedCount = availability.filter((r) => r.status === "booked").length;
  const dirtyCount = availability.filter((r) => r.status === "dirty").length;
  const occupiedCount = availability.filter((r) => r.status === "occupied").length;
  const maintenanceCount = availability.filter((r) => r.status === "maintenance").length;

  const filteredAvailability = availability.filter((r) => {
    if (activeFilter === "all") return true;
    return r.status === activeFilter;
  });

  return (
    <PageContainer className="animate-fade-in">
      <HeaderBar>
        <div className="title-group">
          <h2>Room Availability & Housekeeping</h2>
          <p>
            Monitor real-time room occupancy, confirmed bookings, cleaning state (Clean/Dirty), and maintenance schedule.
          </p>
        </div>
      </HeaderBar>

      <TopControlCard>
        <div className="date-row">
          <div className="date-picker-group">
            <button
              className="nav-btn"
              onClick={() => changeDateByDays(-1)}
              title="Previous Day"
            >
              <FaArrowLeft size={12} />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button
              className="nav-btn"
              onClick={() => changeDateByDays(1)}
              title="Next Day"
            >
              <FaArrowRight size={12} />
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <StatBadge
            $active={activeFilter === "all"}
            $color="#5a3078"
            $borderColor="#5a3078"
            $bgActive="#F5EFFB"
            $textColor="#5a3078"
            onClick={() => setActiveFilter("all")}
          >
            <div className="stat-left">
              <span className="label">All Rooms</span>
            </div>
            <span className="count">{totalRooms}</span>
          </StatBadge>

          <StatBadge
            $active={activeFilter === "vacant"}
            $color="#10B981"
            $borderColor="#10B981"
            $bgActive="#ECFDF5"
            $textColor="#065F46"
            onClick={() => setActiveFilter("vacant")}
          >
            <div className="stat-left">
              <div className="dot" />
              <span className="label">Vacant</span>
            </div>
            <span className="count">{vacantCount}</span>
          </StatBadge>

          <StatBadge
            $active={activeFilter === "booked"}
            $color="#3B82F6"
            $borderColor="#3B82F6"
            $bgActive="#EFF6FF"
            $textColor="#1D4ED8"
            onClick={() => setActiveFilter("booked")}
          >
            <div className="stat-left">
              <div className="dot" />
              <span className="label">Booked</span>
            </div>
            <span className="count">{bookedCount}</span>
          </StatBadge>

          <StatBadge
            $active={activeFilter === "occupied"}
            $color="#EF4444"
            $borderColor="#EF4444"
            $bgActive="#FEF2F2"
            $textColor="#991B1B"
            onClick={() => setActiveFilter("occupied")}
          >
            <div className="stat-left">
              <div className="dot" />
              <span className="label">Occupied</span>
            </div>
            <span className="count">{occupiedCount}</span>
          </StatBadge>

          <StatBadge
            $active={activeFilter === "dirty"}
            $color="#F59E0B"
            $borderColor="#F59E0B"
            $bgActive="#FFFBEB"
            $textColor="#92400E"
            onClick={() => setActiveFilter("dirty")}
          >
            <div className="stat-left">
              <div className="dot" />
              <span className="label">Dirty</span>
            </div>
            <span className="count">{dirtyCount}</span>
          </StatBadge>

          <StatBadge
            $active={activeFilter === "maintenance"}
            $color="#1F2937"
            $borderColor="#1F2937"
            $bgActive="#F3F4F6"
            $textColor="#111827"
            onClick={() => setActiveFilter("maintenance")}
          >
            <div className="stat-left">
              <div className="dot" />
              <span className="label">Under Maint.</span>
            </div>
            <span className="count">{maintenanceCount}</span>
          </StatBadge>
        </div>
      </TopControlCard>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <FaSpinner className="spin" size={28} color="var(--primary-color)" />
        </div>
      ) : (
        <AvailabilityGrid>
          {filteredAvailability.map((item) => {
            const theme = getStatusTheme(item.status);
            const isUpdating = updatingRoom === item.room_number;
            const bInfo = item.current_booking || item.booking_details || {};
            const guestName = bInfo.guest_name || item.guest_name || (item.status === "occupied" ? "Guest In-House" : "Reserved Guest");
            const guestPhone = bInfo.guest_phone || item.guest_phone || "";
            const checkInTime = bInfo.check_in || item.check_in;
            const checkOutTime = bInfo.check_out || item.check_out;
            const bookingId = bInfo.booking_id || item.booking_id;

            return (
              <RoomStatusCard key={item.room_number} $theme={theme}>
                <div className="card-top">
                  <div className="room-badge">
                    <span className="number">Room #{item.room_number}</span>
                    <span className="type">{item.room_type || "Deluxe Room"}</span>
                  </div>
                  <div className="pill">
                    {theme.icon}
                    <span>{theme.name}</span>
                  </div>
                </div>

                {item.status === "booked" && (
                  <div className="guest-info-box" style={{ background: "#EFF6FF", border: "1px solid rgba(59, 130, 246, 0.25)" }}>
                    <div className="guest-name" style={{ color: "#1D4ED8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <FaUser size={12} color="#3B82F6" />
                        <span>{guestName}</span>
                      </div>
                      {bookingId && (
                        <span style={{ fontSize: "0.72rem", background: "#DBEAFE", color: "#1E40AF", padding: "1px 6px", borderRadius: "4px", fontWeight: 700 }}>
                          #{bookingId}
                        </span>
                      )}
                    </div>
                    <div className="guest-details" style={{ color: "#1E40AF", marginTop: "0.35rem" }}>
                      {guestPhone && (
                        <span>
                          <FaPhoneAlt size={10} /> {guestPhone}
                        </span>
                      )}
                      <span>
                        <FaCalendarAlt size={10} /> <strong>Check-in:</strong> {formatStayDateTime(checkInTime)}
                      </span>
                      <span>
                        <FaClock size={10} /> <strong>Check-out:</strong> {formatStayDateTime(checkOutTime)}
                      </span>
                    </div>
                  </div>
                )}

                {item.status === "occupied" && (
                  <div className="guest-info-box">
                    <div className="guest-name" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <FaUser size={12} color="#EF4444" />
                        <span>{guestName}</span>
                      </div>
                      {bookingId && (
                        <span style={{ fontSize: "0.72rem", background: "#FEE2E2", color: "#991B1B", padding: "1px 6px", borderRadius: "4px", fontWeight: 700 }}>
                          #{bookingId}
                        </span>
                      )}
                    </div>
                    <div className="guest-details" style={{ marginTop: "0.35rem" }}>
                      {guestPhone && (
                        <span>
                          <FaPhoneAlt size={10} /> {guestPhone}
                        </span>
                      )}
                      <span>
                        <FaCalendarAlt size={10} /> <strong>Check-in:</strong> {formatStayDateTime(checkInTime)}
                      </span>
                      <span>
                        <FaClock size={10} /> <strong>Check-out:</strong> {formatStayDateTime(checkOutTime)}
                      </span>
                    </div>
                  </div>
                )}

                {item.status === "dirty" && (
                  <div className="dirty-info-box">
                    <div className="title">
                      <FaExclamationTriangle size={13} /> Needs Cleaning
                    </div>
                    <p>Guest has checked out. Awaiting housekeeping sanitize & clean.</p>
                  </div>
                )}

                {item.status === "vacant" && (
                  <div className="free-info-box">
                    <FaBed /> Ready for Booking & Walk-in
                  </div>
                )}

                {item.status === "maintenance" && (
                  <div className="maintenance-info-box">
                    <FaTools /> Blocked for Repairs / Maintenance
                  </div>
                )}

                <div className="action-bar">
                  {item.status === "dirty" && (
                    <button
                      className="quick-btn clean-btn"
                      disabled={isUpdating}
                      onClick={() => handleUpdateStatus(item.room_number, "vacant")}
                    >
                      <FaBroom size={12} /> Mark Cleaned
                    </button>
                  )}

                  {item.status === "maintenance" && (
                    <button
                      className="quick-btn active-btn"
                      disabled={isUpdating}
                      onClick={() => handleUpdateStatus(item.room_number, "vacant")}
                    >
                      <FaCheckCircle size={12} /> Restore Active
                    </button>
                  )}

                  <div className="status-dropdown">
                    <StatusSelect
                      value={item.status}
                      disabled={isUpdating || item.status === "occupied"}
                      onChange={(e) => handleUpdateStatus(item.room_number, e.target.value)}
                    >
                      {item.status === "occupied" && (
                        <option value="occupied" disabled>🔴 Occupied (Active Stay)</option>
                      )}
                      <option value="vacant">🟢 Vacant (Clean)</option>
                      <option value="dirty">🟡 Dirty (Needs Cleaning)</option>
                      <option value="maintenance">⚫ Under Maintenance</option>
                    </StatusSelect>
                  </div>
                </div>
              </RoomStatusCard>
            );
          })}
        </AvailabilityGrid>
      )}
    </PageContainer>
  );
};

export default RoomAvailability;
