import React from "react";

export default function CustomText({ segments, className = "" }) {
  return (
    <h1 className={`${className}`}>
      {segments.map((segment, index) => (
        <span
          key={index}
          className={`${segment.className || ""}`}
          style={segment.style || {}}
        >
          {segment.text}
        </span>
      ))}
    </h1>
  );
}

// Example usage of CustomText component:
// import CustomText from "@/components/CustomText/CustomText";

// export default function ExamplePage() {
//   return (
//     <CustomText
//       segments={[
//         { text: "Take the ", className: "font-normal text-primary-army-white" },
//         { text: "Next Step", className: "font-semibold text-army-gold" },
//       ]}
//     />
//   );
// }
