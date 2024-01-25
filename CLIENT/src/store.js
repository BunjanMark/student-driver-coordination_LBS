import {create} from 'zustand';

const useStore = create((set) => ({
  locationUpdates: [],
  selectedOrigin: null,
  selectedDestination: null,
  setLocationUpdates: (updates) => set({ locationUpdates: updates }),
  setSelectedOrigin: (origin) => set({ selectedOrigin: origin }),
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),
}));

export default useStore;
