"use client";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Spinner from "./Spinner";
import Marketverse from "@/components/Marketverse/Marketverse";
import { method } from "lodash";


const fetchPosts = async (url: string) => {
  const response = await fetch(url, {method: "GET"});
  
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
 
  return await response.json();
};

export default function Page() {
  const router = useRouter();

  const search = useSearchParams();

  const searchQuery = search ? search.get("q") : null;

  const encodedSearchQuery =searchQuery || "";


  const { data, isLoading } = useSWR(
    `/api/visual?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false }
  );
  

  
  if (!encodedSearchQuery) {
    router.push("/");
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data.news) {
    return null;
  }

  
  return (
    <div className="relative flex items-center justify-center overflow-x-hidden">
      <Marketverse news={data.news}/>
    </div>
  );
}
