function sendWhatsAppMessage(chatId, message) {
  var idInstance = '7103870108'; // Ganti dengan idInstance Anda
  var apiTokenInstance = '9c8d195d81004a22b3ec961b4ab397d5ba8d47646faf4efabc'; // Ganti dengan apiTokenInstance Anda

  var url = 'https://api.green-api.com/waInstance' + idInstance + '/sendMessage/' + apiTokenInstance;

  var payload = {
    'chatId': chatId,
    'message': message
  };

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(url, options);

  Logger.log(response.getContentText()); // Untuk melihat respon dari permintaan HTTP
}
function onFormSubmit(e) {
    Logger.log("Function onFormSubmit triggered.");

    var spreadsheetId = '1WH28lXIS_tr7GfVZKzenu3bex9KZRJc4bHiuSTdJVkQ';
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var listRentalSheet = spreadsheet.getSheetByName("List Perental");
    var formResponsesSheet = spreadsheet.getSheetByName("Form Rentalan");

    if (!formResponsesSheet) {
        Logger.log("Lembar kerja 'Form Rentalan' tidak ditemukan.");
        return;
    } else {
        Logger.log("'Form Rentalan' sheet found.");
    }

    // Mendapatkan kolom 'Id'
    var idColumn = formResponsesSheet.getRange("A:A").getValues().flat();
    var lastIdRow = -1;

    // Loop dari akhir kolom 'Id' untuk mencari baris dengan 'Id' terakhir yang valid
    for (var i = idColumn.length - 1; i >= 0; i--) {
        if (idColumn[i]) {
            lastIdRow = i + 1; // Tambahkan 1 karena indeks array dimulai dari 0, sedangkan baris spreadsheet dimulai dari 1
            break;
        }
    }

    // Menghitung ID baru
    var newId = lastIdRow != -1 ? parseInt(formResponsesSheet.getRange(lastIdRow, 1).getValue()) + 1 : 1;

    if (lastIdRow == -1) {
        Logger.log("Tidak dapat menemukan baris dengan 'Id' yang valid.");
        return;
    }

    // Mengambil data dari baris dengan 'Id' terakhir
    var lastRowData = formResponsesSheet.getRange(lastIdRow, 1, 1, formResponsesSheet.getLastColumn()).getValues()[0];

    // Mengambil header dari "Form Rentalan" dan "List Perental"
    var headers = formResponsesSheet.getRange(1, 1, 1, formResponsesSheet.getLastColumn()).getValues()[0];
    var listRentalHeaders = listRentalSheet.getRange(1, 1, 1, listRentalSheet.getLastColumn()).getValues()[0];

    // Get index for "Timestamp" and "FOTO IDENTITAS" from "Form Rentalan"
    var timestampIndex = headers.indexOf("Timestamp");
    var tanggalAmbilIndex = headers.indexOf("Tanggal Ambil");
    var tanggalRentalIndex = headers.indexOf("Tanggal Rental");
    var pilihKostumIndex = headers.indexOf("Pilih Kostum");
    var pilihLainLainIndex = headers.indexOf("KARAKTER LAIN LAIN SILAHKAN ISI DI SINI (TIDAK ADA DI LIST) ");
    var pengirimanIndex = headers.indexOf("Pengiriman");
    var hargaRentalIndex = headers.indexOf("Harga Rental");
    var namaLengkapIndex = headers.indexOf("Nama Lengkap");
    var alamatLengkapIndex = headers.indexOf("Alamat Lengkap");
    var akunSosmedIndex = headers.indexOf("Akun Sosmed (Instagram/Facebook Yang Active!)");
    var hpWhatsappIndex = headers.indexOf("HP/Whatsapp (isikan No HP)");
    var kontakDaruratIndex = headers.indexOf("Kontak Darurat (isikan No HP)");
    var fotoIdentitasIndex = headers.indexOf("FOTO IDENTITAS");
    var fotoSelfieIndex = headers.indexOf("FOTO SELFIE");
    var buktiPembayaranIndex = headers.indexOf("BUKTI PEMBAYARAN");
    var profileSosmedIndex = headers.indexOf("PROFILE SOSMED");
    var buktiRentalIndex = headers.indexOf("BUKTI RENTALAN TEMPAT LAIN");

    // Get index for "Tanggal" and "Foto Identitas" from "List Perental"
    var tanggalIndexInListRental = listRentalHeaders.indexOf("Tanggal");
    var tanggalAmbilIndexInListRental = listRentalHeaders.indexOf("Tanggal Ambil");
    var tanggalRentalIndexInListRental = listRentalHeaders.indexOf("Tanggal Rental");
    var pengirimanIndexInListRental = listRentalHeaders.indexOf("Pengiriman");
    var krakterCosplayIndexInListRental = listRentalHeaders.indexOf("Krakter Cosplay");
    var hargaRentalIndexInListRental = listRentalHeaders.indexOf("Harga Rental");
    var namaIndexInListRental = listRentalHeaders.indexOf("Nama");
    var alamatIndexInListRental = listRentalHeaders.indexOf("Alamat");
    var akunSosmedIndexInListRental = listRentalHeaders.indexOf("Akun Sosmed");
    var hpWhatsappIndexInListRental = listRentalHeaders.indexOf("Hp/Whatsapp");
    var kontakDaruratIndexInListRental = listRentalHeaders.indexOf("Kontak Darurat");
    var fotoIdentitasIndexInListRental = listRentalHeaders.indexOf("Foto Identitas");
    var fotoSelfieIndexInListRental = listRentalHeaders.indexOf("Foto Selfie");
    var profileSosmedIndexInListRental = listRentalHeaders.indexOf("Ss Profile Sosmed");
    var buktiRentalIndexInListRental = listRentalHeaders.indexOf("Ss Bukti Rentalan Tempat Lain");
    var buktiPembayaranIndexInListRental = listRentalHeaders.indexOf("Bukti Pembayaran");

    if (timestampIndex != -1 && fotoIdentitasIndex != -1 && tanggalIndexInListRental != -1 && fotoIdentitasIndexInListRental != -1) {

        // Definisikan data yang ingin diambil
        var timestampValue = lastRowData[timestampIndex];
        var tanggalAmbilValue = lastRowData[tanggalAmbilIndex];
        var tanggalRentalValue = lastRowData[tanggalRentalIndex];
        var pilihKostumValue = lastRowData[pilihKostumIndex];
        var pilihLainLainValue = lastRowData[pilihLainLainIndex];
        var pengirimanValue = lastRowData[pengirimanIndex];
        var hargaRentalValue = lastRowData[hargaRentalIndex];
        var namaLengkapValue = lastRowData[namaLengkapIndex];
        var alamatLengkapValue = lastRowData[alamatLengkapIndex];
        var akunSosmedValue = lastRowData[akunSosmedIndex];
        var hpWhatsappValue = lastRowData[hpWhatsappIndex];
        var kontakDaruratValue = lastRowData[kontakDaruratIndex];
        var buktiPembayaranValue = lastRowData[buktiPembayaranIndex];
        var profileSosmedValue = lastRowData[profileSosmedIndex];
        var buktiRentalValue = lastRowData[buktiRentalIndex];
        var fotoIdentitasValue = lastRowData[fotoIdentitasIndex];
        var fotoSelfieValue = lastRowData[fotoSelfieIndex];
        Logger.log("Timestamp Value: " + timestampValue);

        // Kirim data ke sheet List Perental
        var newRowData = new Array(listRentalHeaders.length).fill(""); // Membuat array dengan panjang yang sama dengan jumlah kolom di List Perental, diisi dengan string kosong
        if (pilihKostumValue === "LAIN LAIN") {
          pilihKostumValue = pilihLainLainValue;
        }
        newRowData[0] = newId; // Mengisi kolom ID dengan ID baru
        newRowData[tanggalIndexInListRental] = timestampValue;
        newRowData[tanggalAmbilIndexInListRental] = tanggalAmbilValue;
        newRowData[tanggalRentalIndexInListRental] = tanggalRentalValue;
        newRowData[krakterCosplayIndexInListRental] = pilihKostumValue;
        newRowData[pengirimanIndexInListRental] = pengirimanValue;
        newRowData[hargaRentalIndexInListRental] = hargaRentalValue;
        newRowData[namaIndexInListRental] = namaLengkapValue;
        newRowData[alamatIndexInListRental] = alamatLengkapValue;
        newRowData[akunSosmedIndexInListRental] = akunSosmedValue;
        newRowData[hpWhatsappIndexInListRental] = hpWhatsappValue;
        newRowData[kontakDaruratIndexInListRental] = kontakDaruratValue;
        newRowData[buktiPembayaranIndexInListRental] = buktiPembayaranValue;
        newRowData[profileSosmedIndexInListRental] = profileSosmedValue;
        newRowData[buktiRentalIndexInListRental] = buktiRentalValue;
        newRowData[fotoIdentitasIndexInListRental] = fotoIdentitasValue;
        newRowData[fotoSelfieIndexInListRental] = fotoSelfieValue;

        listRentalSheet.appendRow(newRowData); // Menambahkan data ke List Perental

        var chatId = '6287786776251@c.us'; // Ganti dengan chatId yang sesuai
        var message = '==========================='+'\n' +'*Orderan Baru Rentalan Cosplay.Krw_*' + '\n' + 'Nama: '+ namaLengkapValue + '\n' +'Kostum: ' + pilihKostumValue + '\n' + 'Tanggal Order:  ' + timestampValue + '\n' +'Tanggal Rental: ' + tanggalRentalValue + '\n' + 'Akun IG: ' + akunSosmedValue + '\n'+ '\n'+ 'Segera lakukan pengecekan dan melakukan pengiriman ya sayangku💝💝💝' +'\n'+'==========================='; 

  sendWhatsAppMessage(chatId, message);
    } else {
        Logger.log("Kolom yang diperlukan tidak ditemukan dalam lembar kerja yang sesuai.");
    }
}
