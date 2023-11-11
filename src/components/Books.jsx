import BookItem from "./BookItem";
import {useState, useEffect} from 'react';
import Button from "./UI/Button";
import Input from "./UI/Input";


const pageSizes = [10, 25, 50]


export default function Books({books, foo}) {
    const [state, setState] = useState({pageSize: 25, pageNum: 0, search: '', debouncedSearch: ''})
    const start = state.pageNum * state.pageSize
    const end = start + state.pageSize

    const handleChangePageSize = e => {
        setState({
            ...state,
            pageSize: Number(e.target.value)
        })
    }

    const handleNext = () => {
        if (end + state.pageSize > books.length) {
            console.log('fetching more books...')
            foo()
        };
        setState({
            ...state,
            pageNum: state.pageNum + 1
        })
    }

    const handlePrevious = () => {
        setState({
            ...state,
            pageNum: state.pageNum - 1
        })
    }

    const handleSearchChange = e => {
        const val = e.target.value
        setState({
            ...state,
            search: val
        })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setState({
                ...state,
                debouncedSearch: state.search,
                pageNum: 0
            })
          }, 500);
          return () => clearTimeout(timeoutId);
    }, [state.search])

    const booksToShow = books.filter((book) => {
        return book.volumeInfo.title.toLowerCase().includes(state.debouncedSearch.toLowerCase())
    }).slice(start, end)

    return <>
            <div>
                <select className="select-center" value={state.pageSize} onChange={handleChangePageSize}>
                    {pageSizes.map(t => {
                        return <option value={t} key={t}>{t}</option>
                    })}
                </select>
                <Input label='search' id="search" type="text" onChange={handleSearchChange} value={state.search}/>
            </div>
            <ul id="books">
                {booksToShow.map((book) => (
                    <BookItem key={book.id} bookVolume={book}/>
                ))}
            </ul>
            <div className="pagination-div">
                {state.pageNum > 0 && <Button onClick={handlePrevious}>Previous</Button>}
                <h3>{state.pageNum}</h3>
                <Button onClick={handleNext}>Next</Button>
            </div>
            
    </>
}