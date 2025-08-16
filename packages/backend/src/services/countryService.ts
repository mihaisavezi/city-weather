import { z } from 'zod';

const RestCountriesResponseSchema = z.array(
  z.object({
    cca2: z.string(),
    cca3: z.string(),
    currencies: z
      .record(
        z.object({
          name: z.string(),
          symbol: z.string().optional(),
        })
      )
      .optional(),
  })
);

export interface CountryInfo {
  countryCode2: string;
  countryCode3: string;
  currencyCode?: string;
}

export async function getCountryInfo(
  countryName: string
): Promise<CountryInfo | null> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
    );

    if (!response.ok) {
      throw new Error(`Country API error: ${response.status}`);
    }

    const data = await response.json();
    const countries = RestCountriesResponseSchema.parse(data);

    if (countries.length === 0) return null;

    const country = countries[0];
    const currencyCode = country.currencies
      ? Object.keys(country.currencies)[0]
      : undefined;

    return {
      countryCode2: country.cca2,
      countryCode3: country.cca3,
      currencyCode,
    };
  } catch (error) {
    console.error('Error fetching country info:', error);
    return null;
  }
}
