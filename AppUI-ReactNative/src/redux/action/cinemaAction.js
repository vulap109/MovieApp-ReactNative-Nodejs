export const SEATS_RESERVATION = "SEATS_RESERVATION";
export const SEATS_SELECTED = "SEATS_SELECTED";
export const UPDATE_TOTAL = "UPDATE_TOTAL";
export const POP_COMBO_SELECTED = "POP_COMBO_SELECTED";
export const MOVIE_BOOKING = "MOVIE_BOOKING";
export const SELECTED_CINEMA = "SELECTED_CINEMA";
export const SELECTED_DATE = "SELECTED_DATE";

export const SeatsReservation = (navigation, screen, movie) => {
  return async (dispatch) => {
    try {
      navigation.navigate("SeatReservation");
      dispatch({
        type: SEATS_RESERVATION,
        payload: { screen, movie },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const SeatsSelected = (seat) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEATS_SELECTED,
        payload: { seat },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const UpdateTotalData = (total) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TOTAL,
        payload: { total },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const PopComboSelected = (combo) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POP_COMBO_SELECTED,
        payload: { combo },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const movieBooking = (movieTitle) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: MOVIE_BOOKING,
        payload: { movieTitle },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const selectedCinema = (cinema) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SELECTED_CINEMA,
        payload: { cinema },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const selectedDate = (date) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SELECTED_DATE,
        payload: { date },
      });
    } catch (error) {
      throw error;
    }
  };
};
