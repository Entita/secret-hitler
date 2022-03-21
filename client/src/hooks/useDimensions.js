import { useLayoutEffect, useRef, useState } from "react";

export default function useDimensions() {
  const ref = useRef(null);
  const [dimensions, setDImensions] = useState({});
  useLayoutEffect(() => {
    setDImensions(ref.current.getBoundingClientRect().toJSON());
  }, [ref.current]);

  return [ref, dimensions];
}
