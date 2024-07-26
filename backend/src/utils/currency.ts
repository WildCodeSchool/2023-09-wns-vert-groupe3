/**
 * Calculates the total price of a rent bill, including a fixed price and optional variants.
 *
 * @example
 * const bill = new RentBill(100);
 * bill.addDailyPrice(50, 3);
 * bill.addDiscount(20);
 * bill.addVariant("Protection accident", 30);
 * bill.getTotal(); // returns 210
 *
 *
 * @export
 * @class RentBill
 */
export class RentBill {
  private prices: {
    fixed: number;
    daily?: {
      total: number;
      days: number;
    };
  };
  private discountPercent: number | null = null;
  private variants: { name: string; price: number }[] = [];

  /**
   * Creates a new Bill instance with the specified fixed price.
   * @param fixedPrice The fixed price of the bill.
   */
  constructor(fixedPrice: number) {
    this.prices = { fixed: fixedPrice };
  }

  /**
   * Add daily price to the bill
   * @param dailyPrice The daily price of the bill.
   */
  addDailyPrice(dailyPrice: number, days: number) {
    this.prices.daily = { total: dailyPrice * days, days };
  }

  /**
   * Add discount in percentage to the bill
   * @param discountPercent The discount percentage of the bill.
   */
  addDiscount(discountPercent: number) {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error("Discount percentage must be between 0 and 100");
    }

    this.discountPercent = discountPercent;
  }

  /**
   * Adds a variant to the bill with the specified name and price.
   * @param name The name of the variant.
   * @param price The price of the variant.
   */
  addVariant(name: string, price: number) {
    this.variants.push({ name, price });
  }

  /**
   * Calculates and returns the total price of the bill, including the fixed price and all variants.
   * @returns The total price of the bill.
   */
  getTotal() {
    let total = this.prices.fixed;

    // Add daily price if available
    if (this.prices.daily) total += this.prices.daily.total;

    // Apply discount if available
    if (this.discountPercent && this.prices.daily)
      total -= this.prices.daily.total * (this.discountPercent / 100);

    // Add the price of each variant
    total += this.variants.reduce((acc, variant) => acc + variant.price, 0);

    return total;
  }
}
