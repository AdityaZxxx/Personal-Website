import Script from "next/script";

export const UmamiAnalytics = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
  if (!websiteId) {
    return <></>;
  }
  return <Script async src={umamiUrl} data-website-id={websiteId} />;
};
