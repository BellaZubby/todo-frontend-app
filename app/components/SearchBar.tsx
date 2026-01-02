"use client";

import { useTasks } from "../store/tasks";

/**
 * Controlled search input. Updates store "search" for filtering by title.
 * Accessible label included for Lighthouse,
 *
 */
const SearchBar = () => {
  const { search, setSearch } = useTasks();
  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium">
        Search
      </label>
      <input
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-background text-foreground"
        placeholder="Search tasks by title"
      />
    </div>
  );
};

export default SearchBar;
