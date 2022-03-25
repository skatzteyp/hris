# HRIS Frontend

## Requirements
1. Node
2. Npm / Yarn

## Installation
1. Run `yarn rmrf:install`
2. Copy .env.development to .env `cp .env.development .env`

## Development
1. Run `yarn start`
2. Always update UI module using `npm update @ligph/ui`.

## Rules

### Git Flow
1. Follow [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow.
2. Feature branch name should follow format `feature/{issue-name}`.
3. Assign merge requests to Sigmund.

### Styles
1. Use [Tailwind CSS](https://tailwindcss.com/) classes if possible.
2. Minimize usage of custom classes.
3. Use [SMACSS](http://smacss.com/) notation when using custom classes.

### Redux
1. Follow [Redux Ducks](https://github.com/erikras/ducks-modular-redux) pattern.
2. Use [Redux Sage](https://redux-saga.js.org/) for async calls.
3. Use battlecry generator to generate modules `npx battlecry g duck <module> <actionName>`

## Sitemap

Home - /
Recruitment System - /recruitment
Training & Development - /training
Payroll - /payroll
Time and Attendance - /attendance
HR Analytics - /reports
Workforce Management - /workforce
  Performance Management
  Talent Management

