import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { blahajsTable } from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ url }) => {
	const blahajuuid = url.searchParams.get('uuid');
	let blahaj;
	try {
		if (blahajuuid) {
			blahaj = await db.select().from(blahajsTable).where(eq(blahajsTable.uuid, blahajuuid));
		} else {
			return json({ ok: false, message: 'UUID param is missing' }, {status: 400});
		}
	} catch (err) {
		console.error(err) // this probably doesn't do anything but whatever
		return json({ ok: false, message: `An error occurred on the server, verify the UUID is correct` }, { status: 500 });
	}
	if (blahaj.length > 0) {
		return json(blahaj[0]);
	} else {
		return json({ ok: false, message: 'No blahaj for this uuid lol' }, { status: 400 });
	}
};

export const POST: RequestHandler = async({ request }) => {
	const body = await request.json();
	await db.insert(blahajsTable).values(body);
	return json({ ok: true, message: "success" });
};