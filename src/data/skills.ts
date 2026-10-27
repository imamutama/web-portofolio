export interface SkillGroup {
  group: string;
  items: string[];
}

// Grouped for presentation, derived from the CV's flat skill list.
// Normalizations: "Bitbucket / Actions" -> "Bitbucket Pipelines" (+ GitHub Actions, confirmed
// by the Alami Sharia bullet), "Test Rails" -> "TestRail" (typo), "AI Agent" kept as-is.
export const skillGroups: SkillGroup[] = [
  {
    group: 'Automation',
    items: ['Playwright', 'Cypress', 'WebdriverIO', 'Selenium', 'Appium', 'Katalon Studio'],
  },
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Java'] },
  { group: 'API & Performance', items: ['RestAssured', 'K6', 'Gatling'] },
  { group: 'Test Design', items: ['Cucumber BDD', 'TestNG', 'Mocha-Chai'] },
  {
    group: 'CI/CD & Tooling',
    items: ['GitHub Actions', 'Bitbucket Pipelines', 'Git', 'Atlassian JIRA', 'TestRail'],
  },
  { group: 'AI & Innovation', items: ['AI Agent', 'AI-assisted test automation'] },
];
