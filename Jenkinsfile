@Library("PipelineIndraGlobalLibrary") _

def CLOUD = "karbon-k8s"
def TEAM="opepue"
properties(
    [buildDiscarder (
        logRotator(
            artifactDaysToKeepStr: '',
            artifactNumToKeepStr: '',
            daysToKeepStr: '',
            numToKeepStr: '5')
    )
])

def configCI = indraCI {
    cloud                          = CLOUD
    team                           = TEAM
    containerEngine                = "kaniko-jfrog"
    language                       = "angular"
    packageManager                 = "node-13"
    git                            = [
        credentials:                 "bitbucket-token"
    ]
    triggerStages                  = [
        Build:                      true,
        Test:                       true,
        Sonar:                      true,
        Kiuwan:                     false,
        Artifactory:                false,
        Docker:                     true,
    ]
    triggerStagesFeature           = [
        Build:                      true,
        Test:                       true,
        Sonar:                      true,
        Kiuwan:                     false,
        Artifactory:                false,
        Docker:                     false,
    ]
    triggerStagesTag               = [
        Build:                      true,
        Test:                       false,
        Sonar:                      true,
        Kiuwan:                     true,
        Artifactory:                true,
        Docker:                     true,
    ]
    triggerStagesPr                = [:]
    params                         = [
        SONAR_QUALITY:               false,
    ]
    paramsFeature                  = [
        SONAR_QUALITY:               false,
        DEBUG:                       true,
    ]
}
println ("configCI: ${configCI.failedStage}")

boolean deploy = true
def env
if (configCI.git.parentBranch == "tag" || configCI.git.branch.startsWith("release/Candidate"))  {
 env = "pre"
} else if (configCI.git.branch == "develop") {
 env = "dev"
} else if (configCI.git.branch.startsWith("release/qa")) {
 env = "qa"
} else {
    deploy = false
}

if ( deploy ) {
    def configCD = indraCD {
        cloud = CLOUD
        team = TEAM
        git = [
              credentials: "bitbucket-token",
        ]
        helm = [
            charts: [
                "helm-indra-generic-1" : [
                  		"helmPackage": "helm/indra-generic", "version": "1.2.4", "environment": env,
                		"valuesFile": "./helm_values/silogport-hmi-rke-mova-${env}.yaml"
                ] ,
            ]
        ]
        timeout = [
            "time": 1,
            "unit": "HOURS"
        ]
        timeoutStage = [
            "time": 30,
            "unit": "MINUTES"
        ]
        triggerStages = [
            Helm: true,
        ]
        triggerStagesTag = [
            Helm: true,
        ]
        params = [
            DEBUG: true,
            K8S_CREDENTIALS: "rancher-credentials-rke-mova",
            HELM_DRYRUN: false,
        ]
    }
    println ("configCD: ${configCD.failedStage}")
}
