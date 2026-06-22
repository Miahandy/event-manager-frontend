import { useEffect, useState } from "react";

const useFetch = (fecthFunction) => {
    const [data, setData] =useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fecthFuntion();
                setData(result);
            }   catch (err) {
                setError(err);
            }    finally {
                setLoading(false)
            }
        };

        loadData();
    }, [fecthFunction]);

    return {
        data,
        loading,
        error,
    };
};

export default useEffect;