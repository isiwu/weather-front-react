 
const initialState = {
  city: '',
  todayForecast: {},
  dailyForecasts: [],
  loading: false,
  serverError: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_PENDING":
    case "LOADING_COMPLETE":
      return {
        ...state,
        loading: action.payload.loading,
      }
    case "GET_FORECASTS":
      let inputWords = action.city.split(" ");
      inputWords = inputWords.map(
        (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`
      );

      return {
        ...state,
        city: inputWords.join(" "),
        todayForecast: action.todayForecast,
        dailyForecasts: action.dailyForecasts,
      };
    case "SERVER_ERROR":
      return {
        ...state,
        serverError: action.payload.serverError,
      }
      
    default:
      return state;
  }
}

export default reducer;