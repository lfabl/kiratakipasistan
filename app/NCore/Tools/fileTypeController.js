import Toast from 'react-native-simple-toast';

export const fileTypeController = async (files, type) => {
    return await new Promise((resolve, reject) => {
        const newFiles = [];
        const errorStatus = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            console.log(file)
            const fileType = file[type].toLowerCase();
            if (fileType === "image/jpg" || fileType === "image/png" || fileType === "image/jpeg") {
                newFiles.push(file)
            }
            else {
                Toast.show("Lütfen sadece jpg, png formatında resimler giriniz.", Toast.LONG, ['UIAlertController']);
                errorStatus.push({})
            }
            if (index + 1 === files.length) {
                console.log("newFİles", newFiles)
                resolve({
                    response: newFiles,
                    errorStatus: errorStatus
                });
            }
        }
    })
}