import type { OfficeStoryInput } from '../office/shema';

export const RedFlagsDisplayNames = {
	payment: {
		starvingSalary: 'Starving salary',
		unpaidOvertime: 'Unpaid overtime',
		unclearConditions: 'Unclear salary conditions',
		unpaidInternship: 'Unpaid internship',
		delayedSalary: 'Delayed payment',
		lowerSalary: 'Salary lower than agreed upon',
		noRaise: 'Getting a raise is impossible',
		unpaidExpenses: 'Unpaid expenses'
	},
	projects: {
		boringProjects: 'Boring projects',
		monotonousWork: 'Monotonous job',
		cheapProjects: 'Cheap projects, forced basic design or materials',
		workOutsideJobDescription: 'Work outside of job description (eg. admin work or coffe making)',
		unrealisticDeadlines: 'Unrealistic deadlines'
	},
	career: {
		noRoomForDevelopement: 'No room for self development',
		glassCeiling: 'Glass ceiling',
		experience: "Can't gain (meaningful) professional experience",
		lowResponsibility: 'Too little responsibility',
		highResponsibility: 'Too much responsibility'
	},
	tools: {
		missingLicense: 'Missing or student software license',
		offbrandSoftware:
			'Using free off-brand counterparts of popular software (eg. BlockCad or Photopea)',
		oldComputersOrOutdatedSoftware: 'Old hardware or outdated software',
		privateTools: 'Necessary to use private computer',
		badMaterials: 'Lacking or insufficient drawing and modelmaking materials',
		badWorkspace: 'Bad workspace (eg. broken chair, tiny desk, office in basement wihout windows)'
	},
	'management and team': {
		mobbing: 'Mobbing or abuse',
		toxicAtmoshpere: 'Toxic atmosphere',
		incompetentManagement: 'Incompetent management',
		favoritism: 'Favoritism or ass-kiss mentality',
		teamMadeOutOfInterns: 'Interns make up majority of the workforce',
		bossNarcissist: 'Delusional, egocentric, narcissistic boss',
		stress: 'Stressful environment, work under pressure'
	},
	time: {
		casualOvertime: 'Casual overtime (less then 4h/week)',
		systematicOvertime: 'Systematic overtime (over 4h/week)',
		weekendWork: 'Work on weekends or public holidays',
		deniedTimeOff: 'Denied time off'
	},
	'phobias and ~isms': {
		xenophobia: 'Xenophobia',
		racism: 'Racism',
		sexism: 'Sexism',
		homophobia: 'Homophobia',
		transphobia: 'Transphobia',
		ageism: 'Ageism',
		ableism: 'Ableism',
		otherPhobias: 'Other'
	}
};

export type RedFlagsCategories = keyof typeof RedFlagsDisplayNames;

export type RedFlagsValues = {
	[k in keyof typeof RedFlagsDisplayNames]: {
		[key in keyof typeof RedFlagsDisplayNames[k]]: boolean;
	};
};

export type SurveyInput = OfficeStoryInput & { redFlags: string[] };
