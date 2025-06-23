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
                    Passionate about cloud infrastructure, automation, and observability, I thrive at the intersection of DevOps, SRE, and platform engineering. My focus is on building scalable systems, enhancing reliability, and driving operational excellence through proactive monitoring and continuous improvement.
                </p>

                {/* Current Work Description or other highlights */}
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left">
                    When I&#39;m not busy working with projects, I love spending time with my family and friends, creating special memories with them. Also, I enjoy playing chess ♔ and listening to music I prefer calming tunes and energetic beats 🎶 Music and It&#39;s makes my day better. I think it&#39;s important to balance different interests for my personal growth and happiness 😊 activity brings something special to my life, and I&#39;m thankful to lots of things I enjoy doing 😄
                </p>


                {/* Quick Facts Section */}
                <div className="mt-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">One of favourite tools stack</h2>

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

