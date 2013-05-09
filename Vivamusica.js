var sk = {
	vivamusica: {
		controllers: {},
		sections: {},
		utils: {}
	}
}

sk.vivamusica.Vivamusica = (function() {
	//==================================================
	// API
	//==================================================
	var api     = {},

	//==================================================
	// INSTANCE VARIABLES
	//==================================================
	controller  = null,
	lang        = '';

	//==================================================
	// METHODS
	//==================================================
	function initialize(sLang) {
		controller = new sk.vivamusica.controllers.Controller();
		controller.parent = this;
		controller.initialize();
		
		//sk.vivamusica.utils.Banner().init();
		sk.vivamusica.utils.BackgroundChanger().init();
				
		lang = sLang;
		
		var mainHeight = sk.vivamusica.utils.Sizes().wHeight - $('#header').height() - $('#footer').height();
		$('.main').height(mainHeight);
	}
	
	// Overlay method
	function addOverlay(url) {
		if ($('.overlay').length == 0) {
			$('body').append('<div class="overlay"></div>');
			$('body').append('<a class="overlay_close" href="#/' + url + '"></a>');
			$('.overlay').animate({
				'opacity' : .65,
				'filter'  : 'alpha(opacity = 65)',
				'z-index' : 100
			}, 400);
			$('.overlay_close').css({
				'top'     : sk.vivamusica.utils.Sizes().whHeight - 190,
				'left'    : sk.vivamusica.utils.Sizes().whWidth + 285,
				'z-index' : 101
			});
		}
		
		return $('.overlay_close');
	}
	
	function removeOverlay() {
		$('.overlay_close').unbind('click');
		$('.overlay_close').remove();
		
		$('.overlay').animate({
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'z-index' : 100
		}, function() {
			$('.overlay').remove();
		});
	}
	
	function getLanguage() {
		return lang;
	}

	// API
	api.initialize    = initialize;
	api.addOverlay    = addOverlay;
	api.removeOverlay = removeOverlay;
	api.getLanguage   = getLanguage;
	api.controller    = function() {
		return controller;
	};
	
	return api;	
})();

sk.vivamusica.utils.BoxController = function() {
	this.leftMargin = 80;
	this.main       = $('.main');
	this.actual     = null;
};

/*
 * Function adds box with arrows
 * @params: actual box class, new box class
 */
sk.vivamusica.utils.BoxController.prototype.addBox = function(oNew, bDelete) {
	// Instance vars
	var self    = this;			
	this.box    = oNew;

	if (self.actual != null) {
		self.actual.animate({
			'left' : '-=' + self.leftMargin,
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'z-index' : 0
		}, 600, 'easeInOutBack', function() {
			(bDelete) ? self.actual.remove() : self.actual.hide();
			self.showBox();
		});
	} else {
		self.showBox();
	}
};

sk.vivamusica.utils.BoxController.factory = function(type) {
	var constr = type,
		parent = sk.vivamusica.utils.BoxController;

	if (typeof parent[constr] !== 'function') {
		throw {
			name    : 'Error',
			message : constr + "doesn't exist!"
		};
	}
	
	if (typeof parent[constr].prototype.addBox !== 'function') {
		parent[constr].prototype = new parent();
	}
	
	return new parent[constr]();
};

sk.vivamusica.utils.BoxController.BoxNormal = function() {
	var self = this;
	
	this.showBox = function() {
		self.box.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'top'     : self.main.height() * .5 - self.box.height() * .5 - 50,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - self.box.width() * .5 + self.leftMargin,
			'z-index' : 999
		}).animate({
			'left' : '-=' + self.leftMargin,
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
		
		self.actual = self.box;
	
		// Init scroll pane plugin
		self.actual.find('.scroll-pane').jScrollPane({
			verticalDragMinHeight: 45,
			verticalDragMaxHeight: 45
		});
	}
};

sk.vivamusica.utils.BoxController.BoxHalloffame = function() {
	var self = this;
	
	this.showBox = function() {
		self.box.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'top'     : (self.main.height() - $('#dock').height()) * .5 - self.box.height() * .5,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - self.box.width() * .5 + self.leftMargin,
			'z-index' : 999
		}).animate({
			'left' : '-=' + self.leftMargin,
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
		
		self.actual = self.box;
	
		// Init scroll pane plugin
		self.actual.find('.scroll-pane').jScrollPane({
			verticalDragMinHeight: 45,
			verticalDragMaxHeight: 45
		});
	}
};

