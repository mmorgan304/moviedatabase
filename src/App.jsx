import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import {MovieDetail} from "./pages/MovieDetail.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";


function App() {
    return (
        //turn search into its own route
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/movies/moviedetail/:id" element={<MovieDetail/>} />
            <Route path="/movies/searchresults" element={<SearchResults />} />
            <Route path="/movies/bookmarklist" element={<Bookmarks />} />
        </Routes>
    )
}

export default App;
