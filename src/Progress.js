import { useRef, useEffect } from "react";

export default function Progress({ current, total }) {
  const percentage = String((current / total) * 100);
  const bar = useRef(null);
  useEffect(
    function () {
      bar.current.style.width = percentage + "%";
    },
    [current, total, percentage]
  );

  return (
    <div className="w-full h-2 rounded-xl">
      <div id="bar" ref={bar} className={"h-2 bg-red-400 rounded-xl"}></div>
      <div></div>
    </div>
  );
}
