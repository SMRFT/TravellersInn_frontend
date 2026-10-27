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
  background: linear-gradient(180deg, #15061F 0%, #230A32 45%, #340F48 100%);
  color: #FFFFFF;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border-right: 1.5px solid rgba(197, 160, 89, 0.25);
  box-shadow: 6px 0 35px rgba(10, 2, 16, 0.45);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;

  /* Custom Sidebar Scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(197, 160, 89, 0.25);
    border-radius: 999px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 992px) {
    transform: ${(props) => (props.$isOpen ? "translateX(0)" : "translateX(-100%)")};
  }
`;

const BrandSection = styled.div`
  padding: 1.75rem 1.5rem 1.35rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 1.5rem;
    right: 1.5rem;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(197, 160, 89, 0.35) 50%, transparent 100%);
  }

  .brand-logo-wrapper {
    display: flex;
    align-items: center;
    gap: 0.9rem;
  }

  .logo-badge {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #DFBA73 0%, #C5A059 50%, #9F7B34 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1A0724;
    font-size: 1.25rem;
    font-weight: 800;
    font-family: 'Playfair Display', serif;
    box-shadow: 0 4px 16px rgba(197, 160, 89, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .brand-info {
    display: flex;
    flex-direction: column;
  }

  .brand-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.22rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.4px;
    line-height: 1.2;
  }

  .brand-tag {
    font-size: 0.65rem;
    color: #E5CCA0;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    margin-top: 2px;
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
  padding: 0.9rem 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1.5px solid rgba(197, 160, 89, 0.35);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  .avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(197, 160, 89, 0.3) 0%, rgba(59, 21, 78, 0.4) 100%);
    border: 1.5px solid #C5A059;
    box-shadow: 0 2px 10px rgba(197, 160, 89, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E5CCA0;
    font-size: 0.95rem;
    font-weight: 700;
  }

  .details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .name {
    font-size: 0.86rem;
    font-weight: 600;
    color: #FFFFFF;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .role-badge {
    font-size: 0.65rem;
    color: #E5CCA0;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-top: 1px;
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
    color: rgba(229, 204, 160, 0.65);
    letter-spacing: 1.6px;
    font-weight: 700;
    padding: 0.75rem 0.75rem 0.25rem 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
      margin-left: 0.25rem;
    }
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
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  svg {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.6);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #FFFFFF;
    transform: translateX(3px);

    svg {
      color: #DFBA73;
      transform: translateX(1px);
    }
  }

  &.active {
    background: linear-gradient(90deg, rgba(197, 160, 89, 0.22) 0%, rgba(197, 160, 89, 0.05) 100%);
    border-left: 3.5px solid #C5A059;
    color: #FFFFFF;
    font-weight: 600;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);

    svg {
      color: #E5CCA0;
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
  background: rgba(225, 29, 72, 0.12);
  border: 1px solid rgba(225, 29, 72, 0.25);
  border-radius: 12px;
  color: #FDA4AF;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: #E11D48;
    color: #FFFFFF;
    border-color: #E11D48;
    box-shadow: 0 6px 18px rgba(225, 29, 72, 0.35);
    transform: translateY(-1px);
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
