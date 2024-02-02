interface CurrencyExchangeRates {
  EUR: number;
  USD: number;
  GBP: number;
  JPY: number;
}
interface CurrencyConverter {
  in: (targetCurrency: keyof CurrencyExchangeRates) => CurrencyConverted;
}
interface CurrencyConverted {
  value: number;
  valueWithSymbol: string | JSX.Element;
}

/**
 * Converts a value in euros to a target currency.
 * 
 * @param valueInEuros The value in euros to convert.
 * @returns A converter object with an `in` method that takes a target currency and returns the converted value.
 * 
 * @example const converter = convertToCurrency(100);
 * const usdValue = converter.in('USD').withSymbol(); // returns '112 $'
 * const gbpValue = converter.in('GBP').withSymbol(); // returns '85 £'
 * const jpyValue = converter.in('JPY').withSymbol(); // returns '13025 ¥'
 * 
 * @throws {Error} Unsupported target currency: ZZZ
 * 
*/
export function convertToCurrency(valueInEuros: number): CurrencyConverter {
  const exchangeRates: CurrencyExchangeRates = {
    EUR: 1, // 1 EUR = 1 EUR
    USD: 1.12,
    GBP: 0.85,
    JPY: 130.25,
  };

  const converter: CurrencyConverter = {
    in: function (targetCurrency: keyof CurrencyExchangeRates): CurrencyConverted {
      if (!(targetCurrency in exchangeRates)) {
        throw new Error(`Unsupported target currency: ${targetCurrency}`);
      }

      const rate = exchangeRates[targetCurrency];
      const convertedValue = valueInEuros * rate;

      const currencySymbol: Record<keyof CurrencyExchangeRates, string> = {
        EUR: '€',
        USD: '$',
        GBP: '£',
        JPY: '¥',
      };

      const valueWithSymbol = `${convertedValue.toFixed(2)} ${currencySymbol[targetCurrency]}`;
      return { value: convertedValue, valueWithSymbol };
    },
  };

  return converter;
}