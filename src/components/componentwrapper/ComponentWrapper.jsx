export default function ComponentWrapper({ children, className }) {
  return (
    <div
      className={`bg-primary-army-black-light text-army-white p-4 my-4 rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
