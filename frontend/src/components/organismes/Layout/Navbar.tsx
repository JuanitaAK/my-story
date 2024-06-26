import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logoAiStory.png";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Navbar = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  //option if httpsOnly
  // const handleLogout = async () => {
  //   try {
  //     deleteAuthToken();
  //     await router.push(`/`);
  //   } catch (error) {
  //     console.error("Failed to logout:", error);
  //   }
  // };

  useEffect(() => {
    if (Cookies.get("Auth-Token")) {
      setIsLogged(true);
    }
  }, [router]);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target as HTMLElement;
      if (target && !target.closest(".menu-btn")) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };
  }, []);

  useEffect(() => {
    if (router.pathname === "/login") {
      setIsVisible(true);
    }
    if (router.pathname === "/signup") {
      setIsVisible(false);
    }
    if (router.pathname === "/") {
      setIsVisible(false);
    }
  }, [router]);

  const handleLogout = () => {
    try {
      Cookies.remove("Auth-Token");
      setIsLogged(false);
      router.replace(`/`);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  return (
    <nav className="menu-btn Z-10 sticky top-0 z-50 bg-navbar text-nav-font px-2 md:px-5 lg:px-3 shadow-lg font-semibold  text-base md:text-xl">
      <div className="container mx-auto flex justify-between items-center transition duration-300 py-2">
        <Link
          href="/"
          className="md=ml-3 flex flex-row items-center gap-2  md:gap-3 md:text-xl"
        >
          <Image src={logo} alt="Logo Story.com" width={50} height={45} />
          <p>AI Story</p>
        </Link>

        {!isLogged && (
          <div className="flex flex-row gap-2 ">
            {!isVisible && (
              <Link href="/login">
                <button className="p-2 px-4 w-auto text-white rounded-md bg-button hover:bg-hover transition duration-300">
                  Sign in
                </button>
              </Link>
            )}
            {isVisible && (
              <Link href="/signup">
                <button className="p-2 px-4 w-auto text-white rounded-md bg-button hover:bg-hover transition duration-300">
                  Sign up
                </button>
              </Link>
            )}
          </div>
        )}

        {isLogged && (
          // menu desktop
          <div>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/stories"
                className="hover: hover:text-nav-hover cursor-pointer transition duration-300 rounded-md p-3  "
                onClick={() => setIsDropdownOpen(false)}
              >
                Stories
              </Link>

              <Link
                href="/form"
                className="hover: hover:text-nav-hover cursor-pointer transition duration-300 rounded-md p-3  "
                onClick={() => setIsDropdownOpen(false)}
              >
                New Story
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hover: hover:text-nav-hover cursor-pointer transition duration-300 rounded-md p-3 z-10  "
                >
                  Account
                </button>
                {isDropdownOpen && (
                  <div className="items-center bg-button text-white  transition duration-300 absolute right-0 mt-6 w-48 shadow-lg rounded-md  ">
                    {/* desktooopp */}
                    <Link
                      href="/profile"
                      className="block px-4 py-2 rounded-md hover:text-white  hover:bg-nav-hover transition duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/"
                      onClick={handleLogout}
                      className="block px-4 py-2 rounded-md hover:text-white  hover:bg-nav-hover transition duration-300"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className=" relative md:hidden block transition duration-300">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="z-50 p-3 mb-2 text-nav-font text-2xl"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? "×" : "☰"}
              </button>
            </div>
          </div>
        )}

        {isMenuOpen && isLogged && (
          // <div className="fixed bg-black flex p-32 justify-center items-center">
          <div className=" fixed md:hidden block right-4 mt-40 w-48 bg-white shadow-xl rounded-lg">
            <Link
              href="/stories"
              className="block hover:bg-hover hover:text-white rounded-md p-3 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/form"
              className=" block hover:bg-hover hover:text-white rounded-md p-3 transition duration-300 "
              onClick={() => setIsMenuOpen(false)}
            >
              New Story
            </Link>
            <Link
              href={""}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="block hover:bg-hover rounded-md hover:text-white p-3 transition duration-300"
            >
              Account
            </Link>

            {isDropdownOpen && (
              <div className=" fixed mt-5justify-center block right-15 rounded-xl bg-button text-white w-48 shadow-lg transition duration-300">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-hover rounded-md transition duration-300"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/"
                  onClick={handleLogout}
                  className="block  hover:bg-hover rounded-md px-3 py-3 transition duration-300"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
