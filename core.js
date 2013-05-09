$jquery_1_9_1 = $.noConflict(true);

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a){jQuery.browser.mobile=/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

var cb = {
  modules: {}
}

/**
* @class            Modules
* @description      > A generic modules container for each module which is added to the page.
*                   > makes it easy to extract and replace certain modules
******************************************************************************/
cb.modules.init = (function () {
    $(function () {
      cb.modules.bannerSlider.init();
      cb.modules.mediaGallery.init();
      cb.modules.mediaGalleryLite.init();
      cb.modules.jsFilterSort.init();
      cb.modules.preloaderSprite.init();
      cb.modules.carouselModule.init();
      cb.modules.globalWishlist.init();
    });
})();

/**
* @class            bannerSlider
* @descripion       > this module inits and handles the jsBannerSlider
***********************************************************************/
cb.modules.bannerSlider = (function ($) {
    var self = {};

    // Public vars
    self.mainHolder   = $(".jsBannerSlider");
    self.animSpeed    = 800;
    self.animating    = false;

    // Public methods
    self.methods = {
        init: function () {
          if (self.mainHolder.length == 0) {
            return;  
          }

          // Start functionality for each modul
          self.mainHolder.each(function() {
            // Private vars
            var $list         = $(this).find(".slideshow-holder li"),
                $pagingHolder = $(this).find(".paging-holder"),
                $inner        = $(this).find(".slideshow-holder ul"),
                arrows        = $(this).find(".previous-small, .next-small"),
                slides        = ($(this).hasClass("fullw")) ? 3 : 2,
                pages         = Math.ceil($list.length / slides),
                item          = null,
                holderW       = $(this).find(".slideshow-holder").width() + parseInt($($list[0]).css("marginRight")),
                actualSlide   = 0,
                _this         = $(this),
                $listPaging   = null;

                // Generate pagination
                for (var i = 0,len = pages; i < len; i++) {
                  $item = $('<li><a href=""></a><li>');
                  (i == 0) ? $item.find("a").addClass("active") : null;
                  $pagingHolder.append($item);
                }

                // Start Left & Right arrow events
                arrows.on('click', function(e) {
                  e.preventDefault();

                  if (!self.animating) {
                    var _self = $(this);

                    if (_self.hasClass("previous-small")) {
                      actualSlide = (actualSlide == 0) ? pages - 1 : --actualSlide;
                    } else {
                      actualSlide = (actualSlide == pages - 1) ? 0 : ++actualSlide;
                    }

                    // Slide banners to new page
                    slide();
                  }
                });

                // Start pagination bullet events
                $listPaging = $pagingHolder.find('a');

                $listPaging.on('click', function(e) {
                  e.preventDefault();

                  if (!self.animating) {
                    var _self = $(this),
                        num   = $listPaging.index(_self);

                        // Set new actual page
                        actualSlide = num;

                        slide();
                  }
                });

                // Private functions
                function slide() {
                  var extra = 0;

                  self.animating = true;

                  if (actualSlide == pages - 1) {
                    var total_expected = pages * slides,
                        total_actual   = $list.length,
                        under          = total_expected - total_actual,
                        per_block      = Math.ceil(holderW / slides);

                        extra = (under * per_block);
                  }

                  $inner.stop(true,true).animate({
                    'marginLeft' : (-holderW * actualSlide) + extra
                  }, self.animSpeed, function() {
                    self.animating = false;
                  });

                  // Set new active bullet
                  setBullet();
                }

                function setBullet() {
                  // Deactivate active bullet
                  $pagingHolder.find('.active').removeClass('active');

                  // Set actual bullet to active
                  $listPaging.eq(actualSlide).addClass("active");
                }
          });            
        }
        
    };

    return {
        init: function () {
            return self.methods.init()
        }
    };
})($jquery_1_9_1);

/**
* @class            mediaGallery
* @descripion       > this module inits and handles the jsMediaGallery
*                   > if self.mainHolder don't have on of the subclasses listed in
*                   > self.modules all 3 modules are activated
*
*                   > if one module is selected toogle panel is not active - user can't switch between modules
***********************************************************************/
cb.modules.mediaGallery = (function ($) {
    var self = {};

    // Public vars
    self.mainHolder = $(".jsMediaGallery");
    self.modules    = new Array("ImageGallery","VideoGallery","360Gallery");
    self.actModule  = null;
    self.buttonHide = self.mainHolder.find('.hide');
    self.buttonPrev = self.mainHolder.find('.gmprevious');
    self.buttonNext = self.mainHolder.find('.gmnext');
    self.buttonDown = self.mainHolder.find('.download');
    self.buttonTogg = self.mainHolder.find('.toggle-panel');
    self.buttonNavp = self.mainHolder.find('.nav-panel');
    self.buttonNavN = self.buttonNavp.find('.next-small');
    self.buttonNavR = self.buttonNavp.find('.previous-small');
    self.buttonVide = self.buttonTogg.find('.video');
    self.buttonr360 = self.buttonTogg.find('.rot360');
    self.buttonGall = self.buttonTogg.find('.image');

    self.timerTime  = 3000;
    self.panelsActive = true;
    self.animTime   = 350;
    self.timeout    = null;
    self.lastimg    = self.newimage = 0;
    self.cache      = new Array();
    self.firstload  = true;
    self.navArrows  = false;
    self.moduleType = true;
    self.animating  = false;
    self.busy       = false;
    self.switching  = false;
    self.page       = 1;
    self.maxPages   = 2;
    
    // Public methods
    self.methods = {
        init: function () {
          if (self.mainHolder.length == 0) {
            return;  
          }

          var thumbW     = self.buttonNavp.find('img:eq(0)').width() + parseInt(self.buttonNavp.find('li').css('margin-right')),
              imgsW      = self.buttonNavp.find('img').length * thumbW,
              holderW    = self.mainHolder.find('.thumbs-holder').width();

          // Check gallery module type
          for (var i in self.modules) {
            if (self.mainHolder.hasClass(self.modules[i])) {
              self.actModule = self.modules[i];
            }
          }

          // Set thumbs nav arrows
          self.methods.thumbsPanelArrows();

          // If no module is selected start Gallery as default
          if (!self.actModule) {
            self.buttonGall.addClass('active');
            self.actModule = self.mainHolder.find('.wrap.ImageGallery');
            self.actModule.show();
            self.actModule.addClass('active');
          } else {
            self.buttonTogg.hide();
            self.mainHolder.find('.wrap.' + self.actModule).fadeIn(function() {
              $(this).addClass('active');
            });
          }

          // If more thumbs set thumbs panel arrows to true
          self.navArrows = (imgsW > holderW) ? true : false;

          // Activate thumbs panel arrows if more images
          if (self.navArrows) {
            self.buttonNavN.addClass('active');
            self.buttonNavR.addClass('active');
          }

          self.buttonDown.hide();

          // Start all events
          self.methods.startEvents();

          // Hide panels after 5 sec
          self.timeout = setTimeout(self.methods.hidePanels,self.timerTime);
        },
        hidePanels: function() {
          // First check if panels are hidden
          if (parseInt(self.buttonNavp.css('bottom')) == 0) {
            // Hide close button
            self.buttonHide.stop().animate({
              'right' : -self.buttonHide.width()
            }, self.animTime);

            // Hide left arrow button
            self.buttonPrev.stop().animate({
              'left' : -self.buttonPrev.width()
            }, self.animTime);

            // Hide right arrow button
            self.buttonNext.stop().animate({
              'right' : -self.buttonNext.width()
            }, self.animTime);

            // Hide download button
            self.buttonDown.stop().animate({
              'right' : -self.buttonDown.width()
            }, self.animTime);

            // Hide toggle bar
            self.buttonTogg.stop().animate({
              'bottom' : 0
            }, self.animTime);

            // Hide thumbs
            self.buttonNavp.stop().animate({
              'bottom' : -self.buttonNavp.height()
            }, self.animTime);

            // Hide videopanel
            $('.videopanel').animate({
              'bottom' : -self.buttonNavp.height()
            }, self.animTime);

            $('.nav-panel-videopanel').animate({
              'bottom' : -self.buttonNavp.height()
            }, self.animTime);
          }
        },
        showPanels: function() {
          // First check if panels are hidden
          if (parseInt(self.buttonNavp.css('bottom')) < 0) {
            // Hide close button
            self.buttonHide.stop().animate({
              'right' : 0
            }, self.animTime);

            // Hide left arrow button
            self.buttonPrev.stop().animate({
              'left' :0
            }, self.animTime);

            // Hide right arrow button
            self.buttonNext.stop().animate({
              'right' : 0
            }, self.animTime);

            // Hide download button
            self.buttonDown.stop().animate({
              'right' : 0
            }, self.animTime);

            // Hide toggle bar
            self.buttonTogg.stop().animate({
              'bottom' : 60
            }, self.animTime);

            // Hide thumbs
            self.buttonNavp.stop().animate({
              'bottom' : 0
            }, self.animTime);

            // Hide videopanel
            $('.videopanel').animate({
              'bottom' : 0
            }, self.animTime);

            $('.nav-panel-videopanel').animate({
              'bottom' : 0
            }, self.animTime);
          }
        },
        // All events needed for media gallery module
        startEvents: function() {
          // Start mouseenter event
          self.mainHolder.on('click mouseenter', function() {
            clearTimeout(self.timeout);
            self.methods.showPanels();
          });

          $(window).scroll(function() {
              clearTimeout(self.timeout);
              self.methods.showPanels();
              self.timeout = setTimeout(self.methods.hidePanels,self.timerTime * 2);
          });

          // If user leaves media gallery set timer to 10 seconds
          self.mainHolder.on('mouseleave', function() {
            self.timeout = setTimeout(self.methods.hidePanels,self.timerTime * 2);
          });

          // Events for thumbnail gallery
          if (self.buttonNavp.find('.thumbs-overlay').length > 0) {
            if (jQuery.browser.mobile) {
              self.buttonNavp.find('.thumbs-holder a').on({
                click: function(e) {
                  e.preventDefault();
                  var _this = $(this);
                  if (!_this.hasClass('active')) {
                    if (!self.animating) self.methods.thumbsController(_this);
                  }
                }
              });
            } else {
              self.buttonNavp.find('.thumbs-holder a').on({
                mouseenter: function() {
                  var _this  = $(this);

                      self.methods.thumbFadeIn(_this,true);
                },
                mouseleave: function() {
                  var _this  = $(this);

                      if (!_this.hasClass('active')) {
                        self.methods.thumbFadeOut(_this);
                      }
                },
                click: function(e) {
                  e.preventDefault();
                  var _this = $(this);
                  if (!_this.hasClass('active')) {
                    if (!self.animating) self.methods.thumbsController(_this);
                  }
                }
              });
            }
          }

          // Arrows events
          self.buttonPrev.on('click', function(e) {
            e.preventDefault();

            var actualThumb = self.buttonNavp.find('a:eq(' + (self.lastimg) + ')'); 
                if (!self.animating) self.methods.thumbsController(actualThumb);
          });

          self.buttonNext.on('click', function(e) {
            e.preventDefault();
            
            var actualThumb = self.buttonNavp.find('a:eq(' + (self.lastimg + 2) + ')'); 
                if (!self.animating) self.methods.thumbsController(actualThumb);
          });

          // Thumbs panel events only if we have more than 11
          self.buttonNavN.on('click', function(e) {
            e.preventDefault();
            if (self.navArrows) self.methods.thumbGallery('next');
          });

          self.buttonNavR.on('click', function(e) {
            e.preventDefault();
            if (self.navArrows) self.methods.thumbGallery('previous');
          });

          // Hide button
          self.buttonHide.on('click', function(e) {
            e.preventDefault();
            $(this).addClass('active');
            self.methods.defaultGalleryState();
          });

          // Toggle panel buttons
          self.buttonVide.on('click', function(e) {
            e.preventDefault();
            if (!self.switching) self.methods.switchTo(self.modules[1], $(this));
          });

          self.buttonr360.on('click', function(e) {
            e.preventDefault();
            if (!self.switching) self.methods.switchTo(self.modules[2], $(this));
          });

          self.buttonGall.on('click', function(e) {
            e.preventDefault();
            if (!self.switching) self.methods.switchTo(self.modules[0], $(this));
          });
        },
        // Reset gallery
        defaultGalleryState: function() {
          var $actual    = $('.wrap.ImageGallery').find('li a.active'),
              $imgholder = $('.wrap.ImageGallery').find('.content-holder');

          $imgholder.find('img').fadeOut(function() {
            $imgholder.empty();
          });

          self.lastimg = self.newimage = 0;
          self.methods.thumbFadeOut($actual);
          $actual.removeClass('active');
          $('.wrap.ImageGallery').find('.thumbs-holder ul').animate({'margin-left' : 0});
          self.buttonHide.delay(100).fadeOut(function() {
            $(this).removeClass('active');
          });
          self.buttonNext.delay(100).fadeOut();
          self.buttonPrev.delay(100).fadeOut();
          self.firstload = true;
        },
        // Load image
        loadImage: function(src) {
          var img     = new Image(),
              $loader = $('.jsPreloader'),
              num     = $.inArray(src, self.cache);
              
              self.animating = true;

              // If image wasn't loaded yet, load image
              if (num == -1) {
                $loader.css({'position': 'absolute', 'top': (self.mainHolder.height() * .5) - 42, 'left': (self.mainHolder.width() * .5), 'z-index':'30000'});
                $loader.fadeIn();

                $(img).load(function() {
                  self.methods.onLoadImage($(this),$loader);
                  self.cache.push(src);
                }).attr('src', src);

              // If image was already loaded and is in the cache
              } else {
                self.methods.onLoadImage($('<img src="' + self.cache[num] + '" />'), $loader);
              }
        },
        // Taking care of showing image after image is loaded
        onLoadImage: function(obj,loader) {
          if (self.firstload) {
              obj.hide();
              obj.css({
                'position' : 'absolute',
                'bottom'   : -588,
                'left'     : 0
              }).show();
              self.actModule.find('.content-holder').prepend(obj);
              obj.animate({
                'bottom' : 0
              }, self.animTime * 2, function() {
                self.animating = false;
              });

              loader.fadeOut();

              self.lastimg = self.newimage;

              // Show Hide button
              self.buttonHide.fadeIn();

              self.buttonDown.attr('href', obj.attr('src'));
              self.buttonDown.fadeIn();

              self.firstload = false;

          } else {
              var actual = self.actModule.find('.content-holder img'),
                  offset = (self.lastimg > self.newimage) ? -954 : 954;

                  actual.css({'z-index' : 1});

                  obj.css({
                    'position' : 'absolute',
                    'bottom'   : 0,
                    'left'     : offset,
                    'z-index'  : 2
                  });
                  self.actModule.find('.content-holder').prepend(obj);
                  obj.animate({
                    'left' : 0
                  }, self.animTime * 2, function() {
                    actual.remove();
                    self.animating = false;
                  });

                  self.buttonDown.attr('href', obj.attr('src'));
                  
                  if (loader) {
                    loader.fadeOut(function() {
                      loader.remove();
                    });
                  }

                  self.lastimg = self.newimage;
          }
        },
        // Method for controlling thumbnails panel
        thumbsController: function(obj) {
          var $thumbs = self.buttonNavp.find('li a');

              $thumbs.each(function(i) {
                var $thumb = $(this);

                if ($thumb.hasClass('active')) { 
                  $thumb.removeClass('active'); 
                  self.methods.thumbFadeOut($thumb);

                  return false; 
                }
              });

              obj.addClass('active');
              self.methods.thumbFadeIn(obj);
              self.newimage = $thumbs.index(obj);

              if (self.actModule.hasClass('ImageGallery')) {
                // Load image
                self.methods.loadImage(obj.attr('href'));

                // Call arrows controller
                self.methods.arrowsController();
              }

              if (self.actModule.hasClass('VideoGallery')) {
                //TODO call some action to load new video
              }

              // Call thumbs gallery controller
              self.methods.thumbGallery();
        },
        thumbGallery: function(type) {
          if(self.busy && typeof type !== "undefined"){
            return;
          }
          self.busy = true;

          self.buttonNavp = self.actModule.find('.nav-panel');

          var imgW         = self.buttonNavp.find('li:eq(0)').width() + 2,
              $holder      = self.actModule.find('.thumbs-holder'),
              $holderul    = $holder.find('ul'),
              isLast       = (self.newimage == $holderul.find('img').length) ? true : false,
              isFirst      = ((self.newimage + 1) == 0) ? true : false,
              thumbW       = (self.newimage + 1) * imgW,
              currPosition = parseInt($holderul.css('marginLeft')),
              y            = thumbW + currPosition,
              holderW      = $holder.width(),
              numShownThumbs = Math.floor($holder.width() / imgW) - 1,
              leftOvers      = $holder.find("li").length % numShownThumbs;

              if (self.actModule.hasClass('VideoGallery')) {
                numShownThumbs = 1;
                leftOvers      = imgW % numShownThumbs;
              }

              self.maxPages  = Math.ceil($holder.find("li").length / numShownThumbs);

              var movement = null;
            
              // if request came from thumb panel arrow
              if(type == "next"){
                var max = ((self.buttonNavp.find('a').length - 2) * imgW)*-1;
                    max += imgW * Math.ceil(holderW / imgW);

                if(currPosition < max) {
                  self.busy = false;
                  return;
                }
                self.page++;

                movement = (imgW * numShownThumbs);
                if(self.page == self.maxPages){
                  movement = (imgW * leftOvers);
                }

                $holderul.animate({'margin-left' : '-=' + movement + 'px'}, function() {self.busy = false;});
              }
              else if(type == "previous"){
                if(currPosition == 0){
                  self.busy = false;
                  return;
                }
                movement = (imgW * numShownThumbs);
                if(self.page == self.maxPages){
                  movement = (imgW * leftOvers);
                }

                self.page--;
                $holderul.animate({'margin-left' : '+=' + movement + 'px'}, function() {self.busy = false;});
              } else {
                if ((y > holderW) && (!isLast)) {
                  self.page++;
                  movement = (imgW * numShownThumbs);
                  if(self.page == self.maxPages){
                    movement = (imgW * leftOvers);
                  }
                  $holderul.animate({'margin-left' : '-=' + movement + 'px'}, function() {self.busy = false;});
                } else if ((y <= 0) && (!isFirst)) {
                  movement = (imgW * numShownThumbs);
                  if(self.page == self.maxPages){
                    movement = (imgW * leftOvers);
                  }
                  self.page--;
                  $holderul.animate({'margin-left' : '+=' + movement + 'px'}, function() {self.busy = false;});
                } else {
                  self.busy = false;
                }
              }

            self.methods.thumbsPanelArrows();
        },
        thumbsPanelArrows : function() {
          if (self.page > 1) {
            self.buttonNavR.animate({"opacity":1}, function(){$(this).css({'cursor' : 'pointer'});});
          } else {
            self.buttonNavR.animate({"opacity":0}, function(){$(this).css({'cursor' : 'default'});});
          }
          if (self.page < self.maxPages) {
            self.buttonNavN.animate({"opacity":1}, function(){$(this).css({'cursor' : 'pointer'});});
          } else {
            self.buttonNavN.animate({"opacity":0}, function(){$(this).css({'cursor' : 'default'});});
          }
        },
        thumbFadeIn: function(obj,type) {
          obj.find('.thumbs-overlay').stop(true, true).fadeIn();
          if (!type) obj.find('.thumbs-border').stop(true, true).animate({'bottom' : 0}, self.animTime);
        },
        thumbFadeOut: function(obj) {
          obj.find('.thumbs-overlay').stop(true, true).fadeOut();
          obj.find('.thumbs-border').stop(true, true).animate({'bottom' : -3}, self.animTime);
        },
        // Controlling showing and hiding of left & right arrow
        arrowsController: function() {
          (self.newimage < self.buttonNavp.find('img').length - 1) ? self.buttonNext.fadeIn() : self.buttonNext.fadeOut();
          (self.newimage > 0) ? self.buttonPrev.fadeIn() : self.buttonPrev.fadeOut();
        },
        /*
         * This method is taking care of switching between the modules
         * - all modules are on the page at all time
         * - old module is fadeing out and new module is fading in with active class
         */
        switchTo: function(obj,par) {
          self.switching = true;

          self.buttonTogg.find('.active').removeClass('active');
          par.addClass('active');

          self.mainHolder.find('.wrap.active').fadeOut(function() {
            $(this).removeClass('active');
            self.mainHolder.find('.wrap.' + obj).fadeIn();
            self.mainHolder.find('.wrap.' + obj).addClass('active');
            self.actModule = self.mainHolder.find('.wrap.' + obj);
            self.switching = false;
          });

          self.methods.defaultGalleryState();
        }
    };

    return {
        init: function () {
            return self.methods.init()
        }
    };
})($jquery_1_9_1);

/**
* @class            mediaGalleryLite
* @descripion       > this module inits and handles the jsMediaGalleryLite
***********************************************************************/
cb.modules.mediaGalleryLite = (function ($) {
    var self = {};

    // Public vars
    self.mainHolder = $(".jsMediaGalleryLite");
    self.buttonPrev = self.mainHolder.find('.gmprevious');
    self.buttonNext = self.mainHolder.find('.gmnext');
    self.buttonNavp = self.mainHolder.find('.nav-panel');
    self.buttonNavN = self.buttonNavp.find('.next-small');
    self.buttonNavR = self.buttonNavp.find('.previous-small');

    self.timerTime  = 3000;
    self.panelsActive = true;
    self.animTime   = 500;
    self.timeout    = null;
    self.lastimg    = self.newimage = 0;
    self.cache      = new Array();
    self.navArrows  = false;
    self.animating  = false;
    self.busy       = false;
    self.actual_image_width  = 0;
    self.actual_image_height = 0;
    self.holder     = self.mainHolder.find(".content-holder");
    self.interval   = null;
    self.page       = 1;
    self.maxPages   = 2;

    // Public methods
    self.methods = {
        init: function () {
          if (self.mainHolder.length == 0) {
            return;  
          }

          // if JS working remove html image
          var thumbW     = self.buttonNavp.find('img:eq(0)').width() + parseInt(self.buttonNavp.find('li').css('margin-right')),
              imgsW      = self.buttonNavp.find('img').length * thumbW,
              holderW    = self.mainHolder.find('.thumbs-holder').width(),
              contHolder = self.mainHolder.find('.content-holder');

          if (contHolder.find('img').length > 0) contHolder.empty();

          // If more thumbs set thumbs panel arrows to true
          self.navArrows = (imgsW > holderW) ? true : false;

          // Activate thumbs panel arrows if more images
          if (self.navArrows) {
            self.buttonNavN.addClass('active');
            self.buttonNavR.addClass('active');
          }

          // Start all events
          self.methods.startEvents();

          // Load first image
          self.buttonNavp.find('.thumbs-holder a:eq(0)').trigger('click');
        },
        // All events needed for media gallery module
        startEvents: function() {
          // Events for thumbnail gallery
          if (self.buttonNavp.find('.thumbs-overlay').length > 0) {
            self.buttonNavp.find('.thumbs-holder a').on({
              mouseenter: function() {
                var _this  = $(this);

                    self.methods.thumbFadeIn(_this,true);
              },
              mouseleave: function() {
                var _this  = $(this);

                    if (!_this.hasClass('active')) {
                      self.methods.thumbFadeOut(_this);
                    }
              },
              click: function(e) {
                e.preventDefault();
                var _this = $(this);

                self.methods.thumbsController(_this);
              }
            });
          }

          // Arrows events
          self.buttonPrev.on('click', function(e) {
            e.preventDefault();
            var actualThumb = self.buttonNavp.find('a:eq(' + (self.lastimg) + ')'); 
                if (!self.animating) self.methods.thumbsController(actualThumb);
          });

          self.buttonNext.on('click', function(e) {
            e.preventDefault();
            
            var actualThumb = self.buttonNavp.find('a:eq(' + (self.lastimg + 2) + ')'); 
                if (!self.animating) self.methods.thumbsController(actualThumb);
          });

          self.buttonNavN.on('click', function(e) {
            e.preventDefault();

            if (self.navArrows) self.methods.thumbGallery('next');
          });

          self.buttonNavR.on('click', function(e) {
            e.preventDefault();

            if (self.navArrows) self.methods.thumbGallery('previous');
          });

          if(!$('#gallery-module-lite-zoom-highlight').length){
            self.holder.append($('<div id="gallery-module-lite-zoom-highlight"></div>'));
          }

          // Zoom events
          self.holder.bind("mouseenter", function(){

            if($('.accessories-info').length > 0){
              $('#gallery-module-lite-zoomed-overlay').css({'width':$('.accessories-info').width(), 'height':$('.accessories-info').height()});
            }

            var mouse_x, 
                mouse_y,
                img_x,
                img_y,
                zoom_container_width  = $('#gallery-module-lite-zoomed').width(),
                zoom_container_height = $('#gallery-module-lite-zoomed').height();


            $('#gallery-module-lite-zoomed, #gallery-module-lite-zoomed-overlay, #gallery-module-lite-zoom-highlight').stop(true, true).fadeIn();

            clearInterval(self.interval);
            self.interval = setInterval(function(){  
              if(!$('#gallery-module-lite-zoomed').hasClass("preloading") && !$('#gallery-module-lite-zoomed').is(":visible")){
                $('#gallery-module-lite-zoomed').stop(true, true).fadeIn();
              }

            }, 250);

            self.holder.bind("mousemove", function(e){

              var obj = self.holder.find("img").eq(0);
              if(obj.length == 0){
                return;
              }
              if($('#gallery-module-lite-zoomed').hasClass("preloading")){
                return;
              }

              mouse_x = e.pageX,
              mouse_y = e.pageY;
              img_x   = mouse_x - obj.offset().left;
              img_y   = mouse_y - obj.offset().top;

              var perc_x = (img_x / $(this).width()),
                  translated_x = self.actual_image_width * perc_x,
                  center_x = translated_x - (zoom_container_width / 2);
        
              var perc_y = (img_y / $(this).height()),
                  translated_y = self.actual_image_height * perc_y,
                  center_y = translated_y - (zoom_container_height / 2);

              if(center_x > 0) center_x = "-"+center_x; 
              else center_x *= -1;
              
              if(center_y > 0) center_y = "-"+center_y; 
              else center_y *= -1;

              $('#gallery-module-lite-zoomed').css("background-position", ""+center_x+"px "+center_y+"px");

              $('#gallery-module-lite-zoom-highlight').css({'top':Math.round(perc_y * 100)+'%', 'left':Math.round(perc_x * 100)+'%'});

            });
            self.holder.bind("mouseleave", function(){
              clearInterval(self.interval);
              $('#gallery-module-lite-zoomed, #gallery-module-lite-zoomed-overlay, #gallery-module-lite-zoom-highlight').fadeOut();
            });
          });

        },
        // Load image
        loadImage: function(src) {
          var img     = new Image(),
              $loader = $('.jsPreloader'),
              num     = $.inArray(src, self.cache);
              
              self.animating = true;

              // If image wasn't loaded yet, load image
              if (num == -1) {
                $loader.css({'position': 'absolute', 'top': (self.mainHolder.height() * .5) - 42, 'left': (self.mainHolder.width() * .5) - ($loader.width() * .5), 'z-index':'30000'});
                $loader.fadeIn();

                $(img).load(function() {
                  self.methods.onLoadImage($(this),$loader);
                  self.cache.push(src);
                }).attr('src', src);

              // If image was already loaded and is in the cache
              } else {
                self.methods.onLoadImage($('<img src="' + self.cache[num] + '" />'),$loader);
              }
        },
        // Taking care of showing image after image is loaded
        onLoadImage: function(obj,loader) {
          var actual = self.mainHolder.find('.content-holder img'),
              holder = self.mainHolder.find('.content-holder'),
              offset = (self.lastimg > self.newimage) ? -954 : 954;

              actual.css({'z-index' : 1});

              obj.css({
                'position' : 'absolute',
                'bottom'   : 0,
                //'left'     : offset,
                'left'     : 0,
                'opacity'  : 0,
                'z-index'  : 2
              });
              
              $('#gallery-module-lite-zoomed').css({"background-image":"url('static/images/preloader.gif')", "background-position":"center center"}).addClass("preloading");

              holder.prepend(obj);

              self.actual_image_width = obj.width();
              self.actual_image_height = obj.height();

              obj.attr("width", holder.width()).attr("height", holder.height());

              actual.animate({'opacity':0});
              obj.animate({
                //'left' : 0
                'opacity': 1
              }, self.animTime * 2, function() {
                actual.remove();
                self.animating = false;

                $('#gallery-module-lite-zoomed').css("background-image", "url('"+obj.attr("src")+"')").removeClass("preloading").hide();

              });
              
              loader.fadeOut();

              self.lastimg = self.newimage;

        },
        // Method for controlling thumbnails panel
        thumbsController: function(obj) {
          var $thumbs = self.buttonNavp.find('li a');

              setActiveThumb();

              function setActiveThumb() {
                $thumbs.each(function(i) {
                  var $thumb = $(this);

                  if ($thumb.hasClass('active')) { 
                    $thumb.removeClass('active'); 
                    self.methods.thumbFadeOut($thumb);

                    return false; 
                  }
                });

                obj.addClass('active');
                self.methods.thumbFadeIn(obj);
                self.newimage = $thumbs.index(obj);

                // Load image
                self.methods.loadImage(obj.attr('href'));

                // Call arrows controller
                self.methods.arrowsController();

                // Call thumbs gallery controller
                self.methods.thumbGallery();
              }
        },
        thumbGallery: function(type) {
          if(self.busy && typeof type !== "undefined"){
            return;
          }
          self.busy = true;

          var imgW           = self.buttonNavp.find('img:eq(0)').width() + 2,
              $holder        = self.mainHolder.find('.thumbs-holder'),
              $holderul      = $holder.find('ul'),
              isLast         = (self.newimage == $holderul.find('img').length) ? true : false,
              isFirst        = ((self.newimage + 1) == 0) ? true : false,
              thumbW         = (self.newimage + 1) * imgW,
              currPosition   = parseInt($holderul.css('marginLeft')),
              y              = thumbW + currPosition,
              holderW        = $holder.width(),
              numShownThumbs = Math.floor($holder.width() / $holder.find("img").width()) - 1,
              leftOvers      = $holder.find("img").length % numShownThumbs;

              self.maxPages  = Math.ceil($holder.find("img").length / numShownThumbs);

              // if request came from thumb panel arrow
              if(type == "next"){
                var max = (self.buttonNavp.find('img').length * imgW)*-1;
                    max += imgW * Math.ceil(holderW / imgW);

                if(currPosition < max) {
                  self.busy = false;
                  return;
                }
                self.page++;

                var movement = (imgW * numShownThumbs)
                if(self.page == self.maxPages){
                  movement = (imgW * leftOvers);
                }

                $holderul.animate({'margin-left' : '-=' + movement + 'px'}, function() { self.busy = false;});
                self.methods.arrowsController();
              }
              else if(type == "previous"){
                if(currPosition == 0){
                  self.busy = false;
                  return;
                }

                var movement = (imgW * numShownThumbs)
                if(self.page == self.maxPages){
                  movement = (imgW * leftOvers);
                }

                self.page--;
                $holderul.animate({'margin-left' : '+=' + movement + 'px'}, function() { self.busy = false;});
                self.methods.arrowsController();
              } else {
                if ((y > holderW) && (!isLast)) {

                  self.page++;
                  var movement = (imgW * numShownThumbs)
                    if(self.page == self.maxPages){
                    movement = (imgW * leftOvers);
                  }

                  $holderul.animate({'margin-left' : '-=' + movement + 'px'}, function() {self.busy = false;});
                  
                } else if ((y <= 0) && (!isFirst)) {

                  var movement = (imgW * numShownThumbs)
                    if(self.page == self.maxPages){
                    movement = (imgW * leftOvers);
                  }
                  self.page--;

                  $holderul.animate({'margin-left' : '+=' + movement + 'px'}, function() {self.busy = false;});
                } else {
                  self.busy = false;
                }
              }

          if (self.page > 1) {
            self.buttonNavR.animate({"opacity":1}, function(){$(this).css({'cursor' : 'pointer'});});
          } else {
            self.buttonNavR.animate({"opacity":0}, function(){$(this).css({'cursor' : 'default'});});
          }
          if (self.page < self.maxPages) {
            self.buttonNavN.animate({"opacity":1}, function(){$(this).css({'cursor' : 'pointer'});});
          } else {
            self.buttonNavN.animate({"opacity":0}, function(){$(this).css({'cursor' : 'default'});});
          }
        },
        thumbFadeIn: function(obj,type) {
          obj.find('.thumbs-overlay').stop(true, true).fadeIn();
          if (!type) obj.find('.thumbs-border').stop(true, true).animate({'bottom' : 0}, self.animTime);
        },
        thumbFadeOut: function(obj) {
          obj.find('.thumbs-overlay').stop(true, true).fadeOut();
          obj.find('.thumbs-border').stop(true, true).animate({'bottom' : -3}, self.animTime);
        },
        // Controlling showing and hiding of left & right arrow
        arrowsController: function() {
          (self.newimage < self.buttonNavp.find('img').length - 1) ? self.buttonNext.fadeIn() : self.buttonNext.fadeOut();
          (self.newimage > 0) ? self.buttonPrev.fadeIn() : self.buttonPrev.fadeOut();
        }
    };

    return {
        init: function () {
            return self.methods.init()
        }
    };
})($jquery_1_9_1);


/**
* @class            filterSelector
* @descripion       > this module inits and handles the jsFilterSort
***********************************************************************/
cb.modules.jsFilterSort = (function ($) {
    var self = {};

    // Public vars
    self.mainHolder   = $(".jsFilterSort");
    self.container_1  = $("ul.list-grid-two");
    self.container_2  = $("ul.list-grid-three");
    self.container_3  = $("ul.list-grid-six");
    self.template     = '<li><a href="" title=""><span class="button wishlist notext">Add to wishlist</span><div class="img-holder"><div class="overlay transition"></div><img class="" src="" width="311" height="312" alt="" /></div><p class="title">...</p><p class="price">from £<span class="value">189.99</span></p></a></li>';
    self.payload      = [];
    self.orig         = [];
    self.busy         = false;
    
    // Public methods
    self.methods = {
        init: function () {
          if (self.mainHolder.length == 0) {
            return;  
          }

          // Grab page content for sorting
          $('ul.list-grid-two li, ul.list-grid-three li, ul.list-grid-six li').each(function(){ 
            self.orig.push({'n':$(this).data("name"), 'p':$(this).data("price"), 'i':$(this).data("img"), 'd':$(this).data("date"), 't':$(this).data("type"), 'badge':$(this).data("badge")});
          });
          
          self.payload = self.orig;
          $('.sort-results-total, .sort-results-displaying').html(self.orig.length);

          // Start functionality for each modul
          self.mainHolder.each(function() {
            // Private vars
            var $filters      = $(this).find(".item-types li"),
                $sorts        = $(".sort-types li"),
                $filter_btn   = $('.filter.txtbutton'),
                $reset_btn    = $('.resetall'),
                $filter_wrap  = $('.filter-sort-filter-wrap').hide(),
                $filter_arrow = $('.accessories-filter .filter-content .open-indicator'),
                filters_open  = false,
                sorts_open    = false,
                slide_speed   = 600,
                selected_filters = [];

            $filter_btn.on('click', function(e) {
              e.preventDefault();
              if(filters_open){
                $filter_wrap.slideUp(slide_speed);
                $filter_arrow.fadeOut();
                $filter_btn.removeClass("active");
              } else {
                $filter_wrap.slideDown(slide_speed);
                $filter_arrow.fadeIn();
                $filter_btn.addClass("active");
              }
              filters_open = !filters_open;
            });

            $filters.on('click', function(e) {
              e.preventDefault();
              if(self.busy){
                return;
              }
              self.busy = true;
              $(this).toggleClass("active");
              getFilteredData();
            });

            $sorts.on('click', function(e) {
              e.preventDefault();
              $sorts.find("a").removeClass("active");
              $(this).find("a").addClass("active");
              sortItems($(this).data("sort"));
            });

            $reset_btn.on('click', function(e){
              e.preventDefault();
              $filters.removeClass("active");
              getFilteredData();
            });

            var getFilteredData = function(){

              // Stop jumping
              $('.accessories-content').css("height", $('.accessories-content').height());

              // Fade all items
              self.container_1.find("li").animate({'opacity':0}, function(){ $(this).remove(); });
              self.container_2.find("li").animate({'opacity':0}, function(){ $(this).remove(); });
              self.container_3.find("li").animate({'opacity':0}, function(){ $(this).remove(); });
              
              selected_filters = [];
              $filters.each(function(){
                if($(this).hasClass("active")){
                  selected_filters.push($(this).find("a").data("filter"));
                }
              });

              if(selected_filters.length == 0){
                self.payload = self.orig;
              } else {
                self.payload = [];


                $.each(self.orig, function(){
                  if($.inArray(this.t, selected_filters) !== -1){
                    self.payload.push(this);
                  }
                });

              }
              
              $('.sort-results-displaying').html(self.payload.length);

              // Show filtered data
              setTimeout(displayNewData, 500);
            }

            var displayNewData = function(){
              var sort_type = $('.sort-types a.active').parents("li").eq(0).data("sort");
              
              switch(sort_type){
                case "new-old":
                  self.payload = self.payload.sort(function(p1, p2){ return p2.d - p1.d; });
                  break;
                case "old-new":
                  self.payload = self.payload.sort(function(p1, p2){ return p1.d - p2.d; });
                  break;
                case "low-high":
                  self.payload = self.payload.sort(function(p1, p2){ return p1.p - p2.p; });
                  break;
                case "high-low":
                  self.payload = self.payload.sort(function(p1, p2){ return p2.p - p1.p; });
                  break;
              }

              
                var display_container = 1,
                total = self.payload.length,
                container = self.container_1,
                width = 0,
                height = 0;

                $.each(self.payload, function(i){
                  var last = '';

                  if(i < 2){
                    container = self.container_1;
                    if(i == 1){
                      last = 'last-child';
                    }
                    width  = 472;
                    height = 474;
                  }
                  else if(i < 5){
                    container = self.container_2;
                    if(i == 4){
                      last = 'last-child';
                    }
                    width  = 311;
                    height = 312;
                  }
                  else if(i > 4){
                    container = self.container_3;
                    if(((i - 5) % 5 == 0) && ((i - 5) != 0)){
                      last = 'last-child';
                    }
                    width  = 150;
                    height = 150;
                  } 
                  var item = $(self.template).css("opacity", 0);
                      item.find("img").css("opacity", 0);
                      item.appendTo(container);
                      if(last !== ''){
                        item.addClass(last);
                      }
                      item.find(".price .value").html(this.p);
                      item.find(".title").html(this.n);
                      item.find("img").attr("width", width).attr("height", height);
                      item.find(".wishlist").data('name',this.n);
                      item.find(".overlay").addClass("loading");
                      item.delay(150*i).animate({"opacity":1});
                      item.addClass("done");

                  // Has new badge?
                  if(this.badge == "new"){
                    $('<div class="badge new">New</div>').appendTo(item.find(".img-holder"));
                  }

                  // Preload image
                  var img = $('<img />').data("src",this.i);
                  img.load(function(){
                    var delay = i * (200 - (i * 5));
                    delay = (delay < 25)? 25 : delay;
                    var src = $(this).data("src");
                    setTimeout(function(){
                      item.find("img").attr("src",src).animate({'opacity':1}, 500);
                      item.find(".overlay").removeClass("loading");
                    }, delay + 250 + 500);
                    
                  })
                  img.attr("src", this.i);
                });
                

                var new_height = self.container_1.height() + self.container_2.height() + self.container_3.height();
                    $('.accessories-content').stop(true, true).animate({'height':new_height}, 1500, function(){ $(this).css("height", "auto"); self.busy = false; cb.modules.addToWishlist.init(); });
            }

            var sortItems = function(sort_type){
              // If there's nothing to sort, return
              if(self.payload.length < 1){
                return;
              }

              // Fade all items
              self.container_1.find("li").animate({'opacity':0}, 250).removeClass("done");
              self.container_2.find("li").animate({'opacity':0}, 250).removeClass("done");
              self.container_3.find("li").animate({'opacity':0}, 250).removeClass("done");

              switch(sort_type){
                case "new-old":
                  self.payload = self.payload.sort(function(p1, p2){ return p2.d - p1.d; });
                  break;
                case "old-new":
                  self.payload = self.payload.sort(function(p1, p2){ return p1.d - p2.d; });
                  break;
                case "low-high":
                  self.payload = self.payload.sort(function(p1, p2){ return p1.p - p2.p; });
                  break;
                case "high-low":
                  self.payload = self.payload.sort(function(p1, p2){ return p2.p - p1.p; });
                  break;

              }
  
              setTimeout(function(){ 
                var display_container = 1;
                var total = self.payload.length;
                var container = self.container_1;
                $.each(self.payload, function(i){
                  if(i < 2){
                    container = self.container_1;
                  }
                  else if(i < 5){
                    container = self.container_2;
                  }
                  else if(i > 4){
                    container = self.container_3;
                  } 
                  var item = container.find("li").not(".done").eq(0);
                  item.find(".price .value").html(this.p);
                  item.find(".title").html(this.n);
                  item.find("img").attr("src",this.i);
                  var delay = i * (200 - (i * 5));
                  delay = (delay < 25)? 25 : delay;
                  item.addClass("done").delay(delay).animate({'opacity':1}, 250);
                });                
              }, 350);

            }

          });

        }
    };

    return {
        init: function () {
            return self.methods.init()
        }
    };
})($jquery_1_9_1);


/**
* @class            carouselModule
* @descripion       > this module inits and handles the jsCarouselModule
***********************************************************************/
cb.modules.carouselModule = (function ($) {
    var self = {};

    // Public vars
    self.mainHolder = $(".jsCarouselModule");
    self.animTime   = 600;
    
    // Public methods
    self.methods = {
        init: function () {
          if (self.mainHolder.length == 0) {
            return;  
          }

          // Start functionality for each modul
          self.mainHolder.each(function() {
            var $list     = $(this).find('.pagination a'),
                $imglist  = $(this).find('.carousel-holder ul li'),
                $holder   = $(this).find('.carousel-holder'),
                animation = false,
                listW     = $holder.find('img:eq(0)').width(),
                actualId  = 0,
                $leftarr  = $(this).find('.gmprevious'),
                $rightarr = $(this).find('.gmnext');

                $imglist.each(function(i) {
                  $(this).addClass('carousel-img-' + i);
                });

                $list.each(function(i) {
                  $(this).on('click', function(e) {
                    e.preventDefault();

                        if (!animation) {
                          var _this = $(this);

                              // Set new slide
                              swapSlide(i);
                        }
                  });
                });

                $leftarr.on('click', function(e) {
                  e.preventDefault();

                  if (!animation) swapSlide((actualId == 0) ? $list.length - 1 : actualId - 1);
                });

                $rightarr.on('click', function(e) {
                  e.preventDefault();

                  if (!animation) swapSlide((actualId == $list.length - 1) ? 0 : actualId + 1);
                });

                function swapSlide(id) {
                  animation = true;
                  
                  var $img = $imglist.eq(id).find('a').clone();
                      $img.css({'position': 'absolute', 'top' : 0, 'left' : 0, 'z-index' : 10}).hide();

                      // Set z-index of previous
                      $holder.find('a:eq(0)').css({'z-index' : 9});
                      $holder.prepend($img);

                  // From left
                  if (actualId < id) {
                    $img.css({'left' : listW}).show().animate({'left' : 0}, self.animTime, animationCallback);
                  // From right
                  } else {
                    $img.css({'left' : -listW}).show().animate({'left' : 0}, self.animTime, animationCallback);
                  }

                  actualId = id;
                  resetPagination();
                }

                function animationCallback() {
                  animation = false;
                  $holder.find('a:eq(1)').remove();
                }

                function resetPagination() {
                  $list.each(function() {if($(this).hasClass('active')) $(this).removeClass('active');});
                  $list.eq(actualId).addClass('active');
                }
          });
        }
    };

    return {
        init: function () {
            return self.methods.init()
        }
    };
})($jquery_1_9_1);


/**
* @class            preloaderSprite
* @descripion       > this module inits and handles the jsPreloader
***********************************************************************/
cb.modules.preloaderSprite = (function ($) {
    var self                   = {},
        cSpeed                 = 6,
        cTotalFrames           = 20,
        cFrameWidth            = 32,
    
        cImageTimeout          = false,
        cIndex                 = 0,
        cXpos                  = 0,
        FPS                    = 0,
        SECONDS_BETWEEN_FRAMES = 0;

    // Public vars
    self.mainHolder   = $(".jsPreloader");

    // Public methods
    self.methods = {
        init: function () {
          if (self.mainHolder.length == 0) {
            return;
          }

          function startAnimation(){            
            FPS = Math.round(100/cSpeed);
            SECONDS_BETWEEN_FRAMES = 1 / FPS;
            
            setTimeout(continueAnimation, SECONDS_BETWEEN_FRAMES/1000);
          }
          
          function continueAnimation() {
            
            if (self.mainHolder.is(":visible")) {
              cXpos += cFrameWidth;
              //increase the index so we know which frame of our animation we are currently on
              cIndex += 1;
               
              //if our cIndex is higher than our total number of frames, we're at the end and should restart
              if (cIndex >= cTotalFrames) {
                cXpos =0;
                cIndex=0;
              }
              
              self.mainHolder.css({
                'background-position' : (-cXpos)+'px 0'
              });
            }
            
            setTimeout(continueAnimation, SECONDS_BETWEEN_FRAMES*1000);
          }
          
          startAnimation();
        }
    };

    return {
        init: function () {
            return self.methods.init()
        }
    };
})($jquery_1_9_1);


/**
* @class            globalWishlist
* @descripion       > this module inits and handles the jsGlobalWishlist
***********************************************************************/
cb.modules.globalWishlist = (function ($) {
    var self                   = {};

    // Public vars
    self.mainHolder  = $(".jsGlobalWishlist");
    self.list        = self.mainHolder.find('.wishlist-list li');
    self.listHolder  = self.mainHolder.find('.wishlist-list');
    self.removeall   = self.mainHolder.find('.removeall');
    self.priceholder = self.mainHolder.find('.totalprice span');
    self.h2          = self.mainHolder.find('.header h2');
    self.pagination  = self.mainHolder.find('.pagination');
    self.pages       = self.pagination.find('.pagination-holder');
    self.prices      = self.pagination.find('.totalprice');
    self.animTime    = 600;
    self.actualPage  = 0;
    self.totalPages  = 0;
    self.numActive   = 0;
    self.totalprice  = 0;
    self.leftprev    = self.pagination.find('.previous');
    self.leftnext    = self.pagination.find('.next');
    self.sorts       = $(".sort-types li");
    self.payload     = [];
    self.orig        = [];
    self.mainHolderH = self.mainHolder.height() - self.mainHolder.find('.wishlist-list').height();
    self.busy        = false;

    // Public methods
    self.methods = {
        init: function () {
          if (self.mainHolder.length == 0) {
            return;
          }

          // Grab content to array and remove from DOM
          $.each(self.list, function() {
            var _this = $(this);

                self.orig.push({'i':_this.data('id'), 'p':_this.data('price'),'d':_this.data('date'),'obj':_this});
                _this.remove();
          });

          // Hide pagination
          self.pages.hide();
          self.prices.hide();

          self.methods.startEvents();
          self.methods.displayData();
        },
        displayData:function() {
          var from = self.actualPage * 10,
              to   = (from + 10 < self.orig.length) ? from + 10 : self.orig.length;

              for (var i = from; i < to; i++) {
                self.methods.addNewItem(i);
              }

              self.methods.paginationController();
              self.methods.calculateTotalPrice();
              self.methods.calculateItems();

              var new_height = self.listHolder.height();
                  self.mainHolder.find('.wishlist-wrap').stop(true, true).animate({'height':new_height}, 600, function(){ $(this).css("height", "auto"); self.busy = false;});
        },       
        paginationController:function() {
          // Remove all pages
          self.pages.find('ul').empty();

          self.totalPages = Math.ceil(self.orig.length / 10);

          // If we have some content show total price
          if (self.orig.length > 0) {
            self.prices.show();
          }

          // If we have more than 10 results then show pagination
          if (self.orig.length > 9) {
            self.pages.show();

            // Pagination arrows
            (self.actualPage === 0) ? self.leftprev.css({'opacity' : 0, 'cursor' : 'default'}) : self.leftprev.css({'opacity' : 1, 'cursor' : 'pointer'});
            (self.actualPage === self.totalPages - 1) ? self.leftnext.css({'opacity' : 0, 'cursor' : 'default'}) : self.leftnext.css({'opacity' : 1, 'cursor' : 'pointer'});
          } else {
            self.pages.hide();
          }
          
          // Calculate pages
          for (var i=1; i <= self.totalPages; i++) {
            var item = '<li><a class="' + (((self.actualPage + 1) === i) ? 'active' : '') + ' transition" href="#' + i + '" title="">' + i + '</a></li>';
                self.pagination.find('ul').append(item);
          }

          // Add click events to pages
          self.pagination.find('li a').each(function() {
            $(this).on('click', function() {
              if (!self.busy) {
                self.actualPage = parseInt($(this).text()) - 1;
                self.methods.setNewPage();
              }
            });
          });
        },
        setNewPage:function() {
          self.busy = true;
          // Remove actual items
          var list  = self.mainHolder.find('.wishlist-list li'),
              count = list.length;

              self.mainHolder.find('.wishlist-wrap').css({'height' : self.listHolder.height()});

              if (count > 0) {
                list.each(function() {
                  $(this).fadeOut(200, function() {
                    $(this).remove();

                    if (!--count) self.methods.displayData();
                  });
                });
              } else {
                self.methods.displayData();
              }
        },
        calculateTotalPrice:function() {
          self.totalprice = 0;

          for (var i=0,len=self.orig.length; i < len; i++) {
            self.totalprice += self.orig[i].p;
          }

          self.priceholder.text('£' + self.totalprice.toFixed(2));

          if (self.totalprice === 0) self.prices.hide();
        },
        calculateItems:function() {
          var from = (self.orig.length === 0) ? 0 : (self.actualPage * 10 + 1),
              to   = (self.orig.length === 0) ? 0 : (from + 9 < self.orig.length) ? from + 9 : self.orig.length;

              self.h2.html(self.orig.length + ' items <span>Showing items ' + from + ' to ' + to + '</span>');
        },
        removeEvents:function(obj) {
          obj.find('.remove').on('click', function(e){
            e.preventDefault();

            if (!self.busy) {
              var list = self.mainHolder.find('.wishlist-list li');

              var item    = $(this),
                  _parent = item.parent(),
                  itemid  = _parent.data('id'),
                  data    = {'item':itemid},
                  count   = self.mainHolder.find('.wishlist-list li:hidden').length,
                  index   = list.index(_parent);

                  // TODO: AJAX call to remove item (data-id)

                  //if (success) {
                    _parent.animate({
                      'height' : 0
                    }, 300, function() {
                      $(this).remove();

                      // Remove item from array
                      for (var j=0,len=self.orig.length;j<len;j++) {
                        if (self.orig[j].i === itemid) {
                          self.orig.splice(j, 1);
                          
                          self.methods.addNewItem(j,true);
                          return false;
                        }
                      }
                    });
                  //}
            }
          });
        },
        addNewItem:function(index,recalculate) {
          if(recalculate) self.mainHolder.find('.wishlist-wrap').css({'height' : self.mainHolder.find('.wishlist-list').height()});

          if ((index === self.orig.length) && (self.totalPages !== Math.ceil(self.orig.length / 10))) {
            self.leftprev.trigger('click');
            return false;
          }

          var id = (recalculate) ? (self.actualPage * 10) + 9 : index;

              if (self.orig.length > id) {
                    var item = self.orig[id].obj;
                        item.hide();
                        self.methods.removeEvents(item);
                        self.listHolder.append(item);
                        item.fadeIn(200, function() {
                          if (recalculate) {
                            var new_height = self.mainHolder.find('.wishlist-list').height();
                                self.mainHolder.find('.wishlist-wrap').stop(true, true).animate({'height':new_height}, 800, function(){ $(this).css("height", "auto");});
                          }
                        });
              }

              if (recalculate) {
                self.methods.paginationController();
                self.methods.calculateTotalPrice();
                self.methods.calculateItems();
              }
        },
        startEvents:function() {
          // Start remove all event
          self.removeall.on('click', function(e) {
            e.preventDefault();

            var wishlist = self.mainHolder.find('.wishlist-list'),
                list     = self.mainHolder.find('.wishlist-list li'),
                count    = list.length;

            self.mainHolder.find('.wishlist-wrap').css({'height' : wishlist.height()});

            // TODO: AJAX call to remove all
            //if (success) {
            list.each(function(){
              $(this).fadeOut(function() {
                $(this).remove();

                if (!--count) {
                  self.orig = [];
                  self.methods.paginationController();
                  self.methods.calculateTotalPrice();
                  self.methods.calculateItems();
                  var new_height = wishlist.height();
                      self.mainHolder.find('.wishlist-wrap').stop(true, true).animate({'height':new_height}, 800, function(){ $(this).css("height", "auto");});
                }
              });
            });
          //}
          });

          // Previous arrow
          self.leftprev.on('click', function(e) {
            e.preventDefault();
            if (!self.busy) {
              if (self.actualPage > 0) --self.actualPage;
              self.methods.setNewPage();
            }
          });

          // Next arrow
          self.leftnext.on('click', function(e) {
            e.preventDefault();
            if (!self.busy) {
              if (self.actualPage < self.totalPages - 1) ++self.actualPage;
              self.methods.setNewPage();
            }
          });

          // Start sort events
          self.sorts.on('click', function(e) {
            e.preventDefault();
            var _this = $(this);

            if ((!self.busy) && (!_this.find("a").hasClass('active'))) {
              self.sorts.find("a").removeClass("active");
              _this.find("a").addClass("active");
              self.methods.sortItems(_this.data("sort"));
            }
          });
        },
        sortItems: function(sort_type){
          // If there's nothing to sort, return
          if(self.orig.length < 1){
            return;
          }

          // Fade out and remove all items
          var list  = self.mainHolder.find('.wishlist-list li'),
              count = list.length;

          list.each(function() {
            $(this).fadeOut(200,function() {
              $(this).remove();
              if (!--count) self.methods.displayData();
            });
          });

          var from = (self.list.length === 0) ? 0 : (self.actualPage * 10),
              to   = (self.list.length === 0) ? 0 : (from + self.numActive),
              wishlist = self.mainHolder.find('.wishlist-list');

          self.mainHolder.find('.wishlist-wrap').css({'height' : wishlist.height()});

          switch(sort_type){
            case "new-old":
              self.orig = self.orig.sort(function(p1, p2){ return p2.d - p1.d; });
              break;
            case "old-new":
              self.orig = self.orig.sort(function(p1, p2){ return p1.d - p2.d; });
              break;
            case "low-high":
              self.orig = self.orig.sort(function(p1, p2){ return p1.p - p2.p; });
              break;
            case "high-low":
              self.orig = self.orig.sort(function(p1, p2){ return p2.p - p1.p; });
              break;
          }

          /*setTimeout(function(){ 
            var total = self.orig.length,
                container = self.mainHolder.find('.wishlist-list'),
                tofade    = to-from;

            // Add sorted items to list and fade in
            for (var i=0; i < total; i++) {
              var item = self.orig[i].obj;
                  item.hide();
                  container.append(item);

                  if ((i >= from) && (i < to)) {
                    item.fadeIn(200,function(){if(!--tofade) self.busy = false;});
                  }
            }
            self.methods.removeEvent();
            var new_height = wishlist.height();
                self.mainHolder.find('.wishlist-wrap').stop(true, true).animate({'height':new_height}, 1000, function(){ $(this).css("height", "auto");});
          }, 550);*/
        }
    };

    return {
        init: function () {
            return self.methods.init()
        }
    };
})($jquery_1_9_1);

/**
* @class            addToWishlist
* @descripion       > this module inits and handles the Add to Wishlist functionality across whole website
***********************************************************************/
cb.modules.addToWishlist = (function ($) {
    var self = {};

    // Public vars
    self.box    = '<div class="wishlist-box"><div class="top-header"><p>Please choose a size to add to your Wishlist</p><a href="" class="button wishlist notext active" title="Add to wishlist">Add to wishlist</a></div><a class="wishlistlink" href="" title="">Visit Wishlist</a></div>';
    
    // Public methods
    self.methods = {
        init: function () {
          self.list = $('.wishlist');

          self.list.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var _this     = $(this),
                _parent   = _this.parents().not('a').eq(0),
                _width    = _parent.width() - 12,
                _height   = 'auto',
                _finalH   = _parent.height(),
                box       = $(self.box).clone(),
                sizes     = ['S','M','L','XL','XXL'],
                colors    = ['ed2e24','a8a8a8','364fa9'],
                selectedsize = selectedcolor = null,
                title     = box.find('p'),
                productname = _this.data('name'),
                productID = _this.data('id'),
                link      = box.find('.wishlist');

                /* TODO: AJAX call for product (productID) data
                 * Result data should be arrays for:
                 * sizes = 
                 * colors = 
                 * Script is choosing between four routes.
                 * - if both (sizes & colors) arrays have some data = Route 4
                 * - if just sizes array have some data             = Route 3
                 * - if just colors array have some data            = Route 2
                 * - if no data in arrays                           = Route 1
                 *******************************************************************/
                // Exception for main page header wishlist box
                if (_parent.hasClass('settings-top')) {
                  _parent = _this.parents().eq(2);
                  _width  = 300;
                  _height = _finalH = _parent.height();

                  link.css({'right' : 10});

                // Exception for required parts wishlist box
                } else if (_parent.parent().hasClass('list-required') || _parent.parent().hasClass('list-optional')) {
                  _width  = _parent.width() + 8;

                  link.css({'top' : 5,'right' : -1});

                // Exception for packages
                } else if (_parent.hasClass('header')) {
                  _parent = _parent.parent();
                  _finalH = _parent.height();
                  link.css({'top' : 30,'right' : (_parent.hasClass('borderr') ? 34 : 19)});
                // Exception for accessories-info
                } else if (_parent.hasClass('accessories-info')) {
                  _finalH     = 170;
                  link.css({'top' : 10,'right' : 0});
                }

                // Setting CSS for wishlist box
                box.css({
                  'width'  : _width,
                  'height' : _height,
                  'right'   : 0
                }).hide();

                // Adding box to parent
                _parent.append(box);

                // Close module on document click
                $(document).on('click', function() {
                  box.stop(true,true).fadeOut(function(){$(this).remove();});
                  $(document).off('click');
                });

                box.on('click', function(e) {
                  e.stopPropagation();
                });

                // Or by clicking on the button
                link.on('click', function(e) {e.preventDefault(); box.fadeOut(function(){box.remove();});});

                var boxsizes  = $('<div class="sizesbox"></div>').hide(),
                    boxcolors = $('<div class="colorsbox"></div>').hide();

                // Route 4 - Sizes & Colors
                if ((sizes.length > 0) && (colors.length > 0)) {
                  addSizesBox(true);
                  addColorBox(false);
                // Route 3 - Sizes
                } else if (sizes.length > 0) {
                  addSizesBox();
                // Route 2 - Colors
                } else if (colors.length > 0) {
                  title.text('Please choose a colour to add to your Wishlist');
                  addColorBox(true);
                // Route 1 - No options
                } else {
                  title.text('Click to add to Wishlist');
                  box.css({'cursor' : 'pointer'});
                  box.on('click', function(e) {
                    e.preventDefault();

                    showFinalScreen();
                  });
                }

                // Show the wishlist box
                $('.wishlist_box').each(function(){ $(this).fadeOut(function(){ $(this).remove(); }); });
                box.addClass("wishlist_box");
                box.fadeIn();


                // Add color box
                function addColorBox(type) {
                  for (var i=0,len=colors.length; i<len; i++) {
                    boxcolors.append('<a href="" class="colors color1 rounded" style="background-color: #' + colors[i] + ';"><img src="static/images/color_overlay.png" alt="" /></a>');
                  }

                  box.append(boxcolors);

                  // If type == true - Route 2
                  if (type) boxcolors.show().css({'display' : 'inline-block'});

                  boxcolors.find('a').on('click', function(e) {
                    e.preventDefault();

                    selectedcolor = self.methods.hexit($(this).css('background-color'));
                    
                    boxcolors.fadeOut();
                    showFinalScreen();
                  });
                }

                // Add sizes box
                function addSizesBox(type) {
                  for (var i=0,len=sizes.length; i<len; i++) {
                    boxsizes.append('<a class="' + ((i === len - 1) ? "last-child" : null) + ' transition" href="" title="">' + sizes[i] + '</a>');
                  }

                  box.append(boxsizes);
                  boxsizes.show().css({'display' : 'inline-block'});

                  boxsizes.find('a').on('click', function(e) {
                    e.preventDefault();

                    selectedsize = $(this).text();

                    // If type == true Route 4
                    if (type) {
                      boxsizes.fadeOut(function() {
                        boxcolors.fadeIn(function(){$(this).css({'display' : 'inline-block'});});
                      });

                      title.fadeOut(function() {
                        title.text('Please choose a colour to add to your Wishlist').fadeIn();
                      });
                    } else {
                      boxsizes.fadeOut();
                      showFinalScreen();
                    }
                  });
                }

                // Add final screen
                function showFinalScreen() {
                  box.animate({'height' : _finalH}, 1000, function() {
                    // Adding link to global wishlist page
                    box.find('.wishlistlink').fadeIn();
                  });
                  title.fadeOut(function() {
                    title.text(productname + ' has been added to Wishlist').fadeIn();
                  });

                  // TODO: AJAX call to send data to server
                  // If success
                  setInterval(function() { removeBox(); }, 2000);
                  $('.settings-top .wishlist').addClass('active');
                }

                // Remove box after final screen
                function removeBox() {
                  box.fadeOut(function(){box.remove();});
                  if (!_this.hasClass('active')) _this.addClass('active');
                }
          });
        },
        hexit:function(colorval) {
          var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

              if (parts) {
                parts.splice(0, 1);
                for (var i = 1; i <= 2; ++i) {
                    parts[i] = parseInt(parts[i]).toString(16);
                    if (parts[i].length == 1) parts[i] = '0' + parts[i];
                }
                return '#' + parts.join('');
              } else {
                return colorval;
              }
        }
    };

    return {
        init: function () {
            return self.methods.init()
        }
    };
})($jquery_1_9_1);