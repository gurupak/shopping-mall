export default {
  name: "products",
  type: "document",
  title: "Products",
  fields: [
    { name: "productName", type: "string", title: "Product Name" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "productName",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "description",
      type: "array",
      title: "Description",
      of: [{ type: "block" }],
    },
    {
      name: "productcare",
      type: "array",
      title: "Product Care",
      of: [{ type: "block" }],
    },

    {
      name: "image",
      type: "array",
      title: "Image",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "text",
              title: "Alternateive text",
            },
          ],
        },
      ],
    },
    {
      name: "productTypes",
      type: "array",
      title: "Product Type",
      of: [{ type: "string" }],
    },
    {
      name: "listedDate",
      type: "datetime",
      title: "List Date",
    },
    {
      name: "size",
      type: "array",
      title: "Sizes",
      of: [{ type: "string" }],
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "quantity",
      type: "number",
      title: "Quantity",
    },
  ],
};
