export  default  async (url ='',data={},type='POST',method='fetch') => {
  console.log(url)
  type = type.toUpperCase();
  if (type === 'GET') {
    let str = '';
    Object.keys(data).forEach( key => {
      str += key + '=' + data[key] + '&';
    })
    if (str !== '') {
      str = str.substr(-1,1);
      url = url + str;
    }

  }
  if (window.fetch && method === 'fetch') {
    //@TODO fetch
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      cache: "default"
    }
    type === 'POST'&& Object.defineProperty(requestConfig, 'body',{value: JSON.stringify(data)});

    try{
      const res = await fetch(url,requestConfig);
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
      if (type === 'POST') {
        sendData = JSON.stringify(data);
      }
      xhr.open(type, url, true);
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
