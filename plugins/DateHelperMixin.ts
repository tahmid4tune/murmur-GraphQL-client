import Vue from 'vue'

export default Vue.extend({
  methods: {
    getFormattedDateText(dateStr: string): string {
      const date: Date = new Date(dateStr);
      return `- on ${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`
    },
  },
});
