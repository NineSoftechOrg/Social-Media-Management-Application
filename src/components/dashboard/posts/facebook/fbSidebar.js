"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FbSidebar = () => {
  const [socialAccounts, setSocialAccounts] = useState([
    {
      name: "Facebook",
      icon: "https://i.pinimg.com/originals/ac/57/3b/ac573b439cde3dec8ca1c6739ae7f628.jpg",
      connected: false,
    },
    {
      name: "Instagram",
      icon: "https://i.pinimg.com/550x/58/a2/be/58a2bec02ecb40d12e507e2a212c46c6.jpg",
      connected: false,
    },
    {
      name: "Twitter/X",
      icon: "https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg",
      connected: false,
    },
    {
      name: "Linkedin",
      icon: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0xMF8xLnBuZw.png",
      connected: false,
    },
  ]);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("socialAccounts"));
    if (savedState) {
      setSocialAccounts(savedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("socialAccounts", JSON.stringify(socialAccounts));
  }, [socialAccounts]);

  useEffect(() => {
    if (session) {
      setSocialAccounts((prev) =>
        prev.map((account) =>
          account.name === "Facebook"
            ? { ...account, connected: true }
            : account
        )
      );
    }
  }, [session]);

  // Toggle the connection status of an account
  const toggleConnection = (index) => {
    setSocialAccounts((prev) =>
      prev.map((account, i) =>
        i === index ? { ...account, connected: !account.connected } : account
      )
    );
  };

  // Handle dropdown toggle for adding new accounts
  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  // Handle connecting new accounts from dropdown
  const handleConnectAccount = (index) => {
    setSocialAccounts((prev) =>
      prev.map((account, i) =>
        i === index ? { ...account, connected: true } : account
      )
    );
  };

  const connectedAccounts = socialAccounts.filter((account) => account.connected);
  const hasDisconnectedAccounts = socialAccounts.some((account) => !account.connected);

  return (
    <div className="flex-1 p-6 overflow-auto transition-all duration-300 pt-4">
      <div className="col-span-1 bg-slate-200 text-slate-800 p-8 shadow rounded">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-6">Linked Accounts</h2>
        </div>
        {connectedAccounts.length === 0 ? (
          <p>No connected accounts</p>
        ) : (
          <ul className="space-y-4">
            {connectedAccounts.map((account, index) => (
              <li
                className="flex space-x-4 cursor-pointer"
                key={index}
                onClick={() => toggleConnection(index)}
              >
                <img
                  src={account.icon}
                  alt={`${account.name} icon`}
                  className="flex-none w-10 h-10 rounded-full"
                />
                <div className="flex-1 pl-3">
                  <h4 className="font-semibold">{account.name}</h4>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
                <input
                  type="checkbox"
                  checked={account.connected}
                  className="w-6 rounded-full h-6 flex-none flex justify-end text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
                  readOnly
                />
              </li>
            ))}
          </ul>
        )}
        {hasDisconnectedAccounts && (
          <>
            <button
              onClick={handleDropdownToggle}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showDropdown ? "Close" : "Connect an Account"}
            </button>
            {showDropdown && (
              <ul className="mt-4 space-y-4 bg-white border rounded shadow-lg p-4">
                {socialAccounts.map((account, index) =>
                  !account.connected ? (
                    <li key={index} className="flex items-center space-x-4">
                      <img
                        src={account.icon}
                        alt={`${account.name} icon`}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{account.name}</span>
                      <input
                        type="checkbox"
                        checked={account.connected}
                        onChange={() => handleConnectAccount(index)}
                        className="ml-auto"
                      />
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FbSidebar;