sk.vivamusica.utils.BoxController.BoxProgram = function() {
	this.showBox = function() {
		// Add and stylize overlay
		var self          = this,
				$closeoverlay = sk.vivamusica.Vivamusica.addOverlay('program'),
				$clone        = self.box.clone(),
				id            = Number($clone.attr('id').match(/\d+/)),
				nextId        = previousId = 0,
				len           = $('.thumbBox').length;
				
				$clone.addClass('clone').attr('id', 'clone');

		// Add arrows
		/*if (id == 1) {
			nextId = 2;
			$clone.append('<a class="arrow right" href="' + $('.thumbBox' + nextId).attr('href') + '"></a>');
		} else if (id == len) {
			previousId = len - 1;
			$clone.append('<a class="arrow left" href="' + $('.thumbBox' + previousId).attr('href') + '"></a>');
		} else {
			nextId     = id + 1;
			previousId = id - 1;
			$clone.append('<a class="arrow left" href="' + $('.thumbBox' + previousId).attr('href') + '"></a>');
			$clone.append('<a class="arrow right" href="' + $('.thumbBox' + nextId).attr('href') + '"></a>');
		}*/
			
		$('body').append($clone);			
		$clone.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'top'     : sk.vivamusica.utils.Sizes().whHeight - self.box.height() * .5,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - self.box.width() * .5 + 60,
			'z-index' : 999
		}).animate({
			'left' : '-=60',
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
		
		self.actual = $clone;
		
		// Init scroll pane plugin
		$clone.find('.scroll-pane').jScrollPane({
			verticalDragMinHeight: 45,
			verticalDragMaxHeight: 45
		});
		
		$('.vstupne').on('click', function(e) {
			e.preventDefault();
			openTicketBox();
		});
		
		FB.XFBML.parse();
	}
};

sk.vivamusica.utils.BoxController.BoxNovinka = function() {
	this.showBox = function() {
		// Add and stylize overlay
		var self          = this,
			$closeoverlay = sk.vivamusica.Vivamusica.addOverlay('novinky'),
			$clone        = self.box.clone();
			
		$('body').append($clone);			
		$clone.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'top'     : sk.vivamusica.utils.Sizes().whHeight - self.box.height() * .5,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - self.box.width() * .5 + 60,
			'z-index' : 999
		}).animate({
			'left' : '-=60',
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
		
		self.actual = $clone;
		
		// Init scroll pane plugin
		$clone.find('.scroll-pane').jScrollPane({
			verticalDragMinHeight: 45,
			verticalDragMaxHeight: 45
		});
	}
};

sk.vivamusica.utils.BoxController.BoxMedia = function() {
	this.showBox = function() {
		// Add and stylize overlay
		var self          = this,
				$closeoverlay = sk.vivamusica.Vivamusica.addOverlay('media'),
				$clone        = $('<article id="video" class="text_box program_detail"><div class="text_box_wrap"></div></article>'),
				id            = Number(self.box.attr('id').match(/\d+/)),
				nextId        = previousId = 0,
				len           = $('.thumbBox').length,
				contentDir    = 'app/data/';
		
		$.ajax({
			type     : 'GET',
			url      : contentDir + 'loadVideo.php',
			data     : 'videoid=' + id,
			dataType : 'html'
		}).done(function(html) {
			if ($(".text_box_wrap").html() != null) {
				if ($(".text_box_wrap").html().length > 0) {
					$('.text_box_wrap').empty();
				}
			}
			
			$('.text_box_wrap').append(html);
		});

		// Add arrows
		if (id == 1) {
			nextId = len - 1;
			$clone.append('<a class="arrow left" href="' + $('.mediaBox' + nextId).attr('href') + '"></a>');
		} else if (id == len) {
			previousId = 2;
			$clone.append('<a class="arrow right" href="' + $('.mediaBox' + previousId).attr('href') + '"></a>');
		} else {
			nextId     = len - id;
			previousId = nextId + 2;
			$clone.append('<a class="arrow right" href="' + $('.mediaBox' + previousId).attr('href') + '"></a>');
			$clone.append('<a class="arrow left" href="' + $('.mediaBox' + nextId).attr('href') + '"></a>');
		}
			
		$('body').append($clone);			
		$clone.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
		  	'top'     : sk.vivamusica.utils.Sizes().whHeight - $clone.height() * .5,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - $clone.width() * .5 + 60,
			'z-index' : 999
		}).animate({
			'left' : '-=60',
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
			
		self.actual = $clone;
		
		FB.XFBML.parse();
	}
};

