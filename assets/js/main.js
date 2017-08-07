jQuery(document).ready(function($){
	// Page animation
	$(".animated").appear(
	

	);
	   $(".animated").on('appear',function() {
	    var elem = $(this);
	    console.log("appear");
		        var animation = elem.data('animation');
		        if ( !elem.hasClass('visible') ) {
		        	var animationDelay = elem.data('animation-delay');
		            if ( animationDelay ) {
	
		                setTimeout(function(){
		                    elem.addClass( animation + " visible" );
		                }, animationDelay);
	
		            } else {
		                elem.addClass( animation + " visible" );
		            }
		}
	   });

	//Accordian Action
	
	$('li.ques').on('click', function(){
	  //gets next element
	  
	  //opens .a of selected question
	$(this).next().slideToggle(500)
	    //selects all other answers and slides up any open answer
	    .siblings('li.ans').slideUp();
	$(this).siblings('li').removeClass('active');
	$(this).toggleClass('active');    
	  
//	  //Grab img from clicked question
//	var img = $(this).children('img');
//	  //Remove Rotate class from all images except the active
//	  $('img').not(img).removeClass('rotate');
//	  //toggle rotate class
//	  img.toggleClass('rotate');
	
	});//End on click
	
	$('.carousel').carousel({
	    interval: false //changes the speed
	});
	
	function videoStatus() {
		var videoID = $('#home-bg-video');
		if ($(videoID).get(0).paused) {
		       $(videoID).get(0).play();
		   } else {
		       $(videoID).get(0).pause();
		  }
	}
	
	$('.iframe-video').magnificPopup({
		type:'iframe',
		callbacks: {
		  open: function() {
		    videoStatus();
		  },
		  close: function () {
		  	videoStatus();
		  }
		}
	});
	

	$(".tour").on('click', function(event){
	    var elem = $(this).text();
	    var anchor = $(this).attr('href');
	    if (elem == "Learn more") {
	      $(this).text("Hide details");
	      $(anchor).slideDown("slow"); 
	      $('html, body').animate({
	              scrollTop: $( $(this).attr('href') ).offset().top
	          }, 500);
	          return false;
	    } else {
	      $(this).text("Learn more");
	      $(anchor).slideUp("slow");
	      var mainDivHeight = $('.tour-section').height();
	      $('html, body').animate({
	              scrollTop: $( $(this).attr('href') ).offset().top-(mainDivHeight+140)
	          }, 500);
	          return false;
	    }
	  });
	
	$(".tour-hide-btn").on('click', function(event){
		var anchor = $(this).attr('href');
	    var elem = $(this).text();
	    if (elem == "Hide details") {
	      $(this).closest('.tour-wrapper').find('.tour').text("Learn more");
	      $(anchor).slideUp("slow");
	      var mainDivHeight = $('.tour-section').height();
	      $('html, body').animate({
	              scrollTop: $( $(this).attr('href') ).offset().top-(mainDivHeight+140)
	          }, 500);
	          return false;
	    } 
	  });
	
	// Navigation
	
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MqL = 1170;
	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});
	
	//mobile - open lateral menu clicking on the menu icon
	$('.cd-nav-trigger').on('click', function(event){
		event.preventDefault();
		if( $('.cd-main-content').hasClass('nav-is-visible') ) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		} else {
			$(this).addClass('nav-is-visible');
			$('.cd-primary-nav').addClass('nav-is-visible');
			$('.cd-main-header').addClass('nav-is-visible');
			$('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
			toggleSearch('close');
			$('.cd-overlay').addClass('is-visible');
		}
	});

	//open search form
	$('.cd-search-trigger').on('click', function(event){
		event.preventDefault();
		toggleSearch();
		closeNav();
	});

	//close lateral menu on mobile 
	$('.cd-overlay').on('swiperight', function(){
		if($('.cd-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		}
	});
	$('.nav-on-left .cd-overlay').on('swipeleft', function(){
		if($('.cd-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		}
	});
	$('.cd-overlay').on('click', function(){
		closeNav();
		toggleSearch('close')
		$('.cd-overlay').removeClass('is-visible');
	});


	
	//open submenu
	if ($(window).width()<= MqL) {
		$('.cd-primary-nav').children('.has-children').children('a').on('click', function(event){
			//prevent default clicking on direct children of .cd-primary-nav 
			event.preventDefault();
		});
		$('.cd-secondary-nav').addClass('is-hidden');
		$('.has-children').children('a').on('click', function(event){
			if( !checkWindowWidth() ) event.preventDefault();
			var selected = $(this);
			if( selected.next('ul').hasClass('is-hidden') ) {
				//desktop version only
				selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
				selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
				$('.cd-overlay').addClass('is-visible');
			} else {
				selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
				$('.cd-overlay').removeClass('is-visible');
			}
			toggleSearch('close');
		});
	}

	
	
	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
	});

	function closeNav() {
		$('.cd-nav-trigger').removeClass('nav-is-visible');
		$('.cd-main-header').removeClass('nav-is-visible');
		$('.cd-primary-nav').removeClass('nav-is-visible');
		$('.has-children ul').addClass('is-hidden');
		$('.has-children a').removeClass('selected');
		$('.moves-out').removeClass('moves-out');
		$('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('body').removeClass('overflow-hidden');
		});
	}

	function toggleSearch(type) {
		if(type=="close") {
			//close serach 
			$('.cd-search').removeClass('is-visible');
			$('.cd-search-trigger').removeClass('search-is-visible');
			$('.cd-overlay').removeClass('search-is-visible');
		} else {
			//toggle search visibility
			$('.cd-search').toggleClass('is-visible');
			$('.cd-search-trigger').toggleClass('search-is-visible');
			$('.cd-overlay').toggleClass('search-is-visible');
			if($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
			($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible') ;
		}
	}

	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
			return true;
		} else {
			return false;
		}
	}

	function moveNavigation(){
		var navigation = $('.cd-nav');
  		var desktop = checkWindowWidth();
        if ( desktop ) {
			navigation.detach();
			navigation.insertBefore('.cd-header-buttons');
		} else {
			navigation.detach();
			navigation.insertAfter('.cd-main-content');
		}
	}
	
	
	/* Tabs */

	var tabs = $('.cd-tabs');
		
		tabs.each(function(){
			var tab = $(this),
				tabItems = tab.find('ul.cd-tabs-navigation'),
				tabContentWrapper = tab.children('ul.cd-tabs-content'),
				tabNavigation = tab.find('nav');
	
			tabItems.on('click', 'a', function(event){
				event.preventDefault();
				var selectedItem = $(this);
				if( !selectedItem.hasClass('selected') ) {
					var selectedTab = selectedItem.data('content'),
						selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
						slectedContentHeight = selectedContent.innerHeight();
					
					tabItems.find('a.selected').removeClass('selected');
					selectedItem.addClass('selected');
					selectedContent.addClass('selected').siblings('li').removeClass('selected');
					//animate tabContentWrapper height when content changes 
					tabContentWrapper.animate({
						'height': slectedContentHeight
					}, 200);
				}
			});
	
			//hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
			checkScrolling(tabNavigation);
			tabNavigation.on('scroll', function(){ 
				checkScrolling($(this));
			});
		});
		
		$(window).on('resize', function(){
			tabs.each(function(){
				var tab = $(this);
				checkScrolling(tab.find('nav'));
				tab.find('.cd-tabs-content').css('height', 'auto');
			});
		});
	
		function checkScrolling(tabs){
			var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
			 	tabsViewport = parseInt(tabs.width());
			if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
				tabs.parent('.cd-tabs').addClass('is-ended');
			} else {
				tabs.parent('.cd-tabs').removeClass('is-ended');
			}
		}

	//Content filter
});

