import Books from "./Books";
import { useState, useEffect } from "react";
import axios from 'axios';
import Button from "./UI/Button";

const baseApiURL = 'https://www.googleapis.com/books/v1'
const volumesEndPoint = `${baseApiURL}/volumes?`

export default function BookWrapper() {
    const [books, setBooks] = useState([])

    const getTwoHundredBooks = async () => {
        const firstIdx = books.length
        const promises = []
        let newBooksBulk = []
        for (let i = 0; i < 5; i++) {
            const searchParams = new URLSearchParams();
            searchParams.append("q", "cyber");
            searchParams.append("maxResults", '40');
            searchParams.append("startIndex", (firstIdx + i * 40).toString());
            promises.unshift(axios.request({
                url: `${volumesEndPoint}${searchParams.toString()}`,
                method: 'GET'
            }))
        }
        await Promise.all(promises).then(responses => {
            responses.forEach(response => {
                if (response.status !== 200 ) {
                    console.log('err: ', response)
                    return
                }
                if (response.data?.items)
                    newBooksBulk = [...newBooksBulk, ...response.data.items]
            })})
        setBooks([...books, ...newBooksBulk])
    }

    useEffect(() => {
        async function loadBooks () {
            await getTwoHundredBooks();
            console.log('wrapper has books')
        }

        loadBooks();
    }, [])

    return (
        <>
            <Books foo={getTwoHundredBooks} books={books}/>
        </>
    )
}