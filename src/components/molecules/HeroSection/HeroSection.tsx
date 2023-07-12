import { TypeWriter } from '@components/atoms/TypeWriter';

import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
	const talkAbout = [
		'AWS',
		'Azure',
		'Docker',
		'Kubernetes',
		'GitHub Actions',
		'GitLab',
		'Jenkins',
		'JavaScript',
		'HTML',
		'CSS',
		'React.js',
		'Next.js',
	];

	return (
		<section id="hero" className="relative isolate overflow-hidden pt-14">
			<div className="bg-gradient-from-t absolute inset-x-0 bottom-0 -z-10 h-24 from-off-white dark:from-slate-950 sm:h-32" />
			<div
				className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] dark:shadow-slate-700 sm:-mr-80 lg:-mr-96 lg:shadow-xl"
				aria-hidden="true"
			/>
			<div className="mx-auto max-w-7xl px-6 lg:px-8 lg:py-32">
				<div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
					<h1 className="headline max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl lg:col-span-2 xl:col-auto">
						Hey, I&apos;m Nirmal Naveen
					</h1>
					<div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
						<p className="text-lg leading-8 text-slate-600 dark:text-off-white">
							I am a passionate DevOps Engineer and frontend developer with a
							proven track record of success in delivering high-quality
							software. I am skilled in all aspects of the software development
							lifecycle, from conception to deployment. I am particularly
							interested in the intersection of DevOps and frontend development,
							and I am always looking for ways to improve the efficiency and
							reliability of software delivery.
							<br />
							You can talk to me about <TypeWriter strings={talkAbout} />.
						</p>
						{/* <p className="text-lg leading-8 text-slate-600 dark:text-off-white">
							P.S. this website is open-source and available on{' '}
							<a
								href="https://github.com/nirmalnaveen20/portfolio"
								title="Link to Github repository"
								target="_blank"
								rel="noopener noreferrer"
								className="underlined relative border-b-2 border-grey-300 font-bold hover:border-b-0 dark:border-grey-700"
							>
								Github
							</a>
							.
						</p> */}
						<div className="mt-10 flex items-center gap-x-6">
							<Link
								href="/contact"
								className="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
							>
								Get in touch
							</Link>
							<Link
								href="/about"
								className="text-sm font-semibold leading-6 text-slate-900 transition-all hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
							>
								Read more about me<span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
					<Image
						src="/assets/nirmal.jpg"
						alt="Photo of Nirmal Naveen"
						height={300}
						width={450}
						loading="eager"
						className="mt-10 aspect-[6/5] max-w-full rounded-2xl object-cover sm:mt-16 lg:ml-20 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
					/>
				</div>
			</div>
			<div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-off-white dark:from-slate-950 sm:h-32" />
		</section>
	);
};
