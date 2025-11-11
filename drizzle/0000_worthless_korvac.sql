CREATE TABLE "submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"institution" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"course" varchar(255) NOT NULL,
	"level" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
