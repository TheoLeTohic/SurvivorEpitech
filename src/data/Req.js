async function doReq(bearer_token, link) {
    const res = await fetch(link, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + bearer_token,
            "X-Group-Authorization": "UkPEzS4kSZu07iSS2d2l4OjA4PDfNiGy",
            'Accept': 'application/json, application/xml, text/plain, text/html, image/png',
        }
    })
    if (await res.status == 200) {
        try {
            return await res
        } catch (e) {
            return null
        }
    } else {
        console.log(res.status)
        return null
    }
}

module.exports = { doReq };