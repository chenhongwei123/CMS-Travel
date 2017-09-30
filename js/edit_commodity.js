window.onload = function() {
	var checkAll = document.getElementById('checkall');
	var inputs = document.getElementsByTagName('input');
	checkAll.onclick = function() {
		for(var i = 0; i < inputs.length; i++) {
			inputs[i].checked = this.checked;
		}
	};
}

$(document).ready(function() {
	getToken() //验证阿里百川
	//--------------------------------获取地址上的ID-------------------------------------
	var id = getQueryString("goodsID")
	bjpDetail(id)
	var timer;
	clearTimeout(timer)
	timer = setTimeout(function() {
		destsid()
	}, 500)

	//-----------------------------选取时间-------------------------------------------
	laydate.render({
		elem: '.J-xl',
		done: function(value) { //监听日期被切换
			var dataa = $.myTime.DateToUnix(value);
			$("#timeunix").val(dataa);

		}
	});
	laydate.render({
		elem: '.J-xlb',
		done: function(value) { //监听日期被切换
			var dataa = $.myTime.DateToUnix(value);
			$("#timeunib").val(dataa);
		}
	});

	$("#l_did").on("change", function() {
		//alert("11")
		$("#did").val($("#l_did").val())
	})
	//--------------------点击修改-----------------------------------

	$(".btn_send").click(function() {
		var banners = new Array();
		var details = new Array();
		var features = new Array();
		var trafarr = {};
		var traffics = []
		$(".banner input:hidden[name='fruit']").each(function() { //获取banner图片地址数据

			if($(this).val().length !== 0) {
				banners.push($(this).val());
			}
		});
		$(".banner2 input:hidden[name='fruit']").each(function() { //获取行程图片地址数据
			if($(this).val().length !== 0) {
				details.push($(this).val());
			}
		});
		$(" input:text[name='features']").each(function() { //获取行程亮点数据

			if($(this).val().length !== 0) {
				features.push($(this).val());
			}
			var newstring = features.join("</br>")
			$("#feature").val(newstring)
			console.log(newstring)
		});
		if($("#title").val() == '') {
			alert("请填写旅游项目标题")
		} else {
			if($("#outset").val() == '') {
				alert("请填写出发地")
			} else {
				if($("#brand").val() == '') {
					alert("请填写品牌")
				} else {
					if($("#tags").val() == '') {
						alert("请填写标签")
					} else {
						if($("#feature").val() == '') {
							alert("请填写行程亮点")
						} else {
							if($("#viewpoint").val() == '') {
								alert("请填写景点数")
							} else {
								if($("#team").val() == '') {
									alert("请填写团体餐次数")
								} else {
									if($("#self").val() == '') {
										alert("请填写自由用餐次数")
									} else {
										if($("#shopping").val() == '') {
											alert("请填写购物次数")
										} else {
											if(banners == '') {
												alert("请上传banner图")
											} else {
												if(details == '') {
													alert("请上传行程图")
												} else {
													if($("#get_object").val() == '') {
														alert("请填写商品规格")
													} else {
														if($("#departure").val() == '' || $("#departure2").val() == '' || $("#timeunic").val() == '' || $("#timeunic2").val() == '' || $("#destination").val() == '' || $("#destination2").val() == '' || $("#timeunid").val() == '' || $("#timeunid2").val() == '' || $("#facilitator").val() == '' || $("#facilitator2").val() == '') {
															alert("请将交通信息填写完整")
														} else {
															if($("#hotel_name").val() == '' || $("#hotel_describe").val() == '') {
																alert("请将酒店信息填写完整")
															} else {
																if($("#tickets_name").val() == '' || $("#tickets_describe").val() == '') {
																	alert("请将门票信息填写完整")
																} else {
																	if($("#safeName").val() == '' || $("#safePrice").val() == '' || $("#safeDesc").val() == '') {
																		alert("请将保险信息填写完整")
																	} else {
																		$(".traffics").each(function() {
																			var type = $(this).children("input").eq(0).val()
																			var mode = $(this).children(".form-group").eq(0).children('.col-sm-6').eq(0).children('select').eq(0).val()
																			var outset = $(this).children(".form-group").eq(1).children('.col-sm-6').eq(0).children('input').eq(0).val()
																			var otime = $(this).children(".form-group").eq(2).children('.col-sm-6').eq(0).children('input').eq(0).val()
																			var arrive = $(this).children(".form-group").eq(3).children('.col-sm-6').eq(0).children('input').eq(0).val()
																			var atime = $(this).children(".form-group").eq(4).children('.col-sm-6').eq(0).children('input').eq(0).val()
																			var provider = $(this).children(".form-group").eq(5).children('.col-sm-6').eq(0).children('input').eq(0).val()
																			trafarr = {
																				mode: mode,
																				outset: outset,
																				otime: otime,
																				arrive: arrive,
																				atime: atime,
																				provider: provider,
																				type: type
																			}
																			traffics.push(trafarr)
																		})
																		var title = $("#title").val()
																		var outset = $("#outset").val()
																		var brand = $("#brand").val()
																		var did = getStr($("#did").val(), '.')
																		var tags = $("#tags").val()
																		var feature = $("#feature").val()
																		var viewpoint = $("#viewpoint").val()
																		var team = $("#team").val()
																		var self = $("#self").val()
																		var shopping = $("#shopping").val()
																		var place = $("#place").val()
																		var formats = JSON.parse($("#get_object").val())
																		var hotelName = $("#hotel_name").val()
																		var hotelDesc = $("#hotel_describe").val()
																		var ticketName = $("#tickets_name").val()
																		var ticketDesc = $("#tickets_describe").val()
																		var safeName = $("#safeName").val()
																		var safeDesc = $("#safeDesc").val()
																		var safePrice = $("#safePrice").val()
																		var id = getQueryString("goodsID")
																		var List_Object = JSON.stringify({
																			id: id,
																			title: title,
																			outset: outset,
																			did: did,
																			brand: brand,
																			tags: tags,
																			feature: feature,
																			viewpoint: viewpoint,
																			team: team,
																			self: self,
																			shopping: shopping,
																			place: place,
																			banners: banners,
																			details: details,
																			formats: formats,
																			traffics: traffics,
																			hotelName: hotelName,
																			hotelDesc: hotelDesc,
																			ticketName: ticketName,
																			ticketDesc: ticketDesc,
																			safeName: safeName,
																			safeDesc: safeDesc,
																			safePrice: safePrice
																		})
																		//console.log(List_Object)
																		release(List_Object)
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}

	});
})

//-- -- -- -- -- -- -- -- -- -- - 发布商品-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
function release(List_Object) {
	$.ajax({
		type: "post",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urly("admin/tourEdit.tour"),
		data: List_Object,
		async: true,
		dataType: "json",
		contentType: "application/json;charset=utf-8", //转换成字符串形式发送
		success: function(data) {
			//console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					alert("修改成功")
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
//---------------------------渲染数据----------------------------------------------
function bjpDetail(id) {

	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urly("admin/tourDetail.tour"),
		data: {
			id: id
		},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':

					$("#title").val(data.data.title) //标题
					$("#outset").val(data.data.outset) //发货地
					$("#brand").val(data.data.brand) //品牌

					var $select = ("<option >" + data.data.dest + "</option>")
					$("#l_did").append($select) //目的地

					var tags = data.data.tags.split("-")
					tagEditor(tags) //标签

					$("#feature").val(data.data.feature) //行程亮点
					$("#viewpoint").val(data.data.viewpoint) //景点数
					$("#team").val(data.data.team) //团体餐次数
					$("#self").val(data.data.self) //自由用餐次数
					$("#shopping").val(data.data.shopping) //购物次数
					$("#place").val(data.data.place) //购物地点

					var all_team = parseInt(data.data.team) + parseInt(data.data.self)
					$("#all_team").val(all_team) //用餐总数

					$("#hotel_name").val(data.data.place)
					$("#hotel_describe").val(data.data.hotelDesc) //酒店信息

					$("#tickets_name").val(data.data.ticketName)
					$("#tickets_describe").val(data.data.ticketDesc) //门票信息

					$("#safeName").val(data.data.safeName)
					$("#safePrice").val(data.data.safePrice)
					$("#safeDesc").val(data.data.safeDesc) //保险详情

					var jsondata4 = data.data.traffics
					$(".traffic").setTemplateElement("template4");
					$(".traffic").processTemplate(jsondata4); //交通方式
					changer_time()

					var jsondata2 = data.data.banners
					$("#banner").setTemplateElement("template2");
					$("#banner").processTemplate(jsondata2); //banner图

					var jsondata3 = data.data.details
					$("#banner2").setTemplateElement("template3");
					$("#banner2").processTemplate(jsondata3); //banner图

					var jsondata1 = data.data.formats
					//					console.log(JSON.stringify(jsondata1))
					$("#tbody1").setTemplateElement("template");
					$("#tbody1").processTemplate(jsondata1); //规格参数

					var jsondata5 = (data.data.feature).split("</br>")
					$("#feature").val(data.data.feature)
					console.log(jsondata5)
					$(".arr_feature").setTemplateElement("template5");
					$(".arr_feature").processTemplate(jsondata5); //行程亮点

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

//-------------------------------------获取目的地ID--------------------------------
function destsid() {
	$.ajax({
		type: "post",
		url: urly("admin/dests.tour"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"start": 0,
			"size": 100
		},
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					$.each(data.data.objs, function(index) {
						var $select = ("<option >" + data.data.objs[index].id + "." + data.data.objs[index].name + "(" + data.data.objs[index].feature + ")" + "</option>")
						$("#l_did").append($select)
					})
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

//-----------------------------修改模版------------------------------------------------
var isFlag = true

function modifier() {

	if(isFlag) {
		$(".table").css("border", "1px solid #f31212")
		$("#tbody1").find("input").attr('disabled', false)
		$(".modifier").html("保存模版")
		$(".modifier").css("background-color", "red")
		isFlag = false;

	} else {
		$(".table").css("border", "none")
		$("#tbody1").find("input").attr('disabled', 'disabled')
		$(".modifier").html("修改模版")
		$(".modifier").css("background-color", "#337ab7")
		isFlag = true;

		$("#tbody1 tr").each(function() { //遍历所有日期项目
			var ischecked = $(this).children("td").eq(0).children('input').eq(0).is(':checked')
			var startTime = DateToUnix($(this).children("td").eq(1).children('input').eq(0).val())
			var num = $(this).children("td").eq(2).children('input').eq(0).val()
			var price = $(this).children("td").eq(3).children('input').eq(0).val()
			var stock = $(this).children("td").eq(4).children('input').eq(0).val()
			var money = $(this).children("td").eq(5).children('input').eq(0).val()
			var _this = this

			if(ischecked == true) { //判断是否选中，选中创建数据对象，反之亦然.
				object_norms(startTime, num, price, stock, money, _this) //创建数据对象函数
			} else {
				$(_this).children("td").eq(0).children('input').eq(1).val('') //不创建数据对象，并清空
			}
		})
		var user = {};
		var arrx = new Array();
		$(".form-group input:hidden[name='norms_object']").each(function() { //遍历所保存数据对象的input
			if($(this).val().length !== 0) {
				arr = JSON.parse($(this).val())
				arrx.push(arr); //遍历加入新数组 arrx
			}
		});
		user = arrx //新数组 arrx全部加入新对象user
		$("#get_object").val(JSON.stringify(user))
		console.log($("#get_object").val())
	}

}
//--------------------------------生成对象类型--------------------------------------
function object_norms(startTime, num, price, stock, money, _this) {
	//e = e || window.event;
	var obj = {
		startTime: startTime,
		num: num,
		price: price,
		stock: stock,
		money: money
	};
	$(_this).children("td").eq(0).children('input').eq(1).val(JSON.stringify(obj))
	//	$(g_object).val(JSON.stringify(obj))
	//console.log($(g_object).val())
}
//--------------------增加规格-------------------------------------
function add_norms(e) {
	if($("#J-xl").val() == '') {
		alert("请选择起始时间")
	} else {
		if($("#J-xlb").val() == '') {
			alert("请选择起始时间")
		} else {
			if($("#numdas").val() == '') {
				alert("请填写行程天数")
			} else {
				if($("#solo").val() == '') {
					alert("请填写套餐单人价格起点")
				} else {
					if($("#inventoey").val() == '') {
						alert("请填写库存")
					} else {
						if($("#price").val() == '') {
							alert("请填写单价")
						} else {
							$("#myModal").modal('hide')
							var $norms = e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling
							//							console.log($norms)
							var start = $("#J-xl").val()
							var end = $("#J-xlb").val()
							getDate(start, end)
							var str = localStorage.getItem('arr');
							var new_obj = JSON.parse(str)
							//console.log(new_obj)
							$("#tbody1").setTemplateElement("template");
							$("#tbody1").processTemplate(new_obj);
							$(".btn_send").attr("disabled", false)
							//							console.log($("#get_object").val())
						}
					}
				}
			}
		}
	}
}
//---------------------------------------------------新增行程---------------------------------------------
function addfeature(e) {
	e = e || window.event;
	var $feature = e.target.parentNode
	console.log(e.target.parentNode)
	var feature = ('<input type="text" class="form-control" name="features" id="departure"></br>')
	$($feature).append(feature)

}
//----------------------------------时间转换-------------------------------------------
function getDate(start_time, end_time) {
	var bd = new Date(start_time),
		be = new Date(end_time);

	var bd_time = bd.getTime(),
		be_time = be.getTime(),
		time_diff = be_time - bd_time;
	console.log(time_diff)
	var d_arr = [];
	for(var i = 0; i <= time_diff; i += 86400000) {
		var ds = new Date(bd_time + i);
		//console.log(ds)
		var dx = $.myTime.DateToUnix(ds.getFullYear() + "-" + (ds.getMonth() + 1) + '-' + ds.getDate())
		//console.log(dx)
		//d_arr.push(ds.getFullYear() + "年" + (ds.getMonth() + 1) + '月' + ds.getDate() + '日')
		//d_arr.push(ds.getFullYear() + "-" + (ds.getMonth() + 1) + '-' + ds.getDate())
		//d_arr.push(dx)
		//var timer = ds.getFullYear() + "-" + (ds.getMonth() + 1) + '-' + ds.getDate()
		var timer = dx
		var numdas = $("#numdas").val()
		var solo = $("#solo").val()
		var inventoey = $("#inventoey").val()
		var price = $("#price").val()

		var obj = {
			startTime: timer,
			num: numdas,
			price: solo,
			stock: inventoey,
			money: price
		};
		d_arr.push(obj)
		//console.log(obj)
	}
	var new_arr = JSON.stringify(d_arr)
	//console.log(new_arr);
	localStorage.setItem("arr", new_arr)
	return d_arr
}
//--------------------------------上传图片阿里百川-------------------------------------------
function upfile(e) {
	e = e || window.event;
	var uploader = uploadJSSDK;
	//alert("111")
	var $upimg = e.target.previousElementSibling
	var $img_name = e.target.nextElementSibling
	var $delete_img = e.target.nextElementSibling.nextElementSibling
	var $banner = e.target.parentNode.parentNode
	$($upimg).attr('src', "../img/jiazai0.gif")
	var files = e.target.files;
	//	console.log(files)
	for(var i = 0; i < files.length; i++) {
		uploader({
			file: files[i],
			name: new Date().getTime(),
			token: imgtoken,
			dir: "dev",
			callback: function(percent, result) {
				if(percent == 100) {
					$($img_name).val(result.url)
					$($upimg).attr('src', result.url)
					$(e.target).css("display", "none")
					$($delete_img).css("display", "block")
					var $upfile = ('<div class="upfile">' +
						'<div class="fileimgAccount">+</div>' +
						'<img class="upload-img img1">' +
						'<input type="file" class="file1" onchange="upfile(event)">' +
						'<input type="hidden" name="fruit" class="img_name"  value="" />' +
						'<a onclick="delete_img(event)" class="delete_img">删除</a>' +
						'</div>')
					$($banner).append($upfile);
				}
			}
		});
	}
}

//---------------------图片删除---------------------------------	
function delete_img(e) {
	$(e.target).parent().remove()
}
//----------------------------自定义标签-------------------------------
function tagEditor(arr) {
	$('#tags').tagEditor({
		initialTags: arr,
		delimiter: '- ',
		placeholder: 'Enter tags ...'
	}).css('display', 'block').attr('readonly', true);
}



//------------------------------切换时间------------------------------------------
function changer_time() {
	laydate.render({
		elem: '.J-xlc',
		type: 'time',
		done: function(value) { //监听日期被切换
			var dataa = $.myTime.DateToUnix(value);
			$("#timeunic").val(dataa);
		}
	});
	laydate.render({
		elem: '.J-xld',
		type: 'time',
		done: function(value) { //监听日期被切换
			var dataa = $.myTime.DateToUnix(value);
			$("#timeunid").val(dataa);
		}
	});
	laydate.render({
		elem: '.J-xlc2',
		type: 'time',
		done: function(value) { //监听日期被切换
			var dataa = $.myTime.DateToUnix(value);
			$("#timeunic2").val(dataa);
		}
	});
	laydate.render({
		elem: '.J-xld2',
		type: 'time',
		done: function(value) { //监听日期被切换
			var dataa = $.myTime.DateToUnix(value);
			$("#timeunid2").val(dataa);
		}
	});
}