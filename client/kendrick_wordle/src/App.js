import "./App.css";
import SongSearch from "./components/SongSearch";

function App() {
  return (
    <div className="flex flex-col place-items-center min-h-screen bg-zinc-900">
      <h1 className="text-3xl font-bold underline">
        KDotle
      </h1>
      <div style={{ marginTop: "-15%" }}>
        <SongSearch />
      </div>
      <div>
       
      </div>
    </div>
  );
}

export default App;
