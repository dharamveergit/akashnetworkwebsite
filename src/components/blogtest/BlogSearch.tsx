import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useRef, useState } from "react";

interface BlogSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  tags: string[];
}

export function BlogSearch({
  searchTerm,
  onSearch,
  selectedTag,
  onTagSelect,
  tags,
}: BlogSearchProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-12 rounded-2xl border bg-white p-6 shadow transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search blogs..."
            className={`w-full rounded-xl border-2 bg-gray-50 px-6 py-3 text-lg transition-all duration-300 placeholder:text-gray-400 focus:outline-none ${
              isSearchFocused
                ? "border-primary ring-4 ring-primary/20"
                : "border-gray-200"
            }`}
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          <svg
            className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ${
              isSearchFocused ? "text-primary" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="relative">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onTagSelect("all")}
              className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                selectedTag === "all"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Posts
            </button>
            {tags.slice(0, 3).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagSelect(tag)}
                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
            {tags.length > 3 && (
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`inline-flex items-center rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-primary/90 ${
                        open
                          ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary"
                          : ""
                      }`}
                    >
                      <span>+{tags.length - 3} More</span>
                      <ChevronDownIcon
                        className={`ml-2 h-5 w-5 transition duration-150 ease-in-out ${
                          open ? "rotate-180 transform" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 z-10 mt-2 w-60 rounded-xl bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="grid gap-2">
                          {tags.slice(3).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => {
                                onTagSelect(tag);
                              }}
                              className={`rounded-lg px-4 py-2 text-left font-medium transition-all duration-300 ${
                                selectedTag === tag
                                  ? "bg-primary text-white"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
