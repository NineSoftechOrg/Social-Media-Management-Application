"use client";
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import GifIcon from '@mui/icons-material/Gif';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSession } from 'next-auth/react';
import { getPages, postToPage, verifyPost } from '../../../../lib/facebook';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FbPostEditor = () => {
  const [userProfile, setUserProfile] = useState({ linkedInId: '' });

  const [postContent, setPostContent] = useState('');
  const [hashTag, setHashTag] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [accessToken, setAccessToken] = useState('');
  const [isClient, setIsClient] = useState(false);


  // Handle post content change
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  // Handle hashtag change
  const handleHashTagChange = (e) => {
    setHashTag(e.target.value);
  };

  useEffect(() => {
    setIsClient(true);
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    const linkedInId = params.get("linkedInId");

    console.log("Token",token,linkedInId);

    if (token) {
      setAccessToken(token);
      setUserProfile({ linkedInId });
    }
  }, []);

  useEffect(() => {
    if (session) {
      console.log("Session data:", session);
    }
  }, [session?.accessToken, session?.userId]); 

  // Handle post to Facebook
  const handlePostToFacebook = async () => {
    if (!session || !session.accessToken || !session.userId) {
      toast.error('No account is Linked');
      return;
    }

    const fullPostContent = `${postContent}\n\n${hashTag}`;

    setLoading(true);

    try {
      const pagesData = await getPages(session.userId, session.accessToken);
      console.log(pagesData);

      const page = pagesData.data[0];
      if (!page) {
        console.error('No pages found');
        return;
      }

      const postResponse = await postToPage(page.id, page.access_token, fullPostContent);
      console.log('Post successful:', postResponse);

      const verifyResponse = await verifyPost(page.id, page.access_token);
      console.log('Verification response:', verifyResponse);

      toast.success('Post successfully published!', {
        onClose: () => {
          setPostContent('');
          setHashTag('');
        },
      });

    } catch (error) {
      console.error('Error:', error);
      toast.error('Error posting to Facebook.');
    } finally {
      setLoading(false);
    }
  };

    // Handle post to LinkedIn
  const handlePostToLinkedIn = async () => {
    if (!accessToken) {
      toast.error('No account is Linked');
      return;
    }

    try {
      const fullPostContent = `${postContent}\n\n${hashTag}`;
      const response = await fetch('/api/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          fullPostContent,
          linkedInId: userProfile.linkedInId
        }),
      });
      console.log('Post response:', response);
      alert('Post was successful!');
    } catch (error) {
      console.error('Error posting to LinkedIn:', error);
      alert('Failed to post content');
    }
  };

  if (!isClient) {
    // Render nothing on the server to avoid mismatched HTML
    return null;
  }

  return (
    <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mr-4">
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        <TextField
          value={hashTag}
          onChange={handleHashTagChange}
          placeholder="#HASHTAGS"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                #
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="relative mb-4">
        <textarea
          value={postContent}
          onChange={handlePostChange}
          placeholder="Write something ..."
          className="w-full p-4 border rounded-lg h-40 resize-none"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <IconButton color="primary" aria-label="add bold text">
            <FormatBoldIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add italic text">
            <FormatItalicIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add gif">
            <GifIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add emoji">
            <InsertEmoticonIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <IconButton color="primary" aria-label="add photo">
            <PhotoCameraIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add video">
            <VideoLibraryIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add location">
            <LocationOnIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outlined" className="mr-2">
            Add Post
          </Button>
          <Button variant="outlined" className="mr-2">
            Bulk Upload
          </Button>
         
        </div>
        <div>
          <Button variant="contained" className="mr-2" color="inherit">
            Draft
          </Button>
          <Button variant="contained" className="mr-2" color="success">
            Schedule
          </Button>
          <Button
            onClick={handlePostToLinkedIn}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FbPostEditor;
