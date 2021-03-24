import fs from '@skpm/fs'
import os from '@skpm/os'
import path from '@skpm/path'

export const METADATA_FILENAME = '.idsmetadata.json'
const METADATA_STORAGE_FILEPATH = path.resolve('./metadata/')
const METADATA_FILEPATH = path.resolve(METADATA_STORAGE_FILEPATH, METADATA_FILENAME)
const RECENT_PROJECTS_MAX_LENGTH = 5

const INITIAL_NEW_METADATA = {
	azureUsername: '',
	azureAccessToken: '',
	recentProjects: [],
	settings: {
		// This is the default location that new and downloaded projects
		// will be saved, if the user does not change the save location.
		defaultSaveDirectory: path.resolve(os.homedir(), 'Projects'),
		skipImportSummary: false,
	},
}

export const readMetadata = () => {
	try {
		const filedata = fs.readFileSync(METADATA_FILEPATH).toString()
		return JSON.parse(filedata)
	}
	catch (error) {
		console.error(error)
	}
}

export const writeMetadata = (mergeFunction) => {
	const metadata = readMetadata()
	const newMetadata = mergeFunction(metadata)

	fs.writeFileSync(METADATA_FILEPATH, JSON.stringify(newMetadata, null, '\t'))
}

export const readAzureCredentialsMetadata = () => {
	const { azureUsername, azureAccessToken } = readMetadata()
	return {
		username: azureUsername || '',
		accessToken: azureAccessToken || '',
	}
}

export const writeAzureCredentialsMetadata = ({ username, accessToken }) => {
	writeMetadata((metadata) => ({
		...metadata,
		azureUsername: username || '',
		azureAccessToken: accessToken || '',
	}))
}

export const readRecentProjectMetadata = () => {
	const { recentProjects } = readMetadata()
	return recentProjects || []
}

export const writeRecentProjectMetadata = (project) => {
	const { filepath } = project
	const recentProjects = readRecentProjectMetadata()
	const otherRecentProjects = recentProjects.filter((recentProject) => recentProject.filepath !== filepath)
	const newRecentProjects = [ project, ...otherRecentProjects ]

	if (newRecentProjects.length > RECENT_PROJECTS_MAX_LENGTH) {
		newRecentProjects.length = RECENT_PROJECTS_MAX_LENGTH
	}

	writeMetadata((metadata) => ({ ...metadata, recentProjects: newRecentProjects }))
	return newRecentProjects
}

export const refreshRecentProjectMetadata = () => {
	const recentProjects = readRecentProjectMetadata()
	const existingRecentProjects = recentProjects.filter(({ filepath }) => fs.existsSync(filepath))
	writeMetadata((metadata) => ({ ...metadata, recentProjects: existingRecentProjects }))
}

const validateMetadata = () => {
	if (!fs.existsSync(METADATA_STORAGE_FILEPATH)) {
		fs.mkdirSync(METADATA_STORAGE_FILEPATH, { recursive: true })
	}

	if (!fs.existsSync(METADATA_FILEPATH)) {
		fs.writeFileSync(METADATA_FILEPATH, JSON.stringify(INITIAL_NEW_METADATA))
	}

	writeMetadata((metadata) => ({
		...INITIAL_NEW_METADATA,
		...metadata,
		settings: {
			...INITIAL_NEW_METADATA.settings,
			...metadata.settings,
		},
	}))

	refreshRecentProjectMetadata()
}

validateMetadata()
