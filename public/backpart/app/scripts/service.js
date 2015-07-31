angular.module('backpartApp').factory('RecursionHelper', ['$compile', function($compile){
    return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: function(element, link){
            // Normalize the link parameter
            if(angular.isFunction(link)){
                link = { post: link };
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function(scope, element){
                    // Compile the contents
                    if(!compiledContents){
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function(clone){
                        element.append(clone);
                    });

                    // Call the post-linking function, if any
                    if(link && link.post){
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}]);
angular.module('backpartApp').factory('menuShow', function(){
    angular.element(".menu-background").click(function(){
        angular.element(this).addClass("hidden");
    });
    angular.element(".menu-background").bind('contextmenu', function(event) {
        event.preventDefault();
        event.stopPropagation();
        angular.element(this).addClass("hidden");
    });
    return function(type,loc){
        if(type== "menu1"){
            angular.element(".menu-background").removeClass("hidden");
            angular.element(".menu-background .menu-1").css({
                left:loc.x,
                top:loc.y
            });
        }
    };

});