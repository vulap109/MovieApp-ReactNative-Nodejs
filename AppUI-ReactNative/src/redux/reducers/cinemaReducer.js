import { SEATS_RESERVATION, SEATS_SELECTED } from "../action/cinemaAction";

const initialState = {
  screen: {},
  movie: {},
};

const cinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEATS_RESERVATION:
      return {
        ...state,
        screen: action.payload.screen,
        movie: action.payload.movie,
      };
    case SEATS_SELECTED:
      return {
        ...state,
        screen: { ...state.screen, seatSelected: action.payload.seat },
      };

    default:
      return state;
  }
};

export default cinemaReducer;
