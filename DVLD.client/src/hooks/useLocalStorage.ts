function useLocalStorage(key: string) {
  const getItem = () => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setItem = <T>(value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return { getItem, setItem, deleteItem };
}

export default useLocalStorage;
