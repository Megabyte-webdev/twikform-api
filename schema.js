// db/schema.ts
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  institution: varchar("institution", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  course: varchar("course", { length: 255 }).notNull(),
  level: varchar("level", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
