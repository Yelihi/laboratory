import "./styles.css";

export default function Layout() {
  return (
    <>
      <header>Header</header>
      <div className='main-container'>
        <nav>Navigation</nav>
        <main>Main</main>
        <aside>Sidebar</aside>
      </div>
      <footer>Footer</footer>
    </>
  );
}
