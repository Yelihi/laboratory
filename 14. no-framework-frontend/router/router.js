/**
 * 해당 정규식은 :id 와 같은 파라미터를 추출하기 위한 정규식입니다.
 * 또한 url fragment 를 만들기 위한 정규식입니다.
 * 
 * 예시
 * 
 * router.addRoute('/users/:id', UserComponent);
 * 
 * params = ['id']
 * parsedFragment = '\/users\/([^\\/]+)'
 * testRegExp = /^\/users\/([^\\/]+)$/
 * 
 * 위 testRegExp 는 추후 window.location.hash 와 비교하여 parmas 를 추출하기 위함입니다.
 * */
const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = '([^\\/]+)';

/**
 * @description window.location.hash 로 부터 params 를 추출합니다.
 * @param {*} route addRoute 를 통해 생성된 route 객체
 * @param {*} windowHash window.location.hash 값
 * @returns params 객체 { id: '123' } 이런식으로 매칭됨.
 */
const extractUrlParams = (route, windowHash) => {
  const params = {};

  // 파라미터가 없으면 빈 객체를 반환합니다.
  if (route.params.length === 0) {
    return params;
  }

  // route 객체 내 testRegExp 와 window.location.hash 를 비교하여 matches 되는 배열을 반환합니다.
  const matches = windowHash.match(route.testRegExp);

  // matches = ['/users/123', '123'] 이런식이기 때문에, 첫 번째 요소를 shift 하여 제거합니다.
  matches.shift()

  // matches 배열을 순회하면서 params 객체에 파라미터값을 추가합니다.
  matches.forEach((paramValue, index) => {
    // 이전에 addRoute 에서 params 의 배열은 순서대로 파라미터 이름을 저장하고 있음. matches 역시 순서대로 파라미터의 값을 가리킴
    // matches = ['123'], params = ['id'] 이런식으로 매칭됨.
    const paramName = route.params[index];
    // params 객체에 파라미터 이름과 값을 추가합니다.
    // params = { id: '123' } 이런식으로 매칭됨.
    params[paramName] = paramValue;
  })

  return params;
}

export default () => {
  const routes = [];
  let notFound = () => {}; // 페이지가 없을 때 실행할 callback

  const router = {}

  /**
   * @description 현재 라우트를 확인하고, 파라미터를 추출하여 컴포넌트를 렌더링합니다.
   */
  const checkRoutes = () => {
    const { hash } = window.location; // #/users/123 이런식으로 들어옴.

    // 여기서 routes 는 addRoute 를 통해 등록이 됩니다.
    // 등록된 route 배열을 순회하면서, 해당 route 객체의 testRegExp 와 hash 가 일치하는지 확인합니다.
    const currentRoute = routes.find(route => {
      const { testRegExp } = route
      return testRegExp.test(hash);
    })

    // routes 배열에 등록된 route 중 일치하는 route 가 없으면
    if(!currentRoute) {
      notFound();
      return;
    }

    // 찾은 route 객체를 기반으로 현재 hash 로 부터 params 객체 { [paramName] : paramValue } 쌍을 추출합니다.
    const urlParams = extractUrlParams(currentRoute, window.location.hash);

    // 찾은 route 객체의 component 를 실행하면서, urlParams 를 전달합니다. 이는 route 이동 시 실행시킬 callback 입니다.
    currentRoute.component(urlParams)
  }

  /**
   * @description 새로운 route 를 등록합니다.
   * 해당 함수가 실행되면서 상위 스코프 내 routes 를 채웁니다.
   * 
   * @param {string} fragment /users/:id 
   * @param {Function} component 
   * @returns router 객체
   */
  router.addRoute = (fragment, component) => {
    const params = [];

    // 여기서 파라미터 부분 (예를 들어 :id) 를 추출하여
    // 1. params 배열에 이름 추가 (여기선 ['id'])
    // 2. :id 부분을 (\\/([^\\/]+)) 로 변경합니다.
    // 3. 정규식의 오류를 방지하기 위해 / 부분을 \\/ 로 변경합니다.
    // parsedFragment = '\/users\/([^\\/]+)' 최종 변경 결과
    const parsedFragment = fragment.replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
      params.push(paramName);
      return URL_FRAGMENT_REGEXP;
    }).replace(/\//g, '\\/');

    // 변경된 parsedFragment 를 기반으로 testRegExp 을 생성합니다.
    // testRegExp = /^\/users\/([^\\/]+)$/
    // 이 testRegExp 는 추후 window.location.hash 와 비교하여 parmas 를 추출하기 위함입니다.
    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
      component, // callback 전달받은 함수
      params, // 파라미터 이름 배열
    })

    return router; // chainable
  }

  /**
   * @description 페이지가 없을 때 실행할 callback 을 설정합니다.
   * @param {Function} callback 페이지가 없을 때 실행할 callback
   * @returns router 객체
   */
  router.setNotFound = (callback) => {
    notFound = callback;
    return router;
  }

  /**
   * @description 새로운 route 로 이동합니다.
   * @param {string} fragment #/users/123 이런식으로 들어옴.
   */
  router.navigate = fragment => {
    window.location.hash = fragment;
  }

  /**
   * @description router 를 시작하며서 이벤트를 등록합니다.
   * 이렇게 될 때, navigate 를 통해 hash 변경 시 이벤트에 의해 checkRoutes 함수가 실행된다.
   */
  router.start = () => {
    window.addEventListener('hashchange', checkRoutes);

    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    checkRoutes();
  }

  return router;
}