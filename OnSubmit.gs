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

    // Mengambil header dari "Form Rentalan"
    var headers = formResponsesSheet.getRange(1, 1, 1, formResponsesSheet.getLastColumn()).getValues()[0];

    var timestampIndex = headers.indexOf("Timestamp");
    var fotoIdentitasIndex = headers.indexOf("FOTO IDENTITAS");

    if (timestampIndex != -1 && fotoIdentitasIndex != -1) {
        var timestampValue = lastRowData[timestampIndex];
        var fotoIdentitasValue = lastRowData[fotoIdentitasIndex];
        Logger.log("Timestamp Value: " + timestampValue);
        Logger.log("FOTO IDENTITAS Value: " + fotoIdentitasValue);

        listRentalSheet.appendRow([timestampValue, fotoIdentitasValue]);
    } else {
        Logger.log("Kolom 'Timestamp' atau 'FOTO IDENTITAS' tidak ditemukan dalam lembar kerja 'Form Rentalan'.");
    }
}
