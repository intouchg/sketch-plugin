import fs from '@skpm/fs'

const METADATA_FILENAME = '.idsmetadata.json'
const METADATA_FILEPATH = './metadata/' + METADATA_FILENAME
const RECENT_PROJECTS_MAX_LENGTH = 5

if (!fs.existsSync(METADATA_FILEPATH)) {
	fs.writeFileSync(METADATA_FILEPATH, JSON.stringify({}))
}

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
	const { recentProjects } = readMetadata()
	const projectIndex = recentProjects.findIndex((recentProject) => recentProject.filepath === filepath)
	const otherRecentProjects = projectIndex === -1 ? recentProjects : recentProjects.splice(projectIndex, 1)
	const newRecentProjects = [ project, ...otherRecentProjects ]

	if (newRecentProjects.length > RECENT_PROJECTS_MAX_LENGTH) {
		newRecentProjects.length = RECENT_PROJECTS_MAX_LENGTH
	}

	writeMetadata((metadata) => ({ ...metadata, recentProjects: newRecentProjects }))
	return newRecentProjects
}
