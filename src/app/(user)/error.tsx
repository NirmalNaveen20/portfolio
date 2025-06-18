'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@components/templates/ErrorFallback';
import * as Sentry from '@sentry/nextjs';
import { NextPageContext } from 'next';

interface ErrorProps {
	error: {
		message: string;
		status: number;
	};
	reset: () => void;
}

const Error = (props: ErrorProps) => {
	useEffect(() => {
		Sentry.captureUnderscoreErrorException(props as unknown as NextPageContext);
	}, [props]);

	return <ErrorFallback error={props?.error} reset={props?.reset} />;
};

export default Error;
