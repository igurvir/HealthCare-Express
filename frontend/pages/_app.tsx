import { Provider } from "react-redux";
import { store } from "../store/store"; // Adjust the path if needed
import Navbar from "../components/Navbar";


function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <Provider store={store}>
          <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
