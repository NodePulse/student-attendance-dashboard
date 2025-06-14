import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const GRADES = pgTable("grades", {
  id: serial("id").primaryKey(),
  grade: varchar("grade", { length: 10 }).notNull(),
});

export const STUDENTS = pgTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  grade: varchar("grade", { length: 10 }).notNull(),
  address: varchar("address", { length: 50 }).notNull(),
  contact: varchar("contact", { length: 10 }).notNull(),
});

export const ATTENDANCE = pgTable("attendance", {
  id: serial("id").primaryKey(),
  studentId: serial("studentId").notNull(),
  status: boolean("status").default(false),
  day: integer("day").notNull(),
  date: varchar("date", { length: 20 }).notNull(),
});
