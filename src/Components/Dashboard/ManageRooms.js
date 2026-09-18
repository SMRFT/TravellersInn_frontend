import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaBed,
  FaUsers,
  FaRupeeSign,
  FaSpinner,
  FaSearch,
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
  }

  .title-group p {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
`;

const AddButton = styled(motion.button)`
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

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  background: #FFFFFF;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);

  .search-wrapper {
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
      padding: 0.55rem 1rem 0.55rem 2.4rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-light);
      font-size: 0.85rem;
      outline: none;
      &:focus {
        border-color: var(--accent-gold);
      }
    }
  }
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const RoomCard = styled(motion.div)`
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: rgba(197, 160, 89, 0.4);
  }

  .image-container {
    height: 180px;
    background: #E2E8F0;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .status-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      background: ${(props) => (props.$isActive ? "#ECFDF5" : "#FEF2F2")};
      color: ${(props) => (props.$isActive ? "#065F46" : "#991B1B")};
      border: 1px solid ${(props) => (props.$isActive ? "#A7F3D0" : "#FECACA")};
    }

    .room-number-tag {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      background: rgba(45, 17, 55, 0.85);
      color: #FFFFFF;
      backdrop-filter: blur(4px);
      padding: 0.3rem 0.8rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      font-weight: 700;
    }
  }

  .card-body {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;

    h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 0.35rem;
    }

    p.description {
      font-size: 0.8rem;
      color: var(--text-secondary);
      line-height: 1.4;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .specs-row {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
      font-size: 0.82rem;
      color: var(--text-secondary);

      span {
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }
    }

    .amenities-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-bottom: 1.25rem;

      .chip {
        font-size: 0.7rem;
        background: var(--bg-subtle);
        padding: 0.2rem 0.55rem;
        border-radius: 6px;
        color: var(--text-secondary);
        border: 1px solid var(--border-light);
      }
    }

    .price-action-row {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-light);
      padding-top: 1rem;

      .price {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--primary-color);
        display: flex;
        align-items: center;

        small {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-left: 0.2rem;
        }
      }

      .actions {
        display: flex;
        gap: 0.4rem;

        button {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid var(--border-light);
          background: var(--bg-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover.edit {
            background: rgba(74, 30, 93, 0.1);
            color: var(--primary-color);
            border-color: var(--primary-color);
          }

          &:hover.delete {
            background: #FEF2F2;
            color: #EF4444;
            border-color: #EF4444;
          }
        }
      }
    }
  }
`;

