$(document).ready(function() {
	refunds(4)
	paging(4)
	//-----------------退款分类切换事件--------------------------------------------
	$(".nav-tabs li").each(function() {
		var index = $(this).index() + 4;
		$(this).click(function() {
			//alert(index);
			$(this).addClass("active").siblings().removeClass("active");
			refunds(index)
			paging(index)
		})
	})
	//	//------------------------退款状态change事件---------------------------------------------------------
	//	$(".sele1").on("change", function() {
	//		$("#dishpageval").val(0)
	//		$("#change").text(1)
	//		var index;
	//		//		$(".nav-tabs li").removeClass("active");
	//		var type = state_str($(".sele1").val())
	//		//遍历获取当前拥有class=active，的li标签的索引值，并保存
	//		$(".nav-tabs li").each(function() {
	//		    index = $(this).index();
	//			if($(this).hasClass("active")==true){
	//				localStorage.setItem("Index",index)
	//			}
	//		})
	//		var state=JSON.parse(localStorage.getItem("Index"))
	//		refunds(state, type)
	//		paging(state, type)
	//	})

})
//-----------------------------------------------是否同意退款----------------------------------------
function operation(id, type) {
	swal({
			title: "确定你的操作?",
			text: "",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes",
			closeOnConfirm: false
		},
		function() {
			
			//window.location.reload()
			$.ajax({
				type: "get",
				url: urly("admin/handleOrder.tour"),
				async: true,
				headers: {
					"code": $.cookie("code"),
					"token": $.cookie("token")
				},
				dataType: "json",
				data: {
					id: id,
					type: type
				},
				success: function(data) {
					switch(JSON.stringify(data.code)) {
						case '"A00000"':
                            alert("处理成功")
                            window.location.reload()
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
		});

}

//---------------------------------------------浏览退货订单--------------------------------------
function refunds(state) {
	$.ajax({
		type: "get",
		url: urly("admin/refunds.tour"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"start": 0,
			"size": 10,
			"state": state

		},
		success: function(data) {
			console.log(data)
			var jsondata = data.data.objs;
			
			$("#all_change").text(Math.ceil((data.data.total)/10))         //总共页数
			
			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata);
			//
			//-----------------分页状态-----------------------
			$("#PrevPage").attr("disabled", true);
			$("#NextPage").attr("disabled", true);

			if(JSON.stringify(data.data.total) < 10) {
				$("#NextPage").attr("disabled", true);
			} else {
				$("#NextPage").removeAttr("disabled");
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
//---------------------------------------------状态类型处理--------------------------------------
//function state_str(str) {
//	if(str == "全部") {
//		return 0
//	} else if(str == "退款待处理") {
//		return 1
//	} else if(str == "已拒绝退款") {
//		return 2
//	} else if(str == "待卖家发货") {
//		return 3
//	} else if(str == "待商家收货") {
//		return 4
//	} else if(str == "已取消退款") {
//		return 5
//	} else if(str == "退款成功") {
//		return 6
//	}
//}
//-------------------------------------------------分页------------------------------------------
function paging(state) {
	if($("#dishpageval").val() == 0) {
		$("#PrevPage").attr("disabled", true);
	} //菜品列表分页相关
	$("#NextPage").unbind().click(function() {
		//alert("111")
		//	$("#tbody1").empty($tr)
		$("#change").text(1)
		$("#PrevPage").removeAttr("disabled");
		var dishstart = ($("#dishpageval").val() - 0) + 10;
		$.ajax({
			type: "get",
			url: urly("admin/refunds.tour"),
			data: {

				"start": dishstart,
				"size": 10,
				"state": state
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				console.log(data)
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

				$("#dishpageval").val(dishstart);
				$("#change").text($("#dishpageval").val() / 10 + 1)

				if(JSON.stringify(data.data.total) - 10 <= $("#dishpageval").val()) {
					$("#NextPage").attr('disabled', true);
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
	}); //下一页

	$("#PrevPage").unbind().click(function() {
		var dishstart = $("#dishpageval").val() - 10;
		$("#NextPage").removeAttr("disabled");
		if(dishstart < 0) {
			return dishstart = 0;
		}
		$.ajax({
			type: "get",
			url: urly("admin/refunds.tour"),
			data: {

				"start": dishstart,
				"size": 10,
				"state": state
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

				$("#dishpageval").val(dishstart);
				$("#change").text($("#dishpageval").val() / 10 + 1)
				if(dishstart == 0) {
					$("#PrevPage").attr("disabled", true);
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
	}); //上一页

}