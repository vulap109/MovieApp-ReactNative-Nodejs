import "react-native-gesture-handler";
import { Provider } from "react-redux";
import "expo-dev-client";
import store from "./src/redux/store";
import AppNavigation from "./src/navigation/appNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
