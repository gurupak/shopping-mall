import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/components/lib/drizzle";
import { User, NewUser, CartProduct, NewCartProduct } from "@/db/schema/users";
import { users, cartproducts } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const data = request.nextUrl.searchParams;
  // console.log(data);
  try {
    let cartAllData: any;
    if (data.has("clerkid")) {
      let id: string = data.get("clerkid") as string;
      cartAllData = await db
        .select()
        .from(users)
        .leftJoin(cartproducts, eq(users.id, cartproducts.userId))
        .where(eq(users.clerkid, id));
    } else {
      cartAllData = await db
        .select()
        .from(users)
        .leftJoin(cartproducts, eq(users.id, cartproducts.userId));
    }
    return NextResponse.json({ cartAllData }, { status: 200 });
  } catch (error) {
    console.log("error: ", (error as { message: string }).message);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const url = await request.json();
  console.log(url);
  // return NextResponse.json({ url }, { status: 200 });
  try {
    let userid: any;
    if ((url.name && url.clerkid && url.email) || url.phone) {
      userid = await db
        .insert(users)
        .values({
          name: url.name,
          phone: url.phone,
          clerkid: url.clerkid,
          email: url.email,
        })
        .returning({ userid: users.id });
      return NextResponse.json(
        {
          message: "Record inserted",
          id: url.id ? url.id : userid[0].userid,
        },
        { status: 200 }
      );
    }
    if (url.uuid && url.quantity && url.price && url.id) {
      userid = await db.insert(cartproducts).values({
        userId: url.id,
        productUuid: url.uuid,
        price: url.price,
        quantity: url.quantity,
      });
      return NextResponse.json(
        { message: "Record inserted", id: url.id ? url.id : userid[0].userid },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 401 }
      );
      throw Error("missing required fields");
    }
  } catch (error) {
    console.log("error: ", (error as { message: string }).message);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const url = await request.json();
  // console.log(url.name);
  // return NextResponse.json({ url }, { status: 200 });
  try {
    let userid: any;
    if ((url.name && url.id && url.clerkid && url.email) || url.phone) {
      userid = await db
        .update(users)
        .set({
          name: url.name,
          phone: url.phone,
          email: url.email,
          clerkid: url.clerkid,
        })
        .where(eq(users.id, url.id))
        .returning({ userid: users.id });
      return NextResponse.json(
        { message: "Record updated", id: userid[0].userid },
        { status: 200 }
      );
    }
    if (url.uuid && url.quantity && url.price && url.cartid) {
      userid = await db
        .update(cartproducts)
        .set({
          productUuid: url.uuid,
          price: url.price,
          quantity: url.quantity,
        })
        .where(eq(cartproducts.id, url.cartid))
        .returning({ userid: cartproducts.userId });
      return NextResponse.json(
        { message: "Record updated", id: userid[0].userid },
        { status: 200 }
      );
    }
    if (url.clerkid && url.usrid) {
      console.log("clerk");
      userid = await db
        .update(cartproducts)
        .set({
          userId: url.clerkid,
        })
        .where(eq(cartproducts.userId, url.usrid))
        .returning({ userid: cartproducts.id });
      return NextResponse.json(
        { message: "Record updated", id: userid[0].userId },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 401 }
      );
      throw Error("missing required fields");
    }
  } catch (error) {
    console.log("error: ", (error as { message: string }).message);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const url = await request.json();
  // console.log(url.name);
  // return NextResponse.json({ url }, { status: 200 });
  console.log("cartid", url.cartid);
  try {
    let userid: any = 0;
    if (url.id) {
      userid = await db
        .delete(users)
        .where(eq(users.id, url.id))
        .returning({ userid: users.id });
      return NextResponse.json(
        { message: "Record deleted", id: userid.rowCount },
        { status: 200 }
      );
    }
    if (url.cartid) {
      userid = await db
        .delete(cartproducts)
        .where(eq(cartproducts.id, url.cartid));
      return NextResponse.json(
        { message: "Record deleted", id: userid.rowCount },
        { status: 200 }
      );
    }
    if (url.userid) {
      userid = await db
        .delete(cartproducts)
        .where(eq(cartproducts.userId, url.userid));
      return NextResponse.json(
        { message: "Record deleted", id: userid.rowCount },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("error: ", (error as { message: string }).message);
    return NextResponse.json({ error }, { status: 400 });
  }
}
