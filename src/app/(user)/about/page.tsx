import { AnimatePage } from '@components/atoms/AnimatePage';
import { Button } from '@components/atoms/Button';
import { Container } from '@components/atoms/Container';
import { IconDownload } from '@components/atoms/Icons';
import { PodcastList } from '@components/molecules/PodcastList';
import { Education } from '@components/organisms/Education';
import { WorkExperience } from '@components/organisms/WorkExperience';

import { sanityClient } from '@lib/sanity';

import { educationQuery } from '@queries/education';
import { jobsQuery } from '@queries/jobs';
import { podcastsQuery } from '@queries/podcasts';


import LogoAWS from '@root/public/assets/tools-about/aws.svg';
import LogoAzure from '@root/public/assets/tools-about/azure.svg';
import LogoJenkins from '@root/public/assets/tools-about/jenkins.svg';
import LogoTerraform from '@root/public/assets/tools-about/terraform.svg';
import LogoReact from '@root/public/assets/tools-about/react.svg';
import LogoPython from '@root/public/assets/tools-about/python.svg';

import type { Education as EducationType, Job, Podcast } from '@types';
import Link from 'next/link';

export const metadata = {
	title: 'About Nirmal Naveen',
	description:
		'As a passionate front-end and devops engineering field for as long as I can think. The technologies I work with are JavaScript, HTML and CSS with a focus on the frameworks React.js, Gatsby, Next.js, Node and Express. I use code not only to do my day-to-day job, but also to solve everyday problems I come across.',
};

const getData = async () => {
	const podcasts: Podcast[] = await sanityClient.fetch(podcastsQuery);
	const jobs: Job[] = await sanityClient.fetch(jobsQuery);
	const education: EducationType[] = await sanityClient.fetch(educationQuery);

	return {
		education,
		jobs,
		podcasts,
	};
};

const AboutPage = async () => {
	const { education, jobs, podcasts } = await getData();

	return (
		<AnimatePage>
			<Container>
				<h1 className="headline mt-8 text-3xl md:text-5xl lg:text-6xl">
					Hey, I&apos;m Nirmal Naveen
				</h1>
				{/* <h2 className="mt-2 text-xl font-bold md:text-2xl">
					DevOps Engineer
				</h2> */}
				<p className="mt-8">
					Passionate about web development and devops engineering, I am
					constantly driven to learn and expand my skillset. advocate for web
					performance and accessibility as well as web experiences while
					ensuring efficient and smooth deployment process.
				</p>
				<p className="my-4">
					{/* I am &radic;1,024 years old and have been a web developer for as long
					as I can think. The technologies I work with are JavaScript, HTML and
					CSS with a focus on the frameworks React.js, Gatsby, Next.js, Node and
					Express. I use code not only to do my day-to-day job, but also to
					solve everyday problems I come across. */}
				</p>
				<p>
					When I am not writing code I love to spend time with my family
					friends, spending quality time with them fills my heart with warmth
					and laughter, creating unforgettable memories that I hold dear.
					Furthermore i play chess♔ and listen to music From relaxing tunes to
					energizing beats 🎶 music enriches my everyday experiences. I believe
					that finding a balance between my different interests is important for
					my personal growth and happiness 😊 Each activity brings its own
					unique flavor to my life, and I am grateful to have so many things
					enjoy doing 😄
				</p>

				{/* My podcasts */}
				<h2 className="headline mb-4 mt-12 text-4xl">
					Podcasts i enjoy
				</h2>

				<PodcastList podcasts={podcasts} />

				{/* This is for devops icons section */}

				<section id="tools" className="my-30">
				<Container>
					<h2 className="headline mt-24 text-center text-xl md:text-2xl lg:text-3xl">
						DevOps Toolset Expertise
					</h2>

					<div className="mx-auto mt-8 flex max-w-5xl flex-wrap gap-x-10 gap-y-8">
						<LogoAWS className="w-32 md:w-36" aria-label="GitHub" />
						<LogoAzure className="w-32 md:w-36" aria-label="Azure" />
						<LogoJenkins className="w-32 md:w-36" aria-label="Jenkins" />
						<LogoTerraform className="w-32 md:w-36" aria-label="Terraform" />	
					</div>
					
				</Container>
				</section>
				
				{/* This is for frontend icons section */}

				<section id="tools" className="my-30">
				<Container>
					<h2 className="headline mt-24 text-center text-xl md:text-2xl lg:text-3xl">
						Frontend & Backend i familiar with
					</h2>

					<div className="mx-auto mt-8 flex max-w-5xl flex-wrap gap-x-16 gap-y-8">
						
						<LogoReact className="w-32 md:w-36" aria-label="React" />
					</div>
				</Container>
				</section>
				
				{/* This is for backend icons section */}

				<section id="tools" className="my-30">
				<Container>
					<h2 className="headline mt-24 text-center text-xl md:text-2xl lg:text-3xl">
						Libraries & Frameworks i familiar with
					</h2>

					<div className="mx-auto mt-8 flex max-w-5xl flex-wrap gap-x-16 gap-y-8">
						<LogoPython className="w-32 md:w-36" aria-label="Python" />
					</div>
				</Container>
			</section>

				{/* <h2 className="headline mb-4 mt-12 text-4xl">Experience</h2> */}

				<WorkExperience jobs={jobs} />

				<h2 className="headline mb-4 mt-12 text-4xl">Education</h2>
				<p className="mb-6">
					I am mostly self-taught, but here are some of the most relevant
					certifications I have achieved:
				</p>

				<Education education={education} />

				<section id="cv-download">
					<h2 className="headline mb-4 mt-12 text-4xl">
						Interested in what I have to offer?
					</h2>

					<p>
						I am happy to have a chat about software engineering field and
						working with me.
					</p>
					<p>
						please contact me via{' '}
						<Link
							href="/contact"
							className="underlined relative border-b-2 border-grey-300 font-bold hover:border-b-0 dark:border-grey-700"
						>
							the contact form
						</Link>
						{/* . I do not appreciate cold calls and will not answer calls from
						numbers I do not recognise. */}
						I will get back to you as soon as possible.
					</p>
					<div className="mt-8 flex justify-start gap-6 items-baseline">
						<Button
							href="/Nirmal-Chandrasiri-2023.pdf"
							download={true}
							className="group flex gap-2 whitespace-nowrap"
						>
							<IconDownload />
							Download My CV
						</Button>

						<Link
							href="/recruiters"
							className="text-sm font-semibold leading-6 text-slate-900 transition-all hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
						>
							{/* Information for recruiters <span aria-hidden="true">→</span> */}
						</Link>
					</div>
				</section>
			</Container>
		</AnimatePage>
	);
};

export default AboutPage;
