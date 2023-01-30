const adminReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_ADMIN_DATA": {
      const admin = action.data.docs[0].data();
      return {
        ...state,
        adminData: {
          email: admin.email,
          password: admin.password,
          id: action.data.docs[0].id,
          picture:admin.picture
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default adminReducer;
