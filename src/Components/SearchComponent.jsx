import SearchIcon from "@mui/icons-material/Search";
import { Button, Input } from "@material-tailwind/react";
import {MagnifyingGlassCircleIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
const SearchComponent = () => {
  return (
    <div className="grid grid-cols-6">
      {/* <div className="col-span-5">
        <input
          className="mx-auto block w-full border-0"
          type="text"
          placeholder="Search"
        />
      </div>
      <button type="submit" className="">
        <SearchIcon />
      </button> */}
      <div className="col-span-5">
        <Input
          type="email"
          className="pr-20 rounded-full"
          containerProps={{
            className: "min-w-0",
          }}
          placeholder="Search"
        />
      </div>
      <div className="col-span-1">
        <Button size="sm" className="rounded-full">
          <SearchIcon />
          {/* <MagnifyingGlassCircleIcon/> */}
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;
