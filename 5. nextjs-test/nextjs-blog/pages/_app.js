// top level React component that wraps all pages in application
// and setting globals.css
import "../styles/globals.css";
import Layout from "../components/layout";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
