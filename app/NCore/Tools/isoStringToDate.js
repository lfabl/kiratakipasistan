
export const isoStringToDate = async (iso,type) => {
    const date = new Date(iso);
    const year = date.getUTCFullYear();
    const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hour = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const dates = type === "date" ? " " + year + "/" + month + "/" + day  :  " " + hour + ":" + minutes
    return dates
}