const ModalOverlay = styled.div`
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
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ModalContainer = styled(motion.div)`
  background: #FFFFFF;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  .modal-header {
    padding: 1.5rem 1.75rem;
    border-bottom: 1px solid var(--border-light);
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-dark);
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
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;

      label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-secondary);
      }

      input, select, textarea {
        padding: 0.65rem 0.85rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border-light);
        font-size: 0.85rem;
        outline: none;
        &:focus {
          border-color: var(--primary-color);
        }
      }
    }
  }

  .modal-footer {
    padding: 1.25rem 1.75rem;
    border-top: 1px solid var(--border-light);
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;

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

const ManageRooms = () => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    room_number: "",
    room_type: "Deluxe Room",
    price_per_night: "",
    capacity: 2,
    description: "",
    amenities: "",
    images: [],
    is_active: true,
  });

  const fetchRooms = async () => {
    setLoading(true);
    const res = await apiRequest(`${TravellersBaseUrl}rooms/`);
    if (res.success && Array.isArray(res.data)) {
      setRooms(res.data);
    } else {
      toast.error(res.error || "Failed to fetch room catalog");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      room_number: "",
      room_type: "Deluxe Room",
      price_per_night: "",
      capacity: 2,
      description: "",
      amenities: "Wi-Fi, AC, TV, Room Service",
      images: [],
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const DEFAULT_ROOM_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80";

  const formatRoomImageUrl = (img) => {
    if (!img) return DEFAULT_ROOM_IMAGE;
    let s = typeof img === "object" && img?.url ? img.url : String(img).trim();
    if (!s) return DEFAULT_ROOM_IMAGE;

    // Clean any local dev hostnames
    if (s.includes("127.0.0.1:1919") || s.includes("localhost:1919") || s.includes("localhost:3000") || s.includes("localhost:3001")) {
      const match = s.match(/(?:\/_b_a_c_k_e_n_d\/travellerinwebsite)?\/media\/gridfs\/([^/]+)/);
      if (match) {
        s = match[1];
      } else {
        s = s.replace(/^https?:\/\/[^/]+/, "");
      }
    }

    // Remote external URLs (like Unsplash, S3, external domains, data URIs)
    if ((s.startsWith("http://") || s.startsWith("https://")) && !s.includes("127.0.0.1") && !s.includes("localhost")) {
      return s;
    }
    if (s.startsWith("data:")) return s;

    const base = (TravellersBaseUrl || "").replace(/\/$/, "");

    // Raw GridFS ObjectId (e.g. 6aa3bc623b9011a43cd23d9e)
    if (!s.includes("/")) {
      return `${base}/media/gridfs/${s}/`;
    }

    // Already formatted backend path
    if (s.startsWith("/_b_a_c_k_e_n_d/travellerinwebsite")) {
      const rootBase = base.split("/_b_a_c_k_e_n_d")[0];
      return `${rootBase}${s}`;
    }

    // Relative media/gridfs path
    if (s.includes("media/gridfs/")) {
      const fileId = s.split("media/gridfs/")[1].replace(/\//g, "");
      return `${base}/media/gridfs/${fileId}/`;
    }

    const path = s.startsWith("/") ? s : `/${s}`;
    return `${base}${path}`;
  };

  const getRoomImage = (room) => {
    if (!room) return DEFAULT_ROOM_IMAGE;
    let imgs = room.images;
    if (typeof imgs === "string") {
      try {
        const parsed = JSON.parse(imgs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return formatRoomImageUrl(parsed[0]);
        }
      } catch (e) {
        if (imgs.length > 5) return formatRoomImageUrl(imgs);
      }
    }
    if (Array.isArray(imgs) && imgs.length > 0) {
      return formatRoomImageUrl(imgs[0]);
    }
    return DEFAULT_ROOM_IMAGE;
  };

  const handleOpenEdit = (room) => {
    setIsEditing(true);
    let initialImages = [];
    if (Array.isArray(room.images)) {
      initialImages = room.images;
    } else if (typeof room.images === "string") {
      try {
        const p = JSON.parse(room.images);
        if (Array.isArray(p)) initialImages = p;
      } catch (e) {
        if (room.images.startsWith("http") || room.images.includes("media/gridfs")) initialImages = [room.images];
      }
    }


    setFormData({
      room_number: room.room_number,
      room_type: room.room_type || "Deluxe Room",
      price_per_night: room.price || room.price_per_night || "",
      capacity: room.size || room.capacity || 2,
      description: room.about || room.description || "",
      amenities: Array.isArray(room.amenities)
        ? room.amenities.join(", ")
        : room.amenities || "",
      images: initialImages,
      is_active: room.status ? room.status === "active" : room.is_active !== false,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append("image", file);

    const res = await apiRequest(`${TravellersBaseUrl}upload/room-image/`, "POST", data);
    if (res.success && res.data?.url) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, res.data.url],
      }));
      toast.success("Image uploaded successfully");
    } else {
      toast.error(res.error || "Image upload failed");
    }
    setUploadingImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const priceVal = parseFloat(formData.price_per_night || 0);
    const capacityVal = formData.capacity || 2;
    const amenitiesArr = typeof formData.amenities === "string"
      ? formData.amenities.split(",").map((s) => s.trim()).filter(Boolean)
      : formData.amenities || [];

    const payload = {
      room_number: formData.room_number,
      room_type: formData.room_type,
      price: priceVal,
      price_per_night: priceVal,
      size: String(capacityVal),
      capacity: parseInt(capacityVal, 10) || 2,
      about: formData.description || "",
      description: formData.description || "",
      amenities: amenitiesArr,
      images: formData.images || [],
      status: formData.is_active ? "active" : "inactive",
      is_active: formData.is_active,
    };

    if (isEditing) {
      const res = await apiRequest(`${TravellersBaseUrl}rooms/${formData.room_number}/`, "PATCH", payload);
      if (res.success) {
        toast.success("Room updated successfully!");
        setIsModalOpen(false);
        fetchRooms();
      } else {
        toast.error(res.error || "Failed to update room");
      }
    } else {
      const res = await apiRequest(`${TravellersBaseUrl}rooms/`, "POST", payload);
      if (res.success) {
        toast.success("Room created successfully!");
        setIsModalOpen(false);
        fetchRooms();
      } else {
        toast.error(res.error || "Failed to create room");
      }
    }
  };

  const handleDelete = async (roomNumber) => {
    if (!window.confirm(`Are you sure you want to remove Room ${roomNumber}?`)) return;
    const res = await apiRequest(`${TravellersBaseUrl}rooms/${roomNumber}/`, "DELETE");
    if (res.success) {
      toast.success("Room deleted successfully");
      fetchRooms();
    } else {
      toast.error(res.error || "Failed to delete room");
    }
  };

  const filteredRooms = rooms.filter(
    (r) =>
      r.room_number?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.room_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer className="animate-fade-in">
      <HeaderBar>
        <div className="title-group">
          <h2>Room Catalog & Inventory</h2>
          <p>Configure room configurations, rates, amenities, and status.</p>
        </div>
        <AddButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleOpenAdd}>
          <FaPlus /> Add New Room
        </AddButton>
      </HeaderBar>

      <FilterBar>
        <div className="search-wrapper">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by room number or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </FilterBar>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <FaSpinner className="spin" size={28} color="var(--primary-color)" />
        </div>
      ) : (
        <RoomsGrid>
          {filteredRooms.map((room) => {
            const isLive = room.status ? room.status === "active" : room.is_active !== false;
            const displayPrice = room.price || room.price_per_night || 0;
            const displayDesc = room.about || room.description || "No description provided.";
            const displayCapacity = room.size || room.capacity || 2;

            return (
              <RoomCard key={room.room_number} $isActive={isLive}>
                <div className="image-container">
                  <img
                    src={getRoomImage(room)}
                    alt={room.room_type || `Room ${room.room_number}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_ROOM_IMAGE;
                    }}
                  />
                  <div className="status-badge">
                    {isLive ? "Active / Live" : "Inactive"}
                  </div>
                  <div className="room-number-tag">Room #{room.room_number}</div>
                </div>

                <div className="card-body">
                  <h3>{room.room_type}</h3>
                  <p className="description">{displayDesc}</p>

                  <div className="specs-row">
                    <span>
                      <FaUsers /> {displayCapacity} Guests
                    </span>
                    <span>
                      <FaBed /> {room.room_type?.includes("Suite") ? "King Bed" : "Double Bed"}
                    </span>
                  </div>

                  <div className="amenities-chips">
                    {(Array.isArray(room.amenities)
                      ? room.amenities
                      : (room.amenities || "").split(",")
                    )
                      .slice(0, 4)
                      .map((am, i) => (
                        <span key={i} className="chip">
                          {typeof am === "string" ? am.trim() : am}
                        </span>
                      ))}
                  </div>

                  <div className="price-action-row">
                    <div className="price">
                      <FaRupeeSign size={16} />
                      {displayPrice}
                      <small>/ night</small>
                    </div>
                    <div className="actions">
                      <button className="edit" onClick={() => handleOpenEdit(room)} title="Edit Room">
                        <FaEdit />
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(room.room_number)}
                        title="Delete Room"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </RoomCard>
            );
          })}
        </RoomsGrid>
      )}

      {/* Add / Edit Modal (PORTAL) */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <ModalOverlay onClick={() => setIsModalOpen(false)}>
            <ModalContainer
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{isEditing ? `Edit Room #${formData.room_number}` : "Add New Room"}</h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Room Number *</label>
                      <input
                        type="text"
                        required
                        disabled={isEditing}
                        value={formData.room_number}
                        onChange={(e) =>
                          setFormData({ ...formData, room_number: e.target.value })
                        }
                        placeholder="e.g. 101, 202"
                      />
                    </div>
                    <div className="form-group">
                      <label>Room Type *</label>
                      <select
                        value={formData.room_type}
                        onChange={(e) =>
                          setFormData({ ...formData, room_type: e.target.value })
                        }
                      >
                        <option value="Deluxe Room">Deluxe Room</option>
                        <option value="Executive Suite">Executive Suite</option>
                        <option value="Family Room">Family Room</option>
                        <option value="Standard Room">Standard Room</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Price per Night (₹) *</label>
                      <input
                        type="number"
                        required
                        value={formData.price_per_night}
                        onChange={(e) =>
                          setFormData({ ...formData, price_per_night: e.target.value })
                        }
                        placeholder="2500"
                      />
                    </div>
                    <div className="form-group">
                      <label>Guest Capacity *</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Amenities (comma separated)</label>
                    <input
                      type="text"
                      value={formData.amenities}
                      onChange={(e) =>
                        setFormData({ ...formData, amenities: e.target.value })
                      }
                      placeholder="Free Wi-Fi, AC, Flat TV, Minibar"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Spacious and comfortable room with mountain view..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Upload Room Photo</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {uploadingImage && (
                      <span style={{ fontSize: "0.8rem", color: "var(--primary-color)" }}>
                        <FaSpinner className="spin" /> Uploading image...
                      </span>
                    )}
                    {Array.isArray(formData.images) && formData.images.length > 0 && (
                      <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                        {formData.images.map((imgUrl, idx) => (
                          <div key={idx} style={{ position: "relative", width: "70px", height: "50px", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border-light)" }}>
                            <img
                              src={formatRoomImageUrl(imgUrl)}
                              alt="Room preview"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_ROOM_IMAGE; }}
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                              style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {isEditing ? "Save Changes" : "Create Room"}
                  </button>
                </div>
              </form>
            </ModalContainer>
          </ModalOverlay>,
          document.body
        )}
    </PageContainer>
  );
};

export default ManageRooms;
