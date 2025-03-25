"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import tippy from "tippy.js";

const categories = [
  "Tabletop",
  "Romance", 
  "Romantasy",
  "Isekai",
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Steampunk",
  "Contemporary",
  "Historical",
  "Thriller",
  "Horror",
];

export default function Sidebar({ games, setFilteredGames }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);

  useEffect(() => {
    let filtered = games;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.game_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(game => {
        if (!game.game_tags) return false;
        return game.game_tags.some(tag => selectedCategories.includes(tag));
      });
    }

    setFilteredGames(filtered);
  }, [selectedCategories, searchTerm, games, setFilteredGames]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Calculate count of games per category
  const getCategoryCount = (category) => {
    return games.filter(game => game.game_tags && game.game_tags.includes(category)).length;
  };

  return (
    <div className="lg:w-1/5 mb-10 js-collections-sidebar lg:h-[calc(100vh_-_232px)] lg:overflow-auto lg:sticky lg:top-32 lg:mr-12 pr-4 scrollbar-custom divide-y divide-jacarta-100 dark:divide-jacarta-600">
      {/* Collections filter */}
      <div>
        <div
          id="filters-collections"
          className="mt-3 collapse show visible"
          aria-labelledby="filters-collections-heading"
        >
          <form onSubmit={(e) => e.preventDefault()} className="relative mb-6">
            <input
              type="search"
              className="w-full rounded-lg border border-jacarta-100 py-[0.6875rem] px-4 pl-12 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-500 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
              </svg>
            </span>
          </form>
        </div>
      </div>

      {/* Categories filter */}
      <div className="mt-4 pt-4">
        <h2 id="filters-categories-heading">
          <button
            className="accordion-button relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-700 dark:text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filters-categories"
            aria-expanded="true"
            aria-controls="filters-categories"
          >
            <span>Categories</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div
          id="filters-categories"
          className="mt-3 collapse show visible"
          aria-labelledby="filters-categories-heading"
        >
          <ul className="flex flex-wrap items-center">
            {categories.map((category, i) => {
              const count = getCategoryCount(category);
              return (
                <li
                  key={i}
                  onClick={() => toggleCategory(category)}
                  className="my-1 mr-1" 
                >
                  <button
                    className={`
                      group flex h-9 items-center rounded-lg border px-3 font-display text-sm font-semibold transition-colors
                      ${selectedCategories.includes(category) 
                        ? "border-accent bg-accent text-white shadow-lg scale-105" 
                        : "border-jacarta-100 bg-white text-jacarta-500 dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white"
                      }
                      hover:border-transparent hover:bg-accent hover:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white
                    `}
                  >
                    <span>{category}</span>
                    <span className="ml-1.5 rounded-full bg-jacarta-100 px-2 py-0.5 text-xs dark:bg-jacarta-600">
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
