import fs from '@skpm/fs'

const METADATA_FILENAME = '.idsmetadata.json'
const METADATA_STORAGE_FILEPATH = './Contents/Sketch/metadata'
const METADATA_FILEPATH = METADATA_STORAGE_FILEPATH + METADATA_FILENAME
const RECENT_PROJECTS_MAX_LENGTH = 5

export const readMetadata = () => {
	const filedata = fs.readFileSync(METADATA_FILEPATH).toString('utf-8')
	return JSON.parse(filedata)
}

export const writeMetadata = (mergeFunction) => {
	const metadata = readMetadata()
	const newMetadata = mergeFunction(metadata)

	fs.writeFileSync(METADATA_FILEPATH, JSON.stringify(newMetadata, null, '\t'))
}

export const writeRecentProjectMetadata = (project) => {
	const { filepath } = project
	let { recentProjects } = readMetadata()
	recentProjects = recentProjects || []
	const otherRecentProjects = recentProjects.filter((recentProject) => recentProject.filepath !== filepath)
	const newRecentProjects = [ project, ...otherRecentProjects ]

	if (newRecentProjects.length > RECENT_PROJECTS_MAX_LENGTH) {
		newRecentProjects.length = RECENT_PROJECTS_MAX_LENGTH
	}

	writeMetadata((metadata) => ({ ...metadata, recentProjects: newRecentProjects }))
	return newRecentProjects
}
