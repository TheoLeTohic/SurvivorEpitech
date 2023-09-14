const accept_clasic = 'application/json, application/xml, text/plain, text/html'

async function doReq(bearer_token, link, acpt) {
    const res = await fetch(link, {
        method: 'GET',
        headers: {
            'X-Group-Authorization': process.env.X_AUTHO,
            'Authorization': 'Bearer ' + bearer_token,
            'Accept': acpt,
        }
    })
    if (await res.status == 200) {
        try {
            return await res.json()
        } catch (e) {
            return null;
        }
    } else {
        console.log(res.status)
        return null
    }
}

module.exports.login = async function (email, pswd) {
    const res = await fetch("https://masurao.fr/api/employees/login", {
        method: 'POST',
        headers: {
            'X-Group-Authorization': process.env.X_AUTHO,
            'Accept': 'application/json, application/xml, text/plain, text/html',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: pswd
        })
    })
    if (await res.status == 200) {
        const token = await res.json()
        return await token["access_token"]
    } else {
        console.log(res.status)
        return null
    }
}

module.exports.employees = async function(token) {
    return await doReq(token, "https://masurao.fr/api/employees", accept_clasic)
}

module.exports.leader = async function(token) {
    return await doReq(token, "https://masurao.fr/api/employees/leaders", accept_clasic)
}

module.exports.getEmployee = async function(token, id) {
    return await doReq(token, "https://masurao.fr/api/employees/" + id, accept_clasic)
}

module.exports.getEmployeeImage = async function(token, id) {

    try {
        const response = await fetch( "https://masurao.fr/api/employees/" + id + "/image", {
        headers: {
            'X-Group-Authorization': process.env.X_AUTHO,
            'Authorization': 'Bearer ' + token,
        }
        });
        if (await response.status != 200) {
            console.log(await response.status)
            return null
        }
        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        return Promise.resolve('data:image/png;base64,' + base64);
    } catch (error) {
        return Promise.reject(error);
    }
}
