import { pgTable, serial, varchar, timestamp, text, real } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const submissions = pgTable("submissions", {
	id: serial().primaryKey().notNull(),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	institution: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }).notNull(),
	course: varchar({ length: 255 }).notNull(),
	level: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const playingWithNeon = pgTable("playing_with_neon", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	value: real(),
});
