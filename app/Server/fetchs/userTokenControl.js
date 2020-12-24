import { serverAdres } from "../config";

const userTokenControl = (params) => {
    const fectAdress = serverAdres + "/auth/userTokenControl"
    return new Promise((resolve, reject) => {
        fetch(fectAdress , {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json())
        .then(res => resolve(res))
        .catch((err) => reject(err))
    });
}

export default userTokenControl