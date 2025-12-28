import { pgTable, integer, varchar, date, json, text, real, uuid } from 'drizzle-orm/pg-core';

export const blahajsTable = pgTable('blahajs', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(), // the primary key
	uuid: uuid(), // the profile id
	name: varchar({ length: 255 }).notNull(), // the name of the haj
	date: date(), // the date the blahaj was adopted
	size: varchar({ length: 255 }).notNull(), // the size of the haj
	modifications: json(), // if it was modified in any way and how/what
	location: json(), // where the blahaj was adopted
	description: text(),
	pronouns: varchar({ length: 255 }).notNull(), // the blahaj's pronouns!
	gender: varchar({ length: 255 }).notNull(), // the blahaj's gender!
	floof: integer(), // level of floofiness on a scale of 1-10 (stars with halves)
	squish: integer(), // The level of squishiness on a scale of 1-10 (stars with halves)
	lastwashed: date(), // last time the haj has been washed
	mloftearsabsorbed: real() //i want to make this an easter egg
});

// Custom fields are an afterthought, I will implement them, but in an overengineered way because its funny
// I could do it through a simple custom: json() field but no