import {
  POP_COMBO_SELECTED,
  SEATS_RESERVATION,
  SEATS_SELECTED,
  UPDATE_TOTAL,
} from "../action/cinemaAction";

const initialState = {
  screen: {},
  movie: {},
  totalData: {},
};

const cinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEATS_RESERVATION:
      return {
        ...state,
        screen: action.payload.screen,
        movie: action.payload.movie,
        totalData: {
          name: action.payload.movie.title,
          sub: action.payload.screen.type,
          total: 0,
          detail: "",
        },
      };
    case SEATS_SELECTED:
      return {
        ...state,
        screen: { ...state.screen, seatSelected: action.payload.seat },
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        totalData: action.payload.total,
      };
    case POP_COMBO_SELECTED:
      return {
        ...state,
        popComboSelected: action.payload.combo,
      };

    default:
      return state;
  }
};

export default cinemaReducer;
