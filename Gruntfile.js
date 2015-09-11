module.exports = function (grunt) {


    // Project configuration.
    grunt.initConfig({
        pkg     : grunt.file.readJSON( 'package.json' ),
		prompt: {
		  target: {
			options: {
			  questions: [
				{
				  config: 'github-release.options.auth.user', // set the user to whatever is typed for this question
				  type: 'input',
				  message: 'GitHub username:'
				},
				{
				  config: 'github-release.options.auth.password', // set the password to whatever is typed for this question
				  type: 'password',
				  message: 'GitHub password:'
				}
			  ]
			}
		  }
		},
		replace: {
            core_file: {
                src: [ 'versionfile.txt' ],
                overwrite: true,
                replacements: [{
                    from: /Version:\s*(.*)/,
                    to: "Version: <%= pkg.version %>"
                }]
            }
        },
		 'github-release': {
		  options: {
			repository: 'No3x/testrepo',
			release: {
				tag_name: 'release/<%= pkg.version %>',
				name: 'v<%= pkg.version %>',
			  body: 'Description of the release'
			}
		  },
		  files: {
			src: ['release.zip']
		  }
		},
    });

    //load modules
	grunt.loadNpmTasks( 'grunt-prompt' );  
    grunt.loadNpmTasks( 'grunt-text-replace' );  
	grunt.loadNpmTasks( 'grunt-github-releaser' );
	
    //register default task
    grunt.registerTask( 'release', [ 'prompt', 'replace:core_file', 'github-release' ] );


};