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
          <h2>{profile.userName}</h2>
          <h2>{profile.email}</h2>
          <h2>{profile.phoneNumber}</h2>
          <p>Total Purchase Completed: {profile.totalOrdersCompleted}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
