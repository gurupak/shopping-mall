import { UserProfile } from "@clerk/nextjs";
import { db } from "@/app/components/lib/drizzle";
import { users } from "@/db/schema/users";
import { cartproducts } from "@/db/schema/users";
import { eq } from "drizzle-orm";

const Profile = async () => {
  const usersData = await db.select().from(users).leftJoin(cartproducts, eq(users.id, cartproducts.userId));
  console.log('user data:', usersData)
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default Profile;
