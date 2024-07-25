"use client";

import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { LINKEDIN_URL } from "../../../app/helpers/auth";
import { useRouter } from "next/navigation";

const DashHome = () => {
  const { data: session, status } = useSession();
  const [providerData, setProviderData] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  const [connectionStatus, setConnectionStatus] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
  });

  useEffect(() => {
    if (session) {
      console.log("Session data:", session);
      
      // Ensure connectedProviders is an array
      const connectedProviders = Array.isArray(session.connectedProviders) 
        ? session.connectedProviders 
        : [];

      console.log("Connected Providers:", connectedProviders);

      // Update connection status based on session data
      setConnectionStatus({
        facebook: connectedProviders.includes('facebook'),
        instagram: connectedProviders.includes('instagram'),
        twitter: connectedProviders.includes('twitter'),
      });
    }
  }, [session]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const firstName = params.get("firstName");
    const lastName = params.get("lastName");
    const email = params.get("email");

    if (firstName && lastName && email) {
      setUserProfile({ firstName, lastName, email });
    }
  }, []);

  const handleLinkedInSignIn = () => {
    window.location.href = LINKEDIN_URL;
  };

  const handleSignOut = (provider) => {
    // Custom sign out logic for each provider if needed
    signOut();
    setConnectionStatus((prevStatus) => ({
      ...prevStatus,
      [provider]: false,
    }));
  };

  const handleSignIn = async (provider) => {
    await signIn(provider);
    setConnectionStatus((prevStatus) => ({
      ...prevStatus,
      [provider]: true,
    }));
  };

  return (
    <>
      <div>
        <Box p={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7} display="flex" flexDirection="column">
              <Box
                bgcolor="#dce4e8"
                boxShadow={3}
                borderRadius={2}
                p={3}
                height="100%"
              >
                <Box display="flex" alignItems="start">
                  <Box
                    component="svg"
                    mr={2}
                    width={30}
                    height={30}
                    fill="currentColor"
                    viewBox="0 0 30 30"
                  >
                    <path
                      className="text-indigo-300"
                      d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z"
                    />
                    <path
                      className="text-indigo-200"
                      d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z"
                    />
                    <path
                      className="text-indigo-500"
                      d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z"
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Manage all your Social Media with #OnePost
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Create a single post format to handle all your social
                      media pages and in different formats.
                    </Typography>
                    <Box className="mt-2">
                      <Button variant="outlined"  onClick={() => router.push('/dashboard/posts')}
                      >Create a Post</Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} display="flex" flexDirection="column">
              <Box
                bgcolor="#7c9efe"
                boxShadow={3}
                borderRadius={2}
                p={3}
                height="100%"
              >
                <Box display="flex" alignItems="start">
                  <Box
                    component="svg"
                    mr={2}
                    width={30}
                    height={30}
                    fill="currentColor"
                    viewBox="0 0 30 30"
                  >
                    <path
                      className="text-indigo-300"
                      d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z"
                    />
                    <path
                      className="text-indigo-200"
                      d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z"
                    />
                    <path
                      className="text-indigo-500"
                      d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z"
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      #PostAd
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Typography>
                    <Box className="mt-2">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#3e3e3ec4" }}
                      >
                        Create AD
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div>
        <div className=" mt-6 mb-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Facebook Login */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Image
                    src="https://i.pinimg.com/originals/ac/57/3b/ac573b439cde3dec8ca1c6739ae7f628.jpg"
                    alt="Facebook"
                    className="w-10 h-10 rounded-full shadow-md"
                    width={40}
                    height={40}
                  />
                  <div className="ml-4">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Facebook
                    </h5>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                </div>
                <div className="relative group">
                  <div
                    className={`${
                      connectionStatus.facebook
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    } rounded-full p-1 text-xs font-medium flex items-center justify-center`}
                  >
                    <FontAwesomeIcon icon={faLink} className="text-xs" />
                  </div>
                  <div
                    className='absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 flex items-center whitespace-nowrap ${
                      opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    {connectionStatus.facebook ? "Linked" : "Not linked"}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  {connectionStatus.facebook ? (
                    <button
                      className="w-full py-2 px-4 bg-red-600 font-medium text-sm text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                      onClick={() => handleSignOut("facebook")}
                    >
                      Disconnect from <br /> Facebook
                    </button>
                  ) : (
                    <button
                      className="w-full py-2 px-4 bg-blue-600 font-medium text-sm text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={() => {
                        handleSignIn("facebook");
                        router.push("/dashboard/posts");
                      }}
                    >
                      Connect to Facebook
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Instagram Login */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Image
                    src="https://i.pinimg.com/550x/58/a2/be/58a2bec02ecb40d12e507e2a212c46c6.jpg"
                    alt="Instagram"
                    className="w-10 h-10 rounded-full shadow-md"
                    width={40}
                    height={40}
                  />
                  <div className="ml-4">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Instagram
                    </h5>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                </div>
                <div className="relative group">
                  <div
                    className={`${
                      connectionStatus.instagram
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    } rounded-full p-1 text-xs font-medium flex items-center justify-center`}
                  >
                    <FontAwesomeIcon icon={faLink} className="text-xs" />
                  </div>
                  <div
                    className='absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 flex items-center whitespace-nowrap ${
                      opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    {connectionStatus.instagram ? "Linked" : "Not linked"}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  {connectionStatus.instagram ? (
                    <button
                      className="w-full py-2 px-4 bg-red-600 font-medium text-sm text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                      onClick={() => handleSignOut("instagram")}
                    >
                      Disconnect from <br /> Instagram
                    </button>
                  ) : (
                    <button
                      className="w-full py-2 px-4 bg-blue-600 font-medium text-sm text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={() => handleSignIn("instagram")}
                    >
                      Connect to Instagram
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Twitter Login */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Image
                    src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                    alt="Twitter"
                    className="w-10 h-10 rounded-full shadow-md"
                    width={40}
                    height={40}
                  />
                  <div className="ml-4">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Twitter
                    </h5>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                </div>
                <div className="relative group">
                  <div
                    className={`${
                      connectionStatus.twitter
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    } rounded-full p-1 text-xs font-medium flex items-center justify-center`}
                  >
                    <FontAwesomeIcon icon={faLink} className="text-xs" />
                  </div>
                  <div
                    className='absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 flex items-center whitespace-nowrap ${
                      opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    {connectionStatus.twitter ? "Linked" : "Not linked"}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  {connectionStatus.twitter ? (
                    <button
                      className="w-full py-2 px-4 bg-red-600 font-medium text-sm text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                      onClick={() => handleSignOut("twitter")}
                    >
                      Disconnect from <br /> Twitter
                    </button>
                  ) : (
                    <button
                      className="w-full py-2 px-4 bg-blue-600 font-medium text-sm text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={() => handleSignIn("twitter")}
                    >
                      Connect to Twitter
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* LinkedIn Login */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Image
                    src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0xMF8xLnBuZw.png"
                    alt="LinkedIn"
                    className="w-10 h-10 rounded-full shadow-md"
                    width={40}
                    height={40}
                  />
                  <div className="ml-4">
                    <h5 className="text-lg font-semibold text-gray-800">
                      LinkedIn
                    </h5>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                </div>
                <div className="relative group">
                  <div
                    className={`${
                      connectionStatus.linkedin
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    } rounded-full p-1 text-xs font-medium flex items-center justify-center`}
                  >
                    <FontAwesomeIcon icon={faLink} className="text-xs" />
                  </div>
                  <div
                    className='absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 flex items-center whitespace-nowrap ${
                      opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    {connectionStatus.linkedin ? "Linked" : "Not linked"}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  {connectionStatus.linkedin ? (
                    <button
                      className="w-full py-2 px-4 bg-red-600 font-medium text-sm text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                      onClick={() => handleSignOut("linkedin")}
                    >
                      Disconnect from <br /> LinkedIn
                    </button>
                  ) : (
                    <button
                      className="w-full py-2 px-4 bg-blue-600 font-medium text-sm text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={handleLinkedInSignIn}
                    >
                      Connect to LinkedIn
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashHome;
