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

    //////////////////////////

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
            var that = this;
            var movies = new Movies();
            movies.fetch({
                dataType: 'jsonp',
                success: function(argResult){
                    var buildTemplate = Handlebars.compile(  $('#movie-list-template').html() );
                    var tmpHtml = buildTemplate( {movies: argResult.models[0].attributes.movies} );
                    that.$el.html( tmpHtml );
                }
            });
        },

        afterRender: function () {

        }
    });

    var moviesList = new MoviesList();

    /////////////////////////

    var Movie = Backbone.Model.extend({
        urlRoot:"/movies/{0}.jsonp?apikey=dqp76c8udzu7qdr8ps2j9d6b",
        url: function(){
            console.log("into url override function");
            var formatUrl = _.format(this.urlRoot, this.id);
            return formatUrl;
        }
    });

    var MovieDetail = Backbone.View.extend({

        el:'.page',

        initialize: function(){

        },

        render: function(argOptions){
            var that = this;
            var movie = new Movie({id: argOptions.id});
            movie.fetch({
                dataType: 'jsonp',
                success: function(argResult){
                    var buildTemplate = Handlebars.compile(  $('#movie-detail-template').html() );
                    var tmpHtml = buildTemplate( {movie: argResult.attributes} );
                    that.$el.html( tmpHtml );
                }
            });
        }
    });

    var movieDetail = new MovieDetail();

    //// Routes ///

    var Router = Backbone.Router.extend({
        routes: {
            "":"home",
            "detail/:id":"detail"
        }
    });

    var router = new Router();

    router.on("route:home", function(){
        console.log("home route loading ....");
        moviesList.render();
    });

    router.on("route:detail", function(argId){
        console.log("detail route loading ....");
        movieDetail.render({id: argId});
    });

    Backbone.history.start();

})(jQuery)
