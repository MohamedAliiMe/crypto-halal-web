"use client";
import Card from "@/app/_components/card";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

function StudyAndResearch() {
  const [data, setData] = useState([]);

  const t = useTranslations("StudyAndResearch");
  const visualsListLength = Array.from({ length: 18 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("researches?limit=10&page=1");
        setData(response.data.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="visuals container py-28">
      <h1 className="text-primary text-size22 md:text-[4rem] font-semibold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-black text-size16 md:text-[28px] font-medium text-center">
        {t("description")}
      </p>

      <ul className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 pt-20">
        {data?.map((item, index) => (
          <li key={index}>
            <Link href={`study-research/${1}`}>
              <Card
                item={item}
                img={`/assets/study-and-research.svg`}
                title={"نقدية العملات المشفرة واثرها و حكمها الشرعي"}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center py-16">
        <button className="btn-yellow">{t("more")}</button>
      </div>
    </section>
  );
}

export default StudyAndResearch;
