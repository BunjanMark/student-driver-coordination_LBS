// src/store/zustandStore.js
import { create } from "zustand";

const useZustandStore = create((set) => ({
  location: null,
  locationUpdates: [],
  userAddress: "",
  selectedLayer: "Terrain",
  layerMenuVisible: false,
  darkMode: (value) => set({ adarkMode: value }), // You might need to adjust this based on your context or preferences
  origin: null,
  destination: null,
  originPassenger: null,
  originDriver: null,
  showDirections: false,
  showPuvDirections: false,
  distance: 0,
  duration: 0,
  isSearchContainerVisible: false,
  isSearchContainerRouteVisible: false,
  isSearchContainerPuvVisible: false,
  active: false,
  driverActive: false,
  mapRef: null,
  setActive: (value) => set({ active: value }),
  setOrigin: (value) => set({ origin: value }),
  setDestination: (value) => set({ destination: value }),
  setOriginPassenger: (value) => set({ originPassenger: value }),
  setOriginDriver: (value) => set({ originDriver: value }),
  setShowDirections: (value) => set({ showDirections: value }),
  setShowPuvDirections: (value) => set({ showPuvDirections: value }),
  setDistance: (value) => set({ distance: value }),
  setDuration: (value) => set({ duration: value }),
  setIsSearchContainerVisible: (value) =>
    set({ isSearchContainerVisible: value }),
  setIsSearchContainerRouteVisible: (value) =>
    set({ isSearchContainerRouteVisible: value }),
  setIsSearchContainerPuvVisible: (value) =>
    set({ isSearchContainerPuvVisible: value }),
  setMapRef: (value) => set({ mapRef: value }),
  // Add other state properties and actions as needed
}));

export default useZustandStore;
