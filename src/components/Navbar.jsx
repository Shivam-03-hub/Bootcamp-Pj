import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import companyLogo from '../assets/images/logo-med.jpeg';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  // Check login status and userType from localStorage on every render
  const isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';
  const userType = window.localStorage.getItem('userType');
  const userId = window.localStorage.getItem('userId'); // Retrieve userId for doctorId

  useEffect(() => {
    const checkLoginStatus = () => {
      console.log('localStorage changed in another tab:', window.localStorage.getItem('loggedIn'));
    };
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    navigate('/get-started');
  };

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="pt-2">
          <img src={companyLogo} alt="Company Logo" />
        </div>
        <div className="hidden space-x-6 md:flex">
          <Link to="/" className="hover:text-darkGrayishBlue">Home</Link>
          {isLoggedIn && userType === 'User' && (
            <>
              <Link to="/reminder" className="hover:text-darkGrayishBlue">Reminder</Link>
              <Link to="/report" className="hover:text-darkGrayishBlue">Reports</Link>
              <Link to="/specialist" className="hover:text-darkGrayishBlue">Specialists</Link>
            </>
          )}
          {isLoggedIn && userType === 'Doctor' && (
            <Link
              to="/doctor-dashboard"
              state={{ doctorId: userId }} // Pass doctorId via state
              className="hover:text-darkGrayishBlue"
            >
              Doctor Dashboard
            </Link>
          )}
          <Link to="/about-us" className="hover:text-darkGrayishBlue">About Us</Link>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/get-started"
              className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
            >
              Get Started
            </Link>
          )}
        </div>
        <button
          className={
            toggleMenu
              ? 'open block hamburger md:hidden focus:outline-none'
              : 'block hamburger md:hidden focus:outline-none'
          }
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      <div className="md:hidden">
        <div
          className={
            toggleMenu
              ? 'absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
              : 'absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
          }
        >
          <Link to="/">Home</Link>
          {isLoggedIn && userType === 'User' && (
            <>
              <Link to="/reminder">Reminder</Link>
              <Link to="/report">Reports</Link>
              <Link to="/specialist">Specialists</Link>
            </>
          )}
          {isLoggedIn && userType === 'Doctor' && (
            <Link
              to="/doctor-dashboard"
              state={{ doctorId: userId }} // Pass doctorId via state for mobile menu
            >
              Doctor Dashboard
            </Link>
          )}
          <Link to="/about-us">About Us</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/get-started">Get Started</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;