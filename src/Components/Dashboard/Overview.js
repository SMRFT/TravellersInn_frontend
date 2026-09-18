import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaHotel,
  FaQuestionCircle,
  FaCalendarAlt,
  FaArrowRight,
  FaBed,
  FaMoneyBillWave,
  FaSyncAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import apiRequest from "../apiRequest";

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WelcomeHero = styled.div`
  background: linear-gradient(135deg, #2D1137 0%, #4A1E5D 50%, #682B83 100%);
  border-radius: var(--radius-xl);
  padding: 2.25rem 2.5rem;
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-luxury);

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 600px;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .accent-circle {
    position: absolute;
    right: -40px;
    bottom: -60px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(197, 160, 89, 0.25) 0%, rgba(74, 30, 93, 0) 70%);
    pointer-events: none;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled(motion.div)`
  background: #FFFFFF;
  padding: 1.5rem 1.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: rgba(197, 160, 89, 0.4);
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  .stat-label {
    font-size: 0.82rem;
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.25rem;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--primary-dark);
    font-family: 'Outfit', sans-serif;
  }

  .stat-icon-wrapper {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    background: ${(props) => props.$bg || "rgba(74, 30, 93, 0.08)"};
    color: ${(props) => props.$color || "#4A1E5D"};
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.25rem;
    color: var(--primary-dark);
    font-weight: 700;
  }
`;

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
`;

const ActionCard = styled(Link)`
  background: #FFFFFF;
  padding: 1.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  .action-content {
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon-box {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(74, 30, 93, 0.08);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    h3 {
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.15rem;
    }

    p {
      font-size: 0.78rem;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  .arrow-icon {
    color: var(--text-muted);
    font-size: 0.9rem;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover {
    border-color: var(--accent-gold);
    transform: translateX(4px);
    .arrow-icon {
      color: var(--primary-color);
      transform: translateX(3px);
    }
  }
`;

const Overview = ({ onNavigate }) => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  const [stats, setStats] = useState({
    total_bookings: 0,
    live_rooms: 0,
    pending_queries: 0,
    active_events: 0,
  });
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem("name") || "Executive";

  const fetchDashboardStats = async () => {
    setLoading(true);
    const res = await apiRequest(`${TravellersBaseUrl}admin/dashboard/`);
    if (res.success && res.data) {
      setStats({
        total_bookings: res.data.total_bookings || 0,
        live_rooms: res.data.live_rooms || 0,
        pending_queries: res.data.pending_queries || 0,
        active_events: res.data.active_events || 0,
      });
    } else {
      console.warn("Using default or cached dashboard data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <OverviewContainer className="animate-fade-in">
      <WelcomeHero>
        <div className="hero-content">
          <h1>Welcome, {userName}</h1>
          <p>
            Monitor real-time hospitality operations, room inventory, customer reservations, and event coordination across TravellersInn.
          </p>
        </div>
        <div className="accent-circle"></div>
      </WelcomeHero>

      <div>
        <SectionTitle>
          <h2>Key Performance Indicators</h2>
          <button
            onClick={fetchDashboardStats}
            style={{
              background: "none",
              border: "none",
              color: "var(--primary-color)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem",
              fontWeight: "600",
            }}
          >
            <FaSyncAlt className={loading ? "spin" : ""} /> Refresh
          </button>
        </SectionTitle>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            $bg="rgba(74, 30, 93, 0.1)"
            $color="#4A1E5D"
          >
            <div className="stat-info">
              <span className="stat-label">Total Bookings</span>
              <span className="stat-value">{stats.total_bookings}</span>
            </div>
            <div className="stat-icon-wrapper">
              <FaCalendarCheck />
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            $bg="rgba(16, 185, 129, 0.12)"
            $color="#10B981"
          >
            <div className="stat-info">
              <span className="stat-label">Active Live Rooms</span>
              <span className="stat-value">{stats.live_rooms}</span>
            </div>
            <div className="stat-icon-wrapper">
              <FaHotel />
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            $bg="rgba(245, 158, 11, 0.12)"
            $color="#F59E0B"
          >
            <div className="stat-info">
              <span className="stat-label">Pending Queries</span>
              <span className="stat-value">{stats.pending_queries}</span>
            </div>
            <div className="stat-icon-wrapper">
              <FaQuestionCircle />
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            $bg="rgba(59, 130, 246, 0.12)"
            $color="#3B82F6"
          >
            <div className="stat-info">
              <span className="stat-label">Active Events</span>
              <span className="stat-value">{stats.active_events}</span>
            </div>
            <div className="stat-icon-wrapper">
              <FaCalendarAlt />
            </div>
          </StatCard>
        </StatsGrid>
      </div>

      <div>
        <SectionTitle>
          <h2>Quick Actions & Operations</h2>
        </SectionTitle>

        <QuickActionGrid>
          <ActionCard to="/bookings">
            <div className="action-content">
              <div className="icon-box">
                <FaCalendarCheck />
              </div>
              <div>
                <h3>Manage Bookings</h3>
                <p>View check-ins, approve cancellations, invoices</p>
              </div>
            </div>
            <FaArrowRight className="arrow-icon" />
          </ActionCard>

          <ActionCard to="/rooms">
            <div className="action-content">
              <div className="icon-box">
                <FaBed />
              </div>
              <div>
                <h3>Room Catalog</h3>
                <p>Add new room types, edit pricing & amenities</p>
              </div>
            </div>
            <FaArrowRight className="arrow-icon" />
          </ActionCard>

          <ActionCard to="/availability">
            <div className="action-content">
              <div className="icon-box">
                <FaCalendarAlt />
              </div>
              <div>
                <h3>Room Availability</h3>
                <p>Interactive calendar grid & occupancy status</p>
              </div>
            </div>
            <FaArrowRight className="arrow-icon" />
          </ActionCard>

          <ActionCard to="/accounts">
            <div className="action-content">
              <div className="icon-box">
                <FaMoneyBillWave />
              </div>
              <div>
                <h3>Accounts & Billing</h3>
                <p>Review transactions, cash vs online revenue</p>
              </div>
            </div>
            <FaArrowRight className="arrow-icon" />
          </ActionCard>
        </QuickActionGrid>
      </div>
    </OverviewContainer>
  );
};

export default Overview;
