@Library("kununu") _

withEnv([
    "SERVICE_NAME=nukleus",
    "COVERAGE_DIR_EXPORT=/app/coverage"
    ]) {
    ansiColor {
        timestamps {
            defaultPipeline.getSource()
            defaultPipeline.prepareNodeContainer()
            defaultPipeline.runJsLint()
            defaultPipeline.runJslibTests()
            defaultPipeline.runSonar("js")
            defaultPipeline.destroyNodeContainer()
        }
    }
}
