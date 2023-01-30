

const pendingBookingsReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_PENDING_BOOKINGS_DATA": {
      const bookings = action.data.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      return {
        ...state,
        pending_bookings: bookings,
      };
    }
    default: {
      return state;
    }
  }
};

export default pendingBookingsReducer;
