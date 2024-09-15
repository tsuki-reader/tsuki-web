export default async function sendRequest(url: string, method: string = "GET", data: object | null = null) {
    let body: string | null = null
    if (data === null) {
        body = null
    } else {
        body = JSON.stringify(data)
    }

    const response = await fetch(url, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })

    if (response.ok) {
        return await response.json()
    } else {
        return Promise.reject()
    }
}
