import { Container } from '@components/atoms/Container';
import {
	IconGithub,
	IconInstagram,
	IconLinkedin,
	IconTwitter,
} from '@components/atoms/Icons';
import { SocialIcons } from '@components/molecules/SocialIcons';

const Footer = () => {
	return (
		<footer className="mt-8 py-8 md:mt-20">
			<Container className="flex justify-between">
				<span>&copy; {new Date().getFullYear()} Nirmal Naveen</span>
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
					]}
				/>
			</Container>
		</footer>
	);
};

export { Footer };
