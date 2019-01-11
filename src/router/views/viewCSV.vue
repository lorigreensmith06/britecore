<template>
  <div>
    <label class="text-reader">
      <p
        >Browse to a csv file and view as table. <br />To edit a field click on
        the text and then click the save button.</p
      >
      <input type="file" @change="onFileChange" />
    </label>
    <table :class="$style.payments">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index"> {{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payment, index) in paymentsData" :key="index">
          <td v-for="(header, indexColumn) in headers" :key="indexColumn">
            <div
              v-if="
                !editing ||
                  index !== currentIndex ||
                  indexColumn !== currentIndexColumn
              "
            >
              <span
                class="text"
                @click="enableEditing(payment[header], index, indexColumn)"
                >{{ payment[header] }}</span
              >
            </div>
            <div
              v-if="
                editing &&
                  index === currentIndex &&
                  indexColumn === currentIndexColumn
              "
            >
              <input v-model="tempValue" class="input" />
              <button @click="disableEditing"> Cancel </button>
              <button @click="saveEdit"> Save </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentsData: [],
      headers: [],
      value: 'Click Me!',
      tempValue: null,
      editing: false,
      currentIndex: null,
      currentIndexColumn: null,
    }
  },
  page: {
    title: 'View CSV',
  },
  methods: {
    enableEditing: function(value, index, indexColumn) {
      this.value = value
      this.tempValue = value
      this.editing = true
      this.currentIndex = index
      this.currentIndexColumn = indexColumn
    },
    disableEditing: function() {
      this.tempValue = null
      this.editing = false
      this.currentIndex = null
      this.currentIndexColumn = null
    },
    saveEdit: function() {
      // if had more time would save it to the database
      this.value = this.tempValue

      let currentData = this.paymentsData[this.currentIndex]
      let header = this.headers[this.currentIndexColumn]
      currentData[header] = this.tempValue
      this.disableEditing()
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createInput(files[0])
    },
    createInput(file) {
      this.paymentsData = []
      var reader = new FileReader()
      reader.onload = (e) => {
        const file = e.target.result
        const allLines = file.split(/\r\n|\n/)
        // Reading line by line
        let firstLine = allLines.shift()
        this.headers = []
        let tempHeaders = firstLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
        tempHeaders.forEach((header) => {
          this.headers.push(header.replace(/^"(.*)"$/, '$1'))
        })

        allLines.forEach((line) => {
          let lineData = {}
          let lineItems = line.match(/(".*?"|[^",]+)(?=,|$)/g)
          let ct = 0

          lineItems.forEach((item) => {
            lineData[this.headers[ct]] = item.replace(/^"(.*)"$/, '$1')
            ct++
          })

          this.paymentsData.push(lineData)
        })
      }
      reader.readAsText(file)
    },
  },
}
</script>
<style lang="scss" module>
@import '@design';

.payments {
  margin: 20px 0 20px;
  border-spacing: 0;
  border: 1px solid black;
}
th,
td {
  padding: 5px;
  border-collapse: separate;
  border: 1px solid black;
}
</style>
