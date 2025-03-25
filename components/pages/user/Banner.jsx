import Image from "next/image";

export default function Banner({cover_photo}) {
  return (
    <div className="relative">
      <Image
        width={1920}
        height={300}
        src={cover_photo??"/img/user/banner.jpg"}
        alt="banner"
        className="h-[18.75rem] object-cover"
      />
    </div>
  );
}
