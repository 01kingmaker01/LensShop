import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "redux/constant";

export const itemReducer = (state = [], { type, itemPayload }) => {
  switch (type) {
    case GET_ITEMS:
      return [ ...itemPayload];

    case ADD_ITEM:
      return [...state, itemPayload];

    case DELETE_ITEM:
      return [...state, state.filter((item) => item._id !== itemPayload)];

    case UPDATE_ITEM:
      const { id, data } = itemPayload;
      return [
        ...state,
        state.map((item) => (item._id === id ? (item = data) : item)),
      ];

    default:
      return state;
  }
};
