// ==UserScript==
// @name       指定ユーザでログイン
// @namespace  http://d.hatena.ne.jp/yamap_55/
// @version    0.6
// @description  指定ユーザでログインします。
// @match      http://*/*Login.html
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2013-
// ==/UserScript==
var LoginTableFunction = function(userSelector,passSelector,buttonSelector) {
    this.userSelector = userSelector;
    this.passSelector = passSelector;
    this.buttonSelector = buttonSelector;
}
LoginTableFunction.prototype.create = function(args) {
    var t = $('<table>',
              {
                  id:'idtable'
              }).append($('<tr>').append($('<th>').text('Name'))).css("border","1px solid #ddd").appendTo("body");
    
    var that = this;
    args.forEach(function(arg){
        var name = arg[0]
        var id = arg[1]?arg[1]:name;
        var pass = arg[2]?arg[2]:id;
        t.append($('<tr>',{
            click: function(){
                $(that.userSelector).val(id);
                $(that.passSelector).val(pass);
                $(that.buttonSelector).trigger("click");
            }}).css("cursor","pointer").hover(
            function(){$(this).css("background-color",'#d8d8d8');},
            function(){$(this).css("background-color",'#ffffff');}
        ).append($('<td>',{
            id:name,
            text:name
        })))
    });
    $('#idtable tr').each(function(i) {
        if(i != 0) {
            $(this).prepend($('<td>',{text:i}));
        } else {
            $(this).prepend($('<th>',{text:"No."}));
        }
    });
}
var user = '#login_user';
var password = '#login_password';
var button = '#login_button';
var func = new LoginTableFunction(user, password, button);

func.create([
    ["test01"],
    ["admin"],
    ["特殊ユーザ","hoge","huga"]
]);
