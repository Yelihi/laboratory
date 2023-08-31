// top level React component that wraps all pages in application
// and setting globals.css
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
