import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Campus location data from marker.json
interface LocationData {
  id: string;
  name: string;
  coordinates: [number, number];
}

const campusLocations: LocationData[] = [
  { id: "c0MDg", name: "Admin Block/Main Audi (Second Floor)", coordinates: [77.0370043, 28.6098136] },
  { id: "c0NDc", name: "Alaknanda Hostel", coordinates: [77.0396225, 28.6080387] },
  { id: "IxMTc", name: "APJ Lecture Theatre", coordinates: [77.037037, 28.6119639] },
  { id: "M5ODg", name: "Aryabhata Hostel", coordinates: [77.03536, 28.612325] },
  { id: "U3Njc", name: "Badminton Court", coordinates: [77.0391652, 28.6103541] },
  { id: "g1Nzk", name: "Basketball Court", coordinates: [77.040215, 28.610088] },
  { id: "IyNzU", name: "Bhaskara Hostel", coordinates: [77.035586, 28.612664] },
  { id: "c3MjI", name: "Block 4/ECE/Biotech/Electronics", coordinates: [77.037603, 28.60976] },
  { id: "g5NTk", name: "Block 5/Computer Science/IT Block", coordinates: [77.03846, 28.609972] },
  { id: "YzMTE", name: "Block 6/Mechanical/Electrical/Humanities/ICE/Mathematics Department", coordinates: [77.037726, 28.61081] },
  { id: "k0Nzg", name: "Central Computer Centre/CC/CCW", coordinates: [77.039133, 28.6105629] },
  { id: "E2NzQ", name: "Central Library", coordinates: [77.038989, 28.610323] },
  { id: "k2MjQ", name: "Connecting Block (CBT)/Mini Audi (First Floor)", coordinates: [77.0381071, 28.6097568] },
  { id: "EwODg", name: "Department of Design", coordinates: [77.033635, 28.6142264] },
  { id: "g2MzI", name: "Faculty Housing", coordinates: [77.0363154, 28.6072051] },
  { id: "c2OTY", name: "Fashion Tech Block", coordinates: [77.0390478, 28.6113709] },
  { id: "EwMTU", name: "First Aid / Medical Centre", coordinates: [77.038598, 28.611698] },
  { id: "cxNzI", name: "Fountain", coordinates: [77.037892, 28.610033] },
  { id: "Q1OTY", name: "Guest House", coordinates: [77.0381771, 28.6081707] },
  { id: "E1OTE", name: "Gym", coordinates: [77.039409, 28.610438] },
  { id: "QzNDE", name: "JC Bose Hostel", coordinates: [77.034395, 28.613572] },
  { id: "U3ODk", name: "Kaveri Hostel (GH-2)", coordinates: [77.0383032, 28.6137145] },
  { id: "IzMjU", name: "Lake", coordinates: [77.037914, 28.615106] },
  { id: "k2Mzg", name: "Main Gate", coordinates: [77.035253, 28.608482] },
  { id: "M3NDM", name: "Mandir", coordinates: [77.0384559, 28.6127591] },
  { id: "cyODQ", name: "Moksha Ground", coordinates: [77.036752, 28.610629] },
  { id: "k3NzA", name: "Music Room (Crescendo)", coordinates: [77.0379033, 28.6120634] },
  { id: "IzODU", name: "National Flag", coordinates: [77.0364742, 28.6097124] },
  { id: "E3OTg", name: "Nescii 1/Nescii Hill", coordinates: [77.0359617, 28.6101073] },
  { id: "U4NjY", name: "Nescii 2", coordinates: [77.0360562, 28.6094298] },
  { id: "cwNDk", name: "Nescii Parking", coordinates: [77.036243, 28.610266] },
  { id: "Y0NzA", name: "North Gate", coordinates: [77.0336517, 28.6132133] },
  { id: "YwOTU", name: "Raman Hostel", coordinates: [77.0352509, 28.6132782] },
  { id: "Q3ODU", name: "Ramanujan Hostel", coordinates: [77.0349288, 28.6130042] },
  { id: "k5OTA", name: "Running Track", coordinates: [77.0409289, 28.6088749] },
  { id: "g0ODY", name: "SAC (Student Activity Centre)", coordinates: [77.0389372, 28.6103124] },
  { id: "MwNzg", name: "Safal", coordinates: [77.036355, 28.612127] },
  { id: "c1NjU", name: "Saraswati Hostel", coordinates: [77.0396304, 28.607391] },
  { id: "I0NDk", name: "SBI/Bank Parking", coordinates: [77.0370262, 28.6094399] },
  { id: "g0MDY", name: "Smart Block", coordinates: [77.037804, 28.6120516] },
  { id: "k5NzI", name: "Sports / Yoga/ Witches' Lane", coordinates: [77.0400525, 28.6103846] },
  { id: "IzODc", name: "Stationary Shop / Shopping Complex", coordinates: [77.037389, 28.6123261] },
  { id: "g4MTQ", name: "Student Centre/SC/Canteen/Reading Room", coordinates: [77.0369098, 28.6116388] },
  { id: "Q2NDE", name: "Team Dedalus/Bullethawk/ARES/Robotics/Garages", coordinates: [77.039361, 28.61117] },
  { id: "IzNzY", name: "Training & Placement (TNP)", coordinates: [77.0396048, 28.6085827] },
  { id: "QwNzQ", name: "Vice Chancellor's Residence", coordinates: [77.0362641, 28.6068045] },
  { id: "k4Mjk", name: "Volleyball", coordinates: [77.0403514, 28.6097551] },
  { id: "YxNTU", name: "Water Softening Plant", coordinates: [77.0345109, 28.6120343] },
  { id: "Y2MzQ", name: "WaterCooler", coordinates: [77.039221, 28.611406] },
  { id: "workshop", name: "Central Workshop", coordinates: [77.0389831335408, 28.6121480921617] },
  { id: "amul", name: "Amul Ground", coordinates: [77.0361200657036, 28.6117118137024] },
  { id: "cricket", name: "Cricket Ground", coordinates: [77.0411854923255, 28.6102250509268] },
  { id: "lovers", name: "Lovers' Lane", coordinates: [77.0383575255956, 28.6085285599395] },
  { id: "libparking", name: "Library Parking", coordinates: [77.0395420566474, 28.6104502363606] },
  { id: "netaji", name: "Netaji Statue", coordinates: [77.0350324212413, 28.6093092067537] },
  { id: "nursery", name: "Nursery/Greenhouse", coordinates: [77.0381431232191, 28.6049680440976] },
  { id: "guitar", name: "Guitar Lane", coordinates: [77.0361086403852, 28.6096204385875] }
];

