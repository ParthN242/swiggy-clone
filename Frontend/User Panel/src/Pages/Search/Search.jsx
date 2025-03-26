import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import ShowCaseFood from "../../Components/ShowCaseFood/ShowCaseFood";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    if (query.length === 0) {
      setQueryResult([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const { data } = await axios.post(`/search?s=${query}`);
        setQueryResult(data.searchResult);
      } catch (error) {
        console.log("error: ", error);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <div className="min-h-[100vh] w-full">
      <div className="max-w-4xl px-10  mx-auto mt-[50px] w-full h-[500px]">
        {/* Input Search */}
        <div className="w-full px-3 py-2 border border-gray-400 rounded-lg flex items-center gap-5">
          <input
            type="text"
            placeholder="Search for restaurants and foods"
            className="text-lg w-full bg-transparent outline-none flex-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div>
            {query.length > 0 ? (
              <IoMdClose
                className="text-xl cursor-pointer"
                onClick={() => setQuery("")}
              />
            ) : (
              <IoSearch className="text-xl" onClick={() => setQuery("")} />
            )}
          </div>
        </div>
        {/* Query Result */}
        <div className="my-8 flex flex-col gap-5">
          {queryResult.length > 0 &&
            queryResult.map((result) => (
              <Link
                to={`/restaurant/${
                  result.type === "restaurant" ? result._id : result.restaurant
                }`}
                key={result._id}
                className=" max-w-full w-full flex gap-4 hover:bg-gray-100 cursor-pointer py-2 px-1 rounded-lg"
              >
                <div className="relative">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="h-full w-12"
                  />
                </div>
                <div className="">
                  <h6 className=" text-lg">{result.name}</h6>
                  <p className="text-sm text-gray-800">{result.type}</p>
                </div>
              </Link>
            ))}
        </div>
        {/* Popular Cuisines */}
        <div>
          <ShowCaseFood />
        </div>
      </div>
    </div>
  );
};

export default Search;
