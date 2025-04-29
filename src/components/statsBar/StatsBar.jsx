import Image from "next/image";
import Eyebrow from "../eyebrow/Eyebrow";

export default function StatsBar({ rank, age, salary }) {
  const formatSalary = (salary) => {
    const salarySting = salary.toString();
    if (salarySting.toString().length == 5) {
      return salarySting.slice(0, 2);
    } else if (salarySting.toString().length == 6) {
      return salarySting.slice(0, 3);
    } else {
      return salarySting.toString();
    }
  };

  return (
    <ul className="mt-8 mb-[45px] flex flex-row justify-between gap-2">
      <li className="flex gap-2 items-center">
        <Image src="/rank.svg" alt="Rank" height={25} width={20} />
        <Eyebrow className="!mb-0">Rank: {rank.shortTitle}</Eyebrow>
      </li>
      <li className="flex gap-2 items-center">
        <Image src="/age.svg" alt="Rank" height={25} width={25} />
        <Eyebrow className="!mb-0">Age: {age}</Eyebrow>
      </li>
      <li className="flex gap-2 items-center">
        <Image src="/salary.svg" alt="Rank" height={25} width={25} />
        <Eyebrow className="!mb-0">Salary: ${formatSalary(salary)}K</Eyebrow>
      </li>
    </ul>
  );
}
