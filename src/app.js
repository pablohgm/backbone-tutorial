/**
 * Created with JetBrains PhpStorm.
 * User: pablo
 * Date: 11/12/13
 * Time: 11:20 AM
 * To change this template use File | Settings | File Templates.
 */

(function($){

    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.url = 'http://api.rottentomatoes.com/api/public/v1.0' + options.url;
        options.crossDomain = true;
    });

    var Movies = Backbone.Collection.extend({
        url:'/lists/movies/opening.jsonp?apikey=dqp76c8udzu7qdr8ps2j9d6b'
    });

    var MoviesList = Backbone.View.extend({

        el: '.page',

        initialize: function(){
//            _.bindAll(this, 'render');
//            this.render();
        },

        render: function(){
            console.log('movies list render loading ...');
            var that = this;
            var movies = new Movies();
            movies.fetch({
                dataType: 'jsonp',
                success: function(argResult){
                    var template = _.template($('#movie-list-template').html(), {movies: argResult.models[0].attributes.movies});
                    that.$el.html(template);
                }
            });
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
