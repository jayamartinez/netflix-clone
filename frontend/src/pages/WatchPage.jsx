import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useContentStore } from "../store/content";
import axios from "axios";
import { Navbar, WatchPageSkeleton } from "../components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";


const WatchPage = () => {
    const { id } = useParams();
    
    const [trailers, setTrailers] = useState([]);
    const [currentTrailer, setCurrentTrailer] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);
    const {contentType} = useContentStore();

    const sliderRef = useRef(null);

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(res.data.trailers)
            } catch (error) {
                if(error.message.includes("404")) {
                    console.log("No trailers found");
                    setTrailers([]);
                }
            }
            
        }

        getTrailers();
    }, [contentType, id]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar)
            } catch (error) {
                if(error.message.includes("404")) {
                    console.log("No Similar Content found");
                    setSimilarContent([]);
                }
            }
            
        }

        getSimilarContent();
    }, [contentType, id]);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.content)
            } catch (error) {
                if(error.message.includes("404")) {
                    console.log("No Similar Content found");
                    setContent(null);
                }
            } finally {
                setLoading(false);
            }
        }

        getContentDetails();
    }, [contentType, id]);

    if(loading) {
        return(
            <div className="min-h-screen bg-black p-10">
                <WatchPageSkeleton />
            </div>
        )
    }

    if(!content) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-3xl text-center">
                        No content found
                    </h2>
                </div>
            </div>
        )
    }



    // console.log("trailers: ", trailers)
    // console.log("similar content: ", similarContent)
    // console.log("content details: ", contentDetails)

    const handleNextTrailer = () => {
        if(currentTrailer < trailers.length - 1) {
            setCurrentTrailer((currentTrailer) => currentTrailer + 1);
        }
    }

    const handlePrevTrailer = () => {
        if(currentTrailer > 0) {
            setCurrentTrailer((currentTrailer) => currentTrailer - 1);
        }
    }

    const scrollLeft = () => {
        if(sliderRef.current) {
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior: "smooth"});
        }
    }

    const scrollRight = () => {
        if(sliderRef.current) {
            sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth, behavior: "smooth"});
        }
    }
    
    return (
    <div className="bg-black min-h-screen text-white">
        <div className="mx-auto container px-4 py-8 h-full">
            <Navbar />
            {trailers.length  > 0 && (
                <div className="flex justify-between items-center mb-4">
                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white
                    py-2 px-4 rounded ${currentTrailer === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                     `}
                     disabled={currentTrailer === 0}
                     onClick={handlePrevTrailer}
                     >
                        <ChevronLeft size={24} />
                    </button>

                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white
                    py-2 px-4 rounded ${currentTrailer === trailers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}
                     `}
                     disabled={currentTrailer === trailers.length - 1}
                     onClick={handleNextTrailer}
                     >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                {trailers.length > 0 && (
                     <ReactPlayer 
                        controls={true}
                        width={"100%"}
                        height={"70%"}
                        className="mx-auto overflow-hidden rounded-lg"
                        url={`https://www.youtube.com/watch?v=${trailers[currentTrailer].key}`}
                    />

                )}

                {trailers?.length === 0 && (
                    <h2 className="text-xl text-center mt-5">
                        No trailers found for {" "}
                        <span className="font-bold text-red-600">{content?.title || content?.name}</span>
                    </h2>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-20
            max-w-6xl mx-auto">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-5xl font-bold text-balance">
                        {content?.title || content?.name}
                    </h2>

                    <p className="mt-2 text-lg">
                        {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
                        {content?.adult ? (
                            <span className="text-red-600">18+</span>
                        ) : (
                            <span className="text-green-600">PG-13</span>
                        )}{" "}
                    </p>

                    <p className="mt-4 text-lg">{content?.overview}</p>
                </div>
                <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt="Poster image"
                className="max-h-[600px] rounded-md" />
            </div>

            {similarContent.length > 0 && (
                <div className="mt-12 max-w-5xl mx-auto relative">
                    <h3 className="text-3xl font-bold mb-4">
                        Similar Movies/Tv Shows
                    </h3>

                    <div className="flex overflow-x-scroll scrollbar-hide gap-4
                    pb-4 group" ref={sliderRef}>
                        {similarContent.map((content) => (
                            content.poster_path === null ?  null : (
                                <Link key={content.id} to={`/watch/${content.id}`} className="w-52 flex-none">
                                    <img src={SMALL_IMG_BASE_URL + content?.poster_path} alt="Poster image"
                                    className="w-full h-auto rounded-md" />

                                    <h4 className="mt-2 text-lg font-semibold">
                                        {content.title || content.name}
                                    </h4>
                                </Link>
                            )
                        ))}

                    <button className="absolute top-1/2 -translate-y-1/2 left-2
                    flex items-center justify-center size-10 rounded-full bg-black
                    bg-opacity-50 hover:bg-opacity-75 text-white z-10
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={scrollLeft}>
                        <ChevronLeft size={24} />
                    </button>

                    <button className="absolute top-1/2 -translate-y-1/2 right-2
                    flex items-center justify-center size-10 rounded-full bg-black
                    bg-opacity-50 hover:bg-opacity-75 text-white z-10
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={scrollRight}>
                        <ChevronRight size={24} />
                    </button>

                    </div>
                </div>
            )}


        </div>
    </div>
  )
}

export default WatchPage