sk.vivamusica.utils.Sizes = function() {
	var $window = $(window);
	
	return {
		wWidth   : $window.width(),
		wHeight  : $window.height(),
		whWidth  : $window.width() * .5,
		whHeight : $window.height() * .5
	}
};

sk.vivamusica.controllers.Controller = function() {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// DOM SELECTIONS
	//==================================================
	//==================================================
	// CONSTANTS
	//==================================================
	titles 			 = {
		main             : 'Vivamusica! festival 2013',
		program          : 'Program',
		festival         : 'Festival',
		historia         : 'História',
		vstupenky        : 'Vstupenky',
		galeria          : 'Galéria',
		sienslavy        : 'Sieň slávy',
		media            : 'Media',
		novinky          : 'Novinky',
		team             : 'Team',
		tricka           : 'Tricka',
		partneri         : 'Partneri',
		kontakt          : 'Kontakt' 
	},
	titlesen 		 = {
		main             : 'Vivamusica! festival 2013',
		program          : 'Program',
		festival         : 'Festival',
		festivalhistory  : 'Festival - History',
		tickets          : 'Tickets',
		gallery          : 'Gallery',
		halloffame       : 'Hall of fame',
		media            : 'Media',
		news             : 'News',
		team             : 'Team',
		partners         : 'Partners',
		contact          : 'Contact' 
	},
	contentDir   = 'app/data/',
	//==================================================
	// INSTANCE VARS
	//==================================================
	page         = null,
	subpage      = null,
	actualPage   = null,
	obj          = null,
	preloader    = null,
	//==================================================
	// CALLBACKS
	//==================================================
	callbacks 	 = {
		
	};
	
	function initialize() {
		SWFAddress.addEventListener(SWFAddressEvent.CHANGE, handleChange); 	
		SWFAddress.dispatchEvent(SWFAddressEvent.CHANGE);
	}
	
	function handleChange(event) {
		page    = event.pathNames[0] ? event.pathNames[0] : 'program',
		subpage = event.pathNames[1] ? event.pathNames[1] : '';
				
		if ((!actualPage) || (actualPage != page)) {
			if ((actualPage == 'galeria') || (actualPage == 'gallery')) {
				obj.clearStage();
			}
			updateContent(page);
		} else {
			obj.update(subpage);
		}
		
		// Banner on/off control
		/*if ((page == 'galeria') || (page == 'gallery')) {
			sk.vivamusica.utils.Banner().hideBanner();
		} else {
			sk.vivamusica.utils.Banner().showBanner();
		}*/
		
		updateTitle();
	}
		
	function updateContent(url) {
		$.ajax({
			type     : 'GET',
			url      : contentDir + 'load.php',
			data     : 'page=' + url,
			dataType : 'html'
		}).done(function(html) {
			if ($(".main").html().length > 0) {
				$('.main').empty();
		 	}
			
			$('.main').append(html);
			$('.main').attr('id', url);
		
			if (sk.vivamusica.Vivamusica.getLanguage() == 'sk') {
				switch(url) {
					case 'sien-slavy' : {
						obj = new sk.vivamusica.sections.Sienslavy(subpage);
					} break;
					case 'media' : {
						obj = new sk.vivamusica.sections.Media(subpage);
					} break;
					case 'team' : {
						obj = new sk.vivamusica.sections.Team(subpage);
					} break;
					case 'novinky' : {
						obj = new sk.vivamusica.sections.Novinky(subpage);
					} break;
					case 'partneri' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'kontakt' : {
						obj = new sk.vivamusica.sections.Kontakt(subpage);
					} break;
					case 'vstupenky' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'skolka' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'festival' : {
						obj = new sk.vivamusica.sections.Festival(subpage);
					} break;
					case 'galeria' : {
						obj = new sk.vivamusica.sections.Galeria(subpage);
					} break;
					case 'tricka' : {
						obj = new sk.vivamusica.sections.Tricka();
					} break;
					default : {
						obj = new sk.vivamusica.sections.Program(subpage);
					} break;
				}
			} else {
				switch(url) {
					case 'hall-of-fame' : {
						obj = new sk.vivamusica.sections.Sienslavy(subpage);
					} break;
					case 'media' : {
						obj = new sk.vivamusica.sections.Media(subpage);
					} break;
					case 'team' : {
						obj = new sk.vivamusica.sections.Team(subpage);
					} break;
					case 'partners' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'contact' : {
						obj = new sk.vivamusica.sections.Kontakt(subpage);
						$('.main').attr('id', 'kontakt');
					} break;
					case 'tickets' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'festival' : {
						obj = new sk.vivamusica.sections.Festival(subpage);
					} break;
					case 'gallery' : {
						obj = new sk.vivamusica.sections.Galeria(subpage);
					} break;
					default : {
						obj = new sk.vivamusica.sections.Program(subpage);
					} break;
				}
			}
			
			if ((url != 'gallery') && (url != 'galeria')) {		
				initLoader();
			} else {
				obj.initialize();
			}			
		});	
	}
	
	function initLoader() {
		preloader = new this.MainLoaderFull({
			autoload : true,
			obj      : $('.main')
		});
		
		preloader.setLoaderPosition.call(this);
		
		preloader.addProgressListener(function(e) {
			//console.log('Total: ' + e.total + ' To load: ' + e.toload);																			 
		});
				
		preloader.addCompleteListener(function() {
			$('#preloader').stop().fadeOut('slow', function() {
				$('#preloader').remove();
			});

			obj.initialize();
		});
			
		preloader.init();
	};
	
	function updateTitle() {
		var tit      = (sk.vivamusica.Vivamusica.getLanguage() == 'sk') ? titles : titlesen,
				newpage  = page.split('-').join(''),
				topTitle = (subpage) ? subpage : '',
				subtitle = ((newpage == 'kontakt') || (newpage == 'program') || (newpage == 'media') || ((newpage == 'sienslavy') || (newpage == 'halloffame'))) ? '' : subpage;
		
		if ((newpage == 'galeria') || (newpage == 'gallery')) {
			var title = (subtitle) ? tit[newpage] + ' - ' + subtitle : tit[newpage] + '- 2011';
			$('#header h2').html(tit[page].toLowerCase() + ((subtitle) ? ' - ' + subtitle : ' - 2011').toLowerCase());
		} else {
			var title = (subtitle) ? tit[newpage] + ' - ' + tit[subtitle] : tit[newpage];
			$('#header h2').html(tit[newpage].toLowerCase() + ((subtitle) ? ' - ' + tit[subtitle] : '').toLowerCase());
		}
		
		// for 2nd level deep linking
		if (topTitle) {
			
		}		
		
	 	SWFAddress.setTitle(tit['main'] + ' - ' + title);
		
		actualPage = page;
	}
			
	api.initialize = initialize;
	api.actualObj  = function() {
		return obj;
	};
	
	return api;
}

