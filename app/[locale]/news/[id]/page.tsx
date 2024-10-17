"use client";
import CardNews from "@/app/_components/newCard";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Facebook from "../../../../public/assets/facebook.svg";
import instagram from "../../../../public/assets/instagram.svg";
import linkedin from "../../../../public/assets/linkedIn.svg";
import twitter from "../../../../public/assets/x.svg";
import "./style.css";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/_lib/axios";
import DOMPurify from "isomorphic-dompurify";
import { showToaster } from "@/app/_lib/toasters";
import { useUser } from "@/app/_context/UserContext";
import { toast, ToastContainer } from "react-toastify";

function NewsDetails({ params }: { params: { id: string } }) {
  const t = useTranslations("News");
  const [newsDetails, setNewsDetails] = useState<any>({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState("");
  const { isLoggedIn } = useUser();
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`news/${params.id}`);
        setNewsDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addComment = async () => {
    setLoadingSpinner(true);
    try {
      let data = {
        comment: text,
        news_id: parseInt(params.id),
      };
      const response = await axiosInstance.post(`news`, data);
      setText("");
      toast.success(t("addCommentSuccess"));
      setIsDisabled(true);
      setLoadingSpinner(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoadingSpinner(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setIsDisabled(!value);
  };

  const socialMediaList = [
    {
      src: instagram,
      url: "/",
    },
    {
      src: twitter,
      url: "/",
    },
    {
      src: Facebook,
      url: "/",
    },
    {
      src: linkedin,
      url: "/",
    },
  ];
  return (
    <section className="news container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <div className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
          <div className="col-span-8">
            <img src={newsDetails?.image} className="w-full h-[400px]" />
            <h1 className="mt-8 text-primary text-size22 md:text-[38px] gont-medium">
              {newsDetails?.title}
            </h1>
            <h6 className="text-[#475467] text-size16 font-medium mt-8">
              {newsDetails?.date}
            </h6>
            <p className="text-black text-size22 font-medium mt-10">
              {DOMPurify.sanitize(newsDetails?.desc, {
                USE_PROFILES: { html: false },
              })}
            </p>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-3 hidden md:block">
            {newsDetails?.ads?.map((ads: any, index: number) => (
              <Link target="_blank" href={ads?.link} key={index}>
                <img
                  src={ads?.image}
                  className="w-full h-[320px] rounded-md mb-16"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="related-news mt-16">
          <div className="flex items-center justify-between">
            <h3 className=" text-[28px] text-black font-medium">
              {t("similarArticles")}
            </h3>
            <Link href="/news" className="btn-yellow !text-size22">
              <span>{t("more")}</span>
            </Link>
          </div>

          <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 pt-16">
            {newsDetails?.similers?.map((item: any, index: number) => (
              <li key={index}>
                <CardNews item={item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="comments lg:flex block items-end justify-between mt-32">
          {isLoggedIn && (
            <div className="bg-[#EAF1FA] p-4 w-full lg:w-[60%] rounded-md max-[600px]:mb-4">
              <div className="flex items-center justify-between">
                <h3 className=" text-[28px] text-black font-medium ">
                  {t("comment")}
                </h3>
                <button
                  className="btn-yellow !text-size22 !px-6 !py-2"
                  disabled={isDisabled}
                  onClick={() => addComment()}
                >
                  {loadingSpinner ? (
                    <div className="border-white h-8 w-8 animate-spin rounded-full border-2 border-t-primary p-2" />
                  ) : (
                    <span>{t("publish")}</span>
                  )}
                </button>
              </div>
              <textarea
                id="message"
                value={text}
                onChange={handleChange}
                rows={7}
                className="mt-4 w-full rounded-md  shadow-sm sm:text-sm  text-black  indent-2.5 !outline-none resize-none"
              />
            </div>
          )}

          <div className="share">
            <h3 className=" text-size24 text-primary font-medium mb-6">
              {t("share")}
            </h3>
            <ul className="flex justify-center gap-6 sm:mt-0 lg:justify-end">
              {socialMediaList.map((link, index) => {
                const IconComponent = link.src;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-link"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsDetails;
