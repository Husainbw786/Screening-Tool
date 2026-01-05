import { useMemo, useState } from "react";
import { Figtree } from "next/font/google";
import React from "react";
import { CandidateCard } from "./CandidateCard";
import { Candidate } from "../../types";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export function ResultsPage({
  data,
  onGoBack,
  onCandidateClick,
}: {
  data: any;
  onGoBack: () => void;
  onCandidateClick: (candidate: any) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchScoreFilter, setMatchScoreFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredCandidates = useMemo(() => {
    if (!data?.candidates) return [];

    return data.candidates.filter((candidate: Candidate) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        candidate.name?.toLowerCase().includes(searchLower) ||
        candidate.title?.toLowerCase().includes(searchLower);

      const score = (candidate.score || 0) * 100;
      let matchesMatchScore = true;
      if (matchScoreFilter === "95+") matchesMatchScore = score >= 95;
      else if (matchScoreFilter === "90+") matchesMatchScore = score >= 90;
      else if (matchScoreFilter === "85+") matchesMatchScore = score >= 85;

      const exp = candidate.total_experience || 0;
      let matchesExperience = true;
      if (experienceFilter === "5+") matchesExperience = exp >= 5;
      else if (experienceFilter === "7+") matchesExperience = exp >= 7;
      else if (experienceFilter === "10+") matchesExperience = exp >= 10;

      if (locationFilter === "all")
        return matchesSearch && matchesMatchScore && matchesExperience;

      const loc = candidate.location?.toLowerCase() || "";
      let matchesLocation = false;
      if (locationFilter === "sf")
        matchesLocation = loc.includes("san francisco");
      else if (locationFilter === "ny")
        matchesLocation = loc.includes("new york");
      else if (locationFilter === "remote")
        matchesLocation = loc.includes("remote");

      return (
        matchesSearch &&
        matchesMatchScore &&
        matchesExperience &&
        matchesLocation
      );
    });
  }, [
    data.candidates,
    searchQuery,
    matchScoreFilter,
    experienceFilter,
    locationFilter,
  ]);

  console.log(filteredCandidates);

  return (
    <main className="flex-1 px-6 py-6 gap-2 flex overflow-auto">
      <div className="w-full">
        <button
          onClick={onGoBack}
          className="self-start px-4 py-2 mb-4 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition justify-center gap-2"
        >
          ← Go back
        </button>

        <div className="w-full p-4 mb-4 flex flex-col gap-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h1
              className={`${figtree.className} text-2xl font-semibold text-gray-900`}
            >
              Top matches for {data?.job_description}
            </h1>
            <p className="text-base text-gray-500">
              Found {data.total_found} candidates matching your criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-slate-500 ml-1 mb-1">
                Search candidates
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidates"
                  className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <svg
                  className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
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
            </div>

            <div>
              <label className="block text-xs text-slate-500 ml-1 mb-1">
                Match score
              </label>
              <select
                value={matchScoreFilter}
                onChange={(e) => setMatchScoreFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All match score</option>
                <option value="95+">95%+</option>
                <option value="90+">90%+</option>
                <option value="85+">85%+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-500 ml-1 mb-1">
                Experience
              </label>
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All experience</option>
                <option value="5+">5+ years</option>
                <option value="7+">7+ years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-500 ml-1 mb-1">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All location</option>
                <option value="sf">San Francisco, CA</option>
                <option value="ny">New York, NY</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.length === 0 ? (
            <p className="text-sm text-gray-500 col-span-full text-center py-8">
              No candidates match your filters.
            </p>
          ) : (
            filteredCandidates.map((candidate: Candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onClick={() => onCandidateClick(candidate)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
