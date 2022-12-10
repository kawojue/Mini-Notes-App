import { formatFetch } from "./formatFetch"

export const updateItem = async (url, id, obj) => {
    await fetch(formatFetch(url, id), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
}