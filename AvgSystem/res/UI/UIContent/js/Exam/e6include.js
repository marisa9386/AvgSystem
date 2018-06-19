var Ess_Framework_OnSubmit = [];
function registerOnSubmitHandler(obj, handler) {
    Ess_Framework_OnSubmit[Ess_Framework_OnSubmit.length] = { 'o': obj, 'f': handler };
}
function callSubmitHandlers() {
    for (var i = 0; i < Ess_Framework_OnSubmit.length; i++) {
        var o = Ess_Framework_OnSubmit[i].o;
        var f = Ess_Framework_OnSubmit[i].f;
        if (o && f && (typeof (f) == 'function')) {
            f.call(o);
        }
    }
}

var FineServerUrl = "http://11.0.0.92:8040/WebReport";

var FineReportUrl = "http://11.0.0.92:8040/WebReport/ReportServer?";

/************************ Begin: sulh 2013/10/14 报表相关函数 ********************/
function getReportUrl() {
    return "http://11.0.0.92:8040/WebReport/ReportServer?";
}

function FineReportLoginUrl(username, password) {
    var url = getReportUrl();
    var src = url + "op=fr_auth&cmd=sso&username=" + username + "&password=" + password;
    return src;
}
/************************ End: sulh 2013/10/14 报表相关函数 ********************/

