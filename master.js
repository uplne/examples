function Xperia() {
	var api = {},
			gallery,
			effects;
	
	function initialize() {
		gallery = new Gallery();
		gallery.init();
		
		effects = new Effects();
		effects.init();
		
		slider = new Slider();
		slider.init();
		
		infonav = new InfoNav();
		infonav.init();
	}
	
	api.init = initialize;
	
	return api;
}

function InfoNav() {
	var api   = {},
			$over = $('.overview'),
			$spec = $('.spec'),
			animtime = 500;
	
	function init() {
		$over.on('mouseenter', function() {
			if (!$over.hasClass('active')) {
				$(this).find('.on').fadeIn(animtime);
			}
		});
		$over.on('mouseleave', function() {
			if (!$over.hasClass('active')) {
				$(this).find('.on').fadeOut(animtime);
			}
		});		
		$spec.on('mouseenter', function() {
			if (!$spec.hasClass('active')) {
				$(this).find('.on').fadeIn(animtime);
			}
		});		
		$spec.on('mouseleave', function() {
			if (!$spec.hasClass('active')) {
				$(this).find('.on').fadeOut(animtime);
			}
		});
	}
	
	api.init = init;
	return api;
}

function Slider() {
	var api        = {},
			$dragger   = $('.dragger'),
			$mask      = $('.mask'),
			$window    = $(window),
			maskoffset = $mask.offset().left,
			offset     = $mask.offset().left - $('.ef1Wrap').offset().left - 31,
			$img       = $('.ef1_bottom');
	
	callbacks = {
		mouseenter : function(e) {
			e = jQuery.event.fix(e);			
			$(document).on('mousemove', callbacks.mousemove);
			$mask.on('mouseleave', callbacks.mouseleave);
		},
		mouseleave : function(e) {
			e = jQuery.event.fix(e);
			$(document).off('mousemove', callbacks.mousemove);
			$mask.off('mouseleave', callbacks.mouseleave);
		},
		mousemove  : function(e) {
			e = jQuery.event.fix(e);
			var mouseX = e.pageX - maskoffset + offset;
			update(mouseX);
		}
	}
	
	function update(pos) {
		$dragger.stop().animate({
			'left' : pos
		}, 400);
		$img.stop().animate({
			'width' : pos - 185
		}, 400);
	}
	
	function init() {
		$mask.on('mouseenter', callbacks.mouseenter);
	}
	
	api.init = init;
	return api;
}

function Effects() {
	var api  = {},
			anim = 'easeOutCubic',
			time = 700,
			$window = $(window),
			height  = $window.height(),
			$overview_section4 = $('.section4_detail img'),
			$section5          = $('.overview_section5');
	
	function init() {
		$window.scroll(function() {
			calculatePositions();					 
		});
	}
	
	function calculatePositions() {
		$footerList = [$('.footer_detail1'),$('.footer_detail2'),$('.footer_detail3')];
		
		// overview section 4 camera lens
		if ($window.scrollTop() > $overview_section4.offset().top - height + 400) {
			$overview_section4.animate({
				'top' : '80px',
				'opacity' : 1	
			}, time, anim);
		}
		
		// overview footer
		if ($window.scrollTop() > $(document).height() - 1400) {
			$footerList[0].fadeIn(400);
			$footerList[1].delay(200).fadeIn(400);
			$footerList[2].delay(400).fadeIn(400);
		}
		
		// overview section 4 camera lens
		if ($window.scrollTop() > $section5.offset().top - height + 800) {
			$('.ef2_left').animate({
				'left' : '10px',
				'opacity' : 1	
			}, time, anim);
			$('.ef2_right').animate({
				'left' : '129px',
				'opacity' : 1	
			}, time, anim);
		}
	}
	
	api.init = init;
	return api;
}

