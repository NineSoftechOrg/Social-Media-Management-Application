// src/components/Profile.jsx
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://localhost:3001/profile', { withCredentials: true });
        setProfile(response.data);
      } catch (err) {
        setError('Error fetching profile',err);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Name:</strong> {profile.displayName}</p>
      <p><strong>Emails:</strong> {profile.emails?.map((email, index) => (
        <span key={index}>{email.value}<br /></span>
      ))}</p>
      <p><strong>Photos:</strong></p>
      {profile.photos?.map((photo, index) => (
        <img key={index} src={photo.value} alt="Profile" style={{ width: '100px', height: '100px' }} />
      ))}
    </div>
  );
};

export default Profile;
