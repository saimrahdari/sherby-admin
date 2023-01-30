const completedBookingsReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE_COMPLETED_BOOKINGS_DATA": {
        const bookings = action.data.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        return {
          ...state,
          completed_bookings: bookings,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default completedBookingsReducer;
  