import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaCoins,
  FaDownload,
  FaSpinner,
  FaRupeeSign,
  FaPrint,
  FaCalendarAlt,
  FaFilter,
  FaReceipt,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import apiRequest from "../apiRequest";
import { toast } from "react-toastify";

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
    margin: 0;
  }

  .title-group p {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin: 4px 0 0 0;
  }

  .actions-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #4A1E5D 0%, #682B83 100%);
  color: #FFFFFF;
  border: none;
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 14px rgba(74, 30, 93, 0.25);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(74, 30, 93, 0.35);
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  background: #FFFFFF;
  color: var(--primary-color);
  border: 1px solid var(--border-light);
  padding: 0.65rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-subtle);
    border-color: var(--primary-light);
    transform: translateY(-1px);
  }
`;

const DateFilterCard = styled.div`
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  padding: 0.75rem 1.25rem;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 1rem !important;
  flex-wrap: wrap !important;
`;

const DateInputsWrapper = styled.div`
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 0.75rem !important;
  background: var(--bg-subtle) !important;
  padding: 0.35rem 0.85rem !important;
  border-radius: 10px !important;
  border: 1px solid var(--border-light) !important;
  flex-wrap: nowrap !important;
  white-space: nowrap !important;
`;

const DateFieldItem = styled.div`
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 0.5rem !important;
  margin: 0 !important;
  padding: 0 !important;
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
`;

const FieldLabel = styled.span`
  font-size: 0.76rem !important;
  font-weight: 700 !important;
  color: var(--text-secondary) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.35rem !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1 !important;
`;

const DateInputStyled = styled.input`
  display: inline-block !important;
  padding: 0.4rem 0.65rem !important;
  border: 1px solid var(--border-light) !important;
  border-radius: 6px !important;
  font-size: 0.83rem !important;
  color: var(--text-primary) !important;
  outline: none !important;
  background: #FFFFFF !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  width: 145px !important;
  height: 34px !important;
  margin: 0 !important;
  box-sizing: border-box !important;

  &:focus {
    border-color: var(--primary-color) !important;
    box-shadow: 0 0 0 2px rgba(74, 30, 93, 0.12) !important;
  }
`;

const QuickFilterGroup = styled.div`
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 0.35rem !important;
  background: var(--bg-subtle) !important;
  padding: 3px !important;
  border-radius: 10px !important;
  border: 1px solid var(--border-light) !important;
  flex-wrap: nowrap !important;
  white-space: nowrap !important;

  button {
    padding: 0.4rem 0.85rem !important;
    border-radius: 7px !important;
    font-size: 0.78rem !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    border: none !important;
    background: transparent !important;
    color: var(--text-secondary) !important;
    transition: all 0.2s ease !important;
    white-space: nowrap !important;

    &:hover {
      background: #FFFFFF !important;
      color: var(--primary-color) !important;
      box-shadow: var(--shadow-sm) !important;
    }

    &.active {
      background: var(--primary-color) !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 8px rgba(74, 30, 93, 0.25) !important;
    }
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
`;

const MetricBox = styled.div`
  background: #FFFFFF;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .details {
    display: flex;
    flex-direction: column;

    span.label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    span.val {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--primary-dark);
      font-family: 'Outfit', sans-serif;
    }
  }

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    background: ${(props) => props.$bg || "rgba(74, 30, 93, 0.1)"};
    color: ${(props) => props.$color || "var(--primary-color)"};
  }
`;

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
      padding: 1rem 1.15rem;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-light);
    }

    td {
      padding: 1rem 1.15rem;
      font-size: 0.85rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-light);
    }

    tbody tr:hover td {
      background: rgba(74, 30, 93, 0.02);
    }

    tfoot {
      background: #FDF4FF;
      border-top: 2px solid #E9D5FF;

      td {
        padding: 1.1rem 1.15rem;
        font-weight: 700;
        color: var(--primary-dark);
        border-bottom: none;
      }
    }
  }
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
    const s = String(props.$mode || "").toLowerCase().trim();
    if (s === "cash") {
      return `background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A;`;
    }
    return `background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;`;
  }}
`;

const BookingRefBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-size: 0.76rem;
  font-weight: 700;
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #BFDBFE;
`;

const getTodayISTString = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

const formatDateDisplay = (dateStr) => {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return dateStr;
  }
};

const formatDateOnly = (dateStr) => {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
};

const AccountSummary = () => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  
  const todayStr = getTodayISTString();
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [activeQuickFilter, setActiveQuickFilter] = useState("today");

  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({
    totalRevenue: 0,
    onlineRevenue: 0,
    cashRevenue: 0,
    transactionCount: 0,
  });

  const fetchBilling = async (sDate = startDate, eDate = endDate) => {
    setLoading(true);
    let url = `${TravellersBaseUrl}admin/billing-history/`;
    if (sDate && eDate) {
      url += `?start_date=${sDate}&end_date=${eDate}`;
    }
    const res = await apiRequest(url);
    if (res.success && res.data) {
      const records = Array.isArray(res.data) ? res.data : res.data.records || [];
      
      // Client-side date filtering fallback if needed
      let filtered = records;
      if (sDate && eDate) {
        filtered = records.filter((r) => {
          const dStr = r.created_date || r.date || r.created_at;
          if (!dStr) return true;
          try {
            const itemDateIST = new Intl.DateTimeFormat("en-CA", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(dStr));
            return itemDateIST >= sDate && itemDateIST <= eDate;
          } catch (e) {
            return true;
          }
        });
      }

      setBillingData(filtered);

      let tot = 0;
      let online = 0;
      let cash = 0;

      filtered.forEach((r) => {
        const amt = parseFloat(r.amount_paid || r.amount || r.total_amount || 0);
        tot += amt;
        const mode = (r.payment_type || r.payment_method || "").toLowerCase();
        if (mode === "cash") {
          cash += amt;
        } else {
          online += amt;
        }
      });

      setTotals({
        totalRevenue: tot,
        onlineRevenue: online,
        cashRevenue: cash,
        transactionCount: filtered.length,
      });
    } else {
      setBillingData([]);
      setTotals({ totalRevenue: 0, onlineRevenue: 0, cashRevenue: 0, transactionCount: 0 });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBilling(startDate, endDate);
  }, []);

  const handleApplyDateFilter = (s, e, filterName = "custom") => {
    setStartDate(s);
    setEndDate(e);
    setActiveQuickFilter(filterName);
    fetchBilling(s, e);
  };

  const handleQuickFilter = (type) => {
    const today = getTodayISTString();
    if (type === "today") {
      handleApplyDateFilter(today, today, "today");
    } else if (type === "yesterday") {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      const yestStr = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(d);
      handleApplyDateFilter(yestStr, yestStr, "yesterday");
    } else if (type === "thisMonth") {
      const [year, month] = today.split("-");
      const firstDay = `${year}-${month}-01`;
      handleApplyDateFilter(firstDay, today, "thisMonth");
    } else if (type === "all") {
      handleApplyDateFilter("", "", "all");
    }
  };

  const getBookingRef = (rec) => {
    if (rec.booking_id) return rec.booking_id;
    if (rec.booking && typeof rec.booking === "object" && rec.booking.booking_id) {
      return rec.booking.booking_id;
    }
    if (rec.booking && typeof rec.booking === "string" && !rec.booking.match(/^[0-9a-fA-F]{24}$/)) {
      return rec.booking;
    }
    return "—";
  };

  const getTransactionRef = (rec) => {
    return rec.transaction_id || rec.razorpay_payment_id || rec.payment_gateway_ref_id || "—";
  };

  const exportCSV = () => {
    if (billingData.length === 0) {
      toast.info("No billing data to export for the selected period");
      return;
    }
    const headers = ["Invoice / Billing #", "Date & Time", "Guest Name", "Booking Ref", "Transaction ID", "Payment Mode", "Amount (INR)"];
    const rows = billingData.map((rec, i) => [
      `"${rec.billing_no || rec.latest_billing_no || `TRL026/${String(i + 1).padStart(5, "0")}`}"`,
      `"${formatDateDisplay(rec.created_date || rec.date || rec.created_at)}"`,
      `"${rec.guest_name || rec.customer_name || "Guest"}"`,
      `"${getBookingRef(rec)}"`,
      `"${getTransactionRef(rec)}"`,
      `"${rec.payment_type || rec.payment_method || "Cash"}"`,
      rec.amount_paid || rec.amount || rec.total_amount || 0
    ]);

    // Add Gross Total row in CSV
    rows.push([
      `"GROSS TOTAL (${billingData.length} records)"`,
      `""`,
      `""`,
      `""`,
      `""`,
      `"Online: ₹${totals.onlineRevenue.toLocaleString()} | Cash: ₹${totals.cashRevenue.toLocaleString()}"`,
      totals.totalRevenue
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dateTag = startDate && endDate ? `${startDate}_to_${endDate}` : "All";
    link.setAttribute("download", `TravellersInn_Billing_Report_${dateTag}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Billing report downloaded as CSV");
  };

  const handlePrint = () => {
    if (billingData.length === 0) {
      toast.info("No billing records to print for the selected period");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Popup blocked. Please allow popups to print report.");
      return;
    }

    const datePeriodText = startDate && endDate
      ? (startDate === endDate ? `Date: ${formatDateOnly(startDate)}` : `Period: ${formatDateOnly(startDate)} to ${formatDateOnly(endDate)}`)
      : "Period: All Historical Records";

    const tableRowsHtml = billingData.map((rec, i) => {
      const bNo = rec.billing_no || rec.latest_billing_no || `TRL026/${String(i + 1).padStart(5, "0")}`;
      const gName = rec.guest_name || rec.customer_name || "Guest";
      const bRef = getBookingRef(rec);
      const txId = getTransactionRef(rec);
      const pMode = rec.payment_type || rec.payment_method || "Cash";
      const dStr = formatDateDisplay(rec.created_date || rec.date || rec.created_at);
      const amt = (rec.amount_paid || rec.amount || rec.total_amount || 0).toLocaleString();

      return `
        <tr>
          <td style="font-weight: 700; color: #4A1E5D;">${bNo}</td>
          <td style="font-size: 11px; color: #4B5563; white-space: nowrap;">${dStr}</td>
          <td>${gName}</td>
          <td>${bRef !== "—" ? `#${bRef}` : "—"}</td>
          <td style="font-family: monospace; font-size: 11px;">${txId}</td>
          <td style="text-transform: capitalize;">${pMode}</td>
          <td style="text-align: right; font-weight: 700; color: #15803D;">₹${amt}</td>
        </tr>
      `;
    }).join("");

    const printHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Financial & Billing Report - Travellers Inn</title>
        <style>
          @page { size: A4 landscape; margin: 12mm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1F2937; margin: 0; padding: 15px; font-size: 12px; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #4A1E5D; padding-bottom: 12px; margin-bottom: 15px; }
          .logo-title h1 { margin: 0; font-size: 20px; color: #4A1E5D; font-weight: 800; letter-spacing: 0.5px; }
          .logo-title p { margin: 3px 0 0 0; font-size: 11px; color: #6B7280; }
          .report-meta { text-align: right; }
          .report-meta .period-badge { background: #F3E8FF; color: #6B21A8; padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 11px; display: inline-block; margin-bottom: 4px; }
          .report-meta .gen-time { font-size: 10px; color: #9CA3AF; }
          
          .metrics-row { display: flex; gap: 12px; margin-bottom: 16px; }
          .metric-card { flex: 1; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px 12px; background: #F9FAFB; }
          .metric-card .m-label { font-size: 9px; text-transform: uppercase; color: #6B7280; font-weight: 700; letter-spacing: 0.4px; }
          .metric-card .m-val { font-size: 16px; font-weight: 800; color: #111827; margin-top: 2px; }
          
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th { background: #F3F4F6; color: #374151; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; padding: 8px 10px; border-bottom: 2px solid #D1D5DB; text-align: left; }
          td { padding: 8px 10px; border-bottom: 1px solid #E5E7EB; }
          
          tfoot tr td { background: #FAF5FF; border-top: 2px solid #C084FC; font-weight: 800; font-size: 13px; color: #4A1E5D; padding: 10px; }
          .footer-note { margin-top: 20px; font-size: 10px; color: #9CA3AF; text-align: center; border-top: 1px dashed #E5E7EB; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-title">
            <h1>TRAVELLERS INN</h1>
            <p>Financial, Accounts & Billing Report</p>
          </div>
          <div class="report-meta">
            <div class="period-badge">${datePeriodText}</div>
            <div class="gen-time">Generated on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-card">
            <div class="m-label">Total Gross Revenue</div>
            <div class="m-val" style="color: #4A1E5D;">₹${totals.totalRevenue.toLocaleString()}</div>
          </div>
          <div class="metric-card">
            <div class="m-label">Online / Razorpay</div>
            <div class="m-val" style="color: #10B981;">₹${totals.onlineRevenue.toLocaleString()}</div>
          </div>
          <div class="metric-card">
            <div class="m-label">Cash Collections</div>
            <div class="m-val" style="color: #D97706;">₹${totals.cashRevenue.toLocaleString()}</div>
          </div>
          <div class="metric-card">
            <div class="m-label">Total Invoices</div>
            <div class="m-val" style="color: #2563EB;">${totals.transactionCount}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Billing #</th>
              <th>Date & Time</th>
              <th>Guest Name</th>
              <th>Booking Ref</th>
              <th>Transaction ID</th>
              <th>Payment Mode</th>
              <th style="text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">GROSS TOTAL (${billingData.length} Transactions)</td>
              <td colspan="2" style="font-size: 11px; font-weight: 600; color: #6B21A8;">
                Online: ₹${totals.onlineRevenue.toLocaleString()} | Cash: ₹${totals.cashRevenue.toLocaleString()}
              </td>
              <td style="text-align: right; font-size: 14px; font-weight: 800; color: #4A1E5D;">
                ₹${totals.totalRevenue.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>

        <div class="footer-note">
          This is an official system generated report from Travellers Inn Hotel Management System.
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
  };

  return (
    <PageContainer className="animate-fade-in">
      <HeaderBar>
        <div className="title-group">
          <h2>Accounts, Billing & Financial Reports</h2>
          <p>Review revenue performance, payment channel splits, and customer transactions.</p>
        </div>
        <div className="actions-group">
          <SecondaryButton onClick={handlePrint}>
            <FaPrint /> Print Report
          </SecondaryButton>
          <PrimaryButton onClick={exportCSV}>
            <FaDownload /> Export CSV
          </PrimaryButton>
        </div>
      </HeaderBar>

      {/* Date Range Picker Bar */}
      <DateFilterCard>
        <DateInputsWrapper>
          <DateFieldItem>
            <FieldLabel><FaCalendarAlt color="var(--primary-color)" /> From:</FieldLabel>
            <DateInputStyled
              type="date"
              value={startDate}
              onChange={(e) => {
                const val = e.target.value;
                setStartDate(val);
                setActiveQuickFilter("custom");
                fetchBilling(val, endDate);
              }}
            />
          </DateFieldItem>

          <FaArrowRight size={10} color="var(--text-muted)" style={{ margin: "0 2px" }} />

          <DateFieldItem>
            <FieldLabel>To:</FieldLabel>
            <DateInputStyled
              type="date"
              value={endDate}
              onChange={(e) => {
                const val = e.target.value;
                setEndDate(val);
                setActiveQuickFilter("custom");
                fetchBilling(startDate, val);
              }}
            />
          </DateFieldItem>
        </DateInputsWrapper>

        <QuickFilterGroup>
          <button
            className={activeQuickFilter === "today" ? "active" : ""}
            onClick={() => handleQuickFilter("today")}
          >
            Today
          </button>
          <button
            className={activeQuickFilter === "yesterday" ? "active" : ""}
            onClick={() => handleQuickFilter("yesterday")}
          >
            Yesterday
          </button>
          <button
            className={activeQuickFilter === "thisMonth" ? "active" : ""}
            onClick={() => handleQuickFilter("thisMonth")}
          >
            This Month
          </button>
          <button
            className={activeQuickFilter === "all" ? "active" : ""}
            onClick={() => handleQuickFilter("all")}
          >
            All Dates
          </button>
        </QuickFilterGroup>
      </DateFilterCard>

      <MetricsGrid>
        <MetricBox $bg="rgba(74, 30, 93, 0.1)" $color="#4A1E5D">
          <div className="details">
            <span className="label">Total Gross Revenue</span>
            <span className="val">₹{totals.totalRevenue.toLocaleString()}</span>
          </div>
          <div className="icon">
            <FaMoneyBillWave />
          </div>
        </MetricBox>

        <MetricBox $bg="rgba(16, 185, 129, 0.12)" $color="#10B981">
          <div className="details">
            <span className="label">Online / Razorpay</span>
            <span className="val">₹{totals.onlineRevenue.toLocaleString()}</span>
          </div>
          <div className="icon">
            <FaCreditCard />
          </div>
        </MetricBox>

        <MetricBox $bg="rgba(245, 158, 11, 0.12)" $color="#F59E0B">
          <div className="details">
            <span className="label">Cash Collections</span>
            <span className="val">₹{totals.cashRevenue.toLocaleString()}</span>
          </div>
          <div className="icon">
            <FaCoins />
          </div>
        </MetricBox>

        <MetricBox $bg="rgba(59, 130, 246, 0.12)" $color="#3B82F6">
          <div className="details">
            <span className="label">Total Invoices</span>
            <span className="val">{totals.transactionCount}</span>
          </div>
          <div className="icon">
            <FaFileInvoiceDollar />
          </div>
        </MetricBox>
      </MetricsGrid>

      <TableCard>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Billing #</th>
                <th>Date & Time</th>
                <th>Guest Name</th>
                <th>Booking Ref</th>
                <th>Transaction ID</th>
                <th>Payment Mode</th>
                <th style={{ textAlign: "right" }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "3rem" }}>
                    <FaSpinner className="spin" size={24} color="var(--primary-color)" />
                  </td>
                </tr>
              ) : billingData.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                    No financial billing records found for the selected date range.
                  </td>
                </tr>
              ) : (
                billingData.map((rec, i) => {
                  const bRef = getBookingRef(rec);
                  const txId = getTransactionRef(rec);
                  const pMode = rec.payment_type || rec.payment_method || "Cash";
                  const amt = rec.amount_paid || rec.amount || rec.total_amount || 0;

                  return (
                    <tr key={rec.billing_no || i}>
                      <td>
                        <strong style={{ color: "var(--primary-dark)" }}>
                          {rec.billing_no || rec.latest_billing_no || `TRL026/${String(i + 1).padStart(5, "0")}`}
                        </strong>
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                        {formatDateDisplay(rec.created_date || rec.date || rec.created_at)}
                      </td>
                      <td>
                        <strong style={{ color: "var(--text-primary)" }}>
                          {rec.guest_name || rec.customer_name || "Guest"}
                        </strong>
                      </td>
                      <td>
                        {bRef !== "—" ? (
                          <BookingRefBadge>#{bRef}</BookingRefBadge>
                        ) : (
                          <span style={{ color: "var(--text-muted)" }}>—</span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: txId !== "—" ? "#374151" : "var(--text-muted)" }}>
                          {txId}
                        </span>
                      </td>
                      <td>
                        <StatusPill $mode={pMode}>
                          {pMode}
                        </StatusPill>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <strong style={{ color: "var(--primary-color)", display: "inline-flex", alignItems: "center", justifyContent: "flex-end" }}>
                          <FaRupeeSign size={11} /> {parseFloat(amt).toLocaleString()}
                        </strong>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {billingData.length > 0 && (
              <tfoot>
                <tr>
                  <td colSpan="4">
                    GROSS TOTAL ({billingData.length} Record{billingData.length === 1 ? "" : "s"})
                  </td>
                  <td colSpan="2" style={{ fontSize: "0.8rem", color: "var(--primary-color)" }}>
                    Online: ₹{totals.onlineRevenue.toLocaleString()} | Cash: ₹{totals.cashRevenue.toLocaleString()}
                  </td>
                  <td style={{ textAlign: "right", fontSize: "1.05rem", color: "var(--primary-dark)" }}>
                    ₹{totals.totalRevenue.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </TableCard>
    </PageContainer>
  );
};

export default AccountSummary;
