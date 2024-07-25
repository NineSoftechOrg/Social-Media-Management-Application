import Link from 'next/link';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#0A2B66]  text-white-900 py-12 pb-0 rounded-t-lg" style={{paddingBottom:"2rem"}}>
      <div className="container mx-auto px-4 text-white-900 ">
        <div className="flex flex-wrap justify-between" style={{paddingBottom:'1rem'}}>
          <div className="w-full md:w-1/4 mb-8 md:mb-0 " style={{marginRight:'5px',marginLeft:'15px',fontSize:"14px"}}>
            <Image src="/logo.png" alt="Probot Logo" className="w-36 mb-4 text-white" width={150} height={100}/>
            <p className="mb-4 text-white">
              Ornare congue mus pellentesque venenatis platea suscipit gravida conubia feugiat nec metus interdum at ipsum elementum sem iaculis dapibus sagittis
            </p>

          </div>
          <div className="w-full md:w-[15%] mb-8 md:mb-0 text-white" style={{fontSize:"14px"}}>
            <h5 className="font-bold text-lg mb-4">Company</h5>
            <ul>
              <li className="mb-2">
                <Link href="/about" className="hover:text-sky-600">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/careers" className="hover:text-sky-600	">
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="hover:text-sky-600">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="hover:text-sky-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[15%] mb-8 md:mb-0 text-white" style={{fontSize:"14px"}}>
            <h5 className="font-bold text-lg mb-4">Resources</h5>
            <ul>
              <li className="mb-2">
                <Link href="/help" className="hover:text-sky-600">
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/privacy" className="hover:text-sky-600">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms" className="hover:text-sky-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[15%] mb-8 md:mb-0 text-white" style={{fontSize:"14px"}}>
            <h5 className="font-bold text-lg mb-4">Follow Us</h5>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                  <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" /> 
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                  <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="mt-8 border-t border-gray-300 pt-8 text-center">
          <p>&copy; 2024 Nine Softech. All rights reserved.</p>
        </div> */}
        <div className=" pt-8 border-t border-[#1A3C70] flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 text-xs text-white">&copy; 2024 Nine Softech, All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:underline text-xs ">Term of use</a>
            <a href="#" className="text-white hover:underline text-xs">Privacy policy</a>
            <a href="#" className="text-white hover:underline text-xs">Cookie policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
