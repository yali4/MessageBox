/**
 * jQuery MessageBox Plugin
 * Github: http://github.com/yali4/messagebox/
 * Link: http://yalcinceylan.net/messagebox
 * Copyright: October 2013
 * Creator: Yalçın CEYLAN
 * Github: http://github.com/yali4/
 * Website: http://yalcinceylan.net
 * License: MIT <http://opensource.org/licenses/mit-license.php>
*/

;(function($) {

	$.fn.MessageBoxactive = false;

	$.fn.MessageBox = function(options) {
	
		$(this.selector).each(function() {
			$.MessageBox.call($(this), options);
		});
		
	};

	$.MessageBox = function(options) {

		var options = $.extend({
			title: 'Title',
			content: 'Description',
			type: 'information', transaction: 'click',
			animate : { open: false, close : false },
			buttons: { confirm: {title:'Continue', style:'continue'}, cancel: {title:'Cancel', style:'cancel'} },
			style: { modal: 'messagebox-background', dialog: 'messagebox-dialog', content : 'messagebox-content', buttons: 'messagebox-buttons', timeout: 'messagebox-timer' },
			background: '#000', opacity: '0.8',
			timeout: { second: false, screen: false },
			modalclose: false, usekey: false, delay: false,
			preventDefault: false, stopPropagation: false,
			callback: function() {}
		}, options);

		var modalbox = {};
		var clickbox = this;
		
		modalbox.createDialog = function() {

			modalbox.modalBackground = $('<div/>', {'class':options.style.modal,css:{background:options.background,opacity:options.opacity}});
			modalbox.modalBackground.appendTo('body');

			if (options.delay) {
				modalbox.modalBackground.css({'display':'none'}).fadeIn(options.delay);
			}

			if (options.modalclose) {
				modalbox.modalBackground.click(function() {
					modalbox.response = false;
					modalbox.removeDialog();
				});
			}
			
			modalbox.dialog = $('<div/>', {'class':options.style.dialog});
			modalbox.content = $('<div/>', {'class':options.style.content});
			modalbox.content.appendTo(modalbox.dialog);
			modalbox.title = $('<h1/>', {'class':'title',html:options.title});
			modalbox.title.appendTo(modalbox.content);
			modalbox.description = $('<div/>', {'class':'description',html:options.content});
			modalbox.description.appendTo(modalbox.content);
			modalbox.buttons = $('<div/>', {'class':options.style.buttons});
			modalbox.buttons.appendTo(modalbox.dialog);
			
			var modalbuttons = {};
			
			if (options.type=='confirmation' || options.type=='information') {
				if (options.buttons.confirm.title) {
					modalbuttons.confirm = $('<button/>', {'class':options.buttons.confirm.style,html:options.buttons.confirm.title});
					modalbuttons.confirm.appendTo(modalbox.buttons);
					modalbuttons.confirm.click(function() {
						modalbox.response = true;
						modalbox.removeDialog();
					});
				}
			}
			
			if (options.type=='confirmation') {
				if (options.buttons.cancel.title) {
					modalbuttons.cancel = $('<button/>', {'class':options.buttons.cancel.style,html:options.buttons.cancel.title});
					modalbuttons.cancel.appendTo(modalbox.buttons);			
					modalbuttons.cancel.click(function() {
						modalbox.response = false;
						modalbox.removeDialog();
					});
				}
			}

			modalbox.dialog.appendTo('body');
			modalbox.width = modalbox.dialog.width();
			modalbox.height = modalbox.dialog.height();
			modalbox.windowWidth = document.documentElement.clientWidth;
			modalbox.windowHeight = document.documentElement.clientHeight;
			modalbox.leftCenter = (modalbox.windowWidth-modalbox.width)*0.50;
			modalbox.topCenter = (modalbox.windowHeight-modalbox.height)*0.50;
			modalbox.bottom = (modalbox.windowHeight-modalbox.height);
			modalbox.right = (modalbox.windowWidth-modalbox.width);

			if (options.delay && options.animate.open) {
				switch(options.animate.open) {
					case 'top':
						modalbox.dialog.css({opacity:0,left:modalbox.leftCenter}).animate({opacity:1,top:modalbox.topCenter},options.delay);
					break;
					case 'left':
						modalbox.dialog.css({opacity:0,top:modalbox.topCenter}).animate({opacity:1,left:modalbox.leftCenter},options.delay);
					break;
					case 'right':
						modalbox.dialog.css({opacity:0,top:modalbox.topCenter,left:modalbox.right}).animate({opacity:1,left:modalbox.leftCenter},options.delay);
					break;
					case 'bottom':
						modalbox.dialog.css({opacity:0,left:modalbox.leftCenter,top:modalbox.bottom}).animate({opacity:1,top:modalbox.topCenter},options.delay);
					break;
					case 'topLeft':
						modalbox.dialog.css({opacity:0,top:0,left:0}).animate({opacity:1,top:modalbox.topCenter,left:modalbox.leftCenter},options.delay);
					break;
					case 'topRight':
						modalbox.dialog.css({opacity:0,top:0,left:modalbox.right}).animate({opacity:1,top:modalbox.topCenter,left:modalbox.leftCenter},options.delay);
					break;
					case 'bottomLeft':
						modalbox.dialog.css({opacity:0,top:modalbox.bottom,left:0}).animate({opacity:1,top:modalbox.topCenter,left:modalbox.leftCenter},options.delay);
					break;
					case 'bottomRight':
						modalbox.dialog.css({opacity:0,top:modalbox.bottom,left:modalbox.right}).animate({opacity:1,top:modalbox.topCenter,left:modalbox.leftCenter},options.delay);
					break;
					case 'topFade':
						modalbox.dialog.css({opacity:0,top:(modalbox.topCenter-25),left:modalbox.leftCenter}).animate({opacity:1,top:modalbox.topCenter},options.delay);
					break;
					case 'bottomFade':
						modalbox.dialog.css({opacity:0,top:(modalbox.topCenter+25),left:modalbox.leftCenter}).animate({opacity:1,top:modalbox.topCenter},options.delay);
					break;
				}
			}	else {
				modalbox.dialog.css({left:modalbox.leftCenter,top:modalbox.topCenter});
			}
			
			modalbox.timeout = $('<div/>', {'class':options.style.timeout,css:{'display':'none'}});
			modalbox.timeout.appendTo(modalbox.buttons);			

		}

		var modalPosition = function() {
			modalbox.leftCenter = (document.documentElement.clientWidth-modalbox.dialog.width())*0.50;
			modalbox.topCenter = (document.documentElement.clientHeight-modalbox.dialog.height())*0.50;
			modalbox.dialog.stop().animate({left:modalbox.leftCenter,top:modalbox.topCenter});
		}
		
		var modalKeylist = { enter : 13, space : 32, escape : 27 };
		
		var modalKeydown = function(event) {
			event = event || window.event;
			if (options.type=='confirmation' || options.type=='information') {
				if (event.keyCode==modalKeylist.escape) {
					event.returnValue = false;
					if (event.preventDefault) {
						event.preventDefault();
					}
					modalbox.response = false;
					modalbox.removeDialog();
				}
				if (event.keyCode==modalKeylist.enter || event.keyCode==modalKeylist.space) {
					event.returnValue = false;
					if (event.preventDefault) {
						event.preventDefault();
					}
					modalbox.response = true;
					modalbox.removeDialog();
				}
			}
		}
		
		modalbox.addEventListener = function(target,event,callback,useCapture) {
			if ( typeof target.addEventListener === 'function' ) {
				target.addEventListener(event,callback,useCapture);
			} else if ( target.attachEvent ) {
				target.attachEvent(event,callback,useCapture);
			}
		}

		modalbox.removeEventListener = function(target,event,callback,useCapture) {
			if (typeof target.removeEventListener === 'function') {
				target.removeEventListener(event,callback,useCapture);
			} else if ( target.detachEvent ) {
				target.detachEvent(event,callback,useCapture);
			}
		}

		modalbox.closeDialog = function() {
			modalbox.dialog.remove();
			modalbox.modalBackground.remove();
			$.fn.MessageBoxactive = false;
			modalbox.removeEventListener(window,'resize',modalPosition,false);
			modalbox.removeEventListener(window,'onresize',modalPosition,false);
			if (options.usekey) {
				modalbox.removeEventListener(document,'keydown',modalKeydown,false);
				modalbox.removeEventListener(document,'onkeydown',modalKeydown,false);
			}
			if (typeof parseInt(options.timeout.second) == 'number' && parseInt(options.timeout.second) > 0) {
				clearInterval(modalbox.interval);
			}
			if ( options.callback && typeof options.callback === 'function' ) {
				options.callback(modalbox.response);
			}
		}

		modalbox.removeDialog = function() {
			if ($.fn.MessageBoxactive==true) {
				if (typeof modalbox.response === 'undefined') {
					modalbox.response = false;
				}
				if (options.delay && options.animate.close) {
					switch(options.animate.close) {
						case 'top':
							modalbox.dialog.animate({top:"+=50"},'fast',function() {
								modalbox.modalBackground.fadeOut(options.delay);
								modalbox.dialog.animate({opacity:0,top:0},options.delay, function(){
									modalbox.closeDialog();
								});
							});
						break;
						case 'left':
							modalbox.dialog.animate({left:"+=50"},'fast',function() {
								modalbox.modalBackground.fadeOut(options.delay);
								modalbox.dialog.animate({opacity:0,left:0},options.delay, function(){
									modalbox.closeDialog();
								});
							});
						break;
						case 'right':
							modalbox.dialog.animate({left:"-=50"},'fast',function() {
								modalbox.modalBackground.fadeOut(options.delay);
								modalbox.dialog.animate({opacity:0,left:modalbox.right},options.delay, function(){
									modalbox.closeDialog();
								});
							});
						break;
						case 'bottom':
							modalbox.dialog.animate({top:"-=50"},'fast',function() {
								modalbox.modalBackground.fadeOut(options.delay);
								modalbox.dialog.animate({opacity:0,top:modalbox.bottom},options.delay, function(){
									modalbox.closeDialog();
								});
							});
						break;
						case 'topLeft':
							modalbox.dialog.animate({left:"+=50",top:"+=50"},'fast', function(){
								modalbox.modalBackground.fadeOut(options.delay);
								modalbox.dialog.animate({opacity:0,left:0,top:0},options.delay, function(){
									modalbox.closeDialog();
								});
							});
						break;
						case 'topRight':
							modalbox.dialog.animate({left:"-=50",top:"+=50"},'fast', function(){
								modalbox.modalBackground.fadeOut(options.delay);
								modalbox.dialog.animate({opacity:0,left:modalbox.right,top:0},options.delay, function(){
									modalbox.closeDialog();
								});
							});
						break;
						case 'bottomLeft':
							modalbox.dialog.animate({left:"+=50",top:"-=50"},'fast', function(){
								modalbox.modalBackground.fadeOut(options.delay);
								modalbox.dialog.animate({opacity:0,left:0,top:modalbox.bottom},options.delay, function(){
									modalbox.closeDialog();
								});	
							});
						break;
						case 'bottomRight':
							modalbox.dialog.animate({left:"-=50",top:"-=50"},'fast', function(){
								modalbox.modalBackground.fadeOut(options.delay);
								modalbox.dialog.animate({opacity:0,left:modalbox.right,top:modalbox.bottom},options.delay, function(){
									modalbox.closeDialog();
								});
							});
						break;
						case 'fadeOut':
							modalbox.modalBackground.fadeOut(options.delay);
							modalbox.dialog.animate({opacity:0},options.delay, function(){
								modalbox.closeDialog();
							});
						break;
					}
				} else {
					modalbox.closeDialog();
				}
			}
		}
		
		modalbox.insertDialog = function() {
			if ($.fn.MessageBoxactive==false) {
				$.fn.MessageBoxactive = true;
				modalbox.createDialog();
				modalbox.addEventListener(window,'resize',modalPosition,false);
				modalbox.addEventListener(window,'onresize',modalPosition,false);
				if (options.usekey) {
					modalbox.addEventListener(document,'keydown',modalKeydown,false);
					modalbox.addEventListener(document,'onkeydown',modalKeydown,false);
				}
				if ( typeof parseInt(options.timeout.second) == 'number' && parseInt(options.timeout.second) > 0 ) {
					modalbox.remaining = parseInt(options.timeout.second);
					modalbox.timeout.html(modalbox.remaining);
					if (options.timeout.screen) {
						modalbox.timeout.css({'display':'block'});
					}
					modalbox.interval = setInterval(function() {
						if (modalbox.remaining>0) {
							modalbox.remaining--;
							modalbox.timeout.html(modalbox.remaining);
						}
						if (modalbox.remaining==0) {
							modalbox.removeDialog();
						}
					},1000);
					
				}
				
				return {
					changeTitle: function(title) {
						modalbox.title.html(title);
					},
					changeContent: function(content) {
						modalbox.description.html(content);
					},
					changeCallback: function(callback) {
						if ( typeof callback === 'function' ) {
							options.callback = callback;
						}
					},
					hide: function() {
						modalbox.dialog.hide();
						modalbox.modalBackground.hide();				
					},
					show: function() {
						modalbox.dialog.show();
						modalbox.modalBackground.show();			
					},
					close: function() {
						modalbox.removeDialog();
					}
				};
				
			}
		}

		if (typeof clickbox[options.transaction]==='function') {
			clickbox[options.transaction](function(event) {
				if (options.preventDefault) {
					event.returnValue = false;
					if (event.preventDefault) { event.preventDefault(); }
				}
				if (options.stopPropagation) {
					event.cancelBubble = true;
					if (event.stopPropagation) { event.stopPropagation(); }
				}
				if (typeof clickbox.blur==='function') { clickbox.blur(); }
				return modalbox.insertDialog();
			});
		} else {
			return modalbox.insertDialog();
		}

	}

})(jQuery);
