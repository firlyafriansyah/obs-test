import { useDebouncedCallback } from "use-debounce";
import useUsers from "../hooks/use-users";
import InputSearch from "./input-search";

export default function SearchBar() {
  const { setSearch } = useUsers();

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 300);

  return <InputSearch onChange={(e) => handleSearch(e)} />;
}
