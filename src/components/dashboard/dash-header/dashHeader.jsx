
import { FiBell, FiSettings, FiMenu } from "react-icons/fi";
import { useState } from "react";
import Profile from "./profile";
import { useRouter } from 'next/navigation'


const Header = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="flex items-center justify-between p-3 pl-10">
      <div className="flex items-center">
        <FiMenu className="text-xl cursor-pointer" onClick={toggleSidebar} />
        <div className="relative pl-10">
          <div className="relative">
            <button
              className="text-lg cursor-pointer flex items-center focus:outline-none"
              onClick={toggleDropdown}
            >
              <span className="lg:text-base">Apps</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 z-10">
                <div className="py-1 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://via.placeholder.com/50"
                        alt="App icon"
                        height={16}
                        width={16}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Chat</p>
                      <p className="text-xs text-gray-500">Chat with others</p>
                    </div>
                  </div>
                </div>
                <div className="py-1 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://via.placeholder.com/50"
                        alt="App icon"
                        height={16}
                        width={16}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Calendar
                      </p>
                      <p className="text-xs text-gray-500">Manage events</p>
                    </div>
                  </div>
                </div>
                <div className="py-1 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://via.placeholder.com/50"
                        alt="App icon"
                        height={16}
                        width={16}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-xs text-gray-500">
                        Send and receive emails
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-1 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://via.placeholder.com/50"
                        alt="App icon"
                        height={16}
                        width={16}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Settings
                      </p>
                      <p className="text-xs text-gray-500">
                        Manage preferences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative pl-6">
          <div className="relative">
            <button
              className="text-lg cursor-pointer flex items-center focus:outline-none"
              onClick={toggleDropdown}
            >
              <span className="lg:text-base">Chats</span>
            </button>
          </div>
        </div>
        <div className="relative pl-6">
          <div className="relative">
            <button
              className="text-lg cursor-pointer flex items-center focus:outline-none"
              onClick={() => router.push('/businessstrategy')}
              >
              <span className="lg:text-base">Business Strategy</span>
            </button>
          </div>
        </div>
        <div className="relative pl-6">
          <div className="relative">
            <button
              className="text-lg cursor-pointer flex items-center focus:outline-none"
              onClick={() => router.push('/dashboard/posts')}
              >
              <span className="lg:text-base">Posts</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 relative pr-10 ">
        <div className="relative p-1">
          <FiBell className="text-lg cursor-pointer" />
        </div>
        <div className="relative p-1">
          <FiSettings className="text-lg cursor-pointer" />
        </div>
        <div className="relative p-1">
          <Profile className="text-lg cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header; 