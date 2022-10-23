import {useState, useEffect} from 'react'

const useWindowSize = () => {
    const [size, setSize] = useState(window.innerWidth)
    const checksize = () => {
        setSize(window.innerWidth)
    };
    
    useEffect(() => {
        window.addEventListener('resize', checksize)
        return () => {
            window.removeEventListener('resize', checksize)
        }
    }, [])
    return size
}

export default useWindowSize