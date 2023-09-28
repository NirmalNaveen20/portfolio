/* eslint-disable prettier/prettier */
import { AnimatePage } from '@components/atoms/AnimatePage';
import { Container } from '@components/atoms/Container';
import { Service } from '@components/atoms/Service/Service';
import { HeroSection } from '@components/molecules/HeroSection/HeroSection';

import { sanityClient } from '@lib/sanity';

import { servicesQuery } from '@queries/services';

import LogoAWS from '@root/public/assets/tools/aws.svg';
import LogoGitLab from '@root/public/assets/tools/gitlab.svg';
import LogoSanity from '@root/public/assets/tools/sanity.svg';
import LogoVercel from '@root/public/assets/tools/vercel.svg';
import LogoVisual from '@root/public/assets/tools/visual-studio.svg';
import LogoDocker from '@root/public/assets/tools/docker.svg';

import type { Service as ServiceType } from '@types';

const getData = async () => {
	const services: ServiceType[] = await sanityClient.fetch(servicesQuery);

	return { services };
};

export const metadata = {
	title: 'Nirmal Naveen',
	description:
		'A Software Engineer with a focus on frontend and DevOps engineering. I have more than 4 years experience working in software engineering and consulting.',
	keywords: [
		'Software Engineer',
		'Nirmal Naveen',
		'Nirmal SLIIT',
		'Sliit',
		'Devops Engineer Sri Lanka',
		'DevOps Engineering',
		'ReactJs',
		'JavaScript',
		'Nirmal Chandrasiri',
		'Nirmal sliit',
		'nirmal software engineer',
		'nirmal naveen devops engineer'
	],
};

const HomePage = async () => {
	const { services } = await getData();

	return (
		<AnimatePage>
			<HeroSection />
			{/* <section id="tools" className="my-40"> */}
				{/* <Container> */}
					{/* <h2 className="headline mt-24 text-center text-xl md:text-2xl lg:text-3xl">
						Some of my favourite tools
					</h2> */}

					{/* <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-16 gap-y-8"> */}
						{/* <LogoSanity className="w-32 md:w-40" aria-label="Sanity" />
						<LogoVercel className="w-32 md:w-36" aria-label="Vercel" />
						<LogoAWS className="w-32 md:w-36" aria-label="GitHub" />
						<LogoVisual className="w-32 md:w-36" aria-label="Visual-Studio" />
						<LogoDocker className="w-32 md:w-36" aria-label="Visual-Studio" />
						<LogoGitLab className="w-32 md:w-36" aria-label="GitLab" /> */}
					{/* </div> */}
				{/* </Container> */}
			{/* </section> */}
			<section id="services">
				<Container>
					<h2 className="headline mt-20 text-2xl md:text-4xl lg:text-5xl">
						Preferred Development Focus
						<span className="mt-2 block text-xl font-bold text-off-black dark:text-off-white md:text-2xl">
							As a software solutions architect with a passion for creating web applications and apply devops methodologies
						</span>
					</h2>

					{services.map((service, i) => (
						<Service key={service.slug} {...service} isReversed={i % 2 !== 0} />
					))}
				</Container>
			</section>
		</AnimatePage>
	);
};

export default HomePage;
