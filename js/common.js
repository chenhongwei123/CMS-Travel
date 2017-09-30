$(document).ready(function() {
	if($.cookie("name") && $.cookie("name") !== null) {
		console.log($.cookie("name"))

	} else {
		document.location.href = "../login.html"
	};

	/**
	 * 退出
	 */
	$('.logout').on('click', function() {
		//alert("111")
		$.cookie("name", "", {
			expires: -1
		}); //清除cookie
		$.cookie("code", "", {
			expires: -1
		});
		$.cookie("token", "", {
			expires: -1
		});
		document.location.href = "../login.html";
	});

})

//--------------------环境转换----------------------------
function urly(url) {
	//开发环境
	var str = "http://tour.honganjk.com/" + url
	return str

	//生产环境
//			var str = "http://admin.honganjk.com/" + url
//			return str

}

//---------------------时间戳-------------------------------------------

function formatDate(data) {
	// console.log(data)
	if(data == null || data == "null") {
		//				console.log(data)
		return "无"
	} else {
		return $.myTime.UnixToDate(data, true, 8);

	}
}

//------------------------------------------------倒计时------------------------------------------------------------

//设置时间倒计时函数
function getTime(time) {
	//截止之间
	var endTime = new Date(time);
	//起始时间                                        2017/04/26 18:10        

	var nowTime = new Date();
	//时间差
	var _time = endTime.getTime() - nowTime.getTime();
	var d = Math.floor(_time / 1000 / 60 / 60 / 24);
	var h = Math.floor(_time / 1000 / 60 / 60 % 24);
	var m = Math.floor(_time / 1000 / 60 % 60);
	var s = Math.floor(_time / 1000 % 60);
	return d + "天" + h + "时" + m + "分" + s + "秒";
}

//--------------------------字符串处理----------------------------------------
function getStr(string, str) {
	var str_before = string.split(str)[0];
	var str_after = string.split(str)[1];
	//			alert('前：' + str_before + ' - 后：' + str_after);
	return str_before
}

//----------------保留两位小数---------------------------------	
function to_Fixed(data) {
	//	console.log(typeof data) 
	if(data == null || data == "null") {
		return "无"
	} else {
		return parseFloat(data).toFixed(2)
	}

}

//---------------------null处理-------------------------------------------
function xs_null(data) {
	if(data == null || data == "null" || data == "") {
		return "无"
	} else {
		return data
	}
}
//-------------------字符串处理------------------------
function getStr(string, str) {
	var str_before = string.split(str)[0];
	var str_after = string.split(str)[1];
	//alert('前：' + str_before + ' - 后：' + str_after);
	return str_before
}

//-------------------------------------------跳转获取-------------------------------------------------------
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)($|&)");
	//console.log(reg)
	//用来查询那个名称
	var r = window.location.search.substr(1).match(reg);
	//	console.log(r)
	if(r != null) {
		return decodeURI(r[2]);
	}
	return null
}

//-----------------------------------------验证阿里百川---------------------------------------
function getToken() {
	$.ajax({
		type: "get",
		url: "https://bzapi.honganjk.com/common/getToken.action",
		data: {
			"key": "23384196",
			"secret": "7b484f801524af3bb7f6abb0dbe63459",
			"namespace": "hajk",
		},
		dataType: "json",
		success: function(data) {
			window.imgtoken = data.data;
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
			console.log("请求失败" + XMLHttpRequest.status);
			console.log("请求失败" + XMLHttpRequest.readyState);
			console.log("请求失败" + textStatus);
			if(textStatus == "parsererror") {
				window.location.href = "../login.html"
			}
		}
	});
}
//----------------------要求转换--------------------------
function require(e) {
	switch(e) {
		case 1:
			return '退款'
			break;
		case 2:
			return '退货退款'
			break;
	}
}

//-----------------------原因转换-------------------------------
function reason(e) {
	switch(e) {
		case 1:
			return '质量问题'
			break;
		case 2:
			return '不在保质期'
			break;
		case 3:
			return '使用后过敏'
			break;
		case 4:
			return '发票问题'
			break;
		case 5:
			return '变质/发霉'
			break;
		case 6:
			return '少件/漏发'
			break;
		case 7:
			return '发错货'
			break;
	}
}
//----------------------------订单状态类型转换-------------------------------------------------
function state(e) {
	switch(e) {
		case 0:
			return '待付款'
			break;
		case 1:
			return '待出行'
			break;
		case 2:
			return '待评价'
			break;
		case 3:
			return '已完成'
			break;	
		case 4:
			return '等待退款'
			break;
		case 5:
			return '退款完成'
			break;
	//	0-待付款，1-待出行，2-待评价，3-已完成
	};
}

//----------------------------（物流显示）是否发货转换-------------------------------------------------
function T_state(data) {
	if(data == null || data == "null") {
		return "未发货"
	} else {
		return data
	}
}

//----------------------------退单是否发货转换-------------------------------------------------
function shipped(data) {
	switch(data) {
		case 0:
			return '未发货'
			break;
		case 1:
			return '已发货'
			break;

		default:
			return '-'
			break;

	};
}

//----------------------------买家发货转换-------------------------------------------------
function Tm_state(e) {
	switch(e) {
		case 12:
			return '退货中(待买家发货)'
			break;
		case 13:
			return '退货中(待卖家收货)'
			break;
		case 14:
			return '退货退款完成'
			break;
		default:
			return '-'
			break;

	};
}

//----------------------------性别类型转换-------------------------------------------------
function sex(e) {
	switch(e) {
		case 1:
			return '男'
			break;
		case 2:
			return '女'
			break;
		
	};
}

//----------------------时间戳转日期格式----------------------------
function UnixToDate(data) {
	if(data == null || data == "null") {
		//				console.log(data)
		return "无"
	} else {
		return $.myTime.UnixToDate(data, false, 8);
	}

}
//----------------------日期格式转时间戳----------------------------
function DateToUnix(data) {
	if(data == null || data == "null") {
		//				console.log(data)
		return "无"
	} else {
		return $.myTime.DateToUnix(data);
	}

}

//----------------------------交通信息转换-------------------------------------------------
function mode(e) {
	switch(e) {
		case 1:
			return '飞机'
			break;
		case 2:
			return '高铁'
			break;
		case 3:
			return '汽车'
			break;
		case 4:
			return '邮轮'
			break;
		default:
			return ' '
			break;

	};
}

//----------------------------交通方式转换-------------------------------------------------
function mode_type(e) {
	switch(e) {
		case 1:
			return '去程'
			break;
		case 2:
			return '返程'
			break;

		default:
			return ' '
			break;

	};
}