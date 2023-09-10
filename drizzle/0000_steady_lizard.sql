CREATE TABLE IF NOT EXISTS "cart-products" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_uuid" varchar(256) NOT NULL,
	"user_id" integer NOT NULL,
	"price" integer,
	"quantity" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"phone" varchar(256),
	"email" varchar(256),
	"clerkid" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerkid_unique" UNIQUE("clerkid")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart-products" ADD CONSTRAINT "cart-products_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
