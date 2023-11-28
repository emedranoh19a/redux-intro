//1. initial state
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
//2. reducer function
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //...pass
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance - action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };
    default:
      return state; //in redux, we return the original state, instead of throwing an error.
  }
}

//3. action creators
export const deposit = (amount) => ({
  type: "account/deposit",
  payload: amount,
});
export const withdraw = (amount) => ({
  type: "account/withdraw",
  payload: amount,
});
export const requestLoan = (amount, purpose) => ({
  type: "account/requestLoan",
  payload: { amount, purpose },
});
export const payloan = () => ({ type: "account/payLoan" });
