class Messages{
    static Successful = "İşlem Başarılı";
    static Unsuccessful = "İşlem Başarısız";
    static DataNotFound = "Veri Bulunamadı";
    static databaseConnectionError = "Veritabanına bağlantı başarısız";
    static AuthorizationDenied = "Yetkilendirme reddedildi";
    static UserNotFound = "Kullanıcı bulunamadı";
    static FillEmptyPlaces = "Lütfen boş alanları doldurunuz";
    static NotFoundClaimForThisOperation = "Bu operasyon için bir yetki bulunamadı";
    static UserAlreadyExist = "Bu kullanıcı sistemde halihazırda mevcut";
    static CodeDateExpired = "Bu kodun kullanım süresi sona ermiştir";
}

module.exports = Messages;