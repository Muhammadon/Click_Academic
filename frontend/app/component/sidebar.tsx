

import { sidebarRouteMenu, type MenuItem } from "~/core/list-route";
import { Link, useLocation } from "react-router";
import { useState } from "react";
export default function Sidebar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMenuClick = (title: string, hasChild: boolean) => {
    // Mencegah konflik event bubbling di mobile browser
    console.info(title, hasChild)
    if (!hasChild) {
      setOpenDropdown(null);
      return;
    }
    // Jika menu yang sama diklik lagi, tutup dropdown. Jika menu lain, buka yang baru.
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <>
      {/* Desktop */}
      <nav
        className="
          hidden
          md:flex
          flex-col
          w-72
          h-screen
          bg-white
          border-r
          border-gray-200
        "
      >
        {/*   <div
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



            <Link to={"/"}>
              <RiCursorHand />

              Click Akademik
            </Link>
          </h1>
        </div>
        */}
        <div className="flex-1 overflow-y-auto p-4">
          {sidebarRouteMenu.map((menu: MenuItem) => {
            const Icon = menu.icon;

            return (
              <div
                key={menu.title}
                className="mb-5"
              >
                {/* Parent */}

                <Link to={menu.path}
                  key={menu.path}
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
                </Link>
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
              </div>
            );
          })}
        </div>
      </nav >

      <nav className="md:hidden sticky top-0 z-50 h-16 border-b border-gray-200 bg-white w-full">

        <div className="flex  justify-between px-2 py-2 gap-2 h-full items-center touch-pan-x">


          {sidebarRouteMenu.map((menu: MenuItem) => {
            const Icon = menu.icon;
            const hasChild = !!(menu.children && menu.children.length > 0);
            const isDropdownOpen = openDropdown === menu.title;

            return (
              /* Tambahkan 'relative' di sini agar koordinat dropdown tetap konsisten */
              <div key={menu.title} className="shrink-0 relative">
                {hasChild ? (
                  <button
                    type="button"
                    onClick={() => handleMenuClick(menu.title, hasChild)}
                    className={`
                    flex flex-col items-center justify-center min-w-20 text-black p-2 rounded-xl 
                    hover:bg-gray-100 transition-all duration-200 select-none
                    ${isDropdownOpen ? 'bg-gray-100' : ''}
                  `}
                  >
                    <Icon size={20} />
                    <span className="text-xs mt-1 items-center flex gap-1">
                      {menu.title}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  menu.path && (
                    <Link
                      to={menu.path}
                      onClick={() => setOpenDropdown(null)} // Tutup jika menu biasa diklik
                      className="flex flex-col items-center justify-center min-w-20 text-black p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                    >
                      <Icon size={20} />
                      <span className="text-xs mt-1">{menu.title}</span>
                    </Link>
                  )
                )}

                {hasChild && isDropdownOpen && (
                  <div className="fixed left-auto top-14 mt-1 min-w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in duration-100">
                    {menu.children?.map((subChild) => (
                      <Link
                        key={subChild.path}
                        to={subChild.path}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                      >
                        {subChild.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>    </>
  );
}
