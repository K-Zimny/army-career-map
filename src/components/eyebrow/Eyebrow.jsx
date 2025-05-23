export default function Eyebrow({ children, type, className = "" }) {
  if (type == "bigger") {
    return (
      <h2
        className={`${className} text-md font-semibold mb-6 uppercase text-army-tan-light`}
      >
        {children}
      </h2>
    );
  } else {
    return (
      <h2
        className={`${className} text-sm font-semibold mb-2 uppercase text-army-tan-light`}
      >
        {children}
      </h2>
    );
  }
}
