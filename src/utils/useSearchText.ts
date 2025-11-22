import { useSessionStorage, useSetSessionStorage } from "./useSessionStorage"

export function useSearchText(): [string, (value: string) => void] {
  const [searchText, setSearchText] = useSessionStorage("docsSidebarSearch", "")
  return [searchText, setSearchText]
}

export function useClearSearchText() {
  const setSearchText = useSetSessionStorage<string>("docsSidebarSearch");
  return () => setSearchText("");
}