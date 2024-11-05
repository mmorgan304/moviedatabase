import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import {MovieDetail} from "./pages/MovieDetail.jsx";


function App() {
    return (
        //turn search into its own route
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/movies/moviedetail/:id" element={<MovieDetail/>} />
        </Routes>
    )
}

export default App;
