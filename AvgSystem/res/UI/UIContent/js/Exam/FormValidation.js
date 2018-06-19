//身份证验证
function CheckCard(cardId) {
    var idcard = document.getElementById(cardId).value.toUpperCase();
    var Errors = new Array(
			"验证通过!",
			"身份证号码位数不对!",
			"身份证号码出生日期超出范围或含有非法字符!",
			"身份证号码校验错误!",
			"身份证地区非法!"
			);

    var Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");

    if (idcard.length > 0) {
        //身份号码位数及格式检验 
        switch (idcard.length) {
            case 15:
                if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性 
                } else {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性 
                }
                if (ereg.test(idcard)) {
                    return Errors[0];
                }
                else { alert(Errors[2]); return false }
                break;
            case 18:
                //18位身份号码检测 
                //出生日期的合法性检查  
                //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
                //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
                if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式 
                } else {
                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式 
                }
                if (ereg.test(idcard)) {//测试出生日期的合法性 
                    //计算校验位 
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
						+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
						+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
						+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
						+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
						+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
						+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
						+ parseInt(idcard_array[7]) * 1
						+ parseInt(idcard_array[8]) * 6
						+ parseInt(idcard_array[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y, 1); //判断校验位 
                    if (M == idcard_array[17]) {
                        return Errors[0]; //检测ID的校验位 
                    }
                    else { alert(Errors[3]); return false; }
                }
                else { alert(Errors[2]); return false; }
                break;
            default:
                { alert(Errors[1]); return false; }
                break;
        }
    }
    else {
        return true;
    }
}

