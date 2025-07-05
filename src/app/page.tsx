"use client";

import blog from "@/data/blog";
import projects from "@/data/projects";
import work from "@/data/work";
import WorkItem from "@/components/WorkItem";
import ProjectTile from "@/components/ProjectTile";
import BlogPost from "@/components/BlogPost";
import ViewAllHeader from "@/components/ViewAllHeader";
import { motion } from "framer-motion";
import Image from 'next/image';
import { certifications } from '@/data/certifications/certifications';

import {
    FaAws,
    FaPython,
    FaDocker
} from "react-icons/fa";
import { BiLogoKubernetes } from "react-icons/bi";
import { SiAnsible, SiDatadog, SiGrafana, SiHelm, SiNutanix, SiPrometheus, SiTerraform } from "react-icons/si";
import { FaLinux } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";

/**
 * Home component that serves as the main landing page for the portfolio.
 * This is accessed at the root URL ("/") of the application.
 */
export default function Home() {

    const getTimeSafe = (dateStr: string | undefined) => {
        const date = new Date(dateStr ?? '');
        return isNaN(date.getTime()) ? 0 : date.getTime();
    };

    return (
        <section className="px-4 max-w-4xl mx-auto">

            {/* Intro Section */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                viewport={{once: true}}
                className="text-center mt-2"
            >
                {/* Introductory Text */}
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Hello, I&#39;m Nirmal Chandrasiri 👋
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left mb-6">
                    Passionate about cloud infrastructure, automation, and observability, I enjoy exploring topics in DevOps, Site Reliability Engineering, and Systems Engineering. I focus on building scalable and reliable systems, enhancing service availability, and driving operational excellence. With hands-on experience in Level 2 and Level 3 support, I work closely with cross-functional teams to proactively monitor, troubleshoot, and continuously improve critical infrastructure and applications.
                </p>

                {/* Current Work Description or other highlights */}
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left">
                    When I&#39;m not busy working with projects, I love spending time with my family and friends, creating special memories with them. Also, I enjoy playing chess ♔ and listening to music 🎶  I think it&#39;s important to balance different interests for my personal growth and happiness activity brings something special to my life, and I&#39;m thankful to lots of things I enjoy doing 😄
                </p>

                {/* Download My CV Section (Flowbite style) */}
                <div className="flex items-start gap-2.5 mt-8">
                  <Image
                    src="/icons/myself.jpeg"
                    alt="Nirmal Chandrasiri"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                    priority
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Interested in what I have to offer?</span>
                        {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Download</span> */}
                      </div>
                      <div className="flex items-start my-2.5 bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
                        <div className="me-2">
                          <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                            <svg fill="none" aria-hidden="true" className="w-5 h-5 shrink-0" viewBox="0 0 20 21">
                              <g clipPath="url(#clip0_3173_1381)">
                                <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"/>
                                <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"/>
                                <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z"/>
                                <path fill="#2563eb" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"/>
                                <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"/>
                                <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_3173_1381">
                                  <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)"/>
                                </clipPath>
                              </defs>
                            </svg>
                            Download My CV
                          </span>
                          <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                            2 Pages
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                              <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                            </svg>
                            442 KB
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                              <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                            </svg>
                            PDF
                          </span>
                        </div>
                        <div className="inline-flex self-center items-center">
                          <a href="/CV%20-%20Nirmal%20Chandrasiri.pdf" download className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                            <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                

                {/* Quick Facts Section */}
                <div className="mt-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">One of my favourite tools</h2>

                    <div className="flex flex-wrap justify-center gap-3 px-4 max-w-4xl mx-auto">
                        {[
                            { icon: FaAws, label: "AWS" },
                            {icon: VscAzure, label: "Azure"},
                            {icon: FaPython, label: "Python"},
                            { icon: SiTerraform, label: "Terraform" },
                            { icon: SiHelm, label: "Helm" },
                            {icon: SiNutanix, label: "Nutanix"},
                            { icon: FaDocker, label: "Docker" },
                            {icon: SiAnsible, label: "Ansible"},
                            {icon: BiLogoKubernetes, label: "Kubernetes"},
                            {icon: SiPrometheus, label: "Prometheus"},
                            {icon: FaLinux, label: "Linux"},
                            {icon: SiDatadog, label: "Datadog" },
                            {icon: SiGrafana, label: "Grafana"},
                        ].map((fact, i) => {
                            const Icon = fact.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800
                                    text-sm text-gray-700 dark:text-gray-300 rounded-full shadow-md transition"
                                >
                                    <Icon className="text-blue-500 dark:text-blue-400 text-base"/>
                                    <span>{fact.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </motion.div>

            {/* Recent Work */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                viewport={{once: true}}
                className="mt-16"
            >
                <ViewAllHeader title="Work Experience" pageUrl="/work" itemCount={work.length}/>
                <div className="grid gap-4">
                    {work.slice(0, 3).map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            viewport={{once: true}}
                        >
                            <WorkItem {...job} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Certifications Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mt-16"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Knowledge Credentials</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {certifications.map(cert => (
                        <motion.a
                            key={cert.slug}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-transform duration-200"
                        >
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex flex-col items-center"
                            >
                                <Image
                                    src={cert.image}
                                    alt={cert.name}
                                    width={160}
                                    height={100}
                                    className="object-contain w-40 h-24"
                                    priority
                                />
                                <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">{cert.name}</span>
                            </motion.div>
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* Recent Projects */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                viewport={{once: true}}
                className="mt-16"
            >
                <ViewAllHeader title="Projects / Case Studies" pageUrl="/projects" itemCount={projects.length}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {projects.slice(0, 4).map((proj) => (
                        <motion.div
                            key={proj.slug}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            viewport={{once: true}}
                        >
                            <ProjectTile key={proj.slug} {...proj} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Recent Blog Posts */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                viewport={{once: true}}
                className="mt-16 mb-12"
            >
                <ViewAllHeader title="Recent Blog Posts" pageUrl="/blog" itemCount={blog.length}/>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {blog
                        .slice()
                        .sort((a, b) => getTimeSafe(b.date) - getTimeSafe(a.date))
                        .slice(0, 3)
                        .map((post) => (
                            <motion.div
                                key={post.slug}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 1}}
                                viewport={{once: true}}
                            >
                                <BlogPost {...post} />
                            </motion.div>
                        ))}
                </div>
            </motion.div>

        </section>
    )
}