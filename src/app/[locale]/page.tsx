'use client';
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

const Home = () => {
  redirect(`/${routing.defaultLocale}/login`);
};

export default Home;