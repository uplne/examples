/**
 * Filter module. Currently used to filter eventListing events.
 * This module is reponsible for showing/hiding filter module and switching
 * between desktop and mobile versions.
 *
 * @module searchFilter
 */
mod.create_module("search-filter", function(sb) {
    'use strict';

    var self;

    return {
        el: {
            "container": sb.getContainer(),
            "toggle": null,
            "filterContainer": null,
            "pageContainer": null,
            "headers": null,
            "mobileHeader": null,
            "mobileMenuContents": null,
            "filterTags": null
        },

        events: {
            'click headers': 'clickToggle',
            'tap headers': 'clickToggle',
            'click mobileMenuContents': 'modulesClickHandler'
        },

        mobileMenuToggleClass: 'is-closed',
        isMenuVisible: false,
        isMobileMenuVisible: false,
        isChecked: 'is-active',

        /**
         * Standard init function.
         */
        init: function() {
            self = this;

            self.view.updateElementBindings();
            self.bindNotifiers();
            self.updateElements();
            self.view.shouldBeVisible();
        },

        /**
         * Event handler for clicking on the filter menu
         */
        clickToggle: function(event){
            event.stopPropagation();
            event.preventDefault();

            self.view.toggleMenu();
        },

        /**
         * Listen for updates from filter modules.
         */
        bindNotifiers: function() {
            sb.library({
                'name': 'polling'
            }, sb);

            sb.listen({
                'update-search-filter-modules': self.view.updateContents,
                'switch-to-mobile': self.updateElements,
                'view-resized': self.view.viewResized,
                'polling': self.library.polling.listen,
                'server-error': self.handleServerError
            });
        },

        /**
         * This function is called when the mobile menu is opened, and rebinds itself to the recently moved
         */
        updateElements: function() {
            var pollingContainer = null;

            // Get new data holders
            self.bindHolderElements();

            pollingContainer = self.getPreloaderContainer();

            self.library.polling.updateContainer(pollingContainer);

            self.bindHolderElementEvents();
        },

        getPreloaderContainer: function() {
            return (self.isMobileMenuVisible) ? sb.find(".mobilemenu--right", document)[0] : sb.find('.mobile-menu-contents', self.el.container)[0];
        },

        /**
         * So we have always pointers to all data holder objects.
         */
        bindHolderElements: function() {
            self.el.dataHolder = sb.find('[data-type="holder"]', document);
            self.el.filterTags = sb.find('[data-module="search-filter-tags"]', document);
        },

        /**
         * Binding events and checking for actual container.
         *
         * @param  {Boolean} isMobile If the call is from mobile version
         */
        bindHolderElementEvents: function() {
            sb.removeEvent(self.el.dataHolder, 'click', self.modulesClickHandler);

            self.bindHolderElements();

            sb.addEvent(self.el.dataHolder, 'click', self.modulesClickHandler);
        },

        /**
         * Event handler for clicking on the links in filter module.
         * Using event delegation.
         */
        modulesClickHandler: function(event) {
            var target = event.target;

            event.stopPropagation();
            event.preventDefault();

            if (target.hasAttribute('href')) {
                self.view.toggleCheckbox(target);
            }
        },

        /**
         * Get href attribute from object
         *
         * @param  {Object} object actual clicked link object
         * @return {String}        href attribute without query mark
         */
        getLink: function(object) {
            var link = '';

            if (!object.hasAttribute('href')) {
                return false;
            } else {
                link = object.href;
            }

            return link;
        },

        /**
         *
         *
         * Calling publisher to notify other components.
         *
         * @param  {Object} object Actual clicked object for data collection.
         */
        updateData: function(object) {
            var link = self.getLink(object);

            if (typeof link === 'string') {

                // Call publisher
                self.publishData(link);
            }
        },

        /**
         * Triggering sandbox publisher.
         *
         * @param  {Object} data Data object injection.
         */
        publishData: function(link) {

            // Notify Events Listing module that we need new data
            sb.notify({
                type: 'update-event-listing',
                data: link
            });

            // Notify preloader
            self.library.polling.start();

            // Calculate new spinner position
            self.view.updateSpinnerPosition();
        },

        /**
         * Triggered when there's a error in the ajax event listing
         */
        handleServerError: function() {
            if (self.isMenuVisible === true) {
                self.view.toggleMenu();
            }
        },

        /**
         * Method is returning actual Tags section height for spinner to be
         * positioned accurately.
         *
         * It's adding tags section height and filter headers height + 10px
         * so the spinner is not sticked to the headers but has small
         * gap in between.
         *
         * @param  {Object}    tagsHolder     Tags section object (Message coupling)
         * @param  {Object}    headersHolder  Headers object (Message coupling)
         * @return {Number}                   Tags section height (px).
         */
        getTagsSectionHeight: function(tagsHolder, headersHolder) {
            return sb.outerHeight(tagsHolder) + sb.outerHeight(headersHolder) + 10;
        },

        view: {

            updateElementBindings: function(){
                self.el.toggle = sb.find('.searchfilter__togglebtn')[0];
                self.el.filterContainer = sb.find('.searchfilter__holder')[0];
                self.el.mobileMenuContents = sb.find('.mobile-menu-contents')[0];
                self.el.pageContainer = sb.find('.container', document.body)[0];
                self.el.headers = sb.find("[data-action='toggle-filter']");
                self.el.filterTags = sb.find('[data-module="search-filter-tags"]');

                sb.bindElementEvents(self);
            },

            /**
             * To create checkbox like behavior for links
             *
             * @param  {Object} object Clicked object
             */
            toggleCheckbox: function(object) {
                if (typeof object === 'object' && object !== null) {

                    if (sb.hasClass(object, self.isChecked)) {

                        sb.removeClass(object, self.isChecked);
                    } else {

                        sb.addClass(object, self.isChecked);
                    }

                    /**
                     * Send object for data extraction
                     */
                    self.updateData(object);
                }
            },

            /**
             * Shows or hides the filter area. On mobile, this means the right-hand-side menu. On
             * desktop, this means the boxes above the search area.
             *
             * @returns {boolean|.searchFilter.isMenuVisible}
             */
            toggleMenu: function (){
                var contents;

                if (self.isMenuVisible){
                    self.isMenuVisible = false;

                    if (self.isMobileMenuVisible){
                        contents = sb.find('.mobilemenu--right', document.body)[0].innerHTML;

                        self.el.mobileMenuContents.innerHTML = contents;

                        self.view.hideMobileMenu();

                        self.view.updateElementBindings();
                    }

                    sb.addClass(self.el.filterContainer, self.mobileMenuToggleClass);

                } else {

                    self.isMenuVisible = true;

                    sb.removeClass(self.el.filterContainer, self.mobileMenuToggleClass);

                    if (sb.checkMatchMedia('smallScreen') &&
                        typeof self.el.filterContainer !== "undefined"){

                        contents = self.el.mobileMenuContents.innerHTML;
                        self.el.mobileMenuContents.innerHTML = '';

                        self.view.showMobileMenu(contents);
                    }
                }

                return self.isMenuVisible;
            },

            /**
             * Binds a click handler to the main document when the mobile menu is open, used to hide
             * it again. This click handler will only be bound when the menu is open.
             *
             * @param {Boolean}     shouldListen        Toggle listening on or off
             */
            shouldListenForContainerClicks: function(shouldListen){
                if (shouldListen === true){
                    sb.addEvent(self.el.pageContainer, 'click' , self.clickToggle);
                } else {
                    sb.removeEvent(self.el.pageContainer, 'click', self.clickToggle);
                }
            },

            /**
             * Displays the filter area in a mobile menu, coming in from the page right
             *
             * @param       html        Appends the mobile menu to the document body
             * @return      {Boolean}   True if the menu is visible
             */
            showMobileMenu: function(html){
                var body = sb.find(document.body, document)[0],
                    container = sb.create_element('div', {'class': 'mobilemenu--right'}),
                    titleElement;

                container.innerHTML = html;

                body.appendChild(container);

                sb.addClass(self.el.pageContainer, 'is-mobilemenuopen');

                self.view.shouldListenForContainerClicks(true);

                titleElement = sb.find('.searchfilter__togglebtn--mobiletitle', document.body);
                sb.addEvent(titleElement, 'click', self.view.toggleMenu);

                self.isMobileMenuVisible = true;

                self.updateElements();

                return self.isMenuVisible;
            },

            /**
             * Hides the mobile menu that is shown with showMobileMenu
             *
             * @return      {Boolean}   False if the menu is correctly hidden
             */
            hideMobileMenu: function(){
                // Remove the menu dom element
                sb.remove(sb.find('.mobilemenu--right', document));

                // Class management
                sb.addClass(self.el.filterContainer, self.mobileMenuToggleClass);
                sb.removeClass(self.el.pageContainer, 'is-mobilemenuopen');

                // When the menu is open, clicking on the left would close the menu
                self.view.shouldListenForContainerClicks(false);

                self.isMobileMenuVisible = false;

                self.updateElements();

                return self.isMenuVisible;
            },

            /**
             * When the mobile menu is open, we watch for resize events. If the user
             * moves from small-screen to large-screen, hide the mobile menu.
             */
            viewResized: function(){
                if (sb.checkMatchMedia('largeScreen') && self.isMobileMenuVisible){
                    self.view.toggleMenu();
                }
            },

            /**
             * Update the containers with new HTML
             *
             * @param data The json response containing HTML fragments for the new results and pagination
             */
            updateContents: function(data) {
                sb.foreach(self.el.dataHolder, function(index) {
                    var datafetch = self.el.dataHolder[index].getAttribute("data-fetch");

                    self.el.dataHolder[index].innerHTML = data.filters[datafetch];
                });

                // Check if module should hide itself
                self.view.shouldBeVisible();

                // Notify preloader
                self.library.polling.end();
            },

            /**
             * Method is checking if we have any results in tags module. If there
             * are no tags we are hiding whole module.
             */
            shouldBeVisible: function() {
                if (sb.find('a', self.el.filterTags).length === 0) {
                    sb.addClass(self.el.filterTags, 'is-hidden');
                } else {
                    sb.removeClass(self.el.filterTags, 'is-hidden');
                }
            },

            /**
             * Update CSS for spinner.
             */
            updateSpinnerPosition: function() {
                var spinner = sb.find('.inactiveOverlay');

                    sb.setCSS(spinner, {
                        "background-position": "50% " + self.getTagsSectionHeight(self.el.filterTags, self.el.headers) + "px"
                    });
            }
        },

        destroy: function() {
            self = null;
        }
    };
});
