//TEST DATA FOR CardProductRentAvailabilityViewer
export const PAGE_INFORMATIONS = {
  concurrency: "EUR"
};
export const PRODUCT_INFORMATION = {
  title: "Product title",
  tags: ["Tag text", "Tag text"],
  description: "All item description and can't be more than this",
  price: {
    base: 33,
    additionalPerDay: 1.5
  },
  priceInfo: "+ Item info, item info"
};
export const USER_REQUESTED_RENT_DATES = {
  start: new Date(Date.parse("2024-02-01")),
  end: new Date(Date.parse("2024-02-05"))
};
export const PRODUCT_UNAVAILABLE_DATES = [
  new Date(Date.parse("2024-02-09")),
  new Date(Date.parse("2024-02-10")),
  new Date(Date.parse("2024-02-11")),
  new Date(Date.parse("2024-02-12")),
  new Date(Date.parse("2024-02-16")),
  new Date(Date.parse("2024-02-17")),
  new Date(Date.parse("2024-02-18")),
  new Date(Date.parse("2024-02-19")),
];