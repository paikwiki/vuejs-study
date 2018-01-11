
Vue.component('vc-screen', {
  props: ['dp'],
  template: `<div class="vc-screen">{{ dp === '' ? 0 : dp }}</div>`
})

Vue.component('vc-numpad', {
  props: ['item', 'dp', 'dc', 'fm', 'iso', 'ss', 'sd', 'sdc', 'sf', 'gr'],
  template: `<button
              @click="onClick(item)">
                {{ item.name }}
            </button>`,
  methods: {
    onClick: function(item) {
      if(item.type === 'ac') {
        this.sd('')
        this.sf('')
        this.ss(false)
        this.sdc(false)
        
        return
      } else if(item.type === 'num') {
        if (this.dc) {
          this.sd(item.name)
          this.sdc(false)
        } else {
          this.sd(this.dp + item.name)
        }

        return 
      } else if(item.type === '+-') {
        this.sd(parseInt(this.dp)*-1)
 
        return
      } else if(item.type === 'op') {
        if (!this.iso && item.name === '=' ) {
          
          return
        }
        if (this.iso && this.dp === this.fm.slice(0,-1)) {
          return
        }
        if (this.dp === '') {
          
          return
        }
        if (this.iso) {
          this.gr(eval(this.fm + this.dp)) 
          this.ss(false)
        } else {
          this.sf(this.dp + item.name)
          this.ss(true)
        }
        this.sdc(true)
        
        return 
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
                  :ss="setSecondOperand"
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
        { name: '+/-', type: '+/-' },
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
      console.log( value ? 'It will be the second operand' : 'It will be the first operand');
      this.isSecondOperand = value
    },
    setFormula: function(value) {
      this.formula = value
    },
    getResult: function(value) {
      this.display = value
      this.formula = ''
    }
  }          
})

const app = new Vue({
  el: '#root'
})
