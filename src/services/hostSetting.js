var url = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "https://one.autowelkin.com/server";
} else {
    url = "https://one.autowelkin.com/server";
}

export const API_BASE_URL = url;