function getSiteRootAddress() {
    var root = window.location.protocol + "//" + window.location.host;
    // if the host address is configured to point directly to the root folder, the next lines of code should be commented out.
    var app = window.location.pathname;
    if (app.indexOf("/", 1) > -1) {
        app = app.substring(0, app.indexOf("/", 1));
        root += app;
    }
    // end comment section for host configuration.
    return root;
}
function openWindowCenter(theURL, winName, w, h, features) {
    var winl = (screen.width - w) / 2;
    var wint = (screen.height - h) / 2;
    var settings;
    var newWin
    if (features != '') {
        settings = features + ',';
    }
    //CAL: 20060729 - Addded additional settings += 'status=yes' + ',' to make the status bar visible for any window that is opened
    settings += 'status=yes' + ',';
    settings += 'height=' + h + ',';
    settings += 'width=' + w + ',';
    settings += 'top=' + wint + ',';
    settings += 'left=' + winl + ',';
    // NKS: 20040619 - Added additional if(theURL != '') to avoid 'Page cannot be found error'
    if (theURL != '') {
        if (theURL.toLowerCase().indexOf('showclose') == -1) {
            theURL += '&showclose=yes';
        }
    }
    winName = winName.replace(/[^\w_]/g, '_');
    newWin = window.open(theURL, winName, settings);
    return newWin;
}
function OpenLookup(listXml, txtDisp, txtVal, title, doPostBack, noNew, filterParams, searchParam) {
    var val = self.document.forms[0].elements[txtVal].value;
    var disp = self.document.forms[0].elements[txtDisp].value;
    // var url = '../Common/e6lookup.aspx?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title) ;
    var url = getURL('../Common/ZYlookup.aspx');

    url += '?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title);
    if (doPostBack != null && doPostBack == 'true') {
        url += '&doPostBack=true';
    }
    if (noNew != null && noNew == 'true') {
        url += '&nonew=true';
    }
    if (filterParams != null) {
        url += '&filter=' + filterParams
    }
    if (val == '' && disp != '' && disp.replace(/\s/g, '') != ',') {
        url += '&searchfor=' + encodeURIComponent(disp);
    }
    if (searchParam != null && searchParam != '') {
        url += '&searchparam=' + encodeURIComponent(searchParam);
    }
    return openWindowCenter(AddSessionParamsToUrl(url), title, 860, 600, 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=yes');
}
//sulh:2012/12/10 添加新放大镜链接
function OpenNewLookup(listXml, txtDisp, txtVal, title, doPostBack, noNew, filterParams, searchParam) {
    var val = self.document.forms[0].elements[txtVal].value;
    var disp = self.document.forms[0].elements[txtDisp].value;
    // var url = '../Common/e6lookup.aspx?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title) ;
    var url = getURL('../Common/ZYnewlookup.aspx');

    url += '?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title);
    if (doPostBack != null && doPostBack == 'true') {
        url += '&doPostBack=true';
    }
    if (noNew != null && noNew == 'true') {
        url += '&nonew=true';
    }
    if (filterParams != null) {
        url += '&filter=' + filterParams
    }
    if (val == '' && disp != '' && disp.replace(/\s/g, '') != ',') {
        url += '&searchfor=' + encodeURIComponent(disp);
    }
    if (searchParam != null && searchParam != '') {
        url += '&searchparam=' + encodeURIComponent(searchParam);
    }
    return openWindowCenter(AddSessionParamsToUrl(url), title, 860, 600, 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=yes');
}
//sulh:2012/12/10 添加新放大镜链接
function OpenColumnNewLookup(listXml, txtDisp, txtVal, title, doPostBack, noNew, filterParams, txtSel, controlSource, displaySource, searchParam) {
    var val = self.document.forms[0].elements[txtVal].value;
    var disp = self.document.forms[0].elements[txtDisp].value;
    // var url = '../Common/e6lookup.aspx?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title) ;
    var url = getURL('../Common/ZYColumnNewlookup.aspx');

    url += '?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&txtsel=" + txtSel + "&controlSource=" + controlSource + "&displaySource=" + displaySource + "&title=" + encodeURIComponent(title);
    if (doPostBack != null && doPostBack == 'true') {
        url += '&doPostBack=true';
    }
    if (noNew != null && noNew == 'true') {
        url += '&nonew=true';
    }
    if (filterParams != null) {
        url += '&filter=' + filterParams
    }
    if (val == '' && disp != '' && disp.replace(/\s/g, '') != ',') {
        url += '&searchfor=' + encodeURIComponent(disp);
    }
    if (searchParam != null && searchParam != '') {
        url += '&searchparam=' + encodeURIComponent(searchParam);
    }
    return openWindowCenter(AddSessionParamsToUrl(url), title, 860, 600, 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=yes');
}
//sulh:2013/05/12 添加新放大镜链接
function OpenCLookup(listXml, txtDisp, txtVal, title, doPostBack, noNew, filterParams, primaryKeyword, displayValue, searchParam) {

    var val = self.document.forms[0].elements[txtVal].value;
    var disp = ""; //self.document.forms[0].elements[txtDisp].value;
    // var url = '../Common/e6lookup.aspx?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title) ;
    var url = getURL('../Common/ZYClookup.aspx');
    url += '?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title);
    if (doPostBack != null) {
        //if (doPostBack != null && doPostBack == 'true') {
        url += '&doPostBack=true';
    }
    if (noNew != null && noNew == 'true') {
        url += '&nonew=true';
    }
    if (filterParams != null) {
        url += '&filter=' + filterParams
    }
    if (val == '' && disp != '' && disp.replace(/\s/g, '') != ',') {
        url += '&searchfor=' + encodeURIComponent(disp);
    }
    if (primaryKeyword != null && primaryKeyword != '') {
        url += '&primaryKeyword=' + encodeURIComponent(primaryKeyword);
    }
    if (displayValue != null && displayValue != '') {
        url += '&displayValue=' + encodeURIComponent(displayValue);
    }
    if (searchParam != null && searchParam != '') {
        url += '&searchparam=' + encodeURIComponent(searchParam);
    }
    return openWindowCenter(AddSessionParamsToUrl(url), title, 860, 600, 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=yes');
}
function OpenValidation(theURL, winName, w, h, features) {
    var winw;
    var winh;
    var url;
    winw = (w == null ? 640 : w);
    winh = (h == null ? 480 : h);
    if (features == null || features == '') {
        features = 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=no';
    }
    // add session params to the url
    url = AddSessionParamsToUrl(theURL);
    url = getURL(url);
    var newUrl = getURL("../Common/e6browse.aspx");

    newUrl += '?';
    if (winName != null && winName != '') {
        newUrl += "title=" + winName.replace(/\_/g, '+') + "&";
    }
    newUrl += "pageurl=" + encodeURIComponent(url);
    newUrl = AddSessionParamsToUrl(newUrl);
    newUrl += '&objnum=-1';
    openWindowCenter(newUrl, winName, winw, winh, features);
}
function OpenNewWindow(theURL, winName, w, h, features) {
    var winw;
    var winh;
    var url;
    winw = (w == null ? 640 : w);
    winh = (h == null ? 480 : h);
    if (features == null || features == '') {
        features = 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=yes';
    }
    // add session params to the url
    url = AddSessionParamsToUrl(theURL);
    url = getURL(url);
    openWindowCenter(url, winName, winw, winh, features);
}
function ContainerToggleHideBody(sID, oObj, oHid, collapseImageUrl, expandImageUrl) {
    var pageID = document.forms[0].PageID.value;
    var oTarget = oObj.parentElement.parentElement.parentElement.parentElement.nextSibling;
    if (collapseImageUrl == null || collapseImageUrl == '') {
        collapseImageUrl = 'images/Section_arrow_close.png';
    }
    if (expandImageUrl == null || expandImageUrl == '') {
        expandImageUrl = "images/Section_arrow_open.png";
    }
    if (oTarget.style.display == 'none') {
        oTarget.style.display = 'block';
        oObj.src = collapseImageUrl;
        oHid.value = 'Expanded';

        // check tab shown
        var hidObj = eval("document.forms[0]." + sID + "TabHid");
        var isTabShown = hidObj.value == "Show" ? 2 : 0

        var newState = isTabShown | 1;
        saveState(pageID + sID, newState);
    }
    else {
        oTarget.style.display = 'none';
        oObj.src = expandImageUrl;
        oHid.value = 'Collapsed';

        // check tab shown
        var hidObj = eval("document.forms[0]." + sID + "TabHid");
        var isTabShown = hidObj.value == "Show" ? 2 : 0

        var newState = isTabShown | 0;
        saveState(pageID + sID, newState);
    }
    if (sID == 'searchSection') {
        $('#resultSection').css('marginTop', $("#searchSection").height() + 0 + 'px');
        //    alert($("#searchSection").height() + 5);
    }
}
function AddItemToList(fromList, toList, oHid) {
    var textToAdd;
    var valToAdd;
    var exists = false;
    var i;
    var j;
    var somethingAdded = false;
    if (fromList.selectedIndex != -1) {
        for (j = 0; j < fromList.length; j++) {
            if (fromList.options[j].selected) {
                textToAdd = fromList.options[j].text;
                valToAdd = fromList.options[j].value;
                exists = false;
                for (i = 0; i < toList.length; i++) {
                    if (toList.options[i].text == textToAdd) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    toList.options[toList.length] = new Option(textToAdd, valToAdd);
                    somethingAdded = true;
                }
            }
        }
        if (somethingAdded) {
            BuildSelectedList(toList, oHid);
        }
    }
}
function RemoveItemFromList(oList, oHid) {
    var i;
    if (oList.selectedIndex != -1) {
        for (i = oList.length - 1; i >= 0; i--) {
            if (oList.options[i].selected) {
                oList.options[i] = null;
            }
        }
        BuildSelectedList(oList, oHid);
    }
}
function BuildSelectedList(oList, oHid) {
    var xml;
    xml = '<Selected>';
    for (i = 0; i < oList.length; i++) {
        xml += '<Option Name="';
        xml += oList.options[i].text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        xml += '" Value="';
        xml += oList.options[i].value;
        xml += '" />';
    }
    xml += '</Selected>';
    oHid.value = xml;
}
function AddSessionParamsToUrl(url) {
    var oParams;
    oParams = self.document.getElementById('hidUrlParams');
    if (oParams != null && oParams.value != '') {
        var params = oParams.value;
        if (url.indexOf('?modid=') > -1) {
            params = params.replace(/\?modid\=[0-9]*&?/, '?');
        }
        else if (url.indexOf('&modid=') > -1) {
            params = params.replace(/&modid\=[0-9]*/, '');
        }
        url += (url.indexOf('?') > 0 ? '&' : '?') + params;
    }
    return url;
}
function popupGridEdit(sender) {
    var url;
    var mode;
    url = document.getElementById(sender.parentId).popupUrl;
    mode = self.document.getElementById('hidEditMode');
    if (mode != null && mode.value.toUpperCase() == 'READONLY') {
        var msg = getResourceString('NoPermissionsToEditItemJSMsg', 'You do not have permissions to edit this item.');
        alert(msg);
        //alert('You do not have permissions to edit this item.') ;
    }
    else {
        url += url.indexOf('?') > 0 ? '&' : '?';
        url += 'row=' + sender.rowIndex;
        url += '&gridid=' + sender.parentId;
        //AHM 20060215 Added objnum querystring parameter to URL for EHLookup on popup page.
        url += '&objnum=' + self.document.getElementById('hidObjnum').value;
        var w;
        var h;
        w = (sender.popupWidth != null ? sender.popupWidth : 600);
        h = (sender.popupHeight != null ? sender.popupHeight : 360);
        //document.getElementById('hidRow'+sender.parentId).value = sender.rowIndex ;
        var target;
        var startIndex;
        var endIndex;
        startIndex = url.indexOf('/') > -1 ? url.lastIndexOf('/') : 0;
        endIndex = url.indexOf('.') > -1 ? url.lastIndexOf('.') : url.length;
        //REV: 20040513 SAG incrementing startIndex by 1 to exclude "/"
        //REV: 20040615 AHM Modified the second parameter being passed to openWindowCenter() from url.substring(startIndex+1,endIndex-startIndex) to url.substring(startIndex+1,endIndex)
        target = openWindowCenter('', url.substring(startIndex + 1, endIndex), w, h, 'resizable=yes,scrollbars=yes');
        document.forms['popupData'].action = AddSessionParamsToUrl(url);
        document.forms['popupData'].target = target.name;
        document.forms['popupData'].hidData.value = sender.xmldata;
        document.forms['popupData'].submit();
    }
}
function popupGridNew(gridId, width, height) {
    var grid;
    var mode;
    mode = self.document.getElementById('hidEditMode');
    if (mode != null && mode.value.toUpperCase() == 'READONLY') {
        var msg = getResourceString('NoPermissionsToAddItemsJSMsg', 'You do not have permissions to add items.');
        alert(msg);
        //alert('You do not have permissions to add items.') ;
    }
    else {
        grid = document.getElementById(gridId);
        url = grid.popupUrl;
        url += url.indexOf('?') > 0 ? '&' : '?';
        url += 'row=-1';
        url += '&gridid=' + gridId;
        //AHM 20060215 Added objnum querystring parameter to URL for EHLookup on popup page.
        url += '&objnum=' + self.document.getElementById('hidObjnum').value;
        var target;
        var w;
        var h;
        if (width != null && width != '') {
            w = width;
        }
        else if (document.getElementById(gridId).popupWidth != null) {
            w = document.getElementById(gridId).popupWidth;
        }
        else {
            w = 600;
        }
        if (height != null && height != '') {
            h = height;
        }
        else if (document.getElementById(gridId).popupHeight != null) {
            h = document.getElementById(gridId).popupHeight;
        }
        else {
            h = 360;
        }
        var startIndex;
        var endIndex;
        startIndex = url.indexOf('/') > -1 ? url.lastIndexOf('/') : 0;
        endIndex = url.indexOf('.') > -1 ? url.lastIndexOf('.') : url.length;
        //REV: 20040513 SAG incrementing startIndex by 1 to exclude "/"
        //REV: 20040615 AHM Modified the second parameter being passed to openWindowCenter() from url.substring(startIndex+1,endIndex-startIndex) to url.substring(startIndex+1,endIndex)
        target = openWindowCenter('', url.substring(startIndex + 1, endIndex), w, h, 'resizable=yes,scrollbars=yes');
        document.forms['popupData'].action = AddSessionParamsToUrl(url);
        document.forms['popupData'].target = target.name;
        document.forms['popupData'].hidData.value = '<Status>NEW</Status>';
        document.forms['popupData'].submit();
    }
}
function xmlEncode(stringToEncode) {
    var retVal = stringToEncode.replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    return retVal;
}
function xmlDecode(stringToDecode) {
    var retVal = stringToDecode.replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    return retVal;
}
function validationClose() {
    self.close();
}
function setParentActionFlag(action) {
    var openerForm;
    if (self.opener != null) {
        openerForm = self.opener.document.forms[0];
        if (openerForm.Action != null) {
            openerForm.Action.value = action;
        }
    }
    else if (self.parent.opener != null) {
        if (self.parent.opener.document.forms[0].Action != null) {
            self.parent.opener.document.forms[0].Action.value = action;
        }
    }
    if (window.parent != null && window.parent.document.all.browseframe != null) {
        if (window.parent.document.frames['browseframe'].document.getElementById('Action') != null) {
            window.parent.document.frames['browseframe'].document.getElementById('Action').value = action;
        }
    }
}
function essGridSelectRow(chkBox, recid, index) {
    var id;
    var pattern;
    var gridid;
    var grid;
    var rowCount;
    var hidSel;
    var hidLast;
    var checked;
    checked = chkBox.checked;
    id = chkBox.id;
    pattern = /ctl(\d{0,})_chkSelect(\d{1,})/;
    // [INTRACK-RTY] Fix for PIC# 13275. Modified as rendering of controls in .Net 2.0 is different.
    gridid = id.replace(/_ctl00_ctl(\d{0,})_chkSelect(\d{1,})/, '');
    grid = document.getElementById(gridid);
    rowCount = grid.rowCount;
    hidSel = document.getElementById(gridid + '_hidSelected');
    hidLast = document.getElementById(gridid + '_hidLastClicked');
    if (event.shiftKey) {
        if (hidLast.value != '') {
            var start;
            var end;
            start = Math.min(hidLast.value, index);
            end = Math.max(hidLast.value, index);
            for (i = start; i <= end; i++) {
                var chk;
                // [INTRACK-RTY] Fix for PIC# 13275. Modified as rendering of controls in .Net 2.0 is different.
                if (i < 9)
                    chk = document.getElementById(id.replace(pattern, 'ctl0' + eval(i + 1) + '_chkSelect' + eval(i)));
                else
                    chk = document.getElementById(id.replace(pattern, 'ctl' + eval(i + 1) + '_chkSelect' + eval(i)));
                chk.checked = checked;
            }
        }
    }
    hidSel.value = '';
    for (i = 0; i < rowCount; i++) {
        var ctrl;
        // [INTRACK-RTY] Fix for PIC# 13275. Modified as rendering of controls in .Net 2.0 is different.
        if (i < 9)
            ctrl = document.getElementById(id.replace(pattern, 'ctl0' + eval(i + 1) + '_chkSelect' + eval(i)));
        else
            ctrl = document.getElementById(id.replace(pattern, 'ctl' + eval(i + 1) + '_chkSelect' + eval(i)));
        if (ctrl.checked) {
            if (hidSel.value != '') { hidSel.value += ','; }
            hidSel.value += ctrl.parentElement.idval;
        }
    }
    if (checked) {
        hidLast.value = index;
    }
    else {
        hidLast.value = '';
    }
}
function DateChecker(obj, dateFormat) {
    if (dateFormat == null || dateFormat == '') {
        dateFormat = "MM/DD/YYYY";
    }
    ////2013-8-1  hanyafeng 修改原因，输入的年份过大，加一最大值限制
    if ((obj.value != '') && (obj.value.substr(0, 4) > "2999")) {
        var msg = '日期不能大于"2999-12-31",请重新选择';
        alert(msg);
        obj.focus();
        obj.value = "";
        return;
    }
    //END 

    if ((obj.value != '') && (!isValidDate(obj.value, dateFormat) && !isValidDate(obj.value, 'yyyy-MM-dd') && !isValidDate(obj.value, 'yyyy/MM/dd')))
    //if ((obj.value != '') && !isValidDate(obj.value, dateFormat))
    {
        obj.value = '';
        var msg = "无效的日期。";
        msg += "\n" + "日期输入格式必须为：";
        msg += " yyyy-MM-dd 或 yyyy/MM/dd";
        //msg += " " + dateFormat; //msg +"\n     "+ getResourceString('MMDDYYYYDateFormatJSMsg', 'MM/DD/YYYY') ;
        msg = msg + "\n" + "请重新输入。";
        alert(msg);
        //alert('Invalid Date. Date must be in the form:\n     MM/DD/YYYY\nPlease re-enter.');
        obj.focus();
    }
}
function SetJavascriptDate(dateTimeCtrlId, autoSetTime) {
    var dateString = "";
    if ($get(dateTimeCtrlId + "_txtDate")) {
        dateString = $get(dateTimeCtrlId + "_txtDate").value;
        // make sure we have a valid date
        if (dateString != "") {
            $get(dateTimeCtrlId).value = getDateWithFormat(dateString);
        }
    }
    var txtHour = $get(dateTimeCtrlId + "_txtHour");
    var txtMin = $get(dateTimeCtrlId + "_txtMinute");
    var txtSec = $get(dateTimeCtrlId + "_txtSecond");
    var ddlAmPm = $get(dateTimeCtrlId + "_ddlAMPM");
    if (txtHour) {
        if (!$get(dateTimeCtrlId).value) $get(dateTimeCtrlId).value = new Date();
        if (txtHour.value != "") {
            var iHour = parseInt(txtHour.value);
            if (ddlAmPm != null) {
                if (iHour < 12 && ddlAmPm.options[ddlAmPm.selectedIndex].value == "PM") {
                    iHour += 12;
                }
                else if (iHour == 12 && ddlAmPm.options[ddlAmPm.selectedIndex].value == "AM") {
                    iHour = 0;
                }
            }
            $get(dateTimeCtrlId).value.setHours(iHour);
        }
        if (txtMin.value != "") {
            $get(dateTimeCtrlId).value.setMinutes(txtMin.value);
        }
        if (txtSec.value != "") {
            $get(dateTimeCtrlId).value.setSeconds(txtSec.value);
        }
        if (autoSetTime && dateString != "" && txtHour.value == "" && txtMin.value == "" && txtSec.value == "") {
            var d = new Date();
            var hour = d.getHours();
            if (ddlAmPm) {
                if (hour == 0) {
                    txtHour.value = '12';
                    ddlAmPm.value = 'AM';
                }
                else if (hour < 12) {
                    txtHour.value = hour;
                    ddlAmPm.value = 'AM';
                }
                else if (hour == 12) {
                    txtHour.value = '12';
                    ddlAmPm.value = 'PM';
                }
                else {
                    txtHour.value = hour - 12;
                    ddlAmPm.value = 'PM';
                }
            }
            else {
                txtHour.value = hour;
            }
            var min = d.getMinutes();
            var sec = d.getSeconds();
            if (min < 10) min = '0' + min;
            if (sec < 10) sec = '0' + sec;
            txtMin.value = min;
            txtSec.value = sec;
        }
    }
}
//Date validation - includes leap year
//supports multiple formats with /, - and . as seperators
function isValidDate(strDate, dateFormat) {
    if (dateFormat == null || dateFormat == '') {
        dateFormat = "MM/DD/YYYY";
    }
    else {
        dateFormat = dateFormat.toUpperCase();
    }
    var format = dateFormat.match(/^([MD]{1,2}|YY|YYYY)([\/\-\.])([MD]{1,2}|YY|YYYY)([\/\-\.])([MD]{1,2}|YY|YYYY)$/);
    if (format == null || format.length != 6) {
        alert(getResourceString('InvalidDateFormatJSMsg', 'Invalid date format.'));
        return false;
    }
    //var datePat = /^(\d{1,4})([\/\-\.])(\d{1,4})([\/\-\.])(\d{1,4})$/ ;
    var datePat = new RegExp("^(\\d{1,4})(\\" + format[2] + ")(\\d{1,4})(\\" + format[4] + ")(\\d{1,4})$");
    var matchArray = strDate.match(datePat);
    if (matchArray == null) { return false; }

    err = 0

    a = matchArray[1];
    b = matchArray[3];
    c = matchArray[5];
    y = "YYYY";

    for (i = 1; i < 6; i++) {
        if (format[i].indexOf('M') > -1) {
            a = matchArray[i];
        }
        if (format[i].indexOf('D') > -1) {
            b = matchArray[i];
        }
        if (format[i].indexOf('Y') > -1) {
            c = matchArray[i];
            y = format[i];
        }
    }

    //basic error checking
    if ((a == "") || (b == "") || (c == "")) {
        err = 1;
    }
    else {
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            err = 1;
        }
        else {
            if (a < 1 || a > 12) err = 1;
            if (b < 1 || b > 31) err = 1;
            if (y == "YYYY" && (c < 1800 || c > 9999)) err = 1; //for date range checking if needed
            if (y == "YY") {
                if (c < 0 || c > 99) { err = 1; }
                else {
                    if (c > 50) { c += 1900; }
                    else { c += 2000; }
                }
            }
            // months with 30 days
            if (a == 4 || a == 6 || a == 9 || a == 11) { if (b == 31) err = 1 }
            // february, leap year
            if (a == 2) {
                if (b > 29) err = 1;
                //leap year?
                //divis by 4 check
                if (b == 29 && ((c / 4) != parseInt(c / 4))) err = 1;
                //divis by 1000 but not 400 check
                if ((b == 29) && ((c / 4) == parseInt(c / 4)) && ((c / 1000) == parseInt(c / 1000)) && ((c / 400) != parseInt(c / 400))) err = 1;
            }
        }
    }
    //return values

    if (err == 1) { return false; }
    else { return true; }
}
function chkTextAreaLength(controlName, controlValue, maxLength) {
    if (controlValue.length > maxLength)
        return false;
    else
        return true;
}
// function called by onload on popup forms
function popupLoad(parentFlag) {
    if (document.forms[0].hidAction.value != '') {
        setParentActionFlag(parentFlag);
        var openerDoc;
        var gridId;
        var xml;
        var rowNum;
        gridId = document.forms[0].hidGridId.value;
        xml = document.forms[0].hidXml.value;
        rowNum = document.forms[0].hidRowNum.value;
        if (self.opener != null) {
            openerDoc = self.opener.document;
            openerDoc.getElementById('hid' + gridId).value = xml;
            openerDoc.getElementById('hidRow' + gridId).value = rowNum;
        }
        if (typeof (myClose) == 'function') {
            myClose();
        }
        else {
            self.close();
        }
    }
}

function IsEmpty(elementId) {
    if (document.getElementById(elementId).value == '' || document.getElementById(elementId).value == '*NULL*') {
        return true;
    }
    else {
        return false;
    }
}

function IsNumeric(elementId) {
    if (isNaN(parseInt(document.getElementById(elementId).value, 10))) {
        return false;
    }
    else {
        return true;
    }
}
var result, dt1, dt2;
function CompareDate(startDate, endDate, operator) {
    if (!IsEmpty(startDate) && !IsEmpty(endDate)) {
        dt1 = new Date(document.getElementById(startDate).value);
        dt2 = new Date(document.getElementById(endDate).value);
        execScript('result = dt1 ' + operator + ' dt2');
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
}

function ClearLookup(objLookup, objLookupVal, clearAll) {
    // 8 -> Backspace.
    // 46 -> Delete.
    if (event.keyCode == 8 || event.keyCode == 46) {
        document.getElementById(objLookupVal).value = '';
        if (clearAll == null || clearAll) {
            objLookup.value = '';
            return false;
        }
    }
}
function lookupKeyPress(listXml, txtDisp, txtVal, title, doPostBack, noNew, filterParams, searchParam) {
    if (event.keyCode == 13) // Enter
    {
        OpenLookup(listXml, txtDisp, txtVal, title, doPostBack, noNew, filterParams, searchParam);
    }
    else {
        document.getElementById(txtVal).value = '';
    }
}
function validateLookupControl(src, arg) {
    arg.IsValid = true;
    if (arg.Value != '') {
        var valId = src.id.replace(/_valid/g, '_val');
        if (document.getElementById(valId).value == '') {
            arg.IsValid = false;
        }
    }
}
function getResourceString(resourceName, defaultStr, isLabel) {
    var url = getURL('../Common/e6resource.aspx');
    if (isLabel) {
        url += '?uiresourcename=';
    }
    else {
        url += '?resourcename=';
    }
    url += resourceName;
    var xmlhttp;
    if (typeof (XMLHttpRequest) != 'undefined') {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, false);
        xmlhttp.send("");
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.Open("GET", url, false);
        xmlhttp.Send("");
    }
    var resStr = xmlhttp.responseText;
    if (resStr == '') {
        resStr = defaultStr;
    }
    return resStr;
}
function getDateWithFormat(dateString, dateFormat) {
    if (dateFormat == null || dateFormat == '') {
        if (document.getElementById('hidDateFormat')) {
            dateFormat = document.getElementById('hidDateFormat').value.toUpperCase();
        }
        else {
            dateFormat = "MM/DD/YYYY";
        }
    }
    else {
        dateFormat = dateFormat.toUpperCase();
    }
    if (!isValidDate(dateString, dateFormat)) {
        return null;
    }
    var year;
    var month;
    var day;
    var validDate = true;
    var format = dateFormat.match(/^([MD]{1,2}|YY|YYYY)([\/\-\.])([MD]{1,2}|YY|YYYY)([\/\-\.])([MD]{1,2}|YY|YYYY)$/);
    if (format != null && format.length == 6) {
        //var datePat = /^(\d{1,4})([\/\-\.])(\d{1,4})([\/\-\.])(\d{1,4})$/ ;
        var datePat = new RegExp("^(\\d{1,4})(\\" + format[2] + ")(\\d{1,4})(\\" + format[4] + ")(\\d{1,4})$");
        var matchArray = dateString.match(datePat);
        if (matchArray != null) {
            for (i = 1; i < 6; i++) {
                if (format[i].indexOf('M') > -1) {
                    month = parseInt(matchArray[i]) - 1;
                    if (month < 0 || month > 11) { validDate = false; }
                }
                if (format[i] == "YYYY") {
                    year = matchArray[i];
                    if (year < 1800 || year > 9999) { validDate = false; }
                }
                if (format[i] == "YY") {
                    year = matchArray[i];
                    if (year > 50) { year += 1900; }
                    else { year += 2000; }
                }
                if (format[i].indexOf('D') > -1) {
                    day = parseInt(matchArray[i]);
                    if (day < 0 || day > 31) { validDate = false; }
                }
            }
        }
        else {
            validDate = false;
        }
    }
    else {
        validDate = false;
    }
    if (validDate) {
        return new Date(year, month, day);
    }
    else {
        return null;
    }
}
// The enableTrackDeviationsCheckbox() function is called from both the Task Setup & Results (TSAR) 
// and Process Data Entry Results (PDER) dialogs.  
function enableTrackDeviationsCheckbox(control) {
    var section = control.id.substring(0, control.id.lastIndexOf('_'));

    if (document.getElementById(control.id).checked) {
        // This block is only relative to the TSAR dialog.
        if (document.getElementById('secTaskSetup_pnlTrackDeviations') != null) {
            document.getElementById('secTaskSetup_pnlTrackDeviations').disabled = true;
        }

        // This is relative to both pages.
        document.getElementById(section + '_btnTrackDeviations').style.display = 'inline';
    }
    else {
        // This block is only relative to the TSAR dialog.
        if (document.getElementById('secTaskSetup_pnlTrackDeviations') != null) {
            document.getElementById('secTaskSetup_pnlTrackDeviations').disabled = false;
        }

        // This is relative to both pages.
        document.getElementById(section + '_btnTrackDeviations').style.display = 'none';
    }
}
//	The openTrackDeviations() function is called by the Task Setup & Results (TSAR), Process Data Entry Results (PDER),
//	and Task List dialogs.  It is used to enter into the Deviation Tracking workflow.
function openTrackDeviations(intRecordID) {
    var isTaskDeviation = 'true';
    if (window.location.toString().indexOf('ProcessDataEntryResult') > -1)
        isTaskDeviation = 'false';

    //  var url	= '../E6Common/DeviationList.aspx?id=' + intRecordID + '&isTaskDeviation=' + isTaskDeviation ;
    var url = getURL('../Common/DeviationList.aspx');

    url += '?id=' + intRecordID + '&isTaskDeviation=' + isTaskDeviation;
    var features = 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=yes,status=yes';

    OpenValidation(url, 'Deviation_Tracking_List', 825, 600, features);
}

function OpenEHControlLookup(txtDisp, txtVal, config) {
    var url = getURL('../Common/BrowseList.aspx');

    url += '?list=' + config.LookupArg + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + config.SiteId + '&nonew=true';
    if ((config.FilterParams != null) && (config.FilterParams != '')) {
        url += '&filter=' + config.FilterParams;
    }
    if (config.ObjNum != null && config.ObjNum != '') {
        url += '&obj=' + config.ObjNum;
    }
    if (config.Mode != null && config.Mode != '') {
        url += '&mode=' + config.Mode;
    }
    if (config.ModId != null && config.ModId != '') {
        url += '&mod=' + config.ModId;
    }

    //None = 0
    //HierarchySecurityProfile = 1,
    //EntityAccessProfile = 2,
    //Default = HierarchySecurityProfile

    if (config.SecurityType == 0) {
        url += '&title=&applyEHSec=false&applyEntityProf=false';
    }
    else if (config.SecurityType == 1) {
        url += '&title=&applyEHSec=true&applyEntityProf=false';
    }
    else if (config.SecurityType == 2) {
        url += '&title=&applyEHSec=false&applyEntityProf=true';
    }

    return openWindowCenter(AddSessionParamsToUrl(url), '', 800, 620, 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=no');
}

//Depreciated - keeping around for legacy support
function OpenEHLookup(listXml, txtDisp, txtVal, title, doPostBack, noNew, filterParams, searchParam) {
    var val = self.document.forms[0].elements[txtVal].value;
    var disp = self.document.forms[0].elements[txtDisp].value;

    var uniqueIdentifier = txtDisp.substring(0, txtDisp.lastIndexOf('disp'));

    var txtObjNum = uniqueIdentifier + 'txtEHCtrlObjNum';
    var txtMode = uniqueIdentifier + 'txtEHCtrlMode';
    var txtModId = uniqueIdentifier + 'txtEHCtrlModId';
    var txtShowNonEmis = uniqueIdentifier + 'txtShowNonEmis';
    var txtApplyEHSec = uniqueIdentifier + 'txtApplyEHSec';
    var txtApplyEntityProf = uniqueIdentifier + 'txtApplyEntityProf';


    var objNum = self.document.forms[0].elements[txtObjNum].value;
    var mode = self.document.forms[0].elements[txtMode].value;
    var modId = self.document.forms[0].elements[txtModId].value;
    var showNonEmis = self.document.forms[0].elements[txtShowNonEmis].value;
    var applyEHSec = self.document.forms[0].elements[txtApplyEHSec].value;
    var applyEntityProf = self.document.forms[0].elements[txtApplyEntityProf].value;


    //	var url = '../Common/e6EHLookup.aspx?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title) ;
    //    var url = getURL('../Common/e6EHLookup.aspx') ;
    var url = getURL('../Common/BrowseList.aspx');

    url += '?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title);

    if (doPostBack != null && doPostBack == 'true') {
        url += '&doPostBack=true';
    }
    if (noNew != null && noNew == 'true') {
        url += '&nonew=true';
    }
    if (filterParams != null) {
        url += '&filter=' + filterParams
    }
    if (val == '' && disp != '' && disp.replace(/\s/g, '') != ',') {
        url += '&searchfor=' + encodeURIComponent(disp);
    }
    if (searchParam != null && searchParam != '') {
        url += '&searchparam=' + encodeURIComponent(searchParam);
    }
    if (objNum != null && objNum != '') {
        url += '&obj=' + objNum;
    }
    if (mode != null && mode != '') {
        url += '&mode=' + mode;
    }
    if (modId != null && modId != '') {
        url += '&mod=' + modId;
    }
    if (showNonEmis != null && showNonEmis != '') {
        url += '&showNonEmis=' + showNonEmis;
    }
    if (applyEHSec != null && applyEHSec != '') {
        url += '&applyEHSec=' + applyEHSec;
    }
    if (applyEntityProf != null && applyEntityProf != '') {
        url += '&applyEntityProf=' + applyEntityProf;
    }

    openWindowCenter(AddSessionParamsToUrl(url), title, 800, 620, 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=no');
}

function OpenRuleLookup(listXml, txtDisp, txtVal, title, doPostBack, noNew, filterParams, searchParam) {
    var val = self.document.forms[0].elements[txtVal].value;
    var disp = self.document.forms[0].elements[txtDisp].value;
    var url = getURL('../Compliance/e6RuleLookup.aspx');

    url += '?list=' + listXml + "&txtdisp=" + txtDisp + "&txtval=" + txtVal + "&val=" + val + "&title=" + encodeURIComponent(title);

    if (doPostBack != null && doPostBack == 'true') {
        url += '&doPostBack=true';
    }
    if (noNew != null && noNew == 'true') {
        url += '&nonew=true';
    }
    if (filterParams != null) {
        url += '&filter=' + filterParams
    }
    if (val == '' && disp != '' && disp.replace(/\s/g, '') != ',') {
        url += '&searchfor=' + encodeURIComponent(disp);
    }
    if (searchParam != null && searchParam != '') {
        url += '&searchparam=' + encodeURIComponent(searchParam);
    }
    openWindowCenter(AddSessionParamsToUrl(url), title, 800, 600, 'toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=yes');
}

function ToggleTimeZone(divToHide, divToShow) {
    self.document.getElementById(divToHide).style.visibility = 'hidden';
    self.document.getElementById(divToShow).style.visibility = 'visible';
}

function validateLookupRequired(oSrc, args) {
    args.IsValid = true;
    if (oSrc.ctrl != null && oSrc.ctrl != '') {
        var luDisp = document.getElementById(oSrc.ctrl + '_disp');
        if (luDisp != null && luDisp.value == '') {
            args.IsValid = false;
        }
    }
}
function validateHierarchyRequired(oSrc, args) {
    args.IsValid = true;
    if (oSrc.ctrl != null && oSrc.ctrl != '') {
        var luDisp = document.getElementById(oSrc.ctrl + '_disp');
        if (luDisp != null && luDisp.value == '') {
            args.IsValid = false;
        }
    }
}

//add by meibaoqiang at 20130806
//validate the select orgnize match entitytype of menuconfig
function validateHierachyMatched(oSrc, args) {
    args.IsValid = true;
    if (oSrc.controltovalidate != null && oSrc.controltovalidate != '') {
        var luDisp = document.getElementById(oSrc.controltovalidate);
        var baseId = oSrc.controltovalidate.replace('_disp', '');
        var luEntityTypeId = document.getElementById(baseId + '_txtSiteEntityId');
        var luMatchEntityType = document.getElementById(baseId + '_txtConfigEntityTypeValues');
        if (luMatchEntityType.value.indexOf(luEntityTypeId.value) < 0) {
            args.IsValid = false;
        }
    }
}

function validateComboRequired(oSrc, args) {
    args.IsValid = true;
    if (oSrc.ctrl != null && oSrc.ctrl != '' && oSrc.ddlctrl != null && oSrc.ddlctrl != '') {
        var luDisp = document.getElementById(oSrc.ctrl);
        var ddl = document.getElementById(oSrc.ddlctrl);
        if (luDisp != null) {
            args.IsValid = (luDisp.value != '');
        }
        else if (ddl != null) {
            args.IsValid = (ddl.value != null && ddl.value != '' && ddl.value != '-1');
        }
    }
}
function validateAutoCompleteRequired(oSrc, args) {
    args.IsValid = true;
    if (oSrc.ctrl != null && oSrc.ctrl != '') {
        var txt = document.getElementById(oSrc.ctrl + '_txtDisplay');
        if (txt != null && txt.value == '') {
            args.IsValid = false;
        }
    }
}
/************* Javascript function for EHEntitySelection control starts here************/
function AsnVal(uniqueidentifier, ctrl) {
    var uid = uniqueidentifier.replace(':', '_');
    var assignedValues = document.getElementById(uid + '_' + 'txtassignedValues');
    var insertValues = document.getElementById(uid + '_' + 'txtinsertValues');
    var deleteValues = document.getElementById(uid + '_' + 'txtdeleteValues');
    var ctrlValueArr = ctrl.value.split('|');
    if (ctrlValueArr[1] == '-1') {
        ESsetValues(uniqueidentifier, ctrl.checked, ctrlValueArr[0]);
    }

}
function EHSelectionCtrlcheckAll(uniqueidentifier, ctrl) {
    //Assign the checked site
    var childCtrl = document.getElementById('chk__' + ctrl);
    if ((childCtrl == null) || (typeof (childCtrl) == 'undefined')) {
        childCtrl = document.getElementById(uniqueidentifier + '_chk__' + ctrl);
    }
    AsnVal(uniqueidentifier, childCtrl);
    var ctrlChecked = childCtrl.checked == true ? true : false;
    var newCtrl = childCtrl;
    EHSelectionCtrlcheckChildren(uniqueidentifier, ctrl, ctrlChecked);
    EHSelectionApply(uniqueidentifier, ctrl, newCtrl, ctrlChecked);
}

function EHSelectionCtrlcheckChildren(uniqueidentifier, ctrlName, ctrlChecked) {
    var searchName = ctrlName.replace('_', '');
    var ctrlArray = document.getElementsByName(searchName);
    if (ctrlArray == null) {
        alert('ctrlArray IS NULL');
    }
    var chkControl;
    var uniqueIdent = uniqueidentifier;
    for (var i = 0; i < ctrlArray.length; i++) {
        var chk = ctrlArray[i];
        //Assign the values to checkbox only if the checkbox is enabled
        if (chk.disabled != true) {
            // Assign selected sites into a separate field
            chk.checked = ctrlChecked;
            //AsnVal(uniqueIdent,chk) ;
        }
        //Get the Checkboxes id 
        var temp = chk.id;
        //replace chkmain__ to get the id which will be the parent id of its children
        temp = temp.replace('chk__', '');
        //Find and check children
        EHSelectionCtrlcheckChildren(uniqueIdent, temp, ctrlChecked);
    }
}

function EHSelectionApply(uniqueidentifier, ctrlId, ctrlCheckbox, checked) {
    var objtxtAA = document.getElementById('txtAA__' + ctrlId);

    var ctrlValueArr = objtxtAA.value.split(',');
    for (var i = 0; i < ctrlValueArr.length - 1; i++) {
        ESsetValues(uniqueidentifier, checked, ctrlValueArr[i]);
    }
}

function ESsetValues(uniqueidentifier, checked, value) {
    var uid = uniqueidentifier.replace(':', '_');
    var assignedValues = document.getElementById(uid + '_' + 'txtassignedValues');
    var insertValues = document.getElementById(uid + '_' + 'txtinsertValues');
    var deleteValues = document.getElementById(uid + '_' + 'txtdeleteValues');
    if (value == '') return;
    if (checked) {
        if (insertValues != null) {
            if (insertValues.value.indexOf(value) < 0) {
                insertValues.value = insertValues.value + value + ',';
            }
        }
        if (assignedValues != null && insertValues != null && deleteValues != null) {
            if (assignedValues.value.indexOf(value) >= 0 || assignedValues.value.indexOf(value) >= 0) {
                insertValues.value = insertValues.value.replace(value + ',', '');
                deleteValues.value = deleteValues.value.replace(value + ',', '');
            }
        }
        else {
            if (deleteValues != null) {
                if (deleteValues.value.indexOf(value) < 0) {
                    deleteValues.value = deleteValues.value + value + ',';
                }
            }
            if (insertValues != null && deleteValues != null) {
                if (insertValues.value.indexOf(value) >= 0) {
                    insertValues.value = insertValues.value.replace(value + ',', '');
                    deleteValues.value = deleteValues.value.replace(value + ',', '');
                }
            }
        }
    }
    else {
        if (deleteValues != null) {
            if (deleteValues.value.indexOf(value) < 0) {
                deleteValues.value = deleteValues.value + value + ',';
            }
        }
        if (insertValues != null && deleteValues != null) {
            if (insertValues.value.indexOf(value) >= 0) {
                insertValues.value = insertValues.value.replace(value + ',', '');
                deleteValues.value = deleteValues.value.replace(value + ',', '');
            }
        }
    }
}
/************* Javascript function for EHEntitySelection control ends here************/

// Displays Audit Log browse pages
// Will display log records matching parameterized table name and primary key values
// added 'list' parameter to pass select xml name
function showAuditLog(title, tableName, idValue, list, childTableName) {

    var url = getURL('../Common/AuditLogBrowse.aspx');
    var vChildTableName = childTableName;
    url += '?tablename=' + tableName + '&pkid=' + idValue + '&title=' + title + '&list=' + list + '&type=logging';
    if (vChildTableName == null || vChildTableName == 'undefined') {
        vChildTableName = '';
    }
    url += '&childtablename=' + vChildTableName;
    url = AddSessionParamsToUrl(url);
    openWindowCenter(url, 'Compliance_Audit_Log', 900, 575, 'scrollbars=yes,resizable=yes');
}

//Added the scrollMe() method for R2 Req 7.2 
function scrollme() {
    if (document.getElementById('essActBtn') != null) {
        essActBtn.style.top = eval(document.body.scrollTop + 5);
    }
}

function switchView(win) {
    var confirmMessage = "切换显示将会丢失未保存的数据，确定要切换吗？";

    if (confirm(confirmMessage)) {
        var url = win.location.href;
        if (url.indexOf("switchview=true") == -1) {
            var del = "";
            if (url.indexOf("?") == -1) del = "?";
            url += del + "&switchview=true";
        }
        win.location = url;
    }
}
function actionButtonLoad(obName) {
    if (document.getElementById(obName)) {
        var ob = document.getElementById(obName);
        //当btnSave在时，btn控件显示
        //if (document.getElementById(obName + '_btnSave')) {
        //var btnsave = document.getElementById(obName + '_btnSave').parentElement.parentElement;
        //if (!ob || !btnsave) return;
        if (!ob) return;
        ob.style.display = "inline-block";
        ob.style.paddingTop = "2px";
        var ob1 = document.createElement("div");
        ob1.style.height = ob.clientHeight;
        while (ob.parentElement && ob.tagName != "TABLE") {
            ob = ob.parentElement;
        }
        //zhangjl 2013/3/13
        //IE9创建DOM元素的方式较之前有了改变，开始严格遵循标准的实现，不允许通过直接传入一个完整html标记的方式来创建Dom元素。
        //解决办法：采用标准的方式来实现
        //            if ((document.all ? 'IE' : 'others')=='IE' && /9.0/.test(navigator.userAgent)) {
        //                var of = document.createElement("iframe");
        //                of.setAttribute("width", "90%");
        //                of.setAttribute("src", "../../Common/BackLoad.htm");
        //                of.setAttribute("class", "bgiframe");
        //                of.setAttribute("style", "top:1px; padding:2px; background-image: url(../images/bd_bg.png);' margin-width='0' margin-top='0' frameborder='no' border='0' scrolling='no'");
        //            } else {
        //                var of = document.createElement("<iframe src='../../Common/BackLoad.htm' width='90%' style='top:1px; padding:2px; background-image: url(../images/bd_bg.png);' margin-width='0' margin-top='0' frameborder='no' border='0' scrolling='no'></iframe>");          
        //            }
        //            of.style.scrolling = "no";
        //            of.src = "../../Common/BackLoad.htm"
        if (ob.parentElement) {
            var op = ob.parentElement;
            op.insertBefore(ob1, ob);
            //                op.insertBefore(of, ob);
        }
        //ob.style.position = "absolute";
        //  ob.style.setExpression("top", "(eval(document.compatMode && document.compatMode=='CSS1Compat') ? documentElement.scrollTop : document.body.scrollTop)");
        ob.style.zIndex = 1;
        ob.style.width = "100%";
        ob.style.top = '0px';
        ob.style.border = "0px";
        ob.style.backgroundImage = "url(../images/bd_bg.png)";
        //            of.style.position = "absolute";
        //          //  of.style.setExpression("top", "(eval(document.compatMode && document.compatMode=='CSS1Compat') ? documentElement.scrollTop : document.body.scrollTop)");
        //            of.style.height = "28px";
        //            of.style.zIndex = 999;
    }
    //}
}
// 9-25-2006 MSY new function to add action buttons to a parent page if the data page is in an iframe.
//function actionButtonLoad(btnsId)
//{
//	// check if we are in the new iframe window
//	if ( window.parent!=null && window.parent.document.all.editframe!=null )
//	{
//	
//		// get the visible buttons
//		var html = '' ;
//		html += getHeaderButtonHTML(btnsId + "_btnNew") ;
//		html += getHeaderButtonHTML(btnsId + "_btnSave", "saveScrollPos();") ;
//		html += getHeaderButtonHTML(btnsId + "_btnSaveNew") ;
//		html += getHeaderButtonHTML(btnsId + "_btnCancel") ;
//		html += getHeaderButtonHTML(btnsId + "_btnDelete") ;
//		html += getHeaderButtonHTML(btnsId + "_btnCopy") ;
//		// set the buttons in the parent page
//		var spnBtns = window.parent.document.getElementById('spnButtons') ;
//		spnBtns.innerHTML = html ;
//		// hide essActBtn div if present
//		if ( document.getElementById('essActBtn') != null )
//		{
//			document.getElementById('essActBtn').style.display = 'none' ;
//		}
//			
//	}
//	else 
//	{
//		document.getElementById(btnsId).style.display='inline' ;
//		if ( document.getElementById('essActBtn') != null )
//		{
//			document.getElementById('essActBtn').style.top = 5 ;
//		}
//	}
//}
// 9-25-2006 MSY new function to add action buttons to a parent page if the data page is in an iframe.
function getHeaderButtonHTML(btnId, defaultClick) {
    var click = '';
    if (defaultClick != null) {
        click += defaultClick;
    }
    click += "document.frames['editframe'].document.getElementById('{0}').click()";
    var btn = document.getElementById(btnId);
    var html = '';
    if (btn != null) {
        if (btn.href != null && btn.href.toLowerCase().indexOf('e6browse.aspx') > -1) {
            click = "selectBrowse();";
            html += btn.innerHTML.replace(/img\s/i, 'img onclick="' + click + '" ');
        }
        else {
            html += btn.innerHTML.replace(/img\s/i, 'img onclick="' + click.replace(/\{0\}/, btnId) + '" ')
        }
        html += "&nbsp";
    }
    return html;
}
// 9-25-2006 MSY new function to hide action buttons and display a clock when save is clicked
function onSaveClickAfterValidation() {
    // check if the buttons are in the parent page
    if (window.parent != null && window.parent.document.all.editframe != null) {
        var spnBtns = window.parent.document.getElementById('spnButtons');
        var spnMsg = window.parent.document.getElementById('spnMsg');
        var lblMsg = window.parent.document.getElementById('lblMsg');
        //[INTRACK:KHU 20061011] Localizing Message.
        var msg = "请等待，正在保存数据";
        lblMsg.innerHTML = msg;
        //lblMsg.innerHTML = 'Please wait while your changes are saved.' ;
        spnBtns.style.display = 'none';
        spnMsg.style.display = 'inline';
    }
    else {
        var actionBtns = document.getElementById('btnAction');
        if (actionBtns != null) {
            // Localizing Message.
            var msg = "请等待，正在保存数据";
            //去掉弹出窗口中保存数据左上角显示保存信息 zhangjili 2013-8-15
            //actionBtns.innerHTML = "<div><IMG style='float:left;' src='../images/mpv2_clock.gif'><div style='vertical-align:middle;height:20px;line-height:20px;'>&nbsp;" + msg + "</div></div>";
            actionBtns.innerHTML = "<div></div>";
            //actionBtns.innerHTML = "<IMG src='../images/mpv2_clock.gif'>&nbsp;Please wait while your changes are saved." ;
        }
    }
}
/* Client-side access to querystring name=value pairs
Version 1.2.3
22 Jun 2005
Adam Vandenberg
*/
function Querystring(qs) { // optionally pass a querystring to parse
    this.params = new Object()
    this.get = Querystring_get

    if (qs == null)
        qs = location.search.substring(1, location.search.length)

    if (qs.length == 0) return

    // Turn <plus> back to <space>
    // See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
    qs = qs.replace(/\+/g, ' ')
    var args = qs.split('&') // parse out name/value pairs separated via &

    // split out each name=value pair
    for (var i = 0; i < args.length; i++) {
        var value;
        var pair = args[i].split('=')
        var name = decodeURIComponent(pair[0])

        if (pair.length == 2)
            value = decodeURIComponent(pair[1])
        else
            value = name

        this.params[name] = value
    }
}
function Querystring_get(key, default_) {
    // This silly looking line changes UNDEFINED to NULL
    if (default_ == null) default_ = null;

    var value = this.params[key]
    if (value == null) value = default_;

    return value
}
function getElementX(e) {
    var x = 0;
    while (e) {
        x += e.offsetLeft;
        e = e.offsetParent;
    }
    return x;
}
function getElementY(e) {
    var y = 0;
    while (e) {
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return y;
}
function toggleSubSection(img, divId) {
    var div = document.getElementById(divId);
    if (div && img) {
        if (div.style.display == 'none') {
            div.style.display = 'block';
            img.src = '../images/minus-white.gif';
        }
        else {
            div.style.display = 'none';
            img.src = '../images/plus-white.gif';
        }
    }
}
function getURL(url) {
    //the obvious checks
    if ((url == null) || (url.length <= 0))
        return url;

    //this function is for relative urls only (case insensative check)
    if (url.substring(0, 7).toLowerCase() == 'http://')
        return url;

    //pre-existing variable of essBase_dirOffset
    if ((typeof (essBase_DirOffSet) == 'undefined') || (essBase_DirOffSet == null)) {
        var AbsUrl = getAbsoluteURL(url);
        return AbsUrl;
    }

    var dirOffset = parseInt(essBase_DirOffSet);
    //most common behavior
    if (dirOffset == 0)
        return url;

    //we need to pad the url, because it is 1 or more folders deep
    if (dirOffset > 0) {
        for (var dirIndex = dirOffset; dirIndex > 0; --dirIndex) {
            url = '../' + url;
        }
        return url;
    }

    //the url is not within any folders, so we need to remove any '../' from the url
    if (dirOffset < 0) {
        url = url.replace(/[.][.]\//g, '');
        return url;
    }

    //we should never actually hit this block of code
    return url;
}

function getAbsoluteURL(url) {
    //the obvious checks
    if ((url == null) || (url.length <= 0))
        return url;

    var virtDir = "";
    var endPoint = 0;

    //we'll see if we can get the virtual directory from a different frame that we know some definitive information about
    if ((parent != null) && (parent.Shortcuts != null)) {
        var shortcutUrl = parent.document.frames['Shortcuts'].window.location.href;
        //we'll check to see if we're in a skin or not
        if (shortcutUrl.toLowerCase().indexOf('skins') >= 0) {
            virtDir = parent.document.frames['Shortcuts'].window.location.pathname.substring(1, (parent.document.frames['Shortcuts'].window.location.pathname.toLowerCase().indexOf('skins')));
            //inside a virtual directory
            if (virtDir.indexOf('/') >= 0) {
                virtDir = virtDir.substring(0, virtDir.indexOf('/'));
                endPoint = parent.document.frames['Shortcuts'].window.location.href.indexOf(virtDir);
            }
            //running off of a site's root directly
            else {
                virtDir = "";
                endPoint = parent.document.frames['Shortcuts'].window.location.host.length;
            }
        }
        else {
            virtDir = parent.document.frames['Shortcuts'].window.location.pathname.substring(1);
            //inside a virtual directory
            if (virtDir.indexOf('/') >= 0) {
                virtDir = virtDir.substring(0, virtDir.indexOf('/'));
                endPoint = shortcutUrl.indexOf(virtDir);
            }
            //running off of a site's root directly
            else {
                virtDir = "";
                endPoint = parent.document.frames['Shortcuts'].window.location.host.length;
            }

        }
    }
    else {
        //no luck. Now we ASSUME that the virtual directory is the first folder
        virtDir = location.pathname.substring(1);
        //inside a virtual directory
        if (virtDir.indexOf('/') >= 0) {
            virtDir = virtDir.substring(0, virtDir.indexOf('/'));
            endPoint = location.href.indexOf(virtDir);
        }
        //running off of a site's root directory
        else {
            virtDir = "";
            endPoint = location.host.length;
        }
    }

    //we want to trim off any relative positioning
    if (url.substring(0, 3) == '../') {
        url = url.replace(/[.][.]\//g, '');
    }

    var absUrl = location.href.substring(0, endPoint) + virtDir + '/' + url;
    return absUrl;
}

/// Functions required for Risk Rank (Risk Matrix) implementation.
function openRiskMatrix(fileName) {
    var url = '../validation/RiskMatrix/' + fileName;
    OpenNewWindow(url, 'Risk_Matrix', 1080, 850)
}

function saveState(objId, state) {
    var servicePath = getSiteRootAddress() + "/WebServices/WebControlsService.asmx";
    var method = "SaveUIState";
    var params = {};
    params.myId = objId;
    params.state = state;
    Sys.Net.WebServiceProxy.invoke(servicePath, method, false, params, null, null);
}

function formatDateTime(value, dateOnly) {
    if (typeof value != 'string') {
        value = value.toString();
    }

    var formats = [Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortDatePattern + " " + Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortTimePattern,
	Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortDatePattern + " " + Sys.CultureInfo.CurrentCulture.dateTimeFormat.LongTimePattern,
	Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortDatePattern]
    var d = Date.parseLocale(value, formats[0]);
    if (d == null) d = Date.parseLocale(value, formats[1]);
    if (d == null) d = Date.parseLocale(value, formats[2]);
    if (d == null) d = Date.parseInvariant(value);
    if (d == null) d = new Date(Date.parse(value));
    var ret = d.localeFormat(Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortDatePattern);
    if (!dateOnly)
        ret += " " + d.localeFormat(Sys.CultureInfo.CurrentCulture.dateTimeFormat.LongTimePattern);

    return ret;
}
function getDateTimeFromString(value) {
    if (typeof value != 'string') {
        value = value.toString();
    }

    var formats = [Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortDatePattern + " " + Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortTimePattern,
	Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortDatePattern + " " + Sys.CultureInfo.CurrentCulture.dateTimeFormat.LongTimePattern,
	Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortDatePattern]
    var d = Date.parseLocale(value, formats[0]);
    if (d == null) d = Date.parseLocale(value, formats[1]);
    if (d == null) d = Date.parseLocale(value, formats[2]);
    if (d == null) d = Date.parseInvariant(value);
    if (d == null) d = new Date(Date.parse(value));

    return d;
}

var eht_nodeid = 0;
function tree_handler(e, controlName) {
    var t;
    if (e && ((t = e.target) || (t = e.srcElement))) {
        var index = 0;
        //expanding
        if (t.className == 'co') {
            t.className = 'ex';
            for (index = 2; index < t.parentNode.children.length; ++index) {
                t.parentNode.children[index].style.display = 'block';
            }
            //Check to see if we need to dynamically load the children
            if ((typeof (t.l) != 'undefined') && (t.parentNode.children[1] != null) && (typeof (t.parentNode.children[1].s) != 'undefined') && (t.l == 0)) {
                var parentDiv = $get(controlName);
                var config = eval('(' + parentDiv.config + ')');

                var nodeId = controlName + '_' + eht_nodeid;
                ++eht_nodeid;
                t.parentNode.children[2].id = nodeId;

                config.SiteId = t.parentNode.children[1].s;
                config.Identity = nodeId;

                var callback = Function.createDelegate(this, tree_handler_callback);
                Sys.Net.WebServiceProxy.invoke(parentDiv.wsbase, parentDiv.wssub, false, { 'config': config }, callback);
                //t.parentNode.children[2].innerHTML = xmlhttp.responseText;
            }
        }
        //collapsing
        else if (t.className == 'ex') {
            t.className = 'co';
            for (index = 2; index < t.parentNode.children.length; ++index) {
                t.parentNode.children[index].style.display = 'none';
            }
        }
        //Node selection
        else if (t.className == 'n') {
            selectitem(t.innerText, t.s);
        }
    }
    function tree_handler_callback(data) {
        var ctrl = $get(data.RefControlId);
        ctrl.innerHTML = data.Html;
        ctrl.parentNode.children[0].l = 0;
    }
}

//////////////hyq commented:新增一个函数用来让RadGrid控件的滚动窗口能够根据数据大小自动调整高度/////////////////////
function GridCreated(sender, args) {
    var scrollArea = sender.GridDataDiv;

    var dataHeight = sender.get_masterTableView().get_element().clientHeight;
    /*if (dataHeight < 350) {
    scrollArea.style.height = dataHeight + 17 + "px";
    }*/

    if (sender.get_masterTableView()._hasMultiHeaders) {
        dataHeight = dataHeight + 18 + "px";
    }

    scrollArea.style.height = dataHeight;
}
// init styles
//$("input[type=text]", $(document)).addClass("inptxt").focusClass("inp_focus");

//$("input[readonly]", $(document)).addClass(" inp_read");
//$("input[disabled=true]", $(document)).addClass(" inp_read");

//$("input[type=text]", $(document)).not("div.tabs input[type=text]", $p).filter("[alt]").inputAlert();
function btnSrarchClientClick() {
    alert(window.parent.document.URL.toString());

}

















//***********************************************************Begin:用于RadGrid复选框全选功能  sulh 20130503*************************************//
function EditRedirect() {
    if (self.opener != null) {
        self.close();
    } else {
        self.parent.document.getElementById('tdBrowse').click();
    }

}

function Map() {
    this.keys = new Array();
    this.data = new Array();
    //添加键值对 
    this.set = function (key, value) {
        if (this.data[key] == null) {//如键不存在则身【键】数组添加键名 
            this.keys.push(value);
        }
        this.data[key] = value; //给键赋值 
    };
    //获取键对应的值 
    this.get = function (key) {
        return this.data[key];
    };
    //去除键值，(去除键数据中的键名及对应的值) 
    this.remove = function (key) {
        this.keys.remove(key);
        this.data[key] = null;
    };
    //判断键值元素是否为空 
    this.isEmpty = function () {
        return this.keys.length == 0;
    };
    //获取键值元素大小 
    this.size = function () {
        return this.keys.length;
    };
}


//单选checkbox
function checkItem(obj) {
    if (typeof (obj) != "undefined") {
        var strtmp = obj.parentElement.className;
        var primaryKeyword = document.getElementById("hidKeyword").value;
        var selectValue = document.getElementById(strtmp).className;
        selectValue = primaryKeyword + "||" + selectValue;
        if (obj.checked == true) {
            //判断并加全选
            var inputs = document.getElementsByTagName("input");
            var objcheckAll = document.getElementById("checkAll").lastChild;
            var flag = 0;
            for (var i = 0; i < inputs.length; i++) {
                var objTmp = inputs[i];
                if (objTmp.type == 'checkbox' && objTmp != objcheckAll) {
                    if (objTmp.checked == false)
                        flag = 1;
                }
            }
            if (flag == 0) {
                document.getElementById("checkAll").lastChild.checked = true;
            }
            setInHidden(selectValue);
        }
        else {
            //去掉全选
            document.getElementById("checkAll").lastChild.checked = false;
            delInHidden(selectValue);
        }
    }
}

//全选checkbox
function chkItemSelectedAll(obj) {
    var inputs = document.getElementsByTagName("input");
    var primaryKeyword = document.getElementById("hidKeyword").value;
    for (var i = 0; i < inputs.length; i++) {
        var objTmp = inputs[i];
        if (objTmp.type == 'checkbox' && objTmp != obj) {
            var strtmp = objTmp.parentElement.className;
            var selectValue = document.getElementById(strtmp).className;
            selectValue = primaryKeyword + "||" + selectValue;
            if (obj.checked == true) {
                objTmp.checked = true;
                setInHidden(selectValue);
            }
            else {
                objTmp.checked = false;
                delInHidden(selectValue);
            }
        }
    }
}
String.prototype.replaceString = function (s1, s2) {
    this.str = this;
    if (s1.length == 0) return this.str;
    var idx = this.str.indexOf(s1);
    while (idx >= 0) {
        this.str = this.str.substring(0, idx) + s2 + this.str.substr(idx + s1.length);
        idx = this.str.indexOf(s1);
    }
    return this.str;
}
//插入到变量中
function setInHidden(strtmp) {
    var obj = document.getElementById("browse_hidCheckedItem");
    tmpCheckedValues = obj.value;
    var json = strtmp;
    if (tmpCheckedValues == "") {
        obj.value = json + "||STATUS$$INSERT";
    }
    else {
        flag = 0;
        arr = tmpCheckedValues.split("&&");
        for (var i = 0; i < arr.length; i++) {
            //if (json == arr[i]) {
            if (arr[i].indexOf(json) > -1) {
                flag = 1;
                arr[i] = arr[i].replaceString("STATUS$$DELETE", "STATUS$$KEEP");
                //arr[i] = arr[i].replaceString("STATUS$$INSERT", "STATUS$$KEEP");
                break;
            }
        }
        obj.value = arr.join("&&");
        if (flag == 0) {
            obj.value += "&&" + json + "||STATUS$$INSERT";
        }
    }
}

//从变量中清除
function delInHidden(strtmp) {
    var obj = document.getElementById("browse_hidCheckedItem");
    tmpCheckedValues = obj.value;
    var json = strtmp;
    if (tmpCheckedValues == "") {
    }
    else {
        arr = tmpCheckedValues.split("&&");
        for (var i = 0; i < arr.length; i++) {
            // if (json == arr[i]) {
            if (arr[i].indexOf(json) > -1) {
                if (arr[i].indexOf("STATUS$$INSERT") > -1) {
                    arr.splice(i, 1);
                }
                else if (arr[i].indexOf("STATUS$$KEEP") > -1) {
                    arr[i] = arr[i].replaceString("STATUS$$KEEP", "STATUS$$DELETE");
                }
                break;
            }
        }
        obj.value = arr.join("&&");
    }
}

function clearSelected() {
    var objcheck = document.getElementById("browse_hidCheckedItem");
    objcheck.value = "";
}

function selectJZNewItem() {
    var obj = document.getElementById("hidAppending");
    var objUrl = document.getElementById("hidUrl");
    var tmpAppend = obj.value;
    if (tmpAppend != "") {
        tmpAppend = "&" + tmpAppend;
    }
    var tmpUrl = objUrl.value;
    var herfString = tmpUrl + "New" + tmpAppend;
    selectitem(herfString);
}
function selectJZItem() {
    var objcheck = document.getElementById("browse_hidCheckedItem");
    tmpCheckedValues = objcheck.value;
    tmpCheckedValues = tmpCheckedValues.substring(0, tmpCheckedValues.length - 1);
    if (tmpCheckedValues == "") {
        alert("请选择数据");
    }
    else {
        arr = tmpCheckedValues.split(";");
        if (arr.length <= 0) {
            alert("请选择数据");
        }
        else if (arr.length > 1) {
            alert("请选择单条信息");
        }
        else {
            //暂不使用，不要删除
            /*
            var obj = document.getElementById("hidAppending");
            var objUrl = document.getElementById("hidUrl");
            var tmpAppend = obj.value;
            if (tmpAppend != "") {
            tmpAppend = "&" + tmpAppend;
            }
            var tmpUrl = objUrl.value;
            var herfString = tmpUrl + arr[0] + tmpAppend;
            */
            //暂不使用，不要删除END

            var tmpIDString = "?id=" + arr[0] + "&";

            var aTags = document.getElementsByTagName("a");
            for (var x = 0; x < aTags.length; x++) {
                var objTmp = aTags[x];
                if (objTmp.href.indexOf(tmpIDString) > -1) {
                    var tmpJS = objTmp.href;
                    tmpJS = tmpJS.replace("&ReadOnly=true", "");
                    eval(tmpJS);
                    break;
                }
            }


            //selectitem(herfString);
        }
    }
}
function confirmDel() {
    var objcheck = document.getElementById("browse_hidCheckedItem");
    tmpCheckedValues = objcheck.value;
    tmpCheckedValues = tmpCheckedValues.substring(0, tmpCheckedValues.length - 1);
    if (tmpCheckedValues == "") {
        alert("请选择数据");
    } else {
        if (confirm("确定删除吗？")) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}

//***********************************************************End:用于RadGrid复选框全选功能  sulh 20130503*************************************//

//***********************************************************Begin:用于复选框放大镜功能  sulh 20130503*************************************//
function getMulSelData(keyword, id, displayValue) {
    document.getElementById(id + '_selVal').value = keyword;
    var strs = new Array();
    var MulData = new Array();
    var Muljsion = new Array();
    strs = keyword.split('&&');

    for (i = 0; i < strs.length; i++) {
        var str = strs[i].split('||');
        var SelData = new Map();
        for (j = 0; j < str.length; j++) {
            var tmp = str[j].split('$$');
            SelData.set(tmp[0], tmp[1]);
        }
        MulData.push(SelData);
        Muljsion.push(strs[i]);
    }
    ClearAllEntries(id);
    for (i = 0; i < MulData.length; i++) {
        var inputText = MulData[i].get(displayValue);
        var inputValue = Muljsion[i];
        if (inputValue.indexOf('STATUS$$DELETE') < 0) {
            AddNewEntry(inputText, inputValue, id);
        }
    }
}
function getClookupSelData(id) {
    var data = document.getElementById(id + '_selVal').value; return data;
}
///RadAutoCompleteBox新增元素事件 sunjunjie 201305071709
function AddNewEntry(inputText, inputValue, id) {
    var autoCompleteBox = $find(id + '_disp'); if (!inputText) return;
    var entry = new Telerik.Web.UI.AutoCompleteBoxEntry();
    entry.set_text(inputText);
    entry.set_value(inputValue);
    autoCompleteBox.get_entries().add(entry);
}
///RadAutoCompleteBox清空事件  sunjunjie 201305071709
function ClearAllEntries(id) {
    var autoCompleteBox = $find(id + '_disp'); autoCompleteBox.get_entries().clear();
}

function HTMLDecode(strEncodeHTML) {
    var div = document.createElement('div');
    div.innerHTML = strEncodeHTML;
    return div.innerText;
}
//***********************************************************End:用于复选框放大镜功能  sulh 20130503*************************************//


//***********************************************************End:用于复选框放大镜功能  sulh 20130503*************************************//
function changeWidth() {
    var hidRadOrgId = document.getElementById('hidRadOrgId').value;
    strs = hidRadOrgId.split('|');
    for (var i = 0; i < strs.length; i++) {
        if (strs[i] != '') {
            var BoxWidthId = document.getElementById(strs[i] + '_txtBoxWidthId').value;
            if (document.getElementById(strs[i] + '_radComboBox')) {

                //                if (BoxWidthId == '350') {
                //                    var ViewWidth = document.getElementById('browse_searchSection_ctl01_searchValueItem-1').offsetWidth;
                //                  
                //                    document.getElementById(strs[i] + '_radComboBox').style.width = ViewWidth;
                //                    document.getElementById(strs[i] + '_radLoadComboBox').style.width = ViewWidth;
                //                } else if (BoxWidthId == '') {
                //                    var ViewWidth = document.body.offsetWidth;
                //                    document.getElementById(strs[i] + '_radComboBox').style.width = ViewWidth / 3;
                //                    document.getElementById(strs[i] + '_radLoadComboBox').style.width = ViewWidth / 3;
                //                    $('#' + strs[i] + '_radComboBox').css({ 'width': '50%', 'position': 'static', 'margin-top': '0px', 'margin-bottom': '0px' });
                //                    $('#' + strs[i] + '_radLoadComboBox').css({ 'width': '50%', 'position': 'static', 'margin-top': '0px', 'margin-bottom': '0px' });
                //                }
                //                else {
                var ViewWidth = document.getElementById('browse_searchSection_ctl01_searchValueItem-1').offsetWidth;
                document.getElementById(strs[i] + '_radComboBox').style.width = ViewWidth + 'px';
                var divObj = document.getElementById(strs[i] + '_radComboBox');
                var tableObj = divObj.getElementsByTagName('table');
                tableObj[0].style.width = "100%";
                document.getElementById(strs[i] + '_radLoadComboBox').style.width = ViewWidth + 'px';
                //                }
            }
        }
    }
}


// 2013/07/03
// 王峥
// 修正表单页面验证和表格数据中验证冲突的问题
function myPage_ClientValidate(validationGroup) {
    if (typeof (Page_ClientValidate) !== 'function') {
        return true;
    }

    if (typeof (Page_ValidationSummaries) !== "undefined") {
        if (validationGroup === undefined) {
            validationGroup = 'essValidator';
        }
        var hiddenValidationSummaries = [];
        var existSameGroupSummaries = [];
        for (var i = 0; i < Page_ValidationSummaries.length; i++) {
            var validationSummary = Page_ValidationSummaries[i];
            if ((validationSummary.showmessagebox &&
                validationSummary.validationGroup != undefined &&
                validationSummary.validationGroup != validationGroup) ||
                (existSameGroupSummaries.contains(validationSummary.validationGroup))) {
                validationSummary.showmessagebox = "False";
                hiddenValidationSummaries.push(validationSummary);
            }
            else {
                existSameGroupSummaries.push(validationSummary.validationGroup);
            }
        }
        var isPageValid;
        if (validationGroup === 'essValidator') {
            isPageValid = Page_ClientValidate();
        }
        else {
            isPageValid = Page_ClientValidate(validationGroup);
        }
        for (var i = 0; i < hiddenValidationSummaries.length; i++) {
            hiddenValidationSummaries[i].showmessagebox = "True";
        }
        return isPageValid;
    }
    else {
        return Page_ClientValidate();
    }
}
// 2013/07/14 王峥 对数组Array对象的扩展
Array.prototype.contains = function (elem) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == elem) {
            return true;
        }
    }
    return false;
}


//var oTcc1 = document.getElementById('tcc1');
//var oMark = document.getElementById('mark');
//var aBtn1 = oTcc1.getElementsByTagName('a');

//aBtn1[0].onclick = closeTcc;
//aBtn1[1].onclick = closeTcc;

//function closeTcc() {
//    oMark.style.display = 'none';
//    oTcc1.style.display = 'none';
//};

//function sWindow() {
//    if (arguments.length > 0) {
//        oMark.style.display = 'block';
//        oTcc1.style.display = 'block';
//        oMark.style.height = document.documentElement.clientHeight + 'px';
//        oTcc1.style.left = (document.documentElement.clientWidth - oTcc1.offsetWidth) / 2 + 'px';
//        oTcc1.style.top = (document.documentElement.clientHeight - oTcc1.offsetHeight) / 2 + 'px';
//        document.getElementById("hit").innerHTML = "<P>" + arguments[0] + "</P>"
//    }
//    else {
//        oMark.style.height = document.documentElement.clientHeight + 'px';
//        oTcc1.style.left = (document.documentElement.clientWidth - oTcc1.offsetWidth) / 2 + 'px';
//        oTcc1.style.top = (document.documentElement.clientHeight - oTcc1.offsetHeight) / 2 + 'px';
//    }
//}
////限制范围的拖拽
//drag(oTcc1, true);
//function drag(obj, flag) {
//    obj.onmousedown = function (ev) {
//        var ev = ev || event;
//        var disX = ev.clientX - this.offsetLeft;
//        var disY = ev.clientY - this.offsetTop;

//        if (obj.setCapture) {
//            obj.setCapture();
//        }

//        document.onmousemove = function (ev) {
//            var ev = ev || event;
//            var L = ev.clientX - disX;
//            var T = ev.clientY - disY;
//            if (flag) {
//                if (L < 0) {
//                    L = 0;
//                } else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
//                    L = document.documentElement.clientWidth - obj.offsetWidth;
//                }
//                if (T < 0) {
//                    T = 0;
//                } else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
//                    T = document.documentElement.clientHeight - obj.offsetHeight;
//                }
//            }

//            obj.style.left = L + 'px';
//            obj.style.top = T + 'px';
//        }

//        document.onmouseup = function () {
//            document.onmousemove = null;
//            if (obj.releaseCapture) {
//                obj.releaseCapture();
//            }
//        }
//        return false;
//    }
//}

//window.onresize = function () {
//    oMark.style.height = document.documentElement.clientHeight + 'px';
//    oTcc1.style.left = (document.documentElement.clientWidth - oTcc1.offsetWidth) / 2 + 'px';
//    oTcc1.style.top = (document.documentElement.clientHeight - oTcc1.offsetHeight) / 2 + 'px';
//};

//window.alert = function (str) {
//    sWindow(str);
//};

//alert("dddddddddd");

//window.attachEvent("onload", function () {
//    if (document.documentMode && document.documentMode == 7) {
//        var tables = document.getElementsByTagName("table");
//        for (var i = 0; i < tables.length; i++) {
//            if (tables[i].className == "TitleTable") {
//                tables[i].style.width = document.forms[0].scrollWidth + "px";
//                break;
//            }
//        }
//    }
//});
//window.attachEvent("onresize", function () {
//    if (document.documentMode && document.documentMode == 7) {
//        var tables = document.getElementsByTagName("table");
//        for (var i = 0; i < tables.length; i++) {
//            if (tables[i].className == "TitleTable") {
//                tables[i].style.width = document.forms[0].scrollWidth + "px";
//                break;
//            }
//        }
//    }
//});

//sulh 2013/08/08 键盘输入，功能键返回true
function isKeyCodeInFunctionKey(code) {
    var keyCodeToFunctionKey = {
        8: "backspace", 9: "tab", 13: "return", 16: "Shift", 19: "pause", 20: "CapsLock", 27: "escape", 32: "space",
        33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up",
        39: "right", 40: "down", 44: "printscreen", 45: "insert", 46: "delete",
        112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7",
        119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12",
        144: "numlock", 145: "scrolllock"
    };
    keyname = keyCodeToFunctionKey[code];
    if (keyname) {
        return true;
    }
    else {
        return false;
    }
}



//loading 后台加载数据时，前台显示控件不能用
var serverPath = "";
var pName = window.location.pathname;
var str = pName.toLocaleLowerCase();
if (str.indexOf("administration", 0) != -1) {
    serverPath = "../";
}
else if (str.indexOf("common/", 0) != -1) {
    serverPath = "../";
}
else {
    serverPath = "../../";
}

function ShowLoadWait(parentId, method1, message) {
    var pId = document.forms[0]; //document.getElementById(parentId);

    var oDiv;
    var oDivTop;
    var oDivTxt;

    if (document.getElementById("loadTopMsg")) {
        oDiv = document.getElementById("loadTopMsg");
        oDivTop = document.getElementById("loadTop");
        oDivTxt = document.getElementById("loadTxt");
        oImg = document.getElementById("loadTopImage");
    }
    else {
        oDiv = document.createElement("div");
        oDivTop = document.createElement("div");
        oDivTxt = document.createElement("div");

        pId.appendChild(oDivTop);
        pId.appendChild(oDiv);
        oDiv.setAttribute("id", "loadTopMsg");

        var oImg = document.createElement("img");
        oImg.setAttribute("id", "loadTopImage");
        oImg.setAttribute("src", serverPath + "images/loadingnew_cnpc.gif");
        oDiv.appendChild(oImg);
        oImg.style.verticalAlign = "middle";
        oImg.style.marginRight = "20px";
        oDiv.style.paddingTop = '12px';

        oDivTop.setAttribute("id", "loadTop");
        oDivTxt.setAttribute("id", "loadTxt");
        oDiv.setAttribute("ms_positioning", "FlowLayout");
        oDivTop.setAttribute("ms_positioning", "FlowLayout");
        oDivTxt.setAttribute("class", "loadTxt");
        oDiv.appendChild(oDivTxt);
    }
    if (method1 == "loading") {
        document.getElementById("loadTopImage").style.display = "inline";
        oImg.setAttribute("src", serverPath + "images/loadingnew_cnpc.gif");
        Msgloading(oDiv, oDivTop, oDivTxt, message);
    }
    else if (method1 == "save") {
        oImg.setAttribute("src", serverPath + "images/alert_right.gif");
        document.getElementById("loadTopImage").style.display = "inline";
        Msgloading(oDiv, oDivTop, oDivTxt, message);
    }
    else {
        oImg.setAttribute("src", serverPath + "images/alert_right.gif");
        Msgloading(oDiv, oDivTop, oDivTxt, message);
    }

    window.setTimeout(watchCancelLoading2, 100);
}

function watchCancelLoading2() {
    if (typeof (Page_IsValid) == "undefined") {
        HiddenLoadWait();
    }
    else if (Page_IsValid) {
    }
    else {
        HiddenLoadWait();
    }
}

function watchCancelLoading() {
    if (window.document.readyState == 'interactive' || window.document.readyState == 'complete') {
        window.setTimeout(HiddenLoadWait, 1000);
    }
}

document.onreadystatechange = watchCancelLoading;

function HiddenLoadWait() {
    var waitingTop = document.getElementById("loadTop");
    var waitingTopMsg = document.getElementById("loadTopMsg");
    var waitingTxt = document.getElementById("loadTxt");
    if (waitingTop) {
        waitingTop.style.display = "none";
    }
    if (waitingTopMsg) {
        waitingTopMsg.style.display = "none";
    }
    if (waitingTxt) {
        document.getElementById("loadTxt").innerText = "";
    }
}


function Msgloading(oDiv, oDivTop, oDivTxt, message) {
    var waitingTop = document.getElementById("loadTop");
    var waitingTopMsg = document.getElementById("loadTopMsg");
    document.getElementById("loadTxt").innerText = message;
    var width = 260;
    var height = 48;
    waitingTop.style.filter = 'alpha(opacity=80)';
    waitingTopMsg.style.display = "block";
    waitingTopMsg.style.position = "absolute";
    waitingTopMsg.style.width = width + "px";
    waitingTopMsg.style.height = height + "px";
    waitingTopMsg.style.background = '#c6daef';
    waitingTopMsg.style.filter = 'alpha(opacity=80)';
    waitingTopMsg.style.border = '1px solid #87a4c5';
    waitingTopMsg.style.textAlign = 'center';
    waitingTopMsg.style.zIndex = '1000';
    oDivTxt.style.width = 230 + 'px';
    oDivTxt.style.zIndex = '1100';
    oDivTxt.style.height = 48 + 'px';
    oDivTxt.style.textAlign = 'center';
    oDivTxt.style.display = 'inline';
    oDivTxt.style.fontSize = 14 + 'px';
    oDivTxt.innerText = message;
    document.getElementById("loadTxt").innerText = message;

    var leftadd = (document.body.clientWidth - width) / 2;
    var topadd = (document.documentElement.clientHeight - height) / 2;
    if (waitingTop != null && waitingTop != "undefined") {
        waitingTop.style.display = "block";
        waitingTopMsg.style.display = "block";
        waitingTop.style.height = document.body.clientHeight;
        waitingTop.style.top = document.body.scrollTop + "px";
        waitingTop.style.background = '';

        //waitingTopMsg.style.top = document.body.scrollTop + topadd + "px";
        waitingTopMsg.style.top = topadd + "px";
        waitingTopMsg.style.left = document.body.scrollLeft + leftadd + "px";
        window.onscroll = function () {
            waitingTop = document.getElementById("loadTop");
            waitingTop.style.top = document.body.scrollTop + "px";
            waitingTopMsg = document.getElementById("loadTopMsg");
            waitingTopMsg.style.top = document.body.scrollTop + topadd + "px";
            waitingTopMsg.style.left = document.body.scrollLeft + leftadd + "px";
        };
    }
}


function IntChecker(obj) {
    var re = /^-?\d+$/;
    if (obj.value != '' && !re.test(obj.value)) {
        alert('请输入整数');
        obj.value = "";
        obj.focus();
        return false;
    }
    return true;
}

function DoubleChecker(obj) {
    var re = /^(-?\d+)(\.\d+)?$/;
    if (obj.value != '' && !re.test(obj.value)) {
        alert('请输入数字');
        obj.value = "";
        obj.focus();
        return false;
    }
    return true;
}

//zhangjl获取url参数方法
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
