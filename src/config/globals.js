export const PARSE_APP_ID = "lgnd-backend-qa";
export const PARSE_JS_KEY = "some_key_generated";
export const PARSE_SERVER_URL = "https://lgnd-backend-qa.herokuapp.com/parse";
// export const PARSE_SERVER_URL = 'http://localhost:1337/parse';
// export const PARSE_SERVER_URL = 'http://10.1.10.36:1337/parse'; // Mary's laptop
export const APPLICATION_ID = "lgnd-backend-qa";

// stripe
export const STRIPE_CONNECT_URI =
  "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_CWnnChyBbrohr1QnaAfVAsfZ4i1qwlv7&scope=read_write";
export const STRIPE_REDIRECT_URI = process.env.NODE_ENV
  ? "http://stubbin-admin.herokuapp.com"
  : "http://localhost:8080";
// export const STRIPE_PUBLISHABLE_KEY = "pk_live_yGypB9ntjMqHZF8pAUISSuw7";
// TODO: switch out stripe key to live when publishing
export const STRIPE_PUBLISHABLE_KEY = "pk_test_x2SdAkZYRGiVfrlsgE3Y4GgP";
// TODO: switch out key
// Google Places
export const GOOGLE_PLACES_KEY = "AIzaSyA_mi2ju5W9aEYZMjZZbMsX0XzzP3dRuZw";
