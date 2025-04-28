import Image from "next/image";
import Eyebrow from "../eyebrow/Eyebrow";

export default function StatsBar({ rank, age, salary }) {
  const formattedSalary = salary.toString().slice(0, 2);
  return (
    <ul className="my-8 flex flex-row justify-between gap-2">
      <li className="flex gap-2 items-center">
        <Image src="/rank.svg" alt="Rank" height={25} width={20} />
        <Eyebrow className="!mb-0">Rank: {rank}</Eyebrow>
      </li>
      <li className="flex gap-2 items-center">
        <Image src="/age.svg" alt="Rank" height={25} width={25} />
        <Eyebrow className="!mb-0">Age: {age}</Eyebrow>
      </li>
      <li className="flex gap-2 items-center">
        <Image src="/salary.svg" alt="Rank" height={25} width={25} />
        <Eyebrow className="!mb-0">Salary: ${formattedSalary}K</Eyebrow>
      </li>
    </ul>
  );
}
