import type { AzureGitRepo } from '@i/azure'

export type AzureCredentials = {
    username: string
    accessToken: string
}

export type AzureGitRepos = {
    [organizationName: string]: AzureGitRepo[]
}
