import { pgTable, serial, integer, varchar, date, json, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', { id: serial('id').primaryKey(), age: integer('age') });

export const blahajsTable = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(), // the id
	name: varchar({ length: 255 }).notNull(), // the name of the haj
	date: date(), // the date the blahaj was adopted
	size: varchar({ length: 255 }).notNull(), // the size of the haj
	modifications: json(), // if it was modified in any way and how/what
	location: json(), // where the blahaj was adopted
	description: text()
});
