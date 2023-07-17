import axios from "axios";
import { ArrowBigLeft, ArrowBigRight, ChevronDown } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../Styles/pagination.css";

interface APIData {
  status: string;
  type: string;
  serial: string;
  land_landings: number;
  water_landings: number;
}

const SectionTwo = () => {
  const [mainSelect, setMainSelect] = useState("status");
  const [secondSelect, setSecondSelect] = useState("active");
  const [data, setData] = useState<APIData[]>([]);

  // page no.
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

  // get data
  const getAllCapsules = async (changePage?: number) => {
    await axios
      .post(`https://api.spacexdata.com/v4/capsules/query`, {
        query:
          mainSelect === "status"
            ? { status: secondSelect }
            : { type: secondSelect }, // else type
        options: {
          page: changePage ?? page,
          limit: 8,
        },
      })
      .then((res) => {
        // console.log(res.data, "new");
        setData(res.data.docs);
        setTotalPages(res.data.totalPages);
      });
  };

  const handleFormSubit = (e: FormEvent) => {
    e.preventDefault();
    // console.log(mainSelect);
    (async () => {
      await getAllCapsules();
    })();
  };

  const handlePageClick = (e: { selected: number }) => {
    // console.log(e.selected);
    setPage(e.selected + 1);
    (async () => {
      await getAllCapsules(e.selected + 1);
    })();
  };

  useEffect(() => {
    (async () => {
      await getAllCapsules();
    })();
  }, []);

  // if any select is changed set page 1
  useEffect(() => {
    setPage(1);
  }, [mainSelect, secondSelect]);

  // when main Select change handle second select
  useEffect(() => {
    setSecondSelect(mainSelect === "status" ? "active" : "Dragon 1.0");
  }, [mainSelect]);

  return (
    <div className="flex flex-col justify-center gap-2 p-2">
      <form
        onSubmit={handleFormSubit}
        className="flex flex-wrap justify-center gap-4 border-b pb-12 pt-4"
      >
        <div className="relative">
          <select
            value={mainSelect}
            onChange={(e) => {
              setMainSelect(e.target.value);
            }}
            className="block focus:border-pinky shadow appearance-none w-full min-w-[220px] border-2 border-pinky py-3 px-4 pr-8 rounded leading-tight
            focus:outline-none focus:bg-white text-primary focus:border-gray-500"
            id="grid-state"
          >
            <option value={"status"}>Status</option>
            <option value={"type"}> Type</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown strokeWidth={1.2} color="#FD8EA6 " />
          </div>
        </div>
        {mainSelect === "status" ? (
          <div className="relative">
            <select
              value={secondSelect}
              onChange={(e) => setSecondSelect(e.target.value)}
              className="block focus:border-pinky shadow appearance-none w-full min-w-[220px] border-2 border-pinky py-3 px-4 pr-8 rounded leading-tight
               focus:outline-none focus:bg-white text-primary focus:border-gray-500"
              id="grid-state"
            >
              <option value={"active"}>Active</option>
              <option value={"destroyed"}>Destroyed</option>
              <option value={"unknown"}>Unkown</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown strokeWidth={1.2} color="#FD8EA6 " />
            </div>
          </div>
        ) : (
          <div className="relative">
            <select
              value={secondSelect}
              onChange={(e) => setSecondSelect(e.target.value)}
              className="block focus:border-pinky shadow appearance-none min-w-[220px] w-full border-2 border-pinky py-3 px-4 pr-8 rounded leading-tight
               focus:outline-none focus:bg-white text-primary focus:border-gray-500"
              id="grid-state"
            >
              <option value={"Dragon 1.0"}>Dragon 1.0</option>
              <option value={"Dragon 1.1"}>Dragon 1.1</option>
              <option value={"Dragon 2.0"}>Dragon 2.0</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown strokeWidth={1.2} color="#FD8EA6 " />
            </div>
          </div>
        )}

        <input
          className="bg-pinky shadow hover:bg-[#FDBBC9] hover:text-teenyGreeny  cursor-pointer font-bold
           py-2 px-7 rounded-3xl transition duration-300 min-w-[220px] focus:outline-none focus:shadow-outline"
          type={"submit"}
          value="Search"
        />
      </form>
      <div className="grid sm:grid-cols-2 justify-items-center lg:grid-cols-4 md:grid-cols-3 p-9 500 gap-3">
        {data.map((d, i) => (
          <div
            className="min-h-[10rem] sm:w-full md:w-48 lg:w-60 bg-pinky p-4 flex overflow-hidden flex-col
             shadow cursor-pointer hover:bg-[#FDBBC9] transition duration-300"
            key={i}
          >
            <p className="flex capitalize justify-between">
              <span className=" text-primary">Serial: </span>
              {d.serial}
            </p>
            <p className="flex capitalize justify-between">
              <span className=" text-primary">Type: </span> {d.type}
            </p>
            <p className="flex capitalize justify-between">
              <span className=" text-primary">Land landings: </span>
              {d.land_landings}
            </p>
            <p className="flex capitalize justify-between">
              <span className=" text-primary">Water landings: </span>
              {d.water_landings}
            </p>
            <p className="flex capitalize justify-between">
              <span className=" text-primary"> Status: </span> {d.status}
            </p>
          </div>
        ))}
      </div>
      {totalPages ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <ArrowBigRight
              size={35}
              strokeWidth={2}
              className="text-[#FDBBC9] hover:fill-pinky"
            />
          }
          pageClassName={"item pagination-page"}
          activeClassName={"active"}
          className={"flex items-center justify-center gap-2"}
          onPageChange={(e) => handlePageClick(e)}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel={
            <ArrowBigLeft
              size={35}
              strokeWidth={2}
              className="text-[#FDBBC9] hover:fill-pinky"
            />
          }
          renderOnZeroPageCount={null}
        />
      ) : null}
    </div>
  );
};

export default SectionTwo;
