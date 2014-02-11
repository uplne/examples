/**
 * Tests the search filter module
 *
 * @uses eventListing
 */
describe("Search Filter Module: ", function() {

    var sut,
        moduleId = 'search-filter',
        container;

    beforeEach(function() {
        sut = new SUT().setup({});

        container = jQuery('#' + moduleId);
    });

    afterEach(function() {
        if (document.body.contains(sut.container)) {
            document.body.removeChild(sut.container);
        }
        if (sut.clock.isInstalled()) {
            sut.clock.reset();
        }
    });

    describe("Menu toggling", function(){
        beforeEach(function(){
            container.affix(".searchfilter__holder");
        });

        it("Menu is hidden by default", function(){
            expect(sut.searchFilter.isMenuVisible).toBeFalsy();
        });

        it("Menu is opened by removing the is-closed class", function(){
            spyOn(sut.sandbox, 'removeClass');

            sut.searchFilter.view.toggleMenu();

            expect(sut.sandbox.removeClass).toHaveBeenCalled();
        });

        it("Menu is closed by adding the is-closed class", function(){
            spyOn(sut.sandbox, 'addClass');

            jQuery(sut.searchFilter.mobileMenuToggleClass).removeClass(sut.searchFilter.mobileMenuToggleClass);
            sut.searchFilter.isMenuVisible = true;
            sut.searchFilter.view.toggleMenu();

            expect(sut.sandbox.addClass).toHaveBeenCalled();
        });
    });

    describe("Event handling", function(){
        var toggleButton = ".searchfilter__togglebtn";

        beforeEach(function(){
            container.affix(toggleButton+'[data-action="toggle-filter"] .searchfilter__holder');
        });

        it("should toggle the menu when the filter button is clicked", function(){
            spyOn(sut.searchFilter, 'clickToggle');

            sut.searchFilter.view.updateElementBindings();

            jQuery(toggleButton).click();

            expect(sut.searchFilter.clickToggle).toHaveBeenCalled();
        });

        it("should hide the mobile menu on small screens if it is already visible", function(){
            spyOn(sut.sandbox, 'checkMatchMedia').andReturn(true);
            spyOn(sut.searchFilter.view, 'hideMobileMenu');

            sut.searchFilter.isMenuVisible = true;
            sut.searchFilter.isMenuVisible = true;
            sut.searchFilter.view.toggleMenu();

            expect(sut.searchFilter.view.hideMobileMenu).toHaveBeenCalled();
        });
    });

    describe("Spinner", function() {
        var template = null;

        beforeEach(function(){
            jQuery(container).affix('#search-filter-tags.searchfilter--tags');

            template = jQuery('#search-filter-tags');
        });

        it("should get actual height of tags holder", function() {
            spyOn(sut.searchFilter, "getTagsSectionHeight").andCallThrough();

            expect(sut.searchFilter.getTagsSectionHeight(template)).toEqual(jasmine.any(Number));
        });
    });
});
