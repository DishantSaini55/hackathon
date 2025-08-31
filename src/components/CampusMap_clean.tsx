import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Campus location data from marker.json
const campusLocationData = {
  "Admin Block/Main Audi (Second Floor)": { id: "c0MDg", coords: [28.6098136, 77.0370043] },
  "Alaknanda Hostel": { id: "c0NDc", coords: [28.6080387, 77.0396225] },
  "APJ Lecture Theatre": { id: "IxMTc", coords: [28.6119639, 77.037037] },
  "Aryabhata Hostel": { id: "M5ODg", coords: [28.612325, 77.03536] },
  "Badminton Court": { id: "U3Njc", coords: [28.6103541, 77.0391652] },
  "Basketball Court": { id: "g1Nzk", coords: [28.610088, 77.040215] },
  "Bhaskara Hostel": { id: "IyNzU", coords: [28.612664, 77.035586] },
  "Block 4/ECE/Biotech/Electronics": { id: "c3MjI", coords: [28.60976, 77.037603] },
  "Block 5/Computer Science/IT Block": { id: "g5NTk", coords: [28.609972, 77.03846] },
  "Block 6/Mechanical/Electrical/Humanities/ICE/Mathematics Department": { id: "YzMTE", coords: [28.61081, 77.037726] },
  "Central Computer Centre/CC/CCW": { id: "k0Nzg", coords: [28.6105629, 77.039133] },
  "Central Library": { id: "E2NzQ", coords: [28.610323, 77.038989] },
  "Connecting Block (CBT)/Mini Audi (First Floor)": { id: "k2MjQ", coords: [28.6097568, 77.0381071] },
  "Department of Design": { id: "EwODg", coords: [28.6142264, 77.033635] },
  "Faculty Housing": { id: "g2MzI", coords: [28.6072051, 77.0363154] },
  "Fashion Tech Block": { id: "c2OTY", coords: [28.6113709, 77.0390478] },
  "First Aid / Medical Centre": { id: "EwMTU", coords: [28.611698, 77.038598] },
  "Fountain": { id: "cxNzI", coords: [28.610033, 77.037892] },
  "Guest House": { id: "Q1OTY", coords: [28.6081707, 77.0381771] },
  "Gym": { id: "E1OTE", coords: [28.610438, 77.039409] },
  "JC Bose Hostel": { id: "QzNDE", coords: [28.613572, 77.034395] },
  "Kaveri Hostel (GH-2)": { id: "U3ODk", coords: [28.6137145, 77.0383032] },
  "Lake": { id: "IzMjU", coords: [28.615106, 77.037914] },
  "Main Gate": { id: "k2Mzg", coords: [28.608482, 77.035253] },
  "Mandir": { id: "M3NDM", coords: [28.6127591, 77.0384559] },
  "Moksha Ground": { id: "cyODQ", coords: [28.610629, 77.036752] },
  "Music Room (Crescendo)": { id: "k3NzA", coords: [28.6120634, 77.0379033] },
  "National Flag": { id: "IzODU", coords: [28.6097124, 77.0364742] },
  "Nescii 1/Nescii Hill": { id: "E3OTg", coords: [28.6101073, 77.0359617] },
  "Nescii 2": { id: "U4NjY", coords: [28.6094298, 77.0360562] },
  "Nescii Parking": { id: "cwNDk", coords: [28.610266, 77.036243] },
  "North Gate": { id: "Y0NzA", coords: [28.6132133, 77.0336517] },
  "Raman Hostel": { id: "YwOTU", coords: [28.6132782, 77.0352509] },
  "Ramanujan Hostel": { id: "Q3ODU", coords: [28.6130042, 77.0349288] },
  "Running Track": { id: "k5OTA", coords: [28.6088749, 77.0409289] },
  "SAC (Student Activity Centre)": { id: "g0ODY", coords: [28.6103124, 77.0389372] },
  "Safal": { id: "MwNzg", coords: [28.612127, 77.036355] },
  "Saraswati Hostel": { id: "c1NjU", coords: [28.607391, 77.0396304] },
  "SBI/Bank Parking": { id: "I0NDk", coords: [28.6094399, 77.0370262] },
  "Smart Block": { id: "g0MDY", coords: [28.6120516, 77.037804] },
  "Sports / Yoga/ Witches' Lane": { id: "k5NzI", coords: [28.6103846, 77.0400525] },
  "Stationary Shop / Shopping Complex": { id: "IzODc", coords: [28.6123261, 77.037389] },
  "Student Centre/SC/Canteen/Reading Room": { id: "g4MTQ", coords: [28.6116388, 77.0369098] },
  "Team Dedalus/Bullethawk/ARES/Robotics/Garages": { id: "Q2NDE", coords: [28.61117, 77.039361] },
  "Training & Placement (TNP)": { id: "IzNzY", coords: [28.6085827, 77.0396048] },
  "Vice Chancellor's Residence": { id: "QwNzQ", coords: [28.6068045, 77.0362641] },
  "Volleyball": { id: "k4Mjk", coords: [28.6097551, 77.0403514] },
  "Water Softening Plant": { id: "YxNTU", coords: [28.6120343, 77.0345109] },
  "WaterCooler": { id: "Y2MzQ", coords: [28.611406, 77.039221] },
  "Central Workshop": { id: "workshop", coords: [28.6121480921617, 77.0389831335408] },
  "Amul Ground": { id: "amul", coords: [28.6117118137024, 77.0361200657036] },
  "Cricket Ground": { id: "cricket", coords: [28.6102250509268, 77.0411854923255] },
  "Lovers' Lane": { id: "lovers", coords: [28.6085285599395, 77.0383575255956] },
  "Library Parking": { id: "lib_parking", coords: [28.6104502363606, 77.0395420566474] },
  "Netaji Statue": { id: "netaji", coords: [28.6093092067537, 77.0350324212413] },
  "Nursery/Greenhouse": { id: "nursery", coords: [28.6049680440976, 77.0381431232191] },
  "Guitar Lane": { id: "guitar", coords: [28.6096204385875, 77.0361086403852] }
};

