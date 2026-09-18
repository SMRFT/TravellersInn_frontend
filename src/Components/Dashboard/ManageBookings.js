import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPhone,
  FaCheck,
  FaTimes,
  FaEye,
  FaPrint,
  FaSpinner,
  FaPlus,
  FaDownload,
  FaFileInvoice,
  FaBed,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaUser,
  FaBuilding,
  FaUtensils,
  FaUpload,
  FaTrash,
  FaCheckCircle,
  FaInfoCircle,
  FaCalendarAlt,
  FaConciergeBell,
  FaPercent,
  FaReceipt,
  FaLayerGroup,
  FaEdit,
  FaWifi,
  FaTshirt,
  FaClock,
  FaBoxes,
  FaPlusSquare,
  FaFilter,
  FaHistory,
} from "react-icons/fa";
import apiRequest from "../apiRequest";
import { toast } from "react-toastify";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
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

  .actions-group {
    display: flex;
    gap: 0.75rem;
    align-items: center;
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

const SecondaryButton = styled.button`
  background: #FFFFFF;
  color: var(--primary-color);
  border: 1px solid var(--border-light);
  padding: 0.7rem 1.2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);

  &:hover {
    background: var(--bg-subtle);
    border-color: var(--primary-light);
  }
`;

const SectionCard = styled.div`
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border-light);

  .section-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon-badge {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      background: ${(props) => (props.$variant === "past" ? "rgba(107, 114, 128, 0.12)" : "rgba(74, 30, 93, 0.1)")};
      color: ${(props) => (props.$variant === "past" ? "#374151" : "var(--primary-color)")};
    }

    .title-texts {
      h3 {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--primary-dark);
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      p {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin: 2px 0 0 0;
      }
    }
  }

  .section-badge {
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    background: ${(props) => (props.$variant === "past" ? "#F3F4F6" : "rgba(74, 30, 93, 0.08)")};
    color: ${(props) => (props.$variant === "past" ? "#374151" : "var(--primary-color)")};
    border: 1px solid ${(props) => (props.$variant === "past" ? "#E5E7EB" : "rgba(74, 30, 93, 0.2)")};
  }
`;

const FilterToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  .search-input-group {
    position: relative;
    flex: 1;
    min-width: 260px;

    svg {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    input {
      width: 100%;
      padding: 0.6rem 1rem 0.6rem 2.4rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-light);
      font-size: 0.85rem;
      outline: none;
      &:focus {
        border-color: var(--accent-gold);
      }
    }
  }

  .filter-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .tabs-group {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;

    button {
      padding: 0.45rem 0.8rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-light);
      background: var(--bg-subtle);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;

      &.active {
        background: var(--primary-color);
        color: #FFFFFF;
        border-color: var(--primary-color);
      }

      &:hover:not(.active) {
        background: #FFFFFF;
        border-color: var(--primary-light);
      }
    }
  }

  .date-filter-group {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;

    .date-box {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: var(--bg-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      padding: 0.35rem 0.6rem;

      label {
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--text-secondary);
        text-transform: uppercase;
      }

      input[type="date"] {
        border: none;
        background: transparent;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-primary);
        outline: none;
        cursor: pointer;
      }
    }

    .clear-date-btn {
      padding: 0.45rem 0.75rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-light);
      background: #FFFFFF;
      color: var(--text-secondary);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #FEF2F2;
        color: #DC2626;
        border-color: #FECACA;
      }
    }
  }
`;

const FilterCard = styled(SectionCard)``;

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
    min-width: 950px;

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

const OverstayBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.22rem 0.55rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  margin-top: 4px;
  animation: overstayBlink 1.2s infinite ease-in-out;

  @keyframes overstayBlink {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.35);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.97);
      box-shadow: 0 0 6px 2px rgba(220, 38, 38, 0.2);
    }
  }
`;

const PastOverstayBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  background: #FFF1F2;
  color: #BE123C;
  border: 1px solid #FECDD3;
  margin-top: 4px;
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  width: fit-content;

  ${(props) => {
    const s = String(props.$status || "").toLowerCase().replace(/_/g, " ").trim();
    switch (s) {
      case "confirmed":
      case "booked":
        return `background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE;`;
      case "checked in":
      case "occupied":
        return `background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA;`;
      case "checked out":
      case "completed":
        return `background: #F5F3FF; color: #5B21B6; border: 1px solid #DDD6FE;`;
      case "cancellation requested":
        return `background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA; font-weight: 800;`;
      case "cancelled":
      case "canceled":
        return `background: #F3F4F6; color: #4B5563; border: 1px solid #E5E7EB;`;
      case "paid":
        return `background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;`;
      case "partial":
      case "partially paid":
        return `background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A;`;
      case "refunded":
        return `background: #F5F3FF; color: #6D28D9; border: 1px solid #DDD6FE;`;
      case "pending":
      default:
        return `background: #FFFBEB; color: #92400E; border: 1px solid #FDE68A;`;
    }
  }}
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;

  button {
    padding: 0.35rem 0.65rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid var(--border-light);
    background: var(--bg-subtle);
    color: var(--text-secondary);
    transition: all 0.2s ease;

    &:hover {
      background: var(--primary-color);
      color: #FFFFFF;
      border-color: var(--primary-color);
    }

    &.pay-btn {
      background: #ECFDF5;
      color: #065F46;
      border-color: #A7F3D0;
      &:hover { background: #10B981; color: #fff; }
    }

    &.status-btn {
      background: #F0FDF4;
      color: #15803D;
      border-color: #BBF7D0;
      &:hover { background: #15803D; color: #fff; }
    }

    &.invoice-btn {
      background: #FAF5FF;
      color: #7E22CE;
      border-color: #E9D5FF;
      &:hover { background: #7E22CE; color: #fff; }
    }

    &.approve {
      background: #ECFDF5;
      color: #065F46;
      border-color: #A7F3D0;
      &:hover { background: #10B981; color: #fff; }
    }

    &.reject {
      background: #FEF2F2;
      color: #991B1B;
      border-color: #FECACA;
      &:hover { background: #EF4444; color: #fff; }
    }
  }
`;

const ModalPortalOverlay = styled.div`
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
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ModalPortalContainer = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 20px;
  width: 100%;
  max-width: ${(props) => props.$maxWidth || "600px"};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;

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
      margin: 0;
    }

    button {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.2rem;
      cursor: pointer;
      &:hover { color: var(--text-primary); }
    }
  }

  .modal-body {
    padding: 1.5rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

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
      background: #FFFFFF;

      &:focus {
        border-color: var(--primary-color);
      }
    }
  }

  .modal-footer {
    padding: 1.25rem 1.75rem;
    border-top: 1px solid var(--border-light);
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    align-items: center;

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

const WalkinTabsContainer = styled.div`
  display: flex;
  background: var(--bg-subtle);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 1.25rem;
  border: 1px solid var(--border-light);
  overflow-x: auto;
`;

const WalkinTabBtn = styled.button`
  flex: 1;
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 0.85rem;
  border: none;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  background: ${(props) => (props.$active ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.$active ? "#FFFFFF" : "var(--text-secondary)")};
  box-shadow: ${(props) => (props.$active ? "0 2px 8px var(--primary-glow)" : "none")};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.$active ? "#FFFFFF" : "var(--primary-color)")};
    background: ${(props) => (props.$active ? "var(--primary-color)" : "rgba(74, 30, 93, 0.05)")};
  }

  .badge {
    background: ${(props) => (props.$active ? "rgba(255,255,255,0.25)" : "var(--border-light)")};
    color: ${(props) => (props.$active ? "#FFFFFF" : "var(--text-primary)")};
    padding: 2px 6px;
    border-radius: 999px;
    font-size: 0.72rem;
  }
`;

const RoomCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.85rem;
  max-height: 440px;
  overflow-y: auto;
  padding: 4px;
`;

const RoomStatusSelectCard = styled.div`
  border-radius: 12px;
  border: 2px solid ${(props) => (props.$selected ? "#4A1E5D" : props.$borderColor || "var(--border-light)")};
  background: ${(props) => (props.$selected ? "rgba(74, 30, 93, 0.08)" : props.$bgColor || "#FFFFFF")};
  padding: 0.9rem;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.65 : 1)};
  position: relative;
  transition: all 0.2s ease;
  box-shadow: ${(props) => (props.$selected ? "0 4px 12px rgba(74, 30, 93, 0.25)" : "var(--shadow-sm)")};

  &:hover {
    ${(props) => (!props.$disabled ? `transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--primary-color);` : "")}
  }

  .room-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.35rem;

    .room-num {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--primary-dark);
    }
  }

  .room-type {
    font-size: 0.78rem;
    color: var(--text-secondary);
    margin-bottom: 0.4rem;
  }

  .room-price {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .status-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.$statusColor || "#10B981"};
    background: ${(props) => props.$statusBg || "#ECFDF5"};
  }
