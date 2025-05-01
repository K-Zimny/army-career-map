import ArrowIconWhite from "@/assets/icons/arrow-white.svg";
import ArrowIconGold from "@/assets/icons/arrow-gold.svg";

export default function Button({ children, href, className }) {
  return (
    <div>
      <div
        className={`items-center inline-flex gap-[8px] self-center pr-2 group py-2 font-bold text-army-gold hover:text-army-white border-b-1 border-army-gold hover:border-army-white transition ${className}`}
      >
        <a className="" href={href}>
          {children}
        </a>
        <img
          src={ArrowIconGold}
          alt="Arrow Icon"
          className="group-hover:hidden"
        />
        <img
          src={ArrowIconWhite}
          alt="Arrow Icon"
          className="hidden group-hover:block"
        />
      </div>
    </div>
  );
}