function Gallery() {
	var api  = {},
			list = [$('.xpef_1'),
					$('.xpef_2'),
					$('.xpef_3'),
					$('.xpef_4'),
					$('.xpef_5'),
					$('.xpef_6'),
					$('.xpef_7'),
					$('.xpef_8'),
					$('.stage .img1'),
					$('.xpef_10')],
			anim = 'easeOutCubic',
			time = 700,
			actualImage = 'img1',
			actualThumb = 0,
			pageSection = 1;
	
	function init() {
		
		startEvents();
		showImage(0);
		startPaging();
		startSections();
	}
	
	function showImage(img) {
		list[0].css({'left' : '50px'});
		list[1].css({'left' : '50px'});
		list[2].css({'left' : '50px'});
		list[8].css({'left' : '455px'});
		
		// Start animation
		list[0].delay(200).animate({
			'left'    : '0',
			'opacity' : '1'	
		}, time, anim);
		list[1].delay(400).animate({
			'left'    : '0',
			'opacity' : '1'	
		}, time, anim);
		list[2].delay(600).animate({
			'left'    : '0',
			'opacity' : '1'	
		}, time, anim);
		if (img == 0) {
			list[8].delay(800).animate({
				'left'    : '290',
				'opacity' : '1'	
			}, time + 500, anim);
		} else {
			$('.stage .' + img).css({'left' : '355px'}).stop().animate({
				'left'    : '290',
				'opacity' : '1'	
			}, time + 500, anim);
		}
		
		list[3].delay(1100).fadeIn(time);
		list[4].delay(1200).fadeIn(time);
		list[5].delay(1300).fadeIn(time);
		list[6].delay(1400).fadeIn(time);
		list[7].delay(1500).fadeIn(time);
		list[9].delay(1600).fadeIn(time);
	}
	
	function startEvents() {
		var $list = $('.thumbsWrap a');
		
		time = 400;
		
		$list.each(function(e, i) {
			$(this).on('mouseover', function() {
				$(this).animate({
					'opacity' : .4	
				});
			});
			$(this).on('mouseout', function() {
				if ($(this).attr('class').split(' ')[1] != 'active') {
					$(this).animate({
						'opacity' : 1	
					});
				}
			});
			$(this).on('click', function(e) {
				var self = $(this);
				
				e.preventDefault();
				
				$('.thumbsWrap .active').animate({
					'opacity' : 1
				}).removeClass('active');
				
				$(this).addClass('active');
												
				if ($(this).hasClass('video')) {
					removeImage();
				} else {
					if ($('.stage_video').is(":visible")) {
						$('.stage_video').fadeOut(400, function() {
							actualImage = self.attr('class').split(' ')[0];
							showImage(actualImage);
						});
					} else {
						$('.stage .' + actualImage).stop().animate({
							'left'    : '240',
							'opacity' : '0'	
						}, time, 'easeInCubic', function() {
							actualImage = self.attr('class').split(' ')[0];
							$('.stage .' + actualImage).css({'left' : '355px'}).animate({'opacity' : 0}).stop().animate({
								'left'    : '290',
								'opacity' : '1'	
							}, time, anim);
						});
					}
				}
				
			});
		});
	}
	
	function removeImage() {
		var time = 350;
		
		// Start animation
		list[0].delay(200).animate({
			'opacity' : '0'	
		}, time, anim);
		list[1].delay(300).animate({
			'opacity' : '0'		
		}, time, anim);
		list[2].delay(400).animate({
			'opacity' : '0'	
		}, time, anim);
		$('.stage .' + actualImage).delay(500).animate({
			'opacity' : '0'	
		}, time + 1000, anim);
		
		list[3].delay(600).fadeOut(time);
		list[4].delay(700).fadeOut(time);
		list[5].delay(800).fadeOut(time);
		list[6].delay(900).fadeOut(time);
		list[7].delay(1000).fadeOut(time);
		list[9].delay(1100).fadeOut(time, function() {
			startVideo();
		});
	}
	
	function startVideo() {
		$('.stage_video').fadeIn(500);
	}
	
	function startPaging() {
		var $left      = $('.gallery_aleft'),
				$right 		 = $('.gallery_aright'),
				actualPage = 1,
				$list      = $('.thumbsWrap ul'),
				$pageBox   = $('.pageBox span');
		
		$left.animate({'opacity' : .3});
		$right.animate({'opacity' : 1});
				
		$left.on('click', function(e) {
			e.preventDefault();
			
			if (actualPage == 2) {
				$list.animate({
					'marginLeft' : 0	
				}, 1000, 'easeInOutCubic');
				actualPage = 1;
				update();
			}
		});
		
		$right.on('click', function(e) {
			e.preventDefault();
			
			if (actualPage == 1) {
				$list.animate({
					'marginLeft' : -1000	
				}, 1000, 'easeInOutCubic');
				actualPage = 2;
				update();
			}
		});
		
		function update() {
			$pageBox.text(actualPage + ' of 2');
			
			if (actualPage == 1) {
				$left.animate({'opacity' : .3});
				$right.animate({'opacity' : 1});
			} else {
				$left.animate({'opacity' : 1});
				$right.animate({'opacity' : .3});
			}
		}
	}
	
	
		function startSections() {
			var $overview   = $('.pageOverview'),
					$spec       = $('.pageSpec'),
					$buttonOver = $('.overview'),
					$buttonSpec = $('.spec');
					
					$buttonOver.on('click', function(e) {
						e.preventDefault();
						
						if (!$buttonOver.hasClass('active')) {
							$spec.fadeOut(400, function() {
								$overview.fadeIn(400);
							});
							$buttonSpec.removeClass('active');
							$buttonSpec.find('.on').fadeOut(500);
							$buttonOver.addClass('active');
						}
						
					});
					
					$buttonSpec.on('click', function(e) {
						e.preventDefault();
						
						if (!$buttonSpec.hasClass('active')) {
							$overview.fadeOut(400, function() {
								$spec.fadeIn(400);
							});
							$buttonSpec.addClass('active');
							$buttonOver.removeClass('active');
							$buttonOver.find('.on').fadeOut(500);
						}
					});
		}
	
	api.init = init;
	
	return api;
}