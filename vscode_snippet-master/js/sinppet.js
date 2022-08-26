$(function () {
    $('.set_list input,#daima').keydown(function(e){
        var e=e || event;
        if(e.keyCode==73 && e.ctrlKey){
            var daima=$('#daima').val();
            var num=daima.split('${').length
            var start=$('#daima')[0].selectionStart+4
            var end=start+7
            insertText($('#daima')[0],'${'+num+':example}')
            
            setSelectRange( $('#daima')[0],start, end )
        }
        
        ToDo()
    })
    $('.set_list input,#daima').keyup(function(e){
        ToDo()
    })
    $('#dollar').change(function(){
        ToDo()
    })
    $('.copy').click(function(){
        $('#snippet_result').select();
        document.execCommand("Copy");
    })
})

function setSelectRange( textarea, start, end ) 
{
if ( typeof textarea.createTextRange != 'undefined' )// IE 
{ 
var range = textarea.createTextRange(); 
// 先把相对起点移动到0处 
range.moveStart( "character", 0) 
range.moveEnd( "character", 0); 
range.collapse( true); // 移动插入光标到start处 
range.moveEnd( "character", end); 
range.moveStart( "character", start); 
range.select(); 
} // if 
else if ( typeof textarea.setSelectionRange != 'undefined' ) 
　{ 
　　 textarea.setSelectionRange(start, end); 
　　 textarea.focus(); 
　} // else 
} 

function insertText(obj,str) {
    
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += str;
    }
}

// 实时生成snippet
function ToDo(){
    var name=$('.name input[type="text"]').val();
    var prefix=$('.prefix input[type="text"]').val();
    var dollar=$('#dollar').is(':checked');
    var daima=$('#daima').val();
    var snippet='';
    if(daima!=''){
        var line_arr=daima.split('\n');
        if(line_arr.length){
            $.each(line_arr, function (i, v) {
                
                if(v.indexOf('"')>=0){
                    v=replaceAllSR(v,'"','\\"');
                }
                if(dollar && v.indexOf('$')>=0){
                    v=v.replace(/[$]/g, '\\\\$') 
                }
                
                /* if(v.indexOf("  ")==0){
                    v=replaceAllSR(v,'  ','\\t');
                }
                if(v.indexOf("	")==0){
                    v=replaceAllSR(v,"	",'\\t');
                } */
                v= replaceTab(v)
                snippet+='\t\t"'+v+'"'
                snippet+=i==line_arr.length-1?'\n':',\n';

            });
            if(daima.indexOf('$')>=0){
                $('.prefix label').show()
            }
            else{
                $('.prefix label').hide()

            }
        }
        // snippet=replaceAllSR(daima,'\n','\\n');
    }
    var result=
    ',\n"'+
    name+'": {\n'+
		'\t"prefix": "'+prefix+'",\n'+
		'\t"body": [\n'+
        snippet+
        // '\t\t""\n'+
		'\t],\n'+
		'\t"description": "'+name+'"\n'+
	'}';
    var resObj=$('#snippet_result')
    resObj.val(result)
}

function replaceTab(v){
    var result=v;
    var tab='';
    for(var i=0;i<v.length;i++){
        var t=v.charAt(i)
        if(t!="  " && t!="	"&& t!="    "){
            break;
        }
        else{
            tab+='\\t'
            result=result.substr(1)
        }
    }
    return (tab+result);
    

}
// 把s里面的p全部替换为q，存在则替换，不存在则直接返回s
function replaceAllSR(s,p,q){
    if(s.indexOf(p)>=0){
      var re_w = new RegExp(p, "g");
      s=s.replace(re_w,q)
    }
    return s;
}