export default function Header({ children, type, className }) {
  switch (type) {
    case "h1":
      return (
        <h1
          className={`text-[27px] md:text-[36px] font-normal text-army-tan-light mb-4 ${className}`}
        >
          {children}
        </h1>
      );

    case "h2":
      return (
        <h2
          className={`text-[22px] font-normal text-army-tan-light mb-2 ${className}`}
        >
          {children}
        </h2>
      );

    default:
      return (
        <h2
          className={`text-[22px] font-normal text-army-tan-light mb-2 ${className}`}
        >
          {children}
        </h2>
      );
  }
}
