type State = {
  category: string;
  products: Array<number>;
};

export enum Actions {
  SET_CATEGORY = "SET_CATEGORY",
  SET_PRODUCTS = "SET_PRODUCTS",
  CLEAR = "CLEAR",
}

type Action =
  | {
      type: Actions.SET_CATEGORY;
      payload: string;
    }
  | {
      type: Actions.SET_PRODUCTS;
      payload: Array<number>;
    }
  | {
      type: Actions.CLEAR;
    };

export const filterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case Actions.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case Actions.CLEAR:
      return {
        category: "",
        products: [],
      };
  }
};
