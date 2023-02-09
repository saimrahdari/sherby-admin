const couponReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE_COUPON_DATA": {
        const coupons = action.data.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        // console.log(categories[0].data.subcategories.data[0]);
        return {
          ...state,
          coupons: coupons,
        };
      }
  
      case "ADD_COUPON": {
        const updatedItems = [...state.couponcode, action.newItem];
        return {
          ...state,
          coupons: updatedItems,
        };
      }
      
  
  
  
      case "UPDATE_COUPON": {
        // console.log(state.categories);
        const itemIndex = state.coupons.findIndex(
          (item) => item.id === action.id
        );
        // console.log(itemIndex);
        const updatedItem = state.coupons[itemIndex];
        console.log(updatedItem)
        updatedItem.data.name = action.name;
        updatedItem.data.type = action.cattype;
  
        const updatedItems = state.coupons;
        updatedItems[itemIndex] = updatedItem;
        return {
          ...state,
          coupons: updatedItems,
        };
      }
  
      case "DELETE_COUPON": {
        const updateItems = state.coupons.filter(
          (element) => element.id !== action.id
        );
  
        return {
          ...state,
          coupons: updateItems,
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
  
  export default couponReducer;
  