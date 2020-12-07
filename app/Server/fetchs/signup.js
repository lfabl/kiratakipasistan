import { serverAdres } from "../config";

const signin = async (params) => {
    const fectAdress = serverAdres + "/auth/signup"
    return await fetch(fectAdress, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then((res) => res.json())
        .catch((err) => err)
}

export default signin