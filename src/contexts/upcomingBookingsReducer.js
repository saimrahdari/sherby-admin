const upcomingBookingsReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_UPCOMING_BOOKINGS_DATA": {
      const bookings = action.data.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      return {
        ...state,
        upcoming_bookings: bookings,
      };
    }
    default: {
      return state;
    }
  }
};

export default upcomingBookingsReducer;
