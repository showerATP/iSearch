$(function() {

var mdata={};
var url = '/javascripts/site.json';
var site=$('#c_editor').attr('site')
if(site){
url = '/site/json/'+site;
}

$.getJSON(url, function(data) {
mdata=data;
render_editor_form(mdata);
render_event_form(mdata);
});
var render_editor_form=function(data){
$('#c_editor').val($.toJSON(data));
};
var render_event_form=function(){
$('#c_save').on('click',function(event){
var data = {};
data['content'] = JSON.stringify(mdata);
$.ajax({
type: "POST",
url: '/site/add',
dataType: 'json',
data: data,
success: function (data, textStatus){
if(data.success){
$('#msg').html('成功保存!');
$('#msg').addClass('alert alert-success');
$(location).attr('href','/site/'+mdata.name);
} else {
$('#msg').html(data.err);
$('#msg').addClass('alert alert-error');
}
}
});
});
};
});
