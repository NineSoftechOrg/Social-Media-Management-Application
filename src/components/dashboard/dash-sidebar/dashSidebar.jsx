import { FiMail, FiCalendar } from "react-icons/fi";
import {
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
import HomeIcon from '@mui/icons-material/Home';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Image from "next/image";

const SocialIcons = {
  Home: {
    name: 'Home',
    icon: HomeIcon,
    link: '/dashboard'
  },
  Whatsapp: {
    name: 'WA Business',
    icon: WhatsAppIcon,
    link: '/WhatsAppBI'
  },
  GoogleAnalytics: {
    name: 'Google Analytics',
    icon: SignalCellularAltIcon, 
    link: '/GoogleAnalytics'
  },
  Facebook: {
    name: 'Facebook',
    icon: FacebookIcon,
    link: '/FacebookInsight'
  },
  Instagram: {
    name: 'Instagram',
    icon: InstagramIcon,
    link: '/InstagramInsight'
  },
  Twitter: {
    name: 'Twitter X',
    icon: TwitterIcon,
    link: '/twitterXInsight'
  },
  Linkedin: {
    name: 'Linkedin',
    icon: LinkedInIcon,
    link: '/LinkedinInsight'
  },
  Medium: {
    name: 'Medium',
    icon: () => <FontAwesomeIcon icon={faMedium} className="text-lg text-gray-700 hover:text-sky-700" />,
    link: '/MediumPosts'
  },
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed lg:relative flex flex-col h-screen transition-width duration-300 border-r bg-white z-40 lg:z-auto ${
        isOpen ? "w-55" : "w-0 lg:w-20 overflow-hidden"
      }`}
    >
      <div
        className={`flex flex-col flex-grow border border-r-gray-200 ${
          isOpen ? "p-5" : "p-2"
        }`}
      >
        {isOpen ? (
          <Image
            src={"/images/logos/dark-logo.svg"}
            alt="logo"
            height={100}
            width={150}
            priority
            className="mx-auto pb-10 pt-3"
          />
        ) : (
          <Image
            src={"/images/logos/logoIcon.svg"}
            alt="logo"
            height={25}
            width={25}
            priority
            className="mx-auto pb-10 pt-3"
          />
        )}
        {/* Sidebar icons and labels */}
        <div>
          {SocialIcons && Object.keys(SocialIcons).map((key) => {
            const { name, icon: IconComponent, link } = SocialIcons[key];
            return (
              <div key={name} className="p-2">
                <a href={link} className="flex items-center p-2 mx-auto cursor-pointer hover:bg-blue-100 rounded-md hover:text-blue-500 font-sm">
                  {IconComponent && <IconComponent className="text-2xl text-gray-700 " />}
                  {isOpen && <span className="ml-4 text-sm">{name}</span>}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
