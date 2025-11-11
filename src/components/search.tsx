import { SearchIcon, X } from "lucide-react";

export default function Search(){


    return (
      <div className="search-container">
        <input
          type="text"
          className="search-input peer"
          placeholder="Search for people,jobs,companies"
        />
        <SearchIcon
          className="search-icon"
          size={33}
        />
        <X className="search-cancel" size={30}/>
      </div>
    );
}