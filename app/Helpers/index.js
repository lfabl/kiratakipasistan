export function turkishSort(a, b){
    var atitle = a;
    var btitle = b;
    var alfabe = "0123456789AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz";
    if (atitle.length === 0 || btitle.length === 0) {
        return atitle.length - btitle.length;
    }
    for (var i = 0; i < atitle.length && i < btitle.length; i++) {
        var ai = alfabe.indexOf(atitle[i].turkishToLower());
        var bi = alfabe.indexOf(btitle[i].turkishToLower());
        if (ai !== bi) {
            return ai - bi;
        }
    }
}