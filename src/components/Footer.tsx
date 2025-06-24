import Link from 'next/link'
import {FaGithub, FaLinkedin, FaEnvelope} from 'react-icons/fa'
import {FaXTwitter} from "react-icons/fa6";
import {appVersion} from "@/lib/constants";
import { BsMedium } from 'react-icons/bs';

export default function Footer() {

    return (
        <footer
            className="mt-4 py-6 text-center text-sm text-gray-500 px-4 border-t
            dark:border-gray-800 border-gray-300 dark:bg-black"
            id="footerPortfolio"
        >
            <div className="flex justify-center gap-6 mb-2 text-lg">
                <Link
                    href="https://github.com/NirmalNaveen20"
                    target="_blank"
                    aria-label="GitHub"
                    className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
                >
                    <FaGithub/>
                </Link>
                <Link
                    href="https://www.linkedin.com/in/nirmal-naveen/"
                    target="_blank"
                    aria-label="LinkedIn"
                    className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
                >
                    <FaLinkedin/>
                </Link>
                <Link
                    href="https://x.com/NirmalNaveen20"
                    target="_blank"
                    aria-label="X"
                    className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
                >
                    <FaXTwitter/>
                </Link>
                                <Link
                    href="https://nirmalnaveen.medium.com/"
                    target="_blank"
                    aria-label="X"
                    className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
                >
                    <BsMedium/>
                </Link>
                <Link
                    href="mailto:nirmalnaveen95@gmail.com"
                    target="_blank"
                    aria-label="Email"
                    className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
                >
                    <FaEnvelope/>
                </Link>
            </div>

            {/* Copyright section */}
            <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Nirmal Chandrasiri. All rights reserved.</p>

            {/* Display version & Link to GitHub Repo */}
            {/* You can update or remove this for your own template */}
            <p className="text-xs sm:text-sm">
                <Link href={`https://github.com/nirmalnaveen20/nextjs-portofolio/releases/tag/v${appVersion}`}
                      rel="noopener noreferrer">
                    <span
                        className="font-semibold hover:text-blue-500 transition-colors duration-200"
                    >
                        v{appVersion}
                    </span>
                </Link>
                &nbsp;built by&nbsp;
                <Link href="https://github.com/nirmalnaveen20" rel="noopener noreferrer">
                    <span
                        className="font-semibold hover:text-blue-500 transition-colors duration-200"
                    >
                        @nirmalnaveen20
                    </span>
                </Link>
            </p>
        </footer>
    )
}
