// 두 명의 플레이어 데이터
const players = [
  {
    id: 0,
    name: 'Jane',
    pod: [
      { name: 'one' },
      { name: 'two' },
      { name: 'three' }
    ],
    other: 1
  },
  {
    id: 1,
    name: 'John',
    pod: [
      { name: 'four' },
      { name: 'five' }
    ],
    other: 0
  }
]

// 플레이어의 자식 컴포넌트
const pod = {
  props: ['item'],
  template: `<li>{{ item.name }}</li>`
}

Vue.component('player', {
  props: ['player', 'oPlayer'],
  template: `<div>
              <p>{{ player.name }}</p>
              <button @click=doToss>toss!</button>
              <ul>
                <pod
                  v-for="item in player.pod"
                  :item="item"
                  :key="item.id">
                </pod>
              </ul>
            </div>`,
  components: {
    'pod' : pod
  },
  methods: {
    doToss: function() {
      this.$emit('doToss', this.player)
    }
  }
})

Vue.component('app', {
  template: `<div>
              <player
                v-for="player in players"
                :key="player.id"
                :player="player"
                :oPlayer="player.other"
                @doToss="doToss">
              </player>
            </div>`,
  data: function() {
    return {
      players: players
    }
  },
  methods: {
    doToss: function(p) {
      if( p.pod.length > 0 ) {
        const podItem = p.pod.pop()
        for (player of this.players) {
          player.id === p.other ? player.pod.push(podItem) : undefined
        }
      } else {
        alert(`${p.name} has no item!`)
        return
      }
    }
  }
})

const App = new Vue({
  el: '#app'
})