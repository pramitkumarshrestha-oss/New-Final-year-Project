import React, { useState } from "react";
import styles from "./Profile.module.css"; // Importing styles
import Anuhar from "../assets/photo.png"; // Importing image correctly

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Prameet Shrestha",
    email: "Prameit2056@gmail.com",
    phone: "9818842351",
    profileImage: Anuhar, // Use imported image
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: "Prameet Shrestha",
      email: "Prameit2056@gmail.com",
      phone: "9818842351",
      profileImage: Anuhar, // Reset to default image
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Typically, save the updated data here.
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result, // Store the image data as base64
        });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className={styles.profileContainer}>
     <h2 className={styles.profileheading}>MY PROFILE</h2>

      <div className={styles.profileImageContainer}>
        {/* Display uploaded image or default image */}
        <img
          src={formData.profileImage} // Default image or uploaded image
          alt="Profile"
          className={styles.profileImage}
        />
      </div>

      {!isEditing ? (
        <div className={styles.profileInfo}>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <button onClick={handleEdit} className={styles.editButton}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className={styles.uploadSection}>
            <input
              type="file"
              id="profileImageInput"
              onChange={handleImageChange}
              className={styles.imageInput}
            />
            <label htmlFor="profileImageInput" className={styles.uploadLabel}>
              Upload Image
            </label>
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
