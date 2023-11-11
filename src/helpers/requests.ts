import axios from 'axios';

const baseApiURL = 'https://www.googleapis.com/books/v1'
const volumesEndPoint = `${baseApiURL}/volumes?`
const pageSize = 40

export const getSomeBooks = async () => {
    const searchParams = new URLSearchParams();
    searchParams.append("q", "cyber");
    searchParams.append("maxResults", pageSize.toString());
    searchParams.append("startIndex", '0'); // paginate
    return axios.request({
        url: `${volumesEndPoint}${searchParams.toString()}`,
        method: 'GET'
    })
}