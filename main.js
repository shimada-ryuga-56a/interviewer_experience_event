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

  const rooms = [];

  for (let i = 0; i < members.length; i += 2) {
    const pair = members.slice(i, i + 2);
    if (members.length % 2 !== 0 && i + 2 >= members.length) {
      rooms[rooms.length - 1] += `＆${pair[0]}`;
    } else {
      rooms.push(`部屋${(i / 2) + 1}：${pair.join('＆')}`);
    }
  }

  Logger.log(rooms);
}
