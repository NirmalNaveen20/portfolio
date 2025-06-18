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

import type { Education as EducationType, Job, Podcast } from '@types';
import Link from 'next/link';

export const metadata = {
	title: 'About Nirmal',
	description:
		'As a passionate DevOps Engineer, I build impactful projects and manage cloud infrastructure to drive operational excellence and support business growth.',
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
					Hello, I&apos;m Nirmal Chandrasiri
				</h1>
				<h2 className="mt-2 text-xl font-bold md:text-2xl">
					Cloud & DevOps Engineer
				</h2>
				<p className="mt-8">
					Passionate about DevOps & Cloud Engineering , I am constantly driven
					to learn and expand my skillset. advocate for web performance and
					accessibility as well as web experiences while ensuring efficient and
					smooth deployment process.
				</p>
				<p className="my-4"></p>
				<p>
					When I&apos;m not busy working with projects, I love spending time
					with my family and friends, creating special memories with them. Also,
					I enjoy playing chess ♔ and listening to music I prefer calming tunes
					and energetic beats 🎶 Music and It&apos;s makes my day better. I
					think it&apos;s important to balance different interests for my
					personal growth and happiness 😊 activity brings something special to
					my life, and I&apos;m thankful to lots of things I enjoy doing 😄
				</p>
				<h2 className="headline mb-4 mt-12 text-4xl">
					Certification Highlights
				</h2>

				<PodcastList podcasts={podcasts} />

				<h2 className="headline mb-4 mt-12 text-4xl">Experience</h2>

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
						I am happy to have a chat about relevant projects to work on. Below
						you find a download link for my up-to-date CV. Are you a recruiter?
						Have a read through my recruiters page, where I explain what I am
						looking for in a job. This page is designed to save both of us time.
					</p>
					<p>
						If you are interested in working with me, please contact me via{' '}
						<Link
							href="/contact"
							className="underlined relative border-b-2 border-grey-300 font-bold hover:border-b-0 dark:border-grey-700"
						>
							the contact form
						</Link>
						. I do not appreciate cold calls and will not answer calls from
						numbers I do not recognise.
					</p>

					<div className="mt-8 flex items-baseline justify-start gap-6">
						<Button
							href="/cv-2024.pdf"
							className="group flex gap-2 whitespace-nowrap"
							download
						>
							<IconDownload />
							Download my CV
						</Button>

						{/* <Link
							href="/recruiters"
							className="text-sm font-semibold leading-6 text-slate-900 transition-all hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
						>
							Information for recruiters <span aria-hidden="true">→</span>
						</Link> */}
					</div>
				</section>
			</Container>
		</AnimatePage>
	);
};

export default AboutPage;
