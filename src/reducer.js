export const initialState = {
  basket: [],
  user: null,
};

//Selector
// their solution rather than my function: make a "selector"
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

// export  function makeKey(length) {
//     var result = "";
//     var characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   }


const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      // finds the index of the item that is passed in, rather than any product that has that id (which would delete multiple products at once)
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      // if index is 1 means that the product was found
      if (index >= 0) {
        // removes that one item from the basket - the first item with that id in the basket. just removes that first one.
        newBasket.splice(index, 1);

      } else {
        console.warn(
          `Cannot remove product (id: ${action.id}) as it is not in the basket.`
        )
      }
      return {
        ...state,
        basket: newBasket,
      }
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
};

export default reducer;
