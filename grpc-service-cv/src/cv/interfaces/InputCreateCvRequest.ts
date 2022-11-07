export interface EducationCertificationInput {
  name?: string;

  time?: string;

  major?: string;
}

export interface WorkExperienceInput {
  time?: string;

  company: string;

  jobTitle?: string;

  jobDescription?: string;
}

export interface ExperienceProjectInput {
  name?: string;

  time?: string;

  projectDescription?: string;

  role?: string;

  responsibilities?: string;

  programmingLanguages?: string;

  workExperience: WorkExperienceInput;
}

export interface InputCreateCvRequest {
  name: string;
  gender: string;
  nationality: string;
  objective?: string;
  summary?: string;
  userId: number;
  educationCertifications?: [EducationCertificationInput];
  workExperiences?: [WorkExperienceInput];
  experienceProjects?: [ExperienceProjectInput];
}
