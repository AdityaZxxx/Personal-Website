import { TweetCard } from "@/components/ui/tweet-card";

interface TweetEmbedValue {
  tweetUrl: string;
}

export function TweetCardEmbed({ value }: { value: TweetEmbedValue }) {
  if (!value?.tweetUrl) {
    return <p>Tweet URL is missing.</p>;
  }

  const tweetId = value.tweetUrl.split("/").pop()?.split("?")[0];

  if (!tweetId) {
    return <p>Invalid Tweet URL.</p>;
  }

  return (
    <div className="my-8 overflow-hidden mx-auto flex justify-center items-center w-full max-w-xl">
      <TweetCard id={tweetId} />
    </div>
  );
}
