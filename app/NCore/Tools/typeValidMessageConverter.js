
export const typeValidMessageConverter = async ({ message, title }) => {
    const findTypeText = await findType({ message, title });
    const findErrorText = await findError({ message });
    return findTypeText + " Parametresi " + findErrorText;
}

const findError = async ({ message }) => {
    return await new Promise(async (resolve, reject) => {
        const errorTypes = [
            {
                title: "Mail",
                convert: "Mail şartını sağlamamıştır."
            },
            {
                title: "EmptyString",
                convert: "Boş olamaz"
            },
            {
                title: "Length",
                convert: "Gerekli metin uzunluğunu sağlayamadı."
            },
            {
                title: "isUserName",
                convert: "Kullanıcı adı gerekliliklerini sağlayamadı."
            },
            {
                title: "isPhone",
                convert: " Telefon numarası şartlarını sağlayamadı."
            }
        ]
        errorTypes.map((item) => {
            if (message.indexOf(item.title) !== -1) {
                resolve(item.convert)
            }
        })
    })
}

const findType = async ({ message, title }) => {
    const types = [
        {
            title: "title",
            convert: title + " Başlığı"
        },
        {
            title: "fullName",
            convert: title + " İsimi"
        },
        {
            title: "tcIdentity",
            convert: "TC NO"
        },
        {
            title: "phoneNumber1",
            convert: title + " Telefon Numarası 1"
        },
        {
            title: "phoneNumber2",
            convert: title + " Telefon Numarası 2"
        },
        {
            title: "tenantAdress",
            convert: title + " Adresi"
        },
        {
            title: "suretyFullName",
            convert: "Kefil İsmi"
        },
        {
            title: "suretyTcIdentity",
            convert: "Kefil TC No"
        },
        {
            title: "suretyPhoneNumber",
            convert: "Kefil Telefon Numarası"
        },
        {
            title: "suretyAdress",
            convert: "Kefil Adresi"
        },
        {
            title: "oldPassword",
            convert: "Eski Şifre"
        },
        {
            title: "newPassword",
            convert: "Yeni Şifre"
        },
        {
            title: "adress",
            convert: "Emlak Adresi"
        },
        {
            title: "electricity",
            convert: "Elektrik"
        },
        {
            title: "water",
            convert: "Su"
        },
        {
            title: "naturalGas",
            convert: "Doğal Gaz"
        },
        {
            title: "TCIPNo",
            convert: "Dask NO"
        },
        {
            title: "ownerNameSurname",
            convert: "Mal Sahibi Ad Soyad"
        },
        {
            title: "ownerManagerPhoneNumber",
            convert: "Mal Sahibi Telefon Numarası"
        },
        {
            title: "ownerTcIdentity",
            convert: "Mal Sahibi Kimlik Numarası"
        },
        {
            title: "ownerIban",
            convert: "Mal Sahibi İban"
        },
        {
            title: "detailDues",
            convert: "Adiat"
        },
        {
            title: "detailManagerPhoneNumber",
            convert: "Yönetici Telefon Numarası"
        },
        {
            title: "detailAdditionalInformation",
            convert: "Ek Bilgiler"
        },
        {
            title: "numberOfRoom",
            convert: "Oda Sayısı"
        },
        {
            title: "purposeOfUsage",
            convert: "Kullanım Amacı"
        },
        {
            title: "detailRent",
            convert: "Kira Bedeli"
        }
    ]
    return await new Promise((resolve, reject) => {
        types.map((item) => {
            if (message.indexOf(item.title) !== -1) {
                resolve(item.convert)
            }
        })
    })
}
