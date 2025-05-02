import Eyebrow from "../eyebrow/Eyebrow";

export default function Option({ index, description, onClick }) {
  return (
    <>
      <div className="mb-4">
        <div className="bg-primary-army-black-light text-army-tan-light px-[18px] py-[27px] rounded-t-2xl">
          <Eyebrow>Option {index + 1}</Eyebrow>
          <p className="text-xl mt-8">{description}</p>
        </div>
        <button
          onClick={onClick}
          className="p-4 w-full bg-army-tan-light text-primary-army-black rounded-b-2xl xl:hover:bg-army-gold text-md font-semibold uppercase"
        >
          Option {index + 1}
        </button>
      </div>
    </>
  );
}