/*
* Library for Image loading
*/
function MainLoaderFull(oSettings) {
	// total number of items to load
	var items       = [],
			listeners   = [];
			totaltoload = 0,
			settings    = oSettings || {};
		
	// add item to item array
	this.addItem = function(oItem) {
		items.push(oItem);
		
		// increment total number of items
		totaltoload++;
	};
	
	// initialize preloading
	this.init = function() {
		var itemslen = items.length;
				
		// go throught all items and start loading
		while(itemslen--) {
			items[itemslen].startPreload();
		}
	};
	
	this.autoLoadImages = function() {
		var url  = '',
				self = this;
		
		// if no type is set then load everything
		if (!settings.type) {
			settings.obj.find("*:not(script)").each(function() {
				var tag = $(this).prop('tagName').toLowerCase();
																										
				// check if item is img tag or has css background
				if (tag === "img" && $(this).attr('src')) {
					self.addImage($(this).attr('src'));
				} else if ($(this).css('background-image') != 'none') {
					url = self.extractUrl($(this).css('background-image'));
					self.addImage(url);
				}
			});
		}
	}
		
	this.extractUrl = function(url){
	 return url.replace(/"/g,"").replace(/url\(|\)$/ig, "");
	}
		
	this.setLoaderPosition = function() {
		$('.vivamusicaPage').prepend('<div id="preloader"></div>');
		
		var $preloader = $('#preloader');
				$preloader.css({
					'top'     : sk.vivamusica.utils.Sizes().whHeight - $preloader.height(),
					'left'    : sk.vivamusica.utils.Sizes().whWidth  - $preloader.width(),
					'display' : 'none'
				}).stop().fadeIn('slow');
	}
	
	// after first set up call function will self rewrite, so another call will execute callback function
	this.addProgressListener = function(callback) {
		this.addProgressListener = function(args) {
			callback(args);
		}
		
		listeners.push(this.addProgressListener);
	};
	
	this.addCompleteListener = function(callback) {		
		this.addCompleteListener = function(args) {
			if (args.toload === 0) {
				callback();
			}
		};
		
		listeners.push(this.addCompleteListener);
	};
	
	// item is loaded
	this.loaded = function(oItem) {
		totaltoload--;
				
		var oData = {
					toload: totaltoload,
					total : items.length
				},
				len = listeners.length;
	
		// call all listeners
		for (var i = 0; i < len; i++) {
			listeners[i](oData);
		}
	};	
	
	this.getItems = function() {
		return items;
	};
	
	// check if autoload is true
	if (settings.autoload)
		this.autoLoadImages();
};

MainLoaderFull.prototype.addImage = function(sUrl, sId) {
	var img = new ImageLoader(sUrl, this);
	// if img tag id is provided then add it to img object
	if (sId)
		img.id = sId;
	
	this.addItem(img);
	
	return img.img;
};


/*
* Object for new image
*/
function ImageLoader(sUrl, oMainLoader) {
	var self   = this,
			mainLoader = oMainLoader;
	
	this.img = new Image();
	this.id  = '';
	
	this.startPreload = function() {
		//self.img.addEventListener('load', onLoad);
		
		self.img.onload = onLoad;
		self.img.src = sUrl;
	};
	
	var onLoad = function() {
		removeEvents();
		mainLoader.loaded(self);
	};
	
	var removeEvents = function() {
		//self.img.removeEventListener('load', onLoad);
	};
};

/*
* Library for Image loading
*/
function MainLoaderLite() {
	// total number of items to load
	var items = [];
	
	// array of listeners (progress and complete listeners in this version)
	var listeners = [];
	
	// total number of items
	var totaltoload = 0;
	
	// add item to item array
	this.addItem = function(oItem) {
		items.push(oItem);
		
		// increment total number of items
		totaltoload++;
	};
	
	// initialize preloading
	this.init = function() {
		var itemslen = items.length;
				
		// go throught all items and start loading
		while(itemslen--) {
			items[itemslen].startPreload();
		}
	};
	
	// after first set up call function will self rewrite, so another call will execute callback function
	this.addProgressListener = function(callback) {
		this.addProgressListener = function(args) {
			callback(args);
		}
		
		listeners.push(this.addProgressListener);
	};
	
	this.addCompleteListener = function(callback) {		
		this.addCompleteListener = function(args) {
			(function(e) {
				if (e.toload === 0) {
					callback();
				}
			})(args);
		};
		
		listeners.push(this.addCompleteListener);
	};
	
	// item is loaded
	this.loaded = function(oItem) {
		totaltoload--;
				
		var oData = {
					toload: totaltoload,
					total : items.length
				},
				len = listeners.length;
	
		// call all listeners
		for (var i = 0; i < len; i++) {
			listeners[i](oData);
		}
	};	
	
	this.getItems = function() {
		return items;
	};
};

MainLoaderLite.prototype.addImage = function(sUrl, sId) {
	var img = new ImageLoader(sUrl, this);
	// if img tag id is provided then add it to img object
	if (sId)
		img.id = sId;
	
	this.addItem(img);
	
	return img.img;
};


/*
* Object for new image
*/
function ImageLoader(sUrl, oMainLoader) {
	var self   = this,
			mainLoader = oMainLoader;
	
	this.img = new Image();
	this.id  = '';
	
	this.startPreload = function() {
		//self.img.addEventListener('load', onLoad);
		
		self.img.onload = onLoad;
		self.img.src = sUrl;
	};
	
	var onLoad = function() {
		removeEvents();
		mainLoader.loaded(self);
	};
	
	var removeEvents = function() {
		//self.img.removeEventListener('load', onLoad);
	};
};

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);