//身份证、出生日期(xxxx-xx-xx)、性别  1代表男  2代表女
function CheckCardSex(cardId, birthdayId, sexId) {
    var idcard = document.getElementById(cardId).value.toUpperCase();
    var DateStr = document.getElementById(birthdayId).value;
    //var SexValue = document.getElementById(sexId).value;
    var SexValue = $telerik.findControl(document.forms[0], sexId).get_value()
    //*********校验出生日期和性别（开始）*********//
    //BirthDay
    var strCardDate;
    if (idcard.length > 0) {
        if (idcard.length == 15) {
            strCardDate = "19" + idcard.substr(6, 6);
        }
        else {
            strCardDate = idcard.substr(6, 8)
        }

        var DateMonth, DateDay;
        var i = DateStr.indexOf('/');
        if (i != -1) {
            DateStr = DateStr.replace(/\//g, "-");
        }
        var arrDateStr = DateStr.split('-');
        if (arrDateStr[1].length == 1)  //Month
        {
            DateMonth = "0" + arrDateStr[1];
        }
        else {
            DateMonth = arrDateStr[1];
        }
        if (arrDateStr[2].length == 1)   //Day
        {
            DateDay = "0" + arrDateStr[2];
        }
        else {
            DateDay = arrDateStr[2];
        }
        DateStr = arrDateStr[0] + DateMonth + DateDay;

        if (DateStr != strCardDate) {
            alert("身份证生日与所添生日不对应!");
            return false;
        }

        //Sex
        var sex;
        if (idcard.length == 15) {
            sex = idcard.substr(14, 1);
        }
        else {
            sex = idcard.substr(16, 1);
        }

        if (SexValue == '1') {
            if (SexValue == '1' && sex % 2 == 1) {
                return true;
            }
            else {
                alert("身份证性别与所添性别不对应!");
                return false;
            }
        }
        else {
            if (SexValue == '0' && sex % 2 == 0) {
                return true;
            }
            else {
                alert("身份证性别与所添性别不对应!");
                return false;
            }
        }
        /*********校验出生日期和性别（结束）*********/
    }
    else {
        return true;
    }
}


//验证电子邮件有效性
function CheckContactEmail(emailId, message) {
    var Email = document.getElementById(emailId);
    var ContactEmail = document.getElementById(emailId).value;
    var re = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if (ContactEmail != "") {
        if (ContactEmail.indexOf(";") == -1) {
            if (!re.test(ContactEmail)) {
                //alert(getResourceString("ContactEmail_MESSAGE", "", false));
                alert(message + ' 请输入正确的电子邮件格式');
                Email.value = "";
                Email.focus();
                return false;
            }
        }
        else {
            var emailArray = ContactEmail.split(";");
            for (i = 0; i < emailArray.length; i++) {
                if (emailArray[i] != "" || emailArray[i] != null) {
                    if (!re.test(emailArray[i])) {
                        //alert(getResourceString("ContactEmail_MESSAGE", "", false));
                        Email.focus();
                        return false;
                    }
                }
            }
        }

    }
    return true;
}


//校验字符数  en_limit:限制的字符数，一个中文占2个字符
function onCharsChange(FieldId, en_limit) {
    var varField = document.getElementById(FieldId);
    var i = 0;
    var counter = 0;
    var cap = en_limit;
    var j = 0;
    var leftchars = 1;
    //一个中文字符所占英文字符的字符数    
    var cn_chars = 2;
    for (i = 0; i < varField.value.length; i++) {
        if (varField.value.charCodeAt(i) > 127 || varField.value.charCodeAt(i) == 94) {
            j = j + cn_chars;
        }
        else {
            j = j + 1
        }
        leftchars = cap - j;
        if (leftchars < 0) {
            break;
        }
    }
    if (leftchars < 0) {
        varField.value = varField.value.substring(0, i);
        //ls_str = "超过字符数(" + parseInt(parseInt(en_limit.toString()) / cn_chars) + ")限制!";
        //alert(getResourceString("Cap_Notice", "", false) + parseInt(parseInt(en_limit.toString()) / cn_chars));
        //alert(ls_str);
        varField.focus();
        return false;
    }
    return;
}


//js日期比较(yyyy-mm-dd)开始时间是否早于结束时间
function CompareTime(startTimeId, endTimeId) {
    var startTimeValue = document.getElementById(startTimeId).value;
    var endTimeValue = document.getElementById(endTimeId).value;
    var i = startTimeValue.indexOf('/');
    if (i != -1) {
        startTimeValue = startTimeValue.replace(/\//g, "-");
    }
    var arr = startTimeValue.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();
    var t = endTimeValue.indexOf('/');
    if (t != -1) {
        endTimeValue = endTimeValue.replace(/\//g, "-");
    }
    var arrs = endTimeValue.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes >= lktimes) {
        alert('开始时间大于结束时间，请检查');
        return false;
    }
    return true;
}


//验证中方人员手机号码有效性
function CheckPhoneNum(countryId, phoneNumId, message) {
    var countryID = document.getElementById(countryId);
    var PhoneNUM = document.getElementById(phoneNumId);
    var re = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (countryID.value == "0") {
        if (PhoneNUM.value != "") {
            if (!re.test(PhoneNUM.value)) {
                //alert(getResourceString("PhoneNUM_MESSAGE", "", false));
                alert(message + ' 请输入有效的手机号码');
                PhoneNUM.value = "";
                PhoneNUM.focus();
                return false;
            }
        }
    }
    else {
        re = /^[0-9]{11,20}$/;
        if (PhoneNUM.value !='' && !re.test(PhoneNUM.value)) {
            //alert(getResourceString("PhoneNUM_MESSAGE", "", false));
            alert(message + ' 请输入外国的手机号码');
            PhoneNUM.value = "";
            PhoneNUM.focus();
            return false;
        }
    }
    return true;
}

//以下是有可能会涉及到的验证
//表单项不能为空
function CheckForm(inputId, message) {
    var inputId = document.getElementById(inputId);
    if (inputId.value.length == 0) {
        alert(message + ' 请输入内容');
        inputId.focus();
        return false;
    }
    return true;
}


//检查输入对象的值是否符合正整数格式
function isInteger(strId, message) {
    var str = document.getElementById(strId);
    var re = /^[0-9]*[1-9][0-9]*$/;

    if (str.value != '' && !re.test(str.value)) {
        alert(message + ' 请输入正整数');
        str.value = "";
        str.focus();
        return false;
    }

    return true;
}


//判断两次输入的值是否一致
function issame(str1, str2) {
    var strValue1 = document.getElementById(str1).value;
    var strValue2 = document.getElementById(str2).value;
    if (strValue1 == strValue2) {
        return true;
    }
    else {
        alert('两次输入的值不一致，请重新输入');
        return false;
    }
}

//小数验证,建议用onkeyup事件调用 第一个值为id 第二个值为要保留的小数点后面的位数,不分正负
function checkNum(obj, iNum, message) {
    var num = document.getElementById(obj);
    var re = /^-?[1-9]*(\.\d*)?$|^-?d^(\.\d*)?$/;
    if (num.value  != '' && !re.test(num.value)) {
        if (isNaN(num.value)) {
            alert(message + ' 请输入整数或小数');
            num.value = "";
            num.focus();
            return false;
        }
    } else {
        var gre = /\./g;
        if (gre.test(num.value)) {
            result = num.value.substr(0, (num.value).indexOf(".") + (iNum + 1));
            num.value = result;
        }
    }
    return true;
}

//正整数和小数的验证
function isPositiveNum(strId, message) {
    var str = document.getElementById(strId);
    var re = /^[0-9]*(\.[0-9]+)?$/;
    if (str.value != '' && !re.test(str.value)) {
        alert(message + ' 请输入正数');
        str.value = "";
        str.focus();
        return false;
    }
    return true;
}