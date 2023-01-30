import React, { createContext, useContext, useEffect, useReducer } from "react";
import { collection, getDocs, doc, deleteDoc,query,where } from "firebase/firestore";
import { db } from "../firebase";
import LoadingSpinner from "../components/LoadingSpinner";
import combineReducers from "react-combine-reducers";
import locationReducer from "./locationReducer";
import stylistsReducer from "./stylistsReducer";
import categoriesReducer from "./categoriesReducer";
import adminReducer from "./adminReducer";
import pendingBookingsReducer from "./pendingBookingsReducer";
import upcomingBookingsReducer from "./upcomingBookingsReducer";
import completedBookingsReducer from "./completedBookingsReducer";
import { useState } from "react";
const initialAdminState = {
  adminData: {},
};

const initialStateLocations = {
  locations: [],
};

const initialStateStylists = {
  stylists: [],
};

const initialCategories = {
  categories: [],
};

const initialStatePendingBooking = {
  pending_bookings: [],
};

const initialStateUpcomingBooking = {
  upcoming_bookings: [],
};
const initialStateCompletedBooking = {
  completed_bookings: [],
};


export const GlobalContext = createContext();

const [rootReducer, initialState] = combineReducers({
  adminState: [adminReducer, initialAdminState],
  locationsState: [locationReducer, initialStateLocations],
  stylistsState: [stylistsReducer, initialStateStylists],
  categoriesState: [categoriesReducer, initialCategories],
  pendingBookingsState: [pendingBookingsReducer, initialStatePendingBooking],
  upcomingBookingsState: [upcomingBookingsReducer, initialStateUpcomingBooking],
  completedBookingsState: [completedBookingsReducer, initialStateCompletedBooking],

});

export const GlobalProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //Actions.
  useEffect(() => {
    setIsLoading(true)
    const initializeAdminData = async () => {
    
      console.log("Loading...");
      const adminData = await getDocs(collection(db, "admin"));
      console.log("Loaded");
      dispatch({
        type: "INITIALIZE_ADMIN_DATA",
        data: adminData,
      });
     
    };

    const initializeData = async () => {
      setIsLoading(true);
      console.log("Loading...");
      const locationData = await getDocs(collection(db, "location"));
      const stylistsData = await getDocs(collection(db, "stylist"));
      const categoriesData = await getDocs(collection(db, "category"));
      const qpending = query(collection(db, "upcoming_bookings"), where("isApprroved", "==", 0));
      const pendingBookingsData = await getDocs(qpending);
      const qupcomingbooking = query(collection(db, "upcoming_bookings"), where("isApprroved", "==", 1));
      const upcomingBookingsData = await getDocs(qupcomingbooking);
      const qcompletedbooking = query(collection(db, "upcoming_bookings"), where("isApprroved", "==", 2));
      const completedBookingsData = await getDocs(qcompletedbooking);
      console.log("Loaded");
      setIsLoading(false);
      // console.log(setIsLoading(false));
      dispatch({
        type: "INITIALIZE_LOCATION_DATA",
        data: locationData,
      });
      dispatch({
        type: "INITIALIZE_STYLIST_DATA",
        data: stylistsData,
      });
      dispatch({
        type: "INITIALIZE_CATEGORIES_DATA",
        data: categoriesData,
      });
      dispatch({
        type: "INITIALIZE_PENDING_BOOKINGS_DATA",
        data: pendingBookingsData,
      });
      dispatch({
        type: "INITIALIZE_UPCOMING_BOOKINGS_DATA",
        data: upcomingBookingsData,
      });
      dispatch({
        type: "INITIALIZE_COMPLETED_BOOKINGS_DATA",
        data: completedBookingsData,
      });
    };
   
    
    initializeAdminData();
    initializeData();
  }, []);

  const addLocation = (item) => {
    dispatch({
      type: "ADD_LOCATION",
      newItem: item,
    });
  };

  const addStylist = (item) => {
    dispatch({
      type: "ADD_STYLIST",
      newItem: item,
    });
  };

  const updateStylist = (id, name) => {
    dispatch({
      type: "UPDATE_STYLIST",
      id: id,
      name: name,
    });
  };

  const deleteStylist = (id) => {
    dispatch({
      type: "DELETE_STYLIST",
      id: id,
    });
  };

  const addCategory = (item) => {
    dispatch({
      type: "ADD_CATEGORY",
      newItem: item,
    });
  };

  const addSubcategory = ( item) => {
    dispatch({
      type: "ADD_SUBCATEGORY",
      newItem: item,
    });
  };

  const updatecategory = (id, name,cattype) => {
    dispatch({
      type: "UPDATE_CATEGORY",
      id: id,
      name: name,
      cattype:cattype
    });
  };

  const deletecategory = (id) => {
    dispatch({
      type: "DELETE_CATEGORY",
      id: id,
    });
  };
  const updatesubcategory = (id, name,price) => {
    dispatch({
      type: "UPDATE_SUBCATEGORY",
      id: id,
      name: name,
      price:price
    });
  };

  const deletesubcategory = (id) => {
    dispatch({
      type: "DELETE_SUBCATEGORY",
      id: id,
    });
  };
  return (
  <>
   
    <GlobalContext.Provider
      value={{
        adminCredentials: state.adminState.adminData,
        locations: state.locationsState.locations,
        stylists: state.stylistsState.stylists,
        categories: state.categoriesState.categories,
        pendingBookings: state.pendingBookingsState.pending_bookings,
        upcomingBookings: state.upcomingBookingsState.upcoming_bookings,
        completedBookings: state.completedBookingsState.completed_bookings,
        addLocation,
        addStylist,
        updateStylist,
        deleteStylist,
        addCategory,
        addSubcategory,
        updatecategory,
        deletecategory,
        updatesubcategory,
        deletesubcategory,
       
      }}
   
    >
      {props.children}
      {/* {isLoading ? <LoadingSpinner style={{itemsAlign:"center"}}/> : GlobalProvider} */}
    </GlobalContext.Provider>
    {isLoading ? <LoadingSpinner style={{itemsAlign:"center"}}/> : GlobalProvider}
    </>
  );
};

export const useGlobalState = () => {
  return(  
    
    useContext(GlobalContext) 
  )
};
