import React from "react";
import styled from "styled-components";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";

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

const TopBar = ({ onToggleSidebar, title = "Admin Portal" }) => {
  const userName = localStorage.getItem("name") || "Admin";

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
        <div className="user-badge">
          <FaUserCircle size={18} color="#4A1E5D" />
          <span>{userName}</span>
        </div>
      </RightSection>
    </TopBarContainer>
  );
};

export default TopBar;
