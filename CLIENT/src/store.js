import {create} from 'zustand';

const useStore = create((set) => ({
  locationUpdates: [],
  selectedOrigin: null,
  selectedDestination: null,
  setLocationUpdates: (updates) => set({ locationUpdates: updates }),
  setSelectedOrigin: (origin) => set({ selectedOrigin: origin }),
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),

  active: false,
  distance: 0,
  duration: 0,

  // Method to update details
  setDetails: (active, distance, duration) =>
    set((state) => ({ active, distance, duration })),
}));

export default useStore;
