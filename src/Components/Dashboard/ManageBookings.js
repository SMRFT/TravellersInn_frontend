import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPhone,
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
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaBoxes,
  FaPlusSquare,
  FaHistory,
  FaExternalLinkAlt,
  FaEdit,
  FaConciergeBell,
  FaLayerGroup,
  FaWifi,
  FaTshirt,
  FaReceipt,
  FaBroom,
  FaTools,
  FaTimesCircle,
  FaFilePdf,
  FaImage,
  FaInfoCircle,
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
    margin: 0;
  }

  .title-group p {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin: 4px 0 0 0;
  }

  .actions-group {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
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
      padding: 0.65rem 1rem 0.65rem 2.5rem;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      background: var(--bg-subtle);
      transition: all 0.2s ease;

      &:focus {
        background: #FFFFFF;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(74, 30, 93, 0.1);
      }
    }
  }

  .filter-controls {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .tabs-group {
    display: flex;
    background: var(--bg-subtle);
    padding: 3px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-light);
    gap: 2px;
    overflow-x: auto;

    button {
      background: transparent;
      border: none;
      padding: 0.45rem 0.85rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      white-space: nowrap;

      &.active {
        background: #FFFFFF;
        color: var(--primary-dark);
        box-shadow: var(--shadow-sm);
      }
    }
  }

  .date-filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    .date-box {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: var(--bg-subtle);
      padding: 0.3rem 0.6rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-secondary);

      input {
        border: 1px solid var(--border-light);
        border-radius: var(--radius-sm);
        padding: 0.3rem 0.5rem;
        font-size: 0.8rem;
        background: #FFFFFF;
        color: var(--text-primary);
        outline: none;

        &:focus {
          border-color: var(--primary-color);
        }
      }
    }

    .clear-date-btn {
      background: #FFFFFF;
      border: 1px solid var(--border-light);
      padding: 0.4rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }
  }
`;

const TableCard = styled.div`
  background: #FFFFFF;
  border-radius: var(--radius-md);
  overflow: hidden;

  .table-responsive {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
    text-align: left;

    th {
      background: var(--bg-subtle);
      padding: 0.85rem 1rem;
      font-weight: 700;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-light);
      white-space: nowrap;
    }

    td {
      padding: 0.95rem 1rem;
      border-bottom: 1px solid var(--border-light);
      color: var(--text-primary);
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
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) => {
    const s = String(props.$status || "").toLowerCase().replace(/_/g, " ").trim();
    if (s === "confirmed" || s === "booked" || s === "paid") {
      return `background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0;`;
    }
    if (s === "checked in" || s === "partially paid" || s === "partially_paid") {
      return `background: #EFF6FF; color: #2563EB; border: 1px solid #BFDBFE;`;
    }
    if (s === "pending") {
      return `background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A;`;
    }
    if (s === "checked out") {
      return `background: #F3F4F6; color: #4B5563; border: 1px solid #E5E7EB;`;
    }
    if (s === "cancelled" || s === "canceled" || s === "cancellation requested") {
      return `background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA;`;
    }
    return `background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-light);`;
  }}
