"use client";
import axiosInstance from "@/app/_lib/axios";
import React from "react";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { useTranslations } from "next-intl";

function PrivacyPolicy() {
  const [data, setData] = useState<any>(null);
  const t = useTranslations("Footer");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("info");
        setData(response.data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div className="container py-20">
      <h1 className="text-primary text-size22 md:text-[4rem] font-semibold mb-16">
        {t("privacyPolicy")}
      </h1>
      <p className="w-[75%] text-black text-[28px] mb-[2rem]">
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              data?.policy.replace(/&nbsp;/g, "<br/>"),
              {
                USE_PROFILES: { html: true },
              }
            ),
          }}
        />
      </p>
    </div>
  );
}

export default PrivacyPolicy;
