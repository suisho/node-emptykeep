module.exports = (grunt) ->
  ########
  # load 
  ########
  grunt.loadNpmTasks 'grunt-simple-mocha'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  ########
  # init 
  ########
  grunt.initConfig
    simplemocha:
      all : 
        src :"test/*.js"
        options :
          reporter: "nyan"
    jshint : 
      all:["test/*.js","*.js"]
      options : 
        node : true
    watch:
      files :["test/*.js","*.js"]
      tasks : ["default"]
  ########
  # regist
  ########
  grunt.registerTask 'default', ['jshint', 'simplemocha']
  grunt.registerTask 'test', ['simplemocha']
  grunt.registerTask 'w', ['default',"watch"]
