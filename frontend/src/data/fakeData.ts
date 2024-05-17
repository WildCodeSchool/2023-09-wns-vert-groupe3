//TEST DATA FOR CardProductRentAvailabilityViewer
export const PAGE_INFORMATIONS = {
  concurrency: "EUR",
};
export const PRODUCT_INFORMATION = {
  title: "Product title",
  tags: ["Tag text", "Tag text"],
  description: "All item description and can't be more than this",
  price: {
    base: 33,
    additionalPerDay: 1.5,
  },
  priceInfo: "+ Item info, item info",
};
export const PRODUCT_UNAVAILABLE_DATES = [
  new Date(Date.parse("2024-05-14")),
  new Date(Date.parse("2024-05-18")),
  new Date(Date.parse("2024-05-22")),
  new Date(Date.parse("2024-05-23")),
  new Date(Date.parse("2024-05-24")),
  new Date(Date.parse("2024-05-25")),
];
