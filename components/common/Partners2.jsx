import { partnars } from "@/data/partnars";
import Image from "next/image";

export default function Partners() {
  return (
    <div className="dark:bg-jacarta-900">
      <div className="container">
        <div className="grid grid-cols-2 py-8 sm:grid-cols-5">
          {partnars.map((elm, i) => (
            <a key={i} href={elm.link}>
              <Image width={173} height={103} src={elm.img} alt="partner 1" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
