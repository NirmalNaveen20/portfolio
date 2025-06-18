import { AnimatePage } from '@components/atoms/AnimatePage';
import { Container } from '@components/atoms/Container';
import { Service } from '@components/atoms/Service/Service';
import { HeroSection } from '@components/molecules/HeroSection/HeroSection';

import { sanityClient } from '@lib/sanity';

import { servicesQuery } from '@queries/services';

import type { Service as ServiceType } from '@types';

const getData = async () => {
	const services: ServiceType[] = await sanityClient.fetch(servicesQuery);

	return { services };
};

export const metadata = {
	title: 'Nirmal Chandrasiri',
	description:
		'A DevOps Engineer with a strong focus on cloud monitoring, automation, and observability. With hands-on experience in Datadog, Terraform, and Python. Passionate about building scalable and reliable systems in cloud environments.',
	keywords: [
		'Ansible',
		'Azure DevOps',
		'Bitbucket ',
		'Docker',
		'Kubernetes',
		'Elastic Stack (ELK)',
		'Git',
		'GitHub Actions',
		'JavaScript',
		'Grafana',
		'Helm',
		'Prometheus',
		'Linux',
		'Python',
		'Terraform',
		'Argo CD',
		'Istio',
	],
};

const HomePage = async () => {
	const { services } = await getData();

	return (
		<AnimatePage>
			<HeroSection />
			{/* <section id="tools" className="my-40">
				<Container>
					<h2 className="headline mt-24 text-center text-xl md:text-2xl lg:text-3xl">
						Some of my favourite tools
					</h2>

					<div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-16 gap-y-8">
						<LogoNext className="w-32" aria-label="" />
						<LogoSvelte className="w-12" aria-label="" />
						<LogoHygraph className="w-28 md:w-36" aria-label="" />
						<LogoSanity className="w-32 md:w-40" aria-label="" />
						<LogoStorybook className="w-32 md:w-40" aria-label="" />
						<LogoGraphql className="w-28 md:w-36" aria-label="" />
						<LogoVercel className="w-32 md:w-36" aria-label="" />
						<LogoFigma className="w-8" aria-label="" />
						<LogoCypress className="w-32 md:w-40" aria-label="" />
					</div>
				</Container>
			</section> */}
			<section id="services">
				<Container>
					<h2 className="headline mt-20 text-2xl md:text-4xl lg:text-5xl">
						Preferred Focus
						<span className="mt-2 block text-xl font-bold text-off-black dark:text-off-white md:text-2xl">
							Passionate about cloud automation, observability, and streamlining
							developer workflows using DevOps methodologies.
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
