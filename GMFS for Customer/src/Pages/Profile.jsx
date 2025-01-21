import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/Profile.module.css";

const Profile = () => {
  const { token } = useContext(StoreContext);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3010/customersOrder/userProfile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <div className={styles.profile_container}>
      {profile ? (
        <div className={styles.profile_card}>
          <div className={styles.profile_header}>
            <div className={styles.profile_avatar}>
              {profile.userName.charAt(0).toUpperCase()}
            </div>
            <div className={styles.profile_info}>
              <h2>{profile.userName}</h2>
              <span>{profile.email}</span>
            </div>
          </div>
          <div className={styles.profile_body}>
            <div className={styles.profile_body_item}>
              <span>Phone Number:</span>
              <strong>{profile.phoneNumber}</strong>
            </div>
            <div className={styles.profile_body_item}>
              <span>Total Purchases Completed:</span>
              <strong>{profile.totalOrdersCompleted}</strong>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
