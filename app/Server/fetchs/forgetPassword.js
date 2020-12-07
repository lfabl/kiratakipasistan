import { serverAdres } from "../config";

const forgetPassword = async (params) => {
    const fectAdress = serverAdres + "/auth/forgetPassword"
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

export default forgetPassword