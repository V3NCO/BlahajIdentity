import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '$lib/server/db';
import { env } from '$env/dynamic/private';

export async function runMigrationsOnBoot() {
	if (env.DANGER_RUN_MIGRATIONS_ON_BOOT === 'y') {
		console.log('Running database migrations...');
		try {
			// Execute migrations
			await migrate(db, { migrationsFolder: 'drizzle' });
			console.log('Migrations completed successfully.');
		} catch (migrationError) {
			console.error('Migration failed or already applied:', migrationError);
		}
	} else {
		console.log('Migration skipped: ENV flag is not set.');
	}
}
