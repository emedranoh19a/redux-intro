//initial state.
const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
//reducer function
export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}
//action creators
export const createCustomer = (fullName, nationalID) => ({
  type: "customer/createCustomer",
  payload: { fullName, nationalID, createdAt: new Date().toISOString() },
});

export const updateName = (fullName) => ({
  type: "customer/updateName",
  payload: fullName,
});