// Predefined paths from path.json for accurate routing
const campusPaths = {
  "Admin to Main Road": {
    id: "Q1NTk",
    coordinates: [[77.036569, 28.609566], [77.036583, 28.609527], [77.036637, 28.609353], [77.03668, 28.609221], [77.036707, 28.609144], [77.036711, 28.609104], [77.03665, 28.608976], [77.036668, 28.608904], [77.036612, 28.608741], [77.036572, 28.608616], [77.036518, 28.608456], [77.03657, 28.608181], [77.036553, 28.60806]]
  },
  "APJ to Admin": {
    id: "k2OTk",
    coordinates: [[77.037204, 28.611532], [77.037157, 28.611511], [77.036331, 28.610316], [77.036368, 28.610199], [77.036446, 28.609944]]
  },
  "APJ to Sports Complex": {
    id: "IyMDI",
    coordinates: [[77.038515, 28.610455], [77.038583, 28.610215], [77.038772, 28.610264], [77.038826, 28.61013], [77.038871, 28.609989], [77.039005, 28.610022], [77.039303, 28.610102], [77.039608, 28.610179], [77.039828, 28.610233], [77.040048, 28.610379]]
  },
  "Main Gate to APJ": {
    id: "Q3MTA",
    coordinates: [[77.035154, 28.609367], [77.035648, 28.609494], [77.035954, 28.609568], [77.036217, 28.60964], [77.036267, 28.609729], [77.036393, 28.609783], [77.036499, 28.60982], [77.036446, 28.609944]]
  },
  "Main Gate to TNP": {
    id: "Q5MTU",
    coordinates: [[77.039522932913, 28.6088079187281], [77.0395484, 28.6086369]]
  },
  "North Gate to APJ": {
    id: "k0MDM",
    coordinates: [[77.033622, 28.613172], [77.033874, 28.613238], [77.034191, 28.612282], [77.034738, 28.612211], [77.034888, 28.61204], [77.03535, 28.612], [77.0366, 28.611646], [77.037074, 28.611788]]
  },
  "SC to Safal": {
    id: "I1NjU",
    coordinates: [[77.036739, 28.61166], [77.036374, 28.612113]]
  },
  "Admin to Fountain": {
    id: "AxMjc",
    coordinates: [[77.0366725083746, 28.6097339665026], [77.0372776104106, 28.6098888234235], [77.0375420395647, 28.6099533177935], [77.0376203706597, 28.6099736251125], [77.0378907707402, 28.6100339581683]]
  },
  "Central Path": {
    id: "UxNzc",
    coordinates: [[77.035253, 28.608484], [77.035421, 28.608528], [77.035645, 28.607834], [77.036554, 28.60806], [77.037399, 28.60827], [77.038504, 28.608552], [77.039035, 28.608686], [77.039338, 28.608762], [77.039523, 28.608808], [77.03976, 28.608869], [77.040059, 28.608949], [77.040223, 28.608988]]
  }
};

