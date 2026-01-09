import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { queryAddress } = await req.json();
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key manquante" }, { status: 500 });
    }
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.formattedAddress",
        },
        body: JSON.stringify({ textQuery: queryAddress }),
      }
    );
    const data = await response.json();
    return NextResponse.json({ places: data.places || [] });
  } catch (error) {
    return NextResponse.json(error);
  }
}
