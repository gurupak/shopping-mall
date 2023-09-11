import { makeImgUrl } from "@/app/components/lib/sanity-image-builder";
import BAST_PATH_API from "@/app/components/shared/BasePath";
import {
  oneProductType,
  responseType,
} from "@/app/components/utils/SanityDataandTypes";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function GetAllProducts() {
  const response = await fetch(`${BAST_PATH_API}/api/products`);
  const data = await response.json();
  return data;
}

export async function POST(request: NextRequest) {
  let item = await request.json();
  const redirectURL = `${BAST_PATH_API}/success`;

  const allData: responseType = await GetAllProducts();

  const lineItemToSend = allData.message.filter((subItem: oneProductType) => {
    // console.log("sub", item);
    return item.some((element: any) => {
      return subItem._id.includes(element["cart-products"].productUuid);
    });
  });

  console.log("line", lineItemToSend);
  let qtyitem = 0;
  for (let index = 0; index < lineItemToSend.length; index++) {
    qtyitem = 0;
    const element = lineItemToSend[index];
    item.forEach((item: any) => {
      if (item["cart-products"].productUuid === element._id) {
        qtyitem = qtyitem + item["cart-products"].quantity;
      }
    });
    element.quantity = qtyitem;
  }
  function getQty(id: number | undefined) {
    let qty = 0;

    item.forEach((item: any) => {
      // console.log(id)
      if (item["cart-products"].id === id) {
        qty = item.quantity;
      }
    });
    return qty;
  }
  let transformedItem = lineItemToSend.map((item: oneProductType) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productName,
        images: [makeImgUrl(item.image[0]).url()],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));
  // console.log("line", ...transformedItem);
  // const transformedItem = {
  //   price_data: {
  //     currency: "usd",
  //     product_data: {
  //       name: "T-shirt",
  //       images: {
  //         "0": "https://cdn.sanity.io/images/zmhdgih1/production/a6a38f6a1f31dafe5f3294a4384f865b7d25a344-370x394.png",
  //       },
  //     },
  //     unit_amount: 2000,
  //   },
  //   quantity: 1,
  // };
  console.log(...transformedItem)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [...transformedItem],
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images:
      "https://cdn.sanity.io/images/zmhdgih1/production/a6a38f6a1f31dafe5f3294a4384f865b7d25a344-370x394.png",
    },
  });
  // console.log("sess", session.id);
  return NextResponse.json({ id: session.id });
  //   const transformedItem = {
  //     price_data: {
  //       currency: "usd",
  //       product_data: {
  //         images: [item.image],
  //         name: item.name,
  //       },
  //       unit_amount: item.price * 100,
  //     },
  //     description: item.description,
  //     quantity: item.quantity,
  //   };

  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ["card"],
  //     line_items: [transformedItem],
  //     mode: "payment",
  //     success_url: redirectURL + "?status=success",
  //     cancel_url: redirectURL + "?status=cancel",
  //     metadata: {
  //       images: item.image,
  //     },
  //   });

  //   return NextResponse.json({ id: session.id });
}
