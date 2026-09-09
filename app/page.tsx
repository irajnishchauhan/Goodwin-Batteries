import { getGlobalSettings, getApplications } from "@/lib/data";
import HomePageClient from "@/components/home/HomePageClient";

export default async function Home() {
  const settings = await getGlobalSettings();
  const applications = await getApplications();

  return <HomePageClient applications={applications} settings={settings} />;
}
