import { RecruiterForm } from '../RecruiterForm';

import { render } from '@testing-library/react';

jest.spyOn(console, 'error').mockImplementation(jest.fn);

describe('RecruiterForm', () => {
	it('renders correctly', () => {
		const { container } = render(<RecruiterForm />);
		expect(container).toMatchSnapshot();
	});
});
