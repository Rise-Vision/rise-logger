/* global require */

( function( console ) {
  "use strict";

  var bower = require( "gulp-bower" ),
    bump = require( "gulp-bump" ),
    del = require( "del" ),
    eslint = require( "gulp-eslint" ),
    gulp = require( "gulp" ),
    runSequence = require( "run-sequence" ),
    wct = require( "web-component-tester" ).gulp.init( gulp ); // eslint-disable-line

  gulp.task( "clean-bower", function( cb ) {
    del( [ "./bower_components/**" ], cb );
  } );

  gulp.task( "lint", function() {
    return gulp.src( [ "./*.js", "test/**/*.html" ] )
      .pipe( eslint() )
      .pipe( eslint.format() )
      .pipe( eslint.failAfterError() );
  } );

  // ***** Primary Tasks ***** //
  gulp.task( "bower-clean-install", [ "clean-bower" ], function( cb ) {
    return bower().on( "error", function( err ) {
      console.log( err );
      cb();
    } );
  } );

  gulp.task( "bump", function() {
    return gulp.src( [ "./package.json", "./bower.json" ] )
      .pipe( bump( { type: "patch" } ) )
      .pipe( gulp.dest( "./" ) );
  } );

  gulp.task( "test", function( cb ) {
    runSequence( "test:local", cb );
  } );

  gulp.task( "build", function( cb ) {
    runSequence( "lint", cb );
  } );

  gulp.task( "default", [], function() {
    console.log( "********************************************************************".yellow );
    console.log( "  gulp bower-clean-install: delete and re-install bower components".yellow );
    console.log( "  gulp bump: increment the version".yellow );
    console.log( "  gulp test: run unit and integration tests".yellow );
    console.log( "  gulp build: build component".yellow );
    console.log( "********************************************************************".yellow );
    return true;
  } );

} )( console );
