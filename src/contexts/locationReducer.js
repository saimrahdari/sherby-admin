const locationReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_LOCATION_DATA": {
      const locations = action.data.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      return {
        ...state,
        locations: locations,
      };
    }

    default: {
      return state;
    }
  }
};

export default locationReducer;
