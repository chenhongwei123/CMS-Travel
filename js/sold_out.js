window.onload = function() {
	var checkAll = document.getElementById('checkall');
	var inputs = document.getElementsByTagName('input');
	//console.log(inputs.length)
	checkAll.onclick = function() {
		for(var i = 0; i < inputs.length; i++) {
			inputs[i].checked = this.checked;
		}
	};
}

$(function() {
	bjps()
	orders_paging()
	// 设置属性值
	$("#delete").click(function() {
		var fruit = [];

		$("input:checkbox[name='fruit']:checked").each(function() {
			return fruit.push($(this).val())
		});
		bjpShelve(fruit)
	});
})
//---------------------------浏览全部----------------------------------------
function bjps() {
	$.ajax({
		type: "get",
		url: urly("admin/tours.tour"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"start": 0,
			'type':0, 
			"size": 10
		},
		success: function(data) {
			console.log(data)
			var jsondata = data.data.objs;
			
			$("#all_change").text(Math.ceil((data.data.total)/10))         //总共页数
			
			$("#collect").html(data.data.total)
			$("#turnover").html(data.data.turnover)
			$("#orderCount").html(data.data.count)
			// console.log(jsondata)
			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata);
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
//------------------ -------全部列表分页---------------------------------------
function orders_paging() {
	$("#dishpageval").val(0)
	$("#change").text(1)

	if($("#dishpageval").val() == 0) {
		//	      			console.log("0")
		$("#PrevPage").attr("disabled", true);
	} //菜品列表分页相关
	$("#NextPage").unbind().click(function() {
		//		console.log(state)
		$("#change").text(1)
		$("#PrevPage").removeAttr("disabled");
		var dishstart = ($("#dishpageval").val() - 0) + 10;
		$.ajax({
			type: "get",
			url: urly("admin/tours.tour"),
			data: {
				"start": dishstart,
				'type':0, 
				"size": 10
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
			url: urly("admin/tours.tour"),
			data: {

				"start": dishstart,
				'type':0, 
				"size": 10
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
//----------------------------上架-------------------------------------------
function bjpShelve(new_arr) {
	console.log(new_arr)
	for(var i = 0; i < new_arr.length; i++) {
		$.ajax({
			type: "get",
			url: urly("admin/tourShelve.tour"),
			async: true,
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			dataType: "json",
			data: {
				id: new_arr[i]
			},
			success: function(data) {
				switch(JSON.stringify(data.code)) {
					case '"A00000"':
						swal({
								title: "确认上架?",
								text: "",
								type: "warning",
								showCancelButton: true,
								confirmButtonColor: "#DD6B55",
								confirmButtonText: "Yes",
								closeOnConfirm: false
							},
							function() {
								window.location.reload()
							});
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

}//------------------------------------------------点击跳转-------------------
function btn_href(id){
	window.location.href="edit_commodity.html?goodsID=" +encodeURI(id);
}