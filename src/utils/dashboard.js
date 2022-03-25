import { routes } from './routes';
import { ReactComponent as IconDashboard } from '../assets/images/icon-dashboard.svg';
import { ReactComponent as IconApplicant } from '../assets/images/icon-applicant.svg';
import { ReactComponent as IconReports } from '../assets/images/icon-reports.svg';
import { ReactComponent as IconTrainingTopics } from '../assets/images/icon-training-topics.svg';
import { ReactComponent as IconMyResults } from '../assets/images/icon-my-results.svg';
import { ReactComponent as IconHelpfulArticles } from '../assets/images/icon-helpful-articles.svg';
import { ReactComponent as IconCap } from '../assets/images/icon-cap.svg';
import { ReactComponent as IconBriefcase } from '../assets/images/icon-briefcase.svg';


const menuItems = {
  recruitment: [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: IconDashboard,
      link: routes.recruitment.dashboard
    },
    {
      name: 'applicants',
      label: 'Applicants',
      icon: IconApplicant,
      link: routes.recruitment.applicantList,
    },
    {
      name: 'reports',
      label: 'Reports',
      icon: IconReports,
      link: routes.recruitment.reports
    }
  ],
  training: [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: IconDashboard,
      link: routes.training.dashboard
    },
    {
      name: 'training-topics',
      label: 'Training Topics',
      icon: IconTrainingTopics,
      link: routes.training.trainingList
    },
    {
      name: 'results',
      label: 'My Results',
      icon: IconMyResults,
      link: routes.training.results
    },
    {
      name: 'articles',
      label: 'Helpful Articles',
      icon: IconHelpfulArticles,
      link: routes.training.articles
    }
  ],
  admin: [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: IconDashboard,
      link: routes.admin.dashboard
    },
    {
      name: 'atsadmin',
      label: 'ATS Admin',
      icon: IconBriefcase,
      link: '#',
      submenu: [
        {
          name: 'fields',
          label: 'Customization',
          link: routes.admin.customization
        },
        {
          name: 'edit-forms',
          label: 'Edit Forms',
          link: routes.admin.editForms
        },
      ]
    },
    {
      name: 'lmsadmin',
      label: 'LMS Admin',
      icon: IconCap,
      link: '#',
      submenu: [
        {
          name: 'applications',
          label: 'Application List',
          link: routes.admin.applicationList
        },
        {
          name: 'onboarding',
          label: 'Onboarding Setup',
          link: routes.admin.onboardingList
        },
        {
          name: 'trainings',
          label: 'Training Topics',
          link: routes.admin.trainingList
        },
        {
          name: 'curriculums',
          label: 'Training Curriculum',
          link: routes.admin.curriculumList
        },
      ]
    },
  ],
  personnel: [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: IconDashboard,
      link: routes.personnel.dashboard
    },
    {
      name: 'list',
      label: 'Employee List',
      icon: IconApplicant,
      link: routes.personnel.list
    },
    {
      name: 'documents',
      label: 'Documents',
      icon: IconReports,
      link: routes.personnel.documents
    },
    {
      name: 'reports',
      label: 'Reports',
      icon: IconDashboard,
      link: routes.personnel.reports
    }
  ]
};

const getMenu = (type, active, subActive) => {
  return menuItems[type].map((item) => {
    if(subActive) {
      if(item.submenu) {
        item.submenu.map((i) => {
          return i.active = i.name === subActive ? true : false
        })
      }
    }
    return {
      ...item,
      active: item.name === active ? true : false
    }
  });
}

export const dashboard = {
  getMenu
};
