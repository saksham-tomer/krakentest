import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request) {
  try {
    if (!request || !request.json) {
      throw new Error("Invalid request object");
    }

    const { text, voice } = await request.json();

    if (!text) {
      throw new Error("No text provided");
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Function to remove URLs from the input text
    const removeUrls = (inputText) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return inputText.replace(urlRegex, "");
    };

    // Remove URLs from the text
    const sanitizedText = removeUrls(text);

    // Parse the input text into paragraphs
    const parseMarkdown = (markdownText) => {
      return markdownText
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
    };

    const paragraphs = parseMarkdown(sanitizedText);

    // Join paragraphs with spaces since kokoro model can handle longer text
    const processedText = paragraphs.join(" ");

    // Call Replicate API with kokoro-82m model
    const output = await replicate.run(
      "jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13",
      {
        input: {
          text: processedText,
          voice: voice || "af_nicole"
        }
      }
    );

    // Fetch the audio data directly from the output
    const audioResponse = await fetch(output);
    if (!audioResponse.ok) {
      throw new Error(`Failed to fetch audio: ${audioResponse.statusText}`);
    }

    const audioArrayBuffer = await audioResponse.arrayBuffer();
    if (!audioArrayBuffer) {
      throw new Error("Failed to get audio buffer");
    }

    return new NextResponse(Buffer.from(audioArrayBuffer), {
      headers: {
        "Content-Type": "audio/wav",
      },
    });

  } catch (error) {
    console.error("Text-to-speech error:", error);
    return NextResponse.json(
      { error: error,
        message:"Failed to convert text to audio"
       },
      { status: 500 }
    );
  }
}
