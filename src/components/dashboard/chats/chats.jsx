import React from "react";
import { Grid, Typography, Box, Breadcrumbs } from "@mui/material";
import Link from "next/link";
import { IconCircle } from "@tabler/icons-react";
import Image from "next/image";

const ChatComponent = () => {
  return (
    <>
      <div className="flex-1 p-6 overflow-auto transition-all duration-300">
        <Grid
          container
          sx={{
            backgroundColor: "#ecf2ff",
            borderRadius: 3,
            p: "20px 25px 0px",
            marginBottom: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Grid item xs={12} sm={6} lg={8} mb={1}>
            <Typography variant="h5" fontSize={22} color={"#2A3547"}><strong>Chat app</strong> </Typography>
            <Typography
              color="textSecondary"
              variant="p"
              fontWeight={400}
              mt={0.8}
              mb={0}
            >
              WhatsApp 
            </Typography>
            <Breadcrumbs
              separator={
                <IconCircle
                  size="5"
                  fill="textSecondary"
                  fillOpacity={"0.6"}
                  style={{ margin: "0 5px" }}
                />
              }
              sx={{ alignItems: "center", mt: "10px" }}
              aria-label="breadcrumb"
            >
              
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
            <Box
              sx={{
                display: { xs: "none", md: "block", lg: "flex" },
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Box sx={{ top: "0px", position: "absolute" }}>
                <Image
                  src="/images/breadcrumb/ChatBc.png"
                  alt="breadcrumbImg"
                  style={{ width: "165px", height: "165px" }}
                  priority
                  width={165}
                  height={165}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-white p-4 shadow rounded">
            <div className="flex items-center space-x-4">
              <img
                src="/avatar1.png"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">Mathew Anderson</h4>
                <p className="text-gray-500">Designer</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search contacts"
              className="mt-4 p-2 border rounded w-full"
            />
            <h3 className="mt-6 mb-2 font-semibold">Recent Chats</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <img
                  src="/avatar2.png"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Maria Rodriguez</h4>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="/avatar3.png"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Robert Smith</h4>
                  <p className="text-gray-500 text-sm">1 hour ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="/avatar4.png"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Joseph Sarah</h4>
                  <p className="text-gray-500 text-sm">30 minutes ago</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-2 bg-white p-4 shadow rounded">
            <div className="flex flex-col flex-grow p-4">
              <div className="flex flex-col flex-grow bg-white shadow rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Avatar"
                    className="rounded-full w-10 h-10"
                  />
                  <div className="ml-4">
                    <h2 className="font-bold">Maria Hernandez</h2>
                    <p className="text-sm text-gray-500">away</p>
                  </div>
                </div>
                <div className="flex flex-col flex-grow space-y-2 overflow-auto">
                  <div className="self-end bg-blue-500 text-white p-2 rounded-lg">
                    Fori janif foiz viluvruz ik.
                  </div>
                  <div className="self-start bg-gray-300 text-black p-2 rounded-lg">
                    Us niwumof fu pun horgiduz nal vijezvo lelge buji fonha.
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    className="flex-grow border rounded-lg p-2"
                    placeholder="Type a message..."
                  />
                  <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
                    Send
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Media (1)</h4>
              <div className="bg-gray-50 p-4 rounded mb-4">
                <img src="/media.png" alt="Media" className="w-full rounded" />
              </div>
              <h4 className="font-semibold mb-2">Attachments (4)</h4>
              <div className="bg-gray-50 p-4 rounded">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="/attachment1.png"
                    alt="Attachment"
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <h4 className="font-semibold">service-task.pdf</h4>
                    <p className="text-gray-500 text-sm">2MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="/attachment2.png"
                    alt="Attachment"
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <h4 className="font-semibold">homepage-design.fig</h4>
                    <p className="text-gray-500 text-sm">3MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
