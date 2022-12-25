import { useState, useEffect, RefObject } from "react";

export function useIntersectionObserver(
  ref: RefObject<HTMLDivElement>,
  ops?: IntersectionObserverInit
) {
  const [intersect, setIntersect] = useState<boolean>(false);
  useEffect(() => {
    function callback(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        setIntersect(entry.isIntersecting);
      });
    }

    const observer = new IntersectionObserver(callback, ops);
    
    if (ref.current === null) {
      return;
    }
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current !== null) {
        observer.unobserve(ref.current);
      }
    };
  });
  
  return intersect;
}
