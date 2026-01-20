export const RelationType = {
	IS_A: 'is_a',
	BASED_ON: 'based_on',
	USES: 'uses',
	MODELS: 'models',
	OBSERVED_BY: 'observed_by',
	IMPLEMENTS: 'implements',
	INCLUDES_ROLE: 'includes_role',
	STANDARDIZES: 'standardizes',
	DESCRIBES: 'describes',
	BUILT_USING: 'built_using',
	APPLIES_TO: 'applies_to',
} as const

export type RelationType = (typeof RelationType)[keyof typeof RelationType]

export interface IRelation {
	id: number
	from_term_id: number
	to_term_id: number
	relation_type: RelationType
}
export interface IDefinition {
	id: number
	term: string
	definition: string
	source: string
	links_to: IRelation[]
	links_from: IRelation[]
}

export interface RelationRead {
	id: number
	from_term_id: number
	to_term_id: number
	relation_type: string
}

export interface TermWithRelations {
	id: number
	term: string
	definition: string
	source: string
	links_to: RelationRead[]
	links_from: RelationRead[]
}