// Convert to object for easy lookup
const orbitLocationData: { [key: string]: [number, number] } = {};
campusLocations.forEach(location => {
  orbitLocationData[location.name] = [location.coordinates[1], location.coordinates[0]]; // Leaflet uses [lat, lng]
});

// Common locations for quick access
const quickLocations = [
  "Central Library",
  "Admin Block/Main Audi (Second Floor)", 
  "Block 5/Computer Science/IT Block",
  "SAC (Student Activity Centre)",
  "Student Centre/SC/Canteen/Reading Room",
  "Main Gate",
  "Alaknanda Hostel",
  "Kaveri Hostel (GH-2)",
  "Gym"
];

const CampusMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const fullScreenMapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [fullScreenMap, setFullScreenMap] = useState<any>(null);
  const [currentMarkers, setCurrentMarkers] = useState<any[]>([]);
  const [fullScreenMarkers, setFullScreenMarkers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load Leaflet library
  useEffect(() => {
    if (!leafletLoaded) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        setLeafletLoaded(true);
      };
      document.head.appendChild(script);
    }
  }, [leafletLoaded]);

  // Initialize regular map
  useEffect(() => {
    if (leafletLoaded && mapRef.current && !map) {
      const L = (window as any).L;
      const newMap = L.map(mapRef.current).setView([28.610347, 77.038992], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(newMap);

      // Add all location markers with custom popups
      campusLocations.forEach((location) => {
        const coords = [location.coordinates[1], location.coordinates[0]]; // [lat, lng]
        L.marker(coords)
          .addTo(newMap)
          .bindPopup(`
            <div style="font-family: Arial, sans-serif; padding: 8px; min-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: 600; font-size: 16px;">${location.name}</h3>
              <div style="margin-bottom: 8px;">
                <span style="background: #e5e7eb; color: #374151; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 500;">ID: ${location.id}</span>
              </div>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                📍 Lat: ${coords[0].toFixed(6)}, Lng: ${coords[1].toFixed(6)}
              </p>
              <button 
                onclick="window.setAsDestination('${location.name}')" 
                style="background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s;"
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'"
              >
                🚶 Set as Destination
              </button>
            </div>
          `);
      });

      setMap(newMap);
    }
  }, [leafletLoaded, mapRef, map]);

  // Initialize full screen map
  useEffect(() => {
    if (leafletLoaded && fullScreenMapRef.current && !fullScreenMap && isFullScreen) {
      const L = (window as any).L;
      const newFullScreenMap = L.map(fullScreenMapRef.current).setView([28.610347, 77.038992], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(newFullScreenMap);

      // Add all location markers
      campusLocations.forEach((location) => {
        const coords = [location.coordinates[1], location.coordinates[0]]; // [lat, lng]
        L.marker(coords)
          .addTo(newFullScreenMap)
          .bindPopup(`
            <div style="font-family: Arial, sans-serif; padding: 8px; min-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: 600; font-size: 16px;">${location.name}</h3>
              <div style="margin-bottom: 8px;">
                <span style="background: #e5e7eb; color: #374151; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 500;">ID: ${location.id}</span>
              </div>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                📍 Lat: ${coords[0].toFixed(6)}, Lng: ${coords[1].toFixed(6)}
              </p>
              <button 
                onclick="window.setAsDestinationFullScreen('${location.name}')" 
                style="background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500;"
              >
                🚶 Set as Destination
              </button>
            </div>
          `);
      });

      setFullScreenMap(newFullScreenMap);
    }
  }, [leafletLoaded, fullScreenMapRef, fullScreenMap, isFullScreen]);

  // Global functions for popup buttons
  useEffect(() => {
    (window as any).setAsDestination = (locationName: string) => {
      setDestination(locationName);
      highlightLocation(locationName);
    };

    (window as any).setAsDestinationFullScreen = (locationName: string) => {
      setDestination(locationName);
      if (fullScreenMap && orbitLocationData[locationName]) {
        const coords = orbitLocationData[locationName];
        fullScreenMap.setView(coords, 18);
      }
    };
  }, [fullScreenMap]);

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = campusLocations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8).map(loc => loc.name));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const highlightLocation = (locationName: string) => {
    if (map && orbitLocationData[locationName]) {
      const coords = orbitLocationData[locationName];
      map.setView(coords, 18);
      setSelectedLocation(locationName);
      setSearchQuery(locationName);
      setSuggestions([]);
    }
  };

  const openFullScreenMap = () => {
    setIsFullScreen(true);
  };

  const closeFullScreenMap = () => {
    setIsFullScreen(false);
    if (fullScreenMap) {
      fullScreenMap.remove();
      setFullScreenMap(null);
    }
  };

  const clearRoute = () => {
    currentMarkers.forEach(marker => map.removeLayer(marker));
    setCurrentMarkers([]);
    setDestination('');
  };

  return (
    <>
      {/* Regular Map View */}
      <div className={`min-h-screen relative pt-24 overflow-hidden ${isFullScreen ? 'hidden' : ''}`}
           style={{ 
             background: 'radial-gradient(circle at 30% 30%, #111827, #000000 70%)',
             color: '#ffffff'
           }}>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-60 z-[1]"
             style={{
               background: 'radial-gradient(circle, #6d28d9, transparent 70%)',
               filter: 'blur(70px)'
             }} />
        <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full opacity-60 z-[1]"
             style={{
               background: 'radial-gradient(circle, #0891b2, transparent 70%)',
               filter: 'blur(70px)'
             }} />

        <div className="container mx-auto px-4 py-8 relative z-10" style={{ maxWidth: '1400px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#ffffff', lineHeight: 1.2 }}>
              🗺️ Campus Interactive Map
              <span className="block text-4xl md:text-5xl mt-2 font-normal italic"
                    style={{
                      fontFamily: 'Times New Roman, serif',
                      background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                Navigation Hub
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-6" style={{ color: '#94a3b8', lineHeight: 1.7 }}>
              Explore NSUT campus with interactive navigation and real-time location discovery
            </p>
            <div className="flex items-center justify-center gap-4" style={{ color: '#94a3b8' }}>
              <span className="flex items-center gap-2">📍 {campusLocations.length}+ Locations</span>
              <span>•</span>
              <span className="flex items-center gap-2">🔍 Smart Search</span>
              <span>•</span>
              <span className="flex items-center gap-2">📊 GPS Coordinates</span>
              <span>•</span>
              <span className="flex items-center gap-2">🆔 Location IDs</span>
            </div>
          </motion.div>

          {/* Search and Controls */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl p-8 mb-8 overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-600"
                 style={{
                   background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent)',
                   transform: 'translateX(-100%)',
                   animation: 'shimmer 2s infinite'
                 }} />
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {/* Search Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: '#ffffff' }}>
                  🔍 Location Search
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by location name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl text-lg transition-all focus:outline-none focus:ring-4"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                      e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#94a3b8' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 rounded-xl border mt-2 z-10 max-h-64 overflow-y-auto"
                         style={{
                           backgroundColor: 'rgba(255, 255, 255, 0.95)',
                           border: '1px solid rgba(255, 255, 255, 0.1)',
                           backdropFilter: 'blur(10px)',
                           WebkitBackdropFilter: 'blur(10px)',
                           boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                         }}>
                      {suggestions.map((suggestion, index) => {
                        const location = campusLocations.find(loc => loc.name === suggestion);
                        return (
                          <div
                            key={index}
                            onClick={() => highlightLocation(suggestion)}
                            className="px-6 py-4 cursor-pointer border-b last:border-b-0 transition-all duration-300 hover:transform hover:scale-[1.02]"
                            style={{
                              color: '#1f2937',
                              borderColor: '#e5e7eb'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.borderColor = '#e5e7eb';
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">📍</span>
                              <div className="flex-1">
                                <div className="font-medium text-lg">{suggestion}</div>
                                {location && (
                                  <div className="text-sm flex items-center gap-2" style={{ color: '#6b7280' }}>
                                    <span className="px-2 py-1 rounded text-xs font-mono" style={{ backgroundColor: '#e5e7eb' }}>ID: {location.id}</span>
                                    <span>📊 {location.coordinates[1].toFixed(4)}, {location.coordinates[0].toFixed(4)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="text-sm flex items-center gap-2" style={{ color: '#94a3b8' }}>
                  <span>💡 Tip:</span>
                  <span>Search by name, ID, or click markers for details with coordinates</span>
                </div>
              </div>

              {/* Quick Access */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: '#ffffff' }}>
                  ⚡ Popular Locations
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickLocations.map((location) => (
                    <button
                      key={location}
                      onClick={() => highlightLocation(location)}
                      className="px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #6d28d9, #0891b2)',
                        color: '#ffffff',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(109, 40, 217, 0.4)';
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      {location.includes('Hostel') ? '🏠' : 
                       location.includes('Block') ? '🏢' :
                       location.includes('Gate') ? '🚪' :
                       location.includes('Sports') ? '🏃' :
                       location.includes('Library') ? '📚' : '🏛️'} {location.replace(/Block|Hostel \d+/g, '').trim()}
                    </button>
                  ))}
                </div>
                <div className="text-sm flex items-center gap-2 mt-4" style={{ color: '#94a3b8' }}>
                  <span>🎯 Quick access to frequently visited campus locations</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={openFullScreenMap}
                className="px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 text-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0891b2, #22d3ee)',
                  color: '#ffffff',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(8, 145, 178, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                🔍 Open Full Screen Map
              </button>
              {currentMarkers.length > 0 && (
                <button
                  onClick={clearRoute}
                  className="px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-lg relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #f97316)',
                    color: '#ffffff',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  🗑️ Clear Selection
                </button>
              )}
            </div>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-3xl p-6 overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-600"
                 style={{
                   background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent)',
                   transform: 'translateX(-100%)',
                   animation: 'shimmer 2s infinite'
                 }} />

            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-2xl font-bold flex items-center gap-3" style={{ color: '#ffffff' }}>
                🗺️ Interactive Campus Map
              </h3>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#94a3b8' }}>
                <span>🌍 OpenStreetMap</span>
                <span>•</span>
                <span>📡 Real-time Data</span>
              </div>
            </div>
            
            <div
              ref={mapRef}
              className="w-full h-96 rounded-2xl overflow-hidden relative z-10"
              style={{ 
                minHeight: '600px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
            />
            
            {selectedLocation && (
              <div className="mt-6 p-6 rounded-xl relative overflow-hidden"
                   style={{
                     background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.5), rgba(8, 145, 178, 0.5))',
                     backdropFilter: 'blur(10px)',
                     WebkitBackdropFilter: 'blur(10px)',
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                   }}>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <p className="text-lg" style={{ color: '#ffffff' }}>
                      <span className="font-bold">📍 Selected Location:</span> {selectedLocation}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm opacity-90" style={{ color: '#e2e8f0' }}>
                        📊 Coordinates: {orbitLocationData[selectedLocation]?.[0].toFixed(6)}, {orbitLocationData[selectedLocation]?.[1].toFixed(6)}
                      </span>
                      {(() => {
                        const location = campusLocations.find(loc => loc.name === selectedLocation);
                        return location && (
                          <span className="px-3 py-1 rounded-full text-sm font-mono"
                                style={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                  color: '#ffffff'
                                }}>
                            🆔 {location.id}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs mb-1" style={{ color: '#94a3b8' }}>Location Type</div>
                    <div className="px-3 py-1 rounded-full text-sm"
                         style={{
                           backgroundColor: 'rgba(255, 255, 255, 0.2)',
                           color: '#ffffff'
                         }}>
                      {selectedLocation.includes('Hostel') ? '🏠 Hostel' : 
                       selectedLocation.includes('Block') ? '🏢 Academic' :
                       selectedLocation.includes('Gate') ? '🚪 Entrance' :
                       selectedLocation.includes('Sports') || selectedLocation.includes('Court') || selectedLocation.includes('Ground') ? '🏃 Sports' :
                       selectedLocation.includes('Library') ? '📚 Library' :
                       selectedLocation.includes('Centre') || selectedLocation.includes('Center') ? '🎯 Service' : '🏛️ Facility'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Full Screen Map */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50"
             style={{ background: 'radial-gradient(circle at 30% 30%, #111827, #000000 70%)' }}>
          {/* Header */}
          <div className="text-white p-4 flex items-center justify-between relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, #6d28d9, #0891b2)',
                 boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                 backdropFilter: 'blur(10px)',
                 WebkitBackdropFilter: 'blur(10px)',
                 border: '1px solid rgba(255, 255, 255, 0.1)'
               }}>
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-30"
                 style={{
                   background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)',
                   transform: 'translateX(-100%)',
                   animation: 'shimmer 3s infinite'
                 }} />
            
            <div className="flex items-center gap-4 relative z-10">
              <h1 className="text-2xl font-bold">🗺️ NSUT Campus Map - Full Screen</h1>
              <div className="text-sm opacity-75">Interactive Navigation | Real-time Coordinates</div>
            </div>
            <button
              onClick={closeFullScreenMap}
              className="px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #dc2626, #f97316)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(220, 38, 38, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
              }}
            >
              ✕ Close
            </button>
          </div>
          
          {/* Full Screen Map */}
          <div className="h-full"
               style={{ background: 'radial-gradient(circle at 30% 30%, #111827, #000000 70%)' }}>
            <div
              ref={fullScreenMapRef}
              className="w-full h-full"
              style={{ height: 'calc(100vh - 72px)' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CampusMap;