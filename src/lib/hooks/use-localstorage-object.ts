import { useLocalStorage } from "usehooks-ts";

export function useLocalStorageObject<T extends object>(key: string, initialValue: T) {
  const [value, setValue] = useLocalStorage<T>(key, initialValue, {
    initializeWithValue: true,
  });

  const update = <K extends keyof T>(field: K, newValue: T[K]) => {
    setValue({ ...value, [field]: newValue });
  };

  const remove = <K extends keyof T>(field: K) => {
    const newObj = { ...value };
    delete newObj[field];
    setValue(newObj as T);
  };

  const reset = () => {
    setValue(initialValue);
  };

  const deleteFromArray = <K extends keyof T>(
    field: K,
    item: T[K] extends Array<infer U> ? U : never
  ) => {
    const current = value[field];

    if (Array.isArray(current)) {
      const filtered = current.filter((x) => x !== item);
      setValue({ ...value, [field]: filtered });
    }
  };

  return { value, update, remove, reset, deleteFromArray } as const;
}
