const stylistsReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_STYLIST_DATA": {
      const stylists = action.data.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      return {
        ...state,
        stylists: stylists,
      };
    }

    case "ADD_STYLIST": {
      const updatedItems = [...state.stylists, action.newItem];
      return {
        ...state,
        stylists: updatedItems,
      };
    }

    case "UPDATE_STYLIST": {
      // console.log(state.stylists);
      const itemIndex = state.stylists.findIndex(
        (item) => item.id === action.id
      );
      // console.log(itemIndex);
      const updatedItem = state.stylists[itemIndex];
      updatedItem.data.name = action.name;
      updatedItem.data.location = action.location || "";

      const updatedItems = state.stylists;
      updatedItems[itemIndex] = updatedItem;
      return {
        ...state,
        stylists: updatedItems,
      };
    }

    case "DELETE_STYLIST": {
      const updateItems = state.stylists.filter(
        (element) => element.id !== action.id
      );

      return {
        ...state,
        stylists: updateItems,
      };
    }

    default: {
      return state;
    }
  }
};

export default stylistsReducer;
