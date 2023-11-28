//1. initial state
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
//2. reducer function
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state; //in redux, we return the original state, instead of throwing an error.
  }
}

//3. action creators
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates["USD"];
    //return dispatched action
    return dispatch({ type: "account/deposit", payload: converted });
  };
}
export const withdraw = (amount) => ({
  type: "account/withdraw",
  payload: amount,
});
export const requestLoan = (amount, purpose) => ({
  type: "account/requestLoan",
  payload: { amount, purpose },
});
export const payloan = () => ({ type: "account/payLoan" });
