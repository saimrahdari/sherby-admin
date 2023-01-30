const categoriesReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_CATEGORIES_DATA": {
      const categories = action.data.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      // console.log(categories[0].data.subcategories.data[0]);
      return {
        ...state,
        categories: categories,
      };
    }

    case "ADD_CATEGORY": {
      const updatedItems = [...state.categories, action.newItem];
      return {
        ...state,
        categories: updatedItems,
      };
    }
    case "ADD_SUBCATEGORY": {
      const updatedItems = [...state.categories, action.newItem];
      return {
        ...state,
        categories: updatedItems,
      };
    }
    



    case "UPDATE_CATEGORY": {
      // console.log(state.categories);
      const itemIndex = state.categories.findIndex(
        (item) => item.id === action.id
      );
      // console.log(itemIndex);
      const updatedItem = state.categories[itemIndex];
      console.log(updatedItem)
      updatedItem.data.name = action.name;
      updatedItem.data.type = action.cattype;

      const updatedItems = state.categories;
      updatedItems[itemIndex] = updatedItem;
      return {
        ...state,
        categories: updatedItems,
      };
    }

    case "DELETE_CATEGORY": {
      const updateItems = state.categories.filter(
        (element) => element.id !== action.id
      );

      return {
        ...state,
        categories: updateItems,
      };
    }
    case "DELETE_CATEGORY": {
      const updateItems = state.categories.filter(
        (element) => element.id !== action.id
      );

      return {
        ...state,
        categories: updateItems,
      };
    }
    // case "ADD_SUBCATEGORY": {
    //   const categoryIndex = state.categories.findIndex(
    //     (ele) => ele.id === action.id
    //   );

    //   action.newItem.id =
    //     state.categories.subcategories[
    //       state.categories.subcategories.length - 1
    //     ].id + 1;

    //   const newSubcategories = [
    //     ...state.categories[categoryIndex].subcategories,
    //     action.newItem,
    //   ];

    //   const updatedItems = state.categories;
    //   updatedItems.categories[categoryIndex] = newSubcategories;
    //   return {
    //     ...state,
    //     categories: updatedItems,
    //   };
    // }

    default: {
      return state;
    }
  }
};

export default categoriesReducer;
