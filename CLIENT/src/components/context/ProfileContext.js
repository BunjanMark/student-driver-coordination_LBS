import { createContext, useContext, useReducer } from "react";

const ProfileContext = createContext();

const initialState = {
  profile: {
    username: "",
    profilePicture: "",
  },
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
