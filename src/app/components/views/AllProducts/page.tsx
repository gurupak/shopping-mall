"use client";
import React, { Component } from "react";
import { oneProductType } from "../../utils/SanityDataandTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import BAST_PATH_API from "../../shared/BasePath";
import Card from "../Card";
import Heading from "../Heading";

interface propsType {
  arrProduct: Array<oneProductType>;
}
interface propsHeading {
  headingData: string;
}
interface propsDetails {
  detailsData: string;
}

export class AllProducts extends Component<{
  ProductData: propsType;
  headingData: string;
  detailsData: string;
  slug: any;
  type: any;
}> {
  start: number = 10;
  end: number = 20;
  state: { items: Array<oneProductType>; hasMore: boolean } = {
    items: [...this.props.ProductData.arrProduct],
    hasMore: true,
  };

  fetchDataFromApi = async (start: number, end: number, slug: any, type: string) => {
    let queryFilter: string = "";
    let searchFilter: string = "";
    if(type === 'product'){
      if (slug === undefined || slug === "") {
        console.log("all products");
      } else {
        // console.log(Array.isArray(slug));
        if (Array.isArray(slug)) {
          queryFilter = `&type=${slug.join("--")}`;
        } else {
          queryFilter = "";
        }
      }
    }
    if(type ==='search'){
      searchFilter = `&search=${slug}`
    }
    console.log(queryFilter);
    let data = await fetch(
      `${BAST_PATH_API}/api/products?start=${start}&end=${end}${queryFilter}${searchFilter}`,
      { cache: "no-store" }
    );
    const checkData = await data.json();
    console.log(checkData);
    if (checkData.arrProduct === "Not found") {
      this.setState({ hasMore: false });
    }
    return checkData;
  };
  getData = async () => {
    let allData = await this.fetchDataFromApi(
      this.start,
      this.end,
      this.props.slug,
      this.props.type,
    );
    if (allData.arrProduct !== "Not found") {
      this.setState({
        items: this.state.items.concat(allData.arrProduct),
      });
    } else {
      this.setState({ hasMore: false });
    }
    this.start = this.start + 10;
    this.end = this.end + 10;
  };
  render() {
    return (
      <div className="pt-14">
        <Heading
          details={this.props.detailsData}
          heading={this.props.headingData}
        />
        <InfiniteScroll
          dataLength={this.state.items.length} //This is important field to render the next data
          next={this.getData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <div style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </div>
          }
          // below props only if you need pull down functionality
          // refreshFunction={this.refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          // }
          className="grid grid-cols-1 content-center place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {this.state.items.map((item: oneProductType, index: number) => (
            <Card key={index} data={item} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default AllProducts;
