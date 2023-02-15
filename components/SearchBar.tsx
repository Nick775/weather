import React, { ChangeEvent } from 'react'

interface Props {
    query: string;
    onQuery: (e: ChangeEvent<HTMLInputElement>) => void;
    onQueryClear: () => void;
}

export default function SearchBar({ query, onQuery, onQueryClear }: Props) {
    return (
        <form>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    stroke="currentColor"
                    >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
                </svg>
                </div>
                <input 
                  type={"text"} 
                  className="block w-full p-4 pl-10 text-sm text-brand border border-gray-300 rounded-lg bg-gray-50 focus:ring-brand focus:border-brand focus:outline-none dark:bg-gray"
                  placeholder="Search location"
                  value={query || ''}
                  onChange={onQuery}
                />

                {query && (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 absolute right-2.5 bottom-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                    onClick={onQueryClear}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
            </div>
        </form>
    )
}