import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import GameDetails from "@/components/pages/game/GameDetails";

// Function to fetch game data for metadata generation
async function getGameData(gameId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai-games/games/${gameId}`,
      { next: { revalidate: 59 } } // Revalidate every 60 seconds
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch game data: ${response.status}`);
    }
    
    const data = await response.json();
    return data.success?.data || null;
  } catch (error) {
    console.error("Error fetching game data for metadata:", error);
    return null;
  }
}

// Generate metadata for the page based on game data
export async function generateMetadata({ params }) {
  const gameId = params.gameId;
  const gameData = await getGameData(gameId);
  
  if (!gameData) {
    return {
      title: "Game Details | OpenBook.Games",
      description: "Explore interactive games on OpenBook.Games",
    };
  }
  
  // Base URL for canonical links and sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krakengames.quest";
  const gameUrl = `${baseUrl}/games/${gameId}`;
  
  return {
    title: `${gameData.game_name} | OpenBook.Games`,
    description: gameData.description || "Explore this interactive game on OpenBook.Games",
    openGraph: {
      title: gameData.game_name,
      description: gameData.description || "Explore this interactive game on OpenBook.Games",
      url: gameUrl,
      siteName: "OpenBook.Games",
      images: [
        {
          url: gameData.preview_image || "https://storage.googleapis.com/kraken-5aa67.appspot.com/website_media/public/images/Thmbnail.jpg",
          width: 1199,
          height: 629,
          alt: gameData.game_name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: gameData.game_name,
      description: gameData.description || "Explore this interactive game on OpenBook.Games",
      images: [gameData.preview_image || "https://storage.googleapis.com/kraken-5aa67.appspot.com/website_media/public/images/Thmbnail.jpg"],
      creator: "@OpenBook.Games",
      site: "@OpenBook.Games",
    },
    alternates: {
      canonical: gameUrl,
    },
  };
}

// This is a Server Component that will be pre-rendered to HTML
export default async function GameDetailsPage({ params }) {
  // No need to fetch game data here as it's already fetched in generateMetadata
  // and the GameDetails component will fetch it again on the client side
  
  return (
    <>
      <Header />
      <main className="mt-25">
        <GameDetails id={params.gameId} />
      </main>
      <Footer />
    </>
  );
}