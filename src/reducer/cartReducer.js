// const cartReducer = (state, action) => {
//   if (action.type === "ADD_TO_CART") {
//     let { id, color, amount, product } = action.payload;
//     // console.log(
//     //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
//     //   product
//     // );

//     let cartProduct;

//     cartProduct = {
//       id: id + color,
//       name: product.name,
//       color,
//       amount,
//       image: product.image[0].url,
//       price: product.price,
//       max: product.stock,
//     };

//     return {
//       ...state,
//       cart: [...state.cart, cartProduct],
//     };
//   }

//   if (action.type === "REMOVE_ITEM") {
//     let updatedCart = state.cart.filter(
//       (curItem) => curItem.id !== action.payload
//     );
//     return {
//       ...state,
//       cart: updatedCart,
//     };
//   }

//   return state;
// };




// export default cartReducer;


const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, color, amount, product } = action.payload;

      const ExistingCart = state.cart.find((cur) => {
        return cur.id === id + color;
      });
      console.log(ExistingCart, "Existing cart");
      if (ExistingCart) {
        let updateProduct = state.cart.map((cur) => {
          if (cur.id === id + color) {
            let newAmount = cur.amount + amount;

            if (newAmount >= cur.max) {
              newAmount = cur.max;
            }
            return {
              ...cur,
              amount: newAmount,
            };
          } else {
            return cur;
          }
        });

        return {
          ...state,
          cart: updateProduct,
        };
      } else {
        const cartProduct = {
          id: id + color,
          color: color,
          amount: amount,
          img: product.image[0].url,
          category: product.category,
          name: product.name,
          price: product.price,
          max: product.stock,
        };

        console.log(cartProduct, "cart Product");
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    case "SET_INCREMENT":
      let updateProductsIncrement = state.cart.map((cur) => {
        if (cur.id === action.payload) {
          let increment = cur.amount + 1;
          if (increment >= cur.max) {
            increment = cur.max;
          }
          return {
            ...cur,
            amount: increment,
          };
        } else {
          return cur;
        }
      });

      return {
        ...state,
        cart: updateProductsIncrement,
      };

    case "SET_DECREMENT":
      let updateProductsDecrement = state.cart.map((cur) => {
        if (cur.id === action.payload) {
          let decrement = cur.amount - 1;
          if (decrement <= 0) {
            decrement = 1;
          }
          return {
            ...cur,
            amount: decrement,
          };
        } else {
          return cur;
        }
      });

      return {
        ...state,
        cart: updateProductsDecrement,
      };

    case "REMOVE_ITEM":
      let updateCart = state.cart.filter((cur) => {
        return cur.id !== action.payload;
      });

      return {
        ...state,
        cart: updateCart,
      };

    case "REMOVE_ALL_CART":
      return {
        ...state,
        cart: [],
      };


      case "CART_ITEM_PRICE_TOTAL":
        let { total_item, total_price } = state.cart.reduce(
          (accum, curElem) => {
            let { price, amount } = curElem;
    
            accum.total_item += amount;
            accum.total_price += price * amount;
    
            return accum;
          },
          {
            total_item: 0,
            total_price: 0,
          }
        );
        return {
          ...state,
          total_item,
          total_price,
        };
    default:
      return state;
  }
};

export default cartReducer;
