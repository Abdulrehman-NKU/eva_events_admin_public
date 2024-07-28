export class Userdata {
  static getUserViewParamsData =  (pathname: string) => {
    let pathnameArray = pathname.split('/');
    console.log('pathnameArray>>>', pathnameArray);

    let paramsObj = {
      user_id: pathnameArray[3],
      user_type: pathnameArray[2],
    };
    return paramsObj;
  };
}
