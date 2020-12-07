import { serverAdres } from "../config";

const userTokenControl = async (params) => {
    const fectAdress = serverAdres + "/auth/userTokenControl"
    return await fetch(fectAdress , {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then((res) => res.json())
        .catch((err) => err)
}

export default userTokenControl