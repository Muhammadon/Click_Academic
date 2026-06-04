

import { sidebarRouteMenu } from "~/core/list-route";
import { Link, useLocation } from "react-router";
import { RiCursorHand } from "@remixicon/react";

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      {/* Desktop */}
      <aside
        className="
          hidden
          md:flex
          flex-col
          w-72
          bg-white
          border-r
          border-gray-200
        "
      >
        <div
          className="
            h-16
            flex
            items-center
            px-6
            border-b
            border-gray-200
          "
        >
          <h1
            className="
              text-xl
              font-bold
              flex gap-0.5
              text-hijau-uin
            "
          >

            <RiCursorHand />
            Click Akademik
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {sidebarRouteMenu.map((menu) => {
            const Icon = menu.icon;

            return (
              <div
                key={menu.title}
                className="mb-5"
              >
                {/* Parent */}

                {menu.path ? (
                  <Link
                    to={menu.path}
                    className={`
                      flex
                      items-center
                      gap-3
                      px-3
                      py-3
                      rounded-xl
                      transition-all
                      ${location.pathname === menu.path
                        ? "bg-hijau-uin/10 text-hijau-uin"
                        : "hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span>{menu.title}</span>
                  </Link>
                ) : (
                  <>
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        px-3
                        py-2
                        font-semibold
                        text-gray-700
                      "
                    >
                      <Icon size={20} />
                      <span>{menu.title}</span>
                    </div>

                    {/* SUB MENU */}
                    <div
                      className="
                        ml-4
                        mt-2
                        border-l
                        border-gray-200
                        pl-4
                        space-y-1
                      "
                    >
                      {menu.children?.map((child) => {
                        const ChildIcon = child.icon;

                        const active =
                          location.pathname === child.path;

                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`
                              flex
                              items-center
                              gap-3
                              px-3
                              py-2.5
                              rounded-lg
                              transition-all
                              ${active
                                ? "bg-hijau-uin text-white"
                                : "hover:bg-gray-100 text-gray-600"
                              }
                            `}
                          >
                            <ChildIcon size={18} />
                            <span>{child.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Mobile Navbar */}
      <nav
        className="
          md:hidden
          sticky
          top-0
          z-50
          bg-white
          border-b
          border-gray-200
        "
      >
        <div
          className="
            flex
            overflow-x-auto
            px-2
            py-2
            gap-2
          "
        >
          {sidebarRouteMenu.map((menu) => {
            const Icon = menu.icon;

            return (
              <div key={menu.title}>
                {menu.path && (
                  <Link
                    to={menu.path}
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      min-w-[80px]
                      p-2
                      rounded-xl
                      hover:bg-gray-100
                    "
                  >
                    <Icon size={20} />
                    <span className="text-xs mt-1">
                      {menu.title}
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