// Route mapping - defines which paths connect which locations
const routeMapping = {
  "Main Gate": {
    "APJ Lecture Theatre": ["Main Gate to APJ"],
    "Training & Placement (TNP)": ["Main Gate to TNP"],
    "Admin Block/Main Audi (Second Floor)": ["Main Gate to APJ", "APJ to Admin"]
  },
  "APJ Lecture Theatre": {
    "Main Gate": ["Main Gate to APJ"],
    "Admin Block/Main Audi (Second Floor)": ["APJ to Admin"],
    "Sports / Yoga/ Witches' Lane": ["APJ to Sports Complex"]
  },
  "North Gate": {
    "APJ Lecture Theatre": ["North Gate to APJ"]
  },
  "Student Centre/SC/Canteen/Reading Room": {
    "Safal": ["SC to Safal"]
  },
  "Admin Block/Main Audi (Second Floor)": {
    "Fountain": ["Admin to Fountain"],
    "APJ Lecture Theatre": ["APJ to Admin"]
  }
};

// Function to calculate distance between two coordinates
const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};

// Function to find the best path between two locations using predefined paths
const findPathBetweenLocations = (startLocation: string, endLocation: string): number[][] | null => {
  const startData = (campusLocationData as any)[startLocation];
  const endData = (campusLocationData as any)[endLocation];
  
  if (!startData || !endData) return null;

  // Check if there's a direct route mapping
  if (routeMapping[startLocation as keyof typeof routeMapping]) {
    const destinations = routeMapping[startLocation as keyof typeof routeMapping];
    if (destinations[endLocation as keyof typeof destinations]) {
      const pathNames = destinations[endLocation as keyof typeof destinations];
      let fullPath: number[][] = [];
      
      // Combine multiple path segments if needed
      for (const pathName of pathNames) {
        const pathData = (campusPaths as any)[pathName];
        if (pathData) {
          // Convert [lon, lat] to [lat, lon] for Leaflet
          const convertedCoords = pathData.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
          fullPath = fullPath.concat(convertedCoords);
        }
      }
      
      if (fullPath.length > 0) {
        return fullPath;
      }
    }
  }

  // Check reverse route mapping
  if (routeMapping[endLocation as keyof typeof routeMapping]) {
    const destinations = routeMapping[endLocation as keyof typeof routeMapping];
    if (destinations[startLocation as keyof typeof destinations]) {
      const pathNames = destinations[startLocation as keyof typeof destinations];
      let fullPath: number[][] = [];
      
      for (const pathName of pathNames) {
        const pathData = (campusPaths as any)[pathName];
        if (pathData) {
          // Convert and reverse the path
          const convertedCoords = pathData.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
          fullPath = fullPath.concat(convertedCoords.reverse());
        }
      }
      
      if (fullPath.length > 0) {
        return fullPath;
      }
    }
  }

  // If no predefined path exists, find the closest matching path
  let bestPath: number[][] | null = null;
  let bestScore = Infinity;

  Object.values(campusPaths).forEach((path: any) => {
    const pathStart = [path.coordinates[0][1], path.coordinates[0][0]];
    const pathEnd = [path.coordinates[path.coordinates.length - 1][1], path.coordinates[path.coordinates.length - 1][0]];
    
    const distStartToPath = calculateDistance(startData.coords, pathStart as [number, number]);
    const distEndToPath = calculateDistance(endData.coords, pathEnd as [number, number]);
    
    const totalScore = distStartToPath + distEndToPath;
    
    if (totalScore < bestScore && totalScore < 500) { // Within 500 meters
      bestScore = totalScore;
      bestPath = path.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
    }
  });

  return bestPath;
};

