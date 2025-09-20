import HomeScreen from "@/screens/home/index";

export const revalidate = 3600;

export default function Home() {
  return (
    <main className="bg-[#DADADA] min-h-screen">
      <HomeScreen />
    </main>
  );
}