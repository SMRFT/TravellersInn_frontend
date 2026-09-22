import React, { useState, useEffect, useMemo } from "react";
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
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaTable,
  FaCreditCard,
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
    max-width: 650px;
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
`;

const StatCard = styled(motion.div)`
  background: #FFFFFF;
  padding: 1.35rem 1.5rem;
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
    font-size: 0.78rem;
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.25rem;
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--primary-dark);
    font-family: 'Outfit', sans-serif;
  }

  .stat-subtext {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .stat-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    background: ${(props) => props.$bg || "rgba(74, 30, 93, 0.08)"};
    color: ${(props) => props.$color || "#4A1E5D"};
  }
`;

const AnalyticsCard = styled.div`
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  .title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon-badge {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(74, 30, 93, 0.08);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-dark);
      margin: 0;
    }

    p {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin: 2px 0 0 0;
    }
  }

  .controls-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
`;

const FilterPillGroup = styled.div`
  display: flex;
  background: var(--bg-subtle);
  border-radius: 10px;
  padding: 3px;
  gap: 3px;
  border: 1px solid var(--border-light);
`;

const FilterPill = styled.button`
  background: ${(props) => (props.$active ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.$active ? "#FFFFFF" : "var(--text-secondary)")};
  border: none;
  border-radius: 7px;
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.$active ? "#FFFFFF" : "var(--primary-color)")};
  }
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #FFFFFF;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 0.35rem 0.75rem;
  font-size: 0.82rem;

  input {
    border: none;
    outline: none;
    font-size: 0.82rem;
    font-family: inherit;
    color: var(--text-primary);
    cursor: pointer;
    background: transparent;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  padding: 1.5rem 0 0.5rem 0;
`;

const ViewToggleGroup = styled.div`
  display: flex;
  background: var(--bg-subtle);
  padding: 3px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  gap: 2px;

  button {
    border: none;
    background: transparent;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    transition: all 0.2s ease;

    &.active {
      background: #FFFFFF;
      color: var(--primary-color);
      box-shadow: var(--shadow-sm);
      font-weight: 700;
    }

    &:hover:not(.active) {
      color: var(--primary-dark);
      background: rgba(74, 30, 93, 0.05);
    }
  }
`;

function getDonutSlicePath(startPercent, endPercent, outerRadius = 80, innerRadius = 50, cx = 100, cy = 100) {
  if (endPercent - startPercent >= 0.9999) {
    return `
      M ${cx} ${cy - outerRadius}
      A ${outerRadius} ${outerRadius} 0 1 0 ${cx} ${cy + outerRadius}
      A ${outerRadius} ${outerRadius} 0 1 0 ${cx} ${cy - outerRadius}
      M ${cx} ${cy - innerRadius}
      A ${innerRadius} ${innerRadius} 0 1 1 ${cx} ${cy + innerRadius}
      A ${innerRadius} ${innerRadius} 0 1 1 ${cx} ${cy - innerRadius}
      Z
    `;
  }

  const startAngle = (startPercent * 360 - 90) * (Math.PI / 180);
  const endAngle = (endPercent * 360 - 90) * (Math.PI / 180);

  const x1 = cx + outerRadius * Math.cos(startAngle);
  const y1 = cy + outerRadius * Math.sin(startAngle);
  const x2 = cx + outerRadius * Math.cos(endAngle);
  const y2 = cy + outerRadius * Math.sin(endAngle);

  const x3 = cx + innerRadius * Math.cos(endAngle);
  const y3 = cy + innerRadius * Math.sin(endAngle);
  const x4 = cx + innerRadius * Math.cos(startAngle);
  const y4 = cy + innerRadius * Math.sin(startAngle);

  const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;

  return `
    M ${x1} ${y1}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
    Z
  `;
}

const PALETTE = [
  "#4A1E5D",
  "#D97706",
  "#2563EB",
  "#10B981",
  "#EC4899",
  "#8B5CF6",
  "#06B6D4",
  "#F59E0B",
  "#6366F1",
  "#14B8A6",
  "#E11D48",
  "#84CC16",
];

const CollectionsPieChart = ({ dailyAnalytics }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const activeDays = (dailyAnalytics.daysList || []).filter((d) => d.paid > 0 || d.bookingsCount > 0);
  const totalIncome = dailyAnalytics.totalIncome || 0;
  const totalCash = dailyAnalytics.totalCash || 0;
  const totalOnline = dailyAnalytics.totalOnline || 0;

  // Payment Mode slices
  const paymentSlices = [];
  if (totalIncome > 0) {
    let acc = 0;
    if (totalCash > 0) {
      const p = totalCash / totalIncome;
      paymentSlices.push({
        id: "cash",
        label: "Cash Collection",
        amount: totalCash,
        percent: p,
        startPercent: acc,
        endPercent: acc + p,
        color: "#10B981",
      });
      acc += p;
    }
    if (totalOnline > 0) {
      const p = totalOnline / totalIncome;
      paymentSlices.push({
        id: "online",
        label: "Online / Card",
        amount: totalOnline,
        percent: p,
        startPercent: acc,
        endPercent: acc + p,
        color: "#7C3AED",
      });
      acc += p;
    }
  }

  // Active Days slices
  const daySlices = [];
  if (totalIncome > 0 && activeDays.length > 0) {
    let acc = 0;
    activeDays.forEach((d, idx) => {
      const p = d.paid / totalIncome;
      daySlices.push({
        id: d.dateStr,
        label: d.label,
        dateStr: d.dateStr,
        amount: d.paid,
        bookingsCount: d.bookingsCount,
        percent: p,
        startPercent: acc,
        endPercent: acc + p,
        color: PALETTE[idx % PALETTE.length],
      });
      acc += p;
    });
  }

  if (totalIncome === 0 || activeDays.length === 0) {
    return (
      <div
        style={{
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          background: "var(--bg-subtle)",
          borderRadius: "12px",
          border: "1px dashed var(--border-light)",
          color: "var(--text-muted)",
          marginBottom: "1rem",
        }}
      >
        <FaChartPie size={36} style={{ marginBottom: "0.5rem", opacity: 0.4 }} />
        <div style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          No collection records available for the selected period.
        </div>
        <div style={{ fontSize: "0.78rem", marginTop: "4px" }}>
          Pie charts will display dynamically as bookings and transactions are recorded.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.25rem",
        marginBottom: "1.25rem",
      }}
    >
      {/* Chart 1: Mode of Collection */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid var(--border-light)",
          borderRadius: "12px",
          padding: "1.25rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            fontSize: "0.86rem",
            fontWeight: "700",
            color: "var(--primary-dark)",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FaMoneyBillWave color="#059669" /> Mode of Collection Distribution
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ position: "relative", width: "175px", height: "175px" }}>
            <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }}>
              {paymentSlices.map((s) => {
                const isHovered = hoveredSlice?.id === s.id;
                const path = getDonutSlicePath(s.startPercent, s.endPercent, isHovered ? 85 : 80, 50);
                return (
                  <path
                    key={s.id}
                    d={path}
                    fill={s.color}
                    opacity={hoveredSlice && !isHovered ? 0.4 : 1}
                    style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                    onMouseEnter={() => setHoveredSlice(s)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                );
              })}
            </svg>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Total Paid
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--primary-dark)", marginTop: "2px" }}>
                ₹{totalIncome.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {paymentSlices.map((s) => (
              <div
                key={s.id}
                onMouseEnter={() => setHoveredSlice(s)}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "7px 10px",
                  borderRadius: "8px",
                  background: hoveredSlice?.id === s.id ? "rgba(74, 30, 93, 0.06)" : "var(--bg-subtle)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  border: hoveredSlice?.id === s.id ? `1px solid ${s.color}` : "1px solid transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: s.color }} />
                  <span style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-primary)" }}>{s.label}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.84rem", fontWeight: "700", color: s.color }}>₹{s.amount.toLocaleString("en-IN")}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "6px" }}>({Math.round(s.percent * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 2: Daily Revenue Share */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid var(--border-light)",
          borderRadius: "12px",
          padding: "1.25rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            fontSize: "0.86rem",
            fontWeight: "700",
            color: "var(--primary-dark)",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FaChartPie color="var(--primary-color)" /> Daily Income Share by Date
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ position: "relative", width: "175px", height: "175px" }}>
            <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }}>
              {daySlices.map((s) => {
                const isHovered = hoveredSlice?.id === s.id;
                const path = getDonutSlicePath(s.startPercent, s.endPercent, isHovered ? 85 : 80, 50);
                return (
                  <path
                    key={s.id}
                    d={path}
                    fill={s.color}
                    opacity={hoveredSlice && !isHovered ? 0.4 : 1}
                    style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                    onMouseEnter={() => setHoveredSlice(s)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                );
              })}
            </svg>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Active Days
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--primary-dark)", marginTop: "2px" }}>
                {activeDays.length}
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              maxHeight: "155px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              paddingRight: "4px",
            }}
          >
            {daySlices.map((s) => (
              <div
                key={s.id}
                onMouseEnter={() => setHoveredSlice(s)}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  background: hoveredSlice?.id === s.id ? "rgba(74, 30, 93, 0.06)" : "var(--bg-subtle)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  border: hoveredSlice?.id === s.id ? `1px solid ${s.color}` : "1px solid transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.78rem", fontWeight: "600", color: "var(--text-primary)", whiteSpace: "nowrap" }}>
                    {s.label}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    ({s.bookingsCount} bk)
                  </span>
                </div>
                <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--primary-dark)" }}>₹{s.amount.toLocaleString("en-IN")}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginLeft: "4px" }}>({Math.round(s.percent * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
`;

const ActionCard = styled(Link)`
  background: #FFFFFF;
  padding: 1.35rem 1.5rem;
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
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.15rem;
    }

    p {
      font-size: 0.76rem;
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

const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid var(--border-light);
  border-radius: 10px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.84rem;
    text-align: left;

    th {
      background: var(--bg-subtle);
      padding: 0.75rem 1rem;
      font-weight: 700;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-light);
    }

    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border-light);
      color: var(--text-primary);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: rgba(74, 30, 93, 0.02);
    }
  }
`;

const Overview = ({ onNavigate }) => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  const userName = localStorage.getItem("name") || "Executive";

  const [stats, setStats] = useState({
    total_bookings: 0,
    live_rooms: 0,
    pending_queries: 0,
    active_events: 0,
  });
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter mode: 'month' or 'range'
  const [filterMode, setFilterMode] = useState("month");

  const today = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const currentMonthStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}`;
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 6 * 86400000).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(todayStr);
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [collectionsLogView, setCollectionsLogView] = useState("both");

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [dashRes, bookRes] = await Promise.all([
        apiRequest(`${TravellersBaseUrl}admin/dashboard/?_t=${Date.now()}`),
        apiRequest(`${TravellersBaseUrl}bookings/?_t=${Date.now()}`),
      ]);

      if (dashRes.success && dashRes.data) {
        setStats({
          total_bookings: dashRes.data.total_bookings || 0,
          live_rooms: dashRes.data.live_rooms || 0,
          pending_queries: dashRes.data.pending_queries || 0,
          active_events: dashRes.data.active_events || 0,
        });
      }

      if (bookRes.success && Array.isArray(bookRes.data)) {
        setBookingsList(bookRes.data);
      }
    } catch (e) {
      console.error("Dashboard fetch error:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Helper to calculate financials for any booking
  const getBookingRevenue = (b) => {
    if (!b) return { netPayable: 0, paid: 0, date: "" };
    
    // Determine effective date (created date or check_in date)
    let rawDate = b.created_date || b.created_at || b.check_in;
    let dateStr = "";
    if (rawDate) {
      try {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        }
      } catch (e) {}
    }

    let paid = 0;
    if (b.amount_paid !== undefined && b.amount_paid !== null) {
      paid = parseFloat(b.amount_paid) || 0;
    } else if (Array.isArray(b.bills) && b.bills.length > 0) {
      paid = b.bills.reduce((acc, curr) => acc + (parseFloat(curr.amount_paid) || 0), 0);
    } else if (b.payment_details && typeof b.payment_details === "object") {
      paid = parseFloat(b.payment_details.paid || b.payment_details.amount_paid || 0);
    }

    let netPayable = 0;
    if (b.amount !== undefined && b.amount !== null && !isNaN(parseFloat(b.amount)) && parseFloat(b.amount) > 0) {
      netPayable = parseFloat(b.amount);
    } else if (b.tax_details && b.tax_details.gross_total) {
      netPayable = parseFloat(b.tax_details.gross_total);
    } else {
      netPayable = paid || 1600;
    }

    // Method categorization
    let method = "cash";
    if (b.payment_type) {
      method = b.payment_type.toLowerCase();
    } else if (b.payment_details && typeof b.payment_details === "object" && b.payment_details.method) {
      method = b.payment_details.method.toLowerCase();
    }

    return {
      netPayable,
      paid: paid > 0 ? paid : netPayable,
      dateStr,
      method,
    };
  };

  // Filter bookings based on selected period
  const filteredBookings = useMemo(() => {
    if (!bookingsList || bookingsList.length === 0) return [];

    return bookingsList.filter((b) => {
      const bStatus = (b.booking_status || b.status || "").toLowerCase();
      if (bStatus === "cancelled" || bStatus === "canceled") return false;

      const { dateStr } = getBookingRevenue(b);
      if (!dateStr) return false;

      if (filterMode === "month") {
        return dateStr.startsWith(selectedMonth);
      } else {
        return dateStr >= startDate && dateStr <= endDate;
      }
    });
  }, [bookingsList, filterMode, selectedMonth, startDate, endDate]);

  // Aggregate daily statistics for charts & diagrams
  const dailyAnalytics = useMemo(() => {
    const daysMap = {};

    // If month mode: initialize all days in that month
    if (filterMode === "month" && selectedMonth) {
      const [yr, mo] = selectedMonth.split("-").map((x) => parseInt(x, 10));
      const totalDays = new Date(yr, mo, 0).getDate();
      for (let day = 1; day <= totalDays; day++) {
        const dStr = `${yr}-${pad(mo)}-${pad(day)}`;
        daysMap[dStr] = {
          dateStr: dStr,
          dayNum: day,
          label: `${pad(day)} ${new Date(yr, mo - 1, day).toLocaleString("en-US", { month: "short" })}`,
          revenue: 0,
          paid: 0,
          bookingsCount: 0,
          cash: 0,
          online: 0,
        };
      }
    } else if (filterMode === "range" && startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      for (let dt = new Date(s); dt <= e; dt.setDate(dt.getDate() + 1)) {
        const dStr = `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
        daysMap[dStr] = {
          dateStr: dStr,
          dayNum: dt.getDate(),
          label: `${pad(dt.getDate())} ${dt.toLocaleString("en-US", { month: "short" })}`,
          revenue: 0,
          paid: 0,
          bookingsCount: 0,
          cash: 0,
          online: 0,
        };
      }
    }

    // Populate data
    filteredBookings.forEach((b) => {
      const { netPayable, paid, dateStr, method } = getBookingRevenue(b);
      if (daysMap[dateStr]) {
        daysMap[dateStr].revenue += netPayable;
        daysMap[dateStr].paid += paid;
        daysMap[dateStr].bookingsCount += 1;
        if (method === "cash") {
          daysMap[dateStr].cash += paid;
        } else {
          daysMap[dateStr].online += paid;
        }
      }
    });

    const daysList = Object.values(daysMap).sort((a, b) => a.dateStr.localeCompare(b.dateStr));
    const totalIncome = daysList.reduce((acc, curr) => acc + curr.paid, 0);
    const totalBookings = daysList.reduce((acc, curr) => acc + curr.bookingsCount, 0);
    const totalCash = daysList.reduce((acc, curr) => acc + curr.cash, 0);
    const totalOnline = daysList.reduce((acc, curr) => acc + curr.online, 0);
    const maxDayRevenue = Math.max(...daysList.map((d) => d.paid), 1000);
    const maxDayBookings = Math.max(...daysList.map((d) => d.bookingsCount), 1);

    return {
      daysList,
      totalIncome,
      totalBookings,
      totalCash,
      totalOnline,
      maxDayRevenue,
      maxDayBookings,
      avgDailyIncome: daysList.length > 0 ? Math.round(totalIncome / daysList.length) : 0,
    };
  }, [filteredBookings, filterMode, selectedMonth, startDate, endDate]);

  return (
    <OverviewContainer className="animate-fade-in">
      <WelcomeHero>
        <div className="hero-content">
          <h1>Welcome, {userName}</h1>
          <p>
            Monitor live hospitality operations, daily income breakdowns, reservations analytics, room inventory, and financial summaries for TravellersInn.
          </p>
        </div>
        <div className="accent-circle"></div>
      </WelcomeHero>

      {/* KPI Global Status Cards */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", fontWeight: 700, margin: 0 }}>
            Hospitality Overview
          </h2>
          <button
            onClick={fetchDashboardData}
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
            <FaSyncAlt className={loading ? "spin" : ""} /> Refresh Data
          </button>
        </div>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            $bg="rgba(74, 30, 93, 0.1)"
            $color="#4A1E5D"
          >
            <div className="stat-info">
              <span className="stat-label">Total Reservations</span>
              <span className="stat-value">{stats.total_bookings}</span>
              <span className="stat-subtext">Lifetime Registered</span>
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
              <span className="stat-subtext">Ready for Occupancy</span>
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
              <span className="stat-subtext">Customer Inquiries</span>
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
              <span className="stat-subtext">Conference & Hall Bookings</span>
            </div>
            <div className="stat-icon-wrapper">
              <FaCalendarAlt />
            </div>
          </StatCard>
        </StatsGrid>
      </div>

      {/* DAILY INCOME & BOOKINGS ANALYTICS WITH DATE & MONTH PICKERS */}
      <AnalyticsCard>
        <SectionHeader>
          <div className="title-group">
            <div className="icon-badge">
              <FaChartLine />
            </div>
            <div>
              <h2>Daily Income & Bookings Analytics</h2>
              <p>Visual daily transaction trend, revenue chart, and collection diagrams</p>
            </div>
          </div>

          <div className="controls-group">
            {/* Mode Switcher */}
            <FilterPillGroup>
              <FilterPill
                $active={filterMode === "month"}
                onClick={() => setFilterMode("month")}
              >
                Month View
              </FilterPill>
              <FilterPill
                $active={filterMode === "range"}
                onClick={() => setFilterMode("range")}
              >
                Date Range
              </FilterPill>
            </FilterPillGroup>

            {/* Month Picker */}
            {filterMode === "month" && (
              <DatePickerWrapper>
                <FaCalendarAlt color="var(--primary-color)" />
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </DatePickerWrapper>
            )}

            {/* Date Range Pickers */}
            {filterMode === "range" && (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <DatePickerWrapper>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>From:</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </DatePickerWrapper>
                <DatePickerWrapper>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>To:</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </DatePickerWrapper>
              </div>
            )}
          </div>
        </SectionHeader>

        {/* Selected Period Metrics Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", background: "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)", padding: "1.25rem", borderRadius: "14px", border: "1px solid #E9D5FF" }}>
          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-secondary)", fontWeight: "700", textTransform: "uppercase" }}>
              Total Income in Period
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--primary-dark)", marginTop: "2px" }}>
              ₹{dailyAnalytics.totalIncome.toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Avg ₹{dailyAnalytics.avgDailyIncome.toLocaleString("en-IN")} / day
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-secondary)", fontWeight: "700", textTransform: "uppercase" }}>
              Total Bookings
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#2563EB", marginTop: "2px" }}>
              {dailyAnalytics.totalBookings}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Confirmed guest check-ins
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-secondary)", fontWeight: "700", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
              <FaMoneyBillWave color="#059669" /> Cash Collection
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#059669", marginTop: "2px" }}>
              ₹{dailyAnalytics.totalCash.toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {dailyAnalytics.totalIncome > 0 ? `${Math.round((dailyAnalytics.totalCash / dailyAnalytics.totalIncome) * 100)}% of total` : "0%"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-secondary)", fontWeight: "700", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
              <FaCreditCard color="#7C3AED" /> Online / Card Collection
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#7C3AED", marginTop: "2px" }}>
              ₹{dailyAnalytics.totalOnline.toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {dailyAnalytics.totalIncome > 0 ? `${Math.round((dailyAnalytics.totalOnline / dailyAnalytics.totalIncome) * 100)}% of total` : "0%"}
            </div>
          </div>
        </div>

        {/* Interactive SVG Daily Income Diagram / Chart */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--primary-dark)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              <FaChartBar color="var(--primary-color)" /> Daily Income & Bookings Distribution Chart
            </h3>
            {hoveredDataPoint && (
              <div style={{ fontSize: "0.82rem", background: "var(--primary-dark)", color: "#FFFFFF", padding: "4px 10px", borderRadius: "6px", fontWeight: "600" }}>
                {hoveredDataPoint.label}: <strong>₹{hoveredDataPoint.paid.toLocaleString("en-IN")}</strong> ({hoveredDataPoint.bookingsCount} booking{hoveredDataPoint.bookingsCount !== 1 ? "s" : ""})
              </div>
            )}
          </div>

          <ChartContainer>
            <div style={{ minWidth: "650px", height: "260px", display: "flex", alignItems: "flex-end", gap: "6px", padding: "45px 10px 30px 10px", position: "relative", borderBottom: "2px solid var(--border-light)" }}>
              {dailyAnalytics.daysList.map((d, index) => {
                const heightPercent = dailyAnalytics.maxDayRevenue > 0
                  ? Math.max(5, Math.min(60, (d.paid / dailyAnalytics.maxDayRevenue) * 60))
                  : 5;

                const isHovered = hoveredDataPoint?.dateStr === d.dateStr;

                return (
                  <div
                    key={d.dateStr}
                    onMouseEnter={() => setHoveredDataPoint(d)}
                    onMouseLeave={() => setHoveredDataPoint(null)}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: `calc(${heightPercent}% + 10px)`,
                          background: "#1F2937",
                          color: "#FFFFFF",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          fontSize: "0.74rem",
                          whiteSpace: "nowrap",
                          zIndex: 20,
                          boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                          textAlign: "center",
                          pointerEvents: "none",
                        }}
                      >
                        <div style={{ fontWeight: "700" }}>₹{d.paid.toLocaleString("en-IN")}</div>
                        <div style={{ fontSize: "0.68rem", opacity: 0.85 }}>{d.bookingsCount} bookings</div>
                      </div>
                    )}

                    {/* Bar graphic */}
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "28px",
                        height: `${heightPercent}%`,
                        background: isHovered
                          ? "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)"
                          : d.paid > 0
                          ? "linear-gradient(180deg, #682B83 0%, #4A1E5D 100%)"
                          : "#E5E7EB",
                        borderRadius: "5px 5px 0 0",
                        transition: "all 0.2s ease",
                        boxShadow: isHovered ? "0 4px 12px rgba(245, 158, 11, 0.4)" : "none",
                      }}
                    />

                    {/* X-axis date label */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-22px",
                        fontSize: "0.68rem",
                        color: isHovered ? "var(--primary-color)" : "var(--text-muted)",
                        fontWeight: isHovered ? "700" : "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.dayNum}
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartContainer>
        </div>

        {/* Daily Breakdown / Collections Log (Pie Diagram & Table Views) */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--primary-dark)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              <FaChartPie color="var(--primary-color)" /> Daily Income & Collections Log
            </h3>

            <ViewToggleGroup>
              <button
                type="button"
                className={collectionsLogView === "pie" ? "active" : ""}
                onClick={() => setCollectionsLogView("pie")}
              >
                <FaChartPie /> Pie Diagram
              </button>
              <button
                type="button"
                className={collectionsLogView === "table" ? "active" : ""}
                onClick={() => setCollectionsLogView("table")}
              >
                <FaTable /> Table Log
              </button>
              <button
                type="button"
                className={collectionsLogView === "both" ? "active" : ""}
                onClick={() => setCollectionsLogView("both")}
              >
                Dual View
              </button>
            </ViewToggleGroup>
          </div>

          {/* Render Pie Diagram View */}
          {(collectionsLogView === "pie" || collectionsLogView === "both") && (
            <CollectionsPieChart dailyAnalytics={dailyAnalytics} />
          )}

          {/* Render Table Log View */}
          {(collectionsLogView === "table" || collectionsLogView === "both") && (
            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Bookings Count</th>
                    <th>Cash Collection</th>
                    <th>Online / Card</th>
                    <th>Total Daily Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyAnalytics.daysList.filter((d) => d.bookingsCount > 0 || d.paid > 0).length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)" }}>
                        No income records found for the selected {filterMode === "month" ? "month" : "date range"}.
                      </td>
                    </tr>
                  ) : (
                    dailyAnalytics.daysList
                      .filter((d) => d.bookingsCount > 0 || d.paid > 0)
                      .map((d) => (
                        <tr key={d.dateStr}>
                          <td>
                            <strong>{d.label}</strong>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "6px" }}>({d.dateStr})</span>
                          </td>
                          <td>
                            <span style={{ background: "rgba(37, 99, 235, 0.1)", color: "#2563EB", padding: "2px 8px", borderRadius: "12px", fontWeight: "700", fontSize: "0.75rem" }}>
                              {d.bookingsCount} booking{d.bookingsCount !== 1 ? "s" : ""}
                            </span>
                          </td>
                          <td style={{ color: "#059669", fontWeight: "600" }}>
                            ₹{d.cash.toLocaleString("en-IN")}
                          </td>
                          <td style={{ color: "#7C3AED", fontWeight: "600" }}>
                            ₹{d.online.toLocaleString("en-IN")}
                          </td>
                          <td style={{ fontWeight: "800", color: "var(--primary-dark)", fontSize: "0.92rem" }}>
                            ₹{d.paid.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </TableWrapper>
          )}
        </div>
      </AnalyticsCard>

      {/* Quick Actions */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", fontWeight: 700, margin: 0 }}>
            Quick Actions & Operations
          </h2>
        </div>

        <QuickActionGrid>
          <ActionCard to="/bookings">
            <div className="action-content">
              <div className="icon-box">
                <FaCalendarCheck />
              </div>
              <div>
                <h3>Manage Bookings</h3>
                <p>Walk-in reservations, invoices, 24-hr check-ins</p>
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
                <p>Manage room pricing, categories & media</p>
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
                <p>Interactive calendar grid & live vacancy matrix</p>
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
                <p>Review revenue, tally export, payments</p>
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
