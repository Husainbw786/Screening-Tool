export function CandidateDetailPage({
  candidate,
  onGoBack,
}: {
  candidate: any;
  onGoBack: () => void;
}) {
  if (!candidate) return null;

  const skills = candidate.skills || [];
  const conversation = candidate.conversation || [];

  return (
    <main className="flex-1 px-6 py-6 gap-2 flex overflow-auto">
      <div className="w-full">
        <button
          onClick={onGoBack}
          className="self-start px-4 py-2 mb-4 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition justify-center gap-2"
        >
          ← Go back
        </button>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {candidate.avatar ? (
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">NA</span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-base font-semibold text-gray-900">
                    {candidate.name || "Unknown Name"}
                  </h1>
                  {candidate.matchScore !== undefined && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                      {candidate.matchScore}% Match
                    </span>
                  )}
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                    Screening done
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {candidate.title || "No Title Provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Experience
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {candidate.total_experience !== undefined &&
                candidate.total_experience !== null
                  ? `${candidate.total_experience} years`
                  : "N/A"}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Location
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {candidate.location || "N/A"}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Current company
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {candidate.company || "N/A"}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Skills
              </div>
              <div className="flex flex-wrap gap-1">
                {skills.length > 0 ? (
                  skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No skills listed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              AI screening score
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Overall match assessment
            </p>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#E5E7EB"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#3B82F6"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 88 * (1 - (candidate.matchScore || 0) / 100)
                    }`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-900">
                    {candidate.matchScore !== undefined
                      ? `${candidate.matchScore}%`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <h3 className="text-base font-semibold text-gray-900">
                  Call Summary
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {candidate.summary || "No call summary available."}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">
                Conversation Transcript
              </h2>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {conversation.length > 0 ? (
                conversation.map((msg: any, index: number) => (
                  <div key={index} className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === "agent"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {msg.type === "agent" ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {msg.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No conversation transcript available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
