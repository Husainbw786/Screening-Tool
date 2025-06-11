import Link from "next/link";
import React from "react";
import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import { PlayCircleIcon, SpeechIcon } from "lucide-react";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  const userOrgId = user?.organizationMemberships?.[0]?.organization?.id || null;
  const userRole = user?.organizationMemberships?.[0]?.role || null;
  console.log("User role:", userRole);
  const isAdminWithOrg = userOrgId && userRole === "org:admin";
  const isMemberWithoutOrg = !userOrgId && userRole === "org:member";

  return (
    <>
      <div className="fixed inset-x-0 top-0 bg-slate-100 z-[10] h-fit py-4">
        <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto">
          {/* Left Section: Logo + Org Switcher */}
          <div className="flex flex-row gap-3 justify-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <p className="px-2 py-1 text-2xl font-bold text-black">
                Consult<span className="text-red-600">Add</span>{" "}
                <span className="text-[8px]">AI Hire</span>
              </p>
            </Link>
            {/* <p className="my-auto text-xl">/</p> */}

            {isAdminWithOrg && (
              <div className="my-auto">
                <OrganizationSwitcher
                  afterCreateOrganizationUrl="/dashboard"
                  hidePersonal={true}
                  afterSelectOrganizationUrl="/dashboard"
                  afterLeaveOrganizationUrl="/dashboard"
                  appearance={{
                    variables: {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Center Section: Navigation Links */}
          <div className="flex gap-4 items-center">
            <Link
              href="/dashboard"
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/dashboard" || pathname.includes("/interviews")
                  ? "bg-green-200"
                  : "hover:bg-white-200"
              }`}
            >
              {/* <PlayCircleIcon size={18} /> */}
              Interviews
            </Link>
            <Link
              href="/dashboard/interviewers"
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/dashboard/interviewers"
                  ? "bg-green-200"
                  : "hover:bg-white-200"
              }`}
            >
              {/* <SpeechIcon size={18} /> */}
              Interviewers
            </Link>
          </div>

          {/* Right Section: User Button */}
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/sign-in" signInUrl="/sign-in" />
          </div>
        </div>
      </div>

      {/* Banner for Members with no organization */}
      {isMemberWithoutOrg && (
        <div className="mt-20 w-full bg-red-200 text-red-800 px-6 py-3 text-center font-medium">
          ⚠️ You are not invited by any organization admin. You cannot create interviews.
        </div>
      )}
    </>
  );
}

export default Navbar;
