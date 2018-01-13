// 두 명의 플레이어 데이터
const players = [
  {
    name: 'Jane',
    pod: [
      { name: 'one' },
      { name: 'two' },
      { name: 'three' }
    ],
    other: 'John'
  },
  {
    name: 'John',
    pod: [
      { name: 'four' },
      { name: 'five' }
    ],
    other: 'Jane'
  }
]

// 플레이어의 자식 컴포넌트
const pod = {
  props: ['item'],
  template: `<li>{{ item.name }}</li>`
};

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
      return console.log(this.oPlayer)
    }
  }
})

Vue.component('app', {
  template: `<div>
              <player
                v-for="player in players"
                :key="player.id"
                :player="player"
                :oPlayer="player.other">
              </player>
            </div>`,
  data: function() {
    return {
      players: players
    }
  }
})

const App = new Vue({
  el: '#app'
})