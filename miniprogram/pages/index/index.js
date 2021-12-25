// index.js
// const app = getApp()

Page({
  data: {
    players: [
      {
        id: '384949882'
      },
      {
        id: '192120244'
      },
      {
        id: '293521538'
      },
      {
        id: '124070689'
      },
    ]
  },
  onReady: function() {
    this.requestSteamApiTest()
  },
  goTo(event) {
    const id = event.target.dataset.id

    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    })
  },
  request(url) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'getPlayerProfile',
          url
        },
        complete: (res) => {
          const { result } = res
          resolve(result)
        }
      })
    })
  },

  requestSteamApiTest() {
    const tasks = this.data.players.map(item => {
      return this.request(`https://api.opendota.com/api/players/${item.id}`)
    })

    Promise.all(tasks).then(res => {
      const { players } = this.data

      const playersDetail = players.map(({ id }) => {
        const detail = res.find(item => `${item.profile.account_id}` === id)

        return {
          id,
          detail
        }
      })

      console.log(playersDetail)
      this.setData({
        players: playersDetail
      })
    })
  }
});
