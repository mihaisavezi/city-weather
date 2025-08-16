import { db } from '../db.js';
import { cities } from '../schema.js';
import { createId } from '@paralleldrive/cuid2';

// Generate a large dataset of cities
const generateCities = () => {
  const majorWorldCities = [
    // North America
    { name: 'New York', state: 'New York', country: 'United States', touristRating: 5, dateEstablished: '1624-01-01T00:00:00.000Z', estimatedPopulation: 8419000 },
    { name: 'Los Angeles', state: 'California', country: 'United States', touristRating: 5, dateEstablished: '1781-04-04T00:00:00.000Z', estimatedPopulation: 3979000 },
    { name: 'Chicago', state: 'Illinois', country: 'United States', touristRating: 4, dateEstablished: '1833-03-04T00:00:00.000Z', estimatedPopulation: 2746000 },
    { name: 'Houston', state: 'Texas', country: 'United States', touristRating: 4, dateEstablished: '1836-06-05T00:00:00.000Z', estimatedPopulation: 2305000 },
    { name: 'Phoenix', state: 'Arizona', country: 'United States', touristRating: 4, dateEstablished: '1881-02-25T00:00:00.000Z', estimatedPopulation: 1608000 },
    { name: 'Philadelphia', state: 'Pennsylvania', country: 'United States', touristRating: 4, dateEstablished: '1682-10-26T00:00:00.000Z', estimatedPopulation: 1584000 },
    { name: 'San Antonio', state: 'Texas', country: 'United States', touristRating: 4, dateEstablished: '1718-05-01T00:00:00.000Z', estimatedPopulation: 1435000 },
    { name: 'San Diego', state: 'California', country: 'United States', touristRating: 5, dateEstablished: '1769-07-16T00:00:00.000Z', estimatedPopulation: 1387000 },
    { name: 'Dallas', state: 'Texas', country: 'United States', touristRating: 4, dateEstablished: '1841-02-02T00:00:00.000Z', estimatedPopulation: 1304000 },
    { name: 'San Jose', state: 'California', country: 'United States', touristRating: 4, dateEstablished: '1777-08-29T00:00:00.000Z', estimatedPopulation: 1014000 },
    { name: 'Toronto', state: 'Ontario', country: 'Canada', touristRating: 5, dateEstablished: '1793-01-01T00:00:00.000Z', estimatedPopulation: 2930000 },
    { name: 'Montreal', state: 'Quebec', country: 'Canada', touristRating: 5, dateEstablished: '1642-01-01T00:00:00.000Z', estimatedPopulation: 1780000 },
    { name: 'Vancouver', state: 'British Columbia', country: 'Canada', touristRating: 5, dateEstablished: '1886-04-06T00:00:00.000Z', estimatedPopulation: 675000 },
    { name: 'Mexico City', state: 'Mexico City', country: 'Mexico', touristRating: 4, dateEstablished: '1325-01-01T00:00:00.000Z', estimatedPopulation: 9209000 },
    { name: 'Guadalajara', state: 'Jalisco', country: 'Mexico', touristRating: 4, dateEstablished: '1542-02-14T00:00:00.000Z', estimatedPopulation: 1307000 },

    // South America
    { name: 'São Paulo', state: 'São Paulo', country: 'Brazil', touristRating: 4, dateEstablished: '1554-01-25T00:00:00.000Z', estimatedPopulation: 12325000 },
    { name: 'Rio de Janeiro', state: 'Rio de Janeiro', country: 'Brazil', touristRating: 5, dateEstablished: '1565-03-01T00:00:00.000Z', estimatedPopulation: 6719000 },
    { name: 'Buenos Aires', state: 'Buenos Aires', country: 'Argentina', touristRating: 5, dateEstablished: '1536-02-02T00:00:00.000Z', estimatedPopulation: 3054000 },
    { name: 'Lima', state: 'Lima', country: 'Peru', touristRating: 4, dateEstablished: '1535-01-18T00:00:00.000Z', estimatedPopulation: 9675000 },
    { name: 'Bogotá', state: 'Cundinamarca', country: 'Colombia', touristRating: 4, dateEstablished: '1538-08-06T00:00:00.000Z', estimatedPopulation: 7413000 },
    { name: 'Santiago', state: 'Santiago Metropolitan', country: 'Chile', touristRating: 4, dateEstablished: '1541-02-12T00:00:00.000Z', estimatedPopulation: 5545000 },
    { name: 'Caracas', state: 'Caracas', country: 'Venezuela', touristRating: 4, dateEstablished: '1567-07-25T00:00:00.000Z', estimatedPopulation: 2980000 },

    // Europe
    { name: 'London', state: 'England', country: 'United Kingdom', touristRating: 5, dateEstablished: '0043-01-01T00:00:00.000Z', estimatedPopulation: 9648000 },
    { name: 'Paris', state: 'Île-de-France', country: 'France', touristRating: 5, dateEstablished: '-0250-01-01T00:00:00.000Z', estimatedPopulation: 2161000 },
    { name: 'Berlin', state: 'Berlin', country: 'Germany', touristRating: 5, dateEstablished: '1237-01-01T00:00:00.000Z', estimatedPopulation: 3677000 },
    { name: 'Madrid', state: 'Madrid', country: 'Spain', touristRating: 5, dateEstablished: '0865-01-01T00:00:00.000Z', estimatedPopulation: 3223000 },
    { name: 'Rome', state: 'Lazio', country: 'Italy', touristRating: 5, dateEstablished: '-0753-04-21T00:00:00.000Z', estimatedPopulation: 2873000 },
    { name: 'Amsterdam', state: 'North Holland', country: 'Netherlands', touristRating: 5, dateEstablished: '1275-01-01T00:00:00.000Z', estimatedPopulation: 872000 },
    { name: 'Vienna', state: 'Vienna', country: 'Austria', touristRating: 5, dateEstablished: '0001-01-01T00:00:00.000Z', estimatedPopulation: 1965000 },
    { name: 'Prague', state: 'Prague', country: 'Czech Republic', touristRating: 5, dateEstablished: '0870-01-01T00:00:00.000Z', estimatedPopulation: 1309000 },
    { name: 'Athens', state: 'Attica', country: 'Greece', touristRating: 5, dateEstablished: '-3400-01-01T00:00:00.000Z', estimatedPopulation: 664000 },
    { name: 'Stockholm', state: 'Stockholm', country: 'Sweden', touristRating: 5, dateEstablished: '1252-01-01T00:00:00.000Z', estimatedPopulation: 975000 },
    { name: 'Oslo', state: 'Oslo', country: 'Norway', touristRating: 5, dateEstablished: '1040-01-01T00:00:00.000Z', estimatedPopulation: 697000 },
    { name: 'Copenhagen', state: 'Capital Region', country: 'Denmark', touristRating: 5, dateEstablished: '1000-01-01T00:00:00.000Z', estimatedPopulation: 794000 },
    { name: 'Helsinki', state: 'Uusimaa', country: 'Finland', touristRating: 5, dateEstablished: '1550-01-01T00:00:00.000Z', estimatedPopulation: 656000 },
    { name: 'Dublin', state: 'Leinster', country: 'Ireland', touristRating: 5, dateEstablished: '0841-01-01T00:00:00.000Z', estimatedPopulation: 554000 },
    { name: 'Lisbon', state: 'Lisbon', country: 'Portugal', touristRating: 5, dateEstablished: '1147-01-01T00:00:00.000Z', estimatedPopulation: 505000 },
    { name: 'Brussels', state: 'Brussels', country: 'Belgium', touristRating: 5, dateEstablished: '0979-01-01T00:00:00.000Z', estimatedPopulation: 1210000 },
    { name: 'Zurich', state: 'Zurich', country: 'Switzerland', touristRating: 5, dateEstablished: '0299-01-01T00:00:00.000Z', estimatedPopulation: 415000 },
    { name: 'Geneva', state: 'Geneva', country: 'Switzerland', touristRating: 5, dateEstablished: '1539-01-01T00:00:00.000Z', estimatedPopulation: 202000 },
    { name: 'Warsaw', state: 'Masovian', country: 'Poland', touristRating: 4, dateEstablished: '1230-01-01T00:00:00.000Z', estimatedPopulation: 1793000 },
    { name: 'Budapest', state: 'Budapest', country: 'Hungary', touristRating: 5, dateEstablished: '0001-01-01T00:00:00.000Z', estimatedPopulation: 1749000 },

    // Asia
    { name: 'Tokyo', state: 'Kanto', country: 'Japan', touristRating: 5, dateEstablished: '1457-01-01T00:00:00.000Z', estimatedPopulation: 13960000 },
    { name: 'Jakarta', state: 'Jakarta', country: 'Indonesia', touristRating: 4, dateEstablished: '1527-06-22T00:00:00.000Z', estimatedPopulation: 10560000 },
    { name: 'Delhi', state: 'Delhi', country: 'India', touristRating: 4, dateEstablished: '1618-01-01T00:00:00.000Z', estimatedPopulation: 32220000 },
    { name: 'Manila', state: 'Metro Manila', country: 'Philippines', touristRating: 4, dateEstablished: '1571-05-19T00:00:00.000Z', estimatedPopulation: 2492000 },
    { name: 'Seoul', state: 'Seoul', country: 'South Korea', touristRating: 5, dateEstablished: '1394-01-01T00:00:00.000Z', estimatedPopulation: 9776000 },
    { name: 'Shanghai', state: 'Shanghai', country: 'China', touristRating: 5, dateEstablished: '1291-01-01T00:00:00.000Z', estimatedPopulation: 27790000 },
    { name: 'Mumbai', state: 'Maharashtra', country: 'India', touristRating: 4, dateEstablished: '1507-01-01T00:00:00.000Z', estimatedPopulation: 20668000 },
    { name: 'Beijing', state: 'Beijing', country: 'China', touristRating: 5, dateEstablished: '-1045-01-01T00:00:00.000Z', estimatedPopulation: 21540000 },
    { name: 'Taipei', state: 'Taipei', country: 'Taiwan', touristRating: 5, dateEstablished: '1875-01-01T00:00:00.000Z', estimatedPopulation: 2646000 },
    { name: 'Bangkok', state: 'Bangkok', country: 'Thailand', touristRating: 5, dateEstablished: '1782-01-01T00:00:00.000Z', estimatedPopulation: 10722000 },
    { name: 'Singapore', state: 'Singapore', country: 'Singapore', touristRating: 5, dateEstablished: '1819-02-06T00:00:00.000Z', estimatedPopulation: 5886000 },
    { name: 'Kuala Lumpur', state: 'Kuala Lumpur', country: 'Malaysia', touristRating: 4, dateEstablished: '1857-01-01T00:00:00.000Z', estimatedPopulation: 1780000 },
    { name: 'Hanoi', state: 'Hanoi', country: 'Vietnam', touristRating: 4, dateEstablished: '1010-01-01T00:00:00.000Z', estimatedPopulation: 8050000 },
    { name: 'Ho Chi Minh City', state: 'Ho Chi Minh City', country: 'Vietnam', touristRating: 4, dateEstablished: '1698-01-01T00:00:00.000Z', estimatedPopulation: 9050000 },
    { name: 'Hong Kong', state: 'Hong Kong', country: 'Hong Kong', touristRating: 5, dateEstablished: '1842-01-01T00:00:00.000Z', estimatedPopulation: 7500000 },
    { name: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', touristRating: 5, dateEstablished: '1833-01-01T00:00:00.000Z', estimatedPopulation: 3331000 },
    { name: 'Tel Aviv', state: 'Tel Aviv', country: 'Israel', touristRating: 5, dateEstablished: '1909-04-11T00:00:00.000Z', estimatedPopulation: 451000 },
    { name: 'Jerusalem', state: 'Jerusalem', country: 'Israel', touristRating: 5, dateEstablished: '-3000-01-01T00:00:00.000Z', estimatedPopulation: 936000 },
    { name: 'Tehran', state: 'Tehran', country: 'Iran', touristRating: 4, dateEstablished: '1598-01-01T00:00:00.000Z', estimatedPopulation: 9462000 },
    { name: 'Baghdad', state: 'Baghdad', country: 'Iraq', touristRating: 4, dateEstablished: '0762-01-01T00:00:00.000Z', estimatedPopulation: 7665000 },
    { name: 'Riyadh', state: 'Riyadh', country: 'Saudi Arabia', touristRating: 4, dateEstablished: '1744-01-01T00:00:00.000Z', estimatedPopulation: 7035000 },
    { name: 'Kuwait City', state: 'Kuwait', country: 'Kuwait', touristRating: 4, dateEstablished: '1716-01-01T00:00:00.000Z', estimatedPopulation: 623000 },
    { name: 'Doha', state: 'Doha', country: 'Qatar', touristRating: 4, dateEstablished: '1825-01-01T00:00:00.000Z', estimatedPopulation: 957000 },
    { name: 'Muscat', state: 'Muscat', country: 'Oman', touristRating: 4, dateEstablished: '1749-01-01T00:00:00.000Z', estimatedPopulation: 1421000 },
    { name: 'Amman', state: 'Amman', country: 'Jordan', touristRating: 4, dateEstablished: '1250-01-01T00:00:00.000Z', estimatedPopulation: 4007000 },

    // Africa
    { name: 'Cairo', state: 'Cairo', country: 'Egypt', touristRating: 5, dateEstablished: '0969-01-01T00:00:00.000Z', estimatedPopulation: 9540000 },
    { name: 'Lagos', state: 'Lagos', country: 'Nigeria', touristRating: 4, dateEstablished: '1472-01-01T00:00:00.000Z', estimatedPopulation: 15280000 },
    { name: 'Kinshasa', state: 'Kinshasa', country: 'Democratic Republic of the Congo', touristRating: 3, dateEstablished: '1881-01-01T00:00:00.000Z', estimatedPopulation: 17070000 },
    { name: 'Johannesburg', state: 'Gauteng', country: 'South Africa', touristRating: 4, dateEstablished: '1886-01-01T00:00:00.000Z', estimatedPopulation: 5635000 },
    { name: 'Nairobi', state: 'Nairobi', country: 'Kenya', touristRating: 4, dateEstablished: '1899-01-01T00:00:00.000Z', estimatedPopulation: 5119000 },
    { name: 'Addis Ababa', state: 'Addis Ababa', country: 'Ethiopia', touristRating: 4, dateEstablished: '1886-01-01T00:00:00.000Z', estimatedPopulation: 3041000 },
    { name: 'Cape Town', state: 'Western Cape', country: 'South Africa', touristRating: 5, dateEstablished: '1652-04-06T00:00:00.000Z', estimatedPopulation: 4337000 },
    { name: 'Dar es Salaam', state: 'Dar es Salaam', country: 'Tanzania', touristRating: 4, dateEstablished: '1865-01-01T00:00:00.000Z', estimatedPopulation: 6163000 },
    { name: 'Abidjan', state: 'Abidjan', country: 'Ivory Coast', touristRating: 4, dateEstablished: '1700-01-01T00:00:00.000Z', estimatedPopulation: 4980000 },
    { name: 'Casablanca', state: 'Casablanca', country: 'Morocco', touristRating: 4, dateEstablished: '1068-01-01T00:00:00.000Z', estimatedPopulation: 3767000 },
    { name: 'Alexandria', state: 'Alexandria', country: 'Egypt', touristRating: 5, dateEstablished: '-0331-01-01T00:00:00.000Z', estimatedPopulation: 5150000 },
    { name: 'Accra', state: 'Greater Accra', country: 'Ghana', touristRating: 4, dateEstablished: '1455-01-01T00:00:00.000Z', estimatedPopulation: 2500000 },
    { name: 'Dakar', state: 'Dakar', country: 'Senegal', touristRating: 4, dateEstablished: '1450-01-01T00:00:00.000Z', estimatedPopulation: 1377000 },
    { name: 'Khartoum', state: 'Khartoum', country: 'Sudan', touristRating: 4, dateEstablished: '1821-01-01T00:00:00.000Z', estimatedPopulation: 5490000 },
    { name: 'Algiers', state: 'Algiers', country: 'Algeria', touristRating: 4, dateEstablished: '0970-01-01T00:00:00.000Z', estimatedPopulation: 2731000 },

    // Oceania
    { name: 'Sydney', state: 'New South Wales', country: 'Australia', touristRating: 5, dateEstablished: '1788-01-26T00:00:00.000Z', estimatedPopulation: 5312000 },
    { name: 'Melbourne', state: 'Victoria', country: 'Australia', touristRating: 5, dateEstablished: '1835-01-01T00:00:00.000Z', estimatedPopulation: 5078000 },
    { name: 'Brisbane', state: 'Queensland', country: 'Australia', touristRating: 5, dateEstablished: '1824-01-01T00:00:00.000Z', estimatedPopulation: 2514000 },
    { name: 'Perth', state: 'Western Australia', country: 'Australia', touristRating: 4, dateEstablished: '1829-01-01T00:00:00.000Z', estimatedPopulation: 2059000 },
    { name: 'Auckland', state: 'Auckland', country: 'New Zealand', touristRating: 5, dateEstablished: '1840-01-01T00:00:00.000Z', estimatedPopulation: 1657000 },
    { name: 'Wellington', state: 'Wellington', country: 'New Zealand', touristRating: 4, dateEstablished: '1840-01-01T00:00:00.000Z', estimatedPopulation: 418000 },
    { name: 'Canberra', state: 'Australian Capital Territory', country: 'Australia', touristRating: 4, dateEstablished: '1913-01-01T00:00:00.000Z', estimatedPopulation: 447000 },

    // Additional cities to reach 100+
    { name: 'Moscow', state: 'Moscow', country: 'Russia', touristRating: 5, dateEstablished: '1147-01-01T00:00:00.000Z', estimatedPopulation: 12655000 },
    { name: 'Saint Petersburg', state: 'Saint Petersburg', country: 'Russia', touristRating: 5, dateEstablished: '1703-05-27T00:00:00.000Z', estimatedPopulation: 5383000 },
    { name: 'Istanbul', state: 'Istanbul', country: 'Turkey', touristRating: 5, dateEstablished: '0660-01-01T00:00:00.000Z', estimatedPopulation: 15030000 },
    { name: 'Ankara', state: 'Ankara', country: 'Turkey', touristRating: 4, dateEstablished: '1300-01-01T00:00:00.000Z', estimatedPopulation: 5504000 },
    { name: 'Athens', state: 'Attica', country: 'Greece', touristRating: 5, dateEstablished: '-3400-01-01T00:00:00.000Z', estimatedPopulation: 664000 },
    { name: 'Barcelona', state: 'Catalonia', country: 'Spain', touristRating: 5, dateEstablished: '0001-01-01T00:00:00.000Z', estimatedPopulation: 1620000 },
    { name: 'Munich', state: 'Bavaria', country: 'Germany', touristRating: 5, dateEstablished: '1158-01-01T00:00:00.000Z', estimatedPopulation: 1472000 },
    { name: 'Frankfurt', state: 'Hesse', country: 'Germany', touristRating: 4, dateEstablished: '0794-01-01T00:00:00.000Z', estimatedPopulation: 753000 },
    { name: 'Hamburg', state: 'Hamburg', country: 'Germany', touristRating: 4, dateEstablished: '0808-01-01T00:00:00.000Z', estimatedPopulation: 1899000 },
    { name: 'Milan', state: 'Lombardy', country: 'Italy', touristRating: 5, dateEstablished: '-0400-01-01T00:00:00.000Z', estimatedPopulation: 1398000 },
    { name: 'Naples', state: 'Campania', country: 'Italy', touristRating: 5, dateEstablished: '-0008-01-01T00:00:00.000Z', estimatedPopulation: 967000 },
    { name: 'Osaka', state: 'Osaka', country: 'Japan', touristRating: 5, dateEstablished: '0794-01-01T00:00:00.000Z', estimatedPopulation: 2691000 },
    { name: 'Yokohama', state: 'Kanagawa', country: 'Japan', touristRating: 4, dateEstablished: '1859-01-01T00:00:00.000Z', estimatedPopulation: 3726000 },
    { name: 'Kyoto', state: 'Kyoto', country: 'Japan', touristRating: 5, dateEstablished: '0794-01-01T00:00:00.000Z', estimatedPopulation: 1465000 },
    { name: 'Nagoya', state: 'Aichi', country: 'Japan', touristRating: 4, dateEstablished: '1610-01-01T00:00:00.000Z', estimatedPopulation: 2327000 },
    { name: 'Sapporo', state: 'Hokkaido', country: 'Japan', touristRating: 4, dateEstablished: '1857-01-01T00:00:00.000Z', estimatedPopulation: 1963000 },
    { name: 'Fukuoka', state: 'Fukuoka', country: 'Japan', touristRating: 4, dateEstablished: '0794-01-01T00:00:00.000Z', estimatedPopulation: 1616000 },
    { name: 'Kobe', state: 'Hyogo', country: 'Japan', touristRating: 4, dateEstablished: '1889-01-01T00:00:00.000Z', estimatedPopulation: 1524000 },
    { name: 'Hiroshima', state: 'Hiroshima', country: 'Japan', touristRating: 4, dateEstablished: '1589-01-01T00:00:00.000Z', estimatedPopulation: 1203000 },
    { name: 'Sendai', state: 'Miyagi', country: 'Japan', touristRating: 4, dateEstablished: '1600-01-01T00:00:00.000Z', estimatedPopulation: 1083000 },
    { name: 'Kitakyushu', state: 'Fukuoka', country: 'Japan', touristRating: 3, dateEstablished: '1963-01-01T00:00:00.000Z', estimatedPopulation: 948000 },
    { name: 'Chiba', state: 'Chiba', country: 'Japan', touristRating: 3, dateEstablished: '1921-01-01T00:00:00.000Z', estimatedPopulation: 982000 },
    { name: 'Sakai', state: 'Osaka', country: 'Japan', touristRating: 3, dateEstablished: '1889-01-01T00:00:00.000Z', estimatedPopulation: 827000 },
    { name: 'Hamamatsu', state: 'Shizuoka', country: 'Japan', touristRating: 3, dateEstablished: '1889-01-01T00:00:00.000Z', estimatedPopulation: 791000 },
    { name: 'Niigata', state: 'Niigata', country: 'Japan', touristRating: 3, dateEstablished: '1889-01-01T00:00:00.000Z', estimatedPopulation: 790000 }
  ];

  // Add IDs to all cities
  return majorWorldCities.map(city => ({
    ...city,
    id: createId()
  }));
};

async function seedCities() {
  console.log('Seeding cities...');

  const sampleCities = generateCities();

  try {
    // Check if our specific cities already exist
    const existingCities = await db.select({ name: cities.name }).from(cities);
    const existingCityNames = existingCities.map(city => city.name);
    
    // Filter out cities that already exist
    const citiesToInsert = sampleCities.filter(city => !existingCityNames.includes(city.name));
    
    if (citiesToInsert.length === 0) {
      console.log('All sample cities already exist in the database. Skipping seeding.');
      return;
    }
    
    console.log(`Inserting ${citiesToInsert.length} new cities...`);
    
    // Insert sample cities in batches to avoid potential issues with large inserts
    const batchSize = 25;
    for (let i = 0; i < citiesToInsert.length; i += batchSize) {
      const batch = citiesToInsert.slice(i, i + batchSize);
      await db.insert(cities).values(batch);
      console.log(`Added batch of ${batch.length} cities`);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding cities:', error);
  }
}

// Run the seed function
seedCities().catch(console.error);