import { Link } from "@tanstack/react-router";
import { Github, Twitter, Youtube } from "lucide-react";

/**
 * i stole this footer design, credit to:
 * https://dub.co/
 */

export function SiteFooter() {
  return (
    <footer className="bg-blue-50 dark:bg-gray-900">
      <div className="relative z-10 mx-auto overflow-hidden border border-b-0 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link to="/">{/* <LogoType className='h-7 text-gray-800' /> */}</Link>
          <p className="max-w-md text-sm text-gray-500">
            A fun project that turned out much better than I expected :D
          </p>
          <p className="max-w-md text-sm text-gray-500">
            Page design inspiration from{" "}
            <a
              className="underline"
              href="https://poopup.co/"
              target="_blank"
              rel="noreferrer"
            >
              poopup
            </a>
          </p>
          <p className="text-sm leading-5 text-gray-400 dark:text-gray-400">
            © {new Date().getFullYear()} Smart Notebook
          </p>
          <div className="flex items-center space-x-3">
            <a
              href="https://x.com/@joshtriedcoding"
              target="_blank"
              rel="noreferrer"
              className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-4 w-4 text-gray-600 transition-colors group-hover:text-black dark:text-gray-200" />
            </a>
            <a
              href="https://github.com/joschan21/profanity.dev/"
              target="_blank"
              rel="noreferrer"
              className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Github</span>
              <Github className="h-4 w-4 text-gray-600 transition-colors group-hover:text-black dark:text-gray-200" />
            </a>

            <a
              href="https://www.youtube.com/@joshtriedcoding"
              target="_blank"
              rel="noreferrer"
              className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <span className="sr-only">YouTube</span>
              <Youtube className="h-4 w-4 text-gray-600 transition-colors group-hover:text-[#ff0000] dark:text-gray-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