`;

const BillingSummaryBox = styled.div`
  background: linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%);
  border: 1px solid #E9D5FF;
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const SuggestionDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border: 1px solid var(--border-light);
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(74, 30, 93, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 1050;
  max-height: 240px;
  overflow-y: auto;
  margin-top: 4px;

  .suggestion-header {
    padding: 6px 12px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    background: var(--bg-subtle);
    border-bottom: 1px solid var(--border-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .suggestion-item {
    padding: 10px 14px;
    cursor: pointer;
    border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    transition: all 0.15s ease;
    display: flex;
    flex-direction: column;
    gap: 3px;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: rgba(74, 30, 93, 0.06);
    }

    .main-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        font-weight: 700;
        font-size: 0.88rem;
        color: var(--primary-dark);
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .phone {
        font-size: 0.76rem;
        font-weight: 700;
        color: #059669;
        background: #ECFDF5;
        padding: 2px 7px;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
    }

    .sub-line {
      font-size: 0.74rem;
      color: var(--text-secondary);
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
  }
`;

const initialWalkinState = {
  // Tab 1: Individual Details
  customer_id: "",
  guest_name: "",
  guest_phone: "",
  guest_email: "",
  guest_address: "",
  number_of_guests: 1,
  check_in: new Date().toISOString().split("T")[0] + "T12:00",
  check_out: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T10:00",
  id_proof_type: "Aadhar Card",
  id_proof_number: "",
  id_proof_file: "",

  // Tab 2: Company Details
  company_id: "",
  company_name: "",
  company_person: "",
  company_address: "",
  company_city: "",
  company_state: "",
  company_pincode: "",
  company_phone: "",
  company_gst: "",

  // Tab 3: Room Selection (Array of room numbers: ["205", "302"])
  selected_rooms: [],

  // Tab 4: Extra Add-ons
  // Section 1: Food & Dining
  food_breakfast_count: 0,
  food_breakfast_rate: 120,
  food_breakfast_items: "",
  food_lunch_count: 0,
  food_lunch_rate: 250,
  food_lunch_items: "",
  food_dinner_count: 0,
  food_dinner_rate: 250,
  food_dinner_items: "",
  food_snacks_count: 0,
  food_snacks_rate: 80,
  food_snacks_items: "",
  food_tea_coffee_count: 0,
  food_tea_coffee_rate: 30,
  food_tea_coffee_items: "",
  food_service_type: "Room Service", // 'Room Service', 'Restaurant AC', 'Restaurant Non AC', 'Food Charges'
  food_custom_charge: 0,

  // Section 2: Amenities
  addon_wifi: false,
  addon_wifi_price: 200,
  addon_extrabed_count: 0,
  addon_extrabed_rate: 1000,
  addon_laundry_charge: 0,
  addon_laundry_remarks: "",
  addon_latecheckout_hours: 0,
  addon_latecheckout_rate: 250,

  // Section 3: Others with Description
  addon_other_name: "",
  addon_other_amount: 0,
  addon_other_description: "",

  // Billing, Taxes, Discount
  bill_type: "Rack", // 'Rack' (GST Exclusive) or 'Net Rate' (GST Inclusive)
  discount_amount: 0,
  discount_remarks: "",
  amount_paid: 0,
  payment_method: "cash",
};

const ManageBookings = () => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  const [activeBookingsData, setActiveBookingsData] = useState([]);
  const [activeLoading, setActiveLoading] = useState(true);

  const [pastBookingsData, setPastBookingsData] = useState([]);
  const [pastLoading, setPastLoading] = useState(true);

  const [roomsList, setRoomsList] = useState([]);

  const getTodayDateStr = () => {
    const today = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  };

  // Table 1: Active / Pending / Before Checkout Bookings filters
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");

  // Table 2: Past / Checked-out / Cancelled Bookings filters (Default to Current Date)
  const [pastSearchTerm, setPastSearchTerm] = useState("");
  const [pastStatusFilter, setPastStatusFilter] = useState("all");
  const [pastFromDate, setPastFromDate] = useState(getTodayDateStr());
  const [pastToDate, setPastToDate] = useState(getTodayDateStr());

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [invoiceBooking, setInvoiceBooking] = useState(null);
  const [statusModalBooking, setStatusModalBooking] = useState(null);
  const [newStatusVal, setNewStatusVal] = useState("confirmed");

  // Walk-in / Edit modal state
  const [isWalkinOpen, setIsWalkinOpen] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [walkinActiveTab, setWalkinActiveTab] = useState("individual"); // 'individual', 'company', 'rooms', 'addons'
  const [walkinForm, setWalkinForm] = useState(initialWalkinState);
  const [isRoomSelectModalOpen, setIsRoomSelectModalOpen] = useState(false);
  const [availabilityRooms, setAvailabilityRooms] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [uploadingIdProof, setUploadingIdProof] = useState(false);

  // Customer suggestions state
  const [customersList, setCustomersList] = useState([]);
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [showPhoneSuggestions, setShowPhoneSuggestions] = useState(false);

  // Record Payment Modal
  const [paymentModalBooking, setPaymentModalBooking] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    payment_type: "cash",
    transaction_id: "",
  });

  const [companiesList, setCompaniesList] = useState([]);

  const fetchActiveBookings = async () => {
    setActiveLoading(true);
    const res = await apiRequest(`${TravellersBaseUrl}bookings/?booking_type=active`);
    if (res.success && Array.isArray(res.data)) {
      setActiveBookingsData(res.data);
    } else {
      toast.error(res.error || "Failed to fetch active bookings");
    }
    setActiveLoading(false);
  };

  const fetchPastBookings = async (fromDate = pastFromDate, toDate = pastToDate) => {
    setPastLoading(true);
    const params = new URLSearchParams();
    params.append("booking_type", "past");
    if (fromDate) params.append("start_date", fromDate);
    if (toDate) params.append("end_date", toDate);
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await apiRequest(`${TravellersBaseUrl}bookings/${queryString}`);
    if (res.success && Array.isArray(res.data)) {
      setPastBookingsData(res.data);
    } else {
      toast.error(res.error || "Failed to fetch past bookings");
    }
    setPastLoading(false);
  };

  const fetchAllBookings = () => {
    fetchActiveBookings();
    fetchPastBookings(pastFromDate, pastToDate);
  };

  const fetchRooms = async () => {
    const res = await apiRequest(`${TravellersBaseUrl}rooms/`);
    if (res.success && Array.isArray(res.data)) {
      setRoomsList(res.data);
    }
  };

  const fetchCompanies = async () => {
    const res = await apiRequest(`${TravellersBaseUrl}companies/`);
    if (res.success && Array.isArray(res.data)) {
      setCompaniesList(res.data);
    }
  };

  const fetchCustomers = async () => {
    const res = await apiRequest(`${TravellersBaseUrl}customers/`);
    if (res.success && Array.isArray(res.data)) {
      setCustomersList(res.data);
    }
  };

  useEffect(() => {
    fetchActiveBookings();
    fetchPastBookings(pastFromDate, pastToDate);
    fetchRooms();
    fetchCompanies();
    fetchCustomers();
  }, []);

  const getAllCustomers = () => {
    const map = new Map();

    // 1. From customersList (Customer collection)
    (customersList || []).forEach((c) => {
      const phone = (c.phone || "").trim();
      const name = (c.name || "").trim();
      const key = phone ? `p_${phone}` : (name ? `n_${name.toLowerCase()}` : (c.customer_id || Math.random()));
      if (name || phone) {
        map.set(key, {
          customer_id: c.customer_id || "",
          name: name || "",
          phone: phone || "",
          email: c.email || "",
          address: c.address || "",
          id_proof_type: c.id_proof_type || "Aadhar Card",
          id_proof_number: c.id_proof_number || "",
          id_proof_file: c.id_proof_file || "",
          company: null,
        });
      }
    });

    // 2. From historical bookings (adds any walk-ins / bookings that might have extra company details or updated info)
    ([...activeBookingsData, ...pastBookingsData]).forEach((b) => {
      const phone = (b.guest_phone || "").trim();
      const name = (b.guest_name || "").trim();
      const key = phone ? `p_${phone}` : (name ? `n_${name.toLowerCase()}` : null);
      if (key) {
        const existing = map.get(key) || {};
        map.set(key, {
          customer_id: b.customer_id || existing.customer_id || "",
          name: name || existing.name || "",
          phone: phone || existing.phone || "",
          email: b.guest_email || existing.email || "",
          address: b.guest_address || existing.address || "",
          id_proof_type: b.id_proof_type || existing.id_proof_type || "Aadhar Card",
          id_proof_number: b.id_proof_number || existing.id_proof_number || "",
          id_proof_file: b.id_proof_file || existing.id_proof_file || "",
          company: b.company_details || (b.company_name ? {
            company_id: b.company_id || "",
            company_name: b.company_name || "",
            contact_person: b.contact_person || "",
            company_address: b.company_address || "",
            city: b.city || "",
            state: b.state || "",
            pincode: b.pincode || "",
            phone: b.phone || "",
            gst_no: b.gst_no || "",
          } : existing.company || null),
        });
      }
    });

    return Array.from(map.values());
  };

  const handleSelectCustomer = (cust) => {
    setWalkinForm((prev) => {
      const updated = {
        ...prev,
        customer_id: cust.customer_id || prev.customer_id,
        guest_name: cust.name || prev.guest_name,
        guest_phone: cust.phone || prev.guest_phone,
        guest_email: cust.email || prev.guest_email,
        guest_address: cust.address || prev.guest_address,
        id_proof_type: cust.id_proof_type || prev.id_proof_type || "Aadhar Card",
        id_proof_number: cust.id_proof_number || prev.id_proof_number,
        id_proof_file: cust.id_proof_file || prev.id_proof_file,
      };

      // Auto-populate company info if available
      if (cust.company) {
        updated.company_id = cust.company.company_id || cust.company.id || prev.company_id;
        updated.company_name = cust.company.company_name || cust.company.name || prev.company_name;
        updated.company_person = cust.company.contact_person || cust.company.contactPerson || prev.company_person;
        updated.company_address = cust.company.company_address || cust.company.address || prev.company_address;
        updated.company_city = cust.company.city || prev.company_city;
        updated.company_state = cust.company.state || prev.company_state;
        updated.company_pincode = cust.company.pincode || prev.company_pincode;
        updated.company_phone = cust.company.phone || prev.company_phone;
        updated.company_gst = cust.company.gst_no || cust.company.gstNo || prev.company_gst;
      }

      return updated;
    });

    setShowNameSuggestions(false);
    setShowPhoneSuggestions(false);
    toast.info(`Guest details auto-filled for ${cust.name || cust.phone}`);
  };


  const getRoomNumbersList = (bookingOrRooms) => {
    if (!bookingOrRooms) return [];
    if (Array.isArray(bookingOrRooms)) {
      return bookingOrRooms.map((r) => (typeof r === "object" && r ? r.roomNo || r.room_number : r)).filter(Boolean);
    }
    if (typeof bookingOrRooms === "object") {
      if (bookingOrRooms.room_details && Array.isArray(bookingOrRooms.room_details) && bookingOrRooms.room_details.length > 0) {
        const extracted = bookingOrRooms.room_details
          .map((r) => (typeof r === "object" && r ? r.roomNo || r.room_number : r))
          .filter(Boolean);
        if (extracted.length > 0) return extracted;
      }
      if (typeof bookingOrRooms.room_details === "string") {
        try {
          const parsed = JSON.parse(bookingOrRooms.room_details);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((r) => (typeof r === "object" && r ? r.roomNo || r.room_number : r)).filter(Boolean);
          }
        } catch (e) { }
      }
      if (bookingOrRooms.room_numbers) {
        return getRoomNumbersList(bookingOrRooms.room_numbers);
      }
    }
    if (typeof bookingOrRooms === "string") {
      try {
        const parsed = JSON.parse(bookingOrRooms);
        if (Array.isArray(parsed)) return parsed.map((r) => (typeof r === "object" && r ? r.roomNo || r.room_number : r)).filter(Boolean);
      } catch (e) { }
      return bookingOrRooms
        .replace(/^,|,$/g, "")
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    }
    return [];
  };

  const formatRoomNumbers = (bookingOrRooms) => {
    const list = getRoomNumbersList(bookingOrRooms);
    return list.length > 0 ? list.join(", ") : "—";
  };

  const formatDateDisplay = (isoStr) => {
    if (!isoStr) return "N/A";
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return isoStr;
      return d.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return isoStr;
    }
  };

  const formatDurationText = (diffMs) => {
    if (!diffMs || diffMs <= 0) return null;
    const totalMins = Math.floor(diffMs / (1000 * 60));
    if (totalMins <= 0) return null;

    const days = Math.floor(totalMins / (24 * 60));
    const remainingMins = totalMins % (24 * 60);
    const hours = Math.floor(remainingMins / 60);
    const mins = remainingMins % 60;

    let parts = [];
    if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hr`);
    if (mins > 0 || parts.length === 0) parts.push(`${mins} mnts`);

    return parts.join(" ");
  };

  const getActiveOverstayInfo = (b) => {
    if (!b || !b.check_out) return null;
    const bStatus = (b.booking_status || b.status || "").toLowerCase().replace(/_/g, " ").trim();
    if (bStatus === "checked out" || bStatus === "cancelled" || bStatus === "canceled") return null;
    if (b.guest_check_out) return null;

    try {
      const checkOutTime = new Date(b.check_out).getTime();
      const now = Date.now();
      if (isNaN(checkOutTime) || now <= checkOutTime) return null;

      const diffMs = now - checkOutTime;
      const durationStr = formatDurationText(diffMs);
      return durationStr ? `Overstay (${durationStr})` : null;
    } catch (e) {
      return null;
    }
  };

  const getPastOverstayInfo = (b) => {
    if (!b || !b.check_out) return null;
    try {
      const checkOutTime = new Date(b.check_out).getTime();
      if (isNaN(checkOutTime)) return null;

      let actualEndTime = null;
      if (b.guest_check_out) {
        actualEndTime = new Date(b.guest_check_out).getTime();
      } else if (b.lastmodified_date && (b.booking_status === "checked out" || b.status === "checked out")) {
        actualEndTime = new Date(b.lastmodified_date).getTime();
      }

      if (!actualEndTime || isNaN(actualEndTime) || actualEndTime <= checkOutTime) {
        return null;
      }

      const diffMs = actualEndTime - checkOutTime;
      // Grace period of 5 minutes before showing overstay tag
      if (diffMs < 5 * 60 * 1000) return null;

      const durationStr = formatDurationText(diffMs);
      return durationStr ? `Overstayed (${durationStr})` : null;
    } catch (e) {
      return null;
    }
  };

  const getOverstayInfo = (b) => {
    return getActiveOverstayInfo(b) || getPastOverstayInfo(b);
  };

  const isTodayDeparture = (b) => {
    if (!b || !b.check_out) return false;
    try {
      const checkOutDateStr = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(b.check_out));

      const todayStr = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());

      return checkOutDateStr === todayStr;
    } catch (e) {
      return false;
    }
  };

  const parsePaymentDetails = (b) => {
    if (!b) return {};
    let pd = b.payment_details;
    if (!pd) return {};
    if (typeof pd === "object" && pd !== null) return pd;
    if (typeof pd === "string") {
      let s = pd.trim();
      if (s.startsWith("OrderedDict(") && s.endsWith(")")) {
        s = s.slice(12, -1);
      }
      try {
        return JSON.parse(s);
      } catch (e) {
        try {
          const jsonValid = s
            .replace(/'/g, '"')
            .replace(/True/g, 'true')
            .replace(/False/g, 'false')
            .replace(/None/g, 'null');
          return JSON.parse(jsonValid);
        } catch (e2) {
          return {};
        }
      }
    }
    return {};
  };

  const calculateBookingFinancials = (b) => {
    if (!b) {
      return {
        subtotal: 0,
        taxableAmount: 0,
        cgst: 0,
        sgst: 0,
        totalTax: 0,
        grossTotal: 0,
        totalPayable: 0,
        discount: 0,
        roundOff: 0,
        netPayable: 0,
        paid: 0,
        balanceDue: 0,
        billType: "Rack",
      };
    }

    const pd = parsePaymentDetails(b);
    const discount = parseFloat(b.discount_amount || 0);
    const paid = getAmountPaid(b);

    const td = b.tax_details && typeof b.tax_details === "object" ? b.tax_details : {};
    const rd = b.rent_details && typeof b.rent_details === "object" ? b.rent_details : {};
    const billType = b.bill_type || td.bill_type || "Rack";

    let subtotal = 0;
    let taxableAmount = 0;
    let cgst = 0;
    let sgst = 0;
    let totalTax = 0;
    let grossTotal = 0;

    if (td.subtotal && parseFloat(td.subtotal) > 0) {
      subtotal = parseFloat(td.subtotal);
      if (billType === "Net Rate") {
        taxableAmount = td.taxable_amount !== undefined ? parseFloat(td.taxable_amount) : (subtotal / 1.05);
        totalTax = td.total_tax !== undefined ? parseFloat(td.total_tax) : (subtotal - taxableAmount);
        cgst = td.cgst_amount !== undefined ? parseFloat(td.cgst_amount) : (totalTax / 2);
        sgst = td.sgst_amount !== undefined ? parseFloat(td.sgst_amount) : (totalTax / 2);
        grossTotal = td.gross_total !== undefined ? parseFloat(td.gross_total) : subtotal;
      } else {
        taxableAmount = subtotal;
        cgst = parseFloat(td.cgst_amount !== undefined ? td.cgst_amount : (td.cgst_rate ? subtotal * (td.cgst_rate / 100) : subtotal * 0.025));
        sgst = parseFloat(td.sgst_amount !== undefined ? td.sgst_amount : (td.sgst_rate ? subtotal * (td.sgst_rate / 100) : subtotal * 0.025));
        totalTax = parseFloat(td.total_tax !== undefined ? td.total_tax : (cgst + sgst));
        grossTotal = td.gross_total !== undefined ? parseFloat(td.gross_total) : (subtotal + totalTax);
      }
    } else if (rd.subtotal && parseFloat(rd.subtotal) > 0) {
      subtotal = parseFloat(rd.subtotal);
      if (billType === "Net Rate") {
        taxableAmount = subtotal / 1.05;
        totalTax = subtotal - taxableAmount;
        cgst = totalTax / 2;
        sgst = totalTax / 2;
        grossTotal = subtotal;
      } else {
        taxableAmount = subtotal;
        cgst = parseFloat(rd.tax_details?.cgst_amount || rd.cgst_amount || subtotal * 0.025);
        sgst = parseFloat(rd.tax_details?.sgst_amount || rd.sgst_amount || subtotal * 0.025);
        totalTax = parseFloat(rd.tax_details?.total_tax || rd.total_tax || (cgst + sgst));
        grossTotal = subtotal + totalTax;
      }
    } else {
      let nights = 1;
      if (b.check_in && b.check_out) {
        const d1 = new Date(b.check_in);
        const d2 = new Date(b.check_out);
        const diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        nights = Math.max(1, isNaN(diffDays) ? 1 : diffDays);
      }

      const rooms = getRoomNumbersList(b);
      let roomSum = 0;
      if (rooms.length > 0) {
        rooms.forEach((rNum) => {
          const rObj = roomsList.find((r) => String(r.room_number) === String(rNum));
          const p = parseFloat(rObj?.price || rObj?.price_per_night || 1600);
          roomSum += p * nights;
        });
      }

      let addonsSum = 0;
      let addonsList = [];
      if (Array.isArray(b.extra_addons)) {
        addonsList = b.extra_addons;
      } else if (typeof b.extra_addons === "string") {
        try {
          addonsList = JSON.parse(b.extra_addons);
        } catch (e) {
          addonsList = [];
        }
      }
      (addonsList || []).forEach((a) => {
        if (a && typeof a === "object") {
          addonsSum += parseFloat(a.price || a.total || 0);
        }
      });

      if (roomSum + addonsSum > 0) {
        subtotal = roomSum + addonsSum;
      } else {
        subtotal = parseFloat(pd.amount || pd.total_amount || b.price || b.total_amount || 0);
      }

      if (billType === "Net Rate") {
        taxableAmount = subtotal > 0 ? (subtotal / 1.05) : 0;
        totalTax = Math.max(0, subtotal - taxableAmount);
        cgst = totalTax / 2;
        sgst = totalTax / 2;
        grossTotal = subtotal;
      } else {
        taxableAmount = subtotal;
        cgst = subtotal * 0.025;
        sgst = subtotal * 0.025;
        totalTax = cgst + sgst;
        grossTotal = subtotal + totalTax;
      }
    }

    const unrounded = Math.max(0, grossTotal - discount);
    const rounded = Math.round(unrounded);
    const roundOff = b.round_off !== undefined && b.round_off !== null 
      ? parseFloat(b.round_off) 
      : (td.round_off !== undefined && td.round_off !== null 
          ? parseFloat(td.round_off) 
          : (rounded - unrounded));
    
    // Explicit final total amount from booking if present
    const explicitAmount = (b.amount !== undefined && b.amount !== null && !isNaN(parseFloat(b.amount)) && parseFloat(b.amount) > 0)
      ? parseFloat(b.amount)
      : (pd.amount !== undefined && pd.amount !== null && !isNaN(parseFloat(pd.amount)) && parseFloat(pd.amount) > 0
          ? parseFloat(pd.amount)
          : Math.round(grossTotal + (roundOff || 0) - discount));

    const netPayable = explicitAmount;
    const balanceDue = Math.max(0, Math.round((netPayable - paid) * 100) / 100);

    return {
      subtotal,
      taxableAmount,
      cgst,
      sgst,
      totalTax,
      grossTotal,
      totalPayable: explicitAmount,
      discount,
      roundOff,
      netPayable,
      paid,
      balanceDue,
      billType,
    };
  };

  const getBookingAmount = (b) => {
    if (!b) return 0;
    if (b.amount !== undefined && b.amount !== null && !isNaN(parseFloat(b.amount)) && parseFloat(b.amount) > 0) {
      return parseFloat(b.amount);
    }
    return calculateBookingFinancials(b).totalPayable;
  };

  const getAmountPaid = (b) => {
    if (!b) return 0;
    if (b.amount_paid !== undefined && b.amount_paid !== null && !isNaN(parseFloat(b.amount_paid))) {
      return parseFloat(b.amount_paid);
    }
    if (Array.isArray(b.bills) && b.bills.length > 0) {
      return b.bills.reduce((acc, curr) => acc + (parseFloat(curr.amount_paid) || 0), 0);
    }
    const pd = parsePaymentDetails(b);
    if (pd.paid !== undefined && pd.paid !== null && !isNaN(parseFloat(pd.paid))) {
      return parseFloat(pd.paid);
    }
    if (pd.amount_paid !== undefined && pd.amount_paid !== null && !isNaN(parseFloat(pd.amount_paid))) {
      return parseFloat(pd.amount_paid);
    }
    return 0;
  };

  const getPaymentStatus = (b) => {
    if (!b) return "pending";
    if (b.payment_status) return b.payment_status.toLowerCase();
    const pd = parsePaymentDetails(b);
    if (pd.status) return pd.status.toLowerCase();
    const fin = calculateBookingFinancials(b);
    if (fin.paid >= fin.netPayable && fin.netPayable > 0) return "paid";
    if (fin.paid > 0 && fin.paid < fin.netPayable) return "partially_paid";
    return "pending";
  };

  const getBookingStatusLabel = (st) => {
    const s = String(st || "").toLowerCase().replace(/_/g, " ").trim();
    if (s === "confirmed") return "Booked";
    if (s === "checked in") return "Occupied";
    if (s === "checked out") return "Checked Out";
    if (s === "cancellation requested") return "Cancel Requested";
    if (s === "cancelled" || s === "canceled") return "Cancelled";
    if (s === "pending") return "Pending";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // Live Calculations for Walk-in Modal
  const calculateWalkinTotals = () => {
    let nights = 1;
    if (walkinForm.check_in && walkinForm.check_out) {
      const d1 = new Date(walkinForm.check_in);
      const d2 = new Date(walkinForm.check_out);
      const diffTime = d2 - d1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      nights = Math.max(1, isNaN(diffDays) ? 1 : diffDays);
    }

    let roomTotal = 0;
    (walkinForm.selected_rooms || []).forEach((rNum) => {
      const rObj = roomsList.find((r) => String(r.room_number) === String(rNum));
      const price = parseFloat(rObj?.price || rObj?.price_per_night || 1600);
      roomTotal += price * nights;
    });

    // 1. Food & Dining
    const bAmt = (parseInt(walkinForm.food_breakfast_count, 10) || 0) * (parseFloat(walkinForm.food_breakfast_rate) || 0);
    const lAmt = (parseInt(walkinForm.food_lunch_count, 10) || 0) * (parseFloat(walkinForm.food_lunch_rate) || 0);
    const dAmt = (parseInt(walkinForm.food_dinner_count, 10) || 0) * (parseFloat(walkinForm.food_dinner_rate) || 0);
    const sAmt = (parseInt(walkinForm.food_snacks_count, 10) || 0) * (parseFloat(walkinForm.food_snacks_rate) || 0);
    const tAmt = (parseInt(walkinForm.food_tea_coffee_count, 10) || 0) * (parseFloat(walkinForm.food_tea_coffee_rate) || 0);
    const customFood = parseFloat(walkinForm.food_custom_charge) || 0;
    const foodTotal = bAmt + lAmt + dAmt + sAmt + tAmt + customFood;

    // 2. Amenities
    const wifiAmt = walkinForm.addon_wifi ? (parseFloat(walkinForm.addon_wifi_price) || 200) : 0;
    const extraBedAmt = (parseInt(walkinForm.addon_extrabed_count, 10) || 0) * (parseFloat(walkinForm.addon_extrabed_rate) || 1000);
    const laundryAmt = parseFloat(walkinForm.addon_laundry_charge) || 0;
    const lateCheckoutAmt = (parseInt(walkinForm.addon_latecheckout_hours, 10) || 0) * (parseFloat(walkinForm.addon_latecheckout_rate) || 250);
    const amenitiesTotal = wifiAmt + extraBedAmt + laundryAmt + lateCheckoutAmt;

    // 3. Other Add-ons
    const otherAddonsTotal = parseFloat(walkinForm.addon_other_amount) || 0;

    // Total Addons & Subtotal
    const addonsTotal = foodTotal + amenitiesTotal + otherAddonsTotal;
    const subtotal = roomTotal + addonsTotal;
    const billType = walkinForm.bill_type || "Rack";

    let taxableAmount = 0;
    let cgst = 0;
    let sgst = 0;
    let totalTax = 0;
    let grossTotal = 0;

    if (billType === "Net Rate") {
      // Net Rate: GST is calculated WITHIN subtotal (inclusive in room rent/charges).
      // Gross Total and Sub Total are identical; gross total does not exceed the subtotal.
      grossTotal = subtotal;
      taxableAmount = subtotal > 0 ? (subtotal / 1.05) : 0; // 5% total GST
      totalTax = Math.max(0, subtotal - taxableAmount);
      cgst = totalTax / 2;
      sgst = totalTax / 2;
    } else {
      // Rack: GST 5% (2.5% CGST + 2.5% SGST) calculated additionally ON TOP of subtotal.
      taxableAmount = subtotal;
      cgst = subtotal * 0.025; // 2.5%
      sgst = subtotal * 0.025; // 2.5%
      totalTax = cgst + sgst;  // 5% total
      grossTotal = subtotal + totalTax;
    }

    const discount = parseFloat(walkinForm.discount_amount) || 0;
    const unroundedPayable = Math.max(0, grossTotal - discount);
    
    // Round off: if decimal < 0.50 (e.g. 12.49) -> decremental (12), roundOff = -0.49
    // if decimal >= 0.50 (e.g. 12.50) -> incremental (13), roundOff = +0.50
    const roundedPayable = Math.round(unroundedPayable);
    const roundOff = roundedPayable - unroundedPayable;

    const netAmount = roundedPayable;
    const paid = parseFloat(walkinForm.amount_paid) || 0;
    const balanceRemaining = Math.max(0, netAmount - paid);

    return {
      nights,
      roomTotal,
      foodTotal,
      wifiAmt,
      extraBedAmt,
      laundryAmt,
      lateCheckoutAmt,
      amenitiesTotal,
      otherAddonsTotal,
      addonsTotal,
      subtotal,
      taxableAmount,
      cgst,
      sgst,
      totalTax,
      grossTotal,
      discount,
      roundOff,
      netAmount,
      paid,
      balanceRemaining,
      billType,
    };
  };

  // Fetch Live Room Availability for Modal
  const fetchLiveRoomAvailability = async () => {
    setLoadingAvailability(true);
    const params = new URLSearchParams();
    if (walkinForm.check_in) {
      params.append("date", walkinForm.check_in);
      params.append("check_in", walkinForm.check_in);
    }
    if (walkinForm.check_out) {
      params.append("check_out", walkinForm.check_out);
    }
    if (editingBookingId) {
      params.append("exclude_booking_id", editingBookingId);
    }
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await apiRequest(`${TravellersBaseUrl}admin/room-availability/${queryString}`);
    const roomsArray = Array.isArray(res?.data) ? res.data : (Array.isArray(res?.data?.rooms) ? res.data.rooms : null);
    if (res.success && roomsArray) {
      setAvailabilityRooms(roomsArray);
    } else {
      const fallback = roomsList.map((r) => ({
        room_number: r.room_number,
        room_type: r.room_type,
        price: r.price,
        status: r.is_active === false || r.status === "maintenance" ? "maintenance" : "vacant",
        status_label: r.is_active === false || r.status === "maintenance" ? "Under Maintenance" : "Vacant",
        color: r.is_active === false || r.status === "maintenance" ? "black" : "green",
        color_code: r.is_active === false || r.status === "maintenance" ? "#1F2937" : "#10B981",
        is_active: r.is_active !== false,
      }));
      setAvailabilityRooms(fallback);
    }
    setLoadingAvailability(false);
  };

  const handleOpenRoomSelectionModal = () => {
    fetchLiveRoomAvailability();
    setIsRoomSelectModalOpen(true);
  };

  const toggleRoomSelection = (roomNum) => {
    const rStr = String(roomNum);
    setWalkinForm((prev) => {
      const isSelected = prev.selected_rooms.includes(rStr);
      const updated = isSelected
        ? prev.selected_rooms.filter((r) => r !== rStr)
        : [...prev.selected_rooms, rStr];
      return {
        ...prev,
        selected_rooms: updated,
      };
    });
  };

  // Upload ID Proof
  const handleIdProofUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingIdProof(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await apiRequest(`${TravellersBaseUrl}upload/room-image/`, "POST", formData);
    if (res.success) {
      const fileIdOrUrl = res.data?.url || res.data?.file_id || res.data?.image_id || res.data?.id || file.name;
      setWalkinForm((prev) => ({
        ...prev,
        id_proof_file: fileIdOrUrl,
      }));
      toast.success("ID proof document uploaded successfully!");
    } else {
      toast.error(res.error || "Failed to upload ID document");
    }
    setUploadingIdProof(false);
  };

  const toDateTimeLocal = (dateStr, fallback = "") => {
    if (!dateStr) return fallback;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return fallback;
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch (e) {
      return fallback;
    }
  };

  const handleOpenEditReservation = (b) => {
    if (!b) return;
    setEditingBookingId(b.booking_id || b.id);

    const comp = b.company_details && typeof b.company_details === "object" ? b.company_details : {};
    const legacyFood = b.food_details && typeof b.food_details === "object" ? b.food_details : {};
    const pd = parsePaymentDetails(b);

    // Parse extra_addons
    let extraAddonsList = [];
    if (Array.isArray(b.extra_addons)) {
      extraAddonsList = b.extra_addons;
    } else if (typeof b.extra_addons === "string") {
      try {
        extraAddonsList = JSON.parse(b.extra_addons);
        if (!Array.isArray(extraAddonsList)) extraAddonsList = [];
      } catch (e) {
        extraAddonsList = [];
      }
    }

    // Extract food add-ons
    const breakfastAddon = extraAddonsList.find((a) => a.id === "breakfast" || (a.name && a.name.toLowerCase().includes("breakfast")));
    const lunchAddon = extraAddonsList.find((a) => a.id === "lunch" || (a.name && a.name.toLowerCase().includes("lunch")));
    const dinnerAddon = extraAddonsList.find((a) => a.id === "dinner" || (a.name && a.name.toLowerCase().includes("dinner")));
    const snacksAddon = extraAddonsList.find((a) => a.id === "snacks" || (a.name && a.name.toLowerCase().includes("snacks")));
    const teaCoffeeAddon = extraAddonsList.find((a) => a.id === "tea_coffee" || (a.name && (a.name.toLowerCase().includes("tea") || a.name.toLowerCase().includes("coffee"))));
    const foodCustomAddon = extraAddonsList.find((a) => a.id === "food_custom" || (a.name && a.name.toLowerCase().includes("custom food")));

    // Extract amenities add-ons
    const wifiAddon = extraAddonsList.find((a) => a.id === "wifi" || (a.name && a.name.toLowerCase().includes("wifi")));
    const extraBedAddon = extraAddonsList.find((a) => a.id === "extra_bed" || (a.name && a.name.toLowerCase().includes("extra bed")));
    const laundryAddon = extraAddonsList.find((a) => a.id === "laundry" || (a.name && a.name.toLowerCase().includes("laundry")));
    const lateCheckoutAddon = extraAddonsList.find((a) => a.id === "late_checkout" || (a.name && a.name.toLowerCase().includes("late checkout")));
    const otherAddon = extraAddonsList.find((a) => a.id === "other" || a.category === "other" || (!["breakfast", "lunch", "dinner", "snacks", "tea_coffee", "food_custom", "wifi", "extra_bed", "laundry", "late_checkout"].includes(a.id) && a.category !== "food" && a.category !== "amenity"));

    // Helper to robustly extract count, rate and remarks from addon object
    const extractCountAndRate = (addon, legacyItem, defaultRate) => {
      if (addon) {
        const count = addon.count !== undefined ? parseInt(addon.count, 10) : (addon.quantity !== undefined ? parseInt(addon.quantity, 10) : null);
        const rate = addon.rate !== undefined ? parseFloat(addon.rate) : null;
        const price = addon.price !== undefined ? parseFloat(addon.price) : (addon.total !== undefined ? parseFloat(addon.total) : null);

        if (count !== null && count > 0) {
          return {
            count: count,
            rate: rate !== null && rate > 0 ? rate : (price !== null ? Math.round(price / count) : defaultRate),
            remarks: addon.remarks || addon.items || ""
          };
        } else if (price !== null && price > 0) {
          const effectiveRate = rate !== null && rate > 0 ? rate : (price < defaultRate ? price : defaultRate);
          const effectiveCount = rate !== null && rate > 0 ? Math.max(1, Math.round(price / rate)) : (price >= defaultRate && price % defaultRate === 0 ? price / defaultRate : 1);
          const computedRate = effectiveCount === 1 ? price : (price / effectiveCount);
          return {
            count: effectiveCount,
            rate: computedRate,
            remarks: addon.remarks || addon.items || ""
          };
        }
      }
      if (legacyItem) {
        return {
          count: parseInt(legacyItem.count || legacyItem.quantity || 0, 10),
          rate: parseFloat(legacyItem.rate || defaultRate),
          remarks: legacyItem.items || legacyItem.remarks || ""
        };
      }
      return { count: 0, rate: defaultRate, remarks: "" };
    };

    const bfParsed = extractCountAndRate(breakfastAddon, legacyFood.breakfast, 120);
    const lunchParsed = extractCountAndRate(lunchAddon, legacyFood.lunch, 250);
    const dinnerParsed = extractCountAndRate(dinnerAddon, legacyFood.dinner, 250);
    const snacksParsed = extractCountAndRate(snacksAddon, legacyFood.snacks, 80);
    const teaCoffeeParsed = extractCountAndRate(teaCoffeeAddon, legacyFood.tea_coffee, 30);
    const extraBedParsed = extractCountAndRate(extraBedAddon, null, 1000);
    const lateCheckoutParsed = extractCountAndRate(lateCheckoutAddon, null, 250);

    setWalkinForm({
      // Tab 1: Individual Details
      guest_name: b.guest_name || b.customer_name || "",
      guest_phone: b.guest_phone || b.customer_phone || b.phone || "",
      guest_email: b.guest_email || "",
      guest_address: b.guest_address || "",
      number_of_guests: b.number_of_guests || 1,
      check_in: toDateTimeLocal(b.check_in, new Date().toISOString().split("T")[0] + "T12:00"),
      check_out: toDateTimeLocal(b.check_out, new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T10:00"),
      id_proof_type: b.id_proof_type || "Aadhar Card",
      id_proof_number: b.id_proof_number || "",
      id_proof_file: b.id_proof_file || "",

      // Tab 2: Company Details
      company_id: b.company_id || comp.company_id || comp.id || "",
      company_name: comp.company_name || "",
      company_person: comp.contact_person || comp.company_person || comp.person || "",
      company_address: comp.company_address || comp.address || "",
      company_city: comp.city || comp.company_city || "",
      company_state: comp.state || comp.company_state || "",
      company_pincode: comp.pincode || comp.company_pincode || "",
      company_phone: comp.phone || comp.company_phone || "",
      company_gst: comp.gst_no || comp.company_gst || "",

      // Tab 3: Room Selection (Array of room numbers)
      selected_rooms: getRoomNumbersList(b),

      // Tab 4: Extra Add-ons
      // Section 1: Food & Dining Details
      food_breakfast_count: bfParsed.count,
      food_breakfast_rate: bfParsed.rate,
      food_breakfast_items: bfParsed.remarks,
      food_lunch_count: lunchParsed.count,
      food_lunch_rate: lunchParsed.rate,
      food_lunch_items: lunchParsed.remarks,
      food_dinner_count: dinnerParsed.count,
      food_dinner_rate: dinnerParsed.rate,
      food_dinner_items: dinnerParsed.remarks,
      food_snacks_count: snacksParsed.count,
      food_snacks_rate: snacksParsed.rate,
      food_snacks_items: snacksParsed.remarks,
      food_tea_coffee_count: teaCoffeeParsed.count,
      food_tea_coffee_rate: teaCoffeeParsed.rate,
      food_tea_coffee_items: teaCoffeeParsed.remarks,
      food_service_type: legacyFood.service_type || "Room Service",
      food_custom_charge: foodCustomAddon?.price || foodCustomAddon?.total || legacyFood.custom_charge || 0,

      // Section 2: Amenities
      addon_wifi: !!wifiAddon,
      addon_wifi_price: wifiAddon?.price || wifiAddon?.total || 200,
      addon_extrabed_count: extraBedParsed.count,
      addon_extrabed_rate: extraBedParsed.rate,
      addon_laundry_charge: laundryAddon?.price || laundryAddon?.total || 0,
      addon_laundry_remarks: laundryAddon?.remarks || "",
      addon_latecheckout_hours: lateCheckoutParsed.count,
      addon_latecheckout_rate: lateCheckoutParsed.rate,

      // Section 3: Others with Description
      addon_other_name: otherAddon?.name || "",
      addon_other_amount: otherAddon?.price || otherAddon?.total || 0,
      addon_other_description: otherAddon?.remarks || "",

      // Billing, Taxes, Discount
      bill_type: b.bill_type || b.tax_details?.bill_type || "Rack",
      discount_amount: parseFloat(b.discount_amount || 0),
      discount_remarks: b.discount_remarks || "",
      amount_paid: getAmountPaid(b),
      payment_method: pd.method || pd.payment_type || "cash",
    });

    setSelectedBooking(null);
    setWalkinActiveTab("individual");
    setIsWalkinOpen(true);
  };

  const handleCreateOrUpdateWalkin = async (e) => {
    if (e) e.preventDefault();
    if (!walkinForm.guest_name || !walkinForm.guest_phone) {
      toast.error("Guest Full Name and Phone Number are required in Tab 1 (Guest Details)");
      setWalkinActiveTab("individual");
      return;
    }
    if (!walkinForm.selected_rooms || walkinForm.selected_rooms.length === 0) {
      toast.error("Please select at least one room in Tab 3 (Room Details)");
      setWalkinActiveTab("rooms");
      return;
    }

    const totals = calculateWalkinTotals();

    // Compile extra_addons array
    const compiledAddons = [];

    // Food items
    if (parseInt(walkinForm.food_breakfast_count, 10) > 0) {
      compiledAddons.push({
        id: "breakfast",
        name: `Breakfast (x${walkinForm.food_breakfast_count})`,
        category: "food",
        count: parseInt(walkinForm.food_breakfast_count, 10),
        rate: parseFloat(walkinForm.food_breakfast_rate) || 120,
        price: (parseInt(walkinForm.food_breakfast_count, 10) || 0) * (parseFloat(walkinForm.food_breakfast_rate) || 120),
        remarks: walkinForm.food_breakfast_items || "",
      });
    }
    if (parseInt(walkinForm.food_lunch_count, 10) > 0) {
      compiledAddons.push({
        id: "lunch",
        name: `Lunch (x${walkinForm.food_lunch_count})`,
        category: "food",
        count: parseInt(walkinForm.food_lunch_count, 10),
        rate: parseFloat(walkinForm.food_lunch_rate) || 250,
        price: (parseInt(walkinForm.food_lunch_count, 10) || 0) * (parseFloat(walkinForm.food_lunch_rate) || 250),
        remarks: walkinForm.food_lunch_items || "",
      });
    }
    if (parseInt(walkinForm.food_dinner_count, 10) > 0) {
      compiledAddons.push({
        id: "dinner",
        name: `Dinner (x${walkinForm.food_dinner_count})`,
        category: "food",
        count: parseInt(walkinForm.food_dinner_count, 10),
        rate: parseFloat(walkinForm.food_dinner_rate) || 250,
        price: (parseInt(walkinForm.food_dinner_count, 10) || 0) * (parseFloat(walkinForm.food_dinner_rate) || 250),
        remarks: walkinForm.food_dinner_items || "",
      });
    }
    if (parseInt(walkinForm.food_snacks_count, 10) > 0) {
      compiledAddons.push({
        id: "snacks",
        name: `Snacks (x${walkinForm.food_snacks_count})`,
        category: "food",
        count: parseInt(walkinForm.food_snacks_count, 10),
        rate: parseFloat(walkinForm.food_snacks_rate) || 80,
        price: (parseInt(walkinForm.food_snacks_count, 10) || 0) * (parseFloat(walkinForm.food_snacks_rate) || 80),
        remarks: walkinForm.food_snacks_items || "",
      });
    }
    if (parseInt(walkinForm.food_tea_coffee_count, 10) > 0) {
      compiledAddons.push({
        id: "tea_coffee",
        name: `Tea / Coffee (x${walkinForm.food_tea_coffee_count})`,
        category: "food",
        count: parseInt(walkinForm.food_tea_coffee_count, 10),
        rate: parseFloat(walkinForm.food_tea_coffee_rate) || 30,
        price: (parseInt(walkinForm.food_tea_coffee_count, 10) || 0) * (parseFloat(walkinForm.food_tea_coffee_rate) || 30),
        remarks: walkinForm.food_tea_coffee_items || "",
      });
    }
    if (parseFloat(walkinForm.food_custom_charge) > 0) {
      compiledAddons.push({
        id: "food_custom",
        name: "Custom Food Charges",
        category: "food",
        price: parseFloat(walkinForm.food_custom_charge),
        remarks: `Service Type: ${walkinForm.food_service_type}`,
      });
    }

    // Amenities
    if (walkinForm.addon_wifi) {
      compiledAddons.push({
        id: "wifi",
        name: "Premium WiFi Access",
        category: "amenity",
        price: parseFloat(walkinForm.addon_wifi_price) || 200,
      });
    }
    if (parseInt(walkinForm.addon_extrabed_count, 10) > 0) {
      compiledAddons.push({
        id: "extra_bed",
        name: `Extra Bed / Extra Person (x${walkinForm.addon_extrabed_count})`,
        category: "amenity",
        count: parseInt(walkinForm.addon_extrabed_count, 10),
        rate: parseFloat(walkinForm.addon_extrabed_rate) || 1000,
        price: (parseInt(walkinForm.addon_extrabed_count, 10) || 0) * (parseFloat(walkinForm.addon_extrabed_rate) || 1000),
      });
    }
    if (parseFloat(walkinForm.addon_laundry_charge) > 0 || (walkinForm.addon_laundry_remarks && walkinForm.addon_laundry_remarks.trim() !== "")) {
      compiledAddons.push({
        id: "laundry",
        name: "Laundry Service",
        category: "amenity",
        price: parseFloat(walkinForm.addon_laundry_charge) || 0,
        remarks: walkinForm.addon_laundry_remarks || "Laundry service",
      });
    }
    if (parseInt(walkinForm.addon_latecheckout_hours, 10) > 0) {
      compiledAddons.push({
        id: "late_checkout",
        name: `Late Checkout (${walkinForm.addon_latecheckout_hours} hrs)`,
        category: "amenity",
        count: parseInt(walkinForm.addon_latecheckout_hours, 10),
        rate: parseFloat(walkinForm.addon_latecheckout_rate) || 250,
        price: (parseInt(walkinForm.addon_latecheckout_hours, 10) || 0) * (parseFloat(walkinForm.addon_latecheckout_rate) || 250),
      });
    }

    // Others
    if (parseFloat(walkinForm.addon_other_amount) > 0 || (walkinForm.addon_other_name && walkinForm.addon_other_name.trim() !== "")) {
      compiledAddons.push({
        id: "other",
        name: walkinForm.addon_other_name || "Other Add-on",
        category: "other",
        price: parseFloat(walkinForm.addon_other_amount) || 0,
        remarks: walkinForm.addon_other_description || "",
      });
    }

    const getCurrentDateTimeWithTime = () => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };

    const payload = {
      guest_name: walkinForm.guest_name,
      guest_phone: walkinForm.guest_phone,
      guest_email: walkinForm.guest_email || null,
      guest_address: walkinForm.guest_address || "",
      number_of_guests: parseInt(walkinForm.number_of_guests, 10) || 1,
      check_in: walkinForm.check_in,
      check_out: walkinForm.check_out,
      id_proof_type: walkinForm.id_proof_type,
      id_proof_number: walkinForm.id_proof_number,
      id_proof_file: walkinForm.id_proof_file || "manual_entry",
      room_details: walkinForm.selected_rooms.map((rNum) => ({
        roomNo: String(rNum),
        isActive: true,
        isCleaned: null,
      })),
      company_id: walkinForm.company_id || null,
      company_details: {
        company_id: walkinForm.company_id || null,
        company_name: walkinForm.company_name,
        contact_person: walkinForm.company_person,
        company_address: walkinForm.company_address,
        address: walkinForm.company_address,
        city: walkinForm.company_city,
        state: walkinForm.company_state,
        pincode: walkinForm.company_pincode,
        phone: walkinForm.company_phone,
        gst_no: walkinForm.company_gst,
      },
      extra_addons: compiledAddons,
      bill_type: walkinForm.bill_type || "Rack",
      round_off: parseFloat(totals.roundOff.toFixed(2)),
      tax_details: {
        bill_type: walkinForm.bill_type || "Rack",
        subtotal: totals.subtotal,
        taxable_amount: parseFloat(totals.taxableAmount.toFixed(2)),
        cgst_rate: 2.5,
        cgst_amount: parseFloat(totals.cgst.toFixed(2)),
        sgst_rate: 2.5,
        sgst_amount: parseFloat(totals.sgst.toFixed(2)),
        total_tax: parseFloat(totals.totalTax.toFixed(2)),
        round_off: parseFloat(totals.roundOff.toFixed(2)),
        gross_total: parseFloat(totals.grossTotal.toFixed(2)),
      },
      discount_amount: totals.discount,
      discount_remarks: walkinForm.discount_remarks || "",
      amount_paid: totals.paid,
      payment_type: walkinForm.payment_method,
      payment_details: {
        amount: totals.netAmount,
        status: totals.paid >= totals.netAmount && totals.netAmount > 0 ? "paid" : (totals.paid > 0 ? "partially_paid" : "pending"),
      },
    };

    if (editingBookingId) {
      const res = await apiRequest(`${TravellersBaseUrl}bookings/${editingBookingId}/`, "PATCH", payload);
      if (res.success) {
        toast.success(`Reservation #${editingBookingId} updated successfully!`);
        setIsWalkinOpen(false);
        setEditingBookingId(null);
        setWalkinForm(initialWalkinState);
        setWalkinActiveTab("individual");
        fetchCompanies();
        fetchCustomers();
        fetchAllBookings();
      } else {
        toast.error(res.error || "Failed to update reservation");
      }
    } else {
      payload.booking_source = "walk_in";
      payload.booking_status = "confirmed";
      const res = await apiRequest(`${TravellersBaseUrl}bookings/`, "POST", payload);
      if (res.success) {
        toast.success("Walk-in reservation created and checked in successfully!");
        setIsWalkinOpen(false);
        setWalkinForm(initialWalkinState);
        setWalkinActiveTab("individual");
        fetchCompanies();
        fetchCustomers();
        fetchAllBookings();
      } else {
        toast.error(res.error || "Failed to create walk-in reservation");
      }
    }
  };

  const handleUpdateStatus = async () => {
    if (!statusModalBooking) return;

    const cleanStatus = String(newStatusVal).replace(/_/g, " ").trim();
    const isCheckout = cleanStatus.toLowerCase() === "checked out";

    if (isCheckout) {
      const fin = calculateBookingFinancials(statusModalBooking);
      const balanceDue = fin.balanceDue;

      if (balanceDue > 0) {
        toast.error(`Cannot checkout: Outstanding balance of ₹${balanceDue.toFixed(2)}. Full payment must be recorded first.`);
        return;
      }
    }

    const res = await apiRequest(`${TravellersBaseUrl}admin/booking/${statusModalBooking.booking_id}/`, "PATCH", {
      status: cleanStatus,
      booking_status: cleanStatus,
    });
    if (res.success) {
      toast.success(`Booking status changed to ${cleanStatus}`);
      setStatusModalBooking(null);
      fetchAllBookings();
    } else {
      toast.error(res.error || "Failed to update booking status");
    }
  };

  // Record Payment
  const handleRecordPayment = async (e) => {
    e.preventDefault();
    if (!paymentModalBooking) return;

    const enteredAmt = parseFloat(paymentForm.amount || 0);
    if (enteredAmt <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const fin = calculateBookingFinancials(paymentModalBooking);
    const currentPaid = fin.paid;
    const totalDue = fin.netPayable;
    const newTotalPaid = currentPaid + enteredAmt;
    const isPaid = newTotalPaid >= totalDue;

    const res = await apiRequest(`${TravellersBaseUrl}admin/booking/${paymentModalBooking.booking_id}/`, "PATCH", {
      amount_paid: enteredAmt,
      payment_type: paymentForm.payment_type,
      transaction_id: paymentForm.transaction_id || "",
      payment_status: isPaid ? "paid" : "partially_paid",
      payment_details: {
        amount: totalDue,
        status: isPaid ? "paid" : "partially_paid",
      },
    });

    if (res.success) {
      toast.success(`Recorded payment of ₹${enteredAmt} successfully!`);
      setPaymentModalBooking(null);
      setPaymentForm({ amount: "", payment_type: "cash", transaction_id: "" });
      fetchAllBookings();
    } else {
      toast.error(res.error || "Failed to record payment");
    }
  };

  const handleApproveCancellation = async (bookingId) => {
    if (!window.confirm("Approve cancellation and process refund?")) return;
    const res = await apiRequest(`${TravellersBaseUrl}admin/booking/${bookingId}/approve-cancellation/`, "POST");
    if (res.success) {
      toast.success("Cancellation approved successfully");
      fetchAllBookings();
    } else {
      toast.error(res.error || "Failed to approve cancellation");
    }
  };

  const handleRejectCancellation = async (bookingId) => {
    if (!window.confirm("Reject cancellation request and restore booking?")) return;
    const res = await apiRequest(`${TravellersBaseUrl}admin/booking/${bookingId}/reject-cancellation/`, "POST");
    if (res.success) {
      toast.success("Cancellation rejected");
      fetchAllBookings();
    } else {
      toast.error(res.error || "Failed to reject cancellation");
    }
  };

  const handlePrintInvoice = (b) => {
    if (!b) return;
    const fin = calculateBookingFinancials(b);
    const paidAmount = getAmountPaid(b);
    
    let invoiceAddons = [];
    if (Array.isArray(b.extra_addons)) {
      invoiceAddons = b.extra_addons;
    } else if (typeof b.extra_addons === "string") {
      try {
        invoiceAddons = JSON.parse(b.extra_addons);
        if (!Array.isArray(invoiceAddons)) invoiceAddons = [];
      } catch (e) {
        invoiceAddons = [];
      }
    }

    const totalAddonsPrice = invoiceAddons.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0);
    const foodTotalAmt = parseFloat(b.food_details?.total_food_amount || b.food_details?.total_food_charge || 0);
    const subtotalAmt = parseFloat(b.rent_details?.subtotal || b.tax_details?.subtotal || fin.subtotal || 0);
    const roomTariffAmt = Math.max(0, subtotalAmt - (totalAddonsPrice > 0 ? totalAddonsPrice : foodTotalAmt));

    const printWindow = window.open("", "_blank", "width=850,height=750");
    if (!printWindow) {
      alert("Please allow popups to print the invoice / receipt.");
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${b.booking_id || b.id}</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4 portrait;
              margin: 12mm;
            }
            * {
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #1F2937;
              margin: 0;
              padding: 10px;
              font-size: 13px;
              line-height: 1.5;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .invoice-wrapper {
              max-width: 800px;
              margin: 0 auto;
              border: 1px solid #E5E7EB;
              border-radius: 8px;
              padding: 24px 28px;
              background: #FFFFFF;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid #4A1E5D;
              padding-bottom: 16px;
              margin-bottom: 18px;
            }
            .brand-name {
              font-size: 22px;
              font-weight: 800;
              color: #4A1E5D;
              margin: 0 0 4px 0;
              letter-spacing: 0.5px;
            }
            .brand-sub {
              font-size: 12px;
              color: #6B7280;
              margin: 2px 0;
            }
            .invoice-badge {
              text-align: right;
            }
            .badge-title {
              font-size: 18px;
              font-weight: 800;
              color: #4A1E5D;
              letter-spacing: 1px;
            }
            .badge-no {
              font-size: 13px;
              font-weight: 700;
              color: #374151;
              margin-top: 2px;
            }
            .badge-date {
              font-size: 11px;
              color: #6B7280;
              margin-top: 2px;
            }
            .details-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              background: #F9FAFB;
              border: 1px solid #E5E7EB;
              border-radius: 6px;
              padding: 14px 16px;
              margin-bottom: 20px;
            }
            .section-title {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              color: #9CA3AF;
              margin-bottom: 6px;
              letter-spacing: 0.5px;
            }
            .details-text {
              font-size: 13px;
              line-height: 1.45;
              color: #111827;
            }
            .table-container {
              margin-bottom: 20px;
            }
            table.invoice-table {
              width: 100%;
              border-collapse: collapse;
            }
            table.invoice-table th {
              background: #4A1E5D;
              color: #FFFFFF;
              font-weight: 700;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              padding: 10px 12px;
              text-align: left;
            }
            table.invoice-table th.text-right {
              text-align: right;
            }
            table.invoice-table td {
              padding: 10px 12px;
              border-bottom: 1px solid #E5E7EB;
              font-size: 13px;
            }
            table.invoice-table td.text-right {
              text-align: right;
            }
            .financial-summary {
              display: flex;
              justify-content: flex-end;
              margin-top: 10px;
            }
            .summary-table {
              width: 360px;
              border-collapse: collapse;
            }
            .summary-table td {
              padding: 6px 8px;
              font-size: 13px;
            }
            .summary-table td.label {
              color: #4B5563;
            }
            .summary-table td.val {
              text-align: right;
              font-weight: 600;
              color: #111827;
            }
            .summary-table tr.highlight td {
              border-top: 2px solid #4A1E5D;
              border-bottom: 2px solid #4A1E5D;
              font-weight: 800;
              font-size: 15px;
              color: #4A1E5D;
              padding: 8px 8px;
            }
            .summary-table tr.paid td {
              color: #059669;
              font-weight: 700;
            }
            .summary-table tr.due td {
              color: #DC2626;
              font-weight: 700;
            }
            .footer-notes {
              margin-top: 28px;
              padding-top: 14px;
              border-top: 1px solid #E5E7EB;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              font-size: 11px;
              color: #6B7280;
            }
            .sign-box {
              text-align: center;
              min-width: 140px;
            }
            .sign-line {
              border-bottom: 1px solid #9CA3AF;
              margin-bottom: 4px;
              height: 36px;
            }
            @media print {
              body {
                padding: 0;
              }
              .invoice-wrapper {
                border: none;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-wrapper">
            <div class="header">
              <div>
                <div class="brand-name">TravellersInn Resort</div>
                <div class="brand-sub">Luxury Suites, Cottages & Events</div>
                <div class="brand-sub">GSTIN: ${b.company_details?.gst_no || "33AAAAA0000A1Z5"} | Contact: +91 9080805494</div>
              </div>
              <div class="invoice-badge">
                <div class="badge-title">GUEST FOLIO / INVOICE</div>
                <div class="badge-no">#${b.booking_id || b.id}</div>
                <div class="badge-date">Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
                <div class="badge-date">Rate Type: <strong>${fin.billType === "Net Rate" ? "Net Rate (GST Incl.)" : "Rack Rate (GST Add.)"}</strong></div>
              </div>
            </div>

            <div class="details-grid">
              <div>
                <div class="section-title">Billed To (Guest Details)</div>
                <div class="details-text">
                  <strong>${b.guest_name || b.customer_name || "Guest"}</strong><br />
                  ${b.company_details?.company_name ? `<div><strong>${b.company_details.company_name}</strong> (GST: ${b.company_details.gst_no || "N/A"})</div>` : ""}
                  ${b.guest_phone || b.customer_phone || b.phone ? `<div>Phone: ${b.guest_phone || b.customer_phone || b.phone}</div>` : ""}
                  ${b.guest_email ? `<div>Email: ${b.guest_email}</div>` : ""}
                  ${b.guest_address ? `<div>Address: ${b.guest_address}</div>` : ""}
                </div>
              </div>
              <div>
                <div class="section-title">Stay & Reservation Info</div>
                <div class="details-text">
                  <strong>Room(s):</strong> Room ${formatRoomNumbers(b)}<br />
                  <strong>Guests:</strong> ${b.number_of_guests || 1} Person(s)<br />
                  <strong>Check-In:</strong> ${formatDateDisplay(b.check_in)}<br />
                  <strong>Check-Out:</strong> ${formatDateDisplay(b.check_out)}<br />
                  <strong>Source:</strong> ${b.booking_source === "walk_in" ? "Walk-In Direct" : "Online Website"}
                </div>
              </div>
            </div>

            <div class="table-container">
              <table class="invoice-table">
                <thead>
                  <tr>
                    <th style="width: 55px; text-align: center;">#</th>
                    <th>Description</th>
                    <th style="width: 110px; text-align: center;">Rate Type</th>
                    <th class="text-right" style="width: 130px;">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align: center;">1</td>
                    <td>
                      <strong>Room Accommodation</strong> (Room ${formatRoomNumbers(b)})
                      <div style="font-size: 11px; color: #6B7280;">Stay from ${formatDateDisplay(b.check_in)} to ${formatDateDisplay(b.check_out)}</div>
                    </td>
                    <td style="text-align: center; font-size: 11px;">${fin.billType}</td>
                    <td class="text-right">₹${(roomTariffAmt > 0 ? roomTariffAmt : subtotalAmt).toFixed(2)}</td>
                  </tr>
                  ${invoiceAddons.map((item, idx) => `
                    <tr>
                      <td style="text-align: center;">${idx + 2}</td>
                      <td>
                        <strong>${item.name || item.id}</strong>
                        ${item.remarks ? `<span style="font-size: 11px; color: #6B7280;"> (${item.remarks})</span>` : ""}
                      </td>
                      <td style="text-align: center; font-size: 11px;">Add-on</td>
                      <td class="text-right">₹${parseFloat(item.price || 0).toFixed(2)}</td>
                    </tr>
                  `).join("")}
                  ${invoiceAddons.length === 0 && foodTotalAmt > 0 ? `
                    <tr>
                      <td style="text-align: center;">2</td>
                      <td>
                        <strong>Food & Dining Charges</strong> (${b.food_details?.service_type || "Room Service"})
                      </td>
                      <td style="text-align: center; font-size: 11px;">Dining</td>
                      <td class="text-right">₹${foodTotalAmt.toFixed(2)}</td>
                    </tr>
                  ` : ""}
                </tbody>
              </table>
            </div>

            <div class="financial-summary">
              <table class="summary-table">
                <tbody>
                  <tr>
                    <td class="label">Subtotal:</td>
                    <td class="val">₹${fin.subtotal.toFixed(2)}</td>
                  </tr>
                  ${fin.billType === "Net Rate" ? `
                    <tr>
                      <td class="label">Taxable Base Amount:</td>
                      <td class="val">₹${fin.taxableAmount.toFixed(2)}</td>
                    </tr>
                  ` : ""}
                  <tr>
                    <td class="label">CGST (2.5%) ${fin.billType === "Net Rate" ? "(Included)" : ""}:</td>
                    <td class="val">${fin.billType === "Net Rate" ? "" : "+"}₹${fin.cgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td class="label">SGST (2.5%) ${fin.billType === "Net Rate" ? "(Included)" : ""}:</td>
                    <td class="val">${fin.billType === "Net Rate" ? "" : "+"}₹${fin.sgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td class="label">Total Tax (5% GST):</td>
                    <td class="val">₹${fin.totalTax.toFixed(2)}</td>
                  </tr>
                  ${fin.discount > 0 ? `
                    <tr style="color: #DC2626;">
                      <td class="label" style="color: #DC2626;">Discount ${b.discount_remarks ? `(${b.discount_remarks})` : ""}:</td>
                      <td class="val" style="color: #DC2626;">-₹${fin.discount.toFixed(2)}</td>
                    </tr>
                  ` : ""}
                  ${fin.roundOff !== 0 ? `
                    <tr style="color: ${fin.roundOff > 0 ? "#059669" : "#DC2626"};">
                      <td class="label" style="color: inherit;">Round Off Adjustment:</td>
                      <td class="val" style="color: inherit;">${fin.roundOff >= 0 ? `+₹${fin.roundOff.toFixed(2)}` : `-₹${Math.abs(fin.roundOff).toFixed(2)}`}</td>
                    </tr>
                  ` : ""}
                  <tr class="highlight">
                    <td>Total Due (Net Payable):</td>
                    <td class="val">₹${fin.netPayable.toFixed(2)}</td>
                  </tr>
                  <tr class="paid">
                    <td>Amount Received / Paid:</td>
                    <td class="val">₹${paidAmount.toFixed(2)}</td>
                  </tr>
                  ${fin.balanceDue > 0 ? `
                    <tr class="due">
                      <td>Outstanding Balance:</td>
                      <td class="val">₹${fin.balanceDue.toFixed(2)}</td>
                    </tr>
                  ` : `
                    <tr style="color: #059669; font-weight: 700;">
                      <td>Payment Status:</td>
                      <td class="val" style="text-transform: uppercase;">Fully Paid ✓</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>

            <div class="footer-notes">
              <div>
                <div>Thank you for staying at TravellersInn!</div>
                <div>Computer-generated invoice. No signature required.</div>
              </div>
              <div class="sign-box">
                <div class="sign-line"></div>
                <div>Authorized Signatory</div>
              </div>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.focus();
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const handleExportCSV = (targetList = null, namePrefix = "All") => {
    const listToExport = targetList || [...activeBookingsData, ...pastBookingsData];
    if (!listToExport || listToExport.length === 0) {
      toast.info("No bookings to export");
      return;
    }
    const headers = "Booking ID,Guest Name,Phone,Email,Rooms,Check-In,Check-Out,Total Amount,Paid,Booking Status,Payment Status\n";
    const rows = listToExport
      .map((b) => {
        const roomsStr = `"${formatRoomNumbers(b)}"`;
        const fin = calculateBookingFinancials(b);
        const total = fin.netPayable;
        const paid = fin.paid;
        const bStatus = b.booking_status || b.status || "";
        const pStatus = getPaymentStatus(b);
        return `${b.booking_id || b.id},"${b.guest_name || b.customer_name || ""}",${b.guest_phone || b.customer_phone || b.phone || ""},${b.guest_email || ""},${roomsStr},${b.check_in || ""},${b.check_out || ""},${total},${paid},${bStatus},${pStatus}`;
      })
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `TravellersInn_${namePrefix}_Bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${namePrefix} bookings exported to CSV`);
  };

  const getBookingSortValue = (b) => {
    const created = b.created_date || b.created_at;
    if (created) {
      const t = new Date(created).getTime();
      if (!isNaN(t) && t > 0) return t;
    }
    const checkIn = b.check_in || b.check_out;
    if (checkIn) {
      const t = new Date(checkIn).getTime();
      if (!isNaN(t) && t > 0) return t;
    }
    const idStr = String(b.booking_id || b.id || "");
    const match = idStr.match(/\d+/);
    if (match) {
      return parseInt(match[0], 10);
    }
    return 0;
  };

  // Table 1: Active & Upcoming Bookings (Pending, Confirmed/Booked, Checked-in, Cancellation Requests)
  const activeBookings = activeBookingsData
    .filter((b) => {
      const bStatus = (b.booking_status || b.status || "confirmed").toLowerCase().replace(/_/g, " ").trim();
      if (bStatus === "checked out" || bStatus === "cancelled" || bStatus === "canceled") {
        return false;
      }

      const idStr = String(b.booking_id || b.id || "").toLowerCase();
      const nameStr = String(b.guest_name || b.customer_name || "").toLowerCase();
      const phoneStr = String(b.guest_phone || b.customer_phone || b.phone || "");
      const roomStr = formatRoomNumbers(b).toLowerCase();
      const query = activeSearchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        idStr.includes(query) ||
        nameStr.includes(query) ||
        phoneStr.includes(query) ||
        roomStr.includes(query);

      if (!matchesSearch) return false;

      if (activeStatusFilter === "departures") {
        return isTodayDeparture(b);
      }

      const pStatus = getPaymentStatus(b).toLowerCase().replace(/_/g, " ").trim();
      const cleanActiveFilter = activeStatusFilter.toLowerCase().replace(/_/g, " ").trim();
      const matchesStatus =
        activeStatusFilter === "all" ||
        bStatus === cleanActiveFilter ||
        pStatus === cleanActiveFilter;

      return matchesStatus;
    })
    .sort((a, b) => getBookingSortValue(b) - getBookingSortValue(a));

  // Table 2: Past / History Bookings (Checked Out & Cancelled)
  const pastBookings = pastBookingsData
    .filter((b) => {
      const bStatus = (b.booking_status || b.status || "").toLowerCase().replace(/_/g, " ").trim();
      if (bStatus !== "checked out" && bStatus !== "cancelled" && bStatus !== "canceled") {
        return false;
      }

      const idStr = String(b.booking_id || b.id || "").toLowerCase();
      const nameStr = String(b.guest_name || b.customer_name || "").toLowerCase();
      const phoneStr = String(b.guest_phone || b.customer_phone || b.phone || "");
      const roomStr = formatRoomNumbers(b).toLowerCase();
      const query = pastSearchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        idStr.includes(query) ||
        nameStr.includes(query) ||
        phoneStr.includes(query) ||
        roomStr.includes(query);

      const pStatus = getPaymentStatus(b).toLowerCase().replace(/_/g, " ").trim();
      const cleanPastFilter = pastStatusFilter.toLowerCase().replace(/_/g, " ").trim();
      const matchesStatus =
        pastStatusFilter === "all" ||
        bStatus === cleanPastFilter ||
        pStatus === cleanPastFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => getBookingSortValue(b) - getBookingSortValue(a));

  const allCustomers = getAllCustomers();

  const nameSuggestions = (walkinForm.guest_name || "").trim().length >= 1 && showNameSuggestions
    ? allCustomers.filter((c) =>
        (c.name || "").toLowerCase().includes(walkinForm.guest_name.toLowerCase().trim())
      ).slice(0, 6)
    : [];

  const phoneSuggestions = (walkinForm.guest_phone || "").trim().length >= 2 && showPhoneSuggestions
    ? allCustomers.filter((c) =>
        (c.phone || "").includes(walkinForm.guest_phone.trim())
      ).slice(0, 6)
    : [];


  return (
    <PageContainer>
      <HeaderBar>
        <div className="title-group">
          <h2>Room Bookings Management</h2>
          <p>Manage reservations, walk-in check-ins, record payments, and process guest cancellations.</p>
        </div>
        <div className="actions-group">
          <SecondaryButton onClick={() => handleExportCSV([...activeBookingsData, ...pastBookingsData], "All")}>
            <FaDownload /> Export All CSV
          </SecondaryButton>
          <PrimaryButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEditingBookingId(null);
              setWalkinForm(initialWalkinState);
              setWalkinActiveTab("individual");
              setIsWalkinOpen(true);
            }}
          >
            <FaPlus /> + New Walk-in Booking
          </PrimaryButton>
        </div>
      </HeaderBar>

      {/* ========================================================================= */}
      {/* 1. ACTIVE & UPCOMING BOOKINGS TABLE (Pending & Before Checkout)          */}
      {/* ========================================================================= */}
      <SectionCard>
        <SectionHeader>
          <div className="section-title-group">
            <div className="icon-badge">
              <FaBed />
            </div>
            <div className="title-texts">
              <h3>
                Active & Upcoming Reservations
              </h3>
              <p>Current guest stays, upcoming arrivals, and pending check-ins</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span className="section-badge">
              {activeBookings.length} Active Booking{activeBookings.length === 1 ? "" : "s"}
            </span>
            <SecondaryButton
              style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem" }}
              onClick={() => handleExportCSV(activeBookings, "Active")}
            >
              <FaDownload /> Export Active
            </SecondaryButton>
          </div>
        </SectionHeader>

        <FilterToolbar>
          <div className="search-input-group">
            <FaSearch />
            <input
              type="text"
              placeholder="Search active stays by Guest Name, Phone, Room #, Booking ID..."
              value={activeSearchTerm}
              onChange={(e) => setActiveSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="tabs-group">
              {[
                { id: "all", label: "All Active" },
                { id: "confirmed", label: "Booked" },
                { id: "checked_in", label: "Checked In" },
                { id: "departures", label: "Departures (Today)" },
                { id: "pending", label: "Pending" },
                { id: "cancellation_requested", label: "Cancel Requests" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={activeStatusFilter === tab.id ? "active" : ""}
                  onClick={() => setActiveStatusFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </FilterToolbar>

        <TableCard>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest Details</th>
                  <th>Room(s)</th>
                  <th>Stay Dates</th>
                  <th>Tariff & Billing</th>
                  <th>Statuses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeLoading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "3rem" }}>
                      <FaSpinner className="spin" size={24} color="var(--primary-color)" />
                    </td>
                  </tr>
                ) : activeBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                      No active bookings found matching criteria.
                    </td>
                  </tr>
                ) : (
                  activeBookings.map((b) => {
                    const bStatus = b.booking_status || b.status || "confirmed";
                    const fin = calculateBookingFinancials(b);
                    const totalAmount = fin.totalPayable;
                    const paidAmount = fin.paid;
                    const discount = fin.discount;
                    const netPayable = fin.netPayable;
                    const balanceDue = fin.balanceDue;
                    const paymentStatus = getPaymentStatus(b);

                    return (
                      <tr key={b.booking_id || b.id}>
                        <td>
                          <strong style={{ color: "var(--primary-dark)", fontSize: "0.9rem" }}>
                            #{b.booking_id || b.id}
                          </strong>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                            {b.booking_source === "walk_in" ? "Walk-In" : "Online"}
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong style={{ color: "var(--text-primary)" }}>
                              {b.guest_name || b.customer_name || "Guest"}
                            </strong>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                              <FaPhone size={10} style={{ marginRight: "4px" }} />
                              {b.guest_phone || b.customer_phone || b.phone || "N/A"}
                            </div>
                            {b.guest_email && (
                              <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                                {b.guest_email}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong style={{ color: "var(--primary-color)" }}>
                              Room {formatRoomNumbers(b)}
                            </strong>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              {b.number_of_guests || 1} Guest(s)
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                            <div><strong>In:</strong> {formatDateDisplay(b.check_in)}</div>
                            <div style={{ color: "var(--text-muted)" }}>
                              <strong>Out:</strong> {formatDateDisplay(b.check_out)}
                            </div>
                            {b.guest_check_in && (
                              <div style={{ fontSize: "0.73rem", color: "#16A34A", marginTop: "2px", fontWeight: "600" }}>
                                <strong>Guest In:</strong> {formatDateDisplay(b.guest_check_in)}
                              </div>
                            )}
                            {b.guest_check_out && (
                              <div style={{ fontSize: "0.73rem", color: "#7C3AED", marginTop: "1px", fontWeight: "600" }}>
                                <strong>Guest Out:</strong> {formatDateDisplay(b.guest_check_out)}
                              </div>
                            )}
                            {getActiveOverstayInfo(b) && (
                              <OverstayBadge>
                                <FaClock size={10} /> {getActiveOverstayInfo(b)}
                              </OverstayBadge>
                            )}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <strong style={{ color: "var(--primary-dark)", fontSize: "0.95rem" }}>
                              ₹{totalAmount}
                            </strong>
                            {discount > 0 && (
                              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                                - Disc: ₹{discount}
                              </div>
                            )}
                            <div style={{ fontSize: "0.74rem", color: "#15803D", fontWeight: "600" }}>
                              Paid: ₹{paidAmount}
                            </div>
                            {balanceDue > 0 && (
                              <div style={{ fontSize: "0.74rem", color: "#B91C1C", fontWeight: "700" }}>
                                Bal: ₹{balanceDue}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <StatusPill $status={bStatus}>{getBookingStatusLabel(bStatus)}</StatusPill>
                            <StatusPill $status={paymentStatus}>{paymentStatus.replace("_", " ")}</StatusPill>
                            {b.cancellation_reason && (
                              <div style={{ fontSize: "0.7rem", color: "#DC2626", fontStyle: "italic", maxWidth: "140px" }}>
                                {b.cancellation_reason}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <ActionButtonsGroup>
                            <button onClick={() => setSelectedBooking(b)} title="View Details">
                              <FaEye /> View
                            </button>

                            <button onClick={() => handleOpenEditReservation(b)} title="Edit Reservation / Walk-in">
                              <FaEdit /> Edit
                            </button>

                            {balanceDue > 0 && (
                              <button
                                className="pay-btn"
                                onClick={() => {
                                  setPaymentModalBooking(b);
                                  setPaymentForm({
                                    amount: String(balanceDue),
                                    payment_type: "cash",
                                    transaction_id: "",
                                  });
                                }}
                                title="Record Payment"
                              >
                                <FaMoneyBillWave /> Pay
                              </button>
                            )}

                            <button
                              className="status-btn"
                              onClick={() => {
                                setStatusModalBooking(b);
                                setNewStatusVal(String(b.booking_status || b.status || "confirmed").replace(/_/g, " ").toLowerCase());
                              }}
                              title="Change Status"
                            >
                              <FaExchangeAlt /> Status
                            </button>

                            <button
                              className="invoice-btn"
                              onClick={() => setInvoiceBooking(b)}
                              title="Invoice & Receipt"
                            >
                              <FaFileInvoice /> Invoice
                            </button>

                            {bStatus === "cancellation_requested" && (
                              <>
                                <button
                                  className="approve"
                                  onClick={() => handleApproveCancellation(b.booking_id)}
                                  title="Approve Cancellation"
                                >
                                  <FaCheck /> Approve
                                </button>
                                <button
                                  className="reject"
                                  onClick={() => handleRejectCancellation(b.booking_id)}
                                  title="Reject Cancellation"
                                >
                                  <FaTimes /> Reject
                                </button>
                              </>
                            )}
                          </ActionButtonsGroup>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </TableCard>
      </SectionCard>

      {/* ========================================================================= */}
      {/* 2. PAST / HISTORY BOOKINGS TABLE (Checked Out & Cancelled)               */}
      {/* ========================================================================= */}
      <SectionCard>
        <SectionHeader $variant="past">
          <div className="section-title-group">
            <div className="icon-badge">
              <FaHistory />
            </div>
            <div className="title-texts">
              <h3>
                Past, Completed & Cancelled Bookings
              </h3>
              <p>Historical records of completed checkouts and cancelled reservations</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span className="section-badge">
              {pastBookings.length} Past Record{pastBookings.length === 1 ? "" : "s"}
            </span>
            <SecondaryButton
              style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem" }}
              onClick={() => handleExportCSV(pastBookings, "Past_History")}
            >
              <FaDownload /> Export History
            </SecondaryButton>
          </div>
        </SectionHeader>

        <FilterToolbar>
          <div className="search-input-group">
            <FaSearch />
            <input
              type="text"
              placeholder="Search past records by Guest Name, Phone, Room #, Booking ID..."
              value={pastSearchTerm}
              onChange={(e) => setPastSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="tabs-group">
              {[
                { id: "all", label: "All History" },
                { id: "checked_out", label: "Checked Out" },
                { id: "cancelled", label: "Cancelled" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={pastStatusFilter === tab.id ? "active" : ""}
                  onClick={() => setPastStatusFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="date-filter-group">
              <div className="date-box">
                <label>From:</label>
                <input
                  type="date"
                  value={pastFromDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPastFromDate(val);
                    fetchPastBookings(val, pastToDate);
                  }}
                  title="Filter by start date"
                />
              </div>

              <div className="date-box">
                <label>To:</label>
                <input
                  type="date"
                  value={pastToDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPastToDate(val);
                    fetchPastBookings(pastFromDate, val);
                  }}
                  title="Filter by end date"
                />
              </div>

              <button
                type="button"
                className="clear-date-btn"
                onClick={() => {
                  const todayStr = getTodayDateStr();
                  setPastFromDate(todayStr);
                  setPastToDate(todayStr);
                  fetchPastBookings(todayStr, todayStr);
                }}
                style={{
                  background: (pastFromDate === getTodayDateStr() && pastToDate === getTodayDateStr()) ? "var(--primary-color)" : "#FFFFFF",
                  color: (pastFromDate === getTodayDateStr() && pastToDate === getTodayDateStr()) ? "#FFFFFF" : "var(--text-secondary)",
                  borderColor: (pastFromDate === getTodayDateStr() && pastToDate === getTodayDateStr()) ? "var(--primary-color)" : "var(--border-light)",
                  fontWeight: "700"
                }}
                title="Filter for today's past bookings"
              >
                Today
              </button>

              {(pastFromDate || pastToDate) && (
                <button
                  type="button"
                  className="clear-date-btn"
                  onClick={() => {
                    setPastFromDate("");
                    setPastToDate("");
                    fetchPastBookings("", "");
                  }}
                  title="Show all past records without date restrictions"
                >
                  <FaTimes /> All Dates
                </button>
              )}
            </div>
          </div>
        </FilterToolbar>

        <TableCard>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest Details</th>
                  <th>Room(s)</th>
                  <th>Stay Period</th>
                  <th>Final Billing</th>
                  <th>Statuses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pastLoading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "3rem" }}>
                      <FaSpinner className="spin" size={24} color="var(--primary-color)" />
                    </td>
                  </tr>
                ) : pastBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                      No past or cancelled bookings found matching filters.
                    </td>
                  </tr>
                ) : (
                  pastBookings.map((b) => {
                    const bStatus = b.booking_status || b.status || "checked_out";
                    const fin = calculateBookingFinancials(b);
                    const totalAmount = fin.totalPayable;
                    const paidAmount = fin.paid;
                    const discount = fin.discount;
                    const balanceDue = fin.balanceDue;
                    const paymentStatus = getPaymentStatus(b);

                    return (
                      <tr key={b.booking_id || b.id}>
                        <td>
                          <strong style={{ color: "var(--primary-dark)", fontSize: "0.9rem" }}>
                            #{b.booking_id || b.id}
                          </strong>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                            {b.booking_source === "walk_in" ? "Walk-In" : "Online"}
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong style={{ color: "var(--text-primary)" }}>
                              {b.guest_name || b.customer_name || "Guest"}
                            </strong>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                              <FaPhone size={10} style={{ marginRight: "4px" }} />
                              {b.guest_phone || b.customer_phone || b.phone || "N/A"}
                            </div>
                            {b.guest_email && (
                              <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                                {b.guest_email}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong style={{ color: "var(--primary-color)" }}>
                              Room {formatRoomNumbers(b)}
                            </strong>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              {b.number_of_guests || 1} Guest(s)
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                            <div><strong>In:</strong> {formatDateDisplay(b.check_in)}</div>
                            <div style={{ color: "var(--text-muted)" }}>
                              <strong>Out:</strong> {formatDateDisplay(b.check_out)}
                            </div>
                            {b.guest_check_in && (
                              <div style={{ fontSize: "0.73rem", color: "#16A34A", marginTop: "2px", fontWeight: "600" }}>
                                <strong>Guest In:</strong> {formatDateDisplay(b.guest_check_in)}
                              </div>
                            )}
                            {b.guest_check_out && (
                              <div style={{ fontSize: "0.73rem", color: "#7C3AED", marginTop: "1px", fontWeight: "600" }}>
                                <strong>Guest Out:</strong> {formatDateDisplay(b.guest_check_out)}
                              </div>
                            )}
                            {getPastOverstayInfo(b) && (
                              <PastOverstayBadge>
                                <FaClock size={10} /> {getPastOverstayInfo(b)}
                              </PastOverstayBadge>
                            )}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <strong style={{ color: "var(--primary-dark)", fontSize: "0.95rem" }}>
                              ₹{totalAmount}
                            </strong>
                            {discount > 0 && (
                              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                                - Disc: ₹{discount}
                              </div>
                            )}
                            <div style={{ fontSize: "0.74rem", color: "#15803D", fontWeight: "600" }}>
                              Paid: ₹{paidAmount}
                            </div>
                            {balanceDue > 0 && bStatus !== "cancelled" && (
                              <div style={{ fontSize: "0.74rem", color: "#B91C1C", fontWeight: "700" }}>
                                Bal: ₹{balanceDue}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <StatusPill $status={bStatus}>{getBookingStatusLabel(bStatus)}</StatusPill>
                            <StatusPill $status={paymentStatus}>{paymentStatus.replace("_", " ")}</StatusPill>
                            {b.cancellation_reason && (
                              <div style={{ fontSize: "0.7rem", color: "#DC2626", fontStyle: "italic", maxWidth: "140px" }}>
                                {b.cancellation_reason}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <ActionButtonsGroup>
                            <button onClick={() => setSelectedBooking(b)} title="View Details">
                              <FaEye /> View
                            </button>

                            <button
                              className="invoice-btn"
                              onClick={() => setInvoiceBooking(b)}
                              title="Invoice & Receipt"
                            >
                              <FaFileInvoice /> Invoice
                            </button>

                            {balanceDue > 0 && bStatus !== "cancelled" && (
                              <button
                                className="pay-btn"
                                onClick={() => {
                                  setPaymentModalBooking(b);
                                  setPaymentForm({
                                    amount: String(balanceDue),
                                    payment_type: "cash",
                                    transaction_id: "",
                                  });
                                }}
                                title="Record Balance Payment"
                              >
                                <FaMoneyBillWave /> Pay Bal
                              </button>
                            )}

                            <button
                              className="status-btn"
                              onClick={() => {
                                setStatusModalBooking(b);
                                setNewStatusVal(String(b.booking_status || b.status || "checked out").replace(/_/g, " ").toLowerCase());
                              }}
                              title="Update Status"
                            >
                              <FaExchangeAlt /> Status
                            </button>
                          </ActionButtonsGroup>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </TableCard>
      </SectionCard>

      {/* 1. Walk-in Reservation Modal (PORTAL) */}
      {isWalkinOpen &&
        (() => {
          const totals = calculateWalkinTotals();

          return ReactDOM.createPortal(
            <ModalPortalOverlay onClick={() => setIsWalkinOpen(false)}>
              <ModalPortalContainer
                $maxWidth="1100px"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ background: "rgba(74, 30, 93, 0.1)", color: "var(--primary-color)", width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {editingBookingId ? <FaEdit size={18} /> : <FaConciergeBell size={18} />}
                    </div>
                    <div>
                      <h3 style={{ margin: 0 }}>
                        {editingBookingId ? `Edit Reservation #${editingBookingId}` : "New Walk-in Reservation"}
                      </h3>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        {editingBookingId ? "Update guest details, company information, room assignments, dining charges & billing" : "Multi-tab check-in, live room matrix, dining charges & billing"}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => { setIsWalkinOpen(false); setEditingBookingId(null); }}>✕</button>
                </div>

                {/* 4 Tabs Bar */}
                <div style={{ padding: "1.25rem 1.75rem 0" }}>
                  <WalkinTabsContainer>
                    <WalkinTabBtn
                      type="button"
                      $active={walkinActiveTab === "individual"}
                      onClick={() => setWalkinActiveTab("individual")}
                    >
                      <FaUser /> 1. Guest Details
                    </WalkinTabBtn>
                    <WalkinTabBtn
                      type="button"
                      $active={walkinActiveTab === "company"}
                      onClick={() => setWalkinActiveTab("company")}
                    >
                      <FaBuilding /> 2. Company Info
                    </WalkinTabBtn>
                    <WalkinTabBtn
                      type="button"
                      $active={walkinActiveTab === "rooms"}
                      onClick={() => setWalkinActiveTab("rooms")}
                    >
                      <FaBed /> 3. Room Details
                      {walkinForm.selected_rooms.length > 0 && (
                        <span className="badge">{walkinForm.selected_rooms.length}</span>
                      )}
                    </WalkinTabBtn>
                    <WalkinTabBtn
                      type="button"
                      $active={walkinActiveTab === "addons" || walkinActiveTab === "food"}
                      onClick={() => setWalkinActiveTab("addons")}
                    >
                      <FaBoxes /> 4. Extra Add-ons
                    </WalkinTabBtn>
                  </WalkinTabsContainer>
                </div>

                <form onSubmit={handleCreateOrUpdateWalkin}>
                  <div className="modal-body" style={{ paddingTop: 0 }}>
                    {/* TAB 1: INDIVIDUAL / GUEST DETAILS */}
                    {walkinActiveTab === "individual" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                      >
                        <div className="form-row">
                          <div className="form-group" style={{ position: "relative" }}>
                            <label>Guest Full Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ramesh Kumar"
                              value={walkinForm.guest_name}
                              onFocus={() => setShowNameSuggestions(true)}
                              onBlur={() => setTimeout(() => setShowNameSuggestions(false), 250)}
                              onChange={(e) => {
                                setWalkinForm({ ...walkinForm, guest_name: e.target.value });
                                setShowNameSuggestions(true);
                              }}
                            />
                            {nameSuggestions.length > 0 && (
                              <SuggestionDropdown>
                                <div className="suggestion-header">
                                  <span>Matching Registered Guests ({nameSuggestions.length})</span>
                                  <span>Click to Auto-fill</span>
                                </div>
                                {nameSuggestions.map((cust, idx) => (
                                  <div
                                    key={idx}
                                    className="suggestion-item"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      handleSelectCustomer(cust);
                                    }}
                                  >
                                    <div className="main-line">
                                      <span className="name"><FaUser /> {cust.name || "Guest"}</span>
                                      {cust.phone && <span className="phone"><FaPhone /> {cust.phone}</span>}
                                    </div>
                                    <div className="sub-line">
                                      {cust.customer_id && <span>ID: <strong>{cust.customer_id}</strong></span>}
                                      {cust.email && <span>Email: {cust.email}</span>}
                                      {cust.id_proof_number && <span>{cust.id_proof_type || "ID"}: {cust.id_proof_number}</span>}
                                      {cust.address && <span>Addr: {cust.address}</span>}
                                    </div>
                                  </div>
                                ))}
                              </SuggestionDropdown>
                            )}
                          </div>
                          <div className="form-group" style={{ position: "relative" }}>
                            <label>Phone Number *</label>
                            <input
                              type="tel"
                              required
                              placeholder="10-digit mobile number"
                              value={walkinForm.guest_phone}
                              onFocus={() => setShowPhoneSuggestions(true)}
                              onBlur={() => setTimeout(() => setShowPhoneSuggestions(false), 250)}
                              onChange={(e) => {
                                setWalkinForm({ ...walkinForm, guest_phone: e.target.value });
                                setShowPhoneSuggestions(true);
                              }}
                            />
                            {phoneSuggestions.length > 0 && (
                              <SuggestionDropdown>
                                <div className="suggestion-header">
                                  <span>Matching Registered Guests ({phoneSuggestions.length})</span>
                                  <span>Click to Auto-fill</span>
                                </div>
                                {phoneSuggestions.map((cust, idx) => (
                                  <div
                                    key={idx}
                                    className="suggestion-item"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      handleSelectCustomer(cust);
                                    }}
                                  >
                                    <div className="main-line">
                                      <span className="name"><FaUser /> {cust.name || "Guest"}</span>
                                      {cust.phone && <span className="phone"><FaPhone /> {cust.phone}</span>}
                                    </div>
                                    <div className="sub-line">
                                      {cust.customer_id && <span>ID: <strong>{cust.customer_id}</strong></span>}
                                      {cust.email && <span>Email: {cust.email}</span>}
                                      {cust.id_proof_number && <span>{cust.id_proof_type || "ID"}: {cust.id_proof_number}</span>}
                                      {cust.address && <span>Addr: {cust.address}</span>}
                                    </div>
                                  </div>
                                ))}
                              </SuggestionDropdown>
                            )}
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              type="email"
                              placeholder="guest@example.com"
                              value={walkinForm.guest_email}
                              onChange={(e) => setWalkinForm({ ...walkinForm, guest_email: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Number of Guests</label>
                            <input
                              type="number"
                              min="1"
                              max="20"
                              value={walkinForm.number_of_guests}
                              onChange={(e) => setWalkinForm({ ...walkinForm, number_of_guests: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Guest Address / City</label>
                          <input
                            type="text"
                            placeholder="e.g. 12/4 Gandhi Road, Chennai - 600001"
                            value={walkinForm.guest_address}
                            onChange={(e) => setWalkinForm({ ...walkinForm, guest_address: e.target.value })}
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Check-in Date & Time *</label>
                            <input
                              type="datetime-local"
                              required
                              value={walkinForm.check_in}
                              onChange={(e) => setWalkinForm({ ...walkinForm, check_in: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Check-out Date & Time *</label>
                            <input
                              type="datetime-local"
                              required
                              value={walkinForm.check_out}
                              onChange={(e) => setWalkinForm({ ...walkinForm, check_out: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>ID Proof Type</label>
                            <select
                              value={walkinForm.id_proof_type}
                              onChange={(e) => setWalkinForm({ ...walkinForm, id_proof_type: e.target.value })}
                            >
                              <option value="Aadhar Card">Aadhaar Card</option>
                              <option value="Passport">Passport</option>
                              <option value="Driving License">Driving License</option>
                              <option value="Voter ID">Voter ID</option>
                              <option value="PAN Card">PAN Card</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>ID Proof Number</label>
                            <input
                              type="text"
                              placeholder="e.g. 1234 5678 9012"
                              value={walkinForm.id_proof_number}
                              onChange={(e) => setWalkinForm({ ...walkinForm, id_proof_number: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* ID Proof File Upload */}
                        <div className="form-group">
                          <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Upload ID Proof Document</span>
                            {walkinForm.id_proof_file && (
                              <span style={{ fontSize: "0.75rem", color: "#15803D", fontWeight: "700" }}>
                                <FaCheckCircle /> Document Uploaded
                              </span>
                            )}
                          </label>
                          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              onChange={handleIdProofUpload}
                              style={{ flex: 1 }}
                            />
                            {uploadingIdProof && (
                              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--primary-color)" }}>
                                <FaSpinner className="spin" /> Uploading...
                              </div>
                            )}
                            {walkinForm.id_proof_file && !uploadingIdProof && (
                              <button
                                type="button"
                                onClick={() => setWalkinForm({ ...walkinForm, id_proof_file: "" })}
                                style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", padding: "0.5rem 0.75rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}
                                title="Remove ID proof"
                              >
                                <FaTrash /> Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 2: COMPANY DETAILS */}
                    {walkinActiveTab === "company" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                      >
                        <div style={{ background: "var(--bg-subtle)", padding: "0.75rem 1rem", borderRadius: "10px", fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <FaBuilding color="var(--primary-color)" />
                          <span>Select an existing company from the dropdown or add a new corporate profile (Generates COM-XXXXX ID).</span>
                        </div>

                        {/* Company Selection Dropdown */}
                        <div className="form-group" style={{ background: "rgba(99, 102, 241, 0.04)", border: "1px solid rgba(99, 102, 241, 0.2)", padding: "0.85rem 1rem", borderRadius: "10px" }}>
                          <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                            <span style={{ fontWeight: "700", color: "var(--primary-color)", fontSize: "0.85rem" }}>
                              🏢 Select Registered Company
                            </span>
                            {walkinForm.company_id ? (
                              <span style={{ fontSize: "0.75rem", background: "var(--primary-color)", color: "#fff", padding: "2px 8px", borderRadius: "12px", fontWeight: "700" }}>
                                {walkinForm.company_id}
                              </span>
                            ) : walkinForm.company_name ? (
                              <span style={{ fontSize: "0.75rem", background: "#E0E7FF", color: "#4338CA", padding: "2px 8px", borderRadius: "12px", fontWeight: "600" }}>
                                New Company (Auto ID)
                              </span>
                            ) : null}
                          </label>
                          <select
                            value={walkinForm.company_id || (walkinForm.company_name ? "custom_entry" : "")}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (!val || val === "none") {
                                setWalkinForm({
                                  ...walkinForm,
                                  company_id: "",
                                  company_name: "",
                                  company_person: "",
                                  company_address: "",
                                  company_city: "",
                                  company_state: "",
                                  company_pincode: "",
                                  company_phone: "",
                                  company_gst: "",
                                });
                              } else if (val === "new" || val === "custom_entry") {
                                setWalkinForm({
                                  ...walkinForm,
                                  company_id: "",
                                  company_name: val === "new" ? "" : walkinForm.company_name,
                                  company_person: val === "new" ? "" : walkinForm.company_person,
                                  company_address: val === "new" ? "" : walkinForm.company_address,
                                  company_city: val === "new" ? "" : walkinForm.company_city,
                                  company_state: val === "new" ? "" : walkinForm.company_state,
                                  company_pincode: val === "new" ? "" : walkinForm.company_pincode,
                                  company_phone: val === "new" ? "" : walkinForm.company_phone,
                                  company_gst: val === "new" ? "" : walkinForm.company_gst,
                                });
                              } else {
                                const found = companiesList.find((c) => String(c.company_id) === String(val) || String(c.id) === String(val));
                                if (found) {
                                  setWalkinForm({
                                    ...walkinForm,
                                    company_id: found.company_id || found.id || "",
                                    company_name: found.company_name || "",
                                    company_person: found.contact_person || found.company_person || "",
                                    company_address: found.company_address || found.address || "",
                                    company_city: found.city || found.company_city || "",
                                    company_state: found.state || found.company_state || "",
                                    company_pincode: found.pincode || found.company_pincode || "",
                                    company_phone: found.phone || found.company_phone || "",
                                    company_gst: found.gst_no || found.company_gst || "",
                                  });
                                }
                              }
                            }}
                            style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontWeight: "500" }}
                          >
                            <option value="">-- None / Select Registered Company --</option>
                            <option value="new">+ Add New Company (New Profile)</option>
                            {companiesList.map((comp) => (
                              <option key={comp.company_id || comp.id} value={comp.company_id || comp.id}>
                                {comp.company_name} ({comp.company_id || comp.id})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Company Name</label>
                            <input
                              type="text"
                              placeholder="e.g. SMRFT Technologies Pvt Ltd"
                              value={walkinForm.company_name}
                              onChange={(e) => {
                                const newName = e.target.value;
                                // If user types, check if it matches an existing company
                                const match = companiesList.find(c => c.company_name?.toLowerCase() === newName.trim().toLowerCase());
                                setWalkinForm({
                                  ...walkinForm,
                                  company_name: newName,
                                  company_id: match ? (match.company_id || match.id) : (walkinForm.company_id && !match ? walkinForm.company_id : "")
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Contact Person / Authority</label>
                            <input
                              type="text"
                              placeholder="e.g. Anand Kumar (Manager)"
                              value={walkinForm.company_person}
                              onChange={(e) => setWalkinForm({ ...walkinForm, company_person: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Company Address</label>
                          <input
                            type="text"
                            placeholder="e.g. Tech Park, Tower B, Electronic City"
                            value={walkinForm.company_address}
                            onChange={(e) => setWalkinForm({ ...walkinForm, company_address: e.target.value })}
                          />
                        </div>

                        <div className="form-row" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              placeholder="e.g. Salem"
                              value={walkinForm.company_city}
                              onChange={(e) => setWalkinForm({ ...walkinForm, company_city: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>State</label>
                            <input
                              type="text"
                              placeholder="e.g. Tamil Nadu"
                              value={walkinForm.company_state}
                              onChange={(e) => setWalkinForm({ ...walkinForm, company_state: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Pincode</label>
                            <input
                              type="text"
                              placeholder="e.g. 636007"
                              value={walkinForm.company_pincode}
                              onChange={(e) => setWalkinForm({ ...walkinForm, company_pincode: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Company Phone Number</label>
                            <input
                              type="tel"
                              placeholder="e.g. 0427-2444555 / 9876543210"
                              value={walkinForm.company_phone}
                              onChange={(e) => setWalkinForm({ ...walkinForm, company_phone: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>GST Number (GSTIN)</label>
                            <input
                              type="text"
                              placeholder="e.g. 33AAAAA0000A1Z5"
                              value={walkinForm.company_gst}
                              onChange={(e) => setWalkinForm({ ...walkinForm, company_gst: e.target.value.toUpperCase() })}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 3: ROOM SELECTION & AVAILABILITY MODAL TRIGGER */}
                    {walkinActiveTab === "rooms" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-subtle)", padding: "1rem 1.25rem", borderRadius: "12px", border: "1px solid var(--border-light)", flexWrap: "wrap", gap: "0.75rem" }}>
                          <div>
                            <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--primary-dark)" }}>
                              Stay Duration: {totals.nights} Night(s)
                            </div>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                              {formatDateDisplay(walkinForm.check_in)} → {formatDateDisplay(walkinForm.check_out)}
                            </div>
                          </div>
                          <PrimaryButton
                            type="button"
                            onClick={handleOpenRoomSelectionModal}
                            style={{ padding: "0.6rem 1.1rem", fontSize: "0.82rem" }}
                          >
                            <FaLayerGroup /> Choose Rooms in Availability Matrix
                          </PrimaryButton>
                        </div>

                        <div>
                          <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--primary-dark)", marginBottom: "0.5rem", display: "block" }}>
                            Selected Room(s) ({walkinForm.selected_rooms.length}):
                          </label>

                          {walkinForm.selected_rooms.length === 0 ? (
                            <div
                              onClick={handleOpenRoomSelectionModal}
                              style={{
                                border: "2px dashed var(--border-light)",
                                borderRadius: "12px",
                                padding: "2rem",
                                textAlign: "center",
                                cursor: "pointer",
                                background: "#FAFAFA",
                              }}
                            >
                              <FaBed size={28} color="var(--primary-color)" style={{ marginBottom: "0.5rem" }} />
                              <div style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--primary-dark)" }}>
                                No rooms selected yet
                              </div>
                              <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                Click here to open the Live Room Availability Matrix and select vacant rooms.
                              </p>
                            </div>
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {walkinForm.selected_rooms.map((rNum) => {
                                const rObj = roomsList.find((r) => String(r.room_number) === String(rNum));
                                const price = parseFloat(rObj?.price || rObj?.price_per_night || 1600);
                                return (
                                  <div
                                    key={rNum}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "0.75rem 1rem",
                                      background: "#FFFFFF",
                                      border: "1px solid var(--border-light)",
                                      borderRadius: "10px",
                                      boxShadow: "var(--shadow-sm)",
                                    }}
                                  >
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.12)", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "0.85rem" }}>
                                        #{rNum}
                                      </div>
                                      <div>
                                        <div style={{ fontWeight: "700", fontSize: "0.88rem" }}>
                                          Room {rNum} ({rObj?.room_type || "Deluxe Suite"})
                                        </div>
                                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                          ₹{price} / night × {totals.nights} night(s)
                                        </div>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                      <div style={{ fontWeight: "800", color: "var(--primary-dark)", fontSize: "0.95rem" }}>
                                        ₹{price * totals.nights}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => toggleRoomSelection(rNum)}
                                        style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "0.75rem" }}
                                        title="Remove room"
                                      >
                                        <FaTimes />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                              <div style={{ textAlign: "right", marginTop: "0.25rem", fontSize: "0.85rem", fontWeight: "700", color: "var(--primary-dark)" }}>
                                Total Room Tariff: ₹{totals.roomTotal}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 4: EXTRA ADD-ONS (FOOD & DINING, AMENITIES, OTHERS) */}
                    {(walkinActiveTab === "addons" || walkinActiveTab === "food") && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                      >
                        {/* Section 1: Food and Dining */}
                        <div style={{ background: "#FFFFFF", border: "1px solid var(--border-light)", borderRadius: "12px", padding: "1.1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.6rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div style={{ background: "rgba(245, 158, 11, 0.12)", color: "#D97706", width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FaUtensils size={14} />
                              </div>
                              <span style={{ fontWeight: "700", color: "var(--primary-dark)", fontSize: "0.92rem" }}>
                                Food and Dining
                              </span>
                            </div>
                            <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#D97706", background: "#FEF3C7", padding: "3px 8px", borderRadius: "6px" }}>
                              Food Total: ₹{totals.foodTotal}
                            </span>
                          </div>

                          <div className="form-group" style={{ marginBottom: "0.85rem" }}>
                            <label>Dining & Service Location Option *</label>
                            <select
                              value={walkinForm.food_service_type}
                              onChange={(e) => setWalkinForm({ ...walkinForm, food_service_type: e.target.value })}
                            >
                              <option value="Room Service">Room Service</option>
                              <option value="Restaurant AC">Restaurant AC</option>
                              <option value="Restaurant Non AC">Restaurant Non AC</option>
                              <option value="Food Charges">Food Charges</option>
                            </select>
                          </div>

                          {/* Food Items Matrix */}
                          <div style={{ border: "1px solid var(--border-light)", borderRadius: "10px", overflow: "hidden", marginBottom: "0.85rem" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                              <thead>
                                <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border-light)", textAlign: "left" }}>
                                  <th style={{ padding: "0.6rem 0.85rem" }}>Meal / Category</th>
                                  <th style={{ padding: "0.6rem 0.85rem", width: "80px" }}>Qty / Count</th>
                                  <th style={{ padding: "0.6rem 0.85rem", width: "90px" }}>Rate (₹)</th>
                                  <th style={{ padding: "0.6rem 0.85rem" }}>Item Remarks</th>
                                  <th style={{ padding: "0.6rem 0.85rem", textAlign: "right", width: "90px" }}>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* Breakfast */}
                                <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                  <td style={{ padding: "0.6rem 0.85rem", fontWeight: "600" }}>🍳 Breakfast</td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_breakfast_count}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_breakfast_count: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_breakfast_rate}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_breakfast_rate: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="text"
                                      placeholder="e.g. Idli, Dosa, Coffee"
                                      value={walkinForm.food_breakfast_items}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_breakfast_items: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.85rem", textAlign: "right", fontWeight: "700" }}>
                                    ₹{(parseInt(walkinForm.food_breakfast_count, 10) || 0) * (parseFloat(walkinForm.food_breakfast_rate) || 0)}
                                  </td>
                                </tr>

                                {/* Lunch */}
                                <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                  <td style={{ padding: "0.6rem 0.85rem", fontWeight: "600" }}>🍲 Lunch</td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_lunch_count}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_lunch_count: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_lunch_rate}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_lunch_rate: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="text"
                                      placeholder="e.g. Veg Meals / Biryani"
                                      value={walkinForm.food_lunch_items}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_lunch_items: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.85rem", textAlign: "right", fontWeight: "700" }}>
                                    ₹{(parseInt(walkinForm.food_lunch_count, 10) || 0) * (parseFloat(walkinForm.food_lunch_rate) || 0)}
                                  </td>
                                </tr>

                                {/* Dinner */}
                                <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                  <td style={{ padding: "0.6rem 0.85rem", fontWeight: "600" }}>🍛 Dinner</td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_dinner_count}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_dinner_count: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_dinner_rate}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_dinner_rate: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="text"
                                      placeholder="e.g. Chapati, Paneer Gravy"
                                      value={walkinForm.food_dinner_items}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_dinner_items: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.85rem", textAlign: "right", fontWeight: "700" }}>
                                    ₹{(parseInt(walkinForm.food_dinner_count, 10) || 0) * (parseFloat(walkinForm.food_dinner_rate) || 0)}
                                  </td>
                                </tr>

                                {/* Snacks */}
                                <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                  <td style={{ padding: "0.6rem 0.85rem", fontWeight: "600" }}>🥪 Snacks</td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_snacks_count}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_snacks_count: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_snacks_rate}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_snacks_rate: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="text"
                                      placeholder="e.g. Pakoda, Sandwich"
                                      value={walkinForm.food_snacks_items}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_snacks_items: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.85rem", textAlign: "right", fontWeight: "700" }}>
                                    ₹{(parseInt(walkinForm.food_snacks_count, 10) || 0) * (parseFloat(walkinForm.food_snacks_rate) || 0)}
                                  </td>
                                </tr>

                                {/* Tea / Coffee */}
                                <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                  <td style={{ padding: "0.6rem 0.85rem", fontWeight: "600" }}>☕ Tea / Coffee</td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_tea_coffee_count}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_tea_coffee_count: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      value={walkinForm.food_tea_coffee_rate}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_tea_coffee_rate: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.5rem" }}>
                                    <input
                                      type="text"
                                      placeholder="e.g. Masala Tea / Filter Coffee"
                                      value={walkinForm.food_tea_coffee_items}
                                      onChange={(e) => setWalkinForm({ ...walkinForm, food_tea_coffee_items: e.target.value })}
                                      style={{ width: "100%", padding: "4px 6px", borderRadius: "6px", border: "1px solid var(--border-light)" }}
                                    />
                                  </td>
                                  <td style={{ padding: "0.6rem 0.85rem", textAlign: "right", fontWeight: "700" }}>
                                    ₹{(parseInt(walkinForm.food_tea_coffee_count, 10) || 0) * (parseFloat(walkinForm.food_tea_coffee_rate) || 0)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Other / Custom Food & Service Charges (₹)</label>
                            <input
                              type="number"
                              min="0"
                              placeholder="0"
                              value={walkinForm.food_custom_charge}
                              onChange={(e) => setWalkinForm({ ...walkinForm, food_custom_charge: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Section 2: Amenities */}
                        <div style={{ background: "#FFFFFF", border: "1px solid var(--border-light)", borderRadius: "12px", padding: "1.1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.6rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div style={{ background: "rgba(59, 130, 246, 0.12)", color: "#2563EB", width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FaBed size={14} />
                              </div>
                              <span style={{ fontWeight: "700", color: "var(--primary-dark)", fontSize: "0.92rem" }}>
                                Amenities
                              </span>
                            </div>
                            <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#2563EB", background: "#EFF6FF", padding: "3px 8px", borderRadius: "6px" }}>
                              Amenities Total: ₹{totals.amenitiesTotal}
                            </span>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                            {/* Premium WiFi (200) */}
                            <div style={{ border: `1px solid ${walkinForm.addon_wifi ? "var(--primary-color)" : "var(--border-light)"}`, background: walkinForm.addon_wifi ? "rgba(74, 30, 93, 0.04)" : "#FAFAFA", borderRadius: "10px", padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem", transition: "all 0.2s ease" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "700", fontSize: "0.88rem", color: "var(--primary-dark)" }}>
                                  <FaWifi color="#2563EB" /> Premium WiFi
                                </div>
                                <div style={{ fontWeight: "800", color: "var(--primary-dark)", fontSize: "0.9rem" }}>
                                  ₹{walkinForm.addon_wifi ? (walkinForm.addon_wifi_price || 200) : 0}
                                </div>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.8rem", margin: 0 }}>
                                  <input
                                    type="checkbox"
                                    checked={walkinForm.addon_wifi}
                                    onChange={(e) => setWalkinForm({ ...walkinForm, addon_wifi: e.target.checked })}
                                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                                  />
                                  <span>Enable WiFi Access (₹200)</span>
                                </label>
                              </div>
                            </div>

                            {/* Extra Bed (1000) */}
                            <div style={{ border: "1px solid var(--border-light)", background: "#FAFAFA", borderRadius: "10px", padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "700", fontSize: "0.88rem", color: "var(--primary-dark)" }}>
                                  <FaBed color="#7C3AED" /> Extra Bed / Person
                                </div>
                                <div style={{ fontWeight: "800", color: "var(--primary-dark)", fontSize: "0.9rem" }}>
                                  ₹{totals.extraBedAmt}
                                </div>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <div style={{ flex: 1 }}>
                                  <input
                                    type="number"
                                    min="0"
                                    value={walkinForm.addon_extrabed_count}
                                    onChange={(e) => setWalkinForm({ ...walkinForm, addon_extrabed_count: e.target.value })}
                                    placeholder="Count (0)"
                                    style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                  />
                                </div>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                                  × ₹1,000 / bed
                                </span>
                              </div>
                            </div>

                            {/* Laundry - 0 initially */}
                            <div style={{ border: "1px solid var(--border-light)", background: "#FAFAFA", borderRadius: "10px", padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "700", fontSize: "0.88rem", color: "var(--primary-dark)" }}>
                                  <FaTshirt color="#059669" /> Laundry Service
                                </div>
                                <div style={{ fontWeight: "800", color: "var(--primary-dark)", fontSize: "0.9rem" }}>
                                  ₹{totals.laundryAmt}
                                </div>
                              </div>
                              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "0.5rem" }}>
                                <input
                                  type="number"
                                  min="0"
                                  value={walkinForm.addon_laundry_charge}
                                  onChange={(e) => setWalkinForm({ ...walkinForm, addon_laundry_charge: e.target.value })}
                                  placeholder="Charge ₹ (0)"
                                  style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                />
                                <input
                                  type="text"
                                  value={walkinForm.addon_laundry_remarks}
                                  onChange={(e) => setWalkinForm({ ...walkinForm, addon_laundry_remarks: e.target.value })}
                                  placeholder="e.g. 2 shirts, dry clean"
                                  style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                />
                              </div>
                            </div>

                            {/* Late Checkout - per hr */}
                            <div style={{ border: "1px solid var(--border-light)", background: "#FAFAFA", borderRadius: "10px", padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "700", fontSize: "0.88rem", color: "var(--primary-dark)" }}>
                                  <FaClock color="#DC2626" /> Late Checkout
                                </div>
                                <div style={{ fontWeight: "800", color: "var(--primary-dark)", fontSize: "0.9rem" }}>
                                  ₹{totals.lateCheckoutAmt}
                                </div>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <div style={{ flex: 1 }}>
                                  <input
                                    type="number"
                                    min="0"
                                    value={walkinForm.addon_latecheckout_hours}
                                    onChange={(e) => setWalkinForm({ ...walkinForm, addon_latecheckout_hours: e.target.value })}
                                    placeholder="Hours (0)"
                                    style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                  />
                                </div>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                                  × ₹{walkinForm.addon_latecheckout_rate || 250} / hr
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Others with Description */}
                        <div style={{ background: "#FFFFFF", border: "1px solid var(--border-light)", borderRadius: "12px", padding: "1.1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.6rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div style={{ background: "rgba(124, 58, 237, 0.12)", color: "#7C3AED", width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FaPlusSquare size={14} />
                              </div>
                              <span style={{ fontWeight: "700", color: "var(--primary-dark)", fontSize: "0.92rem" }}>
                                Others with Description
                              </span>
                            </div>
                            <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#7C3AED", background: "#F3E8FF", padding: "3px 8px", borderRadius: "6px" }}>
                              Others Total: ₹{totals.otherAddonsTotal}
                            </span>
                          </div>

                          <div className="form-row">
                            <div className="form-group" style={{ margin: 0 }}>
                              <label>Add-on Title / Service Name</label>
                              <input
                                type="text"
                                placeholder="e.g. Airport Transfer / Room Floral Decor"
                                value={walkinForm.addon_other_name}
                                onChange={(e) => setWalkinForm({ ...walkinForm, addon_other_name: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ margin: 0 }}>
                              <label>Amount (₹)</label>
                              <input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={walkinForm.addon_other_amount}
                                onChange={(e) => setWalkinForm({ ...walkinForm, addon_other_amount: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="form-group" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
                            <label>Description & Notes</label>
                            <input
                              type="text"
                              placeholder="e.g. Sedan airport pickup scheduled at 2:00 PM"
                              value={walkinForm.addon_other_description}
                              onChange={(e) => setWalkinForm({ ...walkinForm, addon_other_description: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Total Extra Add-ons Summary Strip */}
                        <div style={{ background: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)", border: "1px solid #E9D5FF", padding: "0.75rem 1rem", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: "700", color: "var(--primary-dark)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                            <FaBoxes /> Total Extra Add-ons (Food + Amenities + Others):
                          </span>
                          <span style={{ fontWeight: "800", color: "var(--primary-color)", fontSize: "1.05rem" }}>
                            ₹{totals.addonsTotal}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* LIVE BILLING & GST BREAKDOWN BOX (Always shown at bottom) */}
                    <BillingSummaryBox>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E9D5FF", paddingBottom: "0.5rem" }}>
                        <span style={{ fontWeight: "700", color: "var(--primary-dark)", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <FaReceipt /> Billing & Tax Breakdown
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          Rooms: {walkinForm.selected_rooms.length} | Nights: {totals.nights}
                        </span>
                      </div>

                      {/* Bill Type Dropdown Selector */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFFFFF", padding: "0.55rem 0.85rem", borderRadius: "8px", border: "1px solid #DDD6FE" }}>
                        <label style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--primary-dark)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>Bill Type:</span>
                          <span style={{ fontSize: "0.72rem", fontWeight: "500", color: "var(--text-muted)" }}>
                            ({walkinForm.bill_type === "Net Rate" ? "GST Included in Rent" : "GST Added on Subtotal"})
                          </span>
                        </label>
                        <select
                          value={walkinForm.bill_type || "Rack"}
                          onChange={(e) => setWalkinForm({ ...walkinForm, bill_type: e.target.value })}
                          style={{ padding: "4px 10px", borderRadius: "6px", border: "1.5px solid var(--primary-color)", fontWeight: "700", fontSize: "0.82rem", background: "rgba(99, 102, 241, 0.06)", color: "var(--primary-dark)", cursor: "pointer" }}
                        >
                          <option value="Rack">Rack (GST 5% Additional)</option>
                          <option value="Net Rate">Net Rate (GST Included within Subtotal)</option>
                        </select>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.82rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Room Tariff:</span>
                          <strong>₹{totals.roomTotal.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Food & Dining:</span>
                          <strong>₹{totals.foodTotal.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Amenities:</span>
                          <strong>₹{totals.amenitiesTotal.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Other Add-ons:</span>
                          <strong>₹{totals.otherAddonsTotal.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #E9D5FF", paddingTop: "0.3rem" }}>
                          <span>Subtotal:</span>
                          <strong>₹{totals.subtotal.toFixed(2)}</strong>
                        </div>
                        {totals.billType === "Net Rate" && (
                          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #E9D5FF", paddingTop: "0.3rem", color: "var(--text-secondary)" }}>
                            <span>Taxable Base:</span>
                            <strong>₹{totals.taxableAmount.toFixed(2)}</strong>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--primary-color)", borderTop: totals.billType === "Net Rate" ? "none" : "1px dashed #E9D5FF", paddingTop: totals.billType === "Net Rate" ? 0 : "0.3rem" }}>
                          <span>CGST (2.5%):</span>
                          <strong>{totals.billType === "Net Rate" ? "" : "+"}₹{totals.cgst.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--primary-color)" }}>
                          <span>SGST (2.5%):</span>
                          <strong>{totals.billType === "Net Rate" ? "" : "+"}₹{totals.sgst.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gridColumn: "1 / -1", borderTop: "1px dashed #E9D5FF", paddingTop: "0.3rem" }}>
                          <span>Gross Total {totals.billType === "Net Rate" ? "(Inclusive)" : ""}:</span>
                          <strong>₹{totals.grossTotal.toFixed(2)}</strong>
                        </div>
                        {totals.roundOff !== 0 && (
                          <div style={{ display: "flex", justifyContent: "space-between", gridColumn: "1 / -1", color: totals.roundOff > 0 ? "#15803D" : "#DC2626" }}>
                            <span>Round Off:</span>
                            <strong>{totals.roundOff >= 0 ? `+₹${totals.roundOff.toFixed(2)}` : `-₹${Math.abs(totals.roundOff).toFixed(2)}`}</strong>
                          </div>
                        )}
                      </div>

                      {/* Discount inputs */}
                      <div className="form-row" style={{ marginTop: "0.25rem" }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: "0.78rem" }}>Discount Amount (₹)</label>
                          <input
                            type="number"
                            min="0"
                            value={walkinForm.discount_amount}
                            onChange={(e) => setWalkinForm({ ...walkinForm, discount_amount: e.target.value })}
                            placeholder="0"
                          />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: "0.78rem" }}>Discount Remarks</label>
                          <input
                            type="text"
                            value={walkinForm.discount_remarks}
                            onChange={(e) => setWalkinForm({ ...walkinForm, discount_remarks: e.target.value })}
                            placeholder="e.g. Corporate / Seasonal discount"
                          />
                        </div>
                      </div>

                      {/* Payment inputs */}
                      <div className="form-row" style={{ marginTop: "0.25rem" }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: "0.78rem" }}>Amount Paid Now (₹) *</label>
                          <input
                            type="number"
                            min="0"
                            required
                            value={walkinForm.amount_paid}
                            onChange={(e) => setWalkinForm({ ...walkinForm, amount_paid: e.target.value })}
                            placeholder="0"
                          />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: "0.78rem" }}>Payment Method</label>
                          <select
                            value={walkinForm.payment_method}
                            onChange={(e) => setWalkinForm({ ...walkinForm, payment_method: e.target.value })}
                          >
                            <option value="cash">Cash Settlement</option>
                            <option value="upi">UPI / QR Code</option>
                            <option value="card">Debit / Credit Card</option>
                            <option value="online">Online Transfer</option>
                          </select>
                        </div>
                      </div>

                      {/* Net Due and Balance Bar */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", marginTop: "0.4rem", border: "1px solid #DDD6FE" }}>
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                            Net Payable
                          </div>
                          <div style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--primary-dark)" }}>
                            ₹{totals.netAmount.toFixed(2)}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                            Balance Due
                          </div>
                          <div style={{ fontSize: "1.1rem", fontWeight: "800", color: totals.balanceRemaining > 0 ? "#DC2626" : "#15803D" }}>
                            ₹{totals.balanceRemaining.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </BillingSummaryBox>
                  </div>

                  <div className="modal-footer" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {walkinActiveTab !== "individual" && (
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            if (walkinActiveTab === "addons" || walkinActiveTab === "food") setWalkinActiveTab("rooms");
                            else if (walkinActiveTab === "rooms") setWalkinActiveTab("company");
                            else if (walkinActiveTab === "company") setWalkinActiveTab("individual");
                          }}
                        >
                          ← Previous Tab
                        </button>
                      )}
                      {(walkinActiveTab !== "addons" && walkinActiveTab !== "food") && (
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            if (walkinActiveTab === "individual") setWalkinActiveTab("company");
                            else if (walkinActiveTab === "company") setWalkinActiveTab("rooms");
                            else if (walkinActiveTab === "rooms") setWalkinActiveTab("addons");
                          }}
                        >
                          Next Tab →
                        </button>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button type="button" className="btn-secondary" onClick={() => { setIsWalkinOpen(false); setEditingBookingId(null); }}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        {editingBookingId ? "Update Reservation" : "Confirm & Check In Guest"}
                      </button>
                    </div>
                  </div>
                </form>
              </ModalPortalContainer>
            </ModalPortalOverlay>,
            document.body
          );
        })()}

      {/* 1.1 ROOM AVAILABILITY SELECTION MODAL (SUB-PORTAL) */}
      {isRoomSelectModalOpen &&
        ReactDOM.createPortal(
          <ModalPortalOverlay onClick={() => setIsRoomSelectModalOpen(false)}>
            <ModalPortalContainer
              $maxWidth="880px"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3 style={{ margin: 0 }}>Room Availability Matrix</h3>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Select vacant rooms to add to this reservation. Booked, occupied, dirty, and maintenance rooms are locked.
                  </p>
                </div>
                <button onClick={() => setIsRoomSelectModalOpen(false)}>✕</button>
              </div>

              <div className="modal-body" style={{ gap: "1rem" }}>
                {/* Status Legend */}
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", background: "var(--bg-subtle)", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid var(--border-light)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10B981" }} />
                    <span style={{ color: "#065F46" }}>Vacant (Available to Book)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#3B82F6" }} />
                    <span style={{ color: "#1D4ED8" }}>Booked (Reserved - Disabled)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#EF4444" }} />
                    <span style={{ color: "#991B1B" }}>Occupied (Guest In-House - Disabled)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#F59E0B" }} />
                    <span style={{ color: "#92400E" }}>Dirty (Needs Cleaning - Disabled)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1F2937" }} />
                    <span style={{ color: "#1F2937" }}>Maintenance (Out of Service - Disabled)</span>
                  </div>
                </div>

                {loadingAvailability ? (
                  <div style={{ textAlign: "center", padding: "3rem" }}>
                    <FaSpinner className="spin" size={26} color="var(--primary-color)" />
                    <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Fetching real-time room statuses...
                    </div>
                  </div>
                ) : (
                  <RoomCardGrid>
                    {availabilityRooms.map((r) => {
                      const rNumStr = String(r.room_number);
                      const isSelected = walkinForm.selected_rooms.includes(rNumStr);
                      const isVacant = r.status === "vacant";
                      const isBooked = r.status === "booked";
                      const isDirty = r.status === "dirty";
                      const isOccupied = r.status === "occupied";
                      const isMaint = r.status === "maintenance";

                      let borderColor = "var(--border-light)";
                      let bgColor = "#FFFFFF";
                      let statusBg = "#ECFDF5";
                      let statusColor = "#10B981";
                      let statusLabel = "Vacant";

                      if (isBooked) {
                        borderColor = "#BFDBFE";
                        bgColor = "#EFF6FF";
                        statusBg = "#DBEAFE";
                        statusColor = "#2563EB";
                        statusLabel = "Booked";
                      } else if (isDirty) {
                        borderColor = "#FDE68A";
                        bgColor = "#FFFBEB";
                        statusBg = "#FEF3C7";
                        statusColor = "#D97706";
                        statusLabel = "Dirty (Cleaning)";
                      } else if (isOccupied) {
                        borderColor = "#FECACA";
                        bgColor = "#FEF2F2";
                        statusBg = "#FEE2E2";
                        statusColor = "#DC2626";
                        statusLabel = "Occupied";
                      } else if (isMaint) {
                        borderColor = "#E5E7EB";
                        bgColor = "#F3F4F6";
                        statusBg = "#E5E7EB";
                        statusColor = "#374151";
                        statusLabel = "Maintenance";
                      }

                      return (
                        <RoomStatusSelectCard
                          key={r.room_number}
                          $selected={isSelected}
                          $disabled={!isVacant}
                          $borderColor={borderColor}
                          $bgColor={bgColor}
                          $statusBg={statusBg}
                          $statusColor={statusColor}
                          onClick={() => {
                            if (isVacant) {
                              toggleRoomSelection(r.room_number);
                            } else {
                              toast.warning(`Room ${r.room_number} is ${r.status_label || statusLabel} and cannot be selected.`);
                            }
                          }}
                        >
                          <div className="room-header">
                            <span className="room-num">Room #{r.room_number}</span>
                            {isSelected && (
                              <span style={{ color: "var(--primary-color)", fontSize: "1rem" }}>
                                <FaCheckCircle />
                              </span>
                            )}
                          </div>
                          <div className="room-type">{r.room_type || "Deluxe Suite"}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                            <span className="room-price">₹{r.price || 1600}</span>
                            <span className="status-tag">
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: statusColor }} />
                              {statusLabel}
                            </span>
                          </div>
                        </RoomStatusSelectCard>
                      );
                    })}
                  </RoomCardGrid>
                )}
              </div>

              <div className="modal-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--primary-dark)" }}>
                  Selected: {walkinForm.selected_rooms.length} Room(s)
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setIsRoomSelectModalOpen(false)}
                  >
                    Confirm Room Selection ({walkinForm.selected_rooms.length})
                  </button>
                </div>
              </div>
            </ModalPortalContainer>
          </ModalPortalOverlay>,
          document.body
        )}

      {/* 2. Record Payment Modal (PORTAL) */}
      {paymentModalBooking &&
        ReactDOM.createPortal(
          <ModalPortalOverlay onClick={() => setPaymentModalBooking(null)}>
            <ModalPortalContainer
              $maxWidth="500px"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Record Payment</h3>
                <button onClick={() => setPaymentModalBooking(null)}>✕</button>
              </div>

              <form onSubmit={handleRecordPayment}>
                <div className="modal-body">
                  {(() => {
                    const fin = calculateBookingFinancials(paymentModalBooking);
                    return (
                      <div style={{ background: "var(--bg-subtle)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-light)", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                          <span>Booking ID:</span>
                          <strong>#{paymentModalBooking.booking_id}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                          <span>Guest Name:</span>
                          <strong>{paymentModalBooking.guest_name}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)", paddingTop: "0.3rem", borderTop: "1px dashed var(--border-light)" }}>
                          <span>Subtotal (Tariff + Add-ons):</span>
                          <strong>₹{fin.subtotal.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          <span>CGST (2.5%):</span>
                          <span>+₹{fin.cgst.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          <span>SGST (2.5%):</span>
                          <span>+₹{fin.sgst.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--primary-dark)", fontWeight: "600" }}>
                          <span>Total Tax (5% GST):</span>
                          <span>+₹{fin.totalTax.toFixed(2)}</span>
                        </div>
                        {fin.discount > 0 && (
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#DC2626" }}>
                            <span>Discount Applied:</span>
                            <span>-₹{fin.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: "700", color: "var(--primary-dark)", paddingTop: "0.3rem", borderTop: "1px dashed var(--border-light)" }}>
                          <span>Total Payable (incl. GST):</span>
                          <span>₹{fin.netPayable.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#15803D", fontWeight: "600" }}>
                          <span>Already Paid:</span>
                          <span>₹{fin.paid.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#DC2626", fontWeight: "800", marginTop: "0.2rem", paddingTop: "0.4rem", borderTop: "1px solid var(--border-light)" }}>
                          <span>Balance Remaining (incl. GST):</span>
                          <span>₹{fin.balanceDue.toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="form-group">
                    <label>Amount Received Now (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="Enter amount"
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    />
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.35rem" }}>
                      <button
                        type="button"
                        onClick={() => {
                          const fin = calculateBookingFinancials(paymentModalBooking);
                          setPaymentForm({ ...paymentForm, amount: String(fin.balanceDue > 0 ? fin.balanceDue.toFixed(2) : 0) });
                        }}
                        style={{
                          padding: "0.3rem 0.6rem",
                          fontSize: "0.75rem",
                          borderRadius: "6px",
                          border: "1px solid var(--border-light)",
                          background: "var(--bg-subtle)",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        Pay Full Balance
                      </button>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Payment Method</label>
                      <select
                        value={paymentForm.payment_type}
                        onChange={(e) => setPaymentForm({ ...paymentForm, payment_type: e.target.value })}
                      >
                        <option value="cash">Cash</option>
                        <option value="upi">UPI / QR</option>
                        <option value="card">Card</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Transaction ID / Ref (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. UPI-123456"
                        value={paymentForm.transaction_id}
                        onChange={(e) => setPaymentForm({ ...paymentForm, transaction_id: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setPaymentModalBooking(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Payment
                  </button>
                </div>
              </form>
            </ModalPortalContainer>
          </ModalPortalOverlay>,
          document.body
        )}

      {/* 3. Booking Details Modal (PORTAL) */}
      {selectedBooking &&
        ReactDOM.createPortal(
          <ModalPortalOverlay onClick={() => setSelectedBooking(null)}>
            <ModalPortalContainer
              $maxWidth="700px"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Reservation #{selectedBooking.booking_id || selectedBooking.id}</h3>
                <button onClick={() => setSelectedBooking(null)}>✕</button>
              </div>

              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", background: "var(--bg-subtle)", padding: "1.25rem", borderRadius: "12px" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      Guest Name
                    </span>
                    <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--primary-dark)" }}>
                      {selectedBooking.guest_name || "Guest"}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      Contact Phone
                    </span>
                    <div style={{ fontSize: "0.95rem", fontWeight: "600" }}>
                      {selectedBooking.guest_phone || selectedBooking.phone || "N/A"}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      Booked Room(s)
                    </span>
                    <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--primary-color)" }}>
                      Room {formatRoomNumbers(selectedBooking)}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      Status
                    </span>
                    <div>
                      <StatusPill $status={selectedBooking.booking_status || selectedBooking.status}>
                        {getBookingStatusLabel(selectedBooking.booking_status || selectedBooking.status)}
                      </StatusPill>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      Check-In Date
                    </span>
                    <div style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                      {formatDateDisplay(selectedBooking.check_in)}
                      {selectedBooking.guest_check_in && (
                        <div style={{ fontSize: "0.74rem", color: "#16A34A", fontWeight: "normal", marginTop: "2px" }}>
                          Actual: {formatDateDisplay(selectedBooking.guest_check_in)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      Check-Out Date
                    </span>
                    <div style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                      {formatDateDisplay(selectedBooking.check_out)}
                      {selectedBooking.guest_check_out ? (
                        <div style={{ fontSize: "0.74rem", color: "#7C3AED", fontWeight: "600", marginTop: "2px" }}>
                          Guest Out: {formatDateDisplay(selectedBooking.guest_check_out)}
                          {getPastOverstayInfo(selectedBooking) && (
                            <div>
                              <PastOverstayBadge>
                                <FaClock size={10} /> {getPastOverstayInfo(selectedBooking)}
                              </PastOverstayBadge>
                            </div>
                          )}
                        </div>
                      ) : getActiveOverstayInfo(selectedBooking) ? (
                        <div>
                          <OverstayBadge>
                            <FaClock size={10} /> {getActiveOverstayInfo(selectedBooking)}
                          </OverstayBadge>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      ID Proof
                    </span>
                    <div style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                      {selectedBooking.id_proof_type || "Aadhaar"}: {selectedBooking.id_proof_number || "Verified"}
                      {selectedBooking.id_proof_file && selectedBooking.id_proof_file !== "manual_entry" && (
                        <div style={{ marginTop: "2px", fontSize: "0.75rem", color: "#15803D" }}>
                          ✓ Document File Uploaded
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      Payment Breakdown
                    </span>
                    <div style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--primary-dark)" }}>
                      Total: ₹{getBookingAmount(selectedBooking)} (Paid: ₹{getAmountPaid(selectedBooking)})
                    </div>
                    {(() => {
                      const pd = parsePaymentDetails(selectedBooking);
                      if (pd.date || pd.method) {
                        return (
                          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                            {pd.method ? `Mode: ${pd.method.toUpperCase()}` : ""} {pd.date ? `• ${pd.date}` : ""}
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>

                {/* Detailed Billing Summary Breakdown */}
                {(() => {
                  const fin = calculateBookingFinancials(selectedBooking);
                  return (
                    <div style={{ background: "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)", border: "1px solid #E9D5FF", padding: "1rem 1.25rem", borderRadius: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ color: "var(--primary-dark)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                          <FaReceipt /> Billing & Financial Summary
                        </strong>
                        <span style={{ fontSize: "0.75rem", background: fin.billType === "Net Rate" ? "#DBEAFE" : "#E0E7FF", color: fin.billType === "Net Rate" ? "#1E40AF" : "#4338CA", padding: "2px 8px", borderRadius: "12px", fontWeight: "700" }}>
                          {fin.billType === "Net Rate" ? "Net Rate (GST Inclusive)" : "Rack Rate (GST Additional)"}
                        </span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1.5rem", marginTop: "0.6rem", fontSize: "0.82rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--text-secondary)" }}>Subtotal:</span>
                          <strong>₹{fin.subtotal.toFixed(2)}</strong>
                        </div>
                        {fin.billType === "Net Rate" && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Taxable Base:</span>
                            <strong>₹{fin.taxableAmount.toFixed(2)}</strong>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--text-secondary)" }}>CGST (2.5%):</span>
                          <span>{fin.billType === "Net Rate" ? "" : "+"}₹{fin.cgst.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--text-secondary)" }}>SGST (2.5%):</span>
                          <span>{fin.billType === "Net Rate" ? "" : "+"}₹{fin.sgst.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gridColumn: "1 / -1", borderTop: "1px dashed #E9D5FF", paddingTop: "0.3rem" }}>
                          <span>Gross Total {fin.billType === "Net Rate" ? "(Inclusive)" : ""}:</span>
                          <strong>₹{fin.grossTotal.toFixed(2)}</strong>
                        </div>
                        {fin.discount > 0 && (
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#DC2626", gridColumn: "1 / -1" }}>
                            <span>Discount {selectedBooking.discount_remarks ? `(${selectedBooking.discount_remarks})` : ""}:</span>
                            <strong>-₹{fin.discount.toFixed(2)}</strong>
                          </div>
                        )}
                        {fin.roundOff !== 0 && (
                          <div style={{ display: "flex", justifyContent: "space-between", gridColumn: "1 / -1", color: fin.roundOff > 0 ? "#15803D" : "#DC2626" }}>
                            <span>Round Off:</span>
                            <strong>{fin.roundOff >= 0 ? `+₹${fin.roundOff.toFixed(2)}` : `-₹${Math.abs(fin.roundOff).toFixed(2)}`}</strong>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #D8B4FE", paddingTop: "0.35rem", gridColumn: "1 / -1" }}>
                          <strong>Net Total Payable:</strong>
                          <strong style={{ color: "var(--primary-dark)", fontSize: "0.95rem" }}>
                            ₹{fin.netPayable.toFixed(2)}
                          </strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "#15803D" }}>
                          <span>Amount Received (Paid):</span>
                          <strong>₹{fin.paid.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: fin.balanceDue > 0 ? "#DC2626" : "#15803D" }}>
                          <span>Balance Outstanding:</span>
                          <strong>
                            ₹{fin.balanceDue.toFixed(2)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Company details section if present */}
                {selectedBooking.company_details && selectedBooking.company_details.company_name && (
                  <div style={{ background: "#FDF2F8", border: "1px solid #FBCFE8", padding: "0.85rem 1.1rem", borderRadius: "10px" }}>
                    <strong style={{ color: "#9D174D", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "5px" }}>
                      <FaBuilding /> Corporate Details
                    </strong>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.4rem", fontSize: "0.8rem" }}>
                      <div><strong>Company:</strong> {selectedBooking.company_details.company_name}</div>
                      <div><strong>Contact Person:</strong> {selectedBooking.company_details.contact_person || "—"}</div>
                      <div><strong>GST No:</strong> {selectedBooking.company_details.gst_no || "—"}</div>
                      <div><strong>Phone:</strong> {selectedBooking.company_details.phone || "—"}</div>
                    </div>
                  </div>
                )}

                {/* Extra Add-ons & Amenities section if present */}
                {(() => {
                  let extraAddonsList = [];
                  if (Array.isArray(selectedBooking.extra_addons)) {
                    extraAddonsList = selectedBooking.extra_addons;
                  } else if (typeof selectedBooking.extra_addons === "string") {
                    try {
                      extraAddonsList = JSON.parse(selectedBooking.extra_addons);
                      if (!Array.isArray(extraAddonsList)) extraAddonsList = [];
                    } catch (e) {
                      extraAddonsList = [];
                    }
                  }

                  const hasFoodDetails = selectedBooking.food_details && (selectedBooking.food_details.total_food_charge > 0 || selectedBooking.food_details.total_food_amount > 0);
                  const hasAddons = extraAddonsList.length > 0;

                  if (!hasFoodDetails && !hasAddons) return null;

                  return (
                    <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", padding: "0.85rem 1.1rem", borderRadius: "10px" }}>
                      <strong style={{ color: "#92400E", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "5px" }}>
                        <FaBoxes /> Extra Add-ons & Amenities
                      </strong>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem", fontSize: "0.8rem" }}>
                        {extraAddonsList.map((item, idx) => (
                          <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: idx < extraAddonsList.length - 1 ? "1px dashed #FDE68A" : "none", paddingBottom: "3px" }}>
                            <div>
                              <strong style={{ color: "#78350F" }}>{item.name || item.id}</strong>
                              {item.remarks && <span style={{ color: "#92400E", marginLeft: "6px", fontSize: "0.75rem" }}>({item.remarks})</span>}
                            </div>
                            <strong style={{ color: "#78350F" }}>₹{item.price}</strong>
                          </div>
                        ))}
                        {extraAddonsList.length === 0 && hasFoodDetails && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Food & Dining ({selectedBooking.food_details.service_type || "Room Service"}):</span>
                            <strong>₹{selectedBooking.food_details.total_food_amount || selectedBooking.food_details.total_food_charge}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {selectedBooking.cancellation_reason && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", padding: "1rem", borderRadius: "10px" }}>
                    <strong style={{ color: "#991B1B", fontSize: "0.85rem" }}>Cancellation Reason:</strong>
                    <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "#7F1D1D" }}>
                      {selectedBooking.cancellation_reason}
                    </p>
                  </div>
                )}
              </div>

              <div className="modal-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOpenEditReservation(selectedBooking)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <FaEdit /> Edit Reservation
                </button>
                <button type="button" className="btn-secondary" onClick={() => setSelectedBooking(null)}>
                  Close
                </button>
              </div>
            </ModalPortalContainer>
          </ModalPortalOverlay>,
          document.body
        )}

      {/* 4. Change Status Modal (PORTAL) */}
      {statusModalBooking && (() => {
        const totalAmount = getBookingAmount(statusModalBooking);
        const discount = parseFloat(statusModalBooking.discount_amount || 0);
        const netPayable = Math.max(0, totalAmount - discount);
        const paidAmount = getAmountPaid(statusModalBooking);
        const balanceDue = Math.max(0, netPayable - paidAmount);
        const isPaid = balanceDue <= 0 && netPayable > 0;
        const isPartial = paidAmount > 0 && balanceDue > 0;
        const pStatus = statusModalBooking.payment_details?.status || (isPaid ? "paid" : isPartial ? "partial" : "pending");

        return ReactDOM.createPortal(
          <ModalPortalOverlay onClick={() => setStatusModalBooking(null)}>
            <ModalPortalContainer
              $maxWidth="480px"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Update Booking Status</h3>
                <button onClick={() => setStatusModalBooking(null)}>✕</button>
              </div>

              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                  Select operational status for reservation <strong>#{statusModalBooking.booking_id}</strong> ({statusModalBooking.guest_name}):
                </p>

                {/* Payment Status Summary Card */}
                <div style={{
                  background: "var(--bg-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.85rem 1rem",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                      Payment Verification
                    </span>
                    <StatusPill $status={pStatus}>
                      {pStatus === "paid" ? "Fully Paid" : pStatus === "partial" ? "Partially Paid" : "Unpaid / Pending"}
                    </StatusPill>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", textAlign: "center", paddingTop: "0.25rem", borderTop: "1px dashed var(--border-light)" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Net Total</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--primary-dark)" }}>₹{netPayable.toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Amount Paid</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#15803D" }}>₹{paidAmount.toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Balance Due</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "700", color: balanceDue > 0 ? "#DC2626" : "#15803D" }}>
                        ₹{balanceDue.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Warning and Quick Pay Button */}
                {balanceDue > 0 && (
                  <div style={{
                    background: "#FEF2F2",
                    border: "1px solid #FCA5A5",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}>
                    <div style={{ fontSize: "0.8rem", color: "#991B1B", lineHeight: "1.35", display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                      <FaExclamationTriangle style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>
                        <strong>Checkout Disabled:</strong> Guest has an outstanding balance of <strong>₹{balanceDue.toFixed(2)}</strong>. Please record full payment before checking out.
                      </span>
                    </div>
                    <button
                      type="button"
                      style={{
                        background: "#DC2626",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "0.45rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.78rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                        alignSelf: "flex-start"
                      }}
                      onClick={() => {
                        const targetBooking = statusModalBooking;
                        setStatusModalBooking(null);
                        setPaymentModalBooking(targetBooking);
                        setPaymentForm({
                          amount: String(balanceDue),
                          payment_type: "cash",
                          transaction_id: "",
                        });
                      }}
                    >
                      <FaMoneyBillWave /> Record Remaining Payment (₹{balanceDue.toFixed(2)})
                    </button>
                  </div>
                )}

                <div className="form-group" style={{ margin: 0 }}>
                  <label>Booking Status</label>
                  <select
                    value={String(newStatusVal).replace(/_/g, " ").toLowerCase()}
                    onChange={(e) => setNewStatusVal(e.target.value)}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="checked in">Checked In</option>
                    <option
                      value="checked out"
                      disabled={balanceDue > 0}
                      style={{ color: balanceDue > 0 ? "#9CA3AF" : "inherit" }}
                    >
                      Checked Out {balanceDue > 0 ? `(Disabled - Due: ₹${balanceDue.toFixed(2)})` : ""}
                    </option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setStatusModalBooking(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleUpdateStatus}
                  disabled={String(newStatusVal).replace(/_/g, " ").toLowerCase() === "checked out" && balanceDue > 0}
                >
                  Save Status
                </button>
              </div>
            </ModalPortalContainer>
          </ModalPortalOverlay>,
          document.body
        );
      })()}

      {/* 5. Printable Invoice Modal (PORTAL) */}
      {invoiceBooking &&
        ReactDOM.createPortal(
          <ModalPortalOverlay onClick={() => setInvoiceBooking(null)}>
            <ModalPortalContainer
              $maxWidth="680px"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Guest Folio & Invoice</h3>
                <button onClick={() => setInvoiceBooking(null)}>✕</button>
              </div>

              <div className="modal-body" id="printable-invoice">
                <div style={{ borderBottom: "2px solid var(--primary-color)", paddingBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h2 style={{ color: "var(--primary-dark)", margin: 0, fontSize: "1.3rem" }}>TravellersInn Resort</h2>
                    <p style={{ margin: "2px 0 0", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Hospitality & Luxury Suites | GSTIN: {invoiceBooking.company_details?.gst_no || "33AAAAA0000A1Z5"}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: "700", color: "var(--primary-color)" }}>INVOICE</div>
                    <div style={{ fontSize: "0.8rem" }}>#{invoiceBooking.booking_id}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "0.82rem", marginTop: "1rem" }}>
                  <div>
                    <strong>Billed To:</strong>
                    <div>{invoiceBooking.guest_name}</div>
                    {invoiceBooking.company_details?.company_name && (
                      <div style={{ fontWeight: "600", color: "var(--primary-color)" }}>
                        {invoiceBooking.company_details.company_name} (GST: {invoiceBooking.company_details.gst_no || "N/A"})
                      </div>
                    )}
                    <div>{invoiceBooking.guest_phone}</div>
                    <div>{invoiceBooking.guest_address || "Guest Residence"}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong>Stay Details:</strong>
                    <div>Room: {formatRoomNumbers(invoiceBooking)}</div>
                    <div>Check-In: {formatDateDisplay(invoiceBooking.check_in)}</div>
                    <div>Check-Out: {formatDateDisplay(invoiceBooking.check_out)}</div>
                  </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.25rem" }}>
                  <thead>
                    <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border-light)", fontSize: "0.78rem" }}>
                      <th style={{ padding: "0.5rem", textAlign: "left" }}>Description</th>
                      <th style={{ padding: "0.5rem", textAlign: "right" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "0.85rem" }}>
                    {(() => {
                      let invoiceAddons = [];
                      if (Array.isArray(invoiceBooking.extra_addons)) {
                        invoiceAddons = invoiceBooking.extra_addons;
                      } else if (typeof invoiceBooking.extra_addons === "string") {
                        try {
                          invoiceAddons = JSON.parse(invoiceBooking.extra_addons);
                          if (!Array.isArray(invoiceAddons)) invoiceAddons = [];
                        } catch (e) {
                          invoiceAddons = [];
                        }
                      }

                      const totalAddonsPrice = invoiceAddons.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0);
                      const foodTotalAmt = parseFloat(invoiceBooking.food_details?.total_food_amount || invoiceBooking.food_details?.total_food_charge || 0);
                      const subtotalAmt = parseFloat(invoiceBooking.rent_details?.subtotal || invoiceBooking.tax_details?.subtotal || getBookingAmount(invoiceBooking));
                      const roomTariffAmt = Math.max(0, subtotalAmt - (totalAddonsPrice > 0 ? totalAddonsPrice : foodTotalAmt));
                      const taxData = invoiceBooking.rent_details?.tax_details || invoiceBooking.tax_details;

                      return (
                        <>
                          <tr>
                            <td style={{ padding: "0.6rem 0.5rem", borderBottom: "1px solid var(--border-light)" }}>
                              Room Accommodation (Room {formatRoomNumbers(invoiceBooking)})
                            </td>
                            <td style={{ padding: "0.6rem 0.5rem", textAlign: "right", borderBottom: "1px solid var(--border-light)" }}>
                              ₹{roomTariffAmt > 0 ? roomTariffAmt : subtotalAmt}
                            </td>
                          </tr>

                          {invoiceAddons.length > 0 ? (
                            invoiceAddons.map((item, idx) => (
                              <tr key={idx}>
                                <td style={{ padding: "0.5rem", borderBottom: "1px solid var(--border-light)" }}>
                                  {item.name || item.id} {item.remarks ? `(${item.remarks})` : ""}
                                </td>
                                <td style={{ padding: "0.5rem", textAlign: "right", borderBottom: "1px solid var(--border-light)" }}>
                                  ₹{item.price}
                                </td>
                              </tr>
                            ))
                          ) : (
                            foodTotalAmt > 0 && (
                              <tr>
                                <td style={{ padding: "0.6rem 0.5rem", borderBottom: "1px solid var(--border-light)" }}>
                                  Food & Dining ({invoiceBooking.food_details.service_type || "Room Service"})
                                </td>
                                <td style={{ padding: "0.6rem 0.5rem", textAlign: "right", borderBottom: "1px solid var(--border-light)" }}>
                                  ₹{foodTotalAmt}
                                </td>
                              </tr>
                            )
                          )}
                        </>
                      );
                    })()}
                    {(() => {
                      const fin = calculateBookingFinancials(invoiceBooking);
                      return (
                        <>
                          <tr>
                            <td style={{ padding: "0.4rem 0.5rem", borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                              CGST (2.5%) {fin.billType === "Net Rate" ? "(Included)" : ""}
                            </td>
                            <td style={{ padding: "0.4rem 0.5rem", textAlign: "right", borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                              {fin.billType === "Net Rate" ? "" : "+"}₹{fin.cgst.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0.4rem 0.5rem", borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                              SGST (2.5%) {fin.billType === "Net Rate" ? "(Included)" : ""}
                            </td>
                            <td style={{ padding: "0.4rem 0.5rem", textAlign: "right", borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                              {fin.billType === "Net Rate" ? "" : "+"}₹{fin.sgst.toFixed(2)}
                            </td>
                          </tr>
                          {fin.roundOff !== 0 && (
                            <tr style={{ color: fin.roundOff > 0 ? "#15803D" : "#DC2626" }}>
                              <td style={{ padding: "0.4rem 0.5rem", borderBottom: "1px solid var(--border-light)", fontSize: "0.8rem" }}>
                                Round Off Adjustment
                              </td>
                              <td style={{ padding: "0.4rem 0.5rem", textAlign: "right", borderBottom: "1px solid var(--border-light)", fontSize: "0.8rem" }}>
                                {fin.roundOff >= 0 ? `+₹${fin.roundOff.toFixed(2)}` : `-₹${Math.abs(fin.roundOff).toFixed(2)}`}
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })()}
                    {parseFloat(invoiceBooking.discount_amount || 0) > 0 && (
                      <tr style={{ color: "#DC2626" }}>
                        <td style={{ padding: "0.4rem 0.5rem", borderBottom: "1px solid var(--border-light)" }}>
                          Discount Applied {invoiceBooking.discount_remarks ? `(${invoiceBooking.discount_remarks})` : ""}
                        </td>
                        <td style={{ padding: "0.4rem 0.5rem", textAlign: "right", borderBottom: "1px solid var(--border-light)" }}>
                          -₹{invoiceBooking.discount_amount}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ padding: "0.6rem 0.5rem", fontWeight: "700" }}>Total Due (Net Payable)</td>
                      <td style={{ padding: "0.6rem 0.5rem", textAlign: "right", fontWeight: "700", color: "var(--primary-dark)" }}>
                        ₹{calculateBookingFinancials(invoiceBooking).netPayable.toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ color: "#15803D" }}>
                      <td style={{ padding: "0.4rem 0.5rem", fontWeight: "600" }}>Amount Received</td>
                      <td style={{ padding: "0.4rem 0.5rem", textAlign: "right", fontWeight: "600" }}>
                        ₹{getAmountPaid(invoiceBooking).toFixed(2)}
                      </td>
                    </tr>
                    {(calculateBookingFinancials(invoiceBooking).balanceDue) > 0 && (
                      <tr style={{ color: "#DC2626" }}>
                        <td style={{ padding: "0.4rem 0.5rem", fontWeight: "700" }}>Balance Due</td>
                        <td style={{ padding: "0.4rem 0.5rem", textAlign: "right", fontWeight: "700" }}>
                          ₹{calculateBookingFinancials(invoiceBooking).balanceDue.toFixed(2)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setInvoiceBooking(null)}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handlePrintInvoice(invoiceBooking)}
                >
                  <FaPrint /> Print Receipt
                </button>
              </div>
            </ModalPortalContainer>
          </ModalPortalOverlay>,
          document.body
        )}
    </PageContainer>
  );
};

export default ManageBookings;
