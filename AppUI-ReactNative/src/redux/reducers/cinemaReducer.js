import {
  CLEAR_GO_BACK,
  MOVIE_BOOKING,
  POP_COMBO_SELECTED,
  SEATS_RESERVATION,
  SEATS_SELECTED,
  SELECTED_CINEMA,
  SELECTED_DATE,
  SET_GO_BACK,
  UPDATE_TOTAL,
} from "../action/cinemaAction";

const initialState = {
  screen: {},
  movie: {},
  totalData: {},
  setGoBack: false,
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
        popComboSelected: [],
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
    case MOVIE_BOOKING:
      return {
        ...state,
        movieBooking: action.payload.movieTitle,
      };
    case SELECTED_CINEMA:
      return {
        ...state,
        selectedCinema: action.payload.cinema,
      };
    case SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload.date,
      };
    case SET_GO_BACK:
      return {
        ...state,
        setGoBack: true,
      };
    case CLEAR_GO_BACK:
      return {
        ...state,
        setGoBack: false,
      };
    default:
      return state;
  }
};

export default cinemaReducer;
