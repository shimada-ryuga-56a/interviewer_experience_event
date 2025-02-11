function roomDefinition() {
  members = extractMembers_();
  membersShuffle_(members);
  const rooms = [];

  for (let i = 0; i < members.length; i += 2) {
    const pair = members.slice(i, i + 2);
    if (members.length % 2 !== 0 && i + 2 >= members.length) {
      rooms[rooms.length - 1] += `＆${pair[0]}`;
    } else {
      rooms.push(`部屋${(i / 2) + 1}：${pair.join('＆')}`);
    }
  }

  Logger.log(rooms.join("\n"));
}

function setMemberOptions(){
  const feedbackFormId = '1HQInx4x88Za_tn2ghHVej9sB-pDovcQNF5Rpu3HBxzA';
  const feedbackForm = FormApp.openById(feedbackFormId);
  members = extractMembers_();
  members = addingIndexToArray_(members);

  const items = feedbackForm.getItems();
  const question1 = items[0];
  const question2 = items[1];
  updatingFormChoices_(question1, members)
  updatingFormChoices_(question2, members)
}

// メンバー取得
function extractMembers_(){
  const spreadsheetId = '12PIQT57for32SwLgyU1Y8eYp2YGE_jPbk8zt8TewPRw';
  const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  const range = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1);
  const values = range.getValues();
  const members = values.map(function(row) {
    return row[0];
  });
  return members;
}

// メンバーのシャッフル処理
function membersShuffle_(members) {
  members.sort(() => Math.random() - 0.5);
}

// フォームの選択肢を更新
function updatingFormChoices_(question, choices) {
  question.asMultipleChoiceItem().setChoiceValues(choices);
}

// 配列の各要素にindexを付す
function addingIndexToArray_(arr) {
  result = arr.map(function(a, index) {
    return (index + 1) + "：" + a
  })
  return result;
}
