export const mockBuilds = [
		{id : "0ujsszwN8NRY24YaXiTIE2VWDTS", name: "maven-samples", status: "OK", time: "1551957395", duration: "56000",
            log: `[INFO] Scanning for projects...
[WARNING] 
[WARNING] Some problems were encountered while building the effective model for com.example.maven-samples:server:jar:1.0-SNAPSHOT
[WARNING] Reporting configuration should be done in <reporting> section, not in maven-site-plugin <configuration> as reportPlugins parameter.
[WARNING] 
[WARNING] Some problems were encountered while building the effective model for com.example.maven-samples:webapp:war:1.0-SNAPSHOT
[WARNING] Reporting configuration should be done in <reporting> section, not in maven-site-plugin <configuration> as reportPlugins parameter.
[WARNING] 
[WARNING] Some problems were encountered while building the effective model for com.example.maven-samples:multi-module-parent:pom:1.0-SNAPSHOT
[WARNING] Reporting configuration should be done in <reporting> section, not in maven-site-plugin <configuration> as reportPlugins parameter. @ line 51, column 24
[WARNING] 
[WARNING] Some problems were encountered while building the effective model for com.example.maven-samples:single-module-project:jar:1.0-SNAPSHOT
[WARNING] Reporting configuration should be done in <reporting> section, not in maven-site-plugin <configuration> as reportPlugins parameter. @ line 53, column 24
[WARNING] 
[WARNING] It is highly recommended to fix these problems because they threaten the stability of your build.
[WARNING] 
[WARNING] For this reason, future Maven versions might no longer support building such malformed projects.
[WARNING] 
[WARNING] The project com.example.maven-samples:multi-module-parent:pom:1.0-SNAPSHOT uses prerequisites which is only intended for maven-plugin projects but not for non maven-plugin projects. For such purposes you should use the maven-enforcer-plugin. See https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html
[WARNING] The project com.example.maven-samples:single-module-project:jar:1.0-SNAPSHOT uses prerequisites which is only intended for maven-plugin projects but not for non maven-plugin projects. For such purposes you should use the maven-enforcer-plugin. See https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html
[WARNING] The project com.example.maven-samples:parent:pom:1.0-SNAPSHOT uses prerequisites which is only intended for maven-plugin projects but not for non maven-plugin projects. For such purposes you should use the maven-enforcer-plugin. See https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Build Order:
[INFO] 
[INFO] Multi Module Project Parent                                        [pom]
[INFO] Server                                                             [jar]
[INFO] Webapp                                                             [war]
[INFO] A Single Maven Module                                              [jar]
[INFO] Parent                                                             [pom]
[INFO] 
[INFO] -----------< com.example.maven-samples:multi-module-parent >------------
[INFO] Building Multi Module Project Parent 1.0-SNAPSHOT                  [1/5]
[INFO] --------------------------------[ pom ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ multi-module-parent ---
[INFO] 
[INFO] ------------------< com.example.maven-samples:server >------------------
[INFO] Building Server 1.0-SNAPSHOT                                       [2/5]
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ server ---
[INFO] Deleting /home/rasmus/tmp/maven-samples/multi-module/server/target
[INFO] 
[INFO] --- maven-resources-plugin:2.5:resources (default-resources) @ server ---
[debug] execute contextualize
[INFO] Using 'utf-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rasmus/tmp/maven-samples/multi-module/server/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.3.2:compile (default-compile) @ server ---
[INFO] Compiling 1 source file to /home/rasmus/tmp/maven-samples/multi-module/server/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:2.5:testResources (default-testResources) @ server ---
[debug] execute contextualize
[INFO] Using 'utf-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rasmus/tmp/maven-samples/multi-module/server/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.3.2:testCompile (default-testCompile) @ server ---
[INFO] Compiling 1 source file to /home/rasmus/tmp/maven-samples/multi-module/server/target/test-classes
[INFO] 
[INFO] --- maven-surefire-plugin:2.11:test (default-test) @ server ---
[INFO] Surefire report directory: /home/rasmus/tmp/maven-samples/multi-module/server/target/surefire-reports

-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running com.example.TestGreeter
Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.037 sec

Results :

Tests run: 2, Failures: 0, Errors: 0, Skipped: 0

[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ server ---
[INFO] Building jar: /home/rasmus/tmp/maven-samples/multi-module/server/target/server.jar
[INFO] 
[INFO] ------------------< com.example.maven-samples:webapp >------------------
[INFO] Building Webapp 1.0-SNAPSHOT                                       [3/5]
[INFO] --------------------------------[ war ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ webapp ---
[INFO] Deleting /home/rasmus/tmp/maven-samples/multi-module/webapp/target
[INFO] 
[INFO] --- maven-resources-plugin:2.5:resources (default-resources) @ webapp ---
[debug] execute contextualize
[INFO] Using 'utf-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rasmus/tmp/maven-samples/multi-module/webapp/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.3.2:compile (default-compile) @ webapp ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-resources-plugin:2.5:testResources (default-testResources) @ webapp ---
[debug] execute contextualize
[INFO] Using 'utf-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rasmus/tmp/maven-samples/multi-module/webapp/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.3.2:testCompile (default-testCompile) @ webapp ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.11:test (default-test) @ webapp ---
[INFO] No tests to run.
[INFO] Surefire report directory: /home/rasmus/tmp/maven-samples/multi-module/webapp/target/surefire-reports

-------------------------------------------------------
 T E S T S
-------------------------------------------------------

Results :

Tests run: 0, Failures: 0, Errors: 0, Skipped: 0

[INFO] 
[INFO] --- maven-war-plugin:2.2:war (default-war) @ webapp ---
[INFO] Packaging webapp
[INFO] Assembling webapp [webapp] in [/home/rasmus/tmp/maven-samples/multi-module/webapp/target/webapp]
[INFO] Processing war project
[INFO] Copying webapp resources [/home/rasmus/tmp/maven-samples/multi-module/webapp/src/main/webapp]
[INFO] Webapp assembled in [21 msecs]
[INFO] Building war: /home/rasmus/tmp/maven-samples/multi-module/webapp/target/webapp.war
[INFO] WEB-INF/web.xml already added, skipping
[INFO] 
[INFO] ----------< com.example.maven-samples:single-module-project >-----------
[INFO] Building A Single Maven Module 1.0-SNAPSHOT                        [4/5]
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ single-module-project ---
[INFO] Deleting /home/rasmus/tmp/maven-samples/single-module/target
[INFO] 
[INFO] --- maven-resources-plugin:2.5:resources (default-resources) @ single-module-project ---
[debug] execute contextualize
[INFO] Using 'utf-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rasmus/tmp/maven-samples/single-module/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.3.2:compile (default-compile) @ single-module-project ---
[INFO] Compiling 1 source file to /home/rasmus/tmp/maven-samples/single-module/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:2.5:testResources (default-testResources) @ single-module-project ---
[debug] execute contextualize
[INFO] Using 'utf-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rasmus/tmp/maven-samples/single-module/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.3.2:testCompile (default-testCompile) @ single-module-project ---
[INFO] Compiling 1 source file to /home/rasmus/tmp/maven-samples/single-module/target/test-classes
[INFO] 
[INFO] --- maven-surefire-plugin:2.11:test (default-test) @ single-module-project ---
[INFO] Surefire report directory: /home/rasmus/tmp/maven-samples/single-module/target/surefire-reports

-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running com.example.TestGreeter
Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.035 sec

Results :

Tests run: 2, Failures: 0, Errors: 0, Skipped: 0

[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ single-module-project ---
[INFO] Building jar: /home/rasmus/tmp/maven-samples/single-module/target/single-module-project.jar
[INFO] 
[INFO] ------------------< com.example.maven-samples:parent >------------------
[INFO] Building Parent 1.0-SNAPSHOT                                       [5/5]
[INFO] --------------------------------[ pom ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ parent ---
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for Parent 1.0-SNAPSHOT:
[INFO] 
[INFO] Multi Module Project Parent ........................ SUCCESS [  0.134 s]
[INFO] Server ............................................. SUCCESS [  1.430 s]
[INFO] Webapp ............................................. SUCCESS [  0.405 s]
[INFO] A Single Maven Module .............................. SUCCESS [  0.758 s]
[INFO] Parent ............................................. SUCCESS [  0.001 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.871 s
[INFO] Finished at: 2019-03-07T12:32:26+01:00
[INFO] ------------------------------------------------------------------------
`
        },
		{id : "0ujsswThIGTUYm2K8FjOOfXtY1K", name: "mock-project-success", status: "OK", time: "1551957400", duration: "32000"},
		 {id : "0ujsswThIGTUYm2K8FjOOfXtY1F", name: "mock-project-failed", status: "FAILED", time: "1551957800", duration: "302000", log: "bash: mimikatz: command not found"}
	];
