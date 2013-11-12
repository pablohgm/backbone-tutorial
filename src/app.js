/**
 * Created with JetBrains PhpStorm.
 * User: pablo
 * Date: 11/12/13
 * Time: 11:20 AM
 * To change this template use File | Settings | File Templates.
 */

(function($){

    var MoviesList = Backbone.View.extend({

        el: '.page',

        initialize: function(){
//            _.bindAll(this, 'render');
//            this.render();
        },

        render: function(){
            debugger;
            console.log('movies list render loading ...');
            this.$el.html("Movies list comming soon");
        }
    });

    var moviesList = new MoviesList();



    var Router = Backbone.Router.extend({
        routes: {
            "":"home"
        }
    });

    var router = new Router();

    router.on("route:home", function(){
        console.log("home route loading ....");
        moviesList.render();
    });

    Backbone.history.start();

})(jQuery)
