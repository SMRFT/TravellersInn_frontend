import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaBars, FaSearch, FaUserCircle, FaBell, FaCalendarCheck, FaClock, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiRequest from "./apiRequest";

const TopBarContainer = styled.header`
  height: 72px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1.5px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.25rem;
  position: sticky;
  top: 0;
  z-index: 900;
  box-shadow: 0 4px 20px -2px rgba(27, 10, 36, 0.03);

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 64px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .menu-toggle {
    display: none;
    background: rgba(59, 21, 78, 0.06);
    border: 1px solid var(--border-light);
    color: var(--primary-color);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 10px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(59, 21, 78, 0.12);
      transform: scale(1.05);
    }

    @media (max-width: 992px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .page-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-dark);
    font-family: 'Outfit', sans-serif;
    letter-spacing: -0.02em;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 1.1rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  input {
    width: 300px;
    padding: 0.6rem 2.8rem 0.6rem 2.6rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-medium);
    background: var(--bg-subtle);
    font-size: 0.85rem;
    color: var(--text-primary);
    outline: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);

    &:hover {
      border-color: #CBD5E1;
      background: #FFFFFF;
    }

    &:focus {
      border-color: var(--accent-gold) !important;
      background: #FFFFFF !important;
      box-shadow: 0 0 0 3.5px var(--accent-gold-glow) !important;
      width: 350px;
    }
  }

  .shortcut-badge {
    position: absolute;
    right: 0.85rem;
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--text-muted);
    background: rgba(0, 0, 0, 0.04);
    padding: 2px 6px;
    border-radius: 6px;
    border: 1px solid var(--border-light);
    pointer-events: none;
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .user-badge {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.35rem 0.85rem 0.35rem 0.5rem;
    border-radius: 999px;
    background: #FFFFFF;
    border: 1px solid var(--border-light);
    box-shadow: var(--shadow-xs);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--primary-dark);
    transition: all 0.2s ease;

    &:hover {
      box-shadow: var(--shadow-sm);
      border-color: rgba(197, 160, 89, 0.35);
    }

    .user-avatar-mini {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #DFBA73 0%, #C5A059 100%);
      color: #1A0724;
      font-size: 0.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(197, 160, 89, 0.3);
    }
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationBellBtn = styled.button`
  position: relative;
  background: ${(props) => (props.$open ? "rgba(59, 21, 78, 0.1)" : "#FFFFFF")};
  border: 1px solid var(--border-light);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-dark);
  box-shadow: var(--shadow-xs);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: rgba(59, 21, 78, 0.06);
    border-color: rgba(197, 160, 89, 0.4);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  svg {
    transform-origin: top center;
    ${(props) =>
      props.$hasCount &&
      `
      animation: bellSwingAndPulse 2.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    `}
  }

  @keyframes bellSwingAndPulse {
    0% { transform: rotate(0deg) scale(1); }
    15% { transform: rotate(14deg) scale(1.12); }
    30% { transform: rotate(-12deg) scale(1.14); }
    45% { transform: rotate(10deg) scale(1.1); }
    60% { transform: rotate(-6deg) scale(1.05); }
    75% { transform: rotate(3deg) scale(1.02); }
    100% { transform: rotate(0deg) scale(1); }
  }

  .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    background: linear-gradient(135deg, #E11D48 0%, #BE123C 100%);
    color: #FFFFFF;
    font-size: 0.65rem;
    font-weight: 800;
    min-width: 19px;
    height: 19px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-shadow: 0 2px 8px rgba(225, 29, 72, 0.5);
    border: 2px solid #FFFFFF;
  }
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 360px;
  background: #FFFFFF;
  border-radius: 18px;
  border: 2px solid rgba(197, 160, 89, 0.55);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.85) inset, 0 25px 60px -10px rgba(27, 8, 38, 0.25), 0 0 25px rgba(197, 160, 89, 0.2);
  z-index: 1050;
  overflow: hidden;
  animation: fadeInDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .dropdown-header {
    padding: 14px 18px;
    background: linear-gradient(135deg, #1C0A25 0%, #3B154E 60%, #5B1E72 100%);
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 700;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .count-tag {
      background: rgba(197, 160, 89, 0.25);
      border: 1px solid rgba(197, 160, 89, 0.4);
      color: #FDF4E3;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 0.72rem;
      font-weight: 700;
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
          <span className="shortcut-badge">⌘K</span>
        </SearchBox>
      </LeftSection>

      <RightSection>
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
                <span className="count-tag">
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
          <div className="user-avatar-mini">{userName.charAt(0).toUpperCase()}</div>
          <span>{userName}</span>
        </div>
      </RightSection>
    </TopBarContainer>
  );
};

export default TopBar;
