import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(url, { signal: abortController.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Error! Unable to fetch resource.');
                }

                return res.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    console.log('Fetch aborted');
                }
                else {
                    console.error(error);
                    setError(error.message);
                    setIsLoading(false);
                }
            });

        return () => {
            abortController.abort();
            console.log('Cleanup');
        };

    }, [url]);

    return { data, isLoading, error };
}
