import { FaArrowCircleUp } from "react-icons/fa";
import user_info from "../data/userdata";
import GitHubButton from "react-github-btn";
interface FooterProps {
  theme: string; // 👈 vì theme là chuỗi (vd: 'light' | 'dark')
}

function Footer({ theme }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="p-4 text-center md:flex justify-between">
      <GitHubButton
        className="self-center"
        href="https://github.com/datmnt-dev/dat_porfolio"
        data-color-scheme={theme}
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star datmnt-dev/dat_porfolio on GitHub"
      >
        Star on Github
      </GitHubButton>

      <p className="text-zinc-600 self-center mt-2 md:mt-0 dark:text-zinc-300 text-sm text-center font-light">
        {user_info.footer}
      </p>

      <button
        onClick={scrollToTop}
        className="text-zinc-600 self-center mt-2 md:mt-0 dark:text-zinc-300 mx-auto md:mx-0 text-sm font-light flex gap-2 cursor-pointer"
      >
        <FaArrowCircleUp className="self-center text-red-800 dark:text-red-500 cursor-pointers" /> Go back to top
      </button>
    </footer>
  );
}

export default Footer;
