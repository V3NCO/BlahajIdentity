import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { blahajsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	while (true) {
		const uuid = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
			(+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
		);
		const blahaj = await db.select().from(blahajsTable).where(eq(blahajsTable.uuid, uuid));
		if (blahaj.length === 0) {
			return json({uuid: uuid});
		}
	}
};