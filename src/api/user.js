import request from '@/utils/request'

// 用户主页
export function getInfoByName(username, page, size) {
  return request({
    url: '/ums/user/' + username,
    method: 'get',
    params: {
      pageNo: page,
      size: size
    }
  })
}
// 用户主页
export function getInfo() {
  return request({
    url: '/ums/user/info',
    method: 'get'
  })
}


// 更新
export function update(user) {
  return request({
    url: '/ums/user/update',
    method: 'post',
    data: user
  })
}

export function getCollectTopics(user,page,size) {
  return request({
    url: '/ums/user/topic',
    method: 'get',
    params: {
      name: user,
      page: page,
      size: size
    }
  })
}
export function getCollectTopicsId(user_name) {
  return request({
    url: '/ums/user/topicsId',
    method: 'get',
    params: {
      name: user_name,
    }
  })
}
export function addCollectTopic(user_id,topic_id) {
  return request({
    url: '/ums/user/topic',
    method: 'post',
    params: {
      user_id: user_id,
      topic_id: topic_id
    }
  })
}
export function deleteCollectTopic(user_id,topic_id) {
  return request({
    url: '/ums/user/topic',
    method: 'delete',
    params: {
      user_id: user_id,
      topic_id: topic_id
    }
  })
}

