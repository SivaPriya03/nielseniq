import { useEffect, useState } from "react"

export const useFetch = <Data>(url: string, options: Partial<{
  skipInitialFetch: boolean;
}> = {
  skipInitialFetch: false
}):[
  Data | undefined,
  {
    isLoading: boolean;
    isError: boolean;
    error: string;
  },
  () => void
] => {
  const [
    data,
    setData
  ] = useState();
  const [
    isLoading,
    setIsLoading
  ] = useState(true);
  const [
    error,
    setError
  ] = useState('');

  const {
    skipInitialFetch = false
  } = options;

  useEffect(() => {
    if(skipInitialFetch) return;
    fetchData();
  }, []);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return [
    data,
    {
      isLoading,
      isError: error.length > 0,
      error,
    },
    fetchData
  ]
}