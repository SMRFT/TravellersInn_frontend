import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHotel,
  FaCalendarCheck,
  FaCalendarAlt,
  FaCalendarDay,
  FaQuestionCircle,
  FaImage,
  FaFileInvoiceDollar,
  FaSignOutAlt,
  FaTimes,
  FaCrown,
} from "react-icons/fa";

const SidebarContainer = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #2D1137 0%, #4A1E5D 100%);
  color: #FFFFFF;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 4px 0 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;

  @media (max-width: 992px) {
    transform: ${(props) => (props.$isOpen ? "translateX(0)" : "translateX(-100%)")};
  }
`;

const BrandSection = styled.div`
  padding: 1.75rem 1.5rem 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .brand-logo-wrapper {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .logo-badge {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, #C5A059 0%, #E2C78E 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2D1137;
    font-size: 1.3rem;
    font-weight: 800;
    box-shadow: 0 4px 12px rgba(197, 160, 89, 0.35);
  }

  .brand-info {
    display: flex;
    flex-direction: column;
  }

  .brand-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.3px;
  }

  .brand-tag {
    font-size: 0.68rem;
    color: #C5A059;
    text-transform: uppercase;
    letter-spacing: 1.8px;
    font-weight: 600;
  }

  .close-mobile {
    display: none;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.2rem;
    cursor: pointer;
    &:hover { color: #FFFFFF; }
    @media (max-width: 992px) { display: block; }
  }
`;

const UserProfileCard = styled.div`
  margin: 1.25rem 1.25rem 0.5rem 1.25rem;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(197, 160, 89, 0.2);
    border: 1.5px solid #C5A059;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C5A059;
    font-size: 0.95rem;
    font-weight: 700;
  }

  .details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #FFFFFF;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .role-badge {
    font-size: 0.65rem;
    color: #C5A059;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const NavList = styled.nav`
  padding: 1rem 0.85rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  .section-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 1.4px;
    font-weight: 700;
    padding: 0.6rem 0.75rem 0.2rem 0.75rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s ease;

  svg {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.6);
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #FFFFFF;
    svg {
      color: #C5A059;
      transform: translateX(2px);
    }
  }

  &.active {
    background: linear-gradient(90deg, rgba(197, 160, 89, 0.25) 0%, rgba(197, 160, 89, 0.08) 100%);
    border-left: 3px solid #C5A059;
    color: #FFFFFF;
    font-weight: 600;

    svg {
      color: #C5A059;
    }
  }
`;

const FooterSection = styled.div`
  padding: 1rem 1.25rem 1.5rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 12px;
  color: #F87171;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #EF4444;
    color: #FFFFFF;
    box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
  }
`;

const Sidebar = ({ isOpen, onClose }) => {
  const userName = localStorage.getItem("name") || "User";
  const userRole = localStorage.getItem("role") || "Employee";

  const isAdmin = userRole === "Admin" || userRole === "Super Admin";
  const isManager = userRole === "Manager" || isAdmin;
  const isEmployee = true; // All authenticated roles can see employee routes

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/Secure";
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <BrandSection>
        <div className="brand-logo-wrapper">
          <div className="logo-badge">TI</div>
          <div className="brand-info">
            <span className="brand-title">TravellersInn</span>
            <span className="brand-tag">Admin Console</span>
          </div>
        </div>
        <button className="close-mobile" onClick={onClose}>
          <FaTimes />
        </button>
      </BrandSection>

      <UserProfileCard>
        <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
        <div className="details">
          <span className="name">{userName}</span>
          <span className="role-badge">
            <FaCrown size={10} /> {userRole}
          </span>
        </div>
      </UserProfileCard>

      <NavList>
        <span className="section-label">Operations</span>
        {/* Admin: Overview & Rooms */}
        {isAdmin && (
          <>
            <StyledNavLink to="/" end onClick={onClose}>
              <FaTachometerAlt />
              <span>Dashboard Overview</span>
            </StyledNavLink>

            <StyledNavLink to="/rooms" onClick={onClose}>
              <FaHotel />
              <span>Manage Rooms</span>
            </StyledNavLink>
          </>
        )}

        {/* Employee, Manager & Admin: Live Bookings & Room Availability */}
        {isEmployee && (
          <>
            <StyledNavLink to="/bookings" onClick={onClose}>
              <FaCalendarCheck />
              <span>Live Bookings</span>
            </StyledNavLink>

            <StyledNavLink to="/availability" onClick={onClose}>
              <FaCalendarDay />
              <span>Room Availability</span>
            </StyledNavLink>
          </>
        )}

        {/* Admin: Events */}
        {isAdmin && (
          <StyledNavLink to="/events" onClick={onClose}>
            <FaCalendarAlt />
            <span>Event Management</span>
          </StyledNavLink>
        )}

        {/* Admin: Guest & Content */}
        {isAdmin && (
          <>
            <span className="section-label" style={{ marginTop: "0.5rem" }}>
              Guest & Content
            </span>
            <StyledNavLink to="/queries" onClick={onClose}>
              <FaQuestionCircle />
              <span>Queries & Inbox</span>
            </StyledNavLink>

            <StyledNavLink to="/gallery" onClick={onClose}>
              <FaImage />
              <span>Photo Gallery</span>
            </StyledNavLink>
          </>
        )}

        {/* Manager & Admin: Accounts & Billing */}
        {isManager && (
          <>
            <span className="section-label" style={{ marginTop: "0.5rem" }}>
              Finance & Administration
            </span>
            <StyledNavLink to="/accounts" onClick={onClose}>
              <FaFileInvoiceDollar />
              <span>Accounts & Billing</span>
            </StyledNavLink>
          </>
        )}
      </NavList>

      <FooterSection>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Sign Out</span>
        </LogoutButton>
      </FooterSection>
    </SidebarContainer>
  );
};

export default Sidebar;
