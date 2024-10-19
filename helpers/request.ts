export default async function sendRequest(url: string, token: string, method: string = "GET", data: object | null = null) {
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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body
    })

    const json = await response.json()
    if (response.ok) {
        return json
    } else {
        return Promise.reject(json)
    }
}
