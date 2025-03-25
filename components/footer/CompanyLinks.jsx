import { menuItems } from "@/data/footerLinks";
import Link from "next/link";

export default function CompanyLinks() {
  return (
    <>
      {menuItems.map((elm, i) => (
        <li key={i}>
          <Link
            href={elm.href}
            className="hover:text-accent dark:hover:text-white"
          >
            {elm.name}
          </Link>
        </li>
      ))}
    </>
  );
}
