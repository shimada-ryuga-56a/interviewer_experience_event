// メンバーのシャッフル処理
function membersShuffle(members) {
  members.sort(() => Math.random() - 0.5);
}

function getMembers() {
  // スプレッドシートのIDを指定
  const spreadsheetId = '12PIQT57for32SwLgyU1Y8eYp2YGE_jPbk8zt8TewPRw'; // ここにスプレッドシートIDを入力
  const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();

  // C列（3列目）のデータを取得（ヘッダーを除く）
  const range = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1);
  const values = range.getValues();

  // 配列として格納
  const members = values.map(function(row) {
    return row[0];
  });

  membersShuffle(members);

  // 結果をログに出力
  Logger.log(members);
}
