import gql from 'graphql-tag';

const GET_APPLICATION_REPORT_QUERY = gql`
  query getApplicantReport {
    applicantReport: getApplicantReport {
    	getTotalHired {
        year
        month
        week
        total
      }
      getTotalInProcess {
        year
        month
        week
        total
      }
      getTotalFallouts {
        year
        month
        week
        total
      }
      getTotalBySource
  	}
  }
`;

export const queries = {
  GET_APPLICATION_REPORT_QUERY
};
