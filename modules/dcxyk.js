layui.define(['form', 'element'], function (exports) {
	var form = layui.form,
		element = layui.element;

	initAppPage({
		formRender: true,
		elmRender: true,
		sceneGravityRoot: '.sceneGravity',
		pageTransitions: {
			startSlide: 0,
			mode: 8,
			infiniteLoop: false,
			touchIgnoreDomClass: 'touchIgnore',
			onSliderLoad: function (currentIndex) {
				let pageItemCount = $('ul.pageItemWrap').find('li.pageItem').length;
				element.progress('pageProgress', ((currentIndex + 1) / pageItemCount * 100) + '%');
				if (currentIndex == 5) {
					$('div.pre-wrap-bottom').fadeOut(400);
					$('div.pageProgress').fadeOut(400);
				} else {
					$('div.pre-wrap-bottom').fadeIn(400);
					$('div.pageProgress').fadeIn(400);
				}
			},
			onSlideAfter: function (newIndex, oldIndex, newElement, oldElement) {
				let pageItemCount = $('ul.pageItemWrap').find('li.pageItem').length;
				let pageProgressVal = (newIndex + 1) / pageItemCount * 100;
				element.progress('pageProgress', pageProgressVal + '%');
				if (newIndex == 5) {
					$('div.pre-wrap-bottom').fadeOut(400);
					$('div.pageProgress').fadeOut(400);
				} else {
					$('div.pre-wrap-bottom').fadeIn(400);
					$('div.pageProgress').fadeIn(400);
				}
			}
		},
		initFinish: function () {
			initCanvs();
		}
	});

	exports('dcxyk', function (clickWhere, thiz) {
		if (clickWhere == 'playMusicToggle') {
			$(thiz).toggleClass('rotate');
			let oAudio = $(thiz).find('audio').get(0);
			if ($(thiz).hasClass('rotate')) {
				oAudio.play();
			} else {
				oAudio.pause();
			}
		} else if (clickWhere == 'activeRule') {
			console.log('请在 modules > dcxyk.js : Line 53 添加 活动规则代码');
		} else if (clickWhere == 'joinActive') {
			layer.open({
				title: '参加集卡活动',
				shade: 0.9,
				anim: 5,
				move: false,
				shadeClose: true,
				btn: ['立即参加'],
				type: 0,
				content: `<div class="joinActivePhone"><input type="text" id="userPhone" placeholder="输入您的手机号"/></div><div class="joinActiveCode"><input type="text" id="userPhoneCode" placeholder="手机验证码"/><span class="ripple" onclick="getPhoneCode()">获取验证码</span></div>`,
				yes: function (index, layero) {
					var userPhone = $('#userPhone').val();
					var userPhoneCode = $('#userPhoneCode').val();
					if (userPhone && userPhoneCode && /^1[3|4|5|6|7|8][0-9]\d{8}$/.test(userPhone)) {
						var loadingIndex = layer.load(2);
						setTimeout(function () {
							layer.close(loadingIndex);
							layer.close(index);
							joinActiveSuccess();
						}, 2000);
					} else {
						if (!userPhone) {
							new Toast('请输入您的手机号码').show();
						} else if (!/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(userPhone)) {
							new Toast('请输入正确的手机号码').show();
						} else if (!userPhoneCode) {
							new Toast('请输入手机验证码').show();
						}
					}
				}
			});
		}
	});
});

// 获取手机验证码
function getPhoneCode() {
	var userPhone = $('#userPhone').val();
	if (/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(userPhone)) {
		console.log('请在 modules > dcxyk.js : Line 93 添加 获取手机验证码代码');
	} else {
		new Toast('请输入正确的手机号码').show();
	}
}

// 参加活动成功
function joinActiveSuccess() {
	$('div.contentTitleImg').hide();
	$('div#joinActiveBtn').hide();
	$('img.guizeImg').hide();
	$('.pageItemWrap li.pageItem6 .content').css({
		bottom: '0'
	});
	$('.pageItemWrap li.pageItem6 .content .logo').css({
		bottom: '0'
	});
	$('.pageItemWrap li.pageItem6 div.content').animate({
		scrollTop: 0
	}, 400);
	$('div.main_middle div.glueWrap').hide();
	$('div.main_middle div.downloadAppWrap').show();
	$('.pageItemWrap li.pageItem6 .content .mainContent').animate({
		'margin-top': '-240px'
	}, 400);
}

// 存放地区坐标
var taiyuanPoint = [155, 240];
var mapAreaPoint = [{
	point: [188, 56],
	control: [237, 184]
}, {
	point: [135, 130],
	control: [192, 192]
}, {
	point: [76, 270],
	control: [100, 220]
}, {
	point: [204, 254],
	control: [190, 230]
}, {
	point: [160, 202],
	control: [140, 214]
}, {
	point: [88, 388],
	control: [90, 300]
}, {
	point: [48, 466],
	control: [56, 322]
}, {
	point: [178, 388],
	control: [152, 324]
}, {
	point: [162, 432],
	control: [222, 354]
}];

function initCanvs() {
	var cvs = document.getElementById('map_cavs');
	cvs.width = cvs.offsetWidth;
	cvs.height = cvs.offsetHeight;
	var ctx = cvs.getContext('2d');
	ctx.lineWidth = 2;
	ctx.lineCap = 'round';
	ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 1;
	ctx.shadowBlur = 8;
	ctx.shadowColor = '#fef4c8';
	ctx.strokeStyle = '#fef4c8';

	for (var point = 0; point < mapAreaPoint.length; point++) {
		ctx.beginPath();
		ctx.moveTo(taiyuanPoint[0], taiyuanPoint[1]);
		ctx.quadraticCurveTo(mapAreaPoint[point].control[0], mapAreaPoint[point].control[1], mapAreaPoint[point].point[0], mapAreaPoint[point].point[1]);
		ctx.stroke();
		ctx.closePath();
	}
}