jQuery(document).ready(function($){
	// Change padding depending on the screen width and height
	updateHHPadding();
	$(window).resize(updateHHPadding);
	
	function updateHHPadding() {
		var hhHeight = $('.home-hero').height();
		var clHeight = $('.client-logos').height();
		var remainingHeight = hhHeight + clHeight;
		var pp = $(window).height()-remainingHeight ;
		$('.home-hero').each(function () {	    
		     $(this).css({
		        'padding-top': (pp / 2)+'px',
		        'padding-bottom': (pp / 2)+'px'
		    });
		});
	}
	
	
	    

	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
		elementsToTrigger.each(function(){
			$(this).toggleClass('filter-is-visible', $bool);
		});
	}

	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
		filter_tab_placeholder_default_value = 'Select',
		filter_tab_placeholder_text = filter_tab_placeholder.text();
	
	$('.cd-tab-filter li').on('click', function(event){
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');
			
		//check if user has clicked the placeholder item
		if( $(event.target).is(filter_tab_placeholder) ) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
			$('.cd-tab-filter').toggleClass('is-open');

		//check if user has clicked a filter already selected 
		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
			filter_tab_placeholder.text($(event.target).text());
			$('.cd-tab-filter').removeClass('is-open');	

		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.cd-tab-filter').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();
			
			//add class selected to the selected filter item
			$('.cd-tab-filter .selected').removeClass('selected');
			$(event.target).addClass('selected');
		}
	});
	
	//close filter dropdown inside lateral .cd-filter 
	$('.cd-filter-block h4').on('click', function(){
		$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
	})

	//fix lateral filter and gallery on scrolling
