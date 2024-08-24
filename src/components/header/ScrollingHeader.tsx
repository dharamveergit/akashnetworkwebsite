import clsx from "clsx";
import React, { useEffect } from "react";
import DarkModeToggle from "../dark-mode-toggle";
import Logo from "../ui/logo";
import HamburgerMenu from "./hamburger-menu";
import { DiscordIcon, GithubIcon, TwitterIcon } from "./icons";
import NavLink from "./nav-link";
import PopOverCommunity, { SubNavbar } from "./popovers/popover-nav-community";
import PopOverNavItemNetwork from "./popovers/popover-nav-item";
import PopOverNavItemEcosystem from "./popovers/popover-nav-item-ecosystem";

const visibilty = {
  network: ["/about", "/token"],
  community: ["/community"],
  development: ["/development"],
  ecosystem: ["/ecosystem"],
};
const getAllPaths = (): string[] => {
  return Object.values(visibilty).flat();
};

const ScrollingHeader = ({
  disableSticky = false,
  pathname = "",
  posts = [],
  pathname2 = "",
}: {
  disableSticky?: boolean;
  pathname?: string;
  posts?: any[];
  pathname2?: string;
}) => {
  const [scroll, setScroll] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const pathnames = getAllPaths();
  console.log(pathnames);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={ref}
        className={clsx(
          pathnames.includes(pathname) ? "" : "sticky top-0 z-[30]",
          "container  mx-auto flex h-[56px] items-center justify-between space-x-2 transition-all duration-500 md:h-[84px]",
        )}
        id="page-top"
      >
        <div className="hidden flex-shrink-0 items-center md:flex md:gap-x-6">
          <a href="/">
            <Logo width={128} />
          </a>

          <div className="mt-1 hidden lg:flex lg:w-full lg:justify-center lg:gap-x-[20px] xl:gap-x-[24px]">
            <PopOverNavItemNetwork />
            <PopOverCommunity type="community" />
            <PopOverCommunity type="development" />

            <PopOverNavItemEcosystem posts={posts} />

            <NavLink href="/blog" currentPath={pathname}>
              Blog
            </NavLink>
            <NavLink href="/docs" currentPath={pathname}>
              Docs
            </NavLink>
            <NavLink href="/gpus" currentPath={pathname}>
              GPU Pricing
            </NavLink>
          </div>
        </div>

        <div className="block flex-shrink-0 md:hidden">
          <a href="/">
            <Logo width={118} height={24} />
          </a>
        </div>

        <div className="block overflow-hidden lg:hidden">
          <HamburgerMenu currentPath={pathname} />
        </div>

        <div className="hidden flex-shrink-0 lg:flex lg:gap-x-[12px]">
          <DarkModeToggle />

          <div className="mr-3 hidden items-center gap-x-[12px] text-para xl:flex">
            <a
              aria-label="Twitter Icon"
              href="https://twitter.com/akashnet_"
              target="_blank"
              className="hover:text-primary"
            >
              <TwitterIcon />
            </a>
            <a
              aria-label="Github Icon"
              href="https://github.com/akash-network"
              target="_blank"
              className="hover:text-primary"
            >
              <GithubIcon />
            </a>
            <a
              aria-label="Discord Icon"
              href="https://discord.com/invite/akash"
              target="_blank"
              className="hover:text-primary"
            >
              <DiscordIcon />
            </a>
          </div>

          <div className="flex items-center lg:gap-x-4">
            <div>
              <a
                aria-label="Deploy Now"
                target="_blank"
                id="console-header"
                href="https://console.akash.network/"
                className="flex h-full items-center justify-center rounded-[4px] bg-primary px-[10px] py-[7px] text-xs font-medium leading-[16px] text-white hover:bg-darkGray"
              >
                Deploy Now
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={clsx(
          pathnames.includes(pathname) ? " sticky top-0 z-[30]" : "hidden",
        )}
      >
        {visibilty.network.includes(pathname) && (
          <SubNavbar pathname={pathname2} type="network" />
        )}
        {visibilty.community.includes(pathname) && (
          <SubNavbar pathname={pathname2} type="community" />
        )}
        {visibilty.development.includes(pathname) && (
          <SubNavbar pathname={pathname2} type="development" />
        )}
        {visibilty.ecosystem.includes(pathname) && (
          <SubNavbar pathname={pathname2} type="ecosystem" />
        )}
      </div>
    </>
  );
};

export default ScrollingHeader;
