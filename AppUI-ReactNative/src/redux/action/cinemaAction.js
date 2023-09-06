export const SEATS_RESERVATION = "SEATS_RESERVATION";
export const SEATS_SELECTED = "SEATS_SELECTED";

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
