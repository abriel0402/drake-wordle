import "./App.css";
import SongSearch from "./components/SongSearch";
import Nav from "./components/Nav";
function App() {
  return (
    <div className="flex flex-col place-items-center min-h-screen bg-zinc-900">
      <Nav />
      <div style={{ marginTop: "-15%" }}>
        <SongSearch />
      </div>
      <div>
       
      </div>
    </div>
  );
}

export default App;
