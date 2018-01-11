
Vue.component('vc-screen', {
  props: ['dp'],
  template: `<div class="vc-screen">{{ dp === '' ? 0 : dp }}</div>`
})

Vue.component('vc-numpad', {
  props: ['item', 'dp', 'dc', 'fm', 'cs', 'ss', 'sd', 'sdc', 'sf', 'gr'],
  template: `<button
              @click="onClick(item)">
                {{ item.name }}
            </button>`,
  methods: {
    onClick: function(item) {
      if(item.name === 'AC') {
        this.sd('')
        this.sf('')
        this.ss(false)
        this.sdc(false)
        
        return
      } else if(parseInt(item.name) < 10 || item.name === '.') {
        if (this.dc) {
          this.sd(item.name)
          this.sdc(false)
        } else {
          this.sd(this.dp + item.name)
        }

        return 
      } else if(item.name === '+/-') {
        this.sd(parseInt(this.dp)*-1)
 
        return
      } else if('%/*-+='.indexOf(item.name) > -1) {
        if (!this.cs && item.name === '=' ) {
          
          return
        }
        if (this.cs && this.dp === this.fm.slice(0,-1)) {
          return
        }
        if (this.dp === '') {
          
          return
        }
        if (this.cs) {
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
              <div class="vc-screen-wrapper">
                <vc-screen
                  :dp="display">
                </vc-screen>
              </div> 
              <div class="vc-numpad-wrapper">
                <vc-numpad
                  v-for="item in items"
                  :item="item"
                  :dp="display"
                  :dc="displayClear"
                  :fm="formula"
                  :cs="currentState"
                  :ss="setCurrentState"
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
        { name: 'AC' },
        { name: '+/-' },
        { name: '%' },
        { name: '/' },
        { name: '7' },
        { name: '8' },
        { name: '9' },
        { name: '*' },
        { name: '4' },
        { name: '5' },
        { name: '6' },
        { name: '-' },
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '+' },
        { name: '0' },
        { name: '00' },
        { name: '.' },
        { name: '=' },
      ],
      display: '',
      formula: '',
      currentState: false,
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
    setCurrentState: function(value) {
      this.currentState = value
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


