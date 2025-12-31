/**
 * Utility for competitor intelligence (Mocked)
 * In a real scenario, this would call a Supabase Edge Function that uses
 * a scraping API (like Serper.dev or Apify) to get local business results.
 */

export const scrapeCompetitors = async (location, rubro) => {
    console.log(`Scraping competitors for ${rubro} at ${JSON.stringify(location)}`);

    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock results
    return [
        {
            id: crypto.randomUUID(),
            name: `${rubro} Premium Store`,
            location_lat: location.lat + (Math.random() - 0.5) * 0.02,
            location_lng: location.lng + (Math.random() - 0.5) * 0.02,
            details: { rating: 4.5, reviews: 120, address: "Av. Principal 123" },
            active_ads: Math.random() > 0.5,
            ad_library_url: "https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=AR"
        },
        {
            id: crypto.randomUUID(),
            name: `${rubro} Express`,
            location_lat: location.lat + (Math.random() - 0.5) * 0.02,
            location_lng: location.lng + (Math.random() - 0.5) * 0.02,
            details: { rating: 4.2, reviews: 85, address: "Calle Secundaria 456" },
            active_ads: Math.random() > 0.5,
            ad_library_url: "https://www.facebook.com/ads/library/"
        },
        {
            id: crypto.randomUUID(),
            name: `Grand ${rubro} Center`,
            location_lat: location.lat + (Math.random() - 0.5) * 0.02,
            location_lng: location.lng + (Math.random() - 0.5) * 0.02,
            details: { rating: 3.8, reviews: 210, address: "Bulevar Central 789" },
            active_ads: Math.random() > 0.5,
            ad_library_url: "https://www.facebook.com/ads/library/"
        }
    ];
};
