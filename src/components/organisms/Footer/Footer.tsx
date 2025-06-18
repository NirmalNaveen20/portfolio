import { Container } from '@components/atoms/Container';
import {
	IconGithub,
	IconInstagram,
	IconLinkedin,
	IconX,
} from '@components/atoms/Icons';
import { SocialIcons } from '@components/molecules/SocialIcons';

const Footer = () => {
	return (
		<footer className="mt-8 py-8 md:mt-20">
			<Container className="flex flex-col-reverse gap-4 md:flex-row md:justify-between">
				<span className="text-center md:text-left">
					&copy; {new Date().getFullYear()} Nirmal Chandrasiri
				</span>
				<SocialIcons
					profiles={[
						{
							name: 'Github',
							url: 'https://www.github.com/nirmalnaveen20',
							icon: <IconGithub />,
						},
						{
							name: 'LinkedIn',
							url: 'https://www.linkedin.com/in/nirmal-naveen',
							icon: <IconLinkedin />,
						},
						{
							name: 'Instagram',
							url: 'https://www.instagram.com/jakeherp',
							icon: <IconInstagram />,
						},
						{
							name: 'X.com',
							url: 'https://twitter.com/NirmalNaveen20',
							icon: <IconX />,
						},
						// {
						// 	name: 'Threads',
						// 	url: 'https://www.threads.net/@',
						// 	icon: <IconThreads />,
						// },
						// {
						// 	name: 'Bluesky Social',
						// 	url: 'https://bsky.app/profile/.com',
						// 	icon: <IconBsky />,
						// },
					]}
					className="justify-center md:justify-end"
				/>
			</Container>
		</footer>
	);
};

export { Footer };
