import { getTranslations } from "next-intl/server";
import Page from "./page";

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params) {
  const t = await getTranslations({ locale, namespace: "ContactUs" });

  return {
    title: t("contactUs"),
  };
}
export default function PageLayout() {
  return <Page />;
}
