import "../styles/globals.css";
import "../components/clickerElements/Animations.css";
import "../styles/particles.css";
import "../styles/linedivs.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
