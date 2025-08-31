import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface HeaderProps {
  onEventBoardClick?: () => void;
  onPhoneBookClick?: () => void;
  onCampusMapClick?: () => void;
  onHostelInfoClick?: () => void;
  onMedicalServicesClick?: () => void;
  onSocietiesClick?: () => void;
  onStudyHubClick?: () => void;
  onLaunchpadClick?: () => void;
  onTimeTableManagerClick?: () => void;
}

const Header = ({ 
  onEventBoardClick,
  onPhoneBookClick,
  onCampusMapClick,
  onHostelInfoClick,
  onMedicalServicesClick,
  onSocietiesClick,
  onStudyHubClick,
  onLaunchpadClick,
  onTimeTableManagerClick
}: HeaderProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false)
  const [isMagicalKitOpen, setIsMagicalKitOpen] = useState(false) // Start closed by default
  const quickLinksRef = useRef<HTMLDivElement>(null)
  const magicalKitRef = useRef<HTMLDivElement>(null)

  interface NavItem {
    name: string;
    href?: string;
    handler?: () => void;
    hasDropdown?: boolean;
    dropdownState?: boolean;
    setDropdownState?: (state: boolean) => void;
    ref?: React.RefObject<HTMLDivElement>;
    activeColor?: string;
  }
  
  interface SubItem {
    name: string;
    href?: string;
    handler?: () => void;
  }

  // Navigation handler functions
  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      // Handle anchor links for home page
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete then scroll
        setTimeout(() => {
          const element = document.querySelector(path);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Handle route navigation
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  // Special handler for Home navigation
  const handleHomeNavigation = () => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home
      navigate('/');
      // Wait for navigation to complete then scroll to top
      setTimeout(() => {
        const homeElement = document.querySelector('#home');
        if (homeElement) {
          homeElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, scroll to home section
      const homeElement = document.querySelector('#home');
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  // Special handler for About Us (Team section)
  const handleAboutUsNavigation = () => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home then scroll to team
      navigate('/');
      setTimeout(() => {
        const teamElement = document.querySelector('#team');
        if (teamElement) {
          teamElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If on home page, scroll to team section
      const teamElement = document.querySelector('#team');
      if (teamElement) {
        teamElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { name: 'Home', handler: () => handleHomeNavigation() },
    { name: 'Navigation', handler: () => handleNavigation('/map') },
    { name: 'Magical Kit', hasDropdown: true, dropdownState: isMagicalKitOpen, setDropdownState: setIsMagicalKitOpen, ref: magicalKitRef, activeColor: 'text-purple-600' },
    { name: 'Quick Links', hasDropdown: true, dropdownState: isQuickLinksOpen, setDropdownState: setIsQuickLinksOpen, ref: quickLinksRef },
    { name: 'About Us', handler: () => handleAboutUsNavigation() },
  ]

  const quickLinksItems: SubItem[] = [
    { name: 'Course Curriculum', href: 'https://nsut.ac.in/en/curriculam-information' },
    { name: 'Academic Calendar', href: '/Academic calender .pdf' },
    { name: 'Societies and Clubs', handler: () => handleNavigation('/societies') },
    { name: 'CUMS Website', href: 'https://www.imsnsit.org/imsnsit/' },
    { name: 'Time Table', handler: () => handleNavigation('/timetable') },
    { name: 'Contact Us', handler: () => handleNavigation('#contact') }
  ]

  const magicalKitItems: SubItem[] = [
    { name: 'Campus Map', handler: () => handleNavigation('/map') },
    { name: 'Hostel Information', handler: () => handleNavigation('/hostels') },
    { name: 'Medical Services', handler: () => handleNavigation('/medical') },
    { name: 'Societies', handler: () => handleNavigation('/societies') },
    { name: 'Study Hub', handler: () => handleNavigation('/study-hub') },
    { name: 'Faculty Directory', handler: () => handleNavigation('/faculty') },
    { name: 'Event Board', handler: () => handleNavigation('/events') },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (quickLinksRef.current && !quickLinksRef.current.contains(event.target as Node)) {
        setIsQuickLinksOpen(false)
      }
      if (magicalKitRef.current && !magicalKitRef.current.contains(event.target as Node)) {
        setIsMagicalKitOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10"
    >
      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">        
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleHomeNavigation()}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/mkc.png" 
                alt="MKC Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-white">Campus Genie</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative" ref={item.ref}>
                {item.hasDropdown ? (
                  <div className="relative">
                                        <button
                      onClick={() => item.setDropdownState && item.setDropdownState(!item.dropdownState)}
                      className={`flex items-center text-sm py-2 px-4 rounded-lg transition-all duration-300 ${
                        item.dropdownState ? 'text-cyan-400 bg-white/10' : 'text-white hover:text-cyan-400 hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        item.dropdownState ? 'rotate-180' : ''
                      }`} />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </button>
                    
                    {item.dropdownState && (
                      <div className="absolute top-full left-0 mt-1 bg-black/60 backdrop-blur-md rounded-md shadow-lg py-2 w-40 z-50 border border-purple-500/50">
                        {item.name === 'Quick Links' ? (
                          quickLinksItems.map((subItem) => (
                            subItem.handler ? (
                              <button
                                key={subItem.name}
                                onClick={() => {
                                  item.setDropdownState && item.setDropdownState(false);
                                  subItem.handler && subItem.handler();
                                }}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/40 hover:text-purple-200 transition-all duration-200 relative group"
                              >
                                <span className="absolute left-2 w-0 h-full top-0 bg-purple-100 -z-10 group-hover:w-[calc(100%-16px)] transition-all duration-300 rounded"></span>
                                {subItem.name}
                              </button>
                            ) : (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/40 hover:text-purple-200 transition-all duration-200 relative group"
                                onClick={() => {
                                  item.setDropdownState && item.setDropdownState(false);
                                }}
                              >
                                <span className="absolute left-2 w-0 h-full top-0 bg-purple-100 -z-10 group-hover:w-[calc(100%-16px)] transition-all duration-300 rounded"></span>
                                {subItem.name}
                              </a>
                            )
                          ))
                        ) : (
                          magicalKitItems.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => {
                                item.setDropdownState && item.setDropdownState(false);
                                subItem.handler && subItem.handler();
                              }}
                              className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/40 hover:text-purple-200 transition-all duration-200 relative group"
                            >
                              <span className="absolute left-2 w-0 h-full top-0 bg-purple-100 -z-10 group-hover:w-[calc(100%-16px)] transition-all duration-300 rounded"></span>
                              {subItem.name}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => item.handler && item.handler()}
                    className="text-sm py-2 px-4 text-white hover:text-purple-300 transition-all duration-200 font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center">
            {/* Right side content removed */}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-purple-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-purple-500/30"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => item.setDropdownState && item.setDropdownState(!item.dropdownState)}
                        className="flex items-center justify-between w-full py-2 text-white hover:text-purple-300 transition-colors duration-200 font-medium"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          item.dropdownState ? 'rotate-180 text-purple-600' : ''
                        }`} />
                      </button>
                      
                      {item.dropdownState && (
                        <div className="pl-4 mt-1 space-y-2">
                          {item.name === 'Quick Links' ? (
                            quickLinksItems.map((subItem) => (
                              subItem.handler ? (
                                <button
                                  key={subItem.name}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    subItem.handler && subItem.handler();
                                  }}
                                  className="w-full text-left block py-2 text-gray-300 hover:text-purple-300 pl-2 transition-colors duration-200 border-l-2 border-transparent hover:border-purple-400"
                                >
                                  {subItem.name}
                                </button>
                              ) : (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block py-2 text-gray-300 hover:text-purple-300 pl-2 transition-colors duration-200 border-l-2 border-transparent hover:border-purple-400"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.name}
                                </a>
                              )
                            ))
                          ) : (
                            magicalKitItems.map((subItem) => (
                              <button
                                key={subItem.name}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  subItem.handler && subItem.handler();
                                }}
                                className="w-full text-left block py-2 text-gray-300 hover:text-purple-300 pl-2 transition-colors duration-200 border-l-2 border-transparent hover:border-purple-400"
                              >
                                {subItem.name}
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => item.handler && item.handler()}
                      className="block py-2 text-white hover:text-purple-600 transition-colors duration-200 font-medium"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header