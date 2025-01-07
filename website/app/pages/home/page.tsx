"use client";

import AdsBanner from "@/app/components/AdsBanner/AdsBanner";
import Banner from "@/app/components/Banner/Banner";
import RecentActivities from "@/app/components/RecentActivities/RecentActivities";

const Home: React.FC = () => {
  return (
    <>
      <AdsBanner />
      <Banner />
      <RecentActivities />
    </>
  );
};

export default Home;
