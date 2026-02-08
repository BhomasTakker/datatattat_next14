import { NextRequest, NextResponse } from "next/server";

// This is a simple proxy to fetch PDFs and avoid CORS issues. It adds a User-Agent header to bypass basic bot detection, but it does not handle more advanced protections. The PDF URL is passed as a query parameter, and the response is returned with appropriate headers for PDF content and CORS.
// Example usage: fetch("/api/proxy-pdf?url=https://example.com/file.pdf")
// We perhaps may want to add for other files
// We probably want to add to cache the response

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const url = searchParams.get("url");

	if (!url) {
		return NextResponse.json(
			{ error: "URL parameter is required" },
			{ status: 400 },
		);
	}

	try {
		const pdfUrl = new URL(url);

		const response = await fetch(pdfUrl.toString(), {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
			},
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: `Failed to fetch PDF: ${response.statusText}` },
				{ status: response.status },
			);
		}

		const arrayBuffer = await response.arrayBuffer();

		return new NextResponse(arrayBuffer, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Access-Control-Allow-Origin": "*",
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		console.error("Error proxying PDF:", error);
		return NextResponse.json(
			{
				error: "Failed to proxy PDF",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
