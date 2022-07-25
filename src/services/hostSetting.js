var url = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "http://forefront.hashroot.in/server";
} else {
    url = "http://forefront.hashroot.in/server";
}

export const API_BASE_URL = url;
