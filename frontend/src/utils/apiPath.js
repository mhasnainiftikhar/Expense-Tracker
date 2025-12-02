export const BASE_URL = 'http://localhost:5000';

// Utils Paths
export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        PROFILE: '/api/v1/auth/profile',
       
    },
    INCOME: {
        ADD: '/api/v1/income/add',
        ALL: '/api/v1/income/all',
        DELETE: (id) => `/api/v1/income/${id}`,
        DOWNLOAD_EXCEL: '/api/v1/income/download'
    },
    EXPENSE: {
        ADD: '/api/v1/expense/add',
        ALL: '/api/v1/expense/all',
        DELETE: (id) => `/api/v1/expense/${id}`,
        DOWNLOAD_EXCEL: '/api/v1/expense/download'
    },
    DASHBOARD: {
        GET_DATA: '/api/v1/dashboard/data',
    },
    IMAGE:{
         UPLOAD_IMAGE: '/api/v1/auth/upload-image'
    }

};
