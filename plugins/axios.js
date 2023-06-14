export default function (ctx, inject) { 
    const token = ctx.app.$cookies.get('token');
    if (token !== undefined && token !== "") {
      ctx.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
  }