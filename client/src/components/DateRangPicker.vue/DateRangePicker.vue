<template>
  <div class="box">
    <div>
      <date-picker
        @change="(value) => $emit('onChangeDate', value)"
        v-model="value3"
        range
        placeholder="Select date range"
      >
        <template v-slot:footer="{ emit }">
          <div class="d-flex">
            <div style="text-align: left; color: blue">
              <button class="mx-btn mx-btn-text" @click="selectToday(emit)">
                Today
              </button>
            </div>
            <div style="text-align: left">
              <button class="mx-btn mx-btn-text" @click="selectThisMonth(emit)">
                This month
              </button>
            </div>
            <div style="text-align: left">
              <button class="mx-btn mx-btn-text" @click="selectLastMonth(emit)">
                Last month
              </button>
            </div>
          </div>
        </template>
      </date-picker>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: { DatePicker },
  props: [
    'endDate',
    'startDate'
    
  ],

  data() {
    return {
      value3: [new Date(this.startDate), new Date(this.endDate)],
    };
  },
  methods: {
    selectThisMonth(emit) {
      const end = new Date();
      const start = new Date();

      console.log("start:", start.getTime(), start.getDate());
      start.setTime(start.getTime() - (start.getDate() - 1) * 24 * 3600 * 1000);
      const date = [start, end];
      emit(date);
    //   console.log("time 3:", this.value3);
    },
    selectToday(emit) {
      const end = new Date();
      const start = new Date();
      const date = [start, end];
      emit(date);
    },
    selectLastMonth(emit) {
      const end = new Date();
      const start = new Date();
      console.log("start:", start.getTime(), start.getDate());
      start.setTime(
        start.getTime() -
          start.getDate() * 24 * 3600 * 1000 -
          30 * 24 * 3600 * 1000
      );
      end.setTime(end.getTime() - end.getDate() * 24 * 3600 * 1000);
      const date = [start, end];
      emit(date);
    //   console.log("time 3:", this.value3);
    },
  },
};
</script>
<style>
.mx-calendar-content {
  height: fit-content;
}
.mx-calendar {
  width: fit-content;
  max-width: 369px;
}
.mx-icon-calendar,
.mx-icon-clear {
  right: 8px;
}
.mx-icon-clear{
    display:none
}
.mx-input-wrapper,
.mx-input,
.mx-input-wrapper,
.mx-datepicker-range{
width:100%
}
.mx-input{
    height:38px;
    cursor: pointer
}
 .mx-btn {
  font-size: 11px !important;
}
</style>
