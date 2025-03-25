import Image from "next/image";
import Link from "next/link";

const CreatorListItem = ({ creatorData }) => {
  return (
    <article>
      <div className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
        <figure className="relative">
          <Link href={`/user/1`}>
            <Image
              width={230}
              height={230}
              src={creatorData.profile_photo}
              alt="item 8"
              className="w-full rounded-[0.625rem]"
              loading="lazy"
            />
          </Link>
        </figure>
        <div className="mt-7 flex items-center justify-between">
          <Link href={`/item/${creatorData.id}`}>
            <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
              {creatorData.username}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};
export default CreatorListItem;
