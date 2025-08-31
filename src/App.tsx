import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import CampusMap from './components/CampusMap'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import EventBoard from './components/EventBoard'
import EventBoardPage from './components/EventBoardPage'
import PhoneBook from './components/PhoneBook'
import PhoneBookPage from './components/PhoneBookPage'
import HostelInformation from './components/HostelInformation'
import HostelInformationPage from './components/HostelInformationPage'
import MedicalServices from './components/MedicalServices'
import MedicalServicesPage from './components/MedicalServicesPage'
import Society from './components/Society'
import SocietyPage from './components/SocietyPage'
import StudyHub from './components/StudyHub'
import StudyHubPage from './components/StudyHubPage'
import Launchpad from './components/Launchpad'
import LaunchpadPage from './components/LaunchpadPage'
import TimeTableManager from './components/TimeTableManager'
import TimeTableManagerPage from './components/TimeTableManagerPage'
import FacultyDirectoryPage from './components/FacultyDirectoryPage'
import CRContactsPage from './components/CRContactsPage'
import CanteenPage from './components/CanteenPage'
import Layout from './components/Layout'

function App() {
  // Modal states for various components
  const [isEventBoardOpen, setIsEventBoardOpen] = useState(false)
  const [isPhoneBookOpen, setIsPhoneBookOpen] = useState(false)
  const [isHostelInfoOpen, setIsHostelInfoOpen] = useState(false)
  const [isMedicalServicesOpen, setIsMedicalServicesOpen] = useState(false)
  const [isSocietiesOpen, setIsSocietiesOpen] = useState(false)
  const [isStudyHubOpen, setIsStudyHubOpen] = useState(false)
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false)
  const [isTimeTableManagerOpen, setIsTimeTableManagerOpen] = useState(false)

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0218] via-[#2d0a54] to-[#5c0f8b] relative">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Small stars - fixed pattern */}
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 5px)', backgroundSize: '100px 100px', opacity: 0.15}}></div>
        
        {/* Larger stars with glow */}
        {[...Array(50)].map((_, i) => (
          <div 
            key={`bg-star-${i}`}
            className="fixed rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: 'white',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 6 + 2}px ${Math.random() * 3 + 1}px rgba(255,255,255,0.7)`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
        
        {/* Nebula-like effects */}
        <div className="absolute top-[10%] left-[20%] w-[40vw] h-[30vh] bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vh] bg-fuchsia-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <Header 
        onEventBoardClick={() => setIsEventBoardOpen(true)} 
        onPhoneBookClick={() => setIsPhoneBookOpen(true)}
        onCampusMapClick={() => scrollToSection('map')}
        onHostelInfoClick={() => setIsHostelInfoOpen(true)}
        onMedicalServicesClick={() => setIsMedicalServicesOpen(true)} 
        onSocietiesClick={() => setIsSocietiesOpen(true)}
        onStudyHubClick={() => setIsStudyHubOpen(true)}
        onLaunchpadClick={() => setIsLaunchpadOpen(true)}
        onTimeTableManagerClick={() => setIsTimeTableManagerOpen(true)}
      />
      <Routes>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <Features />
            <section id="map">
              <CampusMap />
            </section>
            <Team />
            <section id="contact">
              <Contact />
            </section>
          </motion.div>
        } />
        <Route path="/events" element={<EventBoardPage />} />
        <Route path="/medical" element={<MedicalServicesPage />} />
        <Route path="/faculty" element={<FacultyDirectoryPage />} />
        <Route path="/hostels" element={<HostelInformationPage />} />
        <Route path="/phonebook" element={<PhoneBookPage />} />
        <Route path="/societies" element={<SocietyPage />} />
        <Route path="/cr-contacts" element={<CRContactsPage />} />
        <Route path="/timetable" element={<TimeTableManagerPage />} />
        <Route path="/study-hub" element={<StudyHubPage />} />
        <Route path="/launchpad" element={<LaunchpadPage />} />
        <Route path="/canteen" element={<CanteenPage />} />
        <Route path="/map" element={
          <Layout title="Campus Map">
            <CampusMap />
          </Layout>
        } />
      </Routes>
      <Footer />
      <ChatBot />
      
      {/* Modals */}
      <EventBoard 
        isOpen={isEventBoardOpen} 
        onClose={() => setIsEventBoardOpen(false)} 
      />
      
      <PhoneBook 
        isOpen={isPhoneBookOpen} 
        onClose={() => setIsPhoneBookOpen(false)} 
      />

      <HostelInformation 
        isOpen={isHostelInfoOpen} 
        onClose={() => setIsHostelInfoOpen(false)} 
      />

      <MedicalServices 
        isOpen={isMedicalServicesOpen} 
        onClose={() => setIsMedicalServicesOpen(false)} 
      />

      <Society 
        isOpen={isSocietiesOpen} 
        onClose={() => setIsSocietiesOpen(false)} 
      />

      <StudyHub 
        isOpen={isStudyHubOpen} 
        onClose={() => setIsStudyHubOpen(false)} 
      />

      <Launchpad 
        isOpen={isLaunchpadOpen} 
        onClose={() => setIsLaunchpadOpen(false)} 
      />

      <TimeTableManager
        isOpen={isTimeTableManagerOpen}
        onClose={() => setIsTimeTableManagerOpen(false)}
      />
    </div>
  )
}

export default App