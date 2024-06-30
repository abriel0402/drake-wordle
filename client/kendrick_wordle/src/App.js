import "./App.css";
import SongSearch from "./components/SongSearch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col place-items-center min-h-screen bg-zinc-900">
      <Nav />
      <div style={{ marginTop: "-15%" }}>
        <SongSearch />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
