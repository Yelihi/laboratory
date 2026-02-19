const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = '([^\\/]+)';
const TIMESTAMP = 250;

const NAV_A_SELECTOR = 'a[data-navigation]';

const extractUrlParams = (route, url) => {
  const params = {};

  if (route.params.length === 0) {
    return params;
  }

  const matches = url.match(route.testRegExp);

  matches.shift();

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index];
    params[paramName] = paramValue
  })

  return params;
}

export default () => {
  const routes = [];
  const router = {};
  const notFound = () => {};
  let lastUrl;

  const checkRoutes = () => {
    const { url } = window.location;

    if (lastUrl === url) {
      return;
    }

    lastUrl = url;

    const currentRoute = routes.find(route => {
      const { testRegExp } = route;
      return testRegExp.test(url);
    })

    if(!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, url);

    currentRoute.component(urlParams);
  }

  router.addRoute = (fragement, component) => {
    const params = [];

    const parsedFragement = fragement.replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
      params.push(paramName);
      return URL_FRAGMENT_REGEXP;
    }).replace(/\//g, '\\/');

    routes.push({
      testRegExp: new RegExp(`^${parsedFragement}$`),
      component,
      params,
    })

    return router;
  }

  router.setNotFound = (callback) => {
    notFound = callback;
    return router;
  }

  router.navigate = (fragment) => {
    window.history.pushState(null, null, fragment);
  }

  router.start = () => {
    checkRoutes()
    setInterval(checkRoutes, TIMESTAMP);

    /**
    * 실제 사용하기 위해서는
    * a link 내 href 에 # 을 붙이지 말고, 이벤트 위임을 통해 실제 링크 이동이 아니라 router.navigate 를 통해 동작되도록 해야합니다.
    * <a data-navigation href="/users/123">Users</a>
    */
    document.addEventListener('click', (event) => {
      const { target } = event;

      
      if (target.matches(NAV_A_SELECTOR)) {
        event.preventDefault();
        router.navigate(target.href);
      }
    })
  }

  return router;
}

