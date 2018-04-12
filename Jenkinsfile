@Library("kununu@KUNTECH-2819-add-nukleus-client-gear") _

withEnv([
    "SERVICE_NAME=nukleus"
    ]) {
    ansiColor {
        timestamps {
            defaultPipeline.getSource()
            defaultPipeline.runJsLint()
        }
    }
}
