"use client";

import { useEffect, useMemo } from "react";
import { useTasks } from "./store/tasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import EmptyState from "./components/EmptyState";
import AnalyzeButton from "./components/AnalyzeButton";

/**
 * Dashboard composes search, filters, form, and the task list.
 * Hydrates state from localStorage on mount.
 *
 */

const Home = () => {
  const { tasks, hydrate, search, statusFilter } = useTasks();

  // Load persisted tasks once on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Derived filtered list: status + case-insensitive title search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((t) => {
      const statusOk =
        statusFilter === "All" ? true : t.status === statusFilter;
      const searchOk = q ? t.title.toLowerCase().includes(q) : true;
      return statusOk && searchOk;
    });
  }, [tasks, search, statusFilter]);

  return (
    <section aria-labelledby="dashboard-title">
      <h2 id="dashboard-title" className="sr-only">
        Task dashboard
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <SearchBar />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <Filters />
      </div>

      <div className="mt-6">
        <TaskForm />
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? <EmptyState /> : <TaskList tasks={filtered} />}
      </div>

       {/* <div className="sm:col-span-1 flex sm:justify-end mt-4"> */}
       <div className="mt-4">
          {/* Analyse button for AI */}
          <AnalyzeButton tasks={tasks}/>
        </div>
    </section>
  );
};

export default Home;
