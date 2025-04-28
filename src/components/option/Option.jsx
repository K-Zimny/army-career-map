import Eyebrow from "../eyebrow/Eyebrow";

export default function Option({ index, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-left p-4 w-full text-[14px] rounded-[9px] mb-[18px] border  border-primary-army-black bg-primary-army-black text-army-tan hover:bg-army-tan-light hover:text-primary-army-black "
    >
      <Eyebrow>Option {index + 1}</Eyebrow>
      <p className="text-xl mt-8">{description}</p>
    </button>
  );
}
