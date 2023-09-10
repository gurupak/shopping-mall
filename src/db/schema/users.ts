import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar, integer, timestamp, AnyPgColumn } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  phone: varchar("phone", { length: 256 }),
  email: varchar("email", { length: 256 }),
  clerkid: text("clerkid").unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

export const userRelations = relations(users, ({ many }) => ({
  cartproducts: many(cartproducts),
}));

export const cartproducts = pgTable("cart-products", {
  id: serial("id").primaryKey(),
  productUuid: varchar("product_uuid", { length: 256 }).notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  price: integer("price"),
  quantity: integer("quantity"),
});

export const cartProductsRelation = relations(cartproducts, ({ one }) => ({
  user: one(users, {
    fields: [cartproducts.userId],
    references: [users.id],
  }),
}));

export type CartProduct = typeof cartproducts.$inferSelect; // return type when queried
export type NewCartProduct = typeof cartproducts.$inferInsert; // insert type