//	$(window).on('scroll', function(){
//		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
//	});

//	function fixGallery() {
//		var offsetTop = $('.cd-main-filter-content').offset().top,
//			scrollTop = $(window).scrollTop();
//		( scrollTop >= offsetTop ) ? $('.cd-main-filter-content').addClass('is-fixed') : $('.cd-main-filter-content').removeClass('is-fixed');
//	}

	/************************************
		MitItUp filter settings
		More details: 
		https://mixitup.kunkalabs.com/
		or:
		http://codepen.io/patrickkunka/
	*************************************/

	buttonFilter.init();
	$('.cd-gallery ul').mixItUp({
	    controls: {
	    	enable: false
	    },
	    callbacks: {
	    	onMixStart: function(){
	    		$('.cd-fail-message').fadeOut(200);
	    	},
	      	onMixFail: function(){
	      		$('.cd-fail-message').fadeIn(200);
	    	}
	    }
	});

});

/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
  	// Declare any variables we will need as properties of the object
  	$filters: null,
  	groups: [],
  	outputArray: [],
  	outputString: '',
  
  	// The "init" method will run on document ready and cache any jQuery objects we will need.
  	init: function(){
    	var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
    
    	self.$filters = $('.cd-main-filter-content');
    	self.$container = $('.cd-gallery ul');
    
	    self.$filters.find('.cd-filters').each(function(){
	      	var $this = $(this);
	      
		    self.groups.push({
		        $inputs: $this.find('.filter'),
		        active: '',
		        tracker: false
		    });
	    });
	    
	    self.bindHandlers();
  	},
  
  	// The "bindHandlers" method will listen for whenever a button is clicked. 
  	bindHandlers: function(){
    	var self = this;

    	self.$filters.on('click', 'a', function(e){
	      	self.parseFilters();
    	});
	    self.$filters.on('change', function(){
	      self.parseFilters();           
	    });
  	},
  
  	parseFilters: function(){
	    var self = this;
	 
	    // loop through each filter group and grap the active filter from each one.
	    for(var i = 0, group; group = self.groups[i]; i++){
	    	group.active = [];
	    	group.$inputs.each(function(){
	    		var $this = $(this);
	    		if($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
	    			if($this.is(':checked') ) {
	    				group.active.push($this.attr('data-filter'));
	    			}
	    		} else if($this.is('select')){
	    			group.active.push($this.val());
	    		} else if( $this.find('.selected').length > 0 ) {
	    			group.active.push($this.attr('data-filter'));
	    		}
	    	});
	    }
	    self.concatenate();
  	},
  
  	concatenate: function(){
    	var self = this;
    
    	self.outputString = ''; // Reset output string
    
	    for(var i = 0, group; group = self.groups[i]; i++){
	      	self.outputString += group.active;
	    }
    
	    // If the output string is empty, show all rather than none:    
	    !self.outputString.length && (self.outputString = 'all'); 
	
    	// Send the output string to MixItUp via the 'filter' method:    
		if(self.$container.mixItUp('isLoaded')){
	    	self.$container.mixItUp('filter', self.outputString);
		}
  	}
};