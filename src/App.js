import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./Components/Sidebar";
import TopBar from "./Components/TopBar";
import Overview from "./Components/Dashboard/Overview";
import ManageRooms from "./Components/Dashboard/ManageRooms";
import ManageBookings from "./Components/Dashboard/ManageBookings";
import RoomAvailability from "./Components/Dashboard/RoomAvailability";
import ManageEvents from "./Components/Dashboard/ManageEvents";
import ManageQueries from "./Components/Dashboard/ManageQueries";
import ManageGallery from "./Components/Dashboard/ManageGallery";
import AccountSummary from "./Components/Dashboard/AccountSummary";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-main);
`;

const MainContent = styled.div`
  margin-left: 280px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: margin-left 0.3s ease;

  @media (max-width: 992px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.main`
  padding: 2rem 2.5rem;
  flex: 1;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
  }
`;

const MobileOverlay = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 999;
  }
`;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      const REDIRECT_URL =
        process.env.REACT_APP_LOGIN_REDIRECT_URL || "https://shinova.in/login";
      window.location.href = REDIRECT_URL;
    }
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContainer>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 99999999 }}
        />

        <MobileOverlay
          $isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen(false)}
        />

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <MainContent>
          <TopBar
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <ContentWrapper>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/rooms" element={<ManageRooms />} />
              <Route path="/bookings" element={<ManageBookings />} />
              <Route path="/availability" element={<RoomAvailability />} />
              <Route path="/events" element={<ManageEvents />} />
              <Route path="/queries" element={<ManageQueries />} />
              <Route path="/gallery" element={<ManageGallery />} />
              <Route path="/accounts" element={<AccountSummary />} />
            </Routes>
          </ContentWrapper>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
