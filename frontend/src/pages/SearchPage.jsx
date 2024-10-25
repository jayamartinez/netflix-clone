import { useState } from "react";
import { Navbar } from "../components";
import { useContentStore } from "../store/content";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

const SearchPage = () => {

    const [activeTab, setActiveTab] = useState('movie');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const {setContentType} = useContentStore();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        tab === "movie" ? setContentType("movie") : setContentType("tv"); 
        setSearchResults([]);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res =  await axios.get(`/api/v1/search/${activeTab}/${searchQuery}`);
            setSearchResults(res.data.content);
        } catch (error) {
            if(error.response.status === 404) {
                toast.error("No results found. Make sure to search under the correct tab.");
            } else toast.error("An error occurred. Please try again later.");
        }
    }
    
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-7">
                <div className="flex justify-center gap-3 mb-4">
                    <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"}
                    hover:bg-red-700`}
                    onClick={() => handleTabClick("movie")}>
                        Movies
                    </button>
                    <button className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"}
                    hover:bg-red-700`}
                    onClick={() => handleTabClick("tv")}
                    >
                        TV Shows
                    </button>
                </div>

                <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
                onSubmit={handleSearch}>
                    <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={"Search for a " + activeTab}
                    className="w-full p-2 rounded bg-gray-800 text-white" />

                    <button className="bg-red-600 hover:bg-red-700 text-white
                    p-2 rounded">
                        <Search className="size-6" />
                    </button>

                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchResults.map((result) => (
                        !result.poster_path && !result.profile_path ? null : (
                            <div key={result.id} className="bg-gray-800 p-4 rounded">
                            <Link to={`/watch/${result.id}`} onClick={() => {setContentType(activeTab)} }>
                                <img 
                                src={ORIGINAL_IMG_BASE_URL + (result.poster_path || result.profile_path)}
                                alt={result.title || result.name} 
                                />
                                <h2 className="mt-2 text-xl font-bold">
                                {result.title || result.name}
                                </h2>
                            </Link>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchPage
