import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memorizedValue = useRef<DependencyList | null>(null);
  if (!memorizedValue.current || !_equals(memorizedValue.current, _deps)) {
    memorizedValue.current = _deps;
    return factory();
  }
  return memorizedValue.current as T;
}
