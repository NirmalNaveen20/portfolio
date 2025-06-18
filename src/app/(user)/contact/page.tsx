import { AnimatePage } from '@components/atoms/AnimatePage';
import { Container } from '@components/atoms/Container';
import { ContactForm } from '@components/molecules/ContactForm';

export const metadata = {
	title: 'Contact Nirmal',
	description: 'Contact Nirmal Chandrasiri',
};

const ContactPage = () => {
	return (
		<AnimatePage>
			<Container>
				<h1 className="headline mt-8 text-3xl md:text-5xl lg:text-6xl">
					Contact
				</h1>

				<ContactForm />
			</Container>
		</AnimatePage>
	);
};

export default ContactPage;
