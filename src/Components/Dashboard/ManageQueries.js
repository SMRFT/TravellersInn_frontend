import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEnvelope, FaPhone, FaCheck, FaSpinner } from "react-icons/fa";
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

  .title-group h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--primary-dark);
  }

  .title-group p {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
`;

const QueryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.25rem;
`;

const QueryCard = styled.div`
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid ${(props) => (props.$isResolved ? "var(--border-light)" : "rgba(245, 158, 11, 0.4)")};
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .guest-info {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 1rem;
        color: var(--primary-dark);
      }

      span {
        font-size: 0.78rem;
        color: var(--text-muted);
      }
    }

    .badge {
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      background: ${(props) => (props.$isResolved ? "#ECFDF5" : "#FFFBEB")};
      color: ${(props) => (props.$isResolved ? "#065F46" : "#92400E")};
    }
  }

  .message-box {
    background: var(--bg-subtle);
    padding: 1rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-light);
    font-size: 0.85rem;
    color: var(--text-primary);
    line-height: 1.45;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 0.5rem;

    .contacts {
      display: flex;
      gap: 0.75rem;
      font-size: 0.8rem;
      color: var(--text-secondary);
    }

    button {
      padding: 0.4rem 0.85rem;
      border-radius: 6px;
      border: 1px solid var(--border-light);
      background: var(--bg-subtle);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: var(--primary-color);
        color: #FFFFFF;
      }
    }
  }
`;

const ManageQueries = () => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = async () => {
    setLoading(true);
    const res = await apiRequest(`${TravellersBaseUrl}queries/`);
    if (res.success && Array.isArray(res.data)) {
      setQueries(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleResolve = async (pk) => {
    const res = await apiRequest(`${TravellersBaseUrl}queries/${pk}/`, "PATCH", {
      status: "resolved",
      is_resolved: true,
    });
    if (res.success) {
      toast.success("Query marked as resolved");
      fetchQueries();
    } else {
      toast.error(res.error || "Failed to update query status");
    }
  };

  return (
    <PageContainer className="animate-fade-in">
      <HeaderBar>
        <div className="title-group">
          <h2>Guest Inquiries & Messages</h2>
          <p>Respond to customer questions, room requests, and general messages.</p>
        </div>
      </HeaderBar>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <FaSpinner className="spin" size={28} color="var(--primary-color)" />
        </div>
      ) : queries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "#FFFFFF", borderRadius: "16px" }}>
          <p style={{ color: "var(--text-muted)" }}>No customer queries found at this time.</p>
        </div>
      ) : (
        <QueryGrid>
          {queries.map((q) => {
            const isResolved = q.status === "resolved" || q.is_resolved;
            return (
              <QueryCard key={q._id || q.id} $isResolved={isResolved}>
                <div className="header">
                  <div className="guest-info">
                    <strong>{q.name || "Guest User"}</strong>
                    <span>{q.subject || "General Inquiry"}</span>
                  </div>
                  <div className="badge">{isResolved ? "Resolved" : "Pending Action"}</div>
                </div>

                <div className="message-box">{q.message || "No message content"}</div>

                <div className="footer">
                  <div className="contacts">
                    {q.phone && <span><FaPhone size={10} /> {q.phone}</span>}
                    {q.email && <span><FaEnvelope size={10} /> {q.email}</span>}
                  </div>
                  {!isResolved && (
                    <button onClick={() => handleResolve(q._id || q.id)}>
                      <FaCheck /> Mark Resolved
                    </button>
                  )}
                </div>
              </QueryCard>
            );
          })}
        </QueryGrid>
      )}
    </PageContainer>
  );
};

export default ManageQueries;
