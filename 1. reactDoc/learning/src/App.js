let guest = 0;

function Cup({ guest }) {
  return <h1>Tea Cup for guest#{guest}</h1>;
}

function App() {
  return (
    <div className='App'>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </div>
  );
}

export default App;
