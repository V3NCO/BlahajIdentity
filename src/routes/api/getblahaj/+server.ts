import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import {}
import type { RequestHandler } from './$types';
import { blahajsTable } from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ url }) => {
	const blahajuuid = url.searchParams.get('uuid');
	try {
		const blahaj = await db.select().from(blahajsTable).where(eq(blahajsTable.uuid, blahajuuid));
	} catch ()
	if (blahaj.length > 0) {
		return json(blahaj[0]);
	} else {
		return json({status: 204, message: 'No blahaj for this uuid lol'});
	}

};
