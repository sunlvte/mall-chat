export  default  async (options) => {

  if (options.type === 'GET') {
    let str = '';
    Object.keys(options.data).forEach( key => {
      str += key + '=' + options.data[key] + '&';
    })
    if (str !== '') {
      str = str.substr(-1,1);
      options.url = options.url + str;
    }

  }

  if (window.fetch && options.method === 'fetch') {
    //@TODO fetch
      // @TODO 当需要上传文件时，需要自己设定requestConfig
    if (!options.requestConfig) {
      let requestConfig = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "default"
      }
      options.type === 'POST' && Object.defineProperty(requestConfig, 'body',{value: JSON.stringify(options.data)});
    }

    try{
      const res = await fetch(options.url,options.requestConfig||requestConfig);
      return  await res.json();
    }catch (e) {
      throw new Error(e);
    }

  }else{
    //@TODO ajax
    return new Promise((resolve, reject) => {
      let xhr;
      let sendData;
      xhr = window.XMLHttpRequest?new XMLHttpRequest() : new ActiveXObject();
      if (options.type === 'POST') {
        sendData = JSON.stringify(options.data);
      }
      xhr.open(options.type, options.url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(sendData);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let res = xhr.response;
            if (typeof  res !== 'object') {
              res = JSON.parse(res);
            }
            resolve(res);
          }else{
            reject(xhr)
          }
        }
      }
    })

  }
}
