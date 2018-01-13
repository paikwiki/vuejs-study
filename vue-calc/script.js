const vcScreen = {
  props: ['dp'],
  template: `<div class="vc-screen">{{ dp === '' ? 0 : dp }}</div>`
};

Vue.component('vc-numpad', {
  props: ['item', 'dp', 'dc', 'fm', 'iso', 'sso', 'sd', 'sdc', 'sf', 'gr'],
  template: `<button
              @click="onClick(item)">
                {{ item.name }}
            </button>`,
  methods: {
    onClick: function(item) {
      switch (item.type) {
        case 'ac':
          this.sd('')
          this.sf('')
          this.sso(false)
          this.sdc(false)
          
          break
        case 'num':
          if (this.dc) {
            this.sd(item.name)
            this.sdc(false)
          } else {
            this.sd(this.dp + item.name)
          }

          break
        case '+-':
          this.sd(parseInt(this.dp)*-1)
 
          break
        case 'op':

          // === 필터링 시작
          // 첫 번째 피연산자가 없는 상태에서 = 버튼 클릭시
          if (!this.iso && item.name === '=' ) {
            break
          }

          // 첫 번째 피연산자와 연산자가 공식에 대입되어 있는 상황에서 다른 연산자 버튼 클릭시
          const fmNum = this.fm.length > 0 ? this.fm.slice(0,-1) : undefined
          if (this.iso && this.dp === fmNum) {
            break
          }

          // 첫 번째 피연산자가 없는 상황에서 연산자 버튼 클릭시
          if (this.dp === '') {           
            break
          }
          // === 필터링 끝

          if (this.iso) {
            // 두 번째 피연산자 입력 이후에 연산자 버튼 클릭시

            const res = eval(this.fm + this.dp);
            this.gr(res)
            if(item.name === "=") {
              this.sso(false)
            } else {
              this.sf(res + item.name)
              this.sso(true)
            }
          } else {
            // 첫 번째 피연산자 입력 이후에 연산자 버튼 클릭시
            
            // 첫 번째 피연산자와 연산자를 합쳐서 공식에 담는다
            // 두 번째 피연산자 받을 준비를 한다
            this.sf(this.dp + item.name)
            this.sso(true)
          }
          this.sdc(true)
          
          break
      }
    }
  }  
})

Vue.component('vc-device', {
  template: `<div class="vc-wrapper">
              <vc-screen
                :dp="display">
              </vc-screen>
              <div class="vc-numpad-wrapper">
                <vc-numpad
                  v-for="item in items"
                  :item="item"
                  :dp="display"
                  :dc="displayClear"
                  :fm="formula"
                  :iso="isSecondOperand"
                  :sso="setSecondOperand"
                  :sd="setDisplay"
                  :sdc="setDisplayClear"
                  :sf="setFormula"
                  :gr="getResult"
                  :key="item.index">
                </vc-numpad>
              </div>
            </div>`,
  data: function() {
    return {
      items: [
        { name: 'AC', type: 'ac' },
        { name: '+/-', type: '+-' },
        { name: '%', type: 'op' },
        { name: '/', type: 'op' },
        { name: '7', type: 'num' },
        { name: '8', type: 'num' },
        { name: '9', type: 'num' },
        { name: '*', type: 'op' },
        { name: '4', type: 'num' },
        { name: '5', type: 'num' },
        { name: '6', type: 'num' },
        { name: '-', type: 'op' },
        { name: '1', type: 'num' },
        { name: '2', type: 'num' },
        { name: '3', type: 'num' },
        { name: '+', type: 'op' },
        { name: '0', type: 'num' },
        { name: '00', type: 'num' },
        { name: '.', type: 'num' },
        { name: '=', type: 'op' },
      ],
      display: '',
      formula: '',
      isSecondOperand: false,
      displayClear: false
    }
  },
  methods: {
    setDisplay: function(value) {
      if (value.length > 0 && parseInt(value) === 0) {
        this.display = ''
      } else {
        this.display = value
      }
    },
    setDisplayClear: function(value) {
      this.displayClear = value
    },
    setSecondOperand: function(value) {
      this.isSecondOperand = value
    },
    setFormula: function(value) {
      this.formula = value
    },
    getResult: function(value) {
      this.display = value
      this.formula = ''
    }
  },
  components: {
    'vc-screen' : vcScreen
  }         
})

const app = new Vue({
  el: '#root'
})
