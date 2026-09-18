import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaSpinner, FaTimes, FaImage } from "react-icons/fa";
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

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  background: #FFFFFF;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);

  .category-pill {
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--border-light);
    background: var(--bg-subtle);
    color: var(--text-secondary);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(74, 30, 93, 0.08);
      color: var(--primary-color);
    }

    &.active {
      background: var(--primary-color);
      color: #FFFFFF;
      border-color: var(--primary-color);
    }
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const GalleryCard = styled.div`
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }

  .img-wrapper {
    height: 190px;
    background: var(--bg-subtle);
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .category-badge {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      background: rgba(45, 17, 55, 0.8);
      backdrop-filter: blur(4px);
      color: #FFFFFF;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  &:hover .img-wrapper img {
    transform: scale(1.04);
  }

  .card-info {
    padding: 1rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    button.del-btn {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: #FEF2F2;
      color: #EF4444;
      border: 1px solid #FECACA;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background: #EF4444;
        color: #FFFFFF;
      }
    }
  }
`;

const ManageGallery = () => {
  const TravellersBaseUrl = process.env.REACT_APP_BACKEND_TRAVELLERS_BASE_URL;
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image_id: "",
    preview_url: "",
    category: "",
    order: 1,
  });

  const fetchCategories = async () => {
    const res = await apiRequest(`${TravellersBaseUrl}gallery-categories/`);
    if (res.success && Array.isArray(res.data)) {
      setCategories(res.data);
      if (res.data.length > 0 && !formData.category) {
        setFormData((prev) => ({ ...prev, category: res.data[0].id }));
      }
    }
  };

  const fetchGallery = async () => {
    setLoading(true);
    const res = await apiRequest(`${TravellersBaseUrl}gallery/`);
    if (res.success && Array.isArray(res.data)) {
      setItems(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    const res = await apiRequest(`${TravellersBaseUrl}upload/room-image/`, "POST", data);
    if (res.success && res.data) {
      setFormData((prev) => ({
        ...prev,
        image_id: res.data.id || res.data.filename,
        preview_url: res.data.url,
      }));
      toast.success("Image uploaded successfully!");
    } else {
      toast.error(res.error || "Upload failed");
    }
    setUploading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.image_id) {
      toast.error("Please upload a photo first");
      return;
    }

    const payload = {
      image_id: formData.image_id,
      title: formData.title || "Resort Photo",
      category: parseInt(formData.category || (categories[0] ? categories[0].id : 2), 10),
      order: parseInt(formData.order || 1, 10),
    };

    const res = await apiRequest(`${TravellersBaseUrl}gallery/`, "POST", payload);
    if (res.success) {
      toast.success("Photo added to gallery");
      setIsModalOpen(false);
      setFormData({
        title: "",
        image_id: "",
        preview_url: "",
        category: categories[0] ? categories[0].id : "",
        order: 1,
      });
      fetchGallery();
    } else {
      toast.error(res.error || "Failed to add image to gallery");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this photo from the gallery?")) return;
    const res = await apiRequest(`${TravellersBaseUrl}gallery/${id}/`, "DELETE");
    if (res.success) {
      toast.success("Photo deleted successfully");
      fetchGallery();
    } else {
      toast.error(res.error || "Delete failed");
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "all") return true;
    return (
      String(item.category) === String(selectedCategory) ||
      item.category_name?.toLowerCase() === selectedCategory.toLowerCase()
    );
  });

  return (
    <PageContainer className="animate-fade-in">
      <HeaderBar>
        <div className="title-group">
          <h2>Photo Gallery Management</h2>
          <p>Curate photos of resort architecture, suites, banquet hall, and amenities.</p>
        </div>
        <button
          style={{
            background: "linear-gradient(135deg, #4A1E5D 0%, #682B83 100%)",
            color: "#FFFFFF",
            border: "none",
            padding: "0.7rem 1.4rem",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 14px var(--primary-glow)",
          }}
          onClick={() => {
            setFormData({
              title: "",
              image_id: "",
              preview_url: "",
              category: categories[0] ? categories[0].id : 2,
              order: 1,
            });
            setIsModalOpen(true);
          }}
        >
          <FaPlus /> Add Photo
        </button>
      </HeaderBar>

      <FilterBar>
        <div
          className={`category-pill ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          All Photos ({items.length})
        </div>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`category-pill ${selectedCategory === String(cat.id) ? "active" : ""}`}
            onClick={() => setSelectedCategory(String(cat.id))}
          >
            {cat.name}
          </div>
        ))}
      </FilterBar>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <FaSpinner className="spin" size={28} color="var(--primary-color)" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3.5rem", background: "#FFFFFF", borderRadius: "16px", border: "1px solid var(--border-light)" }}>
          <FaImage size={40} color="var(--text-muted)" style={{ marginBottom: "0.75rem" }} />
          <p style={{ color: "var(--text-secondary)", fontWeight: "500" }}>No photos found in this category.</p>
        </div>
      ) : (
        <GalleryGrid>
          {filteredItems.map((item) => (
            <GalleryCard key={item.id}>
              <div className="img-wrapper">
                <img
                  src={
                    item.image_url ||
                    item.image ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={item.title || "Gallery"}
                  loading="lazy"
                />
                {item.category_name && (
                  <div className="category-badge">{item.category_name}</div>
                )}
              </div>
              <div className="card-info">
                <span className="title">{item.title || "Resort Feature"}</span>
                <button className="del-btn" onClick={() => handleDelete(item.id)} title="Delete Photo">
                  <FaTrash size={13} />
                </button>
              </div>
            </GalleryCard>
          ))}
        </GalleryGrid>
      )}

      {/* Add Photo Modal (PORTAL) */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(15, 10, 25, 0.65)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99999,
              padding: "1.5rem",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: "#FFFFFF",
                padding: "2rem",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "480px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--primary-dark)" }}>
                  Add Photo to Gallery
                </h3>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
                  onClick={() => setIsModalOpen(false)}
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", marginBottom: "0.35rem" }}>
                    Photo Title / Caption *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deluxe Suite Bedroom, Grand Banquet Lawn"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light)",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", marginBottom: "0.35rem" }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", marginBottom: "0.35rem" }}>
                    Upload Photo File *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "8px",
                      border: "1px dashed var(--border-light)",
                      fontSize: "0.85rem",
                      background: "var(--bg-subtle)",
                    }}
                  />
                  {uploading && (
                    <span style={{ fontSize: "0.8rem", color: "var(--primary-color)", marginTop: "0.35rem", display: "inline-block" }}>
                      <FaSpinner className="spin" /> Uploading image...
                    </span>
                  )}
                  {formData.preview_url && (
                    <div style={{ marginTop: "0.75rem", height: "120px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-light)" }}>
                      <img src={formData.preview_url} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: "0.6rem 1.25rem",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-subtle)",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !formData.image_id}
                    style={{
                      padding: "0.6rem 1.25rem",
                      borderRadius: "8px",
                      border: "none",
                      background: "var(--primary-color)",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>,
          document.body
        )}
    </PageContainer>
  );
};

export default ManageGallery;
