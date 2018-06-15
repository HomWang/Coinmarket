import Bus from '~/plugins/bus';
import {pending} from '~/plugins/request';

export default function ({isHMR, app, store, route, params, error, redirect}) {

  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  // 不含有lang的路由进行重定向
  if(!route.path.includes(`/${store.state.locale}`) && store.state.locale!==app.i18n.fallbackLocale) {
    let UrlPathArray = route.path.split('/')[1];
    let url = '';
    if(UrlPathArray.indexOf("_") !== -1 ){
      url = route.path.replace(UrlPathArray, store.state.locale);
    }else{
      url = `/${store.state.locale}${route.path}`;
    }
    console.log('redirect to: ', url);
    return redirect(url);
  } else {
    Bus.$on('page-changing', () => {
      console.log('requests is going to be canceled');
      for(let i in pending) {
        pending[i].cancel();
        pending.splice(i, 1);
      }
    });
    Bus.$emit('page-changing');
  }
}
