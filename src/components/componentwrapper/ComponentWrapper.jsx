export default function ComponentWrapper({ children }) {
  return (
    <div className="bg-primary-army-black-light p-4 my-4 rounded-2xl">
      {children}
    </div>
  );
}
