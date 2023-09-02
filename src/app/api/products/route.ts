import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";
import { oneProductType } from "@/app/components/utils/SanityDataandTypes";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "here" });
  const sanityData: Array<oneProductType> = [];
  const url = request.nextUrl.searchParams;
  try {
    let prodtype: any = "";
    if (url.has("type")) {
      // console.log('prodtype', prodtype)
      if (url.get("type") !== "") {
        let interType = url.get("type")?.split("--");
        prodtype = interType
          ?.map((item) => `&& productTypes match '${item}'`)
          .join(" ");
      }
    }
    let searchQuery: string | null = "";
    if (url.has("search")) {
      if (url.get("search") !== "") {
        let query = url.get("search");
        searchQuery = `&& productName match '${query}' || description match '${query}'`;
      }
    }

    let slugQuery: string | null = "";
    if (url.has("slug")) {
      if (url.get("slug") !== "") {
        let query = url.get("slug");
        slugQuery = `&& slug.current == '${query}'`;
      }
    }
    // console.log("type", prodtype);
    let response = await client.fetch(
      `*[_type == "products" ${prodtype} ${searchQuery} ${slugQuery}]`
    );
    // console.log(response);
    let apiData = response;
    sanityData.push(...apiData);

    if (url.has("start") || url.has("end")) {
      if (sanityData[Number(url.get("start"))]) {
        let arrProduct = sanityData.slice(
          Number(url.get("start")),
          Number(url.get("end"))
        );
        return NextResponse.json({ arrProduct });
      } else {
        return NextResponse.json({ arrProduct: "Not found" });
      }
    }
    return NextResponse.json({ sanityData });
    // console.log(response)
    return NextResponse.json({ message: response });
  } catch (error) {
    console.log("error", (error as { message: string }).message);
    return NextResponse.json({ Error: error }, { status: 400 });
  }
}
