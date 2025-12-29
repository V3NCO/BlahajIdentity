import type { Handle } from '@sveltejs/kit';
import { runMigrationsOnBoot } from '$lib/migrations';

runMigrationsOnBoot().catch((error) => {
	console.error('Migration boot error:', error);
});

export const handle: Handle = async ({ event, resolve }) => {
	// Add any app-wide middleware logic here (if needed)
	const response = await resolve(event);
	return response;
};