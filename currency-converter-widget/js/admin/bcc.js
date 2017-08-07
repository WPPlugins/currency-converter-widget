jQuery.noConflict();
var ypFrame = document.createElement("IFRAME");
function widgetTrigger(ypFrame, type, lang) {
	var langg = (lang != '-1' && typeof lang != 'undefined') ? '&lang='+lang : "";
	var uniqID = bcc.uniqID;
	var yp='';
	ypFrame.id = uniqID;
	ypFrame.name = uniqID;
	ypFrame.style = "border:none;min-width:170px;min-height:300px";
	ypFrame.width = (type == 'custom') ? jQuery('#width').val()+"px" : ((type == 'fix') ? "170px" : "100%");
	ypFrame.height = (type == 'custom') ? jQuery('#height').val()+"px" : ((type == 'fix') ? "300px" : "100%");
	document.getElementById("currency-bcc-"+uniqID).appendChild(ypFrame);
	var ypElem = document.getElementById(uniqID).parentNode.childNodes;
	var l = false;
	var width = (type == 'custom') ? jQuery('#width').val() : ((type == 'fix') ? 170 : 0);
	var height = (type == 'custom') ? jQuery('#height').val() : ((type == 'fix') ? 300 : 0);
	for(var i=0;i < ypElem.length;i++) {
		if (ypElem[i].nodeType == 1 
			&& ypElem[i].nodeName == "A" 
			&& ypElem[i].href == "https://www.currency.wiki/" 
			&& !(ypElem[i].rel 
			&& (ypElem[i].rel.indexOf('nofollow') + 1))) {
			var strStyle = jQuery('#style').val();
			var strFontColor = jQuery('#font_color').val();
			var ypTmp = ypElem[i];
			yp=JSON.stringify({
				w:width,
				h:height,
				nodeType:ypElem[i].nodeType,
				nodeName:ypElem[i].nodeName,
				href :ypElem[i].href,
				rel:ypElem[i].rel,
				cd:uniqID,
				f:jQuery('#from').val(),
				t:jQuery('#to').val(),
				c:strStyle.replace("#", ""),
				fc:strFontColor.replace("#", "")
			});
			l=true;
			break;
		}
	}
	if (l && yp) {
		var url = "https://www.currency.wiki/widget/w.php?wd=1&tm="+bcc.time+langg;
		url = url.replace(/\"/g, "");
		ypFrame.setAttribute("src", url);
		var w = window.frames[uniqID];
		ypFrame.onload = function() {
			w.postMessage({"t": yp}, "*");
		}
		/*ypTmp.parentNode.removeChild(ypTmp);*/
	}
	else {
		console.log('Something went wrong, please try later.');
	}
}
widgetTrigger(ypFrame, 'fix');
jQuery(document).ready(function($) {
    $('#style, #font_color').wpColorPicker();
});
jQuery('input[name="size"]').change(function() {
	if (jQuery('input[name="size"]:checked').val() == 'custom') {
		jQuery('#width-section').show();
		jQuery('#height-section').show();
	} else {
		jQuery('#width-section').hide();
		jQuery('#height-section').hide();
	}
});
jQuery('.currency-bcc-widget-input-preview').bind('click', function() {
	var strStyle = jQuery('#style').val();
	var strFontColor = jQuery('#font_color').val();

	var type = jQuery('input[name="size"]:checked').val();

	var width = (type == 'custom') ? jQuery('#width').val() : ((type == 'fix') ? 170 : 0);
	var height = (type == 'custom') ? jQuery('#height').val() : ((type == 'fix') ? 280 : 0);
	var lang = (jQuery('#lang').val() != "-1") ? ' lang="'+jQuery('#lang').val()+'"' : "";

	jQuery('#shortcode-input').val('[currency_bcc w="'+width+'" h="'+height+'" s="'+strStyle.replace("#", "")+'" fc="'+strFontColor.replace("#", "")+'" f="'+jQuery('#from').val()+'" t="'+jQuery('#to').val()+'" type="'+type+'"'+lang+']');
	widgetTrigger(ypFrame, type, jQuery('#lang').val());
});