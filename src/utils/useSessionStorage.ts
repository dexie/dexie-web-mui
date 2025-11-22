"use client";

import { useEffect, useState } from "react";

const globalState = new Map<
  string,
  { value: unknown; subscribers: Array<() => void> }
>();

export function useSetSessionStorage<T>(key: string): (value: T) => void {
  const setValue = (value: T) => {
    try {
      if (typeof window !== "undefined") {
        const state = globalState.get(key);
        if (state) {
          state.value = value;
          state.subscribers.forEach((callback) => callback());
        }
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  }

  return setValue;
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Initialize global state first
  if (typeof window !== "undefined" && !globalState.has(key)) {
    globalState.set(key, { value: initialValue, subscribers: [] });
  }
  
  const [storedValue, setStoredValue] = useState<T>(initialValue); // Always start with initialValue

  // Load from sessionStorage after hydration to avoid mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.sessionStorage.getItem(key);
        if (item) {
          const parsedValue = JSON.parse(item) as T;
          setStoredValue(parsedValue);
          const state = globalState.get(key);
          if (state) {
            state.value = parsedValue;
          }
        }
      } catch (error) {
        console.warn(`Error reading sessionStorage key "${key}":`, error);
      }
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        const state = globalState.get(key);
        if (state) {
          state.value = value;
          state.subscribers.forEach((callback) => callback());
        }
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const state = globalState.get(key);
    if (!state) return;

    const callback = () => {
      setStoredValue(state.value as T);
    };
    state.subscribers.push(callback);

    return () => {
      const index = state.subscribers.indexOf(callback);
      if (index > -1) {
        state.subscribers.splice(index, 1);
      }
    };
  }, [key]);

  return [storedValue, setValue];
}
