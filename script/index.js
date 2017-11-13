/**
 * 模仿後端的假資料
 * 同時將後端與前端接口的變數名稱設定好
 */
const listJsonData = [{isfinsh: false, checkedDate:"2017/11/13 16:12", checkName: "Doctype (檔案類型)", checkLevel: "Height" , checkContent: "Doctype 是 HTML5，同時要放在 HTML 頁面的最上面。"}, {isfinsh: false, checkedDate:"", checkName: "Charset (字符)", checkLevel: "Height", checkContent: "Charset = UTF-8 被正確的宣告。"}, {isfinsh: false, checkedDate:"", checkName: "X-UA-Compatible (IE 相容設定)", checkLevel: "Medium", checkContent: "X-UA-Compatible meta 標籤存在。"}, {isfinsh: false, checkedDate:"2017/11/13 16:12", checkName: "Doctype (檔案類型)", checkLevel: "Height" , checkContent: "Doctype 是 HTML5，同時要放在 HTML 頁面的最上面。"}, {isfinsh: false, checkedDate:"", checkName: "Charset (字符)", checkLevel: "Height", checkContent: "Charset = UTF-8 被正確的宣告。"}, {isfinsh: false, checkedDate:"", checkName: "X-UA-Compatible (IE 相容設定)", checkLevel: "Medium", checkContent: "X-UA-Compatible meta 標籤存在。"}, {isfinsh: false, checkedDate:"2017/11/13 16:12", checkName: "Doctype (檔案類型)", checkLevel: "Height" , checkContent: "Doctype 是 HTML5，同時要放在 HTML 頁面的最上面。"}, {isfinsh: false, checkedDate:"", checkName: "Charset (字符)", checkLevel: "Height", checkContent: "Charset = UTF-8 被正確的宣告。"}, {isfinsh: false, checkedDate:"", checkName: "X-UA-Compatible (IE 相容設定)", checkLevel: "Medium", checkContent: "X-UA-Compatible meta 標籤存在。"}, {isfinsh: false, checkedDate:"2017/11/13 16:12", checkName: "Doctype (檔案類型)", checkLevel: "Height" , checkContent: "Doctype 是 HTML5，同時要放在 HTML 頁面的最上面。"}, {isfinsh: false, checkedDate:"", checkName: "Charset (字符)", checkLevel: "Height", checkContent: "Charset = UTF-8 被正確的宣告。"}, {isfinsh: false, checkedDate:"", checkName: "X-UA-Compatible (IE 相容設定)", checkLevel: "Medium", checkContent: "X-UA-Compatible meta 標籤存在。"}, {isfinsh: false, checkedDate:"2017/11/13 16:12", checkName: "Doctype (檔案類型)", checkLevel: "Height" , checkContent: "Doctype 是 HTML5，同時要放在 HTML 頁面的最上面。"}, {isfinsh: false, checkedDate:"", checkName: "Charset (字符)", checkLevel: "Height", checkContent: "Charset = UTF-8 被正確的宣告。"}, {isfinsh: false, checkedDate:"", checkName: "X-UA-Compatible (IE 相容設定)", checkLevel: "Medium", checkContent: "X-UA-Compatible meta 標籤存在。"}, {isfinsh: false, checkedDate:"2017/11/13 16:12", checkName: "Doctype (檔案類型)", checkLevel: "Height" , checkContent: "Doctype 是 HTML5，同時要放在 HTML 頁面的最上面。"}, {isfinsh: false, checkedDate:"", checkName: "Charset (字符)", checkLevel: "Height", checkContent: "Charset = UTF-8 被正確的宣告。"}, {isfinsh: false, checkedDate:"", checkName: "X-UA-Compatible (IE 相容設定)", checkLevel: "Medium", checkContent: "X-UA-Compatible meta 標籤存在。"}, {isfinsh: false, checkedDate:"2017/11/13 16:12", checkName: "Doctype (檔案類型)", checkLevel: "Height" , checkContent: "Doctype 是 HTML5，同時要放在 HTML 頁面的最上面。"}, {isfinsh: false, checkedDate:"", checkName: "Charset (字符)", checkLevel: "Height", checkContent: "Charset = UTF-8 被正確的宣告。"}, {isfinsh: false, checkedDate:"", checkName: "X-UA-Compatible (IE 相容設定)", checkLevel: "Medium", checkContent: "X-UA-Compatible meta 標籤存在。"}]
/**
 */

let content_HTML = '<div class="checklist-title">Meta 標籤</div>';
let navigatorHTML = '';
const checkListBody = document.getElementsByClassName('checklist-body');
const navigatorBody = document.getElementsByClassName('navigator-body');

updateChecklist();
updateNavigator();

function updateChecklist() {
  listJsonData.forEach((obj) => {
    let temp_HTML = '';
    temp_HTML += `<div class="checklist-item">` +
      `<div class="check-wrap">` +
      `<div class="control-zoom">` +
      `<input class="checkbox" type="checkbox"/>` +
      `<div class="checked-date">${obj.checkedDate} 完成</div>` +
      `<div class="delete-btn"><i class="fa fa-times" aria-hidden="true"></i></div></div>` +
      `<div class="title-zoom">` +
      `<div class="check-level">${obj.checkLevel}</div>` +
      `<div class="check-name">${obj.checkName}：</div></div>` +
      `<div class="check-content">${obj.checkContent}</div>` +
      `<div class="other-detail-btn"><i class="fa fa-angle-double-down" aria-hidden="true"></i></div></div>` +
      `<div class="drag-bar"><i class="fa fa-arrows-v" aria-hidden="true"></i></div></div></div>`;
    content_HTML += temp_HTML;
  })
  checkListBody[0].innerHTML = content_HTML;
}

function updateNavigator() {
  listJsonData.forEach((obj) => {
    let tempHTML = '';
    tempHTML += `<div class="navigator-item">${obj.checkName}</div>`;
    navigatorHTML += tempHTML;
  })
  navigatorBody[0].innerHTML = navigatorHTML;
}