`;

const OverstayBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  animation: pulse 2s infinite;
  margin-top: 3px;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const PastOverstayBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  background: #FFFBEB;
  color: #B45309;
  border: 1px solid #FDE68A;
  margin-top: 3px;
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;

  button {
    background: #FFFFFF;
    border: 1px solid var(--border-light);
    color: var(--text-primary);
    padding: 0.45rem 0.7rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: all 0.2s ease;

    &:hover {
      background: var(--bg-subtle);
      border-color: var(--primary-light);
      color: var(--primary-color);
    }

    &.invoice-btn {
      color: var(--primary-color);
      border-color: rgba(74, 30, 93, 0.25);
      background: rgba(74, 30, 93, 0.04);
      &:hover {
        background: rgba(74, 30, 93, 0.08);
      }
    }

    &.pay-btn {
      color: #059669;
      border-color: #A7F3D0;
      background: #ECFDF5;
      &:hover {
        background: #D1FAE5;
      }
    }

    &.status-btn {
      color: #2563EB;
      border-color: #BFDBFE;
      background: #EFF6FF;
      &:hover {
        background: #DBEAFE;
      }
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
  padding: 1rem;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  position: relative;
  transition: all 0.2s ease;
  box-shadow: ${(props) => (props.$selected ? "0 4px 14px rgba(74, 30, 93, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.04)")};

  &:hover {
    ${(props) => (!props.$disabled ? `transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--primary-color);` : "transform: none;")}
  }

  .room-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.35rem;

    .room-num {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--primary-dark);
    }
  }

  .room-type {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .room-price {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .status-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.$statusColor || "#065F46"};
    background: ${(props) => props.$statusBg || "#ECFDF5"};
    border: 1px solid ${(props) => props.$borderColor || "#10B981"};
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

// GST Validation Diagram Box Component (matching reference image)
const GSTStructureAlert = styled.div`
  background: #FFFBEB;
  border: 1px solid #FCD34D;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .gst-title {
    font-weight: 700;
    font-size: 0.88rem;
    color: #92400E;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .gst-diagram {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    padding: 0.5rem 0;
  }

  .gst-pill {
    padding: 6px 12px;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .pill-state {
    background: #F43F5E;
    color: #FFFFFF;
  }

  .pill-pan {
    background: #FB7185;
    color: #FFFFFF;
    padding: 6px 16px;
  }

  .pill-entity {
    background: #F43F5E;
    color: #FFFFFF;
  }

  .pill-z {
    background: #F43F5E;
    color: #FFFFFF;
  }

  .pill-check {
    background: #F43F5E;
    color: #FFFFFF;
  }

  .gst-rules-list {
    margin: 0;
    padding-left: 1.25rem;
    font-size: 0.78rem;
    color: #78350F;
    line-height: 1.5;

    li {
      margin-bottom: 2px;
    }
  }
`;

// Helper: 24-hr check-in and check-out calculation
const getCurrentDateTimeLocal = (dateObj = new Date()) => {
  const pad = (n) => String(n).padStart(2, "0");
  const year = dateObj.getFullYear();
  const month = pad(dateObj.getMonth() + 1);
  const day = pad(dateObj.getDate());
  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const get24HoursAfter = (dateTimeStr) => {
  const dt = dateTimeStr ? new Date(dateTimeStr) : new Date();
  if (isNaN(dt.getTime())) {
    return getCurrentDateTimeLocal(new Date(Date.now() + 24 * 60 * 60 * 1000));
  }
  const after24 = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
  return getCurrentDateTimeLocal(after24);
};

// Standard 15-character GSTIN regex validation
const validateGSTIN = (gstin) => {
  if (!gstin) return true; // Optional if company not provided
  const clean = gstin.trim().toUpperCase();
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(clean);
};

const initialWalkinState = {
  // Tab 1: Individual Details
  customer_id: "",
  guest_name: "",
  guest_phone: "",
  guest_email: "",
  guest_address: "",
  number_of_guests: 1,
  check_in: getCurrentDateTimeLocal(),
  check_out: get24HoursAfter(getCurrentDateTimeLocal()),
  id_proof_type: "Aadhaar Card",
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
  food_items: [], // Array of { item_id, item_name, rate, count }
  food_service_type: "Room Service",
  food_custom_charge: 0,

  // Section 2: Amenities
  addon_wifi: false,
  addon_wifi_price: 200,
  addon_extrabed_count: 0,
  addon_extrabed_rate: 300, // Two options: 300 or 500
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
  payment_method: "cash", // 'cash', 'upi', 'debit_card', 'credit_card', 'net_banking', 'online'
  card_type: "RuPay", // 'RuPay', 'MasterCard', 'Visa', 'American Express', 'Diners Club', 'Other'
  transaction_id: "",
};

const IdProofDocumentPreview = ({ url, onClose }) => {
  const isExplicitImage = String(url || "").toLowerCase().match(/\.(jpe?g|png|webp|gif|bmp)(\?.*)?$/i);
  const isExplicitPdf = String(url || "").toLowerCase().includes(".pdf");

  const [mode, setMode] = useState(() => {
    if (isExplicitImage) return "image";
    return "pdf";
  });

  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let createdBlobUrl = null;

    if (!url) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        const ct = (res.headers.get("content-type") || "").toLowerCase();
        return res.blob().then((blob) => ({ blob, ct }));
      })
      .then(({ blob, ct }) => {
        if (!active) return;
        let finalType = ct;
        if (ct.includes("image")) {
          setMode("image");
          finalType = ct;
        } else if (ct.includes("pdf")) {
          setMode("pdf");
          finalType = "application/pdf";
        } else if (isExplicitImage) {
          setMode("image");
        } else {
          setMode("pdf");
          finalType = "application/pdf";
        }

        const typedBlob = finalType ? new Blob([blob], { type: finalType }) : blob;
        createdBlobUrl = URL.createObjectURL(typedBlob);
        setBlobUrl(createdBlobUrl);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.warn("Direct blob preview error, falling back to direct URL", err);
        setBlobUrl(url);
        setLoading(false);
      });

    return () => {
      active = false;
      if (createdBlobUrl) {
        URL.revokeObjectURL(createdBlobUrl);
      }
    };
  }, [url, isExplicitImage, isExplicitPdf]);

  const displayUrl = blobUrl || url;

  return (
    <ModalPortalOverlay onClick={onClose}>
      <ModalPortalContainer
        $maxWidth="880px"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              <FaEye /> Attached ID Proof Document
            </h3>
            <div style={{ display: "flex", gap: "4px", background: "var(--bg-subtle)", padding: "2px", borderRadius: "8px", border: "1px solid var(--border-light)" }}>
              <button
                type="button"
                onClick={() => setMode("pdf")}
                style={{
                  padding: "4px 9px",
                  fontSize: "0.74rem",
                  fontWeight: "700",
                  borderRadius: "6px",
                  border: "none",
                  background: mode === "pdf" ? "var(--primary-color)" : "transparent",
                  color: mode === "pdf" ? "#FFFFFF" : "var(--text-secondary)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <FaFilePdf size={12} /> PDF View
              </button>
              <button
                type="button"
                onClick={() => setMode("image")}
                style={{
                  padding: "4px 9px",
                  fontSize: "0.74rem",
                  fontWeight: "700",
                  borderRadius: "6px",
                  border: "none",
                  background: mode === "image" ? "var(--primary-color)" : "transparent",
                  color: mode === "image" ? "#FFFFFF" : "var(--text-secondary)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <FaImage size={12} /> Image View
              </button>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--text-muted)" }}>✕</button>
        </div>

        <div className="modal-body" style={{ padding: "1rem", alignItems: "center", justifyContent: "center", minHeight: "500px", background: "#F9FAFB" }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "450px", gap: "12px", color: "var(--text-secondary)" }}>
              <div className="custom-spinner" style={{ width: "32px", height: "32px", border: "3px solid #E2E8F0", borderTop: "3px solid var(--primary-color)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Loading Attached Document...</span>
            </div>
          ) : mode === "pdf" ? (
            <div style={{ width: "100%", height: "560px", position: "relative", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-light)", background: "#FFFFFF" }}>
              <iframe
                src={displayUrl}
                title="Attached ID Proof PDF"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "450px" }}>
              <img
                src={displayUrl}
                alt="Attached ID Proof Document"
                style={{
                  maxWidth: "100%",
                  maxHeight: "540px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  objectFit: "contain",
                }}
                onError={() => {
                  setMode("pdf");
                }}
              />
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1.5rem" }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "var(--primary-color)", fontSize: "0.82rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "5px" }}
          >
            <FaExternalLinkAlt /> Open Original File in New Tab
          </a>
          <button type="button" className="btn-secondary" onClick={onClose} style={{ padding: "0.5rem 1.2rem", borderRadius: "8px" }}>
            Close Preview
          </button>
        </div>
      </ModalPortalContainer>
    </ModalPortalOverlay>
  );
};

const FoodItemSelector = ({ menuItems = [], onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.is_active !== false &&
      (item.item_name || "").toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleSelect = (item) => {
    onAddItem(item);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleAddCustom = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    onAddItem({
      item_name: trimmed,
      rate: 0,
    });
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", marginBottom: "1rem" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="🔍 Search & select menu items from Travellers INN Menu (e.g. Idly, Dosa, Coffee)..."
            value={searchTerm}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (filteredMenuItems.length === 1) {
                  handleSelect(filteredMenuItems[0]);
                } else if (searchTerm.trim()) {
                  handleAddCustom();
                }
              }
            }}
            style={{
              width: "100%",
              padding: "0.6rem 2.2rem 0.6rem 0.85rem",
              borderRadius: "8px",
              border: "1px solid var(--border-light)",
              fontSize: "0.85rem",
              outline: "none",
              background: "#FFFFFF",
            }}
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              padding: "4px",
            }}
            title="Toggle menu items"
          >
            ▾
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 99999,
            background: "#FFFFFF",
            border: "1px solid var(--border-light)",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            maxHeight: "220px",
            overflowY: "auto",
            marginTop: "4px",
          }}
        >
          {filteredMenuItems.length === 0 ? (
            <div style={{ padding: "10px 14px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              {searchTerm ? (
                <div
                  onClick={handleAddCustom}
                  style={{ cursor: "pointer", color: "var(--primary-color)", fontWeight: "600" }}
                >
                  + Add &ldquo;{searchTerm}&rdquo; as custom food item
                </div>
              ) : (
                "No menu items available"
              )}
            </div>
          ) : (
            <>
              {filteredMenuItems.map((item) => (
                <div
                  key={item.item_id || item.item_name}
                  onClick={() => handleSelect(item)}
                  style={{
                    padding: "9px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    borderBottom: "1px solid #F1F5F9",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontWeight: "600", color: "var(--primary-dark)" }}>
                    🍽️ {item.item_name}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "#059669", fontWeight: "700", background: "#ECFDF5", padding: "2px 8px", borderRadius: "6px" }}>
                    ₹{parseFloat(item.rate || 0).toFixed(2)}
                  </span>
                </div>
              ))}
              {searchTerm && !filteredMenuItems.some((m) => m.item_name.toLowerCase() === searchTerm.toLowerCase()) && (
                <div
                  onClick={handleAddCustom}
                  style={{
                    padding: "9px 14px",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    color: "var(--primary-color)",
                    fontWeight: "600",
                    borderTop: "1px dashed var(--border-light)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  + Add &ldquo;{searchTerm}&rdquo; as custom food item
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
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

  // Table 1 filters
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");

  // Table 2 filters
  const [pastSearchTerm, setPastSearchTerm] = useState("");
  const [pastStatusFilter, setPastStatusFilter] = useState("all");
  const [pastFromDate, setPastFromDate] = useState(getTodayDateStr());
  const [pastToDate, setPastToDate] = useState(getTodayDateStr());

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [invoiceBooking, setInvoiceBooking] = useState(null);
  const [statusModalBooking, setStatusModalBooking] = useState(null);
  const [newStatusVal, setNewStatusVal] = useState("confirmed");
  const [cancellationReason, setCancellationReason] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  // Document preview lightbox modal state
  const [previewDocUrl, setPreviewDocUrl] = useState(null);

  // Walk-in / Edit modal state
  const [isWalkinOpen, setIsWalkinOpen] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [walkinActiveTab, setWalkinActiveTab] = useState("individual");
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
    card_type: "RuPay",
    transaction_id: "",
  });

  const [companiesList, setCompaniesList] = useState([]);

  // Fetch all bookings
  const fetchAllBookings = async (isBackground = false) => {
    if (!isBackground) {
      setActiveLoading(true);
      setPastLoading(true);
    }
    try {
      const res = await apiRequest(`${TravellersBaseUrl}bookings/?_t=${Date.now()}`);
      if (res.success && Array.isArray(res.data)) {
        const active = [];
        const past = [];

        res.data.forEach((b) => {
          const bStatus = (b.booking_status || b.status || "confirmed").toLowerCase().replace(/_/g, " ").trim();
          if (bStatus === "checked out" || bStatus === "cancelled" || bStatus === "canceled") {
            past.push(b);
          } else {
            active.push(b);
          }
        });

        setActiveBookingsData(active);
        setPastBookingsData(past);
      }
    } catch (e) {
      console.error("Bookings fetch error:", e);
    }
    if (!isBackground) {
      setActiveLoading(false);
      setPastLoading(false);
    }
  };

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      const res = await apiRequest(`${TravellersBaseUrl}rooms/?_t=${Date.now()}`);
      if (res.success && Array.isArray(res.data)) {
        setRoomsList(res.data);
      }
    } catch (e) {
      console.error("Rooms fetch error:", e);
    }
  };

  // Fetch registered customers
  const fetchCustomers = async () => {
    try {
      const res = await apiRequest(`${TravellersBaseUrl}customers/?_t=${Date.now()}`);
      if (res.success && Array.isArray(res.data)) {
        setCustomersList(res.data);
      }
    } catch (e) {
      console.error("Customers fetch error:", e);
    }
  };

  // Fetch registered companies
  const fetchCompanies = async () => {
    try {
      const res = await apiRequest(`${TravellersBaseUrl}companies/?_t=${Date.now()}`);
      if (res.success && Array.isArray(res.data)) {
        setCompaniesList(res.data);
      }
    } catch (e) {
      console.error("Companies fetch error:", e);
    }
  };

  // Fetch active menu items for Food & Dining selection
  const fetchMenuItems = async () => {
    try {
      const res = await apiRequest(`${TravellersBaseUrl}menu-items/?_t=${Date.now()}`);
      if (res.success && Array.isArray(res.data)) {
        setMenuItems(res.data);
      }
    } catch (e) {
      console.error("Menu items fetch error:", e);
    }
  };

  useEffect(() => {
    fetchAllBookings();
    fetchRooms();
    fetchCustomers();
    fetchCompanies();
    fetchMenuItems();

    const handleRefresh = () => fetchAllBookings(true);
    window.addEventListener("refresh_bookings", handleRefresh);

    return () => {
      window.removeEventListener("refresh_bookings", handleRefresh);
    };
  }, []);

  const getAllCustomers = () => {
    const custMap = new Map();

    const mergeCustomer = (key, data) => {
      if (!key) return;
      if (!custMap.has(key)) {
        custMap.set(key, { ...data });
      } else {
        const existing = custMap.get(key);
        custMap.set(key, {
          customer_id: data.customer_id || existing.customer_id || "",
          name: data.name || existing.name || "",
          phone: data.phone || existing.phone || "",
          email: data.email || existing.email || "",
          address: data.address || existing.address || "",
          id_proof_type: data.id_proof_type || existing.id_proof_type || "Aadhaar Card",
          id_proof_number: data.id_proof_number || existing.id_proof_number || "",
          id_proof_file: data.id_proof_file || existing.id_proof_file || "",
        });
      }
    };

    customersList.forEach((c) => {
      const key = (c.customer_id || c.id || `${c.name || ""}_${c.phone || ""}`).trim();
      mergeCustomer(key, {
        customer_id: c.customer_id || c.id || "",
        name: c.name || c.guest_name || "",
        phone: c.phone || c.guest_phone || "",
        email: c.email || c.guest_email || "",
        address: c.address || c.guest_address || "",
        id_proof_type: c.id_proof_type || "Aadhaar Card",
        id_proof_number: c.id_proof_number || "",
        id_proof_file: c.id_proof_file || "",
      });
    });

    [...activeBookingsData, ...pastBookingsData].forEach((b) => {
      const key = (b.customer_id || `${b.guest_name || b.customer_name || ""}_${b.guest_phone || b.customer_phone || b.phone || ""}`).trim();
      mergeCustomer(key, {
        customer_id: b.customer_id || "",
        name: b.guest_name || b.customer_name || "",
        phone: b.guest_phone || b.customer_phone || b.phone || "",
        email: b.guest_email || "",
        address: b.guest_address || b.address || "",
        id_proof_type: b.id_proof_type || "Aadhaar Card",
        id_proof_number: b.id_proof_number || "",
        id_proof_file: b.id_proof_file || "",
      });
    });

    return Array.from(custMap.values());
  };

  const handleSelectCustomer = (cust) => {
    setWalkinForm((prev) => ({
      ...prev,
      customer_id: cust.customer_id || "",
      guest_name: cust.name || prev.guest_name,
      guest_phone: cust.phone || prev.guest_phone,
      guest_email: cust.email || prev.guest_email,
      guest_address: cust.address || cust.guest_address || "",
      id_proof_type: cust.id_proof_type && cust.id_proof_type !== "PAN Card" ? cust.id_proof_type : "Aadhaar Card",
      id_proof_number: cust.id_proof_number || prev.id_proof_number,
      id_proof_file: cust.id_proof_file || prev.id_proof_file,
    }));
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
      if (diffMs < 5 * 60 * 1000) return null;

      const durationStr = formatDurationText(diffMs);
      return durationStr ? `Overstayed (${durationStr})` : null;
    } catch (e) {
      return null;
    }
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

  // GST Calculated FROM the Discounted Amount Standard
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
    if (td.subtotal && parseFloat(td.subtotal) > 0) {
      subtotal = parseFloat(td.subtotal);
    } else if (rd.subtotal && parseFloat(rd.subtotal) > 0) {
      subtotal = parseFloat(rd.subtotal);
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
    }

    // Standard GST calculation directly from discounted base
    const discountedBase = Math.max(0, subtotal - discount);
    let taxableAmount = 0;
    let cgst = 0;
    let sgst = 0;
    let totalTax = 0;
    let grossTotal = 0;

    if (billType === "Net Rate") {
      grossTotal = discountedBase;
      taxableAmount = discountedBase > 0 ? discountedBase / 1.05 : 0;
      totalTax = Math.max(0, discountedBase - taxableAmount);
      cgst = totalTax / 2;
      sgst = totalTax / 2;
    } else {
      taxableAmount = discountedBase;
      cgst = taxableAmount * 0.025;
      sgst = taxableAmount * 0.025;
      totalTax = cgst + sgst;
      grossTotal = taxableAmount + totalTax;
    }

    const unrounded = grossTotal;
    const rounded = Math.round(unrounded);
    const roundOff = b.round_off !== undefined && b.round_off !== null
      ? parseFloat(b.round_off)
      : (td.round_off !== undefined && td.round_off !== null
        ? parseFloat(td.round_off)
        : rounded - unrounded);

    const explicitAmount = (b.amount !== undefined && b.amount !== null && !isNaN(parseFloat(b.amount)) && parseFloat(b.amount) > 0)
      ? parseFloat(b.amount)
      : (pd.amount !== undefined && pd.amount !== null && !isNaN(parseFloat(pd.amount)) && parseFloat(pd.amount) > 0
        ? parseFloat(pd.amount)
        : rounded);

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
    if (Array.isArray(b.bills) && b.bills.length > 0) {
      const positiveTotal = b.bills.reduce((acc, curr) => {
        const amt = parseFloat(curr.amount_paid) || 0;
        return amt > 0 ? acc + amt : acc;
      }, 0);
      if (positiveTotal > 0) return positiveTotal;
    }
    if (b.amount_paid !== undefined && b.amount_paid !== null && !isNaN(parseFloat(b.amount_paid)) && parseFloat(b.amount_paid) > 0) {
      return parseFloat(b.amount_paid);
    }
    const pd = parsePaymentDetails(b);
    if (pd.paid !== undefined && pd.paid !== null && !isNaN(parseFloat(pd.paid)) && parseFloat(pd.paid) > 0) {
      return parseFloat(pd.paid);
    }
    if (pd.amount_paid !== undefined && pd.amount_paid !== null && !isNaN(parseFloat(pd.amount_paid)) && parseFloat(pd.amount_paid) > 0) {
      return parseFloat(pd.amount_paid);
    }
    const pStatus = (pd.status || b.payment_status || "").toLowerCase().trim();
    if (pStatus === "paid") {
      if (pd.amount !== undefined && pd.amount !== null && !isNaN(parseFloat(pd.amount)) && parseFloat(pd.amount) > 0) {
        return parseFloat(pd.amount);
      }
      if (b.price !== undefined && b.price !== null && !isNaN(parseFloat(b.price)) && parseFloat(b.price) > 0) {
        return parseFloat(b.price);
      }
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

  // Live Calculations for Walk-in Modal with Discount-First GST
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

    // 1. Food & Dining (from selected food_items)
    const itemsFoodTotal = (walkinForm.food_items || []).reduce((sum, item) => {
      const rate = parseFloat(item.rate) || 0;
      const count = parseInt(item.count, 10) || 0;
      return sum + (rate * count);
    }, 0);
    const customFood = parseFloat(walkinForm.food_custom_charge) || 0;
    const foodTotal = itemsFoodTotal + customFood;

    // 2. Amenities (Extra Bed supports ₹300 / ₹500)
    const wifiAmt = walkinForm.addon_wifi ? (parseFloat(walkinForm.addon_wifi_price) || 200) : 0;
    const extraBedRate = parseFloat(walkinForm.addon_extrabed_rate) || 300;
    const extraBedAmt = (parseInt(walkinForm.addon_extrabed_count, 10) || 0) * extraBedRate;
    const laundryAmt = parseFloat(walkinForm.addon_laundry_charge) || 0;
    const lateCheckoutAmt = (parseInt(walkinForm.addon_latecheckout_hours, 10) || 0) * (parseFloat(walkinForm.addon_latecheckout_rate) || 250);
    const amenitiesTotal = wifiAmt + extraBedAmt + laundryAmt + lateCheckoutAmt;

    // 3. Other Add-ons
    const otherAddonsTotal = parseFloat(walkinForm.addon_other_amount) || 0;

    // Total Addons & Subtotal
    const addonsTotal = foodTotal + amenitiesTotal + otherAddonsTotal;
    const subtotal = roomTotal + addonsTotal;
    const discount = parseFloat(walkinForm.discount_amount) || 0;
    const discountedBase = Math.max(0, subtotal - discount);
    const billType = walkinForm.bill_type || "Rack";

    let taxableAmount = 0;
    let cgst = 0;
    let sgst = 0;
    let totalTax = 0;
    let grossTotal = 0;

    if (billType === "Net Rate") {
      grossTotal = discountedBase;
      taxableAmount = discountedBase > 0 ? discountedBase / 1.05 : 0;
      totalTax = Math.max(0, discountedBase - taxableAmount);
      cgst = totalTax / 2;
      sgst = totalTax / 2;
    } else {
      taxableAmount = discountedBase;
      cgst = taxableAmount * 0.025;
      sgst = taxableAmount * 0.025;
      totalTax = cgst + sgst;
      grossTotal = taxableAmount + totalTax;
    }

    const unroundedPayable = grossTotal;
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
      extraBedRate,
      laundryAmt,
      lateCheckoutAmt,
      amenitiesTotal,
      otherAddonsTotal,
      addonsTotal,
      subtotal,
      discountedBase,
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

  // Food & Dining item actions
  const handleAddFoodItem = (menuItem) => {
    setWalkinForm((prev) => {
      const currentList = Array.isArray(prev.food_items) ? [...prev.food_items] : [];
      const existingIndex = currentList.findIndex(
        (i) => (i.item_id && menuItem.item_id && String(i.item_id) === String(menuItem.item_id)) ||
               (i.item_name && menuItem.item_name && i.item_name.toLowerCase() === menuItem.item_name.toLowerCase())
      );
      if (existingIndex >= 0) {
        currentList[existingIndex] = {
          ...currentList[existingIndex],
          count: (parseInt(currentList[existingIndex].count, 10) || 1) + 1,
        };
      } else {
        currentList.push({
          item_id: menuItem.item_id || null,
          item_name: menuItem.item_name,
          rate: parseFloat(menuItem.rate) || 0,
          count: 1,
        });
      }
      return { ...prev, food_items: currentList };
    });
  };

  const handleUpdateFoodItem = (index, field, value) => {
    setWalkinForm((prev) => {
      const currentList = Array.isArray(prev.food_items) ? [...prev.food_items] : [];
      if (currentList[index]) {
        currentList[index] = {
          ...currentList[index],
          [field]: field === "count" ? (parseInt(value, 10) >= 0 ? parseInt(value, 10) : "") : value,
        };
      }
      return { ...prev, food_items: currentList };
    });
  };

  const handleRemoveFoodItem = (index) => {
    setWalkinForm((prev) => {
      const currentList = Array.isArray(prev.food_items) ? [...prev.food_items] : [];
      currentList.splice(index, 1);
      return { ...prev, food_items: currentList };
    });
  };

  // Live Room Availability
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

  const formatProofDocUrl = (urlOrId) => {
    if (!urlOrId || urlOrId === "manual_entry" || urlOrId === "manual_verified") return null;
    if (urlOrId.startsWith("data:") || urlOrId.startsWith("blob:")) {
      return urlOrId;
    }
    const base = (TravellersBaseUrl || "http://127.0.0.1:1919/_b_a_c_k_e_n_d/travellerinwebsite/").replace(/\/+$/, "");
    if (urlOrId.startsWith("http://") || urlOrId.startsWith("https://")) {
      return urlOrId;
    }
    const cleanId = String(urlOrId).replace(/^.*gridfs\//, "").replace(/\.[^/.]+$/, "").replace(/\//g, "").trim();
    if (/^[0-9a-fA-F]{24}$/.test(cleanId)) {
      return `${base}/media/gridfs/${cleanId}/`;
    }
    if (urlOrId.startsWith("/")) {
      return `${base}${urlOrId}`;
    }
    return `${base}/media/gridfs/${urlOrId}/`;
  };

  const toDateTimeLocal = (dateStr, fallback = "") => {
    if (!dateStr) return fallback;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return fallback;
      return getCurrentDateTimeLocal(d);
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

    const breakfastAddon = extraAddonsList.find((a) => a.id === "breakfast" || (a.name && a.name.toLowerCase().includes("breakfast")));
    const lunchAddon = extraAddonsList.find((a) => a.id === "lunch" || (a.name && a.name.toLowerCase().includes("lunch")));
    const dinnerAddon = extraAddonsList.find((a) => a.id === "dinner" || (a.name && a.name.toLowerCase().includes("dinner")));
    const snacksAddon = extraAddonsList.find((a) => a.id === "snacks" || (a.name && a.name.toLowerCase().includes("snacks")));
    const teaCoffeeAddon = extraAddonsList.find((a) => a.id === "tea_coffee" || (a.name && (a.name.toLowerCase().includes("tea") || a.name.toLowerCase().includes("coffee"))));
    const foodCustomAddon = extraAddonsList.find((a) => a.id === "food_custom" || (a.name && a.name.toLowerCase().includes("custom food")));

    const wifiAddon = extraAddonsList.find((a) => a.id === "wifi" || (a.name && a.name.toLowerCase().includes("wifi")));
    const extraBedAddon = extraAddonsList.find((a) => a.id === "extra_bed" || a.id === "extrabed" || String(a.id || "").startsWith("extrabed") || (a.name && a.name.toLowerCase().includes("extra bed")));
    const laundryAddon = extraAddonsList.find((a) => a.id === "laundry" || (a.name && a.name.toLowerCase().includes("laundry")));
    const lateCheckoutAddon = extraAddonsList.find((a) => a.id === "late_checkout" || a.id === "latecheckout" || String(a.id || "").startsWith("latecheckout") || (a.name && a.name.toLowerCase().includes("late checkout")));
    const otherAddon = extraAddonsList.find((a) => a.id === "other" || a.category === "other");

    const extractCountAndRate = (addon, legacyItem, defaultRate) => {
      if (addon) {
        const count = addon.count !== undefined ? parseInt(addon.count, 10) : (addon.quantity !== undefined ? parseInt(addon.quantity, 10) : null);
        const rate = addon.rate !== undefined && !isNaN(parseFloat(addon.rate)) && parseFloat(addon.rate) > 0 ? parseFloat(addon.rate) : null;
        const price = addon.price !== undefined ? parseFloat(addon.price) : (addon.total !== undefined ? parseFloat(addon.total) : null);

        const effectiveRate = rate !== null ? rate : defaultRate;

        if (count !== null && count > 0) {
          return {
            count: count,
            rate: effectiveRate,
            remarks: addon.remarks || addon.items || ""
          };
        } else if (price !== null && price > 0) {
          const effectiveCount = Math.max(1, Math.round(price / effectiveRate));
          return {
            count: effectiveCount,
            rate: effectiveRate,
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

    let loadedFoodItems = [];
    if (Array.isArray(b.food_details?.items) && b.food_details.items.length > 0) {
      loadedFoodItems = b.food_details.items.map((it) => ({
        item_id: it.item_id || null,
        item_name: it.item_name || it.name || "Food Item",
        rate: parseFloat(it.rate) || 0,
        count: parseInt(it.count, 10) || 1,
      }));
    } else {
      const foodAddons = extraAddonsList.filter(
        (a) => (a.category === "food and dining" || a.category === "food") && a.id !== "food_custom"
      );
      if (foodAddons.length > 0) {
        loadedFoodItems = foodAddons.map((a) => ({
          item_id: a.item_id || null,
          item_name: a.item_name || (a.name ? a.name.replace(/\s*\(x\d+\)$/i, "") : "Food Item"),
          rate: parseFloat(a.rate !== undefined ? a.rate : (a.count ? (a.price || a.total || 0) / a.count : a.price || 0)) || 0,
          count: parseInt(a.count, 10) || 1,
        }));
      }
    }

    let extraBedDetectedRate = 300;
    if (extraBedAddon) {
      const explicitRate = parseFloat(extraBedAddon.rate);
      const explicitPrice = parseFloat(extraBedAddon.price !== undefined ? extraBedAddon.price : extraBedAddon.total);
      if (explicitRate === 500 || explicitRate === 300) {
        extraBedDetectedRate = explicitRate;
      } else if (String(extraBedAddon.id || "").includes("500") || String(extraBedAddon.name || "").includes("500") || String(extraBedAddon.name || "").toLowerCase().includes("premium")) {
        extraBedDetectedRate = 500;
      } else if (String(extraBedAddon.id || "").includes("300") || String(extraBedAddon.name || "").includes("300") || String(extraBedAddon.name || "").toLowerCase().includes("standard")) {
        extraBedDetectedRate = 300;
      } else if (explicitPrice === 500 || (explicitPrice > 0 && explicitPrice % 500 === 0 && explicitPrice % 300 !== 0)) {
        extraBedDetectedRate = 500;
      } else if (explicitPrice === 300 || (explicitPrice > 0 && explicitPrice % 300 === 0)) {
        extraBedDetectedRate = 300;
      }
    }

    let lateCheckoutDetectedRate = 250;
    if (lateCheckoutAddon) {
      const explicitRate = parseFloat(lateCheckoutAddon.rate);
      if (!isNaN(explicitRate) && explicitRate > 0) {
        lateCheckoutDetectedRate = explicitRate;
      }
    }

    const extraBedParsed = extractCountAndRate(extraBedAddon, null, extraBedDetectedRate);
    const lateCheckoutParsed = extractCountAndRate(lateCheckoutAddon, null, lateCheckoutDetectedRate);

    setWalkinForm({
      guest_name: b.guest_name || b.customer_name || "",
      guest_phone: b.guest_phone || b.customer_phone || b.phone || "",
      guest_email: b.guest_email || "",
      guest_address: b.guest_address || "",
      number_of_guests: b.number_of_guests || 1,
      check_in: toDateTimeLocal(b.check_in, getCurrentDateTimeLocal()),
      check_out: toDateTimeLocal(b.check_out, get24HoursAfter(getCurrentDateTimeLocal())),
      id_proof_type: b.id_proof_type && b.id_proof_type !== "PAN Card" ? b.id_proof_type : "Aadhaar Card",
      id_proof_number: b.id_proof_number || "",
      id_proof_file: b.id_proof_file || "",

      company_id: b.company_id || comp.company_id || comp.id || "",
      company_name: comp.company_name || "",
      company_person: comp.contact_person || comp.company_person || comp.person || "",
      company_address: comp.company_address || comp.address || "",
      company_city: comp.city || comp.company_city || "",
      company_state: comp.state || comp.company_state || "",
      company_pincode: comp.pincode || comp.company_pincode || "",
      company_phone: comp.phone || comp.company_phone || "",
      company_gst: comp.gst_no || comp.company_gst || "",

      selected_rooms: getRoomNumbersList(b),

      food_items: loadedFoodItems,
      food_service_type: b.food_details?.service_type || legacyFood.service_type || "Room Service",
      food_custom_charge: b.food_details?.custom_charge || foodCustomAddon?.price || foodCustomAddon?.total || legacyFood.custom_charge || 0,

      addon_wifi: !!wifiAddon,
      addon_wifi_price: wifiAddon?.price || wifiAddon?.total || 200,
      addon_extrabed_count: extraBedParsed.count,
      addon_extrabed_rate: extraBedParsed.rate === 500 ? 500 : 300,
      addon_laundry_charge: laundryAddon?.price || laundryAddon?.total || 0,
      addon_laundry_remarks: laundryAddon?.remarks || "",
      addon_latecheckout_hours: lateCheckoutParsed.count,
      addon_latecheckout_rate: lateCheckoutParsed.rate,

      addon_other_name: otherAddon?.name || "",
      addon_other_amount: otherAddon?.price || otherAddon?.total || 0,
      addon_other_description: otherAddon?.remarks || "",

      bill_type: b.bill_type || b.tax_details?.bill_type || "Rack",
      discount_amount: parseFloat(b.discount_amount || 0),
      discount_remarks: b.discount_remarks || "",
      amount_paid: getAmountPaid(b),
      payment_method: pd.method || pd.payment_type || b.payment_type || "cash",
      card_type: pd.card_type || b.card_type || "RuPay",
      transaction_id: pd.transaction_id || b.transaction_id || "",
    });

    setSelectedBooking(null);
    setWalkinActiveTab("individual");
    setIsWalkinOpen(true);
  };

  // Walk-in form submission with strict validations
  const handleCreateOrUpdateWalkin = async (e) => {
    if (e) e.preventDefault();

    // 1. Mandatory guest details
    if (!walkinForm.guest_name || !walkinForm.guest_name.trim()) {
      toast.error("Guest Full Name is mandatory in Tab 1 (Guest Details)");
      setWalkinActiveTab("individual");
      return;
    }
    if (!walkinForm.guest_phone || !walkinForm.guest_phone.trim()) {
      toast.error("Phone Number is mandatory in Tab 1 (Guest Details)");
      setWalkinActiveTab("individual");
      return;
    }

    // 2. Proof Mandatory
    if (!walkinForm.id_proof_number || !walkinForm.id_proof_number.trim()) {
      toast.error("ID Proof Number is mandatory in Tab 1 (Guest Details)");
      setWalkinActiveTab("individual");
      return;
    }
    if (!walkinForm.id_proof_file || !walkinForm.id_proof_file.trim()) {
      toast.error("Please upload the ID Proof Document attachment in Tab 1 (Guest Details)");
      setWalkinActiveTab("individual");
      return;
    }

    // 3. GSTIN Validation if provided in Tab 2
    if (walkinForm.company_gst && walkinForm.company_gst.trim()) {
      if (!validateGSTIN(walkinForm.company_gst)) {
        toast.error("Invalid GST Number format. GSTIN must be a valid 15-character structure.");
        setWalkinActiveTab("company");
        return;
      }
    }

    // 4. Room selection
    if (!walkinForm.selected_rooms || walkinForm.selected_rooms.length === 0) {
      toast.error("Please select at least one room in Tab 3 (Room Details)");
      setWalkinActiveTab("rooms");
      return;
    }

    // 5. Discount Remarks Mandatory if discount is entered
    const discountVal = parseFloat(walkinForm.discount_amount) || 0;
    if (discountVal > 0 && (!walkinForm.discount_remarks || !walkinForm.discount_remarks.trim())) {
      toast.error("Discount Remarks are mandatory when a discount amount is applied.");
      setWalkinActiveTab("addons");
      return;
    }

    // 6. Transaction ID Mandatory for non-cash payments if amount is paid
    const amountPaidVal = parseFloat(walkinForm.amount_paid) || 0;
    if (walkinForm.payment_method !== "cash" && amountPaidVal > 0) {
      if (!walkinForm.transaction_id || !walkinForm.transaction_id.trim()) {
        toast.error(`Transaction ID is mandatory for ${walkinForm.payment_method.replace(/_/g, " ").toUpperCase()} payments.`);
        setWalkinActiveTab("addons");
        return;
      }
    }

    const totals = calculateWalkinTotals();

    // Compile extra_addons array
    const compiledAddons = [];

    // Food and Dining items
    (walkinForm.food_items || []).forEach((item) => {
      const count = parseInt(item.count, 10) || 0;
      const rate = parseFloat(item.rate) || 0;
      if (count > 0) {
        compiledAddons.push({
          item_id: item.item_id || null,
          name: `${item.item_name} (x${count})`,
          item_name: item.item_name,
          category: "food and dining",
          count: count,
          rate: rate,
          price: count * rate,
        });
      }
    });
    if (parseFloat(walkinForm.food_custom_charge) > 0) {
      compiledAddons.push({
        id: "food_custom",
        name: "Custom Food Charges",
        category: "food and dining",
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
      const ebRate = parseFloat(walkinForm.addon_extrabed_rate) || 300;
      compiledAddons.push({
        id: "extra_bed",
        name: `Extra Bed (${ebRate === 500 ? "Premium" : "Standard"} ₹${ebRate} x${walkinForm.addon_extrabed_count})`,
        category: "amenity",
        count: parseInt(walkinForm.addon_extrabed_count, 10),
        rate: ebRate,
        price: (parseInt(walkinForm.addon_extrabed_count, 10) || 0) * ebRate,
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

    if (parseFloat(walkinForm.addon_other_amount) > 0 || (walkinForm.addon_other_name && walkinForm.addon_other_name.trim() !== "")) {
      compiledAddons.push({
        id: "other",
        name: walkinForm.addon_other_name || "Other Add-on",
        category: "other",
        price: parseFloat(walkinForm.addon_other_amount) || 0,
        remarks: walkinForm.addon_other_description || "",
      });
    }

    const payload = {
      customer_id: walkinForm.customer_id || null,
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
      food_details: {
        service_type: walkinForm.food_service_type || "Room Service",
        items: (walkinForm.food_items || []).map((item) => ({
          item_id: item.item_id || null,
          item_name: item.item_name,
          rate: parseFloat(item.rate) || 0,
          count: parseInt(item.count, 10) || 1,
          total: (parseInt(item.count, 10) || 1) * (parseFloat(item.rate) || 0),
        })),
        custom_charge: parseFloat(walkinForm.food_custom_charge) || 0,
        total: totals.foodTotal,
      },
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
      card_type: (walkinForm.payment_method === "debit_card" || walkinForm.payment_method === "credit_card") ? (walkinForm.card_type || "RuPay") : undefined,
      transaction_id: walkinForm.transaction_id || "",
      payment_details: {
        amount: totals.netAmount,
        paid: totals.paid,
        method: walkinForm.payment_method,
        card_type: (walkinForm.payment_method === "debit_card" || walkinForm.payment_method === "credit_card") ? (walkinForm.card_type || "RuPay") : undefined,
        transaction_id: walkinForm.transaction_id || "",
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
        toast.success("Walk-in reservation created and confirmed successfully!");
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
    const isCancelled = cleanStatus.toLowerCase() === "cancelled";

    if (isCancelled) {
      if (!cancellationReason || !cancellationReason.trim()) {
        toast.error("Cancellation reason is mandatory when cancelling a booking.");
        return;
      }
    }

    if (isCheckout) {
      const currentSt = String(statusModalBooking.booking_status || statusModalBooking.status || "").toLowerCase().replace(/_/g, " ").trim();
      const isCheckedIn = currentSt === "checked in" || currentSt === "occupied" || !!statusModalBooking.guest_check_in;
      if (!isCheckedIn) {
        toast.error("Cannot check out: Guest has not checked in yet. Please check in the guest first.");
        return;
      }

      const fin = calculateBookingFinancials(statusModalBooking);
      const balanceDue = fin.balanceDue;

      if (balanceDue > 0) {
        toast.error(`Cannot checkout: Outstanding balance of ₹${balanceDue.toFixed(2)}. Full payment must be recorded first.`);
        return;
      }
    }

    const payload = {
      status: cleanStatus,
      booking_status: cleanStatus,
    };
    if (isCancelled) {
      payload.cancellation_reason = cancellationReason.trim();
    }

    const res = await apiRequest(`${TravellersBaseUrl}admin/booking/${statusModalBooking.booking_id}/`, "PATCH", payload);
    if (res.success) {
      toast.success(`Booking status changed to ${cleanStatus}`);
      setStatusModalBooking(null);
      setCancellationReason("");
      fetchAllBookings();
    } else {
      toast.error(res.error || "Failed to update booking status");
    }
  };

  // Record Balance Payment Modal
  const handleRecordPayment = async (e) => {
    e.preventDefault();
    if (!paymentModalBooking) return;

    const enteredAmt = parseFloat(paymentForm.amount || 0);
    if (enteredAmt <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }

    if (paymentForm.payment_type !== "cash" && (!paymentForm.transaction_id || !paymentForm.transaction_id.trim())) {
      toast.error(`Transaction ID / Ref # is mandatory for ${paymentForm.payment_type.toUpperCase()} payments.`);
      return;
    }

    const fin = calculateBookingFinancials(paymentModalBooking);
    const currentPaid = fin.paid;
    const totalDue = fin.netPayable;
    const newTotalPaid = currentPaid + enteredAmt;
    const isPaid = newTotalPaid >= totalDue;

    const isCard = paymentForm.payment_type === "debit_card" || paymentForm.payment_type === "credit_card";
    const res = await apiRequest(`${TravellersBaseUrl}admin/booking/${paymentModalBooking.booking_id}/`, "PATCH", {
      amount_paid: enteredAmt,
      payment_type: paymentForm.payment_type,
      card_type: isCard ? (paymentForm.card_type || "RuPay") : undefined,
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
      setPaymentForm({ amount: "", payment_type: "cash", card_type: "RuPay", transaction_id: "" });
      fetchAllBookings();
    } else {
      toast.error(res.error || "Failed to record payment");
    }
  };

  // Export CSV
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

  const handlePrintInvoice = (b) => {
    if (!b) return;
    const fin = calculateBookingFinancials(b);
    const paidAmount = getAmountPaid(b);

    const bStatusNorm = String(b.booking_status || b.status || "").toLowerCase().replace(/_/g, " ").trim();
    const isCancelled = bStatusNorm === "cancelled" || bStatusNorm === "canceled" || bStatusNorm === "cancellation requested";
    const pd = parsePaymentDetails(b);

    const cancelReason = b.cancellation_reason || pd.cancellation_reason || "Cancelled by Admin / Guest";
    const cancelDate = b.lastmodified_date || b.cancelled_at || b.updated_at || b.created_date || null;

    let refundBillNo = "";
    let refundAmount = 0;
    let fineAmount = 0;

    if (Array.isArray(b.bills) && b.bills.length > 0) {
      const refBill = b.bills.find((bill) => parseFloat(bill.amount_paid) < 0 || String(bill.payment_type).includes("refund"));
      if (refBill) {
        refundBillNo = refBill.billing_no || "";
        refundAmount = Math.abs(parseFloat(refBill.amount_paid) || 0);
      }
    }

    if (!refundAmount && pd.refund_amount !== undefined && pd.refund_amount !== null) {
      refundAmount = Math.abs(parseFloat(pd.refund_amount) || 0);
    }
    if (pd.fine_amount !== undefined && pd.fine_amount !== null) {
      fineAmount = parseFloat(pd.fine_amount) || 0;
    }

    if (!refundBillNo) {
      if (Array.isArray(pd.billing_numbers) && pd.billing_numbers.length > 1) {
        refundBillNo = pd.billing_numbers[pd.billing_numbers.length - 1];
      } else if (pd.latest_billing_no) {
        refundBillNo = pd.latest_billing_no;
      }
    }

    if (isCancelled && paidAmount > 0) {
      if (refundAmount === 0 && fineAmount > 0) {
        refundAmount = Math.max(0, paidAmount - fineAmount);
      } else if (refundAmount > 0 && fineAmount === 0) {
        fineAmount = Math.max(0, paidAmount - refundAmount);
      } else if (refundAmount === 0 && fineAmount === 0) {
        refundAmount = paidAmount;
      }
    }

    const refundStatusRaw = pd.status || "";
    const refundStatus = refundStatusRaw === "refunded" ? "Refund Processed" : (refundStatusRaw === "refund_pending" ? "Refund Pending" : (isCancelled ? "Pending Approval / Processed" : "N/A"));

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
      alert("Please allow popups to print invoice.");
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${isCancelled ? "Cancellation Folio" : "Invoice"} - ${b.booking_id || b.id}</title>
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
              border: 1px solid ${isCancelled ? "#FCA5A5" : "#E5E7EB"};
              border-radius: 8px;
              padding: 24px 28px;
              background: #FFFFFF;
              position: relative;
            }
            ${isCancelled ? `
              .watermark {
                position: absolute;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-25deg);
                font-size: 64px;
                font-weight: 900;
                color: rgba(220, 38, 38, 0.08);
                text-transform: uppercase;
                letter-spacing: 6px;
                pointer-events: none;
                z-index: 0;
                border: 6px solid rgba(220, 38, 38, 0.1);
                padding: 10px 30px;
                border-radius: 12px;
              }
            ` : ""}
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid ${isCancelled ? "#DC2626" : "#4A1E5D"};
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
              color: ${isCancelled ? "#DC2626" : "#4A1E5D"};
              letter-spacing: 1px;
            }
            .status-pill-cancel {
              display: inline-block;
              background: #DC2626;
              color: #FFFFFF;
              font-weight: 800;
              font-size: 10px;
              padding: 2px 8px;
              border-radius: 4px;
              letter-spacing: 0.5px;
              margin-top: 3px;
              text-transform: uppercase;
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
            .cancellation-card {
              background: #FEF2F2;
              border: 1.5px solid #FCA5A5;
              border-radius: 6px;
              padding: 12px 16px;
              margin-bottom: 18px;
            }
            .cancellation-card-title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px dashed #F87171;
              padding-bottom: 6px;
              margin-bottom: 8px;
              font-weight: 800;
              font-size: 12px;
              color: #991B1B;
              letter-spacing: 0.5px;
            }
            .cancellation-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px 16px;
              font-size: 12px;
              color: #7F1D1D;
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
              background: ${isCancelled ? "#7F1D1D" : "#4A1E5D"};
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
              width: 380px;
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
              border-top: 2px solid ${isCancelled ? "#DC2626" : "#4A1E5D"};
              border-bottom: 2px solid ${isCancelled ? "#DC2626" : "#4A1E5D"};
              font-weight: 800;
              font-size: 15px;
              color: ${isCancelled ? "#DC2626" : "#4A1E5D"};
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
            ${isCancelled ? `<div class="watermark">CANCELLED</div>` : ""}
            <div class="header">
              <div>
                <div class="brand-name">TRAVELLER'S INN</div>
                <div class="brand-sub">60/37,Saradha College Road</div>
                <div class="brand-sub">TIN:33766480010</div>
                <div class="brand-sub">SALEM - 636007</div>
                <div class="brand-sub">Tamilnadu  India</div>
                <div class="brand-sub">Phone:9884347488 , 7695939196</div>
                <div class="brand-sub" style="font-weight: 800; font-size: 13px; color: #111827; margin-top: 6px;">GSTIN: 33AAMFT2081Q1ZM</div>
              </div>
              <div class="invoice-badge">
                <div class="badge-title">${isCancelled ? "CANCELLATION FOLIO" : "GUEST FOLIO / INVOICE"}</div>
                ${isCancelled ? `<div><span class="status-pill-cancel">CANCELLED</span></div>` : ""}
                <div class="badge-no">#${b.booking_id || b.id}</div>
                <div class="badge-date">Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
                <div class="badge-date">Rate Type: <strong>${fin.billType === "Net Rate" ? "Net Rate (GST Incl.)" : "Rack Rate (GST Add.)"}</strong></div>
              </div>
            </div>

            ${isCancelled ? `
              <div class="cancellation-card">
                <div class="cancellation-card-title">
                  <span>⚠️ CANCELLATION & REFUND DETAILS</span>
                  <span style="background: #FEE2E2; color: #991B1B; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 800;">
                    ${refundStatus.toUpperCase()}
                  </span>
                </div>
                <div class="cancellation-grid">
                  <div><strong>Booking Status:</strong> <span style="color: #DC2626; font-weight: 700;">Cancelled</span></div>
                  <div><strong>Cancellation Date:</strong> ${cancelDate ? formatDateDisplay(cancelDate) : "Recorded"}</div>
                  <div><strong>Cancellation Reason:</strong> ${cancelReason}</div>
                  <div><strong>Refund Status:</strong> ${refundStatus}</div>
                  ${refundBillNo ? `<div><strong>Refund Bill / Ref No:</strong> ${refundBillNo}</div>` : ""}
                  ${refundAmount > 0 ? `<div><strong>Refund Amount:</strong> ₹${refundAmount.toFixed(2)}</div>` : ""}
                  ${fineAmount > 0 ? `<div><strong>Cancellation / Fine Retained:</strong> ₹${fineAmount.toFixed(2)}</div>` : ""}
                </div>
              </div>
            ` : ""}

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
                  ${isCancelled ? `<br/><strong style="color: #DC2626;">Status:</strong> <span style="color: #DC2626; font-weight: 700;">Cancelled</span>` : ""}
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
                      <div style="font-size: 11px; color: #6B7280;">Stay from ${formatDateDisplay(b.check_in)} to ${formatDateDisplay(b.check_out)} ${isCancelled ? "(Cancelled)" : ""}</div>
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
                    <td>${isCancelled ? "Original Tariff Total:" : "Total Due (Net Payable):"}</td>
                    <td class="val">₹${fin.netPayable.toFixed(2)}</td>
                  </tr>
                  <tr class="paid">
                    <td>Amount Received / Collected:</td>
                    <td class="val">₹${paidAmount.toFixed(2)}</td>
                  </tr>
                  ${isCancelled ? `
                    ${fineAmount > 0 ? `
                      <tr style="color: #991B1B; font-weight: 600;">
                        <td>Cancellation / Fine Retained:</td>
                        <td class="val">₹${fineAmount.toFixed(2)}</td>
                      </tr>
                    ` : ""}
                    ${refundAmount > 0 ? `
                      <tr style="color: #2563EB; font-weight: 700;">
                        <td>Refund (${refundStatus}):</td>
                        <td class="val">-₹${refundAmount.toFixed(2)}</td>
                      </tr>
                    ` : ""}
                    <tr style="color: #DC2626; font-weight: 800; border-top: 2px solid #FCA5A5;">
                      <td>Reservation Status:</td>
                      <td class="val" style="text-transform: uppercase;">CANCELLED (${refundStatus})</td>
                    </tr>
                  ` : `
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
                  `}
                </tbody>
              </table>
            </div>

            <div class="footer-notes">
              <div>
                <div>${isCancelled ? "Reservation cancelled. For refund inquiries, contact TravellersInn." : "Thank you for staying at TravellersInn!"}</div>
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
    if (match) return parseInt(match[0], 10);
    return 0;
  };

  // Active bookings list
  const activeBookings = activeBookingsData
    .filter((b) => {
      const bStatus = (b.booking_status || b.status || "confirmed").toLowerCase().replace(/_/g, " ").trim();
      if (bStatus === "checked out" || bStatus === "cancelled" || bStatus === "canceled") return false;

      const idStr = String(b.booking_id || b.id || "").toLowerCase();
      const nameStr = String(b.guest_name || b.customer_name || "").toLowerCase();
      const phoneStr = String(b.guest_phone || b.customer_phone || b.phone || "");
      const roomStr = formatRoomNumbers(b).toLowerCase();
      const query = activeSearchTerm.toLowerCase().trim();

      const matchesSearch = !query || idStr.includes(query) || nameStr.includes(query) || phoneStr.includes(query) || roomStr.includes(query);
      if (!matchesSearch) return false;

      if (activeStatusFilter === "departures") return isTodayDeparture(b);

      const pStatus = getPaymentStatus(b).toLowerCase().replace(/_/g, " ").trim();
      const cleanActiveFilter = activeStatusFilter.toLowerCase().replace(/_/g, " ").trim();
      return activeStatusFilter === "all" || bStatus === cleanActiveFilter || pStatus === cleanActiveFilter;
    })
    .sort((a, b) => getBookingSortValue(b) - getBookingSortValue(a));

  // Past bookings list with search, status filter, and date range filter
  const pastBookings = pastBookingsData
    .filter((b) => {
      const bStatus = (b.booking_status || b.status || "").toLowerCase().replace(/_/g, " ").trim();
      if (bStatus !== "checked out" && bStatus !== "cancelled" && bStatus !== "canceled") return false;

      const idStr = String(b.booking_id || b.id || "").toLowerCase();
      const nameStr = String(b.guest_name || b.customer_name || "").toLowerCase();
      const phoneStr = String(b.guest_phone || b.customer_phone || b.phone || "");
      const roomStr = formatRoomNumbers(b).toLowerCase();
      const query = pastSearchTerm.toLowerCase().trim();

      const matchesSearch = !query || idStr.includes(query) || nameStr.includes(query) || phoneStr.includes(query) || roomStr.includes(query);
      if (!matchesSearch) return false;

      const pStatus = getPaymentStatus(b).toLowerCase().replace(/_/g, " ").trim();
      const cleanPastFilter = pastStatusFilter.toLowerCase().replace(/_/g, " ").trim();
      const matchesStatus = pastStatusFilter === "all" || bStatus === cleanPastFilter || pStatus === cleanPastFilter;
      if (!matchesStatus) return false;

      // Date range filtering
      if (pastFromDate) {
        const fromTime = new Date(`${pastFromDate}T00:00:00`).getTime();
        const bDateStr = b.guest_check_out || b.check_out || b.lastmodified_date || b.created_date || b.check_in;
        if (bDateStr) {
          const bTime = new Date(bDateStr).getTime();
          if (!isNaN(bTime) && bTime < fromTime) return false;
        }
      }

      if (pastToDate) {
        const toTime = new Date(`${pastToDate}T23:59:59.999`).getTime();
        const bDateStr = b.guest_check_out || b.check_out || b.lastmodified_date || b.created_date || b.check_in;
        if (bDateStr) {
          const bTime = new Date(bDateStr).getTime();
          if (!isNaN(bTime) && bTime > toTime) return false;
        }
      }

      return true;
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

  const isGSTValid = !walkinForm.company_gst || validateGSTIN(walkinForm.company_gst);

  return (
    <PageContainer>
      <HeaderBar>
        <div className="title-group">
          <h2>Room Bookings Management</h2>
          <p>Multi-tab reservations, 24-hr check-ins, document preview & billing.</p>
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
              fetchCustomers();
              fetchCompanies();
              setWalkinForm({
                ...initialWalkinState,
                check_in: getCurrentDateTimeLocal(),
                check_out: get24HoursAfter(getCurrentDateTimeLocal()),
              });
              setWalkinActiveTab("individual");
              setIsWalkinOpen(true);
            }}
          >
            <FaPlus /> + New Walk-in Booking
          </PrimaryButton>
        </div>
      </HeaderBar>

      {/* TABLE 1: ACTIVE & UPCOMING BOOKINGS */}
      <SectionCard>
        <SectionHeader>
          <div className="section-title-group">
            <div className="icon-badge">
              <FaBed />
            </div>
            <div className="title-texts">
              <h3>Active & Upcoming Reservations</h3>
              <p>Current guest stays, arrivals, and pending check-ins</p>
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
                    const paidAmount = fin.paid;
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
                            {b.id_proof_file && (
                              <button
                                type="button"
                                onClick={() => setPreviewDocUrl(formatProofDocUrl(b.id_proof_file))}
                                style={{ background: "none", border: "none", padding: 0, color: "var(--primary-color)", fontSize: "0.72rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "3px", marginTop: "2px", fontWeight: "600" }}
                              >
                                <FaEye /> View ID Proof
                              </button>
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
                              <div style={{ fontSize: "0.74rem", color: "#16A34A", marginTop: "2px", fontWeight: "600" }}>
                                <strong>Guest In:</strong> {formatDateDisplay(b.guest_check_in)}
                              </div>
                            )}
                            {b.guest_check_out && (
                              <div style={{ fontSize: "0.74rem", color: "#7C3AED", marginTop: "1px", fontWeight: "600" }}>
                                <strong>Guest Out:</strong> {formatDateDisplay(b.guest_check_out)}
                              </div>
                            )}
                            {getActiveOverstayInfo(b) && (
                              <div>
                                <OverstayBadge>
                                  <FaClock size={10} /> {getActiveOverstayInfo(b)}
                                </OverstayBadge>
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: "0.82rem", lineHeight: "1.35" }}>
                            <div style={{ fontWeight: "700", color: "var(--primary-dark)" }}>
                              ₹{netPayable.toFixed(2)}
                            </div>
                            <div style={{ fontSize: "0.74rem", color: "#15803D" }}>
                              Paid: ₹{paidAmount.toFixed(2)}
                            </div>
                            {balanceDue > 0 ? (
                              <div style={{ fontSize: "0.74rem", color: "#DC2626", fontWeight: "700" }}>
                                Due: ₹{balanceDue.toFixed(2)}
                              </div>
                            ) : (
                              <div style={{ fontSize: "0.72rem", color: "#059669", fontWeight: "700" }}>
                                ✓ Fully Paid
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <StatusPill $status={bStatus}>{getBookingStatusLabel(bStatus)}</StatusPill>
                            <StatusPill $status={paymentStatus}>{paymentStatus.replace(/_/g, " ")}</StatusPill>
                          </div>
                        </td>
                        <td>
                          <ActionButtonsGroup>
                            <button onClick={() => setSelectedBooking(b)} title="View Details">
                              <FaEye /> View
                            </button>
                            <button className="invoice-btn" onClick={() => setInvoiceBooking(b)} title="Invoice">
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
                                <FaMoneyBillWave /> Pay
                              </button>
                            )}
                            <button
                              className="status-btn"
                              onClick={() => {
                                setStatusModalBooking(b);
                                setNewStatusVal(String(b.booking_status || b.status || "confirmed").replace(/_/g, " ").toLowerCase());
                                setCancellationReason(b.cancellation_reason || "");
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

      {/* TABLE 2: PAST / HISTORY BOOKINGS */}
      <SectionCard>
        <SectionHeader $variant="past">
          <div className="section-title-group">
            <div className="icon-badge">
              <FaHistory />
            </div>
            <div className="title-texts">
              <h3>Past & Checked-out Bookings History</h3>
              <p>Completed guest stays, checked-out records, and historical folios</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span className="section-badge">
              {pastBookings.length} History Booking{pastBookings.length === 1 ? "" : "s"}
            </span>
            <SecondaryButton
              style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem" }}
              onClick={() => handleExportCSV(pastBookings, "Past")}
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
              placeholder="Search history by Guest Name, Phone, Room #, Booking ID..."
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
                  onChange={(e) => setPastFromDate(e.target.value)}
                  title="Filter history by start date"
                />
              </div>

              <div className="date-box">
                <label>To:</label>
                <input
                  type="date"
                  value={pastToDate}
                  onChange={(e) => setPastToDate(e.target.value)}
                  title="Filter history by end date"
                />
              </div>

              <button
                type="button"
                className="clear-date-btn"
                onClick={() => {
                  const todayStr = getTodayDateStr();
                  setPastFromDate(todayStr);
                  setPastToDate(todayStr);
                }}
                style={{
                  background: (pastFromDate === getTodayDateStr() && pastToDate === getTodayDateStr()) ? "var(--primary-color)" : "#FFFFFF",
                  color: (pastFromDate === getTodayDateStr() && pastToDate === getTodayDateStr()) ? "#FFFFFF" : "var(--text-secondary)",
                  borderColor: (pastFromDate === getTodayDateStr() && pastToDate === getTodayDateStr()) ? "var(--primary-color)" : "var(--border-light)",
                  fontWeight: "700"
                }}
                title="Filter for today's completed stays"
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
                  }}
                  title="Show all history records without date restrictions"
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
                  <th>Stay Dates</th>
                  <th>Tariff & Billing</th>
                  <th>Status</th>
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
                      No past records found.
                    </td>
                  </tr>
                ) : (
                  pastBookings.map((b) => {
                    const bStatus = b.booking_status || b.status || "checked out";
                    const fin = calculateBookingFinancials(b);
                    const netPayable = fin.netPayable;
                    const paidAmount = fin.paid;

                    return (
                      <tr key={b.booking_id || b.id}>
                        <td>
                          <strong>#{b.booking_id || b.id}</strong>
                        </td>
                        <td>
                          <div>
                            <strong>{b.guest_name || b.customer_name || "Guest"}</strong>
                            <div style={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>
                              {b.guest_phone || b.customer_phone || b.phone || "N/A"}
                            </div>
                          </div>
                        </td>
                        <td>
                          <strong>Room {formatRoomNumbers(b)}</strong>
                        </td>
                        <td>
                          <div style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                            <div><strong>In:</strong> {formatDateDisplay(b.check_in)}</div>
                            <div style={{ color: "var(--text-muted)" }}><strong>Out:</strong> {formatDateDisplay(b.check_out)}</div>
                            {b.guest_check_in && (
                              <div style={{ fontSize: "0.74rem", color: "#16A34A", marginTop: "2px", fontWeight: "600" }}>
                                <strong>Guest In:</strong> {formatDateDisplay(b.guest_check_in)}
                              </div>
                            )}
                            {b.guest_check_out && (
                              <div style={{ fontSize: "0.74rem", color: "#7C3AED", marginTop: "1px", fontWeight: "600" }}>
                                <strong>Guest Out:</strong> {formatDateDisplay(b.guest_check_out)}
                              </div>
                            )}
                            {getPastOverstayInfo(b) && (
                              <div>
                                <PastOverstayBadge>
                                  <FaClock size={10} /> {getPastOverstayInfo(b)}
                                </PastOverstayBadge>
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: "0.82rem" }}>
                            <strong>₹{netPayable.toFixed(2)}</strong>
                            <div style={{ color: "#059669", fontSize: "0.74rem" }}>Paid: ₹{paidAmount.toFixed(2)}</div>
                          </div>
                        </td>
                        <td>
                          <StatusPill $status={bStatus}>{getBookingStatusLabel(bStatus)}</StatusPill>
                          {bStatus.toLowerCase().includes("cancel") && (b.cancellation_reason || b.payment_details?.cancellation_reason) && (
                            <div style={{ fontSize: "0.72rem", color: "#B91C1C", marginTop: "4px", maxWidth: "160px", wordBreak: "break-word", lineHeight: "1.3", background: "#FEF2F2", padding: "3px 6px", borderRadius: "5px", border: "1px solid #FECACA" }}>
                              <strong>Reason:</strong> {b.cancellation_reason || b.payment_details?.cancellation_reason}
                            </div>
                          )}
                        </td>
                        <td>
                          <ActionButtonsGroup>
                            <button onClick={() => setSelectedBooking(b)}><FaEye /> View</button>
                            <button className="invoice-btn" onClick={() => setInvoiceBooking(b)}><FaFileInvoice /> Invoice</button>
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

      {/* 1. WALK-IN RESERVATION MODAL (PORTAL) */}
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
                        24-hr check-in calculation, mandatory ID proof, GSTIN validation & billing
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
                      <FaUser /> 1. Guest Details *
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
                      <FaBed /> 3. Room Details *
                      {walkinForm.selected_rooms.length > 0 && (
                        <span className="badge">{walkinForm.selected_rooms.length}</span>
                      )}
                    </WalkinTabBtn>
                    <WalkinTabBtn
                      type="button"
                      $active={walkinActiveTab === "addons"}
                      onClick={() => setWalkinActiveTab("addons")}
                    >
                      <FaBoxes /> 4. Extra Add-ons & Billing
                    </WalkinTabBtn>
                  </WalkinTabsContainer>
                </div>

                <form onSubmit={handleCreateOrUpdateWalkin}>
                  <div className="modal-body" style={{ paddingTop: 0 }}>
                    {/* TAB 1: GUEST DETAILS */}
                    {walkinActiveTab === "individual" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                      >
                        <div className="form-row">
                          <div className="form-group" style={{ position: "relative" }}>
                            <label>
                              Guest Full Name *
                              {walkinForm.customer_id && (
                                <span style={{ color: "#059669", fontSize: "0.72rem", fontWeight: "700", marginLeft: "6px" }}>
                                  (Selected: #{walkinForm.customer_id})
                                </span>
                              )}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ramesh Kumar"
                              value={walkinForm.guest_name}
                              onFocus={() => {
                                fetchCustomers();
                                setShowNameSuggestions(true);
                              }}
                              onBlur={() => setTimeout(() => setShowNameSuggestions(false), 250)}
                              onChange={(e) => {
                                setWalkinForm({ ...walkinForm, guest_name: e.target.value, customer_id: "" });
                                setShowNameSuggestions(true);
                              }}
                            />
                            {nameSuggestions.length > 0 && (
                              <SuggestionDropdown>
                                <div className="suggestion-header">
                                  <span>Registered Guests ({nameSuggestions.length})</span>
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
                                      <span className="name">
                                        <FaUser /> {cust.name || "Guest"}
                                        {cust.customer_id && (
                                          <span style={{ fontSize: "0.72rem", color: "#6B7280", fontWeight: "normal", marginLeft: "4px" }}>
                                            (#{cust.customer_id})
                                          </span>
                                        )}
                                      </span>
                                      {cust.phone && <span className="phone"><FaPhone /> {cust.phone}</span>}
                                    </div>
                                    <div className="sub-line">
                                      {cust.email && <span>📧 {cust.email}</span>}
                                      {cust.id_proof_number && <span>🆔 {cust.id_proof_type || "ID"}: {cust.id_proof_number}</span>}
                                      {cust.address && <span>📍 {cust.address}</span>}
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
                              onFocus={() => {
                                fetchCustomers();
                                setShowPhoneSuggestions(true);
                              }}
                              onBlur={() => setTimeout(() => setShowPhoneSuggestions(false), 250)}
                              onChange={(e) => {
                                setWalkinForm({ ...walkinForm, guest_phone: e.target.value, customer_id: "" });
                                setShowPhoneSuggestions(true);
                              }}
                            />
                            {phoneSuggestions.length > 0 && (
                              <SuggestionDropdown>
                                <div className="suggestion-header">
                                  <span>Registered Guests ({phoneSuggestions.length})</span>
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
                                      <span className="name">
                                        <FaUser /> {cust.name || "Guest"}
                                        {cust.customer_id && (
                                          <span style={{ fontSize: "0.72rem", color: "#6B7280", fontWeight: "normal", marginLeft: "4px" }}>
                                            (#{cust.customer_id})
                                          </span>
                                        )}
                                      </span>
                                      {cust.phone && <span className="phone"><FaPhone /> {cust.phone}</span>}
                                    </div>
                                    <div className="sub-line">
                                      {cust.email && <span>📧 {cust.email}</span>}
                                      {cust.id_proof_number && <span>🆔 {cust.id_proof_type || "ID"}: {cust.id_proof_number}</span>}
                                      {cust.address && <span>📍 {cust.address}</span>}
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

                        {/* 24 Hours Calculation: Check-in sets Check-out to +24 Hours */}
                        <div className="form-row">
                          <div className="form-group">
                            <label>Check-in Date & Time * (Current Time Default)</label>
                            <input
                              type="datetime-local"
                              required
                              value={walkinForm.check_in}
                              onChange={(e) => {
                                const newCheckIn = e.target.value;
                                setWalkinForm({
                                  ...walkinForm,
                                  check_in: newCheckIn,
                                  check_out: get24HoursAfter(newCheckIn),
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Check-out Date & Time * (24-hr Stay: {totals.nights} Night{totals.nights > 1 ? "s" : ""})</label>
                            <input
                              type="datetime-local"
                              required
                              value={walkinForm.check_out}
                              onChange={(e) => setWalkinForm({ ...walkinForm, check_out: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* ID Proof Type (PAN Card removed) & Mandatory ID Proof */}
                        <div className="form-row">
                          <div className="form-group">
                            <label>ID Proof Type *</label>
                            <select
                              value={walkinForm.id_proof_type}
                              onChange={(e) => setWalkinForm({ ...walkinForm, id_proof_type: e.target.value })}
                            >
                              <option value="Aadhaar Card">Aadhaar Card</option>
                              <option value="Passport">Passport</option>
                              <option value="Driving License">Driving License</option>
                              <option value="Voter ID">Voter ID</option>
                              <option value="Government ID">Government Issued ID</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>ID Proof Number *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 1234 5678 9012"
                              value={walkinForm.id_proof_number}
                              onChange={(e) => setWalkinForm({ ...walkinForm, id_proof_number: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Mandatory ID Proof File Upload with Preview */}
                        <div className="form-group">
                          <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Upload Attached Proof Document *</span>
                            {walkinForm.id_proof_file && (
                              <span style={{ fontSize: "0.75rem", color: "#15803D", fontWeight: "700" }}>
                                <FaCheckCircle /> Document Attached
                              </span>
                            )}
                          </label>
                          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              onChange={handleIdProofUpload}
                              style={{ flex: 1, minWidth: "220px" }}
                            />
                            {uploadingIdProof && (
                              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--primary-color)" }}>
                                <FaSpinner className="spin" /> Uploading...
                              </div>
                            )}
                            {walkinForm.id_proof_file && !uploadingIdProof && (
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  type="button"
                                  onClick={() => setPreviewDocUrl(formatProofDocUrl(walkinForm.id_proof_file))}
                                  style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", padding: "0.5rem 0.85rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px", fontWeight: "600" }}
                                >
                                  <FaEye /> Preview Document
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setWalkinForm({ ...walkinForm, id_proof_file: "" })}
                                  style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", padding: "0.5rem 0.75rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}
                                >
                                  <FaTrash /> Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 2: COMPANY DETAILS & GST VALIDATION */}
                    {walkinActiveTab === "company" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                      >
                        <div style={{ background: "var(--bg-subtle)", padding: "0.75rem 1rem", borderRadius: "10px", fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <FaBuilding color="var(--primary-color)" />
                          <span>Select an existing company from the dropdown or enter corporate profile with GSTIN validation.</span>
                        </div>

                        <div className="form-group" style={{ background: "rgba(99, 102, 241, 0.04)", border: "1px solid rgba(99, 102, 241, 0.2)", padding: "0.85rem 1rem", borderRadius: "10px" }}>
                          <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                            <span style={{ fontWeight: "700", color: "var(--primary-color)", fontSize: "0.85rem" }}>
                              🏢 Select Registered Company
                            </span>
                            {walkinForm.company_id && (
                              <span style={{ fontSize: "0.75rem", background: "var(--primary-color)", color: "#fff", padding: "2px 8px", borderRadius: "12px", fontWeight: "700" }}>
                                {walkinForm.company_id}
                              </span>
                            )}
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
                          >
                            <option value="">-- None / Select Registered Company --</option>
                            <option value="new">+ Add New Company Profile</option>
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
                              onChange={(e) => setWalkinForm({ ...walkinForm, company_name: e.target.value })}
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
                            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span>GST Number (GSTIN)</span>
                              {walkinForm.company_gst && (
                                <span style={{ fontSize: "0.72rem", color: isGSTValid ? "#059669" : "#DC2626", fontWeight: "700" }}>
                                  {isGSTValid ? "✓ Valid GSTIN Structure" : "⚠ Invalid Format"}
                                </span>
                              )}
                            </label>
                            <input
                              type="text"
                              maxLength={15}
                              placeholder="e.g. 33AAAAA0000A1Z5"
                              value={walkinForm.company_gst}
                              onChange={(e) => setWalkinForm({ ...walkinForm, company_gst: e.target.value.toUpperCase() })}
                              style={{
                                borderColor: walkinForm.company_gst ? (isGSTValid ? "#059669" : "#DC2626") : undefined,
                              }}
                            />
                          </div>
                        </div>

                        {/* Visual GSTIN Breakdown Alert when format is invalid */}
                        {walkinForm.company_gst && !isGSTValid && (
                          <GSTStructureAlert>
                            <div className="gst-title">
                              <FaExclamationTriangle /> Format of GSTIN (Know your GSTIN Structure)
                            </div>
                            <div className="gst-diagram">
                              <div className="gst-pill pill-state">
                                <div>22</div>
                                <div style={{ fontSize: "0.6rem", fontWeight: "normal", opacity: 0.9 }}>State Code</div>
                              </div>
                              <div className="gst-pill pill-pan">
                                <div>AAAAA0000A</div>
                                <div style={{ fontSize: "0.6rem", fontWeight: "normal", opacity: 0.9 }}>Permanent Account Number (PAN)</div>
                              </div>
                              <div className="gst-pill pill-entity">
                                <div>1</div>
                                <div style={{ fontSize: "0.6rem", fontWeight: "normal", opacity: 0.9 }}>Entity #</div>
                              </div>
                              <div className="gst-pill pill-z">
                                <div>Z</div>
                                <div style={{ fontSize: "0.6rem", fontWeight: "normal", opacity: 0.9 }}>Default 'Z'</div>
                              </div>
                              <div className="gst-pill pill-check">
                                <div>5</div>
                                <div style={{ fontSize: "0.6rem", fontWeight: "normal", opacity: 0.9 }}>Checksum</div>
                              </div>
                            </div>
                            <ul className="gst-rules-list">
                              <li><strong>First 2 digits:</strong> State code of the registered entity (e.g. 33 for Tamil Nadu, 22 for Chhattisgarh)</li>
                              <li><strong>Next 10 characters:</strong> PAN of the registered entity (5 letters, 4 digits, 1 letter)</li>
                              <li><strong>13th character:</strong> Entity number of the same PAN holder in state</li>
                              <li><strong>14th character:</strong> Alphabet 'Z' by default</li>
                              <li><strong>15th character:</strong> Check code digit or alphabet used for detection of errors</li>
                            </ul>
                          </GSTStructureAlert>
                        )}
                      </motion.div>
                    )}

                    {/* TAB 3: ROOM SELECTION */}
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

                    {/* TAB 4: EXTRA ADD-ONS & BILLING */}
                    {walkinActiveTab === "addons" && (
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
                            <label>Dining & Service Location Option</label>
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

                          {/* Search & Add Menu Item Selector */}
                          <div style={{ marginBottom: "0.85rem" }}>
                            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "4px" }}>
                              Add Menu Item (from Travellers INN Menu)
                            </label>
                            <FoodItemSelector menuItems={menuItems} onAddItem={handleAddFoodItem} />
                          </div>

                          {/* Food Items Table */}
                          <div style={{ border: "1px solid var(--border-light)", borderRadius: "10px", overflow: "hidden", marginBottom: "0.85rem" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                              <thead>
                                <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border-light)", textAlign: "left" }}>
                                  <th style={{ padding: "0.6rem 0.85rem" }}>Food Item</th>
                                  <th style={{ padding: "0.6rem 0.85rem", width: "100px" }}>Rate (₹)</th>
                                  <th style={{ padding: "0.6rem 0.85rem", width: "80px" }}>Count</th>
                                  <th style={{ padding: "0.6rem 0.85rem", textAlign: "right", width: "90px" }}>Total</th>
                                  <th style={{ padding: "0.6rem 0.5rem", textAlign: "center", width: "40px" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(!walkinForm.food_items || walkinForm.food_items.length === 0) ? (
                                  <tr>
                                    <td colSpan="5" style={{ padding: "1.2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                                      No food items added yet. Search and select items from the menu above.
                                    </td>
                                  </tr>
                                ) : (
                                  walkinForm.food_items.map((fItem, idx) => {
                                    const itemRate = parseFloat(fItem.rate) || 0;
                                    const itemCount = parseInt(fItem.count, 10) || 0;
                                    const rowTotal = itemRate * itemCount;
                                    return (
                                      <tr key={fItem.item_id ? `item_${fItem.item_id}_${idx}` : `custom_${idx}`} style={{ borderBottom: "1px solid var(--border-light)" }}>
                                        <td style={{ padding: "0.6rem 0.85rem", fontWeight: "600", verticalAlign: "middle" }}>
                                          🍽️ {fItem.item_name}
                                        </td>
                                        <td style={{ padding: "0.6rem 0.5rem", verticalAlign: "middle" }}>
                                          <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={fItem.rate !== undefined ? fItem.rate : ""}
                                            onChange={(e) => handleUpdateFoodItem(idx, "rate", e.target.value)}
                                            style={{ width: "100%", padding: "5px 6px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                          />
                                        </td>
                                        <td style={{ padding: "0.6rem 0.5rem", verticalAlign: "middle" }}>
                                          <input
                                            type="number"
                                            min="1"
                                            value={fItem.count !== undefined ? fItem.count : 1}
                                            onChange={(e) => handleUpdateFoodItem(idx, "count", e.target.value)}
                                            style={{ width: "100%", padding: "5px 6px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                          />
                                        </td>
                                        <td style={{ padding: "0.6rem 0.85rem", textAlign: "right", fontWeight: "700", verticalAlign: "middle" }}>
                                          ₹{rowTotal.toFixed(2)}
                                        </td>
                                        <td style={{ padding: "0.6rem 0.5rem", textAlign: "center", verticalAlign: "middle" }}>
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveFoodItem(idx)}
                                            style={{
                                              background: "rgba(239, 68, 68, 0.1)",
                                              border: "none",
                                              borderRadius: "6px",
                                              color: "#EF4444",
                                              width: "24px",
                                              height: "24px",
                                              cursor: "pointer",
                                              display: "inline-flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              fontWeight: "bold",
                                              fontSize: "0.8rem",
                                            }}
                                            title="Remove item"
                                          >
                                            ✕
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                )}
                              </tbody>
                            </table>
                          </div>

                          {/* Optional Additional Food Charges */}
                          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "0.4rem" }}>
                            <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                              Additional / Custom Food Charge (₹):
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={walkinForm.food_custom_charge || ""}
                              placeholder="0"
                              onChange={(e) => setWalkinForm({ ...walkinForm, food_custom_charge: e.target.value })}
                              style={{ width: "130px", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                            />
                          </div>
                        </div>

                        {/* Section 2: Amenities (Extra Bed supports ₹300 / ₹500) */}
                        <div style={{ background: "#FFFFFF", border: "1px solid var(--border-light)", borderRadius: "12px", padding: "1.1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.6rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div style={{ background: "rgba(59, 130, 246, 0.12)", color: "#2563EB", width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FaBed size={14} />
                              </div>
                              <span style={{ fontWeight: "700", color: "var(--primary-dark)", fontSize: "0.92rem" }}>
                                Amenities & Extra Bed
                              </span>
                            </div>
                            <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#2563EB", background: "#EFF6FF", padding: "3px 8px", borderRadius: "6px" }}>
                              Amenities Total: ₹{totals.amenitiesTotal}
                            </span>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                            {/* Premium WiFi */}
                            <div style={{ border: `1px solid ${walkinForm.addon_wifi ? "var(--primary-color)" : "var(--border-light)"}`, background: walkinForm.addon_wifi ? "rgba(74, 30, 93, 0.04)" : "#FAFAFA", borderRadius: "10px", padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "700", fontSize: "0.88rem", color: "var(--primary-dark)" }}>
                                  <FaWifi color="#2563EB" /> Premium WiFi
                                </div>
                                <div style={{ fontWeight: "800", color: "var(--primary-dark)", fontSize: "0.9rem" }}>
                                  ₹{walkinForm.addon_wifi ? (walkinForm.addon_wifi_price || 200) : 0}
                                </div>
                              </div>
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

                            {/* Extra Bed (₹300 Standard / ₹500 Premium) */}
                            <div style={{ border: "1px solid var(--border-light)", background: "#FAFAFA", borderRadius: "10px", padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "700", fontSize: "0.88rem", color: "var(--primary-dark)" }}>
                                  <FaBed color="#7C3AED" /> Extra Bed (Options)
                                </div>
                                <div style={{ fontWeight: "800", color: "var(--primary-dark)", fontSize: "0.9rem" }}>
                                  ₹{totals.extraBedAmt}
                                </div>
                              </div>
                              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "0.5rem", alignItems: "center" }}>
                                <input
                                  type="number"
                                  min="0"
                                  value={walkinForm.addon_extrabed_count}
                                  onChange={(e) => setWalkinForm({ ...walkinForm, addon_extrabed_count: e.target.value })}
                                  placeholder="Count (0)"
                                  style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                />
                                <select
                                  value={walkinForm.addon_extrabed_rate}
                                  onChange={(e) => setWalkinForm({ ...walkinForm, addon_extrabed_rate: parseFloat(e.target.value) })}
                                  style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem", fontWeight: "600" }}
                                >
                                  <option value={300}>Standard Extra Bed (₹300)</option>
                                  <option value={500}>Premium Extra Bed (₹500)</option>
                                </select>
                              </div>
                            </div>

                            {/* Laundry Service */}
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
                                  placeholder="Charge ₹"
                                  style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                />
                                <input
                                  type="text"
                                  value={walkinForm.addon_laundry_remarks}
                                  onChange={(e) => setWalkinForm({ ...walkinForm, addon_laundry_remarks: e.target.value })}
                                  placeholder="Remarks / clothes"
                                  style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                />
                              </div>
                            </div>

                            {/* Late Checkout */}
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
                                <input
                                  type="number"
                                  min="0"
                                  value={walkinForm.addon_latecheckout_hours}
                                  onChange={(e) => setWalkinForm({ ...walkinForm, addon_latecheckout_hours: e.target.value })}
                                  placeholder="Hours"
                                  style={{ width: "100%", padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem" }}
                                />
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                                  × ₹{walkinForm.addon_latecheckout_rate || 250} / hr
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Others */}
                        <div style={{ background: "#FFFFFF", border: "1px solid var(--border-light)", borderRadius: "12px", padding: "1.1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.6rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div style={{ background: "rgba(124, 58, 237, 0.12)", color: "#7C3AED", width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FaPlusSquare size={14} />
                              </div>
                              <span style={{ fontWeight: "700", color: "var(--primary-dark)", fontSize: "0.92rem" }}>
                                Other Add-ons
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
                                placeholder="e.g. Airport Transfer / Room Decor"
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
                        </div>
                      </motion.div>
                    )}

                    {/* LIVE BILLING & DISCOUNT-FIRST GST BREAKDOWN BOX (Always Visible) */}
                    <BillingSummaryBox>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E9D5FF", paddingBottom: "0.5rem" }}>
                        <span style={{ fontWeight: "700", color: "var(--primary-dark)", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <FaReceipt /> Billing & Tax Breakdown (GST Calculated from Discounted Amount)
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          Rooms: {walkinForm.selected_rooms.length} | Stay: {totals.nights} Night{totals.nights > 1 ? "s" : ""}
                        </span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFFFFF", padding: "0.55rem 0.85rem", borderRadius: "8px", border: "1px solid #DDD6FE" }}>
                        <label style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--primary-dark)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>Bill Type:</span>
                          <span style={{ fontSize: "0.72rem", fontWeight: "500", color: "var(--text-muted)" }}>
                            ({walkinForm.bill_type === "Net Rate" ? "GST Included in Tariff" : "GST 5% Added on Subtotal"})
                          </span>
                        </label>
                        <select
                          value={walkinForm.bill_type || "Rack"}
                          onChange={(e) => setWalkinForm({ ...walkinForm, bill_type: e.target.value })}
                          style={{ padding: "4px 10px", borderRadius: "6px", border: "1.5px solid var(--primary-color)", fontWeight: "700", fontSize: "0.82rem", background: "rgba(99, 102, 241, 0.06)", color: "var(--primary-dark)", cursor: "pointer" }}
                        >
                          <option value="Rack">Rack (GST 5% Additional)</option>
                          <option value="Net Rate">Net Rate (GST Included within Amount)</option>
                        </select>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.82rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Room Tariff:</span>
                          <strong>₹{totals.roomTotal.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Extra Add-ons Total:</span>
                          <strong>₹{totals.addonsTotal.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #E9D5FF", paddingTop: "0.3rem" }}>
                          <span>Subtotal:</span>
                          <strong>₹{totals.subtotal.toFixed(2)}</strong>
                        </div>
                        {totals.discount > 0 && (
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#DC2626", borderTop: "1px dashed #E9D5FF", paddingTop: "0.3rem" }}>
                            <span>Discount Applied:</span>
                            <strong>-₹{totals.discount.toFixed(2)}</strong>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", gridColumn: "1 / -1", background: "rgba(74, 30, 93, 0.04)", padding: "4px 8px", borderRadius: "6px", color: "var(--primary-dark)" }}>
                          <span>Discounted Taxable Amount:</span>
                          <strong>₹{totals.taxableAmount.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--primary-color)" }}>
                          <span>CGST (2.5%):</span>
                          <strong>{totals.billType === "Net Rate" ? "(Incl) " : "+"}₹{totals.cgst.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--primary-color)" }}>
                          <span>SGST (2.5%):</span>
                          <strong>{totals.billType === "Net Rate" ? "(Incl) " : "+"}₹{totals.sgst.toFixed(2)}</strong>
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

                      {/* Discount inputs (Discount remarks mandatory if discount > 0) */}
                      <div className="form-row" style={{ marginTop: "0.25rem" }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: "0.78rem" }}>Discount Amount (₹)</label>
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={walkinForm.discount_amount}
                            onChange={(e) => setWalkinForm({ ...walkinForm, discount_amount: e.target.value })}
                            placeholder="0"
                          />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: "0.78rem" }}>
                            Discount Remarks {parseFloat(walkinForm.discount_amount) > 0 && <span style={{ color: "#DC2626" }}>* (Mandatory)</span>}
                          </label>
                          <input
                            type="text"
                            required={parseFloat(walkinForm.discount_amount) > 0}
                            value={walkinForm.discount_remarks}
                            onChange={(e) => setWalkinForm({ ...walkinForm, discount_remarks: e.target.value })}
                            placeholder="e.g. Seasonal corporate discount"
                            style={{
                              borderColor: parseFloat(walkinForm.discount_amount) > 0 && !walkinForm.discount_remarks ? "#DC2626" : undefined,
                            }}
                          />
                        </div>
                      </div>

                      {/* Payment inputs (Debit card, Credit card options, Card Type & Transaction ID) */}
                      <div className="form-row" style={{ marginTop: "0.25rem" }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: "0.78rem" }}>Amount Paid (₹)</label>
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={walkinForm.amount_paid !== undefined && walkinForm.amount_paid !== null ? walkinForm.amount_paid : ""}
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
                            <option value="debit_card">Debit Card</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="net_banking">Net Banking</option>
                            <option value="online">Online Transfer</option>
                          </select>
                        </div>
                        {(walkinForm.payment_method === "debit_card" || walkinForm.payment_method === "credit_card") && (
                          <div className="form-group" style={{ margin: 0 }}>
                            <label style={{ fontSize: "0.78rem" }}>Card Type *</label>
                            <select
                              value={walkinForm.card_type || "RuPay"}
                              onChange={(e) => setWalkinForm({ ...walkinForm, card_type: e.target.value })}
                            >
                              <option value="RuPay">RuPay</option>
                              <option value="MasterCard">MasterCard</option>
                              <option value="Visa">Visa</option>
                              <option value="American Express">American Express (Amex)</option>
                              <option value="Diners Club">Diners Club</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Transaction ID input (Mandatory if payment method !== cash and amount > 0) */}
                      {walkinForm.payment_method !== "cash" && (
                        <div className="form-group" style={{ marginTop: "0.25rem" }}>
                          <label style={{ fontSize: "0.78rem" }}>
                            Transaction ID / Reference Number * <span style={{ color: "#DC2626" }}>(Mandatory for {walkinForm.payment_method.replace(/_/g, " ").toUpperCase()})</span>
                          </label>
                          <input
                            type="text"
                            required={walkinForm.payment_method !== "cash" && parseFloat(walkinForm.amount_paid) > 0}
                            placeholder="e.g. TXN-893829103 / UPI-Ref-12938"
                            value={walkinForm.transaction_id}
                            onChange={(e) => setWalkinForm({ ...walkinForm, transaction_id: e.target.value })}
                            style={{
                              borderColor: walkinForm.payment_method !== "cash" && parseFloat(walkinForm.amount_paid) > 0 && !walkinForm.transaction_id ? "#DC2626" : undefined,
                            }}
                          />
                        </div>
                      )}

                      {/* Net Due and Balance Bar */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "10px", marginTop: "0.4rem", border: "1px solid #DDD6FE" }}>
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                            Net Payable
                          </div>
                          <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--primary-dark)" }}>
                            ₹{totals.netAmount.toFixed(2)}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "0.72rem", color: totals.balanceRemaining > 0 ? "#DC2626" : "#059669", textTransform: "uppercase", fontWeight: "700" }}>
                            {totals.balanceRemaining > 0 ? "Balance Remaining" : "Payment Status"}
                          </div>
                          <div style={{ fontSize: "1.1rem", fontWeight: "800", color: totals.balanceRemaining > 0 ? "#DC2626" : "#059669" }}>
                            {totals.balanceRemaining > 0 ? `₹${totals.balanceRemaining.toFixed(2)}` : "Fully Paid ✓"}
                          </div>
                        </div>
                      </div>
                    </BillingSummaryBox>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => { setIsWalkinOpen(false); setEditingBookingId(null); }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingBookingId ? "Update Reservation" : "Confirm Reservation"}
                    </button>
                  </div>
                </form>
              </ModalPortalContainer>
            </ModalPortalOverlay>,
            document.body
          );
        })()}

      {/* 2. ROOM AVAILABILITY MATRIX SELECTOR MODAL (PORTAL) */}
      {isRoomSelectModalOpen &&
        ReactDOM.createPortal(
          <ModalPortalOverlay onClick={() => setIsRoomSelectModalOpen(false)}>
            <ModalPortalContainer
              $maxWidth="900px"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3 style={{ margin: 0 }}>Select Vacant Room(s)</h3>
                  <p style={{ margin: "2px 0 0", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Dates: {formatDateDisplay(walkinForm.check_in)} → {formatDateDisplay(walkinForm.check_out)}
                  </p>
                </div>
                <button onClick={() => setIsRoomSelectModalOpen(false)}>✕</button>
              </div>

              <div className="modal-body">
                {/* Status Color Legend Bar */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", background: "var(--bg-subtle)", padding: "0.85rem 1.1rem", borderRadius: "10px", marginBottom: "1.2rem", border: "1px solid var(--border-light)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#10B981", border: "1px solid #059669" }} />
                    <span style={{ color: "#065F46" }}>🟢 Vacant (Available)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#3B82F6", border: "1px solid #2563EB" }} />
                    <span style={{ color: "#1D4ED8" }}>🔵 Booked</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#EF4444", border: "1px solid #DC2626" }} />
                    <span style={{ color: "#991B1B" }}>🔴 Occupied</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#F59E0B", border: "1px solid #D97706" }} />
                    <span style={{ color: "#92400E" }}>🟡 Dirty (Needs Cleaning)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: "700" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#1F2937", border: "1px solid #111827" }} />
                    <span style={{ color: "#1F2937" }}>⚫ Under Maintenance</span>
                  </div>
                </div>

                {loadingAvailability ? (
                  <div style={{ textAlign: "center", padding: "3rem" }}>
                    <FaSpinner className="spin" size={26} color="var(--primary-color)" />
                    <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Checking real-time room availability...
                    </div>
                  </div>
                ) : (
                  <RoomCardGrid>
                    {availabilityRooms.map((r) => {
                      const rNumStr = String(r.room_number);
                      const isSelected = walkinForm.selected_rooms.includes(rNumStr);

                      // Detailed status determination matching RoomAvailability themes
                      const rawStatus = (r.status || "").toLowerCase().trim();
                      const rawColor = (r.color || r.color_code || "").toLowerCase().trim();
                      const isInactive = r.is_active === false || r.status === "inactive";
                      const isCleaned = r.isCleaned !== false;

                      let theme = {
                        status: "vacant",
                        statusLabel: "Vacant (Available)",
                        borderColor: "#10B981",
                        bgColor: "#F0FDF4",
                        statusBg: "#ECFDF5",
                        statusColor: "#065F46",
                        icon: <FaCheckCircle color="#10B981" size={12} />,
                        isSelectable: true,
                      };

                      if (
                        isInactive ||
                        rawStatus === "maintenance" ||
                        rawStatus === "undermaintenance" ||
                        rawStatus === "under maintenance" ||
                        rawColor === "black" ||
                        rawColor === "#1f2937" ||
                        rawColor === "#111827"
                      ) {
                        theme = {
                          status: "maintenance",
                          statusLabel: "Under Maintenance",
                          borderColor: "#1F2937",
                          bgColor: "#F3F4F6",
                          statusBg: "#1F2937",
                          statusColor: "#FFFFFF",
                          icon: <FaTools color="#FFFFFF" size={11} />,
                          isSelectable: false,
                        };
                      } else if (
                        rawStatus === "dirty" ||
                        rawStatus === "needs cleaning" ||
                        rawColor === "orange" ||
                        rawColor === "yellow" ||
                        rawColor === "#f59e0b" ||
                        !isCleaned
                      ) {
                        theme = {
                          status: "dirty",
                          statusLabel: "Dirty (Needs Cleaning)",
                          borderColor: "#F59E0B",
                          bgColor: "#FFFBEB",
                          statusBg: "#FEF3C7",
                          statusColor: "#92400E",
                          icon: <FaBroom color="#D97706" size={12} />,
                          isSelectable: false,
                        };
                      } else if (
                        rawStatus === "occupied" ||
                        rawStatus === "checked in" ||
                        rawStatus === "checked_in" ||
                        rawColor === "red" ||
                        rawColor === "#ef4444" ||
                        rawColor === "#dc2626" ||
                        r.is_occupied
                      ) {
                        theme = {
                          status: "occupied",
                          statusLabel: "Occupied",
                          borderColor: "#EF4444",
                          bgColor: "#FEF2F2",
                          statusBg: "#FEE2E2",
                          statusColor: "#991B1B",
                          icon: <FaTimesCircle color="#DC2626" size={12} />,
                          isSelectable: false,
                        };
                      } else if (
                        rawStatus === "booked" ||
                        rawStatus === "confirmed" ||
                        rawColor === "blue" ||
                        rawColor === "#3b82f6" ||
                        rawColor === "#2563eb"
                      ) {
                        theme = {
                          status: "booked",
                          statusLabel: "Booked",
                          borderColor: "#3B82F6",
                          bgColor: "#EFF6FF",
                          statusBg: "#DBEAFE",
                          statusColor: "#1D4ED8",
                          icon: <FaBed color="#2563EB" size={12} />,
                          isSelectable: false,
                        };
                      }

                      return (
                        <RoomStatusSelectCard
                          key={r.room_number}
                          $selected={isSelected}
                          $disabled={!theme.isSelectable}
                          $borderColor={theme.borderColor}
                          $bgColor={theme.bgColor}
                          $statusBg={theme.statusBg}
                          $statusColor={theme.statusColor}
                          onClick={() => {
                            if (theme.isSelectable) {
                              toggleRoomSelection(r.room_number);
                            } else {
                              toast.warning(`Room ${r.room_number} is ${theme.statusLabel} and cannot be selected.`);
                            }
                          }}
                        >
                          <div className="room-header">
                            <span className="room-num">Room #{r.room_number}</span>
                            {isSelected ? (
                              <span style={{ color: "var(--primary-color)", fontSize: "1.15rem" }}>
                                <FaCheckCircle />
                              </span>
                            ) : (
                              <span style={{ display: "inline-flex", alignItems: "center" }}>
                                {theme.icon}
                              </span>
                            )}
                          </div>
                          <div className="room-type">{r.room_type || "Deluxe Suite"}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.6rem" }}>
                            <span className="room-price">₹{r.price || 1600}</span>
                            <span className="status-tag">
                              {theme.icon}
                              {theme.statusLabel}
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
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsRoomSelectModalOpen(false)}
                >
                  Confirm Room Selection ({walkinForm.selected_rooms.length})
                </button>
              </div>
            </ModalPortalContainer>
          </ModalPortalOverlay>,
          document.body
        )}

      {/* 3. ATTACHED PROOF DOCUMENT PREVIEW LIGHTBOX MODAL (PORTAL) */}
      {previewDocUrl &&
        ReactDOM.createPortal(
          <IdProofDocumentPreview
            url={previewDocUrl}
            onClose={() => setPreviewDocUrl(null)}
          />,
          document.body
        )}

      {/* 4. VIEW RESERVATION DETAILS MODAL (PORTAL) */}
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
                        <div style={{ fontSize: "0.74rem", color: "#16A34A", marginTop: "2px" }}>
                          Actual Check-in: {formatDateDisplay(selectedBooking.guest_check_in)}
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
                      {selectedBooking.guest_check_out && (
                        <div style={{ fontSize: "0.74rem", color: "#7C3AED", marginTop: "2px" }}>
                          Actual Check-out: {formatDateDisplay(selectedBooking.guest_check_out)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      ID Proof
                    </span>
                    <div style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                      {selectedBooking.id_proof_type || "Aadhaar"}: {selectedBooking.id_proof_number || "Verified"}
                      {selectedBooking.id_proof_file && (
                        <div style={{ marginTop: "4px" }}>
                          <button
                            type="button"
                            onClick={() => setPreviewDocUrl(formatProofDocUrl(selectedBooking.id_proof_file))}
                            style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", padding: "2px 8px", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: "600" }}
                          >
                            <FaEye /> Preview Attached Proof
                          </button>
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
                  </div>
                </div>

                {/* Financial Summary */}
                {(() => {
                  const fin = calculateBookingFinancials(selectedBooking);
                  return (
                    <div style={{ background: "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)", border: "1px solid #E9D5FF", padding: "1rem 1.25rem", borderRadius: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ color: "var(--primary-dark)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                          <FaReceipt /> Billing & Financial Summary (GST on Discounted Base)
                        </strong>
                        <span style={{ fontSize: "0.75rem", background: fin.billType === "Net Rate" ? "#DBEAFE" : "#E0E7FF", color: fin.billType === "Net Rate" ? "#1E40AF" : "#4338CA", padding: "2px 8px", borderRadius: "12px", fontWeight: "700" }}>
                          {fin.billType === "Net Rate" ? "Net Rate (Inclusive)" : "Rack Rate (Exclusive)"}
                        </span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1.5rem", marginTop: "0.6rem", fontSize: "0.82rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Subtotal:</span>
                          <strong>₹{fin.subtotal.toFixed(2)}</strong>
                        </div>
                        {fin.discount > 0 && (
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#DC2626" }}>
                            <span>Discount {selectedBooking.discount_remarks ? `(${selectedBooking.discount_remarks})` : ""}:</span>
                            <strong>-₹{fin.discount.toFixed(2)}</strong>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Taxable Base:</span>
                          <strong>₹{fin.taxableAmount.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>CGST (2.5%):</span>
                          <strong>{fin.billType === "Net Rate" ? "(Incl) " : "+"}₹{fin.cgst.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>SGST (2.5%):</span>
                          <strong>{fin.billType === "Net Rate" ? "(Incl) " : "+"}₹{fin.sgst.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #D8B4FE", paddingTop: "0.35rem", gridColumn: "1 / -1" }}>
                          <strong>Net Total Payable:</strong>
                          <strong style={{ color: "var(--primary-dark)", fontSize: "0.95rem" }}>
                            ₹{fin.netPayable.toFixed(2)}
                          </strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "#15803D" }}>
                          <span>Paid:</span>
                          <strong>₹{fin.paid.toFixed(2)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: fin.balanceDue > 0 ? "#DC2626" : "#15803D" }}>
                          <span>Balance:</span>
                          <strong>₹{fin.balanceDue.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })()}
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

      {/* 5. RECORD PAYMENT MODAL (PORTAL) */}
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
                      <div style={{ background: "var(--bg-subtle)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-light)", display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.85rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Booking ID:</span>
                          <strong>#{paymentModalBooking.booking_id}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Guest Name:</span>
                          <strong>{paymentModalBooking.guest_name}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "#DC2626", fontWeight: "800", marginTop: "0.2rem", paddingTop: "0.4rem", borderTop: "1px solid var(--border-light)" }}>
                          <span>Balance Remaining:</span>
                          <span>₹{fin.balanceDue.toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="form-group">
                    <label>Amount Received Now (₹) *</label>
                    <input
                      type="number"
                      step="any"
                      min="0.01"
                      required
                      placeholder="Enter amount"
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    />
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
                        <option value="debit_card">Debit Card</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="net_banking">Net Banking</option>
                        <option value="online">Online Transfer</option>
                      </select>
                    </div>

                    {(paymentForm.payment_type === "debit_card" || paymentForm.payment_type === "credit_card") && (
                      <div className="form-group">
                        <label>Card Type *</label>
                        <select
                          value={paymentForm.card_type || "RuPay"}
                          onChange={(e) => setPaymentForm({ ...paymentForm, card_type: e.target.value })}
                        >
                          <option value="RuPay">RuPay</option>
                          <option value="MasterCard">MasterCard</option>
                          <option value="Visa">Visa</option>
                          <option value="American Express">American Express (Amex)</option>
                          <option value="Diners Club">Diners Club</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    )}

                    <div className="form-group">
                      <label>
                        Transaction ID {paymentForm.payment_type !== "cash" && <span style={{ color: "#DC2626" }}>*</span>}
                      </label>
                      <input
                        type="text"
                        required={paymentForm.payment_type !== "cash"}
                        placeholder="e.g. TXN-123456"
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

      {/* 6. STATUS MODAL (PORTAL) */}
      {statusModalBooking && (() => {
        const fin = calculateBookingFinancials(statusModalBooking);
        const balanceDue = fin.balanceDue;
        const currentSt = String(statusModalBooking.booking_status || statusModalBooking.status || "").toLowerCase().replace(/_/g, " ").trim();
        const isCheckedIn = currentSt === "checked in" || currentSt === "occupied" || !!statusModalBooking.guest_check_in;
        const canCheckout = isCheckedIn && balanceDue <= 0;

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

                {!isCheckedIn && (
                  <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "8px", padding: "0.75rem", fontSize: "0.8rem", color: "#1E40AF" }}>
                    <FaInfoCircle style={{ marginRight: "4px" }} />
                    <strong>Checkout Disabled:</strong> Guest has not checked in yet. You must change status to <strong>Checked In</strong> before checking out.
                  </div>
                )}

                {balanceDue > 0 && isCheckedIn && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px", padding: "0.75rem", fontSize: "0.8rem", color: "#991B1B" }}>
                    <FaExclamationTriangle style={{ marginRight: "4px" }} />
                    <strong>Checkout Disabled:</strong> Guest has an outstanding balance of <strong>₹{balanceDue.toFixed(2)}</strong>. Record full payment first.
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
                      disabled={!canCheckout}
                    >
                      Checked Out {!isCheckedIn ? "(Disabled - Check-in Required First)" : (balanceDue > 0 ? `(Disabled - Due: ₹${balanceDue.toFixed(2)})` : "")}
                    </option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                {String(newStatusVal).replace(/_/g, " ").toLowerCase() === "cancelled" && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ color: "#DC2626", fontWeight: "600" }}>
                      Cancellation Reason <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please enter the reason for cancellation (Mandatory)..."
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        border: "1px solid #DC2626",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        outline: "none",
                        resize: "vertical",
                      }}
                      required
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setStatusModalBooking(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleUpdateStatus}
                  disabled={
                    (String(newStatusVal).replace(/_/g, " ").toLowerCase() === "checked out" && !canCheckout) ||
                    (String(newStatusVal).replace(/_/g, " ").toLowerCase() === "cancelled" && !cancellationReason.trim())
                  }
                >
                  Save Status
                </button>
              </div>
            </ModalPortalContainer>
          </ModalPortalOverlay>,
          document.body
        );
      })()}

      {/* 7. PRINT INVOICE MODAL (PORTAL) */}
      {invoiceBooking && (() => {
        const fin = calculateBookingFinancials(invoiceBooking);
        const paidAmount = getAmountPaid(invoiceBooking);
        const bStatusNorm = String(invoiceBooking.booking_status || invoiceBooking.status || "").toLowerCase().replace(/_/g, " ").trim();
        const isCancelled = bStatusNorm === "cancelled" || bStatusNorm === "canceled" || bStatusNorm === "cancellation requested";
        const pd = parsePaymentDetails(invoiceBooking);
        const cancelReason = invoiceBooking.cancellation_reason || pd.cancellation_reason || "Cancelled by Admin / Guest";
        const cancelDate = invoiceBooking.lastmodified_date || invoiceBooking.cancelled_at || invoiceBooking.updated_at || invoiceBooking.created_date || null;

        let refundBillNo = "";
        let refundAmount = 0;
        let fineAmount = 0;

        if (Array.isArray(invoiceBooking.bills) && invoiceBooking.bills.length > 0) {
          const refBill = invoiceBooking.bills.find((bill) => parseFloat(bill.amount_paid) < 0 || String(bill.payment_type).includes("refund"));
          if (refBill) {
            refundBillNo = refBill.billing_no || "";
            refundAmount = Math.abs(parseFloat(refBill.amount_paid) || 0);
          }
        }

        if (!refundAmount && pd.refund_amount !== undefined && pd.refund_amount !== null) {
          refundAmount = Math.abs(parseFloat(pd.refund_amount) || 0);
        }
        if (pd.fine_amount !== undefined && pd.fine_amount !== null) {
          fineAmount = parseFloat(pd.fine_amount) || 0;
        }

        if (!refundBillNo) {
          if (Array.isArray(pd.billing_numbers) && pd.billing_numbers.length > 1) {
            refundBillNo = pd.billing_numbers[pd.billing_numbers.length - 1];
          } else if (pd.latest_billing_no) {
            refundBillNo = pd.latest_billing_no;
          }
        }

        if (isCancelled && paidAmount > 0) {
          if (refundAmount === 0 && fineAmount > 0) {
            refundAmount = Math.max(0, paidAmount - fineAmount);
          } else if (refundAmount > 0 && fineAmount === 0) {
            fineAmount = Math.max(0, paidAmount - refundAmount);
          } else if (refundAmount === 0 && fineAmount === 0) {
            refundAmount = paidAmount;
          }
        }

        const refundStatusRaw = pd.status || "";
        const refundStatus = refundStatusRaw === "refunded" ? "Refund Processed" : (refundStatusRaw === "refund_pending" ? "Refund Pending" : (isCancelled ? "Pending Approval / Processed" : "N/A"));

        return ReactDOM.createPortal(
          <ModalPortalOverlay onClick={() => setInvoiceBooking(null)}>
            <ModalPortalContainer
              $maxWidth="680px"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{isCancelled ? "Cancellation Folio & Refund Summary" : "Guest Folio & Invoice"}</h3>
                <button onClick={() => setInvoiceBooking(null)}>✕</button>
              </div>

              <div className="modal-body">
                <div style={{ borderBottom: `2px solid ${isCancelled ? "#DC2626" : "var(--primary-color)"}`, paddingBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h2 style={{ color: "var(--primary-dark)", margin: 0, fontSize: "1.3rem", fontWeight: 800 }}>TRAVELLER'S INN</h2>
                    <div style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                      <div>60/37,Saradha College Road</div>
                      <div>TIN:33766480010</div>
                      <div>SALEM - 636007, Tamilnadu  India</div>
                      <div>Phone:9884347488 , 7695939196</div>
                      <div style={{ fontWeight: 800, color: "var(--primary-dark)", marginTop: "4px" }}>GSTIN: 33AAMFT2081Q1ZM</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: "700", color: isCancelled ? "#DC2626" : "var(--primary-color)" }}>
                      {isCancelled ? "CANCELLATION FOLIO" : "INVOICE"}
                    </div>
                    {isCancelled && (
                      <span style={{ display: "inline-block", background: "#DC2626", color: "#FFFFFF", fontSize: "0.7rem", fontWeight: "800", padding: "1px 6px", borderRadius: "4px" }}>
                        CANCELLED
                      </span>
                    )}
                    <div style={{ fontSize: "0.8rem" }}>#{invoiceBooking.booking_id}</div>
                  </div>
                </div>

                {isCancelled && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px", padding: "0.75rem", fontSize: "0.8rem", color: "#7F1D1D", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", color: "#991B1B", borderBottom: "1px dashed #F87171", paddingBottom: "4px" }}>
                      <span>⚠️ Cancellation & Refund Details</span>
                      <span style={{ background: "#FEE2E2", padding: "1px 6px", borderRadius: "4px" }}>{refundStatus}</span>
                    </div>
                    <div><strong>Reason:</strong> {cancelReason}</div>
                    <div><strong>Cancellation Date:</strong> {cancelDate ? formatDateDisplay(cancelDate) : "Recorded"}</div>
                    {refundBillNo && <div><strong>Refund Bill Ref:</strong> {refundBillNo}</div>}
                    {refundAmount > 0 && <div><strong>Refund Amount:</strong> ₹{refundAmount.toFixed(2)}</div>}
                    {fineAmount > 0 && <div><strong>Cancellation / Fine Retained:</strong> ₹{fineAmount.toFixed(2)}</div>}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "0.82rem" }}>
                  <div>
                    <strong>Billed To:</strong>
                    <div>{invoiceBooking.guest_name}</div>
                    <div>{invoiceBooking.guest_phone}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong>Stay Details:</strong>
                    <div>Room: {formatRoomNumbers(invoiceBooking)}</div>
                    <div>Check-In: {formatDateDisplay(invoiceBooking.check_in)}</div>
                    <div>Check-Out: {formatDateDisplay(invoiceBooking.check_out)}</div>
                    {isCancelled && (
                      <div style={{ color: "#DC2626", fontWeight: "700" }}>Status: Cancelled</div>
                    )}
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.5rem", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                    <span>Subtotal:</span>
                    <strong>₹{fin.subtotal.toFixed(2)}</strong>
                  </div>
                  {fin.discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#DC2626", padding: "4px 0" }}>
                      <span>Discount:</span>
                      <strong>-₹{fin.discount.toFixed(2)}</strong>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                    <span>Taxable Base:</span>
                    <strong>₹{fin.taxableAmount.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                    <span>Total GST (5%):</span>
                    <strong>₹{fin.totalTax.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed var(--border-light)", paddingTop: "0.5rem", fontWeight: "700" }}>
                    <span>{isCancelled ? "Original Tariff:" : "Total Payable:"}</span>
                    <strong>₹{fin.netPayable.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#059669", fontWeight: "600" }}>
                    <span>Amount Collected:</span>
                    <strong>₹{paidAmount.toFixed(2)}</strong>
                  </div>
                  {isCancelled && (
                    <>
                      {fineAmount > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#991B1B" }}>
                          <span>Cancellation Fee Retained:</span>
                          <strong>₹{fineAmount.toFixed(2)}</strong>
                        </div>
                      )}
                      {refundAmount > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#2563EB", fontWeight: "700" }}>
                          <span>Refund ({refundStatus}):</span>
                          <strong>-₹{refundAmount.toFixed(2)}</strong>
                        </div>
                      )}
                    </>
                  )}
                </div>
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
                  <FaPrint /> Print {isCancelled ? "Cancellation Folio" : "Receipt"}
                </button>
              </div>
            </ModalPortalContainer>
          </ModalPortalOverlay>,
          document.body
        );
      })()}
    </PageContainer>
  );
};

export default ManageBookings;