function CampusMap() {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [routePath, setRoutePath] = useState<number[][] | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const fullScreenMapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const fullScreenMap = useRef<any>(null);
  const routeLayer = useRef<any>(null);

  // Load Leaflet
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).L) {
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(leafletCSS);

      const leafletJS = document.createElement('script');
      leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      leafletJS.onload = () => setLeafletLoaded(true);
      document.head.appendChild(leafletJS);
    } else if ((window as any).L) {
      setLeafletLoaded(true);
    }
  }, []);

  // Initialize main map
  useEffect(() => {
    if (leafletLoaded && mapRef.current && !map.current) {
      const L = (window as any).L;
      map.current = L.map(mapRef.current).setView([28.610347, 77.038992], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map.current);

      // Add all location markers
      Object.entries(campusLocationData).forEach(([name, data]) => {
        const marker = L.marker(data.coords)
          .addTo(map.current)
          .bindPopup(`
            <div style="font-family: Arial, sans-serif; padding: 8px; min-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: 600; font-size: 16px;">${name}</h3>
              <div style="margin: 4px 0; color: #6b7280; font-size: 12px;">
                <strong>📍 ID:</strong> ${data.id}
              </div>
              <div style="margin: 4px 0; color: #6b7280; font-size: 12px;">
                <strong>🌍 Coordinates:</strong> ${data.coords[0].toFixed(6)}, ${data.coords[1].toFixed(6)}
              </div>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <button 
                  onclick="window.setAsStart('${name}')" 
                  style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s; flex: 1;"
                >
                  📍 Set as Start
                </button>
                <button 
                  onclick="window.setAsEnd('${name}')" 
                  style="background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s; flex: 1;"
                >
                  🎯 Set as End
                </button>
              </div>
            </div>
          `);
      });

      // Global functions for popup buttons
      (window as any).setAsStart = (locationName: string) => {
        setStartLocation(locationName);
      };

      (window as any).setAsEnd = (locationName: string) => {
        setEndLocation(locationName);
      };
    }
  }, [leafletLoaded]);

  // Initialize full screen map
  useEffect(() => {
    if (leafletLoaded && fullScreenMapRef.current && !fullScreenMap.current && isFullScreen) {
      const L = (window as any).L;
      fullScreenMap.current = L.map(fullScreenMapRef.current).setView([28.610347, 77.038992], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(fullScreenMap.current);

      // Add all location markers
      Object.entries(campusLocationData).forEach(([name, data]) => {
        const marker = L.marker(data.coords)
          .addTo(fullScreenMap.current)
          .bindPopup(`
            <div style="font-family: Arial, sans-serif; padding: 8px; min-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: 600; font-size: 16px;">${name}</h3>
              <div style="margin: 4px 0; color: #6b7280; font-size: 12px;">
                <strong>📍 ID:</strong> ${data.id}
              </div>
              <div style="margin: 4px 0; color: #6b7280; font-size: 12px;">
                <strong>🌍 Coordinates:</strong> ${data.coords[0].toFixed(6)}, ${data.coords[1].toFixed(6)}
              </div>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <button 
                  onclick="window.setAsStart('${name}')" 
                  style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s; flex: 1;"
                >
                  📍 Set as Start
                </button>
                <button 
                  onclick="window.setAsEnd('${name}')" 
                  style="background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s; flex: 1;"
                >
                  🎯 Set as End
                </button>
              </div>
            </div>
          `);
      });
    }
  }, [leafletLoaded, isFullScreen]);

  // Handle route calculation
  useEffect(() => {
    if (startLocation && endLocation && leafletLoaded) {
      const path = findPathBetweenLocations(startLocation, endLocation);
      setRoutePath(path);
      
      // Draw route on map
      if (path && map.current) {
        const L = (window as any).L;
        
        // Remove existing route
        if (routeLayer.current) {
          map.current.removeLayer(routeLayer.current);
        }
        
        // Add new route
        routeLayer.current = L.polyline(path, {
          color: '#dc2626',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 5'
        }).addTo(map.current);
        
        // Fit map to show the route
        map.current.fitBounds(routeLayer.current.getBounds(), { padding: [20, 20] });
      }
      
      // Draw route on full screen map
      if (path && fullScreenMap.current) {
        const L = (window as any).L;
        
        // Remove existing route from full screen map
        fullScreenMap.current.eachLayer((layer: any) => {
          if (layer instanceof L.Polyline && layer !== routeLayer.current) {
            fullScreenMap.current.removeLayer(layer);
          }
        });
        
        // Add new route to full screen map
        const fullScreenRoute = L.polyline(path, {
          color: '#dc2626',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 5'
        }).addTo(fullScreenMap.current);
        
        // Fit full screen map to show the route
        fullScreenMap.current.fitBounds(fullScreenRoute.getBounds(), { padding: [20, 20] });
      }
    }
  }, [startLocation, endLocation, leafletLoaded]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = Object.keys(campusLocationData).filter(location =>
        location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredLocations([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSearchQuery(location);
    setShowSuggestions(false);
    
    if (map.current) {
      const coords = (campusLocationData as any)[location].coords;
      map.current.setView(coords, 18);
    }
  };

  const calculateRouteDistance = (path: number[][]): string => {
    if (!path || path.length < 2) return '0 m';
    
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += calculateDistance(
        [path[i][0], path[i][1]], 
        [path[i + 1][0], path[i + 1][1]]
      );
    }
    
    return totalDistance > 1000 
      ? `${(totalDistance / 1000).toFixed(2)} km`
      : `${Math.round(totalDistance)} m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Full Screen Map Modal */}
      {isFullScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="absolute inset-4 bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsFullScreen(false)}
                className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-700 hover:text-gray-900 p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-opacity-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div ref={fullScreenMapRef} className="w-full h-full" />
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            🗺️ Interactive Campus Map
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our beautiful campus with detailed location information and smart pathfinding using real walkway data
          </p>
        </motion.div>

        {/* Search and Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search for campus locations..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-white bg-opacity-80 backdrop-blur-sm"
              />
              
              {/* Search Suggestions */}
              {showSuggestions && filteredLocations.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white bg-opacity-95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {filteredLocations.map((location) => {
                    const data = (campusLocationData as any)[location];
                    return (
                      <div
                        key={location}
                        onClick={() => handleLocationSelect(location)}
                        className="p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                      >
                        <div className="font-medium text-gray-900">{location}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          📍 ID: {data.id} | 🌍 {data.coords[0].toFixed(4)}, {data.coords[1].toFixed(4)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">📍 Starting Point</label>
                  <select
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200"
                  >
                    <option value="">Select starting location...</option>
                    {Object.keys(campusLocationData).map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">🎯 Destination</label>
                  <select
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200"
                  >
                    <option value="">Select destination...</option>
                    {Object.keys(campusLocationData).map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Route Information */}
              {startLocation && endLocation && routePath && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-green-800 font-medium">
                        🛣️ Route found using campus walkways: {calculateRouteDistance(routePath)}
                      </span>
                      <div className="text-sm text-green-600 mt-1">
                        From <strong>{startLocation}</strong> to <strong>{endLocation}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setStartLocation('');
                        setEndLocation('');
                        setRoutePath(null);
                        if (routeLayer.current && map.current) {
                          map.current.removeLayer(routeLayer.current);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      ✕ Clear Route
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsFullScreen(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  🔍 View Full Screen Map
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div 
            ref={mapRef} 
            className="w-full h-96 rounded-xl overflow-hidden shadow-inner"
            style={{ minHeight: '400px' }}
          />
        </motion.div>

        {/* Location Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Object.keys(campusLocationData).length}
            </div>
            <div className="text-blue-800 font-medium">Campus Locations</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Object.keys(campusPaths).length}
            </div>
            <div className="text-green-800 font-medium">Real Walking Paths</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              🌟
            </div>
            <div className="text-purple-800 font-medium">Smart Pathfinding</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CampusMap;
