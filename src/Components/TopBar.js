import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaBars, FaSearch, FaUserCircle, FaBell, FaCalendarCheck, FaClock, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiRequest from "./apiRequest";

const TopBarContainer = styled.header`
  height: 70px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 900;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 1.3rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 8px;

    @media (max-width: 992px) {
      display: flex;
      align-items: center;
    }
  }

  .page-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--primary-dark);
    font-family: 'Outfit', sans-serif;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 1rem;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  input {
    width: 280px;
    padding: 0.55rem 1rem 0.55rem 2.4rem;
    border-radius: 999px;
    border: 1px solid var(--border-light);
    background: var(--bg-subtle);
    font-size: 0.85rem;
    color: var(--text-primary);
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--accent-gold);
      background: #FFFFFF;
      box-shadow: 0 0 0 3px var(--accent-gold-glow);
      width: 320px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .quick-status-pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.85rem;
    background: #ECFDF5;
    border: 1px solid #A7F3D0;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #065F46;

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.3); }
      100% { opacity: 1; transform: scale(1); }
    }
  }

  .user-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    background: var(--bg-subtle);
    border: 1px solid var(--border-light);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--primary-dark);
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationBellBtn = styled.button`
  position: relative;
  background: ${(props) => (props.$open ? "rgba(74, 30, 93, 0.1)" : "var(--bg-subtle)")};
  border: 1px solid var(--border-light);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-dark);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(74, 30, 93, 0.08);
    transform: scale(1.05);
  }

  svg {
    transform-origin: top center;
    ${(props) =>
      props.$hasCount &&
      `
      animation: bellSwingAndPulse 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    `}
  }

  @keyframes bellSwingAndPulse {
    0% { transform: rotate(0deg) scale(1); }
    15% { transform: rotate(16deg) scale(1.16); }
    30% { transform: rotate(-14deg) scale(1.18); }
    45% { transform: rotate(12deg) scale(1.14); }
    60% { transform: rotate(-8deg) scale(1.08); }
    75% { transform: rotate(4deg) scale(1.04); }
    85% { transform: rotate(-2deg) scale(1.01); }
    100% { transform: rotate(0deg) scale(1); }
  }

  .badge {
    position: absolute;
    top: -3px;
    right: -3px;
    background: #EF4444;
    color: #FFFFFF;
    font-size: 0.68rem;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
    animation: bounce 1.5s infinite alternate;
  }

  @keyframes bounce {
    0% { transform: translateY(0); }
    100% { transform: translateY(-2px); }
  }
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  width: 340px;
  background: #FFFFFF;
  border-radius: 14px;
  border: 1px solid var(--border-light);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
  z-index: 1050;
  overflow: hidden;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dropdown-header {
    padding: 12px 16px;
    background: linear-gradient(135deg, #4A1E5D 0%, #682B83 100%);
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      margin: 0;
      font-size: 0.88rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .count-tag {
      background: rgba(255, 255, 255, 0.2);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.72rem;
      font-weight: 600;
    }
  }

  .notifications-list {
    max-height: 320px;
    overflow-y: auto;
  }

  .notification-item {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(226, 232, 240, 0.7);
    cursor: pointer;
    transition: background 0.15s ease;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: rgba(74, 30, 93, 0.04);
    }

    .item-top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .guest-name {
        font-weight: 700;
        font-size: 0.85rem;
        color: var(--primary-dark);
      }

      .status-pill {
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        padding: 2px 6px;
        border-radius: 4px;
        background: #EFF6FF;
        color: #2563EB;
      }
    }

    .item-sub {
      font-size: 0.75rem;
      color: var(--text-secondary);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item-time {
      font-size: 0.7rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .empty-state {
    padding: 2rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.82rem;
  }

  .dropdown-footer {
    padding: 10px 16px;
    background: var(--bg-subtle);
    border-top: 1px solid var(--border-light);
    text-align: center;

    button {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const TopBar = ({ onToggleSidebar, title = "Admin Portal" }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name") || "Admin";
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;

  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef(null);

  const prevNotifIdsRef = useRef("");

  const fetchOnlineBookings = async () => {
    try {
      const res = await apiRequest(`${TravellersBaseUrl}admin/notifications/?_t=${Date.now()}`);
      if (res.success && Array.isArray(res.data)) {
        setNotifications(res.data);
        const currentIds = res.data.map((b) => b.booking_id || b.id).join(",");
        if (currentIds !== prevNotifIdsRef.current) {
          prevNotifIdsRef.current = currentIds;
          window.dispatchEvent(new Event("refresh_bookings"));
        }
      }
    } catch (err) {
      console.error("Notifications fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOnlineBookings();
    const interval = setInterval(fetchOnlineBookings, 5000); // 5-sec lightweight check (< 600 bytes)
    return () => clearInterval(interval);
  }, [TravellersBaseUrl]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatNotifTime = (iso) => {
    if (!iso) return "Recent";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-IN", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Recent";
    }
  };

  return (
    <TopBarContainer>
      <LeftSection>
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <span className="page-title">{title}</span>
        <SearchBox>
          <FaSearch />
          <input type="text" placeholder="Search bookings, rooms, guests..." />
        </SearchBox>
      </LeftSection>

      <RightSection>
        <div className="quick-status-pill">
          <span className="dot"></span>
          <span>System Online</span>
        </div>

        {/* Online Booking Notification Bell */}
        <NotificationWrapper ref={dropdownRef}>
          <NotificationBellBtn
            type="button"
            $open={isNotifOpen}
            $hasCount={notifications.length > 0}
            onClick={() => setIsNotifOpen((v) => !v)}
            title="Online Pending Booking Notifications"
          >
            <FaBell size={16} />
            {notifications.length > 0 && (
              <span className="badge">{notifications.length > 99 ? "99+" : notifications.length}</span>
            )}
          </NotificationBellBtn>

          {isNotifOpen && (
            <NotificationDropdown>
              <div className="dropdown-header">
                <h4>
                  <FaCalendarCheck /> Pending Bookings
                </h4>
                <span className="count-tag" style={{ background: "rgba(251, 191, 36, 0.3)", color: "#FEF3C7" }}>
                  {notifications.length} Pending
                </span>
              </div>

              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <div className="empty-state">
                    <FaInfoCircle size={22} style={{ marginBottom: "6px", color: "var(--text-muted)" }} />
                    <div>No pending online bookings.</div>
                  </div>
                ) : (
                  notifications.map((b, idx) => (
                    <div
                      key={b.booking_id || b.id || idx}
                      className="notification-item"
                      onClick={() => {
                        setIsNotifOpen(false);
                        window.dispatchEvent(new Event("refresh_bookings"));
                        navigate("/bookings");
                      }}
                    >
                      <div className="item-top">
                        <span className="guest-name">{b.guest_name || b.customer_name || "Online Guest"}</span>
                        <span className="status-pill" style={{ background: "#FEF3C7", color: "#B45309", border: "1px solid #FDE68A" }}>
                          Pending
                        </span>
                      </div>
                      <div className="item-sub">
                        <span>ID: <strong>{b.booking_id || b.id}</strong></span>
                        <span>₹{b.amount || b.net_amount || (b.payment_details && b.payment_details.amount) || "—"}</span>
                      </div>
                      <div className="item-time">
                        <FaClock size={10} /> Check-in: {formatNotifTime(b.check_in)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="dropdown-footer">
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifOpen(false);
                    window.dispatchEvent(new Event("refresh_bookings"));
                    navigate("/bookings");
                  }}
                >
                  Manage All Bookings →
                </button>
              </div>
            </NotificationDropdown>
          )}
        </NotificationWrapper>

        <div className="user-badge">
          <FaUserCircle size={18} color="#4A1E5D" />
          <span>{userName}</span>
        </div>
      </RightSection>
    </TopBarContainer>
  );
};

export default TopBar;
