# entrypoint.sh
echo "window.env = {
  VITE_REACT_APP_API_BASE_URL: \"$VITE_REACT_APP_API_BASE_URL\"
};" > /usr/share/nginx/html/config.js

nginx -g 'daemon off;'
