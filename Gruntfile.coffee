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
      all:["*.js"]
      options :
        jshintrc : ".jshintrc"
    watch:
      files :["test/*.js","*.js"]
      tasks : ["default"]
      #options :
        #interrupt : true

  ########
  # regist
  ########

  grunt.registerTask 'test', ['simplemocha']
  grunt.registerTask 'w', ['default',"watch"]
  grunt.registerTask 'default', ['jshint', 'test']
