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
    var fotoIdentitasIndex = headers.indexOf("FOTO IDENTITAS");

    // Get index for "Tanggal" and "Foto Identitas" from "List Perental"
    var tanggalIndexInListRental = listRentalHeaders.indexOf("Tanggal");
    var fotoIdentitasIndexInListRental = listRentalHeaders.indexOf("Foto Identitas");

    if (timestampIndex != -1 && fotoIdentitasIndex != -1 && tanggalIndexInListRental != -1 && fotoIdentitasIndexInListRental != -1) {
        var timestampValue = lastRowData[timestampIndex];
        var fotoIdentitasValue = lastRowData[fotoIdentitasIndex];
        Logger.log("Timestamp Value: " + timestampValue);
        Logger.log("FOTO IDENTITAS Value: " + fotoIdentitasValue);

        var newRowData = new Array(listRentalHeaders.length).fill(""); // Membuat array dengan panjang yang sama dengan jumlah kolom di List Perental, diisi dengan string kosong
        newRowData[tanggalIndexInListRental] = timestampValue;
        newRowData[fotoIdentitasIndexInListRental] = fotoIdentitasValue;

        listRentalSheet.appendRow(newRowData); // Menambahkan data ke List Perental
    } else {
        Logger.log("Kolom yang diperlukan tidak ditemukan dalam lembar kerja yang sesuai.");
    }
}
