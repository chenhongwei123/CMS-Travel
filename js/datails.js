$(document).ready(function() {
	//--------------------------------获取地址上的ID-------------------------------------
	var id = getQueryString("goodsID")
	console.log(id)
	orderDetail(id)
})
//----------------数据渲染----------------------------
function orderDetail(id) {
	$.ajax({
		type: "get",
		url: urly("admin/orderDetail.tour"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			id: id
		},
		success: function(data) {
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
                    console.log(data.data)
                    
                    var arr=data.data 
					$(".buyer").setTemplateElement("template2");
					$(".buyer").processTemplate(arr);                 //基本数据
					
					var travelers=data.data.travelers
					$(".buyer_order").setTemplateElement("template");
					$(".buyer_order").processTemplate(travelers);       //出游人信息
					
					var traffics=data.data.traffics        
					$(".traffic").setTemplateElement("template3");      //交通信息
					$(".traffic").processTemplate(traffics);
					
					 var outsetTime= UnixToDate(data.data.outsetTime)   //出发时间
                    var returnTime= UnixToDate(data.data.returnTime)   //返回时间
                    $(".outsetTime").html(outsetTime) 
                    $(".returnTime").html(returnTime)
					break;
				default:
					alert(data.msg)
			}
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
